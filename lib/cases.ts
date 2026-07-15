import type { Project } from "@/components/sections/portfolio"

/**
 * Fonte única de todos os cases da WizeCode.
 * Cada página consome daqui: a home mostra todos; as páginas de serviço
 * filtram por `service` (ex: `cases.filter(c => c.service === "Institucional")`).
 * Ao adicionar um case novo, basta incluí-lo aqui.
 */
export const cases = [
    {
        id: "1",
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
        title: "Jadevine",
        category: "Semijoias",
        service: "Institucional",
        year: "2024",
        description:
            "Website institucional desenvolvido em WordPress para uma marca de semijoias, com foco em apresentação de produtos, catálogo editável, otimização para SEO e performance.",
        image: "/images/cases/jadevine.svg",
        href: "https://www.jadevine.com.br",
    },
] satisfies Project[]
