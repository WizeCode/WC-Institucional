import type { Metadata } from "next"

import { Section } from "@/components/layout/section"
import { HeroCentered } from "@/components/sections/hero"
import { CasesGrid } from "@/components/sections/cases-grid"
import { Testimonial } from "@/components/sections/testimonial"
import { Contact } from "@/components/sections/contact"
import { Particles } from "@/components/ui/particles"
import { rich } from "@/lib/text"
import { siteContact } from "@/lib/social"
import { cases } from "@/lib/cases"
import { casesHub } from "./cases.data"

export const metadata: Metadata = {
    title: casesHub.meta.title,
    description: casesHub.meta.description,
    alternates: { canonical: casesHub.meta.canonical },
}

export default function Page() {
    return (
        <>
            <Section className="my-0">
                <HeroCentered
                    badge={casesHub.hero.badge}
                    title={rich(casesHub.hero.title)}
                    description={casesHub.hero.description}
                />
            </Section>

            <Section className="py-0">
                <CasesGrid cases={cases} />
            </Section>

            <Section variant="soft" className="sm:py-16">
                <Testimonial quote={rich(casesHub.frase.quote)} />
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
                    badge={casesHub.contato.badge}
                    title={casesHub.contato.title}
                    description={casesHub.contato.description}
                    infoCards={siteContact.channels}
                />
            </Section>
        </>
    )
}
