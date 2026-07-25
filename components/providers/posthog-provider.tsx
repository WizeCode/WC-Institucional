"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect } from "react"

const isProd = process.env.NODE_ENV === "production"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (!isProd) return
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            ui_host: "https://us.posthog.com",
            capture_pageview: "history_change",
            capture_pageleave: true,
            persistence: "memory",
            session_recording: {
                maskAllInputs: true,
                maskTextSelector: "[data-private]",
            },
        })
    }, [])

    return <PHProvider client={posthog}>{children}</PHProvider>
}
