import type { Metadata } from "next"
import { ServicoPage } from "@/components/templates/servico-page"
import { sistemas } from "./sistemas.data"

export const metadata: Metadata = {
    title: "Sistemas",
    description:
        "A WizeCode desenvolve sistemas sob medida — web apps, e-commerces, plataformas e aplicativos — construídos em volta do processo do seu negócio e prontos para escalar.",
    alternates: { canonical: "/servicos/sistemas" },
}

export default function Page() {
    return <ServicoPage data={sistemas} />
}
