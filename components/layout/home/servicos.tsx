"use client"

import { Badge } from "@/components/ui/badge"
import React, { useState } from "react"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemTitle,
} from "@/components/ui/item"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import { ServiceCategory } from "@/types/services"

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
            O que a <span className="text-accent">WizeCode</span> entrega
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
            id: "websites",
            title: "Websites",
            description:
                "Do institucional ao e-commerce, desenvolvemos websites que representam sua marca e geram resultados reais.",
            color: "#0f101f",
            href: "/servicos/websites",
            image: { src: "https://placehold.co/2160x1080", alt: "Websites" },
        },
        {
            id: "aplicativos",
            title: "Aplicativos",
            description:
                "A lógica do seu negócio em um aplicativo funcional, intuitivo e escalável – para web, iOS ou Android.",
            color: "#37175a",
            href: "/servicos/aplicativos",
            image: { src: "https://placehold.co/2160x1080", alt: "Aplicativos" },
        },
        {
            id: "automacoes",
            title: "Automações",
            description:
                "Elimine tarefas repetitivas e manuais com automações inteligentes que economizam tempo e reduzem erros.",
            color: "#7849cb",
            href: "/servicos/automacoes",
            image: { src: "https://placehold.co/2160x1080", alt: "Automações" },
        },
        {
            id: "saas",
            title: "SaaS",
            description:
                "Tire seu software do papel e entregue valor contínuo a seus clientes com escalabilidade e segurança.",
            color: "#a67de0",
            href: "/servicos/saas",
            image: { src: "https://placehold.co/2160x1080", alt: "SaaS" },
        },
    ],
}: ServicosProps) => {
    const [activeId, setActiveId] = useState(services[0].id)
    const activeService = services.find((s) => s.id === activeId)

    return (
        <section className="flex justify-center mx-4 my-12">
            <div className="flex flex-col gap-6 px-4 py-8 rounded-md bg-accent/10">
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
                                className="aspect-[2/1] animate-in object-cover duration-300 fade-in"
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
                                        <Button
                                            className="size-8 rounded-full p-0 dark:bg-white border-0"
                                            variant="outline"
                                        >
                                            <ChevronRight
                                                className="size-4"
                                                strokeWidth={3}
                                                style={{ color: service.color }}
                                            />
                                        </Button>
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
