import type { Metadata } from "next"
import Image from "next/image"
import { Section } from "@/components/layout/section"
import { HeroImage } from "@/components/sections/hero"
import { BentoGrid } from "@/components/sections/bento-grid"
import { FeatureGrid } from "@/components/sections/feature-grid"
import { StackGroups } from "@/components/sections/stack-groups"
import { Timeline } from "@/components/sections/timeline"
import { FormPage } from "@/components/templates/form-page"
import { TrabalheConoscoForm } from "@/components/forms/trabalhe-conosco-form"
import { trabalheConosco as data } from "./trabalhe-conosco.data"
import { rich } from "@/lib/text"

export const metadata: Metadata = {
    title: "Trabalhe Conosco",
    description:
        "Faça parte do banco de talentos da WizeCode. Projetos remotos, pagamento garantido e sem cobrança de horário. Cadastre seu perfil e entraremos em contato quando surgir uma oportunidade compatível.",
    alternates: { canonical: "/trabalhe-conosco" },
}

export default function Page() {
    return (
        <>
            <Section className="my-0">
                <HeroImage
                    badge={data.hero.badge}
                    title={rich(data.hero.title)}
                    description={data.hero.description}
                    cta={data.hero.cta}
                >
                    <Image
                        src={data.hero.image.src}
                        alt={data.hero.image.alt}
                        fill
                        sizes="100vw"
                        priority
                        className="object-cover"
                    />
                </HeroImage>
            </Section>

            <Section>
                <BentoGrid
                    badge={data.cultura.badge}
                    title={rich(data.cultura.title)}
                    description={data.cultura.description}
                    items={data.cultura.items}
                />
            </Section>

            <Section variant="soft">
                <FeatureGrid
                    badge={data.beneficios.badge}
                    title={rich(data.beneficios.title)}
                    description={data.beneficios.description}
                    items={data.beneficios.items}
                />
            </Section>

            <Section>
                <StackGroups
                    badge={data.stack.badge}
                    title={rich(data.stack.title)}
                    description={data.stack.description}
                    groups={data.stack.groups}
                />
            </Section>

            <Section id="processo" variant="soft">
                <Timeline
                    badge={data.processo.badge}
                    title={rich(data.processo.title)}
                    description={data.processo.description}
                    items={data.processo.items}
                />
            </Section>

            <Section id="cadastro" className="scroll-mt-20 py-12">
                <FormPage
                    title={data.form.title}
                    description={data.form.description}
                    headingLevel="h2"
                >
                    <TrabalheConoscoForm />
                </FormPage>
            </Section>
        </>
    )
}
