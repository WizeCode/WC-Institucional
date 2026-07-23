import React from "react"
import { Badge, type BadgeVariant } from "@/components/ui/badge"

/** Números de impacto de um case, em cards (valor grande + rótulo). */

interface Metric {
    value: string
    label: string
}

interface MetricsProps {
    badge?: string
    badgeVariant?: BadgeVariant
    title: React.ReactNode
    metrics: Metric[]
}

const Metrics = ({
    badge,
    badgeVariant = "outline",
    title,
    metrics,
}: MetricsProps) => (
    <div className="flex flex-col gap-10">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
            {badge && (
                <Badge className="mx-auto" variant={badgeVariant}>
                    {badge}
                </Badge>
            )}
            <h2 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                {title}
            </h2>
        </div>
        <div className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4">
            {metrics.map((metric) => (
                <div
                    key={metric.label}
                    className="flex flex-col items-center gap-2 rounded-lg bg-muted/70 p-8 text-center"
                >
                    <span className="text-4xl font-bold text-accent lg:text-5xl">
                        {metric.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        {metric.label}
                    </span>
                </div>
            ))}
        </div>
    </div>
)

export { Metrics }
export type { Metric, MetricsProps }
