"use client"

import { useEffect, useState } from "react"
import { usePostHog } from "posthog-js/react"
import { AnimatePresence, motion } from "motion/react"
import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
} from "@/components/ui/terminal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import React from "react"

interface HeroProps {
    heading?: string | React.ReactNode
    description?: React.ReactNode
    badgeText?: string
    buttons?: {
        primary?: {
            text: string
            url: string
            className?: string
        }
        secondary?: {
            text: string
            url: string
        }
    }
}

const projects = [
    '"seu e-commerce"',
    '"sua plataforma"',
    '"seu app mobile"',
    '"seu site"',
]

// tempo estimado para as 3 linhas estáticas animarem (~1.9s)
const STATIC_DURATION = 2000
const ROTATION_INTERVAL = 2500

const Hero = ({
    heading = (
        <>
            Tecnologia <span className="text-accent">inteligente</span>:<br />
            do planejamento à performance.
        </>
    ),
    description = (
        <>
            Somos especialistas em transformar objetivos de negócio em soluções
            digitais inteligentes, eficientes e escaláveis –{" "}
            <em>com a clareza de quem domina cada etapa do processo.</em>
        </>
    ),
    badgeText = "/ Hero",
    buttons = {
        primary: {
            text: "Conheça nossas soluções",
            url: "/servicos",
        },
        secondary: {
            text: "Fale com nossa equipe",
            url: "/contato",
        },
    },
}: HeroProps) => {
    const [projectIndex, setProjectIndex] = useState(0)
    const [rotationStarted, setRotationStarted] = useState(false)
    const posthog = usePostHog()

    useEffect(() => {
        const startTimer = setTimeout(
            () => setRotationStarted(true),
            STATIC_DURATION
        )
        return () => clearTimeout(startTimer)
    }, [])

    useEffect(() => {
        if (!rotationStarted) return
        const interval = setInterval(() => {
            setProjectIndex((prev) => (prev + 1) % projects.length)
        }, ROTATION_INTERVAL)
        return () => clearInterval(interval)
    }, [rotationStarted])

    return (
        <section className="px-8">
            <div className="container py-12 sm:py-32 mx-auto flex flex-col lg:flex-row items-center w-full gap-10 lg:gap-20">
                <div className="mx-auto flex flex-col flex-1 items-center text-center md:ml-auto lg:ml-0 lg:max-w-3xl lg:items-start lg:text-left">
                    {badgeText && <Badge variant="outline">{badgeText}</Badge>}
                    <h1 className="my-6 text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                        {heading}
                    </h1>
                    <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                        {description}
                    </p>
                    <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center lg:justify-start">
                        {buttons.primary && (
                            <Button asChild className="w-full sm:w-auto">
                                <a href={buttons.primary.url}>
                                    {buttons.primary.text}
                                </a>
                            </Button>
                        )}
                        {buttons.secondary && (
                            <Button asChild variant="outline" onClick={() => posthog.capture("cta_contact_clicked", { source: "hero" })}>
                                <a href={buttons.secondary.url}>
                                    {buttons.secondary.text}
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
                <div className="flex justify-center w-full flex-1 lg:justify-end">
                    <Terminal
                        className="max-h-120 max-w-xl"
                        startOnView={false}
                    >
                        <TypingAnimation>$ wizecode init</TypingAnimation>
                        <AnimatedSpan>✔ briefing realizado</AnimatedSpan>
                        <AnimatedSpan>✔ escopo definido</AnimatedSpan>
                        <AnimatedSpan className="flex items-center gap-1">
                            <span>{"> desenvolvendo:"}</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={projectIndex}
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 4 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {projects[projectIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </AnimatedSpan>
                    </Terminal>
                </div>
            </div>
        </section>
    )
}

export { Hero }
