"use client"

import { usePostHog } from "posthog-js/react"
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
        // primary: {
        //     text: "Conheça nossas soluções",
        //     url: "/servicos",
        // },
        primary: {
            text: "Fale com nossa equipe",
            url: "/contato",
        },
    },
}: HeroProps) => {
    const posthog = usePostHog()

    return (
        <section className="px-8">
            <div className="container py-8 sm:py-16 mx-auto flex flex-col lg:flex-row items-center w-full gap-10 lg:gap-20">
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
                        className="max-h-136 max-w-xl"
                        startOnView={false}
                    >
                        <TypingAnimation
                            className="font-bold"
                            prefix={<span className="text-accent">$ </span>}
                        >
                            {'wizecode scan "seu-negócio"'}
                        </TypingAnimation>
                        <AnimatedSpan className="pl-4 text-red-500">
                            {"⚠︎ processos manuais detectados"}
                        </AnimatedSpan>
                        <AnimatedSpan className="pl-4 text-red-500">
                            {"⚠︎ ferramentas e sistemas lentos"}
                        </AnimatedSpan>
                        <AnimatedSpan className="pl-4 text-red-500">
                            {"⚠︎ presença digital desatualizada"}
                        </AnimatedSpan>

                        <TypingAnimation
                            className="mt-4 font-bold"
                            prefix={<span className="text-accent">$ </span>}
                        >
                            {'wizecode init "seu-projeto"'}
                        </TypingAnimation>
                        <AnimatedSpan className="pl-4 text-foreground">
                            {"> entrevista inicial realizada"}
                        </AnimatedSpan>
                        <AnimatedSpan className="pl-4 text-foreground">
                            {"> requisitos funcionais e não-funcionais mapeados"}
                        </AnimatedSpan>
                        <AnimatedSpan className="pl-4 text-foreground">
                            {"> plano de desenvolvimento elaborado"}
                        </AnimatedSpan>
                        <AnimatedSpan className="pl-12 text-muted-foreground">
                            stack definida
                        </AnimatedSpan>
                        <AnimatedSpan className="pl-12 text-muted-foreground">
                            cronograma definido
                        </AnimatedSpan>
                        <AnimatedSpan className="pl-4 text-foreground">
                            {"> design desenvolvido e aprovado"}
                        </AnimatedSpan>
                        <AnimatedSpan className="pl-4 text-foreground">
                            {"> testes de qualidade realizados"}
                        </AnimatedSpan>
                        <AnimatedSpan className="pl-12 text-muted-foreground">
                            performance: 98/100
                        </AnimatedSpan>
                        <AnimatedSpan className="pl-12 text-muted-foreground">
                            segurança: máxima
                        </AnimatedSpan>
                        <AnimatedSpan className="mt-4 pl-4 text-emerald-500 font-bold">
                            {"✓ projeto publicado e entregue com sucesso!"}
                        </AnimatedSpan>
                    </Terminal>
                </div>
            </div>
        </section>
    )
}

export { Hero }
