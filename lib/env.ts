export const ENV_OBRIGATORIAS = [
    "N8N_WEBHOOK_URL",
    "N8N_WEBHOOK_SECRET",
    "TURNSTILE_SECRET_KEY",
    "OPENROUTER_API_KEY",
] as const

export type EnvObrigatoria = (typeof ENV_OBRIGATORIAS)[number]

export function lerEnv(nome: EnvObrigatoria, contexto: string): string | null {
    const valor = process.env[nome]
    if (valor) return valor
    console.error(`[${contexto}] variável de ambiente ausente: ${nome}`)
    return null
}
