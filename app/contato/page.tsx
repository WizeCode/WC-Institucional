import type { Metadata } from "next"
import { Section } from "@/components/layout/section"
import { FormLayout } from "@/components/layout/form-layout"
import { ContactChannels } from "@/components/layout/contact-channels"
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
            <FormLayout
                title="Entre em contato"
                description="Nossa equipe responderá em até 24 horas úteis."
                aside={<ContactChannels channels={siteContact.channels} />}
            >
                <ContatoForm />
            </FormLayout>
        </Section>
    )
}
