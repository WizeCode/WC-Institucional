"use client"

import { Badge, type BadgeVariant } from "@/components/ui/badge"
import React, { useState } from "react"
import { track } from "@/lib/analytics"
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
interface ServiceItem {
    id: string
    title: string
    description: string
    color?: string
    href?: string
    image: {
        src: string
        alt: string
    }
}

interface ServicesProps {
    badge: string
    badgeVariant?: BadgeVariant
    title: React.ReactNode
    description: React.ReactNode
    services: ServiceItem[]
}

const Services = ({
    badge,
    badgeVariant = "default",
    title,
    description,
    services,
}: ServicesProps) => {
    const [activeId, setActiveId] = useState(services[0].id)
    const activeService = services.find((s) => s.id === activeId)

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-3 text-center">
                <Badge className="mb-4" variant={badgeVariant}>
                    {badge}
                </Badge>
                <h2 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                    {title}
                </h2>
                <p className="mb-4 max-w-xl text-muted-foreground lg:text-xl">
                    {description}
                </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
                {activeService && (
                    <div className="hidden justify-center overflow-hidden rounded-lg lg:flex">
                        <Image
                            key={activeService.id}
                            src={activeService.image.src}
                            alt={activeService.image.alt}
                            width={2160}
                            height={1080}
                            priority
                            sizes="(min-width: 1024px) 50vw, 100vw"
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
                            onClick={() =>
                                track("service_clicked", {
                                    service: service.title,
                                    service_id: service.id,
                                })
                            }
                        >
                            <Item
                                style={{ backgroundColor: service.color }}
                                className="h-full border-0 text-white"
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
    )
}

export { Services }
export type { ServiceItem }
