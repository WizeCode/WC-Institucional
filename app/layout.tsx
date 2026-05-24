// Import CSS
import "./globals.css";
import { Geom } from "next/font/google";

// Import Components
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Import Libs
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geom = Geom({
    variable: "--font-geom",
    fallback: ["system-ui", "sans-serif"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR" className={cn("antialiased", geom.variable)} suppressHydrationWarning>
            <body cz-shortcut-listen="true">
                <ThemeProvider>
                    <Header />

                    <main>{children}</main>

                    <Footer />
                </ThemeProvider>
            </body>

            <SpeedInsights />
        </html>
    );
};
