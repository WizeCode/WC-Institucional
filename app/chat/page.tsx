import type { Metadata } from "next"
import { ChatBot } from "@/components/chat/chat-bot"

export const metadata: Metadata = {
    title: "Wizard Chat - Converse com nosso assistente virtual",
    description:
        "Seu projeto ainda está meio confuso? Fale com o Wizard, nosso assistente virtual. Ele coleta tudo que precisamos para criar uma proposta sob medida — sem formulários, sem fricção.",
    alternates: {
        canonical: "/chat",
    },
}
import { MessageSquare, FileText, Rocket } from "lucide-react"

const steps = [
    {
        icon: MessageSquare,
        title: "Descreva seu projeto",
        description:
            "Converse com o Wizard como você faria com qualquer pessoa. Sem formulários, sem tecnicismo.",
    },
    {
        icon: FileText,
        title: "Wizard organiza tudo",
        description:
            "Ele estrutura as informações e gera um briefing completo — objetivos, escopo, contexto.",
    },
    {
        icon: Rocket,
        title: "Time entra em contato",
        description:
            "Nossa equipe recebe o briefing e prepara uma proposta personalizada para o seu negócio.",
    },
]

export default function Page() {
    return (
        <div className="flex h-[calc(100dvh-80px)] overflow-hidden">
            <div className="flex w-full flex-col lg:w-3/5">
                <ChatBot />
            </div>

            <aside className="hidden w-2/5 flex-col justify-center gap-10 border-l px-12 lg:flex">
                <div className="space-y-2">
                    <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                        Como funciona
                    </p>
                    <h2 className="text-2xl leading-snug font-semibold">
                        Seu projeto começa com{" "}
                        <span className="text-primary">uma boa conversa.</span>
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        O Wizard coleta tudo que precisamos para criar uma
                        proposta sob medida — sem formulários, sem fricção.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    {steps.map((step, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <step.icon className="size-4" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium">
                                    {step.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="border-t pt-6 text-xs text-muted-foreground">
                    Em até{" "}
                    <span className="font-medium text-foreground">
                        2 dias úteis
                    </span>
                    , nossa equipe entra em contato com uma proposta
                    personalizada.
                </p>
            </aside>
        </div>
    )
}
