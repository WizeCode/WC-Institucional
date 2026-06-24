import type { Metadata } from "next";
import { EmConstrucao } from "@/components/layout/em-construcao";

export const metadata: Metadata = {
    title: "Web App",
    robots: { index: false, follow: true },
    alternates: { canonical: "/servicos/web/web-app" },
};

export default function Page() {
    return <EmConstrucao titulo="Web App" />;
}
