import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CasePage } from "@/components/templates/case-page"
import { getCase, caseSlugs } from "@/lib/cases"

interface PageProps {
    params: Promise<{ slug: string }>
}

export function generateStaticParams() {
    return caseSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params
    const data = getCase(slug)

    if (!data) return {}

    return {
        title: data.meta.title,
        description: data.meta.description,
        alternates: { canonical: `/cases/${slug}` },
    }
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params
    const data = getCase(slug)

    if (!data) notFound()

    return <CasePage data={data} />
}
