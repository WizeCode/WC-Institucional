import type { CaseData } from "./types"
import type { Technology } from "@/components/sections/stack"

const stackIcon = (file: string) => `/images/stack/${file}.svg`

/** Case fictício de demonstração: modelo para novos cases, com todas as seções preenchidas. */
export const exemplo: CaseData = {
    slug: "exemplo",
    meta: {
        title: "Acme Contabilidade — Case de Website Institucional",
        description:
            "Como a WizeCode reposicionou a Acme Contabilidade no digital com um website institucional focado em credibilidade e captação de leads.",
    },
    hero: {
        badge: "/ Case · Institucional",
        title: "Acme Contabilidade: *presença digital* à altura de 20 anos de mercado",
        description:
            "Um escritório tradicional que perdia leads para concorrentes menores só por não ter um website. Reconstruímos a presença digital do zero.",
        cover: {
            src: "/images/cases/propagandista.svg",
            alt: "Website institucional da Acme Contabilidade",
        },
        liveUrl: "https://www.example.com",
    },
    challenge: {
        title: "O desafio",
        body: [
            "A Acme atende empresas há mais de duas décadas, mas sua única presença online era um perfil desatualizado numa rede social. Quem buscava o escritório no Google encontrava concorrentes — nunca a Acme.",
            "Sem um endereço próprio, cada proposta comercial começava em desvantagem: o cliente não tinha onde confirmar a seriedade e o porte do escritório antes da reunião.",
        ],
    },
    solution: {
        title: "A solução",
        body: [
            "Desenhamos um website institucional que traduz a autoridade do escritório: hierarquia de serviços clara, prova social em destaque e um fluxo de captação de leads que qualifica o contato antes de chegar ao time comercial.",
            "A base foi construída com SEO desde a fundação e performance real, garantindo que a Acme finalmente apareça para quem procura contabilidade na região.",
        ],
    },
    results: {
        title: "Resultados",
        metrics: [
            { value: "+180%", label: "Tráfego orgânico em 6 meses" },
            { value: "3,2x", label: "Leads qualificados por mês" },
            { value: "98/100", label: "Nota de performance (PageSpeed)" },
            { value: "1ª página", label: "Google para os termos-alvo" },
        ],
    },
    stack: {
        badge: "/ Tecnologia",
        badgeVariant: "outline",
        title: "A engenharia por trás do projeto",
        description:
            "Uma stack moderna e testada em produção, escolhida para performance e facilidade de manutenção.",
        groups: [
            {
                name: "Frontend",
                items: [
                    {
                        id: "nextjs",
                        name: "Next.js",
                        logo: stackIcon("nextjs"),
                        blackInLight: true,
                    },
                    { id: "react", name: "React", logo: stackIcon("react") },
                    {
                        id: "tailwindcss",
                        name: "Tailwind CSS",
                        logo: stackIcon("tailwindcss"),
                    },
                ] satisfies Technology[],
            },
            {
                name: "Infra",
                items: [
                    {
                        id: "vercel",
                        name: "Vercel",
                        logo: stackIcon("vercel"),
                        blackInLight: true,
                    },
                    {
                        id: "github",
                        name: "GitHub",
                        logo: stackIcon("github"),
                        blackInLight: true,
                    },
                ] satisfies Technology[],
            },
        ],
    },
    gallery: {
        images: [
            {
                src: "/images/cases/derivada.svg",
                alt: "Página inicial do website da Acme Contabilidade",
            },
            {
                src: "/images/cases/colmeia.svg",
                alt: "Seção de serviços do website da Acme Contabilidade",
            },
            {
                src: "/images/cases/jadevine.svg",
                alt: "Formulário de contato do website da Acme Contabilidade",
            },
        ],
    },
    testimonial: {
        quote: "Pela primeira vez em 20 anos, os clientes chegam já sabendo quem somos. O website virou nosso melhor vendedor.",
        author: "Fulano de Tal",
        role: "Sócio-diretor, Acme Contabilidade",
    },
    contato: {
        title: "Quer um case como este para a sua empresa?",
    },
}
