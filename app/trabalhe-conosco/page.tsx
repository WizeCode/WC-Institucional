import type { Metadata } from "next";
import { EmConstrucao } from "@/components/layout/em-construcao";

export const metadata: Metadata = {
    title: "Trabalhe Conosco",
    robots: { index: false, follow: true },
    alternates: { canonical: "/trabalhe-conosco" },
};

export default function Page() {
    return <EmConstrucao titulo="Trabalhe Conosco" />;
}
