import type { Metadata } from "next";
import { Hero } from "@/components/layout/home/hero";
import { Contato } from "@/components/layout/home/contato";
import { Servicos } from "@/components/layout/home/servicos";
import { Portfolio } from "@/components/layout/home/portfolio";
import { Stack } from "@/components/layout/home/stack";
import { Faq } from "@/components/layout/home/faq";
import { Diferenciais } from "@/components/layout/home/diferenciais";

export const metadata: Metadata = {
    title: "WizeCode — Tecnologia inteligente, do planejamento à performance",
    description:
        "Transformamos objetivos de negócio em soluções digitais inteligentes: websites, e-commerce, apps mobile, plataformas e automação. Conheça a WizeCode.",
    alternates: {
        canonical: "/",
    },
};

export default function Page() {
    return (
        <>
            <Hero/>
            <Servicos/>
            <Diferenciais/>
            <Portfolio/>
            <Stack/>
            <Faq/>
            <Contato/>
        </>
    );
}
