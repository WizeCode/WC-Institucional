import type { Metadata } from "next";
import { EmConstrucao } from "@/components/layout/em-construcao";

export const metadata: Metadata = {
    title: "Website Institucional",
    robots: { index: false, follow: true },
    alternates: { canonical: "/servicos/web/institucional" },
};

export default function Page() {
    return <EmConstrucao titulo="Website Institucional" />;
}
