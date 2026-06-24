import type { Metadata } from "next";
import { EmConstrucao } from "@/components/layout/em-construcao";

export const metadata: Metadata = {
    title: "Política de Privacidade",
    robots: { index: false, follow: true },
    alternates: { canonical: "/politica-de-privacidade" },
};

export default function Page() {
    return <EmConstrucao titulo="Política de Privacidade" />;
}
