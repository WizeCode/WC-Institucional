import type { Metadata } from "next"
import { Section } from "@/components/layout/section"
import { FormPage } from "@/components/templates/form-page"
import { ContactChannels } from "@/components/sections/contact-channels"
import { ContatoForm } from "@/components/forms/contato-form"
import { siteContact } from "@/lib/social"

export const metadata: Metadata = {
    title: "Contato",
    description:
        "Entre em contato com a WizeCode. Fale com nossa equipe pelo formulário, WhatsApp ou e-mail e dê o primeiro passo para o seu projeto digital.",
    alternates: {
        canonical: "/contato",
    },
}

export default function Page() {
    return (
        <Section className="py-12">
            <FormPage
                title="Entre em contato"
                description="Nossa equipe responderá em até 24 horas úteis."
                aside={<ContactChannels channels={siteContact.channels} />}
            >
                <ContatoForm />
            </FormPage>
        </Section>
    )
}
