"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            capture_pageview: false,
            persistence: "memory",
            ip: false,
            session_recording: {
                maskAllInputs: true,
            },
        })
    }, [])

    return (
        <PHProvider client={posthog}>
            <PageViewTracker />
            {children}
        </PHProvider>
    )
}

function PageViewTracker() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const posthog = usePostHog()

    useEffect(() => {
        if (pathname && posthog) {
            const url = pathname + (searchParams.toString() ? `?${searchParams}` : "")
            posthog.capture("$pageview", { $current_url: url })
        }
    }, [pathname, searchParams, posthog])

    return null
}
