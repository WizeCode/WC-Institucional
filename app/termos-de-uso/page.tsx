import type { Metadata } from "next";
import { EmConstrucao } from "@/components/layout/em-construcao";

export const metadata: Metadata = {
    title: "Termos de Uso",
    robots: { index: false, follow: true },
    alternates: { canonical: "/termos-de-uso" },
};

export default function Page() {
    return <EmConstrucao titulo="Termos de Uso" />;
}
