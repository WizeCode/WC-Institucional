import posthog from "posthog-js"
import type { Analytics } from "../types"

export const posthogAnalytics: Analytics = {
    track(event, props) {
        if (typeof window === "undefined" || !posthog.__loaded) return
        posthog.capture(event, props)
    },
}

async function postCapture(
    event: string,
    distinctId: string,
    properties: Record<string, unknown>
): Promise<boolean> {
    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST
    if (!token || !host) return false

    try {
        const res = await fetch(`${host}/capture/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                api_key: token,
                event,
                distinct_id: distinctId,
                properties,
            }),
        })
        return res.ok
    } catch {
        return false
    }
}

export async function captureServerException(
    error: { type: string; message: string },
    distinctId: string,
    properties: Record<string, unknown>
): Promise<boolean> {
    return postCapture("$exception", distinctId, {
        ...properties,
        $exception_list: [
            {
                type: error.type,
                value: error.message,
                mechanism: { type: "generic", handled: true, synthetic: false },
            },
        ],
        $exception_level: "error",
    })
}
