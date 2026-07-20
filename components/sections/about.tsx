import React from "react"
import { Badge, type BadgeVariant } from "@/components/ui/badge"

/**
 * Bloco de autoridade da página institucional: narrativa da empresa com um
 * conjunto **opcional** de números/marcos abaixo. Os stats são a prova da
 * narrativa — por isso vivem na mesma seção, não em uma faixa separada.
 *
 * `stats` segue o padrão de seção opcional (como `portfolio`/`projetos` no
 * `ServicoPage`): quando omitido, a faixa de números simplesmente não renderiza.
 * Ver `docs/CONVENTIONS.md`.
 *
 * ```tsx
 * <About
 *     badge={data.about.badge}
 *     title={rich(data.about.title)}
 *     paragraphs={data.about.paragraphs.map(rich)}
 *     stats={data.about.stats}
 * />
 * ```
 */

interface Stat {
    value: string
    label: string
}

interface AboutProps {
    badge: string
    badgeVariant?: BadgeVariant
    title: React.ReactNode
    paragraphs: React.ReactNode[]
    stats?: Stat[]
}

const About = ({
    badge,
    badgeVariant = "outline",
    title,
    paragraphs,
    stats,
}: AboutProps) => {
    return (
        <div className="flex flex-col gap-10 lg:gap-12">
            <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
                <Badge className="mx-auto" variant={badgeVariant}>
                    {badge}
                </Badge>
                <h2 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                    {title}
                </h2>
            </div>
            <div className="mx-auto flex max-w-3xl flex-col gap-4 text-lg text-muted-foreground lg:text-xl">
                {paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
            {stats && (
                <dl className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-8 border-t pt-10 md:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="flex flex-col items-center gap-1 text-center"
                        >
                            <dt className="sr-only">{stat.label}</dt>
                            <dd className="text-4xl font-bold text-accent lg:text-5xl">
                                {stat.value}
                            </dd>
                            <p className="text-sm text-muted-foreground">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </dl>
            )}
        </div>
    )
}

export { About }
export type { Stat }
