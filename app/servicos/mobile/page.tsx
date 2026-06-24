import type { Metadata } from "next";
import { EmConstrucao } from "@/components/layout/em-construcao";

export const metadata: Metadata = {
    title: "Mobile",
    robots: { index: false, follow: true },
    alternates: { canonical: "/servicos/mobile" },
};

export default function Page() {
    return <EmConstrucao titulo="Mobile" />;
}
