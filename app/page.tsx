import { Hero } from "@/components/layout/home/hero";
import { Servicos } from "@/components/layout/home/servicos";
import { Portifolio } from "@/components/layout/home/portifolio";

export default function Page() {
    return (
        <>
            <Hero/>
            <Servicos/>
            <Portifolio/>
        </>
    );
}
