"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"

const isProd = process.env.NODE_ENV === "production"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (!isProd) return
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            ui_host: "https://us.posthog.com",
            capture_pageview: false,
            capture_pageleave: true,
            persistence: "memory",
            ip: false,
            session_recording: {
                maskAllInputs: true,
            },
        })
    }, [])

    return (
        <PHProvider client={posthog}>
            <Suspense fallback={null}>
                <PageViewTracker />
            </Suspense>
            {children}
        </PHProvider>
    )
}

function PageViewTracker() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const posthog = usePostHog()

    useEffect(() => {
        if (!isProd || !pathname || !posthog) return
        const url =
            pathname + (searchParams.toString() ? `?${searchParams}` : "")
        posthog.capture("$pageview", { $current_url: url })
    }, [pathname, searchParams, posthog])

    return null
}
