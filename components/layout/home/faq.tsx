import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface FaqItem {
    id: string
    question: string
    answer: string
}

interface FaqProps {
    heading?: string | React.ReactNode
    description?: React.ReactNode
    items?: FaqItem[]
    badgeText?: string
}

const Faq = ({
    heading = (
        <>
            Alguma dúvida? <br />{" "}
            <span className="text-muted-foreground font-normal">
                Estamos aqui para ajudar.
            </span>
        </>
    ),
    description = (
        <>
            Ainda tem dúvidas? Entre em contato{" "}
            <Link
                href={`https://wa.me/5534984392633?text=${encodeURIComponent("Olá! Tenho uma dúvida sobre a WizeCode.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
            >
                conosco.
            </Link>
        </>
    ),
    badgeText = "/ FAQ",
    items = [
        {
            id: "faq-1",
            question: "What is a FAQ?",
            answer: "A FAQ is a list of frequently asked questions and answers on a particular topic.",
        },
        {
            id: "faq-2",
            question: "What is the purpose of a FAQ?",
            answer: "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
        },
        {
            id: "faq-3",
            question: "How do I create a FAQ?",
            answer: "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
        },
        {
            id: "faq-4",
            question: "What are the benefits of a FAQ?",
            answer: "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
        },
        {
            id: "faq-5",
            question: "How should I organize my FAQ?",
            answer: "You should organize your FAQ in a logical manner, grouping related questions together and ordering them from most basic to more advanced topics.",
        },
        {
            id: "faq-6",
            question: "How long should FAQ answers be?",
            answer: "FAQ answers should be concise and to the point, typically a few sentences or a short paragraph is sufficient for most questions.",
        },
        {
            id: "faq-7",
            question: "Should I include links in my FAQ?",
            answer: "Yes, including links to more detailed information or related resources can be very helpful for users who want to learn more about a particular topic.",
        },
    ],
}: FaqProps) => {
    return (
        <section className="my-8 px-8">
            <div className="container mx-auto py-16 flex flex-col lg:flex-row lg:gap-12">
                <div className="flex-2">
                    <Badge className="mb-4 mx-auto" variant="default">{badgeText}</Badge>
                    <h2 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl mb-4">
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
                                <AccordionTrigger className=" hover:no-underline">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground mb-2">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}

export { Faq }
