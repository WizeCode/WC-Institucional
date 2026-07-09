"use client"

import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from "@/components/ai-elements/conversation"
import {
    Message,
    MessageContent,
    MessageResponse,
} from "@/components/ai-elements/message"
import {
    PromptInput,
    PromptInputSubmit,
    PromptInputTextarea,
} from "@/components/ai-elements/prompt-input"
import { InputGroupAddon } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { AuroraText } from "@/components/ui/aurora-text"
import { TextStreamChatTransport } from "ai"
import { useChat } from "@ai-sdk/react"
import { useEffect, useState, startTransition } from "react"
import {
    BriefingDialog,
    type BriefingData,
} from "@/components/chat/briefing-dialog"
import { OnboardingDialog } from "@/components/chat/onboarding-dialog"
import { verifyTurnstile } from "@/lib/turnstile/actions"
import { TurnstileBox } from "@/components/providers/turnstile-box"
import {
    MENSAGENS_INICIAIS,
    NOME_ASSISTENTE,
    TEXTO_ABERTURA,
} from "@/lib/chat/mensagem-inicial"

const BRIEFING_REGEX = /<briefing>([\s\S]*?)<\/briefing>/
const ABORT_REGEX = /<abort\s*\/?>/

function stripTags(text: string) {
    text = text.replace(BRIEFING_REGEX, "").trim()
    text = text.replace(ABORT_REGEX, "").trim()
    // Strip markdown images to prevent pixel-tracking injection attacks
    text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, "").trim()
    const partialBriefing = text.indexOf("<briefing>")
    if (partialBriefing !== -1) {
        text = text.slice(0, partialBriefing).trim()
    }
    const partialAbort = text.indexOf("<abort")
    if (partialAbort !== -1) {
        text = text.slice(0, partialAbort).trim()
    }
    return text
}

// Realça o nome do assistente na abertura centralizada. Se o nome não estiver
// no parágrafo, devolve o texto puro.
function realcarNome(paragrafo: string) {
    const corte = paragrafo.indexOf(NOME_ASSISTENTE)
    if (corte === -1) return paragrafo

    return (
        <>
            {paragrafo.slice(0, corte)}
            <AuroraText>{NOME_ASSISTENTE}</AuroraText>
            {paragrafo.slice(corte + NOME_ASSISTENTE.length)}
        </>
    )
}

// Enquanto a abertura é a única mensagem, ela ocupa o centro do painel. Quando o
// usuário responde, o mesmo texto reflui pro topo como balão de assistente.
function AberturaCentralizada() {
    return (
        <div className="flex flex-1 items-center justify-center p-6">
            <div className="max-w-sm space-y-3 text-center">
                {TEXTO_ABERTURA.split("\n\n").map((paragrafo, index) => (
                    <p
                        key={index}
                        className={
                            index === 0
                                ? "text-sm font-medium"
                                : "text-sm text-muted-foreground"
                        }
                    >
                        {realcarNome(paragrafo)}
                    </p>
                ))}
            </div>
        </div>
    )
}

export function ChatBot() {
    const { messages, status, stop, sendMessage } = useChat({
        transport: new TextStreamChatTransport({ api: "/api/chat" }),
        messages: MENSAGENS_INICIAIS,
    })

    const [onboardingOpen, setOnboardingOpen] = useState(() => {
        if (typeof window === "undefined") return false
        return !localStorage.getItem("wize-onboarding-seen")
    })
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
    const [turnstileErro, setTurnstileErro] = useState(false)
    const [turnstileVerified, setTurnstileVerified] = useState(false)
    const [briefingDone, setBriefingDone] = useState(false)
    const [briefingData, setBriefingData] = useState<BriefingData | null>(null)
    const [briefingRaw, setBriefingRaw] = useState<string>("")
    const [conversation, setConversation] = useState<
        { role: string; content: string }[]
    >([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [aborted, setAborted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (briefingDone || status !== "ready") return

        const lastAssistant = messages.findLast((m) => m.role === "assistant")
        if (!lastAssistant) return

        const text = lastAssistant.parts
            .filter((p) => p.type === "text")
            .map((p) => p.text)
            .join("")

        const match = text.match(BRIEFING_REGEX)
        if (!match) return

        const parsed = JSON.parse(match[1].trim())
        const conv = messages
            .map((m) => ({
                role: m.role,
                content: stripTags(
                    m.parts
                        .filter((p) => p.type === "text")
                        .map((p) => p.text)
                        .join("")
                ),
            }))
            .filter((m) => m.content)

        startTransition(() => {
            setBriefingData(parsed)
            setBriefingRaw(match[1].trim())
            setConversation(conv)
            setDialogOpen(true)
            setBriefingDone(true)
        })
    }, [messages, status, briefingDone])

    useEffect(() => {
        if (status === "ready") startTransition(() => setIsSubmitting(false))
    }, [status])

    useEffect(() => {
        if (aborted || status !== "ready") return

        const lastAssistant = messages.findLast((m) => m.role === "assistant")
        if (!lastAssistant) return

        const text = lastAssistant.parts
            .filter((p) => p.type === "text")
            .map((p) => p.text)
            .join("")

        if (!ABORT_REGEX.test(text)) return
        startTransition(() => setAborted(true))
    }, [messages, status, aborted])

    return (
        <div className="flex min-h-0 w-full flex-1 flex-col">
            {messages.length === 1 ? (
                <AberturaCentralizada />
            ) : (
                <Conversation>
                    <ConversationContent>
                        {messages.map((message, index) => {
                            const rawText = message.parts
                                .filter((p) => p.type === "text")
                                .map((p) => p.text)
                                .join("")

                            const text = stripTags(rawText)
                            if (!text) return null

                            const isLastAssistant =
                                index === messages.length - 1 &&
                                message.role === "assistant"

                            return (
                                <Message key={message.id} from={message.role}>
                                    <MessageContent>
                                        {message.role === "assistant" ? (
                                            isLastAssistant &&
                                            status === "streaming" ? (
                                                <span className="whitespace-pre-wrap">
                                                    {text}
                                                </span>
                                            ) : (
                                                <MessageResponse>
                                                    {text}
                                                </MessageResponse>
                                            )
                                        ) : (
                                            text
                                        )}
                                    </MessageContent>
                                </Message>
                            )
                        })}
                    </ConversationContent>
                    <ConversationScrollButton />
                </Conversation>
            )}

            <div className="space-y-2 border-t p-4">
                {briefingDone && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => setDialogOpen(true)}
                    >
                        Ver resumo do projeto
                    </Button>
                )}

                {!turnstileVerified && (
                    <TurnstileBox onToken={setTurnstileToken} />
                )}

                {turnstileErro && (
                    <p className="text-sm text-destructive">
                        Não conseguimos concluir a verificação de segurança.
                        Recarregue a página e tente novamente — se persistir,
                        desative extensões de bloqueio ou use outro navegador.
                    </p>
                )}

                <PromptInput
                    onSubmit={async ({ text }) => {
                        if (
                            !text.trim() ||
                            briefingDone ||
                            aborted ||
                            isSubmitting
                        )
                            return
                        setIsSubmitting(true)
                        if (!turnstileVerified) {
                            if (process.env.NODE_ENV !== "development") {
                                setTurnstileErro(false)
                                const ok = turnstileToken
                                    ? await verifyTurnstile(turnstileToken)
                                    : false
                                if (!ok) {
                                    setTurnstileErro(true)
                                    setIsSubmitting(false)
                                    return
                                }
                            }
                            // O widget desmonta aqui. O briefing monta o seu
                            // próprio depois: tokens são de uso único.
                            setTurnstileVerified(true)
                        }
                        sendMessage({ text })
                    }}
                >
                    <PromptInputTextarea
                        placeholder={
                            aborted
                                ? "Conversa encerrada — tópico fora do escopo."
                                : briefingDone
                                  ? "Conversa encerrada."
                                  : "Digite sua mensagem..."
                        }
                        disabled={
                            briefingDone ||
                            aborted ||
                            isSubmitting ||
                            status === "streaming"
                        }
                        maxLength={1000}
                    />
                    <InputGroupAddon
                        align="inline-end"
                        className="items-end pb-1.5"
                    >
                        <PromptInputSubmit
                            status={status}
                            onStop={stop}
                            disabled={
                                briefingDone ||
                                aborted ||
                                isSubmitting ||
                                (!turnstileVerified && !turnstileToken)
                            }
                        />
                    </InputGroupAddon>
                </PromptInput>
            </div>

            {briefingData && (
                <BriefingDialog
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    briefing={briefingData}
                    briefingRaw={briefingRaw}
                    conversation={conversation}
                />
            )}

            <OnboardingDialog
                open={onboardingOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        localStorage.setItem("wize-onboarding-seen", "1")
                        setOnboardingOpen(false)
                    }
                }}
            />
        </div>
    )
}
