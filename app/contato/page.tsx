import type { Metadata } from "next";
import { ContatoPage } from "@/components/layout/home/contatoPage";

export const metadata: Metadata = {
    title: "Contato",
    description:
        "Entre em contato com a WizeCode. Fale com nossa equipe pelo formulário, WhatsApp ou e-mail e dê o primeiro passo para o seu projeto digital.",
    alternates: {
        canonical: "/contato",
    },
};

export default function Page() {
    return <ContatoPage/>;
}
