import React from "react"
import Image from "next/image"
import { Badge, type BadgeVariant } from "@/components/ui/badge"

/**
 * Grade de membros da equipe: foto + nome + cargo + bio curta. Humaniza a
 * empresa e gera confiança. A foto vem por `next/image`; enquanto não houver
 * retrato oficial, use um placeholder (`placehold.co`, já liberado no
 * `next.config`) — o card não muda, só a `src`. Ver `docs/CONVENTIONS.md`.
 *
 * ```tsx
 * <Team
 *     badge={data.team.badge}
 *     title={rich(data.team.title)}
 *     description={data.team.description}
 *     members={data.team.members}
 * />
 * ```
 */

interface TeamMember {
    name: string
    role: string
    bio: string
    image: { src: string; alt: string }
}

interface TeamProps {
    badge?: string
    badgeVariant?: BadgeVariant
    title: React.ReactNode
    description?: React.ReactNode
    members: TeamMember[]
}

const Team = ({
    badge,
    badgeVariant = "outline",
    title,
    description,
    members,
}: TeamProps) => {
    return (
        <div className="flex flex-col gap-8 lg:gap-12">
            <div className="mx-auto flex max-w-xl flex-col gap-4 text-center">
                {badge && (
                    <Badge className="mx-auto" variant={badgeVariant}>
                        {badge}
                    </Badge>
                )}
                <h2 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                    {title}
                </h2>
                {description && (
                    <p className="text-muted-foreground lg:text-xl">
                        {description}
                    </p>
                )}
            </div>
            <div className="mx-auto grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {members.map((member) => (
                    <div
                        key={member.name}
                        className="flex flex-col gap-4 rounded-lg border bg-background p-6"
                    >
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
                            <Image
                                src={member.image.src}
                                alt={member.image.alt}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg leading-snug font-semibold">
                                {member.name}
                            </h3>
                            <p className="text-sm font-medium text-accent">
                                {member.role}
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {member.bio}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { Team }
export type { TeamMember }
