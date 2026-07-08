import React from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
    children: React.ReactNode
    className?: string
    variant?: "default" | "soft" | "accent"
    /** Camada full-bleed renderizada fora do container (ex: Particles). */
    backdrop?: React.ReactNode
}

const Section = ({
    children,
    className,
    variant = "default",
    backdrop,
}: SectionProps) => (
    <section
        className={cn(
            "my-8 px-8 py-8",
            variant === "soft" && "mx-4 rounded-md bg-accent/5 px-4 sm:px-8",
            variant === "accent" &&
                "relative mx-4 rounded-md bg-accent px-4 sm:px-8 dark:bg-accent/10",
            className
        )}
    >
        {backdrop}
        <div className="container mx-auto">{children}</div>
    </section>
)

export { Section }
export type { SectionProps }
