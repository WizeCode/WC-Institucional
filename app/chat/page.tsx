import { ChatBot } from "@/components/chat/chat-bot";
import { MessageSquare, FileText, Rocket } from "lucide-react";

const steps = [
    {
        icon: MessageSquare,
        title: "Descreva seu projeto",
        description: "Converse com a Wizard como você faria com qualquer pessoa. Sem formulários, sem tecnicismo.",
    },
    {
        icon: FileText,
        title: "Wizard organiza tudo",
        description: "Ela estrutura as informações e gera um briefing completo — objetivos, escopo, contexto.",
    },
    {
        icon: Rocket,
        title: "Time entra em contato",
        description: "Nossa equipe recebe o briefing e prepara uma proposta personalizada para o seu negócio.",
    },
];

export default function Page() {
    return (
        <div className="flex h-[calc(100dvh-80px)] overflow-hidden">
            <div className="flex flex-col w-full lg:w-3/5">
                <ChatBot />
            </div>

            <aside className="hidden lg:flex flex-col justify-center gap-10 w-2/5 border-l px-12">
                <div className="space-y-2">
                    <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                        Como funciona
                    </p>
                    <h2 className="text-2xl font-semibold leading-snug">
                        Seu projeto começa com{" "}
                        <span className="text-primary">uma boa conversa.</span>
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        A Wizard coleta tudo que precisamos para criar uma proposta
                        sob medida — sem formulários, sem fricção.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    {steps.map((step, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <step.icon className="size-4" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium">{step.title}</p>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-xs text-muted-foreground border-t pt-6">
                    Em até <span className="font-medium text-foreground">2 dias úteis</span>, nossa equipe
                    entra em contato com uma proposta personalizada.
                </p>
            </aside>
        </div>
    );
}
