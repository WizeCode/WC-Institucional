import Image from "next/image"

import { Section } from "@/components/layout/section"
import { HeroImage } from "@/components/sections/hero"
import { CaseNarrative } from "@/components/sections/case-narrative"
import { Metrics } from "@/components/sections/metrics"
import { StackGroups } from "@/components/sections/stack-groups"
import { Gallery } from "@/components/sections/gallery"
import { Testimonial } from "@/components/sections/testimonial"
import { Contact } from "@/components/sections/contact"
import { Particles } from "@/components/ui/particles"
import { rich } from "@/lib/text"
import { siteContact } from "@/lib/social"
import type { CaseData } from "@/lib/cases"

/**
 * Página de detalhe de um case, alimentada pelo `CaseData` de `lib/cases/<slug>.ts`.
 * As seções `results`, `stack`, `gallery` e `testimonial` só renderizam quando o
 * campo correspondente existe.
 */
export function CasePage({ data }: { data: CaseData }) {
    return (
        <>
            <Section className="my-0">
                <HeroImage
                    badge={data.hero.badge}
                    title={rich(data.hero.title)}
                    description={data.hero.description}
                    cta={
                        data.hero.liveUrl
                            ? {
                                  primary: {
                                      text: "Ver site no ar",
                                      url: data.hero.liveUrl,
                                  },
                              }
                            : undefined
                    }
                >
                    <Image
                        src={data.hero.cover.src}
                        alt={data.hero.cover.alt}
                        fill
                        sizes="100vw"
                        priority
                        className="object-cover"
                    />
                </HeroImage>
            </Section>

            <Section>
                <CaseNarrative
                    badge="/ O desafio"
                    title={rich(data.challenge.title)}
                    body={data.challenge.body}
                />
            </Section>

            <Section variant="soft">
                <CaseNarrative
                    badge="/ A solução"
                    title={rich(data.solution.title)}
                    body={data.solution.body}
                />
            </Section>

            {data.results && (
                <Section>
                    <Metrics
                        badge="/ Resultados"
                        title={rich(data.results.title)}
                        metrics={data.results.metrics}
                    />
                </Section>
            )}

            {data.stack && (
                <Section variant="soft">
                    <StackGroups {...data.stack} />
                </Section>
            )}

            {data.gallery && (
                <Section>
                    <Gallery images={data.gallery.images} />
                </Section>
            )}

            {data.testimonial && (
                <Section variant="soft" className="sm:py-16">
                    <Testimonial
                        quote={data.testimonial.quote}
                        author={data.testimonial.author}
                        role={data.testimonial.role}
                    />
                </Section>
            )}

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
                />
            </Section>
        </>
    )
}
