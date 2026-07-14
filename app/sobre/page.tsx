import type { Metadata } from "next"
import { EmConstrucao } from "@/components/templates/em-construcao"

export const metadata: Metadata = {
    title: "A Wize",
    robots: { index: false, follow: true },
    alternates: { canonical: "/sobre" },
}

export default function Page() {
    return <EmConstrucao titulo="A Wize" />
}
