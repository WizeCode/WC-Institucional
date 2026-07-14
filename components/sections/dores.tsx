import React from "react"
import { X } from "lucide-react"
import { Badge, type BadgeVariant } from "@/components/ui/badge"

interface DoresProps {
    badge?: string
    badgeVariant?: BadgeVariant
    title: React.ReactNode
    description?: React.ReactNode
    items: string[]
}

const Dores = ({
    badge,
    badgeVariant = "outline",
    title,
    description,
    items,
}: DoresProps) => {
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
                {description && (
                    <p className="mb-4 max-w-xl lg:text-xl">{description}</p>
                )}
            </div>
            <ul className="mx-auto mt-12 grid w-full max-w-4xl gap-4 sm:grid-cols-2">
                {items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                        <span
                            aria-hidden="true"
                            className="my-auto flex items-center justify-center text-destructive"
                        >
                            <X className="size-4" />
                        </span>
                        <span className="">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export { Dores }
export type { DoresProps }
