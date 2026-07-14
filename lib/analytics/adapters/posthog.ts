import posthog from "posthog-js"
import type { Analytics } from "../types"

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
