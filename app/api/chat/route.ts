"use server"

import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import { streamText, convertToModelMessages } from "ai"
import { systemPrompt } from "@/lib/chat/system-prompt"

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
})

export async function POST(request: Request) {
    try {
        const { messages } = await request.json()

        const result = streamText({
            model: openrouter("openrouter/owl-alpha"),
            system: systemPrompt,
            messages: await convertToModelMessages(messages),
        })

        return result.toTextStreamResponse()
    } catch (error) {
        console.error("Error in chat route:", error);
        return new Response("Internal Server Error", { status: 500 })
    }
}
