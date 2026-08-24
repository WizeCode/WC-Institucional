import { captureServerException } from "@/lib/analytics"

interface FallbackOptions {
    contexto: string
    distinctId: string
    propriedades: Record<string, unknown>
}

export async function enviarComFallback(
    enviar: () => Promise<Response>,
    { contexto, distinctId, propriedades }: FallbackOptions
): Promise<{ success: true } | { success: false; error: string }> {
    async function preservar(motivo: string) {
        return captureServerException(
            {
                type: `${contexto}SubmissaoNaoEntregueError`,
                message: `Submissão de ${contexto} não entregue ao n8n: ${motivo}`,
            },
            distinctId,
            { ...propriedades, motivo }
        )
    }

    try {
        const res = await enviar()
        if (!res.ok) {
            const detalhe = await res.text().catch(() => "")
            console.error(
                `[${contexto}] webhook n8n respondeu ${res.status}: ${detalhe}`
            )
            if (await preservar(`webhook_${res.status}`)) return { success: true }
            return { success: false, error: "Erro ao enviar. Tente novamente." }
        }
        return { success: true }
    } catch (err) {
        console.error(`[${contexto}] falha ao chamar webhook n8n:`, err)
        if (await preservar("network_error")) return { success: true }
        return { success: false, error: "Erro ao enviar. Tente novamente." }
    }
}
