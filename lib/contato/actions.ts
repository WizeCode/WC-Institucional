"use server"

import { contatoSchema, type ContatoFormData } from "@/lib/contato/schema"

export async function enviarContato(data: ContatoFormData) {
    const parsed = contatoSchema.safeParse(data)
    if (!parsed.success) return { success: false, error: "Dados inválidos." }

    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (!webhookUrl) return { success: false, error: "Serviço indisponível." }

    try {
        await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed.data),
        })
        return { success: true }
    } catch {
        return { success: false, error: "Erro ao enviar. Tente novamente." }
    }
}
