import Image from "next/image"

import { Section } from "@/components/layout/section"
import { Hero } from "@/components/sections/hero"
import { BentoGrid, type BentoItem } from "@/components/sections/bento-grid"
import { PainPoints } from "@/components/sections/pain-points"
import { Timeline, type TimelineStep } from "@/components/sections/timeline"
import { Portfolio, type Project } from "@/components/sections/portfolio"
import { Projects, type ProjectsProps } from "@/components/sections/projects"
import { Faq, type FaqItem } from "@/components/sections/faq"
import { Contact } from "@/components/sections/contact"
import {
    StackGroups,
    type StackGroupsProps,
} from "@/components/sections/stack-groups"
import { Particles } from "@/components/ui/particles"
import { rich } from "@/lib/text"
import { siteContact } from "@/lib/social"
import type { ContatoFormData } from "@/lib/contato/schema"

/** Cabeçalho comum das seções: rótulo, título e descrição. */
interface SectionHeader {
    badge: string
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
    slug: ContatoFormData["servico"]
    hero: {
        badge: string
        title: string
        description: string
        image: { src: string; alt: string }
        cta: { text: string; url: string }
    }
    dores: SectionHeader & { items: string[] }
    capacidades: SectionHeader & { items: BentoItem[] }
    processo: SectionHeader & { items: TimelineStep[] }
    /** Cases lançados. Seção opcional: sem projetos → não renderiza. */
    portfolio?: { projects: Project[] }
    /** Prova social sem case lançado (ex.: Sistemas). Omitida → não renderiza. */
    projetos?: SectionHeader & { items: ProjectsProps["items"] }
    stack?: StackGroupsProps
    faq: {
        description: string
        whatsappMessage: string
        items: FaqItem[]
    }
    contato: { title: string }
}

export function ServicoPage({ data }: { data: ServicoData }) {
    return (
        <>
            <Section className="my-0">
                <Hero
                    variant="default"
                    badge={data.hero.badge}
                    title={rich(data.hero.title)}
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
                <PainPoints
                    badge={data.dores.badge}
                    badgeVariant="default"
                    title={rich(data.dores.title)}
                    description={data.dores.description}
                    items={data.dores.items}
                />
            </Section>

            <Section>
                <BentoGrid
                    badge={data.capacidades.badge}
                    title={rich(data.capacidades.title)}
                    description={data.capacidades.description}
                    items={data.capacidades.items}
                />
            </Section>

            <Section variant="soft">
                <Timeline
                    badge={data.processo.badge}
                    badgeVariant="default"
                    title={rich(data.processo.title)}
                    description={data.processo.description}
                    items={data.processo.items}
                />
            </Section>

            {data.portfolio && (
                <Section className="sm:py-8">
                    <Portfolio
                        badge="/ Portfólio"
                        title="Clientes que aprovam nosso trabalho"
                        description="Cases de sucesso que refletem nossa expertise e compromisso com a excelência em cada projeto."
                        button={{ url: "/cases", text: "Ver todos os cases" }}
                        projects={data.portfolio.projects}
                    />
                </Section>
            )}

            {data.projetos && (
                <Section className="sm:py-8">
                    <Projects
                        badge={data.projetos.badge}
                        title={rich(data.projetos.title)}
                        description={data.projetos.description}
                        items={data.projetos.items}
                    />
                </Section>
            )}

            {data.stack && (
                <Section>
                    <StackGroups {...data.stack} />
                </Section>
            )}

            <Section className="py-16">
                <Faq
                    badge="/ FAQ"
                    title="Alguma dúvida?"
                    subtitle="Estamos aqui para ajudar."
                    description={data.faq.description}
                    whatsappMessage={data.faq.whatsappMessage}
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
                <Contact
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
