import React from "react"
import Image from "next/image"
import { Badge, type BadgeVariant } from "@/components/ui/badge"
import type { Technology } from "@/components/sections/stack"
import { cn } from "@/lib/utils"

/**
 * Stack agrupada por camada (Frontend, Backend, Banco de dados…) em colunas
 * estáticas. É a versão para páginas de serviço, onde comunicar competência
 * técnica vale mais que o efeito visual — o marquee animado (`Stack`) fica na
 * home. Não é uma variante de `Stack`: a árvore HTML e o dado (grupos nomeados,
 * não 3 fileiras) são outros, então é componente separado. Ver `AGENTS.md`.
 */

interface StackGroup {
    name: string
    items: Technology[]
}

interface StackGroupsProps {
    badge?: string
    badgeVariant?: BadgeVariant
    title: React.ReactNode
    description: React.ReactNode
    groups: StackGroup[]
}

const StackGroups = ({
    badge,
    badgeVariant = "outline",
    title,
    description,
    groups,
}: StackGroupsProps) => {
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
                <p className="mb-4 max-w-xl text-muted-foreground lg:text-xl">
                    {description}
                </p>
            </div>
            <div className="mx-auto mt-6 flex w-full max-w-6xl flex-wrap justify-center gap-x-12 gap-y-10">
                {groups.map((group) => (
                    <div
                        key={group.name}
                        className="flex min-w-40 flex-1 basis-40 flex-col gap-6"
                    >
                        <h3 className="border-b pb-3 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                            {group.name}
                        </h3>
                        <div className="flex flex-col items-start gap-5">
                            {group.items.map((tech) => (
                                <div
                                    key={tech.id}
                                    className="flex items-center gap-3"
                                >
                                    <Image
                                        src={tech.logo}
                                        alt={tech.name}
                                        width={720}
                                        height={720}
                                        className={cn(
                                            "size-6 shrink-0 object-contain",
                                            tech.blackInLight &&
                                                "brightness-0 dark:invert"
                                        )}
                                    />
                                    <span className="font-medium">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { StackGroups }
export type { StackGroup, StackGroupsProps }
