"use server"

import { verifyTurnstile } from "@/lib/turnstile/actions"
import { lerEnv } from "@/lib/env"
import { enviarComFallback } from "@/lib/webhook/enviar-com-fallback"

export async function sendBriefing(
    data: string,
    token: string,
    conversation: { role: string; content: string }[],
    contact: { nome: string; email: string; whatsapp: string }
) {
    if (process.env.NODE_ENV !== "development") {
        if (!token || !(await verifyTurnstile(token))) return { success: false }
    }

    const webhookBase = lerEnv("N8N_WEBHOOK_URL", "briefing")
    if (!webhookBase) return { success: false }

    const secret = lerEnv("N8N_WEBHOOK_SECRET", "briefing")
    if (!secret) return { success: false }

    const briefing = JSON.parse(data)

    const resultado = await enviarComFallback(
        () =>
            fetch(`${webhookBase}/briefing`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-webhook-secret": secret,
                },
                body: JSON.stringify({
                    briefing,
                    conversa: conversation,
                    contato: contact,
                }),
            }),
        {
            contexto: "briefing",
            distinctId: contact.email,
            propriedades: { ...contact, briefing, conversa: conversation },
        }
    )

    return { success: resultado.success }
}
