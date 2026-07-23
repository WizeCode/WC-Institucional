"use client"

import { Badge, type BadgeVariant } from "@/components/ui/badge"
import {
    Marquee,
    MarqueeContent,
    MarqueeFade,
    MarqueeItem,
} from "@/components/ui/marquee"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Technology {
    id: string
    name: string
    logo: string
    blackInLight?: boolean
}

interface StackProps {
    title: string
    description: string
    badge: string
    badgeVariant?: BadgeVariant
    techRowOne: Technology[]
    techRowTwo: Technology[]
    techRowThree: Technology[]
}

const TechMarqueeItem = ({ tech }: { tech: Technology }) => (
    <MarqueeItem className="mx-0.5 flex aspect-3/1 w-32 items-center justify-center sm:mx-8 sm:w-40 lg:mx-10">
        <Image
            src={tech.logo}
            alt={tech.name}
            width={720}
            height={720}
            className={cn(
                "h-auto max-h-8 w-auto object-contain sm:max-h-10",
                tech.blackInLight && "brightness-0 dark:invert"
            )}
        />
    </MarqueeItem>
)

const Stack = ({
    title,
    description,
    badge,
    badgeVariant = "outline",
    techRowOne,
    techRowTwo,
    techRowThree,
}: StackProps) => {
    return (
        <>
            <div className="flex flex-col gap-2 text-center">
                <Badge className="mx-auto mb-4" variant={badgeVariant}>
                    {badge}
                </Badge>
                <h2 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                    {title}
                </h2>
                <p className="mb-4 text-lg text-muted-foreground lg:text-xl">
                    {description}
                </p>
            </div>
            <div className="mx-auto mt-10 flex w-full max-w-270 flex-col gap-8">
                <Marquee>
                    <MarqueeContent speed={40} direction="left">
                        {techRowOne.map((tech) => (
                            <TechMarqueeItem key={tech.id} tech={tech} />
                        ))}
                    </MarqueeContent>
                    <MarqueeFade side="left" />
                    <MarqueeFade side="right" />
                </Marquee>
                <Marquee>
                    <MarqueeContent speed={40} direction="right">
                        {techRowTwo.map((tech) => (
                            <TechMarqueeItem key={tech.id} tech={tech} />
                        ))}
                    </MarqueeContent>
                    <MarqueeFade side="left" />
                    <MarqueeFade side="right" />
                </Marquee>
                <Marquee>
                    <MarqueeContent speed={40} direction="left">
                        {techRowThree.map((tech) => (
                            <TechMarqueeItem key={tech.id} tech={tech} />
                        ))}
                    </MarqueeContent>
                    <MarqueeFade side="left" />
                    <MarqueeFade side="right" />
                </Marquee>
            </div>
        </>
    )
}

export { Stack }
export type { Technology, StackProps }
