"use client"

import { Badge, type BadgeVariant } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Calendar } from "lucide-react"
import Image from "next/image"
import { ServiceCategory, services } from "@/lib/services"
import { icons } from "@/lib/icons"

interface Project {
    id: string
    title: string
    category: string
    service: ServiceCategory
    year: string
    description: string
    image: string
    href?: string
}

interface PortfolioProps {
    title: string
    description: string
    projects: Project[]
    button: { url: string; text: string }
    badge: string
    badgeVariant?: BadgeVariant
}

const Portfolio = ({
    title,
    description,
    button,
    badge,
    badgeVariant = "outline",
    projects,
}: PortfolioProps) => {
    return (
        <div className="w-full">
            <div className="mb-16 flex flex-col items-center justify-between gap-10 text-center md:flex-row md:items-end md:text-start">
                <div className="flex flex-col gap-2">
                    <Badge
                        className="mx-auto mb-4 md:mx-0"
                        variant={badgeVariant}
                    >
                        {badge}
                    </Badge>
                    <h2 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                        {title}
                    </h2>
                    <p className="text-lg text-muted-foreground lg:text-xl">
                        {description}
                    </p>
                </div>
                {button && (
                    <div>
                        <a href={button.url}>
                            <Button variant="default" size="lg">
                                {button.text}
                            </Button>
                        </a>
                    </div>
                )}
            </div>

            <div className="relative w-full">
                <div className="pointer-events-none absolute top-0 -right-px z-10 h-full w-32 bg-linear-to-l from-background to-transparent sm:w-64" />
                <Carousel opts={{ align: "start" }} className="w-full">
                    <CarouselContent className="-ml-4 items-stretch pr-8">
                        {projects.map((project) => (
                            <CarouselItem
                                key={project.id}
                                className="h-auto basis-auto pl-4"
                            >
                                <div className="h-full w-[calc(100vw-6rem)] sm:w-87.5 md:w-112.5">
                                    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
                                        <div className="aspect-square overflow-hidden">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                width={450}
                                                height={450}
                                                className="aspect-square h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                                            <div className="space-y-2">
                                                <div className="flex items-start justify-between gap-3">
                                                    <h3 className="text-xl leading-tight font-semibold">
                                                        {project.title}
                                                    </h3>
                                                    <Badge
                                                        variant="outline"
                                                        className="shrink-0"
                                                    >
                                                        {project.category}
                                                    </Badge>
                                                </div>

                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        {(() => {
                                                            const Icon =
                                                                icons[
                                                                    services[
                                                                        project
                                                                            .service
                                                                    ].icon
                                                                ]
                                                            return (
                                                                <>
                                                                    <Icon className="h-4 w-4" />
                                                                    {
                                                                        project.service
                                                                    }
                                                                </>
                                                            )
                                                        })()}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {project.year}
                                                    </div>
                                                </div>
                                                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                                    {project.description}
                                                </p>
                                            </div>

                                            <div className="pt-2">
                                                <a
                                                    href={project.href}
                                                    target="_blank"
                                                >
                                                    <Button
                                                        size="sm"
                                                        className="w-full"
                                                    >
                                                        Acessar site
                                                    </Button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="pointer-events-none absolute inset-y-0 -top-20 right-20 left-20 z-10 flex justify-between px-8 sm:top-20">
                        <CarouselPrevious className="pointer-events-auto h-10 w-10 rounded-full border-gray-200 bg-white/90 shadow-lg hover:bg-white" />
                        <CarouselNext className="pointer-events-auto h-10 w-10 rounded-full border-gray-200 bg-white/90 shadow-lg hover:bg-white" />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export { Portfolio }
export type { Project }
