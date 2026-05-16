import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import { streamText, convertToModelMessages } from "ai"
import { systemPrompt } from "@/lib/chat/system-prompt"

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
})

const MAX_MESSAGES = 62 // ~31 trocas (user + assistant por turno)
const MAX_TOKENS_PER_RESPONSE = 600

export async function POST(request: Request) {
    try {
        const { messages } = await request.json()

        if (!Array.isArray(messages) || messages.length > MAX_MESSAGES) {
            return new Response("Limite de conversa atingido.", { status: 429 })
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
