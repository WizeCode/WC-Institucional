import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Section wrapper: full-bleed `<section>` + centered container.
 *
 * The variants only swap classes — none of them changes the HTML tree — so they
 * are a `cva()`, not separate components. See `docs/CONVENTIONS.md` §5.
 *
 * ```tsx
 * <Section variant="accent" backdrop={<Particles />}>
 *     <Contato … />
 * </Section>
 * ```
 */
const sectionVariants = cva("my-8 px-8 py-8 sm:py-16", {
    variants: {
        variant: {
            default: "",
            soft: "mx-4 rounded-md bg-foreground/5 px-4 sm:px-8 dark:bg-accent/10",
            accent: "relative mx-4 rounded-md bg-accent px-4 text-white sm:px-8 dark:bg-accent/10",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

interface SectionProps
    extends
        React.ComponentProps<"section">,
        VariantProps<typeof sectionVariants> {
    backdrop?: React.ReactNode
}

const Section = ({
    children,
    className,
    variant,
    backdrop,
    ...props
}: SectionProps) => (
    <section className={cn(sectionVariants({ variant }), className)} {...props}>
        {backdrop}
        <div className="container mx-auto">{children}</div>
    </section>
)

export { Section, sectionVariants }
export type { SectionProps }
