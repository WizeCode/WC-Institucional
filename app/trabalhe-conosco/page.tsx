import type { Metadata } from "next";
import { TrabalheConoscoPage } from "@/components/layout/trabalhe-conosco-page";

export const metadata: Metadata = {
    title: "Trabalhe Conosco",
    description:
        "Faça parte do banco de talentos da WizeCode. Cadastre seu perfil e entraremos em contato quando surgir uma oportunidade compatível.",
    alternates: { canonical: "/trabalhe-conosco" },
};

export default function Page() {
    return <TrabalheConoscoPage />;
}
