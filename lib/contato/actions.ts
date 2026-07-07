"use server"

import { contatoSchema, type ContatoFormData } from "@/lib/contato/schema"
import { verifyTurnstile } from "@/lib/turnstile/actions"

export async function enviarContato(
    data: ContatoFormData,
    turnstileToken: string
) {
    if (process.env.NODE_ENV !== "development") {
        if (!turnstileToken || !(await verifyTurnstile(turnstileToken))) {
            return { success: false, error: "Falha na verificação de segurança." }
        }
    }

    const parsed = contatoSchema.safeParse(data)
    if (!parsed.success) return { success: false, error: "Dados inválidos." }

    const webhookBase = process.env.N8N_WEBHOOK_URL
    if (!webhookBase) return { success: false, error: "Serviço indisponível." }

    const secret = process.env.N8N_WEBHOOK_SECRET
    if (!secret) return { success: false, error: "Serviço indisponível." }

    try {
        await fetch(`${webhookBase}/contato`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-webhook-secret": secret,
            },
            body: JSON.stringify(parsed.data),
        })
        return { success: true }
    } catch {
        return { success: false, error: "Erro ao enviar. Tente novamente." }
    }
}
