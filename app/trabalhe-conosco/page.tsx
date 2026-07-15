import type { Metadata } from "next"
import { Section } from "@/components/layout/section"
import { FormPage } from "@/components/templates/form-page"
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
            <FormPage
                title="Faça parte do nosso banco de talentos"
                description="Ficamos felizes em saber que você tem interesse em crescer com a WizeCode! Cadastre-se e entraremos em contato quando surgir uma oportunidade com o seu perfil."
            >
                <TrabalheConoscoForm />
            </FormPage>
        </Section>
    )
}
