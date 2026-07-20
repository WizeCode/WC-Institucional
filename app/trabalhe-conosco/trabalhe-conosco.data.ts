import type { Feature } from "@/components/sections/feature-grid"
import type { BentoItem } from "@/components/sections/bento-grid"
import type { StackGroup } from "@/components/sections/stack-groups"
import type { TimelineStep } from "@/components/sections/timeline"
import type { Technology } from "@/components/sections/stack"

const stackIcon = (file: string) => `/images/stack/${file}.svg`

interface SectionHeader {
    badge: string
    title: string
    description: string
}

export const trabalheConosco = {
    hero: {
        badge: "/ Banco de talentos",
        title: "Uma renda extra *sem o risco* que todo freela conhece.",
        description:
            "Você entrega, você recebe — mesmo se o cliente não aprovar o projeto. Sem controle de ponto, 100% remoto e com a equipe revisando seu código para você sair melhor do que entrou.",
        image: {
            src: "/images/home/sistemas2.webp",
            alt: "Equipe da WizeCode desenvolvendo um projeto",
        },
        cta: {
            primary: { text: "Cadastrar meu perfil", url: "#cadastro" },
            secondary: { text: "Como funciona", url: "#processo" },
        },
    },

    cultura: {
        badge: "/ Cultura",
        title: "Como a gente *trabalha* de verdade",
        description:
            "Sem discurso de parede. É isso que você encontra no dia a dia de um projeto com a WizeCode.",
        items: [
            {
                title: "Ninguém te cobra horário",
                description:
                    "Não existe ponto nem reunião de status para provar que você trabalhou. Combinamos a entrega e o prazo; como você organiza o seu dia é problema seu — e é assim que deve ser.",
                image: {
                    src: "/images/home/automacoes2.png",
                    alt: "Trabalho remoto organizado por entregas",
                },
                className: "md:col-span-2 lg:row-span-2",
            },
            {
                icon: "shieldCheck",
                title: "Excelência combinada",
                description:
                    "Fluxo definido e padrão de código claro desde o primeiro dia.",
            },
            {
                icon: "messagesSquare",
                title: "Comunicação direta",
                description:
                    "Travou ou vai atrasar? Fala. Problema avisado cedo é problema pequeno.",
            },
            {
                icon: "users",
                title: "Revisão que ensina",
                description:
                    "Todo trabalho passa pela equipe. É onde você aprende de verdade.",
            },
            {
                icon: "bot",
                title: "IA liberada, muleta não",
                description:
                    "Usamos IA no fluxo e temos skills do Claude que ajudam no desenvolvimento. A régua é uma só: você precisa entender o que entregou e saber explicar.",
                image: {
                    src: "/images/home/landing-page.webp",
                    alt: "Uso de IA no fluxo de desenvolvimento",
                },
                layout: "split",
                className: "lg:col-span-2",
            },
        ] satisfies BentoItem[],
    },

    beneficios: {
        badge: "/ O que você ganha",
        title: "O que a gente *oferece* hoje",
        description:
            "Preferimos ser diretos sobre onde estamos hoje a te vender uma expectativa que não vamos cumprir.",
        items: [
            {
                icon: "wallet",
                title: "Pagamento garantido",
                description:
                    "Fez o serviço, recebe. Se o cliente não aprovar o projeto, o problema é nosso — não seu. Você não carrega o risco comercial da WizeCode.",
                highlight: true,
            },
            {
                icon: "calendarClock",
                title: "Sem cobrança de horário",
                description:
                    "Trabalhe no horário que der, entre uma aula e outra. O que combinamos é a entrega, não o expediente.",
            },
            {
                icon: "zap",
                title: "Escopo fechado antes de começar",
                description:
                    "Nosso fluxo define o que precisa ser feito antes de você pôr a mão. Nada de escopo que cresce sem fim no meio do caminho.",
            },
            {
                icon: "graduationCap",
                title: "Capacitação conforme o vínculo",
                description:
                    "Conforme o trabalho junto evolui, entram cursos de capacitação. Quem fica, cresce com a gente.",
            },
            {
                icon: "trendingUp",
                title: "Estágio é o nosso próximo passo",
                description:
                    "Ainda não conseguimos ofertar, e não vamos fingir que sim. Mas é um desejo grande nosso e estamos trabalhando duro para viabilizar: quem já está construindo junto com a gente entra na frente quando abrir.",
            },
            {
                icon: "brain",
                title: "Projeto real, não exercício",
                description:
                    "Você trabalha em sistema de cliente que vai para produção. Portfólio de verdade, não CRUD de faculdade.",
            },
        ] satisfies Feature[],
    },

    stack: {
        badge: "/ Stack",
        title: "Com o que você vai trabalhar",
        description:
            "A stack dos nossos projetos de desenvolvimento. Não precisa dominar tudo — precisa saber aprender.",
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
                        id: "tailwindcss",
                        name: "Tailwind CSS",
                        logo: stackIcon("tailwindcss"),
                    },
                ] satisfies Technology[],
            },
            {
                name: "Backend & CMS",
                items: [
                    {
                        id: "wordpress",
                        name: "WordPress",
                        logo: stackIcon("wordpress"),
                        blackInLight: true,
                    },
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
                        id: "prisma",
                        name: "Prisma",
                        logo: stackIcon("prisma"),
                        blackInLight: true,
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
                name: "Infra & IA",
                items: [
                    { id: "docker", name: "Docker", logo: stackIcon("docker") },
                    {
                        id: "github",
                        name: "GitHub",
                        logo: stackIcon("github"),
                        blackInLight: true,
                    },
                    {
                        id: "claude",
                        name: "Claude",
                        logo: stackIcon("claude"),
                    },
                    { id: "n8n", name: "n8n", logo: stackIcon("n8n") },
                ] satisfies Technology[],
            },
        ] satisfies StackGroup[],
    },

    processo: {
        badge: "/ Processo seletivo",
        title: "O que acontece *depois* que você se cadastra",
        description:
            "Sem buraco negro: você sabe exatamente em que pé está e o que vem a seguir.",
        items: [
            {
                title: "Você se cadastra",
                description:
                    "Preenche o formulário aqui embaixo com seu currículo e um resumo do que você já fez.",
            },
            {
                title: "Analisamos seu currículo",
                description:
                    "A equipe lê o seu perfil. Olhamos o que você construiu, não só onde você estudou.",
            },
            {
                title: "Conversamos",
                description:
                    "Uma entrevista para nos conhecermos: como você pensa, como você comunica, o que te interessa.",
                highlight: true,
            },
            {
                title: "Você entra no banco de talentos",
                description:
                    "Aprovado, seu perfil fica em prontidão com a gente. Não é uma pasta esquecida — é a lista que a gente abre quando entra projeto.",
            },
            {
                title: "Chamamos quando entra projeto",
                description:
                    "Surgiu um projeto compatível, entramos em contato e checamos a sua disponibilidade. Você aceita se fizer sentido naquele momento.",
                highlight: true,
            },
        ] satisfies TimelineStep[],
    },

    form: {
        title: "Bora começar?",
        description:
            "Não temos vaga aberta agora — e é justamente por isso que queremos te conhecer antes. Cadastre seu perfil e falamos com você quando surgir um projeto com a sua cara.",
    },
} satisfies {
    hero: {
        badge: string
        title: string
        description: string
        image: { src: string; alt: string }
        cta: {
            primary: { text: string; url: string }
            secondary: { text: string; url: string }
        }
    }
    cultura: SectionHeader & { items: BentoItem[] }
    beneficios: SectionHeader & { items: Feature[] }
    stack: SectionHeader & { groups: StackGroup[] }
    processo: SectionHeader & { items: TimelineStep[] }
    form: { title: string; description: string }
}
