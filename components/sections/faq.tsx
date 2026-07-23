import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge, type BadgeVariant } from "@/components/ui/badge"
import Link from "next/link"
import { whatsappUrl } from "@/lib/social"

interface FaqItem {
    id: string
    question: string
    answer: string
}

interface FaqProps {
    title: string
    /** Segunda linha do título, em tom secundário. */
    subtitle?: string
    description: string
    /** Texto pré-preenchido no link de WhatsApp que fecha a descrição. */
    whatsappMessage: string
    items: FaqItem[]
    badge: string
    badgeVariant?: BadgeVariant
}

/**
 * Perguntas frequentes: cabeçalho de um lado, accordion do outro.
 *
 * A descrição sempre termina no link de WhatsApp — só a mensagem
 * pré-preenchida muda por página.
 *
 * ```tsx
 * <Faq
 *     badge={data.faq.badge}
 *     title={data.faq.title}
 *     subtitle={data.faq.subtitle}
 *     description={data.faq.description}
 *     whatsappMessage={data.faq.whatsappMessage}
 *     items={data.faq.items}
 * />
 * ```
 */
const Faq = ({
    title,
    subtitle,
    description,
    whatsappMessage,
    badge,
    badgeVariant = "default",
    items,
}: FaqProps) => {
    return (
        <div className="flex flex-col lg:flex-row lg:gap-12">
            <div className="flex-2">
                <Badge className="mx-auto mb-4" variant={badgeVariant}>
                    {badge}
                </Badge>
                <h2 className="mb-4 text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                    {title}
                    {subtitle && (
                        <>
                            <br />{" "}
                            <span className="font-normal text-muted-foreground">
                                {subtitle}
                            </span>
                        </>
                    )}
                </h2>
                <p className="mb-8 max-w-xl font-light text-muted-foreground lg:text-xl">
                    {description}{" "}
                    <Link
                        href={whatsappUrl(whatsappMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-primary"
                    >
                        Fale com a gente no WhatsApp.
                    </Link>
                </p>
            </div>
            <div className="flex-3">
                <Accordion type="single" collapsible>
                    {items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="items-center text-[18px] hover:no-underline">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="mb-2 text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}

export { Faq }
export type { FaqItem }
