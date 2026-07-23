"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { cva } from "class-variance-authority"
import { Badge } from "@/components/ui/badge"
import { icons } from "@/lib/icons"
import { services, type ServiceCategory } from "@/lib/services"
import type { CaseSummary } from "@/lib/cases"
import { cn } from "@/lib/utils"

/** Grid de cases com filtro por categoria de serviço. Cada card linka para `/cases/[slug]`. */

const filterVariants = cva(
    "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
    {
        variants: {
            active: {
                true: "border-accent bg-accent text-white",
                false: "border-border bg-transparent text-muted-foreground hover:text-foreground",
            },
        },
        defaultVariants: { active: false },
    }
)

const filters: (ServiceCategory | "Todos")[] = [
    "Todos",
    ...(Object.keys(services) as ServiceCategory[]),
]

interface CasesGridProps {
    cases: CaseSummary[]
}

const CasesGrid = ({ cases }: CasesGridProps) => {
    const [active, setActive] = React.useState<ServiceCategory | "Todos">(
        "Todos"
    )

    const visible =
        active === "Todos"
            ? cases
            : cases.filter((item) => item.service === active)

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-wrap justify-center gap-3">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        type="button"
                        onClick={() => setActive(filter)}
                        className={filterVariants({
                            active: filter === active,
                        })}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((item) => {
                    const Icon = icons[services[item.service].icon]
                    return (
                        <Link
                            key={item.id}
                            href={`/cases/${item.slug}`}
                            className={cn(
                                "group flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-transform duration-300 hover:-translate-y-2"
                            )}
                        >
                            <div className="aspect-video overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={600}
                                    height={400}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-1 flex-col gap-3 p-6">
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-xl leading-tight font-semibold">
                                        {item.title}
                                    </h3>
                                    <Badge
                                        variant="outline"
                                        className="shrink-0"
                                    >
                                        {item.category}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Icon className="h-4 w-4" />
                                        {item.service}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {item.year}
                                    </span>
                                </div>
                                <span className="mt-auto pt-2 text-sm font-medium text-accent group-hover:underline">
                                    Ver case →
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export { CasesGrid }
export type { CasesGridProps }
