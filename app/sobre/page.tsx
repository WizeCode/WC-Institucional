import type { Metadata } from "next"
import Image from "next/image"
import { Section } from "@/components/layout/section"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { FeatureGrid } from "@/components/sections/feature-grid"
import { Team } from "@/components/sections/team"
import { FoundersNote } from "@/components/sections/founders-note"
import { Values } from "@/components/sections/values"
import { Contact } from "@/components/sections/contact"
import { Particles } from "@/components/ui/particles"
import { rich } from "@/lib/text"
import { siteContact } from "@/lib/social"
import { sobre } from "./sobre.data"

export const metadata: Metadata = {
    title: "A Wize",
    description:
        "Conheça a WizeCode: uma software house que domina todo o ciclo de vida do software e entrega produto pronto para crescer, não promessa. Nossa história, propósito, equipe e valores.",
    alternates: { canonical: "/sobre" },
}

export default function Page() {
    return (
        <>
            <Section className="my-0">
                <Hero
                    variant="default"
                    badge={sobre.hero.badge}
                    title={rich(sobre.hero.title)}
                    description={rich(sobre.hero.description)}
                >
                    <Image
                        src={sobre.hero.image.src}
                        alt={sobre.hero.image.alt}
                        width={1200}
                        height={800}
                        priority
                        className="rounded-lg"
                    />
                </Hero>
            </Section>

            <Section>
                <About
                    badge={sobre.sobre.badge}
                    title={rich(sobre.sobre.title)}
                    paragraphs={sobre.sobre.paragraphs.map(rich)}
                />
            </Section>

            <Section variant="soft">
                <FeatureGrid
                    columns="two"
                    badge={sobre.proposito.badge}
                    title={rich(sobre.proposito.title)}
                    items={sobre.proposito.items}
                />
            </Section>

            <Section>
                <Team
                    badge={sobre.equipe.badge}
                    title={rich(sobre.equipe.title)}
                    description={sobre.equipe.description}
                    members={sobre.equipe.members}
                />
            </Section>

            <Section variant="soft">
                <Values
                    badge={sobre.values.badge}
                    title={rich(sobre.values.title)}
                    description={sobre.values.description}
                    items={sobre.values.items}
                />
            </Section>

            <Section>
                <FoundersNote
                    badge={sobre.nota.badge}
                    title={rich(sobre.nota.title)}
                    paragraphs={sobre.nota.paragraphs.map(rich)}
                    signature={sobre.nota.signature}
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
                        color={"#7849cb"}
                        refresh
                    />
                }
            >
                <Contact
                    badge={sobre.contato.badge}
                    title={sobre.contato.title}
                    description={sobre.contato.description}
                    infoCards={siteContact.channels}
                />
            </Section>
        </>
    )
}
