import { SpeedInsights } from "@vercel/speed-insights/next"

import { Geom } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const geom = Geom({
    variable: "--font-geom",
    fallback: ["system-ui", "sans-serif"],
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
            className={cn("antialiased", geom.variable)}
        >
            <body>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
            <SpeedInsights />
        </html>
    )
}
