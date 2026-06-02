"use client"

import { Badge } from "@/components/ui/badge"
import {
    Marquee,
    MarqueeContent,
    MarqueeFade,
    MarqueeItem,
} from "@/components/ui/marquee"
import Image from "next/image"

interface Partner {
    id: string
    name: string
    logo: string
}

interface ParceirosProps {
    heading?: string
    description?: string
    badgeText?: string
    partnersRow?: Partner[]
}

const defaultPartnersRow: Partner[] = [
    { id: "1", name: "Parceiro 1", logo: "https://placehold.co/2160x720/e2e8f0/94a3b8?text=Logo+1" },
    { id: "2", name: "Parceiro 2", logo: "https://placehold.co/2160x720/e2e8f0/94a3b8?text=Logo+2" },
    { id: "3", name: "Parceiro 3", logo: "https://placehold.co/2160x720/e2e8f0/94a3b8?text=Logo+3" },
    { id: "4", name: "Parceiro 4", logo: "https://placehold.co/2160x720/e2e8f0/94a3b8?text=Logo+4" },
    { id: "5", name: "Parceiro 5", logo: "https://placehold.co/2160x720/e2e8f0/94a3b8?text=Logo+5" },
]

const Parceiros = ({
    heading = "Empresas que confiam em nós",
    description = "Parceiros que escolheram a WizeCode para transformar seus projetos digitais",
    badgeText = "/ Parceiros",
    partnersRow = defaultPartnersRow
}: ParceirosProps) => {
    return (
        <section className="px-8 my-8">
            <div className="container mx-auto py-16">
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
                        <MarqueeContent speed={40}>
                            {partnersRow.map((partner) => (
                                <MarqueeItem
                                    key={partner.id}
                                    className="mx-8 flex aspect-3/1 w-28 items-center justify-center sm:w-32 lg:mx-10"
                                >
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        width={2160}
                                        height={720}
                                        unoptimized
                                        className="h-auto max-h-8 w-auto object-contain"
                                    />
                                </MarqueeItem>
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

export { Parceiros }
