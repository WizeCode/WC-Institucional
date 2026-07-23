import { posthogAnalytics } from "./adapters/posthog"
import type { Analytics } from "./types"

/**
 * The app's analytics entry point. Swapping vendors means changing this line —
 * no page or component knows who is behind it. See docs/CONVENTIONS.md §11.
 */
export const analytics: Analytics = posthogAnalytics

/** Shorthand: `track("cta_contact_clicked", { source: "hero" })` */
export const track: Analytics["track"] = (event, props) =>
    analytics.track(event, props)

export type { Analytics, AnalyticsProps } from "./types"
