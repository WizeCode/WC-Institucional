import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Badge, type BadgeVariant } from "@/components/ui/badge"
import { icons, type IconName } from "@/lib/icons"
import { cn } from "@/lib/utils"

/**
 * Grade genérica de cards (ícone + título + descrição), com um card podendo
 * ganhar destaque (`highlight`). O número de colunas é uma variante de layout
 * (`columns`) — só troca classes, sem mudar a árvore, então é `cva`, não
 * componente novo. Usada em "Benefícios" (3 col) e "Propósito" (2 col).
 *
 * Não é `Values`: lá o `letter` é estrutural — o card é desenhado em volta dele
 * e o ícone vive no `Pointer` do cursor. Trocar letra por ícone renderiza outra
 * árvore, e árvore diferente é componente novo. Ver `AGENTS.md`.
 *
 * ```tsx
 * <FeatureGrid
 *     columns="two"
 *     badge={data.proposito.badge}
 *     title={rich(data.proposito.title)}
 *     items={data.proposito.items}
 * />
 * ```
 */

const gridVariants = cva("mx-auto grid w-full gap-4", {
    variants: {
        columns: {
            two: "max-w-4xl md:grid-cols-2",
            three: "max-w-6xl sm:grid-cols-2 lg:grid-cols-3",
        },
    },
    defaultVariants: {
        columns: "three",
    },
})

interface Feature {
    title: string
    description: string
    icon: IconName
    /** Destaca o card. Usado no argumento âncora da seção. */
    highlight?: boolean
}

interface FeatureGridProps extends VariantProps<typeof gridVariants> {
    badge?: string
    badgeVariant?: BadgeVariant
    title: React.ReactNode
    description?: React.ReactNode
    items: Feature[]
}

const FeatureCard = ({ title, description, icon, highlight }: Feature) => {
    const Icon = icons[icon]

    return (
        <div
            className={cn(
                "flex h-full flex-col gap-4 rounded-lg border p-6 transition-transform duration-300 hover:-translate-y-2",
                highlight
                    ? "bg-background shadow-md shadow-accent dark:bg-accent/10"
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

const FeatureGrid = ({
    badge,
    badgeVariant = "outline",
    title,
    description,
    items,
    columns,
}: FeatureGridProps) => {
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
                {description && (
                    <p className="text-muted-foreground lg:text-xl">
                        {description}
                    </p>
                )}
            </div>
            <div className={cn(gridVariants({ columns }))}>
                {items.map((item) => (
                    <FeatureCard key={item.title} {...item} />
                ))}
            </div>
        </div>
    )
}

export { FeatureGrid, gridVariants }
export type { Feature, FeatureGridProps }
