"use server"

import { talentoSchema, validarCurriculo } from "@/lib/talentos/schema"
import { verifyTurnstile } from "@/lib/turnstile/actions"
import { lerEnv } from "@/lib/env"
import { enviarComFallback } from "@/lib/webhook/enviar-com-fallback"

export async function enviarCandidatura(formData: FormData) {
    if (process.env.NODE_ENV !== "development") {
        const token = String(formData.get("turnstileToken") ?? "")
        if (!token || !(await verifyTurnstile(token))) {
            return {
                success: false,
                error: "Falha na verificação de segurança.",
            }
        }
    }

    const parsed = talentoSchema.safeParse({
        nome: formData.get("nome"),
        email: formData.get("email"),
        whatsapp: formData.get("whatsapp"),
        area: formData.get("area"),
        apresentacao: formData.get("apresentacao") ?? "",
        github: formData.get("github") ?? "",
        linkedin: formData.get("linkedin") ?? "",
        modalidade: formData.get("modalidade"),
        disponibilidade: formData.get("disponibilidade"),
        consentimento: formData.get("consentimento") === "true",
    })
    if (!parsed.success) return { success: false, error: "Dados inválidos." }
    const dados = parsed.data

    const curriculo = formData.get("curriculo")
    const file = curriculo instanceof File ? curriculo : null
    if (validarCurriculo(file)) {
        return { success: false, error: "Currículo inválido." }
    }
    const arquivo = file as File

    const utm = {
        utm_source: String(formData.get("utm_source") ?? ""),
        utm_medium: String(formData.get("utm_medium") ?? ""),
        utm_campaign: String(formData.get("utm_campaign") ?? ""),
    }

    const webhookBase = lerEnv("N8N_WEBHOOK_URL", "talentos")
    const secret = lerEnv("N8N_WEBHOOK_SECRET", "talentos")
    if (!webhookBase || !secret) {
        return { success: false, error: "Serviço indisponível." }
    }

    const payload = new FormData()
    for (const [key, value] of Object.entries(dados)) {
        payload.append(key, String(value))
    }
    payload.append("utm_source", utm.utm_source)
    payload.append("utm_medium", utm.utm_medium)
    payload.append("utm_campaign", utm.utm_campaign)
    payload.append("curriculo", arquivo)

    return enviarComFallback(
        () =>
            fetch(`${webhookBase}/trabalhe-conosco`, {
                method: "POST",
                headers: { "x-webhook-secret": secret },
                body: payload,
            }),
        {
            contexto: "talentos",
            distinctId: dados.email,
            propriedades: {
                ...dados,
                ...utm,
                curriculo_nome: arquivo.name,
                curriculo_tamanho: arquivo.size,
            },
        }
    )
}
