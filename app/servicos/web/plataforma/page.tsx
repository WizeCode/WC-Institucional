import type { Metadata } from "next";
import { EmConstrucao } from "@/components/layout/em-construcao";

export const metadata: Metadata = {
    title: "Plataforma",
    robots: { index: false, follow: true },
    alternates: { canonical: "/servicos/web/plataforma" },
};

export default function Page() {
    return <EmConstrucao titulo="Plataforma" />;
}
