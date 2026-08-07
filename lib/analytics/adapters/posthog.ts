import posthog from "posthog-js"
import type { Analytics, AnalyticsProps } from "../types"

/**
 * PostHog adapter: translates our `track()` into the vendor's `capture()`.
 * Swapping vendors means writing a sibling file and changing one line in
 * `lib/analytics/index.ts` — no component is aware of who is behind it.
 *
 * Not to be confused with `components/providers/posthog-provider.tsx`, the React
 * provider that *boots* the SDK. This one translates; that one initialises. They
 * are the only two files allowed to import the PostHog SDK (enforced by ESLint).
 *
 * `__loaded` guards calls made before `posthog.init` runs — and in dev, where the
 * provider never initialises it.
 */
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

/**
 * Reporta uma exceção direto pela API HTTP do PostHog (sem o SDK, que só
 * roda no browser) — usa o mesmo formato do `posthog.captureException`
 * (evento `$exception` + `$exception_list`) para cair no Error Tracking em
 * vez de em Actions/Events. `properties` vai junto no evento — é como Server
 * Actions preservam dados críticos (ex: candidatura) quando uma integração
 * externa falha, sem exigir um evento customizado à parte. Retorna `false`
 * sem lançar se o PostHog também estiver fora do ar, para quem chamar
 * decidir o fallback.
 */
export async function captureServerException(
    error: { type: string; message: string },
    distinctId: string,
    properties: AnalyticsProps
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
