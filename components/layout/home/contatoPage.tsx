"use client"

import { ContatoForm } from "@/components/forms/contato-form"
import { Badge } from "@/components/ui/badge"
import { Particles } from "@/components/ui/particles"
import { LucideIcon, Mail } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import { IconType } from "react-icons"

interface InfoCard {
    icon: LucideIcon | IconType
    label: string
    value: string
    href?: string
}

interface ContatoProps {
    heading?: string
    description?: string
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

const ContatoPage = ({
    heading = "Entre em contato",
    description = "Nossa equipe responderá em até 24 horas úteis.",
    infoCards = defaultInfoCards,
}: ContatoProps) => {
    return (
        <section className="my-8 px-8">
            <div className="container mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 py-12 sm:py-16">
                <div className="mb-8 flex flex-1 flex-col gap-2 text-start">
                    <h1 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                        {heading}
                    </h1>
                    <p className="mb-4 text-lg text-muted-foreground lg:text-xl">
                        {description}
                    </p>
                    <div className="flex-col justify-start gap-2 lg:flex">
                        {infoCards.map((card) => {
                            const Icon = card.icon
                            const content = (
                                <div
                                    key={card.label}
                                    className="flex items-center"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                                        <Icon className="h-5 w-5 text-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-light text-foreground">
                                            {card.value}
                                        </p>
                                    </div>
                                </div>
                            )
                            return card.href ? (
                                <Link
                                    href={card.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    {content}
                                </Link>
                            ) : (
                                content
                            )
                        })}
                    </div>
                </div>
                <div className="flex-1 rounded-lg shadow-lg bg-muted">
                    <ContatoForm />
                </div>
            </div>
        </section>
    )
}

export { ContatoPage }
