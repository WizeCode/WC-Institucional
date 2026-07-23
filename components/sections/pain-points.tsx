import React from "react"
import { X } from "lucide-react"
import { Badge, type BadgeVariant } from "@/components/ui/badge"

interface PainPointsProps {
    badge?: string
    badgeVariant?: BadgeVariant
    title: React.ReactNode
    description?: React.ReactNode
    items: string[]
}

const PainPoints = ({
    badge,
    badgeVariant = "outline",
    title,
    description,
    items,
}: PainPointsProps) => {
    return (
        <div className="flex flex-col gap-4">
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
                    <p className="mb-4 max-w-xl lg:text-xl">{description}</p>
                )}
            </div>
            <ul className="mx-auto flex w-full max-w-5xl flex-wrap gap-x-12 gap-y-4">
                {items.map((item) => (
                    <li
                        key={item}
                        className="flex grow basis-full items-center gap-3 md:basis-[45%]"
                    >
                        <span
                            aria-hidden="true"
                            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-accent dark:text-background"
                        >
                            <X className="size-3.5" strokeWidth={3} />
                        </span>
                        <span className="">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export { PainPoints }
export type { PainPointsProps }
