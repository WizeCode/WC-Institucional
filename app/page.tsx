import { Hero } from "@/components/layout/home/hero";
import { Servicos } from "@/components/layout/home/servicos";
import { Portfolio } from "@/components/layout/home/portfolio";

export default function Page() {
    return (
        <>
            <Hero/>
            <Servicos/>
            <Portfolio/>
        </>
    );
}
