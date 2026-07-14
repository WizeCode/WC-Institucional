import Image from "next/image"
import React from "react"
import { Badge, type BadgeVariant } from "@/components/ui/badge"
import { icons, type IconName } from "@/lib/icons"
import { cn } from "@/lib/utils"

interface BentoItem {
    title: string
    description: string
    icon?: IconName
    image?: { src: string; alt: string }
    className?: string
    layout?: "stacked" | "split"
}

interface BentoGridProps {
    badge?: string
    badgeVariant?: BadgeVariant
    title: React.ReactNode
    description: React.ReactNode
    items: BentoItem[]
}

const BentoCell = ({ item }: { item: BentoItem }) => {
    const Icon = item.icon ? icons[item.icon] : null
    const iconEl = Icon ? (
        <Icon className="mb-6 h-auto w-11" aria-hidden="true" />
    ) : null
    const textBlock = (
        <>
            <h3 className="mb-1 text-2xl font-medium">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
        </>
    )

    // Texto e imagem lado a lado (célula larga)
    if (item.image && item.layout === "split") {
        return (
            <div
                className={cn(
                    "flex h-60 flex-col-reverse justify-between gap-2 rounded-lg bg-muted/70 p-8 transition-transform duration-300 hover:-translate-y-3 md:gap-4 lg:grid lg:grid-cols-2",
                    item.className
                )}
            >
                <div className="lg:self-end">{textBlock}</div>
                {Icon && <div className="md:hidden">{iconEl}</div>}
                <div className="relative hidden h-full min-h-0 md:flex">
                    <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="rounded-lg object-cover"
                    />
                </div>
            </div>
        )
    }

    // Texto em cima, imagem embaixo (célula destaque)
    if (item.image) {
        return (
            <div
                className={cn(
                    "flex flex-col justify-between gap-6 rounded-lg bg-muted/70 p-8 transition-transform duration-300 hover:-translate-y-3",
                    item.className
                )}
            >
                <div>
                    {iconEl}
                    {textBlock}
                </div>
                <div className="relative mx-auto h-full w-full">
                    <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(min-width: 768px) 66vw, 100vw"
                        className="rounded-lg object-cover"
                    />
                </div>
            </div>
        )
    }

    // Card simples: ícone em cima, texto embaixo
    return (
        <div
            className={cn(
                "flex h-60 flex-col justify-between gap-2 rounded-lg bg-muted/70 p-8 transition-transform duration-300 hover:-translate-y-3",
                item.className
            )}
        >
            {iconEl}
            <div>{textBlock}</div>
        </div>
    )
}

const BentoGrid = ({
    badge,
    badgeVariant = "outline",
    title,
    description,
    items,
}: BentoGridProps) => {
    return (
        <div className="flex flex-col">
            <div className="mx-auto flex max-w-xl flex-col justify-center gap-4 text-center">
                {badge && (
                    <Badge className="mx-auto" variant={badgeVariant}>
                        {badge}
                    </Badge>
                )}
                <h2 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                    {title}
                </h2>
                <p className="mb-4 max-w-xl text-muted-foreground lg:text-xl">
                    {description}
                </p>
            </div>
            <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <BentoCell key={item.title} item={item} />
                ))}
            </div>
        </div>
    )
}

export { BentoGrid }
export type { BentoItem, BentoGridProps }
