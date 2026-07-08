import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
interface FaqItem {
    id: string
    question: string
    answer: string
}

interface FaqProps {
    heading: React.ReactNode
    description: React.ReactNode
    items: FaqItem[]
    badgeText: string
}

const Faq = ({ heading, description, badgeText, items }: FaqProps) => {
    return (
        <div className="flex flex-col lg:flex-row lg:gap-12">
            <div className="flex-2">
                <Badge className="mx-auto mb-4" variant="default">
                    {badgeText}
                </Badge>
                <h2 className="mb-4 text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                    {heading}
                </h2>
                <p className="mb-8 max-w-xl font-light text-muted-foreground lg:text-xl">
                    {description}
                </p>
            </div>
            <div className="flex-3">
                <Accordion type="single" collapsible>
                    {items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-[18px] hover:no-underline">
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
