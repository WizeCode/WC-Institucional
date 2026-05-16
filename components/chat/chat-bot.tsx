"use client"

import {
    Conversation,
    ConversationContent,
    ConversationEmptyState,
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
import { useEffect, useState } from "react"
import {
    BriefingDialog,
    type BriefingData,
} from "@/components/chat/briefing-dialog"
import { OnboardingDialog } from "@/components/chat/onboarding-dialog"
import { sendBriefing, verifyTurnstile } from "@/lib/chat/actions"
import { Turnstile } from "@marsidev/react-turnstile"

const BRIEFING_REGEX = /<briefing>([\s\S]*?)<\/briefing>/

function stripBriefing(text: string) {
    text = text.replace(BRIEFING_REGEX, "").trim()
    const partialStart = text.indexOf("<briefing>")
    if (partialStart !== -1) {
        text = text.slice(0, partialStart).trim()
    }
    return text
}

export function ChatBot() {
    const { messages, status, stop, sendMessage } = useChat({
        transport: new TextStreamChatTransport({ api: "/api/chat" }),
    })

    const [onboardingOpen, setOnboardingOpen] = useState(false)
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
    const [turnstileVerified, setTurnstileVerified] = useState(false)
    const [briefingDone, setBriefingDone] = useState(false)
    const [briefingData, setBriefingData] = useState<BriefingData | null>(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem("wize-onboarding-seen")) {
            setOnboardingOpen(true)
        }
    }, [])

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
        setBriefingData(parsed)
        setDialogOpen(true)
        setBriefingDone(true)

        sendBriefing(match[1].trim()).catch(console.error)
    }, [messages, status, briefingDone])

    return (
        <div className="flex h-full w-full flex-col">
            <Conversation>
                <ConversationContent>
                    {messages.length === 0 && (
                        <ConversationEmptyState>
                            <div className="space-y-1 text-center">
                                <h3 className="text-sm font-medium">
                                    Olá! Sou a <AuroraText>Wizard</AuroraText>
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Conte-me sobre o seu projeto.
                                </p>
                            </div>
                        </ConversationEmptyState>
                    )}
                    {messages.map((message, index) => {
                        const rawText = message.parts
                            .filter((p) => p.type === "text")
                            .map((p) => p.text)
                            .join("")

                        const text = stripBriefing(rawText)
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
                <PromptInput
                    onSubmit={async ({ text }) => {
                        if (!text.trim() || briefingDone) return
                        if (!turnstileVerified) {
                            if (process.env.NODE_ENV !== "development") {
                                if (!turnstileToken) return
                                const ok = await verifyTurnstile(turnstileToken)
                                if (!ok) return
                            }
                            setTurnstileVerified(true)
                        }
                        sendMessage({ text })
                    }}
                >
                    <PromptInputTextarea
                        placeholder={
                            briefingDone
                                ? "Conversa encerrada."
                                : "Digite sua mensagem..."
                        }
                        disabled={briefingDone}
                    />
                    <InputGroupAddon
                        align="inline-end"
                        className="items-end pb-1.5"
                    >
                        <PromptInputSubmit
                            status={status}
                            onStop={stop}
                            disabled={briefingDone}
                        />
                    </InputGroupAddon>
                </PromptInput>
            </div>

            {briefingData && (
                <BriefingDialog
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    briefing={briefingData}
                />
            )}

            <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                options={{ size: "invisible" }}
                onSuccess={setTurnstileToken}
            />

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
