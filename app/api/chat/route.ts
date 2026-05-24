import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import { streamText, convertToModelMessages } from "ai"
import { systemPrompt } from "@/lib/chat/system-prompt"

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
})

const MAX_MESSAGES = 62 // ~31 trocas (user + assistant por turno)
const MAX_TOKENS_PER_RESPONSE = 600
const MAX_USER_MESSAGE_LENGTH = 1000

export async function POST(request: Request) {
    try {
        const { messages } = await request.json()

        if (!Array.isArray(messages) || messages.length > MAX_MESSAGES) {
            return new Response("Limite de conversa atingido.", { status: 429 })
        }

        const lastUserMessage = [...messages].reverse().find((m: { role: string }) => m.role === "user")
        if (lastUserMessage) {
            const parts: { type: string; text?: string }[] = Array.isArray(lastUserMessage.parts)
                ? lastUserMessage.parts
                : []
            const content: string = typeof lastUserMessage.content === "string"
                ? lastUserMessage.content
                : parts.filter((p) => p.type === "text").map((p) => p.text ?? "").join("")
            if (content.length > MAX_USER_MESSAGE_LENGTH) {
                return new Response("Mensagem muito longa.", { status: 400 })
            }
        }

        const result = streamText({
            model: openrouter("google/gemini-2.0-flash-lite-001"),
            system: systemPrompt,
            messages: await convertToModelMessages(messages),
            maxOutputTokens: MAX_TOKENS_PER_RESPONSE,
        })

        return result.toTextStreamResponse()
    } catch (error) {
        console.error("Error in chat route:", error);
        return new Response("Internal Server Error", { status: 500 })
    }
}
