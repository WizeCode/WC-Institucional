import type { Metadata } from "next"
import { EmConstrucao } from "@/components/layout/em-construcao"

export const metadata: Metadata = {
    title: "Cases",
    robots: { index: false, follow: true },
    alternates: { canonical: "/cases" },
}

export default function Page() {
    return <EmConstrucao titulo="Cases" />
}
