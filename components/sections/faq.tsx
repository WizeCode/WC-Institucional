import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge, type BadgeVariant } from "@/components/ui/badge"
interface FaqItem {
    id: string
    question: string
    answer: string
}

interface FaqProps {
    title: React.ReactNode
    description: React.ReactNode
    items: FaqItem[]
    badge: string
    badgeVariant?: BadgeVariant
}

const Faq = ({
    title,
    description,
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
                </h2>
                <p className="mb-8 max-w-xl font-light text-muted-foreground lg:text-xl">
                    {description}
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
