import type { ServiceCategory } from "@/lib/services"
import type { StackGroupsProps } from "@/components/sections/stack-groups"

/** Resumo de um case para os cards (grid do hub, home, páginas de serviço). */
export interface CaseSummary {
    id: string
    slug: string
    title: string
    /** Segmento do cliente (ex.: "Educação"), não o serviço prestado. */
    category: string
    service: ServiceCategory
    year: string
    description: string
    image: string
    href?: string
}

export interface CaseMetric {
    value: string
    label: string
}

export interface CaseTestimonial {
    quote: string
    author: string
    role: string
}

/**
 * Conteúdo da página de detalhe de um case. Modular como `ServicoData`: só
 * `hero`, `challenge`, `solution` e `contato` são obrigatórios; as demais seções,
 * omitidas, não renderizam.
 */
export interface CaseData {
    slug: string
    meta: { title: string; description: string }
    hero: {
        badge: string
        title: string
        description: string
        cover: { src: string; alt: string }
        liveUrl?: string
    }
    challenge: { title: string; body: string[] }
    solution: { title: string; body: string[] }
    results?: { title: string; metrics: CaseMetric[] }
    stack?: StackGroupsProps
    gallery?: { images: { src: string; alt: string }[] }
    testimonial?: CaseTestimonial
    contato: { title: string }
}
