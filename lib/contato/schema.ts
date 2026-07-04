import { z } from "zod"

export const servicoOptions = [
    { value: "institucional", label: "Website Institucional" },
    { value: "landing-page", label: "Landing Page" },
    { value: "sistemas", label: "Sistemas" },
    { value: "automacoes", label: "Automações" },
    { value: "outro", label: "Outro" },
] as const

export const contatoSchema = z.object({
    nome: z
        .string()
        .min(2, "Nome deve ter pelo menos 2 caracteres")
        .max(100, "Nome muito longo"),

    empresa: z.string().max(100, "Nome da empresa muito longo").optional(),

    email: z.string().email({ message: "E-mail inválido" }),

    telefone: z
        .string()
        .min(10, "Telefone inválido")
        .max(20, "Telefone inválido")
        .regex(/^[\d\s()\-+]+$/, "Telefone inválido"),

    servico: z.enum([
        "institucional",
        "landing-page",
        "sistemas",
        "automacoes",
        "outro",
    ]),

    descricao: z
        .string()
        .min(20, "Descreva sua demanda com pelo menos 20 caracteres")
        .max(1000, "Descrição muito longa (máximo 1000 caracteres)"),
})

export type ContatoFormData = z.infer<typeof contatoSchema>
