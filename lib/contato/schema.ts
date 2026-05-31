import { z } from "zod"

export const servicoOptions = [
    { value: "website", label: "Website" },
    { value: "aplicativo", label: "Aplicativo" },
    { value: "automacao", label: "Automação" },
    { value: "saas", label: "SaaS" },
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

    servico: z.enum(["website", "aplicativo", "automacao", "saas", "outro"]),

    descricao: z
        .string()
        .min(20, "Descreva sua demanda com pelo menos 20 caracteres")
        .max(1000, "Descrição muito longa (máximo 1000 caracteres)"),
})

export type ContatoFormData = z.infer<typeof contatoSchema>
