import type { ServicoData } from "@/components/templates/servico-page"
import type { Technology } from "@/components/sections/stack"

const stackIcon = (file: string) => `/images/stack/${file}.svg`

export const sistemas: ServicoData = {
    slug: "sistemas",
    hero: {
        badge: "/ Sistemas sob medida",
        title: "O *software* que o seu negócio precisa.",
        description:
            "Ferramenta de prateleira força você a moldar o seu negócio a ela. A gente faz o contrário: construímos o sistema em volta do seu processo — web app, e-commerce, plataforma ou aplicativo — pronto para crescer junto com você.",
        image: {
            src: "/images/home/sistemas2.webp",
            alt: "Sistema sob medida desenvolvido pela WizeCode",
        },
        cta: { text: "Fale com nossa equipe", url: "/contato" },
    },
    dores: {
        badge: "/ Problema",
        title: "Ferramenta genérica nunca serve 100%?",
        description:
            "Se algum destes cenários soa familiar, seu processo está travando o negócio em vez de destravar.",
        items: [
            "Você adapta o seu processo à ferramenta, quando devia ser o contrário",
            "Sua operação vive em planilhas soltas que ninguém confia mais",
            "Tem uma ideia de produto digital, mas não sabe por onde começar a construir",
            "Paga assinatura de vários SaaS que, juntos, fazem 60% do que você precisa",
            "Seu sistema atual trava quando o movimento aumenta e não aguenta crescer",
            "Precisa integrar pagamento, WhatsApp, ERP… e nada conversa entre si",
        ],
    },
    capacidades: {
        badge: "/ O investimento",
        title: "O que você ganha com um sistema da *WizeCode*?",
        description:
            "Não é um software fechado que você aluga: é uma ferramenta construída para o seu processo, que você controla.",
        items: [
            {
                title: "Sob medida de verdade",
                description:
                    "Cada função pensada para o seu processo real — nada de moldar o negócio a um template genérico.",
                image: {
                    src: "/images/home/sistemas2.webp",
                    alt: "Sistema sob medida para o processo do cliente",
                },
                className: "md:col-span-2 lg:row-span-2",
            },
            {
                icon: "layers",
                title: "Arquitetura que escala",
                description:
                    "Base sólida que aguenta o movimento crescer sem travar.",
            },
            {
                icon: "zap",
                title: "Integrações que conversam",
                description:
                    "Pagamentos, WhatsApp, ERPs e planilhas trabalhando num lugar só.",
            },
            {
                icon: "sparkles",
                title: "Você valida antes",
                description:
                    "Um MVP funcional para testar com usuários reais antes de investir no sistema inteiro.",
            },
            {
                icon: "trendingUp",
                title: "Evolui em ciclos",
                description:
                    "Entregamos em sprints e seguimos evoluindo: o sistema cresce junto com o negócio.",
                image: {
                    src: "/images/home/automacoes2.png",
                    alt: "Sistema que evolui em ciclos de desenvolvimento",
                },
                layout: "split",
                className: "lg:col-span-2",
            },
        ],
    },
    processo: {
        badge: "/ Como trabalhamos",
        title: "Do requisito ao ar, evoluindo em ciclos",
        description:
            "Um processo claro que começa entendendo o seu negócio a fundo e entrega valor cedo, com um MVP funcional.",
        items: [
            {
                title: "Briefing & requisitos",
                description:
                    "Uma entrevista de requisitos funcionais para mapear cada regra e fluxo do seu negócio.",
            },
            {
                title: "Proposta comercial",
                description:
                    "Escopo e valores fechados só depois de entender a fundo o que o sistema precisa fazer.",
                highlight: true,
            },
            {
                title: "Prototipação",
                description:
                    "Você aprova o protótipo da interface antes de escrevermos uma linha de código.",
            },
            {
                title: "MVP funcional",
                description:
                    "Colocamos no ar uma primeira versão funcional para você validar com usuários reais.",
                highlight: true,
            },
            {
                title: "Ciclos de Scrum",
                description:
                    "A partir do MVP aprovado, evoluímos o sistema em sprints até a entrega completa.",
            },
            {
                title: "Manutenção & hospedagem",
                description:
                    "Sistema no ar, testado e evoluindo. A infraestrutura é por nossa conta.",
                highlight: true,
            },
        ],
    },
    projetos: {
        badge: "/ O que construímos",
        title: "Sistemas que já colocamos de pé",
        description:
            "Alguns dos projetos sob medida que desenvolvemos e estamos desenvolvendo.",
        items: [
            {
                title: "ARCA",
                segment: "SaaS · Gestão",
                description:
                    "Plataforma de gestão para clínicas-escola de psicologia.",
            },
            {
                title: "E-commerce de beats",
                segment: "E-commerce",
                description:
                    "Loja sob medida para um produtor musical vender suas faixas.",
            },
            {
                title: "Controle de frota",
                segment: "App de gestão",
                description:
                    "Aplicativo de controle da frota de veículos de um supermercado.",
            },
            {
                title: "Lista de presentes",
                segment: "Pagamentos",
                description:
                    "Site de casamento com integração de pagamentos para presentear os noivos.",
            },
        ],
    },
    stack: {
        badge: "/ Tecnologia",
        badgeVariant: "outline",
        title: "A engenharia por trás do seu sistema",
        description:
            "Uma stack moderna e testada em produção, a mesma que usamos nos nossos próprios produtos.",
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
                        id: "typescript",
                        name: "TypeScript",
                        logo: stackIcon("typescript"),
                    },
                    {
                        id: "javascript",
                        name: "JavaScript",
                        logo: stackIcon("javascript"),
                    },
                    {
                        id: "tailwindcss",
                        name: "Tailwind CSS",
                        logo: stackIcon("tailwindcss"),
                    },
                ] satisfies Technology[],
            },
            {
                name: "Mobile",
                items: [
                    {
                        id: "expo",
                        name: "Expo",
                        logo: stackIcon("expo"),
                        blackInLight: true,
                    },
                    {
                        id: "reactnative",
                        name: "React Native",
                        logo: stackIcon("reactnative"),
                    },
                ] satisfies Technology[],
            },
            {
                name: "Backend & CMS",
                items: [
                    {
                        id: "nodejs",
                        name: "Node.js",
                        logo: stackIcon("nodejs"),
                    },
                    { id: "nest", name: "Nest.JS", logo: stackIcon("nestjs") },
                    { id: "python", name: "Python", logo: stackIcon("python") },
                    {
                        id: "fastapi",
                        name: "FastAPI",
                        logo: stackIcon("fastapi"),
                    },
                    {
                        id: "wordpress",
                        name: "WordPress",
                        logo: stackIcon("wordpress"),
                        blackInLight: true,
                    },
                ] satisfies Technology[],
            },
            {
                name: "Banco de dados",
                items: [
                    {
                        id: "postgresql",
                        name: "PostgreSQL",
                        logo: stackIcon("postgresql"),
                    },
                    {
                        id: "supabase",
                        name: "Supabase",
                        logo: stackIcon("supabase"),
                    },
                    {
                        id: "firebase",
                        name: "Firebase",
                        logo: stackIcon("firebase"),
                    },
                    {
                        id: "mongodb",
                        name: "MongoDB",
                        logo: stackIcon("mongodb"),
                    },
                    { id: "sqlite", name: "SQLite", logo: stackIcon("sqlite") },
                    {
                        id: "prisma",
                        name: "Prisma",
                        logo: stackIcon("prisma"),
                        blackInLight: true,
                    },
                    { id: "redis", name: "Redis", logo: stackIcon("redis") },
                ] satisfies Technology[],
            },
            {
                name: "Infra & Deploy",
                items: [
                    { id: "docker", name: "Docker", logo: stackIcon("docker") },
                    {
                        id: "vercel",
                        name: "Vercel",
                        logo: stackIcon("vercel"),
                        blackInLight: true,
                    },
                    {
                        id: "googlecloud",
                        name: "Google Cloud",
                        logo: stackIcon("googlecloud"),
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
    faq: {
        description:
            "Reunimos as perguntas mais comuns de quem vai desenvolver um sistema sob medida. Não achou a sua?",
        whatsappMessage:
            "Olá! Tenho uma dúvida sobre o serviço de Sistemas sob medida da WizeCode.",
        items: [
            {
                id: "faq-1",
                question:
                    "Quanto tempo leva para desenvolver um sistema sob medida?",
                answer: "Depende do escopo. Um MVP funcional costuma ficar pronto em algumas semanas; um sistema completo, com todas as regras e integrações, pode levar de 2 a 6 meses. No levantamento de requisitos já conseguimos te dar uma estimativa realista, e como entregamos em ciclos, você acompanha a evolução do começo ao fim.",
            },
            {
                id: "faq-2",
                question:
                    "Por que começar por um MVP em vez do sistema completo?",
                answer: "Porque valida a ideia com menos tempo e dinheiro. O MVP é uma primeira versão funcional, com o essencial no ar, que você testa com usuários reais. A partir do que aprende, evoluímos em ciclos de Scrum, construindo o que de fato importa, sem gastar meses num recurso que ninguém vai usar.",
            },
            {
                id: "faq-3",
                question: "O código do sistema fica comigo?",
                answer: "Sim. O sistema é seu: código e dados. Deixamos tudo documentado e organizado para que você nunca fique refém de um fornecedor. Se um dia quiser levar o projeto para outra equipe, a transição é tranquila.",
            },
            {
                id: "faq-4",
                question:
                    "Como funciona o investimento em um projeto de sistema?",
                answer: "Depois da entrevista de requisitos, montamos uma proposta com escopo e valores claros, sem surpresa. Como trabalhamos por ciclos, dá para começar pelo MVP e evoluir conforme a prioridade e o orçamento, em vez de travar tudo num único contrato gigante.",
            },
            {
                id: "faq-5",
                question: "Dá para integrar com as ferramentas que eu já uso?",
                answer: "Sim. Integramos com sistemas de pagamento, WhatsApp, CRMs, ERPs, planilhas, e-mail e o que mais fizer parte da sua operação. Se você já usa uma ferramenta e quer que o sistema converse com ela, a gente conecta tudo num fluxo só.",
            },
            {
                id: "faq-6",
                question:
                    "Depois de pronto, quem cuida da manutenção e da hospedagem?",
                answer: "Nós. A hospedagem e a infraestrutura ficam por nossa conta, rodando rápido e seguro, e seguimos disponíveis para correções e melhorias. Você foca no negócio; a parte técnica é com a gente.",
            },
        ],
    },
    contato: {
        title: "Vamos construir o seu sistema?",
    },
}
