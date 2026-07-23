import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface LegalPageProps {
    titulo: string
    children: ReactNode
}
const LegalPage = ({ titulo, children }: LegalPageProps) => {
    return (
        <section className="px-6 sm:px-8">
            <article className="container mx-auto max-w-3xl py-12 sm:py-16">
                <h1 className="text-2xl font-bold tracking-tight text-pretty lg:text-3xl xl:text-4xl">
                    {titulo}
                </h1>

                <div
                    className={cn(
                        "mt-8 text-base leading-relaxed text-muted-foreground",
                        // Headings
                        "[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-24 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground lg:[&_h2]:text-2xl",
                        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground",
                        // Parágrafos
                        "[&_p]:my-4 [&_p]:break-words",
                        // Listas
                        "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
                        "[&_li]:pl-1",
                        // Ênfases
                        "[&_strong]:font-semibold [&_strong]:text-foreground",
                        "[&_em]:italic",
                        // Links
                        "[&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors hover:[&_a]:text-accent/80",
                        // Blockquotes
                        "[&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic"
                    )}
                >
                    {children}
                </div>
            </article>
        </section>
    )
}

export { LegalPage }
