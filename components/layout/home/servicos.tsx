"use client"

import { Badge } from "@/components/ui/badge"
import React, { useState } from "react"
import { usePostHog } from "posthog-js/react"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item"
import { ChevronRight } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import { ServiceCategory, services as serviceCatalog } from "@/types/services"

interface ServiceItem {
    id: string
    title: ServiceCategory
    description: string
    color?: string
    href?: string
    image: {
        src: string
        alt: string
    }
}

interface ServicosProps {
    badgeText?: string
    heading?: string | React.ReactNode
    description?: React.ReactNode
    services?: ServiceItem[]
}

const Servicos = ({
    badgeText = "/ Serviços",
    heading = (
        <>
            O que a WizeCode <span className="text-accent">entrega</span> 
        </>
    ),
    description = (
        <>
            Do planejamento à entrega, desenvolvemos soluções digitais sob
            medida para o seu negócio.
        </>
    ),
    services = [
        {
            id: "Institucional",
            title: "Institucional",
            description: serviceCatalog["Institucional"].shortDescription,
            color: "#0f101f",
            href: serviceCatalog["Institucional"].href,
            image: { src: "/images/home/websites.svg", alt: "Website Institucional" },
        },
        {
            id: "Landing Page",
            title: "Landing Page",
            description: serviceCatalog["Landing Page"].shortDescription,
            color: "#37175a",
            href: serviceCatalog["Landing Page"].href,
            image: { src: "/images/home/landing page.svg", alt: "Landing Page" },
        },
        {
            id: "Sistemas",
            title: "Sistemas",
            description: serviceCatalog["Sistemas"].shortDescription,
            color: "#7849cb",
            href: serviceCatalog["Sistemas"].href,
            image: { src: "/images/home/sistemas2.svg", alt: "Sistemas" },
        },
        {
            id: "Automações",
            title: "Automações",
            description: serviceCatalog["Automações"].shortDescription,
            color: "#a67de0",
            href: serviceCatalog["Automações"].href,
            image: { src: "/images/home/automacoes2.png", alt: "Automações" },
        },
    ],
}: ServicosProps) => {
    const [activeId, setActiveId] = useState(services[0].id)
    const posthog = usePostHog()
    const activeService = services.find((s) => s.id === activeId)

    return (
        <section className="rounded-md bg-accent/5 mx-4 my-8 px-4 sm:px-8">
            <div className="container flex flex-col gap-6 mx-auto py-8">
                <div className="flex flex-col gap-3 items-center text-center">
                    <Badge className="mb-4" variant="default">{badgeText}</Badge>
                    <h2 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                        {heading}
                    </h2>
                    <p className="mb-4 max-w-xl text-muted-foreground lg:text-xl">
                        {description}
                    </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
                    {activeService && (
                        <div className="justify-center hidden overflow-hidden rounded-lg lg:flex">
                            <Image
                                key={activeService.id}
                                src={activeService.image.src}
                                alt={activeService.image.alt}
                                width={2160}
                                height={1080}
                                unoptimized
                                className="aspect-2/1 animate-in object-cover duration-300 fade-in"
                            />
                        </div>
                    )}
                    <div className="flex flex-col gap-3">
                        {services.map((service) => (
                            <motion.a
                                key={service.id}
                                href={service.href}
                                whileHover={{ y: -6 }}
                                transition={{ duration: 0.1, ease: "easeInOut" }}
                                className="block flex-1"
                                onMouseEnter={() => setActiveId(service.id)}
                                onClick={() => posthog.capture("service_clicked", { service: service.title, service_id: service.id })}
                            >
                                <Item
                                    style={{ backgroundColor: service.color }}
                                    className="text-white border-0 h-full"
                                    variant="outline"
                                >
                                    <ItemContent>
                                        <ItemTitle className="lg:text-base">
                                            {service.title}
                                        </ItemTitle>
                                        <ItemDescription className="text-white">
                                            {service.description}
                                        </ItemDescription>
                                    </ItemContent>
                                    <ItemActions>
                                        <span className="flex size-8 items-center justify-center rounded-full bg-white">
                                            <ChevronRight
                                                className="size-4"
                                                strokeWidth={3}
                                                style={{ color: service.color }}
                                            />
                                        </span>
                                    </ItemActions>
                                </Item>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export { Servicos }
