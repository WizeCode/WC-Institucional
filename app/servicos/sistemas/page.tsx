import type { Metadata } from "next"
import { EmConstrucao } from "@/components/templates/em-construcao"

export const metadata: Metadata = {
    title: "Sistemas",
    robots: { index: false, follow: true },
    alternates: { canonical: "/servicos/sistemas" },
}

export default function Page() {
    return <EmConstrucao titulo="Sistemas" />
}
