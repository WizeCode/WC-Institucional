import React from "react"
import { Badge, type BadgeVariant } from "@/components/ui/badge"

/**
 * Nota assinada dos fundadores: uma mensagem em primeira pessoa que dá voz — e
 * rosto — à empresa. Diferente do `About`, que é o bloco de autoridade da
 * *marca*: aqui quem fala são as *pessoas*. Por isso o tom de carta, num painel
 * contido, fechado por uma assinatura. A assinatura acrescenta um elemento
 * próprio à árvore, então é um componente, não uma variante do `About`. Ver
 * `docs/CONVENTIONS.md`.
 *
 * ```tsx
 * <FoundersNote
 *     badge={data.nota.badge}
 *     title={rich(data.nota.title)}
 *     paragraphs={data.nota.paragraphs.map(rich)}
 *     signature={data.nota.signature}
 * />
 * ```
 */

interface FoundersNoteProps {
    badge?: string
    badgeVariant?: BadgeVariant
    title: React.ReactNode
    paragraphs: React.ReactNode[]
    signature: string
}

const FoundersNote = ({
    badge,
    badgeVariant = "outline",
    title,
    paragraphs,
    signature,
}: FoundersNoteProps) => {
    return (
        <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border bg-muted/40 p-8 lg:p-12">
            <div className="flex flex-col gap-4">
                {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
                <h2 className="text-2xl font-bold text-pretty lg:text-3xl">
                    {title}
                </h2>
            </div>
            <div className="flex flex-col gap-4 text-lg text-muted-foreground lg:text-xl">
                {paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
            <p className="text-lg font-semibold text-foreground lg:text-xl">
                {signature}
            </p>
        </div>
    )
}

export { FoundersNote }
export type { FoundersNoteProps }
