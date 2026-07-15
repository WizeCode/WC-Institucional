import type { Metadata } from "next"
import { EmConstrucao } from "@/components/templates/em-construcao"

export const metadata: Metadata = {
    title: "Automações",
    robots: { index: false, follow: true },
    alternates: { canonical: "/servicos/automacoes" },
}

export default function Page() {
    return <EmConstrucao titulo="Automações" />
}
