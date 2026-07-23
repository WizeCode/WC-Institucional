import { z } from "zod"

// Os `value` são EXATAMENTE os rótulos das opções do DocType no ERPNext
// (o ERP rejeita valores de Select que não batam com as opções cadastradas).
export const areaOptions = [
    { value: "Desenvolvimento", label: "Desenvolvimento" },
    { value: "Marketing", label: "Marketing" },
    { value: "Design", label: "Design" },
    { value: "Vendas", label: "Vendas" },
    { value: "Outro", label: "Outro" },
] as const

export const modalidadeOptions = [
    { value: "PJ", label: "PJ" },
    { value: "CLT", label: "CLT" },
    { value: "Ambos", label: "Ambos" },
] as const

export const disponibilidadeOptions = [
    { value: "Até 5h/semana", label: "Até 5h/semana" },
    { value: "5-10h/semana", label: "5-10h/semana" },
    { value: "10-20h/semana", label: "10-20h/semana" },
    { value: "Acima de 20h/semana", label: "Acima de 20h/semana" },
    {
        value: "Variável, a confirmar conforme escopo",
        label: "Variável, a confirmar conforme escopo",
    },
    {
        value: "Indisponível, mas interessado em futuras oportunidades",
        label: "Indisponível, mas interessado em futuras oportunidades",
    },
] as const

// Currículo: PDF até 5MB.
export const CURRICULO_MAX_SIZE = 5 * 1024 * 1024
export const CURRICULO_ACCEPT = "application/pdf"

export function validarCurriculo(file: File | undefined | null): string | null {
    if (!file) return "Anexe seu currículo em PDF"
    if (file.type !== CURRICULO_ACCEPT) return "O currículo deve ser um PDF"
    if (file.size > CURRICULO_MAX_SIZE)
        return "O currículo deve ter no máximo 5MB"
    return null
}

const urlOpcional = z
    .string()
    .trim()
    .url("URL inválida")
    .optional()
    .or(z.literal(""))

export const talentoSchema = z.object({
    nome: z
        .string()
        .min(2, "Nome deve ter pelo menos 2 caracteres")
        .max(100, "Nome muito longo"),

    email: z.string().email({ message: "E-mail inválido" }),

    whatsapp: z
        .string()
        .min(10, "WhatsApp inválido")
        .max(20, "WhatsApp inválido")
        .regex(/^[\d\s()\-+]+$/, "WhatsApp inválido"),

    area: z.enum(
        ["Desenvolvimento", "Marketing", "Design", "Vendas", "Outro"],
        { message: "Selecione uma área" }
    ),

    apresentacao: z
        .string()
        .max(1000, "Apresentação muito longa (máximo 1000 caracteres)")
        .optional()
        .or(z.literal("")),

    github: urlOpcional,

    linkedin: urlOpcional,

    modalidade: z.enum(["PJ", "CLT", "Ambos"], {
        message: "Selecione a modalidade",
    }),

    disponibilidade: z.enum(
        [
            "Até 5h/semana",
            "5-10h/semana",
            "10-20h/semana",
            "Acima de 20h/semana",
            "Variável, a confirmar conforme escopo",
            "Indisponível, mas interessado em futuras oportunidades",
        ],
        { message: "Selecione a disponibilidade" }
    ),

    consentimento: z.boolean().refine((v) => v === true, {
        message: "É necessário aceitar a política de privacidade",
    }),
})

export type TalentoFormData = z.infer<typeof talentoSchema>

export interface TalentoPayload extends TalentoFormData {
    utm_source: string
    utm_medium: string
    utm_campaign: string
}
