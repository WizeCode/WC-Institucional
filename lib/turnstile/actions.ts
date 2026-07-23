"use server"

import { lerEnv } from "@/lib/env"

export async function verifyTurnstile(token: string): Promise<boolean> {
    const secret = lerEnv("TURNSTILE_SECRET_KEY", "turnstile")
    if (!secret) return false

    const res = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ secret, response: token }),
        }
    )

    const data = await res.json()
    return data.success === true
}
