"use client"

import React from "react"
import { motion, useReducedMotion } from "motion/react"
import { Badge, type BadgeVariant } from "@/components/ui/badge"
import { icons, type IconName } from "@/lib/icons"
import { cn } from "@/lib/utils"

interface TimelineStep {
    title: string
    description?: string
    icon?: IconName
    highlight?: boolean
}

interface TimelineProps {
    badge?: string
    badgeVariant?: BadgeVariant
    title: React.ReactNode
    description?: React.ReactNode
    items: TimelineStep[]
}

const Timeline = ({
    badge,
    badgeVariant = "outline",
    title,
    description,
    items,
}: TimelineProps) => {
    const shouldReduce = useReducedMotion()

    return (
        <div className="flex flex-col gap-8">
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
                    <p className="mb-4 max-w-xl text-muted-foreground lg:text-xl">
                        {description}
                    </p>
                )}
            </div>

            <ol className="mx-auto w-full max-w-2xl">
                {items.map((step, index) => {
                    const Icon = step.icon ? icons[step.icon] : null
                    const isLast = index === items.length - 1
                    return (
                        <motion.li
                            key={step.title}
                            className="flex gap-6"
                            initial={
                                shouldReduce ? false : { opacity: 0, y: 12 }
                            }
                            whileInView={
                                shouldReduce ? undefined : { opacity: 1, y: 0 }
                            }
                            viewport={{
                                once: true,
                                margin: "0px 0px -80px 0px",
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            {/* Trilho: nó numerado + linha conectora */}
                            <div className="flex flex-col items-center">
                                <div
                                    className={cn(
                                        "flex size-12 shrink-0 items-center justify-center rounded-full border text-lg font-semibold",
                                        step.highlight
                                            ? "border-accent bg-accent text-white"
                                            : "border-border bg-background text-foreground"
                                    )}
                                >
                                    {Icon ? (
                                        <Icon
                                            className="size-5"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                                {!isLast && (
                                    <div
                                        className="mt-2 w-px grow bg-border"
                                        aria-hidden="true"
                                    />
                                )}
                            </div>

                            {/* Conteúdo */}
                            <div className={cn(!isLast && "pb-10")}>
                                <h3 className="text-xl font-medium">
                                    {step.title}
                                </h3>
                                {step.description && (
                                    <p className="mt-1 text-muted-foreground">
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </motion.li>
                    )
                })}
            </ol>
        </div>
    )
}

export { Timeline }
export type { TimelineStep, TimelineProps }
