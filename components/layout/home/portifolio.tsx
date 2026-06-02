"use client"

import { Badge } from "@/components/ui/badge"
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
import { ServiceCategory, ServiceIcons } from "@/types/services"

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

interface PortifolioProps {
    heading?: string
    description?: string
    projects?: Project[]
    buttonText?: string
    badgeText?: string
}

const defaultProjects: Project[] = [
    {
        id: "1",
        title: "Porpagandista de Primeira",
        category: "Educação",
        service: "Websites",
        year: "2025",
        description:
            "Site institucional desenvolvido em WordPress para uma empresa de educação, com foco em apresentação de cursos, captação de leads e identidade visual alinhada ao posicionamento da marca.",
        image: "https://placehold.co/1080x1080",
    },
    {
        id: "2",
        title: "Aerial View of Rice Terraces",
        category: "Agriculture",
        service: "Websites",
        year: "2023",
        description:
            "Stunning aerial perspective of terraced rice fields showcasing intricate geometric patterns and vibrant green landscapes carved into the hillsides.",
        image: "https://placehold.co/1080x1080",
    },
    {
        id: "3",
        title: "Desert Canyon Formations",
        category: "Landscape",
        service: "Websites",
        year: "2022",
        description:
            "Dramatic aerial view of layered sandstone formations revealing millions of years of geological history through deep canyons and weathered rock strata.",
        image: "https://placehold.co/1080x1080",
    },
    {
        id: "4",
        title: "Golden Terraced Fields",
        category: "Agriculture",
        service: "Websites",
        year: "2022",
        description:
            "Mesmerizing aerial view of golden terraced agricultural fields displaying intricate contour patterns carved into the mountainous landscape during harvest season.",
        image: "https://placehold.co/1080x1080",
    },
    {
        id: "5",
        title: "Tidal Sand Patterns",
        category: "Landscape",
        service: "Websites",
        year: "2023",
        description:
            "Mesmerizing aerial view of flowing water patterns carved into dark volcanic sand, creating organic sculptural forms shaped by tidal forces.",
        image: "https://placehold.co/1080x1080",
    },
    {
        id: "6",
        title: "Red Rock Canyon Labyrinth",
        category: "Landscape",
        service: "Websites",
        year: "2022",
        description:
            "Breathtaking aerial view of red sandstone canyon formations displaying deep gorges, weathered rock layers, and intricate geological patterns carved over millennia.",
        image: "https://placehold.co/1080x1080",
    },
]

const Portifolio = ({
    heading = "Nosso Portfólio",
    description = "Cases de sucesso que refletem nossa expertise e compromisso com a excelência em cada projeto.",
    buttonText = "Ver todos os cases",
    badgeText = "/ Portfólio",
    projects = defaultProjects,
}: PortifolioProps) => {
    return (
        <section className="px-8 my-8">
            <div className="container mx-auto w-full py-8 ">
                <div className="flex flex-col md:flex-row md:items-end md:text-start items-center text-center justify-between mb-16 gap-10">
                    <div className="flex flex-col gap-2">
                        <Badge className="mb-4 mx-auto md:mx-0" variant="outline">{badgeText}</Badge>
                        <h1 className="text-2xl font-medium tracking-tight lg:text-3xl xl:text-4xl">
                            {heading}
                        </h1>
                        <p className="text-lg text-muted-foreground lg:text-xl">
                            {description}
                        </p>
                    </div>
                    <div>
                        <Button variant="default" size="lg">
                            {buttonText}
                        </Button>
                    </div>
                </div>

                <div className="relative w-full">
                    <div className="pointer-events-none absolute top-0 -right-px z-10 h-full w-32 bg-linear-to-l from-background to-transparent sm:w-64" />
                    <Carousel opts={{ align: "start" }} className="w-full">
                        <CarouselContent className="-ml-4 pr-8">
                            {projects.map((project) => (
                                <CarouselItem
                                    key={project.id}
                                    className="basis-auto pl-4"
                                >
                                    <div className="w-[calc(100vw-6rem)] sm:w-[350px] md:w-[450px]">
                                        <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
                                            <div className="aspect-square overflow-hidden">
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    width={450}
                                                    height={450}
                                                    unoptimized
                                                    className="aspect-square h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                                />
                                            </div>
                                            <div className="space-y-4 p-6">
                                                <div className="space-y-3">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <h2 className="text-xl leading-tight font-semibold">
                                                            {project.title}
                                                        </h2>
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
                                                                    ServiceIcons[
                                                                        project
                                                                            .service
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
                                                </div>
                                                <p className="text-sm leading-relaxed text-muted-foreground">
                                                    {project.description}
                                                </p>
                                                <div className="pt-2">
                                                    <Button
                                                        size="sm"
                                                        className="w-full"
                                                    >
                                                        Ver case
                                                    </Button>
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
        </section>
    )
}

export { Portifolio }
