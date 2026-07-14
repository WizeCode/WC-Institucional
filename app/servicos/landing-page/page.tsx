import type { Metadata } from "next"
import { EmConstrucao } from "@/components/templates/em-construcao"

export const metadata: Metadata = {
    title: "Landing Page",
    robots: { index: false, follow: true },
    alternates: { canonical: "/servicos/landing-page" },
}

export default function Page() {
    return <EmConstrucao titulo="Landing Page" />
}
