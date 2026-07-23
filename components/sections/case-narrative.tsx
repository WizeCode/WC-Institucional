import React from "react"
import { Badge, type BadgeVariant } from "@/components/ui/badge"

/** Bloco de texto de um case (rótulo, título, parágrafos). Serve "O desafio" e "A solução". */

interface CaseNarrativeProps {
    badge?: string
    badgeVariant?: BadgeVariant
    title: React.ReactNode
    body: string[]
}

const CaseNarrative = ({
    badge,
    badgeVariant = "outline",
    title,
    body,
}: CaseNarrativeProps) => (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-4">
            {badge && (
                <Badge className="w-fit" variant={badgeVariant}>
                    {badge}
                </Badge>
            )}
            <h2 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                {title}
            </h2>
        </div>
        <div className="flex flex-col gap-4 text-lg leading-relaxed text-muted-foreground">
            {body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </div>
    </div>
)

export { CaseNarrative }
export type { CaseNarrativeProps }
