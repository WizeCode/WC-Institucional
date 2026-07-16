import type { Metadata } from "next"
import { ServicoPage } from "@/components/templates/servico-page"
import { landingPage } from "./landing-page.data"

export const metadata: Metadata = {
    title: "Landing Page",
    description:
        "A WizeCode cria landing pages de alta conversão para o seu anúncio ou lançamento — rápidas no celular, com rastreamento para tráfego pago e leads direto no seu WhatsApp, e-mail ou CRM.",
    alternates: { canonical: "/servicos/landing-page" },
}

export default function Page() {
    return <ServicoPage data={landingPage} />
}
