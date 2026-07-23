import type { Metadata } from "next"
import { Section } from "@/components/layout/section"
import { Hero } from "@/components/sections/hero"
import { HeroTerminal } from "@/components/sections/hero-terminal"
import { Particles } from "@/components/ui/particles"
import { Contact } from "@/components/sections/contact"
import { Services } from "@/components/sections/services"
import { Portfolio } from "@/components/sections/portfolio"
import { Stack } from "@/components/sections/stack"
import { Faq } from "@/components/sections/faq"
import { Values } from "@/components/sections/values"
import { rich } from "@/lib/text"
import { home } from "./home.data"

export const metadata: Metadata = {
    title: home.meta.title,
    description: home.meta.description,
    alternates: {
        canonical: home.meta.canonical,
    },
}

export default function Page() {
    return (
        <>
            <Section className="my-0">
                <Hero
                    badge={home.hero.badge}
                    title={rich(home.hero.title)}
                    description={rich(home.hero.description)}
                    cta={{ primary: home.hero.cta }}
                >
                    <HeroTerminal {...home.hero.terminal} />
                </Hero>
            </Section>

            <Section variant="soft" className="sm:py-8">
                <Services
                    badge={home.servicos.badge}
                    title={rich(home.servicos.title)}
                    description={home.servicos.description}
                    services={home.servicos.services}
                />
            </Section>

            <Section>
                <Values
                    badge={home.diferenciais.badge}
                    title={rich(home.diferenciais.title)}
                    description={home.diferenciais.description}
                    items={home.diferenciais.items}
                />
            </Section>

            <Section className="sm:py-8">
                <Portfolio
                    badge={home.portfolio.badge}
                    title={home.portfolio.title}
                    description={home.portfolio.description}
                    button={home.portfolio.button}
                    projects={home.portfolio.projects}
                />
            </Section>

            <Section>
                <Stack
                    badge={home.stack.badge}
                    title={home.stack.title}
                    description={home.stack.description}
                    techRowOne={home.stack.techRowOne}
                    techRowTwo={home.stack.techRowTwo}
                    techRowThree={home.stack.techRowThree}
                />
            </Section>

            <Section className="py-16">
                <Faq
                    badge={home.faq.badge}
                    title={home.faq.title}
                    subtitle={home.faq.subtitle}
                    description={home.faq.description}
                    whatsappMessage={home.faq.whatsappMessage}
                    items={home.faq.items}
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
                    badge={home.contato.badge}
                    title={home.contato.title}
                    description={home.contato.description}
                    infoCards={home.contato.infoCards}
                />
            </Section>
        </>
    )
}
