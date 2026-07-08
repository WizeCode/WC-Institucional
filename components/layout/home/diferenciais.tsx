"use client"

import { Badge } from "@/components/ui/badge"
import { Pointer } from "@/components/ui/pointer"
import { icons, type IconName } from "@/lib/icons"
import { motion } from "motion/react"
import React, { useSyncExternalStore } from "react"

interface Diferencial {
    letter: string
    title: string
    description: string
    icon: IconName
}

interface DiferenciaisProps {
    heading: React.ReactNode
    description: string
    badgeText: string
    items: Diferencial[]
}

const DiferencialCard = ({ letter, title, description, icon }: Diferencial) => {
    const Icon = icons[icon]
    const hasPointer = useSyncExternalStore(
        () => () => {},
        () => window.matchMedia("(pointer: fine)").matches,
        () => false
    )

    return (
        <div className="relative flex h-full flex-col gap-4 rounded-lg border bg-background p-6">
            {hasPointer && (
                <Pointer>
                    <Icon className="size-6 text-accent" />
                </Pointer>
            )}
            <div className="mx-auto flex h-12 w-12 items-center justify-center text-5xl font-bold text-accent">
                {letter}
            </div>
            <div className="flex flex-col gap-2">
                <p className="mx-auto leading-snug font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}

const Diferenciais = ({
    heading,
    description,
    badgeText,
    items,
}: DiferenciaisProps) => {
    return (
        <div className="flex flex-col gap-8 lg:gap-16">
            <div className="flex flex-1 flex-col justify-center gap-2 text-center">
                <Badge className="mx-auto mb-4" variant="outline">
                    {badgeText}
                </Badge>
                <h2 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                    {heading}
                </h2>
                <p className="mb-4 text-lg text-muted-foreground lg:text-xl">
                    {description}
                </p>
            </div>
            <div className="flex flex-1 flex-wrap gap-4">
                {items.map((item) => (
                    <motion.div
                        key={item.letter}
                        className="flex w-full md:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]"
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.1, ease: "easeInOut" }}
                    >
                        <DiferencialCard {...item} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export { Diferenciais }
export type { Diferencial }
