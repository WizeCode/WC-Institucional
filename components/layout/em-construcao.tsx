"use client"

import React from "react"
import Link from "next/link"
import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
} from "@/components/ui/terminal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface EmConstrucaoProps {
    titulo: string
    descricao?: React.ReactNode
    badgeText?: string
}

const EmConstrucao = ({
    titulo,
    descricao = (
        <>
            Estamos construindo esta página com o mesmo cuidado que dedicamos aos
            projetos dos nossos clientes –{" "}
            <em>ela ficará pronta muito em breve.</em>
        </>
    ),
    badgeText = "/ Em construção",
}: EmConstrucaoProps) => {
    return (
        <section className="px-8">
            <div className="container py-12 sm:py-32 mx-auto flex flex-col lg:flex-row items-center w-full gap-10 lg:gap-20">
                <div className="mx-auto flex flex-col flex-1 items-center text-center md:ml-auto lg:ml-0 lg:max-w-3xl lg:items-start lg:text-left">
                    {badgeText && <Badge variant="outline">{badgeText}</Badge>}
                    <h1 className="my-6 text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                        {titulo} <span className="text-accent">em construção</span>.
                    </h1>
                    <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                        {descricao}
                    </p>
                    <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center lg:justify-start">
                        <Button asChild className="w-full sm:w-auto">
                            <Link href="/">Voltar para o início</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/contato">Fale com nossa equipe</Link>
                        </Button>
                    </div>
                </div>
                <div className="flex justify-center w-full flex-1 lg:justify-end">
                    <Terminal className="max-h-120 max-w-xl" startOnView={false}>
                        <TypingAnimation>$ wizecode build --page</TypingAnimation>
                        <AnimatedSpan>✔ design aprovado</AnimatedSpan>
                        <AnimatedSpan>✔ conteúdo em produção</AnimatedSpan>
                        <AnimatedSpan className="text-yellow-500">
                            ⟳ compilando experiência...
                        </AnimatedSpan>
                        <AnimatedSpan className="text-muted-foreground">
                            {"> disponível em breve"}
                        </AnimatedSpan>
                    </Terminal>
                </div>
            </div>
        </section>
    )
}

export { EmConstrucao }
