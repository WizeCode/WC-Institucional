"use client"

import { usePostHog } from "posthog-js/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import React from "react"

interface HeroProps {
    variant?: "default" | "reversed" | "centered"
    badge?: string
    title: React.ReactNode
    description?: React.ReactNode
    cta?: {
        primary?: { text: string; url: string }
        secondary?: { text: string; url: string }
    }
    /** Slot de mídia (terminal, imagem…). Ignorado na variant "centered". */
    children?: React.ReactNode
}

const Hero = ({
    variant = "default",
    badge,
    title,
    description,
    cta,
    children,
}: HeroProps) => {
    const posthog = usePostHog()
    const centered = variant === "centered"

    return (
        <div
            className={cn(
                "flex w-full items-center gap-10 lg:gap-20",
                variant === "default" && "flex-col lg:flex-row",
                variant === "reversed" && "flex-col lg:flex-row-reverse",
                centered && "flex-col"
            )}
        >
            <div
                className={cn(
                    "mx-auto flex flex-1 flex-col",
                    centered
                        ? "items-center text-center"
                        : "items-center text-center md:ml-auto lg:ml-0 lg:max-w-3xl lg:items-start lg:text-left"
                )}
            >
                {badge && <Badge variant="outline">{badge}</Badge>}
                <h1 className="my-6 text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                    {title}
                </h1>
                {description && (
                    <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                        {description}
                    </p>
                )}
                {cta && (cta.primary || cta.secondary) && (
                    <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center lg:justify-start">
                        {cta.primary && (
                            <Button asChild className="w-full sm:w-auto">
                                <a href={cta.primary.url}>{cta.primary.text}</a>
                            </Button>
                        )}
                        {cta.secondary && (
                            <Button
                                asChild
                                variant="outline"
                                onClick={() =>
                                    posthog.capture("cta_contact_clicked", {
                                        source: "hero",
                                    })
                                }
                            >
                                <a href={cta.secondary.url}>
                                    {cta.secondary.text}
                                </a>
                            </Button>
                        )}
                    </div>
                )}
            </div>
            {!centered && children && (
                <div className="flex w-full flex-1 justify-center lg:justify-end">
                    {children}
                </div>
            )}
        </div>
    )
}

export { Hero }
export type { HeroProps }
