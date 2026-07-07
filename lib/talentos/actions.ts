"use server"

import { talentoSchema, validarCurriculo } from "@/lib/talentos/schema"
import { verifyTurnstile } from "@/lib/turnstile/actions"

export async function enviarCandidatura(formData: FormData) {
    if (process.env.NODE_ENV !== "development") {
        const token = String(formData.get("turnstileToken") ?? "")
        if (!token || !(await verifyTurnstile(token))) {
            return { success: false, error: "Falha na verificação de segurança." }
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

    const curriculo = formData.get("curriculo")
    const file = curriculo instanceof File ? curriculo : null
    if (validarCurriculo(file)) {
        return { success: false, error: "Currículo inválido." }
    }

    const webhookBase = process.env.N8N_WEBHOOK_URL
    if (!webhookBase) return { success: false, error: "Serviço indisponível." }

    const secret = process.env.N8N_WEBHOOK_SECRET
    if (!secret) return { success: false, error: "Serviço indisponível." }

    const payload = new FormData()
    for (const [key, value] of Object.entries(parsed.data)) {
        payload.append(key, String(value))
    }
    payload.append("utm_source", String(formData.get("utm_source") ?? ""))
    payload.append("utm_medium", String(formData.get("utm_medium") ?? ""))
    payload.append("utm_campaign", String(formData.get("utm_campaign") ?? ""))
    payload.append("curriculo", file as File)

    try {
        const res = await fetch(`${webhookBase}/trabalhe-conosco`, {
            method: "POST",
            headers: { "x-webhook-secret": secret },
            body: payload,
        })
        if (!res.ok) {
            const detalhe = await res.text().catch(() => "")
            console.error(
                `[talentos] webhook n8n respondeu ${res.status}: ${detalhe}`
            )
            return { success: false, error: "Erro ao enviar. Tente novamente." }
        }
        return { success: true }
    } catch (err) {
        console.error("[talentos] falha ao chamar webhook n8n:", err)
        return { success: false, error: "Erro ao enviar. Tente novamente." }
    }
}
