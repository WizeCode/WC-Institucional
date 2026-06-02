import { Hero } from "@/components/layout/home/hero";
import { Servicos } from "@/components/layout/home/servicos";
import { Portfolio } from "@/components/layout/home/portfolio";
import { Parceiros } from "@/components/layout/home/parceiros";
import { Faq } from "@/components/layout/home/faq";

export default function Page() {
    return (
        <>
            <Hero/>
            <Servicos/>
            <Portfolio/>
            <Parceiros/>
            <Faq/>
        </>
    );
}
