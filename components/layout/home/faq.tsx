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
            <span className="font-normal text-muted-foreground">
                Estamos aqui para ajudar.
            </span>
        </>
    ),
    description = (
        <>
            Ainda tem dúvidas?{" "}
            <Link
                href={`https://wa.me/5534984392633?text=${encodeURIComponent("Olá! Tenho uma dúvida sobre a WizeCode.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary"
            >
                Entre em contato conosco.
            </Link>
        </>
    ),
    badgeText = "/ FAQ",
    items = [
        {
            id: "faq-1",
            question: "Quanto tempo leva para desenvolver um projeto?",
            answer: "Depende do escopo. Um site institucional costuma ficar pronto em 3 a 6 semanas. Plataformas, sistemas e aplicativos mais complexos podem levar de 2 a 6 meses. Durante o briefing, a gente já consegue dar uma estimativa realista para o seu caso.",
        },
        {
            id: "faq-2",
            question: "Qual é o investimento para contratar a WizeCode?",
            answer: "Cada projeto é único, então não trabalhamos com tabelas fixas. O investimento é definido com base no escopo, complexidade e prazo. Nossa proposta é sempre personalizada — e você não tem nenhum compromisso antes de aprová-la.",
        },
        {
            id: "faq-3",
            question:
                "Quem cuida do conteúdo do site — textos, fotos e vídeos?",
            answer: "O ideal é que o conteúdo venha da sua empresa, já que ninguém conhece o negócio melhor do que você. Mas entendemos que nem todo cliente tem isso pronto: podemos te orientar sobre o que preparar e, em casos específicos, indicar parceiros para essa parte.",
        },
        {
            id: "faq-4",
            question: "A WizeCode desenvolve para qualquer segmento?",
            answer: "Sim. Já atuamos em educação, saúde, varejo, serviços e outros. O que importa é que exista um problema real para resolver — e nós encontramos a solução tecnológica mais adequada para ele.",
        },
        {
            id: "faq-5",
            question: "Vocês fazem manutenção e suporte após a entrega?",
            answer: "Sim. A entrega do projeto não é o fim da nossa relação — é o começo. Oferecemos planos de manutenção e suporte técnico para garantir que tudo continue funcionando, evoluindo e performando bem.",
        },
        {
            id: "faq-6",
            question:
                "É possível integrar o projeto com ferramentas que já uso?",
            answer: "Sim. Trabalhamos com integrações com sistemas de pagamento, WhatsApp, CRMs, ERPs, planilhas, redes sociais e muito mais. Se você já usa uma ferramenta e quer que o novo projeto se conecte a ela, é só nos contar no briefing.",
        },
    ],
}: FaqProps) => {
    return (
        <section className="my-8 px-8">
            <div className="container mx-auto flex flex-col py-16 lg:flex-row lg:gap-12">
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
                                <AccordionTrigger className="hover:no-underline text-[18px]">
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
        </section>
    )
}

export { Faq }
