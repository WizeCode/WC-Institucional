"use client"

import { Badge } from "@/components/ui/badge"
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
    heading?: string
    description?: string
    badgeText?: string
    techRowOne?: Technology[]
    techRowTwo?: Technology[]
    techRowThree?: Technology[]
}

const icon = (file: string) => `/images/stack/${file}.svg`

const defaultTechRowOne: Technology[] = [
    { id: "nextjs", name: "Next.js", logo: icon("nextjs"), blackInLight: true },
    { id: "react", name: "React", logo: icon("react") },
    { id: "typescript", name: "TypeScript", logo: icon("typescript") },
    { id: "javascript", name: "JavaScript", logo: icon("javascript") },
    { id: "tailwindcss", name: "Tailwind CSS", logo: icon("tailwindcss") },
    { id: "nodejs", name: "Node.js", logo: icon("nodejs") },
]

const defaultTechRowTwo: Technology[] = [
    { id: "wordpress", name: "WordPress", logo: icon("wordpress"), blackInLight: true },
    { id: "nest", name: "Nest.JS", logo: icon("nestjs") },
    { id: "github", name: "GitHub", logo: icon("github"), blackInLight: true },
    { id: "postgresql", name: "PostgreSQL", logo: icon("postgresql") },
    { id: "docker", name: "Docker", logo: icon("docker") },
    { id: "vercel", name: "Vercel", logo: icon("vercel"), blackInLight: true },
]

const defaultTechRowThree: Technology[] = [
    { id: "n8n", name: "n8n", logo: icon("n8n") },
    { id: "python", name: "Python", logo: icon("python") },
    { id: "mongodb", name: "MongoDB", logo: icon("mongodb") },
    { id: "datastudio", name: "Looker Studio", logo: icon("datastudio") },
    { id: "claude", name: "Claude", logo: icon("claude") },
    { id: "googlecloud", name: "Google Cloud", logo: icon("googlecloud") },
]

const TechMarqueeItem = ({ tech }: { tech: Technology }) => (
    <MarqueeItem className="mx-0.5 sm:mx-8 flex aspect-3/1 w-32 items-center justify-center sm:w-40 lg:mx-10">
        <Image
            src={tech.logo}
            alt={tech.name}
            width={720}
            height={720}
            unoptimized
            className={cn(
                "h-auto max-h-8 sm:max-h-10 w-auto object-contain",
                tech.blackInLight && "brightness-0 dark:invert"
            )}
        />
    </MarqueeItem>
)

const Stack = ({
    heading = "Técnologias confiáveis",
    description = "Stack sólida e confiável, com tecnologias modernas, garantindo a qualidade e performance dos nossos projetos.",
    badgeText = "/ Stack",
    techRowOne = defaultTechRowOne,
    techRowTwo = defaultTechRowTwo,
    techRowThree = defaultTechRowThree
}: StackProps) => {
    return (
        <section className="px-8 my-8">
            <div className="container mx-auto py-8 sm:py-16">
                <div className="flex flex-col gap-2 text-center">
                    <Badge className="mb-4 mx-auto" variant="outline">{badgeText}</Badge>
                    <h2 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                        {heading}
                    </h2>
                    <p className="text-lg text-muted-foreground lg:text-xl mb-4">
                        {description}
                    </p>
                </div>
                <div className="mt-10 flex w-full flex-col gap-8 max-w-270 mx-auto">
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
            </div>
        </section>
    )
}

export { Stack }
