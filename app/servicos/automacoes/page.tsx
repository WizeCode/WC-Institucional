import type { Metadata } from "next"
import { ServicoPage } from "@/components/templates/servico-page"
import { automacoes } from "./automacoes.data"

export const metadata: Metadata = {
    title: "Automações",
    description:
        "A WizeCode automatiza o trabalho manual do seu negócio — coleta de dados, atendimento, relatórios e integrações — com n8n, IA e as ferramentas que você já usa.",
    alternates: { canonical: "/servicos/automacoes" },
}

export default function Page() {
    return <ServicoPage data={automacoes} />
}
