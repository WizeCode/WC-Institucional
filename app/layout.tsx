// Import CSS
import "./globals.css"
import { Geom } from "next/font/google"
import type { Metadata } from "next"

// Import Components
import { ThemeProvider } from "@/components/theme-provider"
import { PostHogProvider } from "@/components/providers/posthog-provider"
import { UtmProvider } from "@/components/providers/utm-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

// Import Libs
import { cn } from "@/lib/utils"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { JsonLd } from "@/components/seo/json-ld"
import { organizationSchema, websiteSchema } from "@/lib/structured-data"

const geom = Geom({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-geom",
    fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
    metadataBase: new URL("https://www.wizecode.com.br"),
    title: {
        default:
            "WizeCode — Tecnologia inteligente, do planejamento à performance",
        template: "%s | WizeCode",
    },
    description:
        "Somos especialistas em transformar objetivos de negócio em soluções digitais inteligentes, eficientes e escaláveis. Desenvolvimento web, mobile, e-commerce e automação.",
    keywords: [
        "desenvolvimento web",
        "desenvolvimento mobile",
        "e-commerce",
        "automação",
        "agência digital",
        "software sob medida",
        "WizeCode",
    ],
    authors: [{ name: "WizeCode", url: "https://www.wizecode.com.br" }],
    creator: "WizeCode",
    publisher: "WizeCode",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "pt_BR",
        url: "https://www.wizecode.com.br",
        siteName: "WizeCode",
        title: "WizeCode — Tecnologia inteligente, do planejamento à performance",
        description:
            "Somos especialistas em transformar objetivos de negócio em soluções digitais inteligentes, eficientes e escaláveis. Desenvolvimento web, mobile, e-commerce e automação.",
        images: [
            {
                url: "/opengraph-image",
                width: 1200,
                height: 630,
                alt: "WizeCode — Tecnologia inteligente",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "WizeCode — Tecnologia inteligente, do planejamento à performance",
        description:
            "Somos especialistas em transformar objetivos de negócio em soluções digitais inteligentes, eficientes e escaláveis.",
        images: ["/opengraph-image"],
        creator: "@wizecode",
    },
    icons: {
        icon: [
            {
                url: "/ico/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                url: "/ico/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
            { url: "/ico/favicon.ico" },
        ],
        apple: [{ url: "/ico/apple-touch-icon.png" }],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="pt-BR"
            className={cn("antialiased", geom.variable)}
            suppressHydrationWarning
        >
            <body cz-shortcut-listen="true">
                <PostHogProvider>
                    <UtmProvider>
                        <ThemeProvider>
                            <Header />

                            <main>{children}</main>

                            <Footer />
                        </ThemeProvider>
                    </UtmProvider>
                </PostHogProvider>

                <JsonLd schema={[organizationSchema, websiteSchema]} />
                <SpeedInsights />
            </body>
        </html>
    )
}
