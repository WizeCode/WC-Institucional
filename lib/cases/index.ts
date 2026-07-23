import type { CaseData, CaseSummary } from "./types"
import { exemplo } from "./exemplo"

export type {
    CaseData,
    CaseSummary,
    CaseMetric,
    CaseTestimonial,
} from "./types"

/**
 * Fonte única dos cases. `cases` são os resumos que alimentam os cards (home,
 * páginas de serviço, grid do hub); `caseData` guarda o conteúdo das páginas de
 * detalhe, só para os cases que já têm página pronta.
 */
export const cases: CaseSummary[] = [
    {
        id: "1",
        slug: "propagandista-de-primeira",
        title: "Propagandista de Primeira",
        category: "Educação",
        service: "Institucional",
        year: "2025",
        description:
            "Website institucional desenvolvido em WordPress para uma empresa de educação, com foco em apresentação de cursos, captação de leads e identidade visual alinhada ao posicionamento da marca.",
        image: "/images/cases/propagandista.svg",
        href: "https://www.propagandistadeprimeira.com.br",
    },
    {
        id: "2",
        slug: "derivada-servicos-eletricos",
        title: "Derivada Serviços Elétricos",
        category: "Engenharia",
        service: "Institucional",
        year: "2026",
        description:
            "Website institucional desenvolvido em WordPress para uma empresa de engenharia, com foco em apresentação de serviços, portfólio de projetos e otimização para SEO e performance.",
        image: "/images/cases/derivada.svg",
        href: "https://www.derivadaengenharia.com",
    },
    {
        id: "3",
        slug: "produtora-colmeia",
        title: "Produtora Colmeia",
        category: "Audiovisual",
        service: "Institucional",
        year: "2026",
        description:
            "Website institucional desenvolvido em WordPress para uma produtora audiovisual, com foco em apresentação de portfólio, serviços e integração com redes sociais.",
        image: "/images/cases/colmeia.svg",
        href: "https://www.produtoracolmeia.com.br",
    },
    {
        id: "4",
        slug: "jadevine",
        title: "Jadevine",
        category: "Semijoias",
        service: "Institucional",
        year: "2024",
        description:
            "Website institucional desenvolvido em WordPress para uma marca de semijoias, com foco em apresentação de produtos, catálogo editável, otimização para SEO e performance.",
        image: "/images/cases/jadevine.svg",
        href: "https://www.jadevine.com.br",
    },
    {
        id: "5",
        slug: exemplo.slug,
        title: "Acme Contabilidade",
        category: "Contabilidade",
        service: "Institucional",
        year: "2025",
        description:
            "Case de demonstração: reposicionamento digital de um escritório de contabilidade tradicional com website institucional focado em credibilidade e captação de leads.",
        image: exemplo.hero.cover.src,
    },
]

const caseData: Record<string, CaseData> = {
    [exemplo.slug]: exemplo,
}

export function getCase(slug: string): CaseData | undefined {
    return caseData[slug]
}

export function caseSlugs(): string[] {
    return Object.keys(caseData)
}
