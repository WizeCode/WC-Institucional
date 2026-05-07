import { SpeedInsights } from "@vercel/speed-insights/next"

import { Geom, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const geom = Geom({ variable: "--font-geom" })

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn(
                "antialiased",
                geom.variable,
                fontMono.variable,
                "font-sans"
            )}
        >
            <body>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
            <SpeedInsights />
        </html>
    )
}
