"use client"

import { Badge } from "@/components/ui/badge"
import { Particles } from "@/components/ui/particles"
import { LucideIcon, Mail } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { motion } from "motion/react"
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import { IconType } from "react-icons"

const ContatoForm = dynamic(
    () =>
        import("@/components/forms/contato-form").then(
            (mod) => mod.ContatoForm
        ),
    {
        ssr: false,
        loading: () => (
            <div className="flex h-full w-full flex-col gap-4 px-6 py-10">
                <div className="flex flex-col gap-4 xl:flex-row">
                    <div className="h-16 flex-1 animate-pulse rounded-md bg-muted" />
                    <div className="h-16 flex-1 animate-pulse rounded-md bg-muted" />
                </div>
                <div className="flex flex-col gap-4 xl:flex-row">
                    <div className="h-16 flex-1 animate-pulse rounded-md bg-muted" />
                    <div className="h-16 flex-1 animate-pulse rounded-md bg-muted" />
                </div>
                <div className="h-16 animate-pulse rounded-md bg-muted" />
                <div className="h-36 animate-pulse rounded-md bg-muted" />
                <div className="h-10 animate-pulse rounded-md bg-muted sm:self-end sm:w-40" />
            </div>
        ),
    }
)

interface InfoCard {
    icon: LucideIcon | IconType
    label: string
    value: string
    href?: string
}

interface ContatoProps {
    heading?: string
    description?: string
    badgeText?: string
    infoCards?: InfoCard[]
}

const defaultInfoCards: InfoCard[] = [
    {
        icon: FaWhatsapp,
        label: "WhatsApp",
        value: "+55 (34) 98439-2633",
        href: "https://wa.me/5534984392633?text=Olá! Gostaria de saber mais sobre os serviços da WizeCode.",
    },
    {
        icon: Mail,
        label: "E-mail",
        value: "contato@wizecode.com.br",
        href: "mailto:contato@wizecode.com.br",
    },
    {
        icon: FaInstagram,
        label: "Instagram",
        value: "@wizecode",
        href: "https://instagram.com/wize.code",
    },
    {
        icon: FaLinkedin,
        label: "LinkedIn",
        value: "WizeCode",
        href: "https://www.linkedin.com/company/wizecode-tech",
    },
]

const Contato = ({
    heading = "Vamos construir algo incrível juntos?",
    description = "Nossa equipe entrará em contato em até 24 horas úteis",
    badgeText = "/ Contato",
    infoCards = defaultInfoCards,
}: ContatoProps) => {
    return (
        <section className="relative mx-4 my-8 rounded-md bg-accent px-4 sm:px-8 dark:bg-accent/10">
            <div className="container mx-auto py-8">
                <div className="flex flex-col gap-2 text-center mb-8">
                    <Badge className="mx-auto mb-4" variant="default">
                        {badgeText}
                    </Badge>
                    <h2 className="text-2xl font-bold text-pretty text-white lg:text-3xl xl:text-4xl">
                        {heading}
                    </h2>
                    <p className="mb-4 text-lg text-white lg:text-xl">
                        {description}
                    </p>
                </div>
                <div className="flex gap-10">
                    <div className="hidden lg:flex flex-col justify-start gap-4 flex-1">
                        {infoCards.map((card) => {
                            const Icon = card.icon
                            const content = (
                                <div key={card.label} className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-10 h-10 bg-foreground/10 shrink-0 rounded-lg">
                                        <Icon className="w-5 h-5 text-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-foreground/60">{card.label}</p>
                                        <p className="text-foreground font-medium">{card.value}</p>
                                    </div>
                                </div>
                            )
                            return card.href ? (
                                <motion.div key={card.label} whileHover={{ y: -6 }} transition={{ duration: 0.1, ease: "easeInOut" }}>
                                    <Link href={card.href} target="_blank" rel="noopener noreferrer" className="block rounded-lg bg-background p-6 shadow-lg relative z-20">
                                        {content}
                                    </Link>
                                </motion.div>
                            ) : content
                        })}
                    </div>
                    <div className="relative z-20 rounded-lg bg-background shadow-lg flex-1">
                        <ContatoForm />
                    </div>
                </div>
            </div>
            <Particles
                className="absolute inset-0 z-0"
                quantity={100}
                ease={80}
                color={"#94a3b8"}
                refresh
            />
        </section>
    )
}

export { Contato }
