import type { Metadata } from "next";
import { EmConstrucao } from "@/components/layout/em-construcao";

export const metadata: Metadata = {
    title: "Automação",
    robots: { index: false, follow: true },
    alternates: { canonical: "/servicos/automacao" },
};

export default function Page() {
    return <EmConstrucao titulo="Automação" />;
}
