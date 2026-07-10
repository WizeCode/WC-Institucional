import type { Metadata } from "next"
import { ServicoPage } from "@/components/layout/servico-page"
import { institucional } from "./institucional.data"

export const metadata: Metadata = {
    title: "Website Institucional",
    description: "A WizeCode oferece serviços de desenvolvimento de websites institucionais, criando uma presença online profissional e impactante para empresas de todos os setores.",
    alternates: { canonical: "/servicos/institucional" },
}

export default function Page() {
    return <ServicoPage data={institucional} />
}
