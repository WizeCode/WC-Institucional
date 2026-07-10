import type { Metadata } from "next"
import { Section } from "@/components/layout/section"
import { FormLayout } from "@/components/layout/form-layout"
import { TrabalheConoscoForm } from "@/components/forms/trabalhe-conosco-form"

export const metadata: Metadata = {
    title: "Trabalhe Conosco",
    description:
        "Faça parte do banco de talentos da WizeCode. Cadastre seu perfil e entraremos em contato quando surgir uma oportunidade compatível.",
    alternates: { canonical: "/trabalhe-conosco" },
}

export default function Page() {
    return (
        <Section className="py-12">
            <FormLayout
                title="Faça parte do nosso banco de talentos"
                description="Ficamos felizes em saber que você tem interesse em crescer com a WizeCode! Cadastre-se e entraremos em contato quando surgir uma oportunidade com o seu perfil."
            >
                <TrabalheConoscoForm />
            </FormLayout>
        </Section>
    )
}
