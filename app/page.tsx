import { Hero } from "@/components/layout/home/hero";
import { Contato } from "@/components/layout/home/contato";
import { Servicos } from "@/components/layout/home/servicos";
import { Portfolio } from "@/components/layout/home/portfolio";
import { Parceiros } from "@/components/layout/home/parceiros";
import { Faq } from "@/components/layout/home/faq";
import { Diferenciais } from "@/components/layout/home/diferenciais";

export default function Page() {
    return (
        <>
            <Hero/>
            <Servicos/>
            <Diferenciais/>
            <Portfolio/>
            <Parceiros/>
            <Faq/>
            <Contato/>
        </>
    );
}
