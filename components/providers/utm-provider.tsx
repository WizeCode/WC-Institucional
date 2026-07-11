"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"
import { captureUtm } from "@/lib/attribution/utm"

export function UtmProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Suspense fallback={null}>
                <UtmCapture />
            </Suspense>
            {children}
        </>
    )
}

function UtmCapture() {
    const searchParams = useSearchParams()

    useEffect(() => {
        captureUtm(searchParams)
    }, [searchParams])

    return null
}
