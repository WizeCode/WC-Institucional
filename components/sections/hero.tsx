"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { track } from "@/lib/analytics"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const heroVariants = cva("flex w-full items-center gap-10 lg:gap-20", {
    variants: {
        variant: {
            default: "flex-col lg:flex-row",
            reversed: "flex-col lg:flex-row-reverse",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

const bodyVariants = cva("mx-auto flex flex-1 flex-col items-center", {
    variants: {
        align: {
            start: "text-center md:ml-auto lg:ml-0 lg:max-w-3xl lg:items-start lg:text-left",
            center: "text-center",
        },
    },
})

const ctaVariants = cva("flex w-full flex-col gap-2 sm:flex-row", {
    variants: {
        align: {
            start: "sm:justify-center lg:justify-start",
            center: "sm:justify-center",
        },
    },
})

interface HeroContent {
    badge?: string
    title: React.ReactNode
    description?: React.ReactNode
    cta?: {
        primary?: { text: string; url: string }
        secondary?: { text: string; url: string }
    }
}

type HeroBodyProps = HeroContent &
    Required<VariantProps<typeof bodyVariants>> & {
        className?: string
    }

/** Body shared by `Hero` and `HeroCentered`: badge, title, description and CTAs. */
const HeroBody = ({
    badge,
    title,
    description,
    cta,
    align,
    className,
}: HeroBodyProps) => (
    <div className={cn(bodyVariants({ align }), className)}>
        {badge && <Badge variant="outline">{badge}</Badge>}
        {/* pre-line: `\n` no título do `.data.ts` vira quebra de linha. */}
        <h1 className="my-6 text-2xl font-bold text-pretty whitespace-pre-line lg:text-3xl xl:text-4xl">
            {title}
        </h1>
        {description && (
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
                {description}
            </p>
        )}
        {cta && (cta.primary || cta.secondary) && (
            <div className={cn(ctaVariants({ align }))}>
                {cta.primary && (
                    <Button
                        asChild
                        className="w-full sm:w-auto lg:h-11 lg:px-6 lg:text-base"
                    >
                        <a href={cta.primary.url}>{cta.primary.text}</a>
                    </Button>
                )}
                {cta.secondary && (
                    <Button
                        asChild
                        variant="outline"
                        onClick={() =>
                            track("cta_contact_clicked", { source: "hero" })
                        }
                    >
                        <a href={cta.secondary.url}>{cta.secondary.text}</a>
                    </Button>
                )}
            </div>
        )}
    </div>
)

interface HeroProps extends HeroContent, VariantProps<typeof heroVariants> {
    className?: string
    /** Media slot (terminal, image…). It is composition: comes from `page.tsx`. */
    children?: React.ReactNode
}

/**
 * Two-column hero: text on one side, media on the other.
 *
 * `variant="reversed"` swaps the sides on desktop — classes only, so it is a
 * variant. For a single-column hero use `HeroCentered`: it **drops** the media
 * slot, and dropping an element changes the HTML tree — which makes it a
 * component, not a variant. See `docs/CONVENTIONS.md` §5.
 *
 * ```tsx
 * <Hero badge={data.hero.badge} title={rich(data.hero.title)} cta={…}>
 *     <Image src={data.hero.image.src} … />
 * </Hero>
 * ```
 */
const Hero = ({ variant, className, children, ...content }: HeroProps) => (
    <div className={cn(heroVariants({ variant }), className)}>
        <HeroBody {...content} align="start" />
        {children && (
            <div className="flex w-full flex-1 justify-center lg:justify-end">
                {children}
            </div>
        )}
    </div>
)

interface HeroCenteredProps extends HeroContent {
    className?: string
}

/**
 * Single-column hero, everything centered. It has no media slot — if the text
 * needs an image beside it, the component you want is `Hero`.
 */
const HeroCentered = ({ className, ...content }: HeroCenteredProps) => (
    <div className={cn("flex w-full flex-col items-center gap-10", className)}>
        <HeroBody {...content} align="center" />
    </div>
)

export { Hero, HeroCentered, heroVariants }
export type { HeroProps, HeroCenteredProps }
