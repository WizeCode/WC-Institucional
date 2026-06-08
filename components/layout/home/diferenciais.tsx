"use client"

import { Badge } from "@/components/ui/badge"
import { Pointer } from "@/components/ui/pointer"
import { Brain, HeartHandshake, Layers, Sparkles } from "lucide-react"
import { motion } from "motion/react"
import React, { useSyncExternalStore } from "react"

interface Diferencial {
    letter: string
    title: string
    description: string
    pointerIcon: React.ReactNode
}

interface DiferenciaisProps {
    heading?: string | React.ReactNode
    description?: string
    badgeText?: string
    items?: Diferencial[]
}

const defaultItems: Diferencial[] = [
    {
        letter: "W",
        title: "Wisdom",
        description: "Tecnologias que garantem escalabilidade, segurança e alta performance — seu investimento à prova de obsolescência.",
        pointerIcon: <Brain className="size-6 text-accent" />,
    },
    {
        letter: "I",
        title: "Intention",
        description: "Dominamos todo o ciclo de vida do software e atuamos como parceiro tecnológico que transforma conceitos em produtos prontos para crescer.",
        pointerIcon: <Layers className="size-6 text-accent" />,
    },
    {
        letter: "Z",
        title: "Zeal",
        description: "Interfaces e arquiteturas sob medida, com personalização até a satisfação total — cada pixel pensado para unir estética moderna à funcionalidade técnica.",
        pointerIcon: <Sparkles className="size-6 text-accent" />,
    },
    {
        letter: "E",
        title: "Empathy",
        description: "Comunicação transparente e empática que traduz autoridade técnica em clareza, garantindo que você se sinta seguro e no controle em cada etapa.",
        pointerIcon: <HeartHandshake className="size-6 text-accent" />,
    },
]

const DiferencialCard = ({ letter, title, description, pointerIcon }: Diferencial) => {
    const hasPointer = useSyncExternalStore(
        () => () => {},
        () => window.matchMedia("(pointer: fine)").matches,
        () => false,
    )

    return (
        <div className="relative flex h-full flex-col gap-4 rounded-lg border bg-background p-6">
            {hasPointer && <Pointer>{pointerIcon}</Pointer>}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-xl font-bold text-accent ">
                {letter}
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-semibold leading-snug mx-auto">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}

const Diferenciais = ({
    heading = (
        <>
            Mas o que a WizeCode tem de{" "}
            <span className="text-accent">diferente</span>?
        </>
    ),
    description = "Enquanto outras software houses entregam promessas, a WizeCode entrega produto.",
    badgeText = "/ Diferenciais",
    items = defaultItems,
}: DiferenciaisProps) => {
    return (
        <section className="my-8 px-8">
            <div className="container mx-auto flex flex-col gap-8 py-8 sm:py-16 lg:gap-16">
                <div className="flex flex-1 flex-col text-center justify-center gap-2">
                    <Badge className="mb-4 mx-auto" variant="outline">
                        {badgeText}
                    </Badge>
                    <h2 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                        {heading}
                    </h2>
                    <p className="mb-4 text-lg text-muted-foreground lg:text-xl">
                        {description}
                    </p>
                </div>
                <div className="flex flex-1 flex-wrap gap-4">
                    {items.map((item) => (
                        <motion.div
                            key={item.letter}
                            className="flex w-full md:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]"
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.1, ease: "easeInOut" }}
                        >
                            <DiferencialCard {...item} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export { Diferenciais }
