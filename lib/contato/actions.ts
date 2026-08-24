"use server"

import { contatoSchema, type ContatoFormData } from "@/lib/contato/schema"
import { verifyTurnstile } from "@/lib/turnstile/actions"
import { lerEnv } from "@/lib/env"
import { enviarComFallback } from "@/lib/webhook/enviar-com-fallback"

export async function enviarContato(
    data: ContatoFormData,
    turnstileToken: string
) {
    if (process.env.NODE_ENV !== "development") {
        if (!turnstileToken || !(await verifyTurnstile(turnstileToken))) {
            return {
                success: false,
                error: "Falha na verificação de segurança.",
            }
        }
    }

    const parsed = contatoSchema.safeParse(data)
    if (!parsed.success) return { success: false, error: "Dados inválidos." }

    const webhookBase = lerEnv("N8N_WEBHOOK_URL", "contato")
    if (!webhookBase) return { success: false, error: "Serviço indisponível." }

    const secret = lerEnv("N8N_WEBHOOK_SECRET", "contato")
    if (!secret) return { success: false, error: "Serviço indisponível." }

    return enviarComFallback(
        () =>
            fetch(`${webhookBase}/contato`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-webhook-secret": secret,
                },
                body: JSON.stringify(parsed.data),
            }),
        {
            contexto: "contato",
            distinctId: parsed.data.email,
            propriedades: parsed.data,
        }
    )
}
