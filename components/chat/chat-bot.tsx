"use client";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { InputGroupAddon } from "@/components/ui/input-group";
import { TextStreamChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { useEffect, useState } from "react";

const BRIEFING_REGEX = /<briefing>([\s\S]*?)<\/briefing>/;

function stripBriefing(text: string) {
  return text.replace(BRIEFING_REGEX, "").trim();
}

export function ChatBot() {
  const { messages, status, stop, sendMessage } = useChat({
    transport: new TextStreamChatTransport({ api: "/api/chat" }),
  });

  const [briefingDone, setBriefingDone] = useState(false);

  useEffect(() => {
    if (briefingDone || status !== "ready") return;

    const lastAssistant = messages.findLast((m) => m.role === "assistant");
    if (!lastAssistant) return;

    const text = lastAssistant.parts
      .filter((p) => p.type === "text")
      .map((p) => p.text)
      .join("");

    const match = text.match(BRIEFING_REGEX);
    if (!match) return;

    setBriefingDone(true);

    fetch("/api/briefing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: match[1].trim(),
    }).catch(console.error);
  }, [messages, status, briefingDone]);

  return (
    <div className="flex h-full w-full flex-col">
      <Conversation>
        <ConversationContent>
          {messages.length === 0 && (
            <ConversationEmptyState
              title="Olá! Sou a Wize"
              description="Conte-me sobre o seu projeto."
            />
          )}
          {messages.map((message, index) => {
            const rawText = message.parts
              .filter((p) => p.type === "text")
              .map((p) => p.text)
              .join("");

            const text = stripBriefing(rawText);
            if (!text) return null;

            const isLastAssistant =
              index === messages.length - 1 && message.role === "assistant";

            return (
              <Message key={message.id} from={message.role}>
                <MessageContent>
                  {message.role === "assistant" ? (
                    isLastAssistant && status === "streaming" ? (
                      <span className="whitespace-pre-wrap">{text}</span>
                    ) : (
                      <MessageResponse>{text}</MessageResponse>
                    )
                  ) : (
                    text
                  )}
                </MessageContent>
              </Message>
            );
          })}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t p-4">
        <PromptInput
          onSubmit={({ text }) => {
            if (!text.trim() || briefingDone) return;
            sendMessage({ text });
          }}
        >
          <PromptInputTextarea
            placeholder={
              briefingDone ? "Conversa encerrada." : "Digite sua mensagem..."
            }
            disabled={briefingDone}
          />
          <InputGroupAddon align="inline-end" className="items-end pb-1.5">
            <PromptInputSubmit
              status={status}
              onStop={stop}
              disabled={briefingDone}
            />
          </InputGroupAddon>
        </PromptInput>
      </div>
    </div>
  );
}
