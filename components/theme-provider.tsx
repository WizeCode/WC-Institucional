"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="bright"
            enableSystem
            disableTransitionOnChange
            {...props}
        >
            <ThemeHotkey />
            {children}
        </NextThemesProvider>
    )
}

export function useThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()

    const toggle = React.useCallback(() => {
        const next = resolvedTheme === "dark" ? "light" : "dark"

        if (!document.startViewTransition) {
            setTheme(next)
            return
        }

        document.startViewTransition(() => {
            setTheme(next)
        })
    }, [resolvedTheme, setTheme])

    return { resolvedTheme, toggle }
}

function isTypingTarget(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) {
        return false
    }

    return (
        target.isContentEditable ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT"
    )
}

function ThemeHotkey() {
    const { toggle } = useThemeToggle()

    React.useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.defaultPrevented || event.repeat) return
            if (event.metaKey || event.ctrlKey || event.altKey) return
            if (event.key.toLowerCase() !== "d") return
            if (isTypingTarget(event.target)) return
            toggle()
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [toggle])

    return null
}

export { ThemeProvider }
