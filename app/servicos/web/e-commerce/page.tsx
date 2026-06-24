import type { Metadata } from "next";
import { EmConstrucao } from "@/components/layout/em-construcao";

export const metadata: Metadata = {
    title: "E-commerce",
    robots: { index: false, follow: true },
    alternates: { canonical: "/servicos/web/e-commerce" },
};

export default function Page() {
    return <EmConstrucao titulo="E-commerce" />;
}
