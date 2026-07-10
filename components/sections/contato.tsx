"use client"

import { Badge, type BadgeVariant } from "@/components/ui/badge"
import type { ContatoFormData } from "@/lib/contato/schema"
import { icons, type IconName } from "@/lib/icons"
import Link from "next/link"
import dynamic from "next/dynamic"
import { motion } from "motion/react"

const ContatoForm = dynamic(
    () =>
        import("@/components/forms/contato-form").then(
            (mod) => mod.ContatoForm
        ),
    {
        ssr: false,
        loading: () => (
            <div className="flex h-full w-full flex-col gap-4 px-6 py-10">
                <div className="flex flex-col gap-4 xl:flex-row">
                    <div className="h-16 flex-1 animate-pulse rounded-md bg-muted" />
                    <div className="h-16 flex-1 animate-pulse rounded-md bg-muted" />
                </div>
                <div className="flex flex-col gap-4 xl:flex-row">
                    <div className="h-16 flex-1 animate-pulse rounded-md bg-muted" />
                    <div className="h-16 flex-1 animate-pulse rounded-md bg-muted" />
                </div>
                <div className="h-16 animate-pulse rounded-md bg-muted" />
                <div className="h-36 animate-pulse rounded-md bg-muted" />
                <div className="h-10 animate-pulse rounded-md bg-muted sm:w-40 sm:self-end" />
            </div>
        ),
    }
)

interface InfoCard {
    icon: IconName
    label: string
    value: string
    href?: string
}

interface ContatoProps {
    title: string
    description: string
    badge: string
    badgeVariant?: BadgeVariant
    infoCards: InfoCard[]
    servicoPadrao?: ContatoFormData["servico"]
}

const Contato = ({
    title,
    description,
    badge,
    badgeVariant = "default",
    infoCards,
    servicoPadrao,
}: ContatoProps) => {
    return (
        <>
            <div className="mb-8 flex flex-col gap-2 text-center">
                <Badge className="mx-auto mb-4" variant={badgeVariant}>
                    {badge}
                </Badge>
                <h2 className="text-2xl font-bold text-pretty text-white lg:text-3xl xl:text-4xl">
                    {title}
                </h2>
                <p className="mb-4 text-lg text-white lg:text-xl">
                    {description}
                </p>
            </div>
            <div className="flex gap-10">
                <div className="hidden flex-1 flex-col justify-start gap-4 lg:flex">
                    {infoCards.map((card) => {
                        const Icon = icons[card.icon]
                        const content = (
                            <div
                                key={card.label}
                                className="flex items-center gap-4"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-foreground/10">
                                    <Icon className="h-5 w-5 text-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm text-foreground/60">
                                        {card.label}
                                    </p>
                                    <p className="font-medium text-foreground">
                                        {card.value}
                                    </p>
                                </div>
                            </div>
                        )
                        return card.href ? (
                            <motion.div
                                key={card.label}
                                whileHover={{ y: -6 }}
                                transition={{
                                    duration: 0.1,
                                    ease: "easeInOut",
                                }}
                            >
                                <Link
                                    href={card.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative z-20 block rounded-lg bg-background p-6 shadow-lg"
                                >
                                    {content}
                                </Link>
                            </motion.div>
                        ) : (
                            content
                        )
                    })}
                </div>
                <div className="relative z-20 flex-1 rounded-lg bg-background text-foreground shadow-lg">
                    <ContatoForm servicoPadrao={servicoPadrao} />
                </div>
            </div>
        </>
    )
}

export { Contato }
export type { InfoCard }
