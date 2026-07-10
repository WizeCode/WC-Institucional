import Image from "next/image"
import Link from "next/link"

import { Section } from "@/components/layout/section"
import { Hero } from "@/components/layout/hero"
import { BentoGrid, type BentoItem } from "@/components/sections/bento-grid"
import { Dores } from "@/components/sections/dores"
import { Timeline, type TimelineStep } from "@/components/sections/timeline"
import { Portfolio, type Project } from "@/components/sections/portfolio"
import { Faq, type FaqItem } from "@/components/sections/faq"
import { Contato } from "@/components/sections/contato"
import { Stack, type StackProps } from "@/components/sections/stack"
import { Particles } from "@/components/ui/particles"
import { accent } from "@/lib/text"
import { siteContact } from "@/lib/social"
import type { ContatoFormData } from "@/lib/contato/schema"

/** Cabeçalho comum das seções: rótulo, título e descrição. */
interface SectionHeader {
    badge: string
    /** Use `*trecho*` para destacar (vira `text-accent`). Ver `lib/text`. */
    title: string
    description: string
}

/**
 * Conteúdo de uma página de serviço. Cada rota (`institucional`, `sistemas`…)
 * exporta um objeto deste formato do seu `*.data.ts`; o `ServicoPage` compõe as
 * seções. Só o que **varia** entre serviços mora aqui — o que é igual em toda
 * página (variantes de layout, partículas, cabeçalhos genéricos) fica no
 * componente. Ver `docs/CONVENTIONS.md`.
 */
export interface ServicoData {
    /** Pré-seleciona o serviço no formulário de contato. */
    slug: ContatoFormData["servico"]
    hero: {
        badge: string
        /** Aceita `*destaque*`. */
        title: string
        description: string
        image: { src: string; alt: string }
        cta: { text: string; url: string }
    }
    dores: SectionHeader & { items: string[] }
    capacidades: SectionHeader & { items: BentoItem[] }
    processo: SectionHeader & { items: TimelineStep[] }
    portfolio: { projects: Project[] }
    /** Seção opcional (ex.: Sistemas & Automações). Omitida → não renderiza. */
    stack?: StackProps
    faq: {
        description: string
        /** Texto pré-preenchido no link de WhatsApp do FAQ. */
        whatsappMessage: string
        items: FaqItem[]
    }
    contato: { title: string }
}

const WHATSAPP_NUMBER = "5534984392633"

export function ServicoPage({ data }: { data: ServicoData }) {
    return (
        <>
            <Section className="my-0">
                <Hero
                    variant="default"
                    badge={data.hero.badge}
                    title={accent(data.hero.title)}
                    description={data.hero.description}
                    cta={{ primary: data.hero.cta }}
                >
                    <Image
                        src={data.hero.image.src}
                        alt={data.hero.image.alt}
                        width={1200}
                        height={800}
                        priority
                        className="rounded-lg"
                    />
                </Hero>
            </Section>

            <Section variant="accent">
                <Dores
                    badge={data.dores.badge}
                    badgeVariant="default"
                    title={accent(data.dores.title)}
                    description={data.dores.description}
                    items={data.dores.items}
                />
            </Section>

            <Section>
                <BentoGrid
                    badge={data.capacidades.badge}
                    title={accent(data.capacidades.title)}
                    description={data.capacidades.description}
                    items={data.capacidades.items}
                />
            </Section>

            <Section variant="soft">
                <Timeline
                    badge={data.processo.badge}
                    badgeVariant="default"
                    title={accent(data.processo.title)}
                    description={data.processo.description}
                    items={data.processo.items}
                />
            </Section>

            <Section className="sm:py-8">
                <Portfolio
                    badge="/ Portfólio"
                    title="Clientes que aprovam nosso trabalho"
                    description="Cases de sucesso que refletem nossa expertise e compromisso com a excelência em cada projeto."
                    button={{ url: "/cases", text: "Ver todos os cases" }}
                    projects={data.portfolio.projects}
                />
            </Section>

            {data.stack && (
                <Section>
                    <Stack {...data.stack} />
                </Section>
            )}

            <Section className="py-16">
                <Faq
                    badge="/ FAQ"
                    title={
                        <>
                            Alguma dúvida? <br />{" "}
                            <span className="font-normal text-muted-foreground">
                                Estamos aqui para ajudar.
                            </span>
                        </>
                    }
                    description={
                        <>
                            {data.faq.description}{" "}
                            <Link
                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(data.faq.whatsappMessage)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-primary"
                            >
                                Fale com a gente no WhatsApp.
                            </Link>
                        </>
                    }
                    items={data.faq.items}
                />
            </Section>

            <Section
                variant="accent"
                className="sm:py-8"
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
                    badge="/ Contato"
                    title={data.contato.title}
                    description="Preencha o formulário e nossa equipe entrará em contato em até 24 horas úteis"
                    infoCards={siteContact.channels}
                    servicoPadrao={data.slug}
                />
            </Section>
        </>
    )
}
