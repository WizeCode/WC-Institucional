import type { Metadata } from "next"
import { Section } from "@/components/layout/section"
import { Hero } from "@/components/layout/hero"
import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
} from "@/components/ui/terminal"
import { Particles } from "@/components/ui/particles"
import { Contato } from "@/components/layout/home/contato"
import { Servicos } from "@/components/layout/home/servicos"
import { Portfolio } from "@/components/layout/home/portfolio"
import { Stack } from "@/components/layout/home/stack"
import { Faq } from "@/components/layout/home/faq"
import { Diferenciais } from "@/components/layout/home/diferenciais"
import { home } from "./home.data"
import Link from "next/link"

export const metadata: Metadata = {
    title: "WizeCode",
    description:
        "Transformamos objetivos de negócio em soluções digitais inteligentes: websites, e-commerce, apps mobile, plataformas e automação. Conheça a WizeCode.",
    alternates: {
        canonical: "/",
    },
}

export default function Page() {
    return (
        <>
            <Section className="my-0 sm:py-16">
                <Hero
                    badge="/ Hero"
                    title={
                        <>
                            Tecnologia{" "}
                            <span className="text-accent">inteligente</span>:
                            <br />
                            do planejamento à performance.
                        </>
                    }
                    description={
                        <>
                            Somos especialistas em transformar objetivos de
                            negócio em soluções digitais inteligentes,
                            eficientes e escaláveis –{" "}
                            <em>
                                com a clareza de quem domina cada etapa do
                                processo.
                            </em>
                        </>
                    }
                    cta={{
                        primary: {
                            text: "Fale com nossa equipe",
                            url: "/contato",
                        },
                    }}
                >
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
                            {
                                "> requisitos funcionais e não-funcionais mapeados"
                            }
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
                        <AnimatedSpan className="mt-4 pl-4 font-bold text-emerald-500">
                            {"✓ projeto publicado e entregue com sucesso!"}
                        </AnimatedSpan>
                    </Terminal>
                </Hero>
            </Section>

            <Section variant="soft">
                <Servicos
                    badgeText="/ Serviços"
                    heading={
                        <>
                            O que a WizeCode{" "}
                            <span className="text-accent">entrega</span>
                        </>
                    }
                    description={
                        <>
                            Do planejamento à entrega, desenvolvemos soluções
                            digitais sob medida para o seu negócio.
                        </>
                    }
                    services={home.servicos.services}
                />
            </Section>

            <Section className="sm:py-16">
                <Diferenciais
                    badgeText="/ Diferenciais"
                    heading={
                        <>
                            Mas o que a WizeCode tem de{" "}
                            <span className="text-accent">diferente</span>?
                        </>
                    }
                    description="Enquanto outras software houses entregam promessas, a WizeCode entrega produto."
                    items={home.diferenciais.items}
                />
            </Section>

            <Section>
                <Portfolio
                    badgeText="/ Portfólio"
                    heading="Nosso Portfólio"
                    description="Cases de sucesso que refletem nossa expertise e compromisso com a excelência em cada projeto."
                    button={{ url: "/cases", text: "Ver todos os cases" }}
                    projects={home.portfolio.projects}
                />
            </Section>

            <Section className="sm:py-16">
                <Stack
                    badgeText="/ Stack"
                    heading="Técnologias confiáveis"
                    description="Stack sólida e confiável, com tecnologias modernas, garantindo a qualidade e performance dos nossos projetos."
                    techRowOne={home.stack.techRowOne}
                    techRowTwo={home.stack.techRowTwo}
                    techRowThree={home.stack.techRowThree}
                />
            </Section>

            <Section className="py-16">
                <Faq
                    badgeText="/ FAQ"
                    heading={
                        <>
                            Alguma dúvida? <br />{" "}
                            <span className="font-normal text-muted-foreground">
                                Estamos aqui para ajudar.
                            </span>
                        </>
                    }
                    description={
                        <>
                            Ainda tem dúvidas?{" "}
                            <Link
                                href={`https://wa.me/5534984392633?text=${encodeURIComponent("Olá! Tenho uma dúvida sobre a WizeCode.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-primary"
                            >
                                Entre em contato conosco.
                            </Link>
                        </>
                    }
                    items={home.faq.items}
                />
            </Section>

            <Section
                variant="accent"
                backdrop={
                    <Particles
                        className="absolute inset-0 z-0"
                        quantity={100}
                        ease={80}
                        color={"#94a3b8"}
                        refresh
                    />
                }
            >
                <Contato
                    badgeText="/ Contato"
                    heading="Vamos construir algo incrível juntos?"
                    description="Nossa equipe entrará em contato em até 24 horas úteis"
                    infoCards={home.contato.infoCards}
                />
            </Section>
        </>
    )
}
