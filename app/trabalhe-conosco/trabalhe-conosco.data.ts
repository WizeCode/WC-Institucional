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
        title: "Uma forma real de gerar renda com projetos de tecnologia.",
        description:
            "Você atua em projetos de desenvolvimento com remuneração por entrega. O trabalho é remoto, sem controle de ponto, e cada etapa passa pela revisão da equipe para garantir qualidade e evolução técnica.",
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
        title: "Como trabalhamos no dia a dia",
        /* Talvez alterar esse: a descrição da seção ficou muito específica
           e repete a ideia do primeiro card. Se quiser uma abertura mais institucional,
           vale usar uma frase mais ampla sobre a cultura de trabalho. */
        description:
            "Não existe ponto nem reunião de status para provar que você trabalhou. O combinado é entrega e prazo. Como você organiza o seu dia fica com você, como deve ser.",
        items: [
            {
                title: "Ninguém te cobra horário",
                /* Talvez alterar esse: aqui a versão está mais agressiva do que o restante da página.
                   Funciona se essa for a voz da marca, mas pode soar menos institucional. */
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
                    "Travou ou vai atrasar? Avise. Problema comunicado cedo é mais fácil de resolver.", /* ... Talvez alterar esse */
            },
            {
                icon: "users",
                title: "Revisão que te faz evoluir",
                description:
                    "Todo trabalho passa pela equipe. É onde você aprende de verdade.",
            },
            {
                icon: "bot",
                title: "IA liberada, muleta não",
                description:
                    "Usamos IA no fluxo para acelerar o desenvolvimento. A régua é uma só: você precisa entender o que entregou e saber explicar cada decisão.",
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
        title: "O que *oferecemos* hoje",
        description:
            "Preferimos ser diretos sobre onde estamos hoje a te vender uma expectativa que não vamos cumprir.",
        items: [
            {
                icon: "wallet",
                title: "Pagamento garantido",
                description:
                    "Fez o serviço, recebe. Se o cliente não aprovar o projeto, o risco é da WizeCode, não seu.",
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
                    "Nosso fluxo define o que precisa ser feito antes do início da execução. Sem escopo crescendo sem controle no meio do caminho.",
            },
            {
                icon: "graduationCap",
                title: "Capacitação ao longo da parceria",
                /* Talvez alterar esse: a segunda frase repete a primeira em outra forma.
                   Não está errada, mas perdeu força por redundância. */
                description:
                    "Conforme a parceria evolui, entram cursos de capacitação. Quem cresce com a gente, também se desenvolve com a gente.",
            },
            {
                icon: "trendingUp",
                title: "Estágio é o nosso próximo passo",
                description:
                    "Ainda não conseguimos oferecer estágio, e não vamos fingir que sim. Mas esse é um próximo passo importante para nós. Quando isso acontecer, quem já estiver construindo com a gente sai na frente.",
            },
            {
                icon: "brain",
                title: "Projeto real, não exercício",
                description:
                    "Você trabalha em sistema de cliente que vai para produção. É portfólio real, construído em projeto de verdade.",
            },
        ] satisfies Feature[],
    },

    stack: {
        badge: "/ Stack",
        title: "Com o que você vai trabalhar",
        description:
            "Esta é a stack usada nos nossos projetos de desenvolvimento. Você não precisa dominar tudo, mas precisa saber aprender rápido.",
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
        title: "O que acontece *depois* do seu cadastro",
        description:
            "Nada de processo sem retorno. Você sabe em que etapa está e o que vem a seguir.",
        items: [
            {
                title: "Você se cadastra",
                description:
                    "Você preenche o formulário com seu currículo e um resumo do que já construiu.",
            },
            {
                title: "Analisamos seu currículo",
                description:
                    "A equipe analisa o seu perfil. A gente olha o que você construiu, não só onde estudou.",
            },
            {
                title: "Conversamos",
                description:
                    "Fazemos uma conversa para entender como você pensa, como se comunica e no que quer crescer.",
                highlight: true,
            },
            {
                title: "Você entra no banco de talentos",
                /* Talvez alterar esse: esse bloco estava com título e descrição desalinhados.
                   Agora ficou coerente com o conteúdo da etapa. */
                description:
                    "Se aprovado, seu perfil entra no nosso banco de talentos. Não é uma pasta esquecida, é a base que consultamos quando surge um projeto compatível.",
            },
            {
                title: "Chamamos quando surgir um projeto",
                description:
                    "Surgiu um projeto compatível, entramos em contato e checamos a sua disponibilidade. Você aceita se fizer sentido naquele momento.",
                highlight: true,
            },
        ] satisfies TimelineStep[],
    },

    form: {
        title: "Vamos começar?",
        /* Talvez alterar esse: “Cadastre se” estava incorreto.
           Troquei por uma construção correta sem usar hífen. */
        description:
            "Não temos vaga aberta neste momento, e é justamente por isso que queremos conhecer seu perfil antes. Cadastre seu perfil e falamos com você quando surgir um projeto alinhado ao seu momento.",
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