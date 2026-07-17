import React from "react"
import { Badge, type BadgeVariant } from "@/components/ui/badge"
import { icons, type IconName } from "@/lib/icons"
import { cn } from "@/lib/utils"

/**
 * Grade de benefícios: cards de ícone + título + descrição, um deles podendo
 * ganhar destaque (`highlight`) para ancorar a leitura.
 *
 * Não é variante de `Values`: lá o `letter` é estrutural — o card é
 * desenhado em volta dele e o ícone vive no `Pointer` do cursor. Trocar letra
 * por ícone renderiza outra árvore, e árvore diferente é componente novo.
 * Ver `AGENTS.md`.
 *
 * ```tsx
 * <Benefits
 *     badge={data.beneficios.badge}
 *     title={rich(data.beneficios.title)}
 *     description={data.beneficios.description}
 *     items={data.beneficios.items}
 * />
 * ```
 */

interface Benefit {
    title: string
    description: string
    icon: IconName
    /** Destaca o card. Usado no argumento âncora da seção. */
    highlight?: boolean
}

interface BenefitsProps {
    badge?: string
    badgeVariant?: BadgeVariant
    title: React.ReactNode
    description: React.ReactNode
    items: Benefit[]
}

const BenefitCard = ({ title, description, icon, highlight }: Benefit) => {
    const Icon = icons[icon]

    return (
        <div
            className={cn(
                "flex h-full flex-col gap-4 rounded-lg border p-6 transition-transform duration-300 hover:-translate-y-2",
                highlight
                    ? "shadow-md shadow-accent bg-background dark:bg-accent/10"
                    : "bg-background"
            )}
        >
            <div
                className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-md",
                    highlight
                        ? "bg-accent text-white"
                        : "bg-muted text-foreground"
                )}
            >
                <Icon className="size-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-lg leading-snug font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}

const Benefits = ({
    badge,
    badgeVariant = "outline",
    title,
    description,
    items,
}: BenefitsProps) => {
    return (
        <div className="flex flex-col gap-8 lg:gap-12">
            <div className="mx-auto flex max-w-xl flex-col justify-center gap-4 text-center">
                {badge && (
                    <Badge className="mx-auto" variant={badgeVariant}>
                        {badge}
                    </Badge>
                )}
                <h2 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                    {title}
                </h2>
                <p className="text-muted-foreground lg:text-xl">
                    {description}
                </p>
            </div>
            <div className="mx-auto grid w-full max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <BenefitCard key={item.title} {...item} />
                ))}
            </div>
        </div>
    )
}

export { Benefits }
export type { Benefit, BenefitsProps }
