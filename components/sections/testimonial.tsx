import React from "react"
import { Quote } from "lucide-react"

/** Citação grande e centrada. Sem `author` é frase de efeito; com `author` vira depoimento. */

interface TestimonialProps {
    quote: React.ReactNode
    author?: string
    role?: string
}

const Testimonial = ({ quote, author, role }: TestimonialProps) => (
    <figure className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <Quote aria-hidden className="size-10 text-accent" strokeWidth={1.5} />
        <blockquote className="text-2xl leading-snug font-medium text-balance lg:text-3xl xl:text-4xl">
            {quote}
        </blockquote>
        {author && (
            <figcaption className="flex flex-col gap-1">
                <span className="text-lg font-semibold">{author}</span>
                {role && <span className="text-muted-foreground">{role}</span>}
            </figcaption>
        )}
    </figure>
)

export { Testimonial }
export type { TestimonialProps }
