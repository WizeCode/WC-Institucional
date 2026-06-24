import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Página não encontrada",
    robots: { index: false, follow: false },
};

export default function NotFound() {
    return (
        <section className="px-8">
            <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
                <p className="text-accent text-7xl font-bold">404</p>
                <h1 className="my-6 text-2xl font-bold text-pretty lg:text-3xl">
                    Página não encontrada
                </h1>
                <p className="mb-8 max-w-md text-muted-foreground lg:text-lg">
                    O endereço que você procurou não existe ou foi movido.
                    Que tal voltar para a página inicial?
                </p>
                <Button asChild>
                    <a href="/">Voltar para o início</a>
                </Button>
            </div>
        </section>
    );
}
