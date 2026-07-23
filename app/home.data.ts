import { services as serviceCatalog } from "@/lib/services"
import type { ServiceItem } from "@/components/sections/services"
import type { Value } from "@/components/sections/values"
import { cases } from "@/lib/cases"
import type { Technology } from "@/components/sections/stack"
import type { FaqItem } from "@/components/sections/faq"
import type { TerminalBlock } from "@/components/sections/hero-terminal"
import { siteContact } from "@/lib/social"

const stackIcon = (file: string) => `/images/stack/${file}.svg`

export const home = {
    meta: {
        title: "WizeCode",
        description:
            "Transformamos objetivos de negócio em soluções digitais inteligentes: websites, e-commerce, apps mobile, plataformas e automação. Conheça a WizeCode.",
        canonical: "/",
    },
    hero: {
        badge: "/ Hero",
        title: "Tecnologia *inteligente*:\ndo planejamento à performance.",
        description:
            "Somos especialistas em transformar objetivos de negócio em soluções digitais inteligentes, eficientes e escaláveis – _com a clareza de quem domina cada etapa do processo._",
        cta: { text: "Fale com nossa equipe", url: "/contato" },
        terminal: {
            blocks: [
                {
                    command: 'wizecode scan "seu-negócio"',
                    lines: [
                        { kind: "error", text: "processos manuais detectados" },
                        {
                            kind: "error",
                            text: "ferramentas e sistemas lentos",
                        },
                        {
                            kind: "error",
                            text: "presença digital desatualizada",
                        },
                    ],
                },
                {
                    command: 'wizecode init "seu-projeto"',
                    lines: [
                        { kind: "step", text: "entrevista inicial realizada" },
                        {
                            kind: "step",
                            text: "requisitos funcionais e não-funcionais mapeados",
                        },
                        {
                            kind: "step",
                            text: "plano de desenvolvimento elaborado",
                        },
                        { kind: "detail", text: "stack definida" },
                        { kind: "detail", text: "cronograma definido" },
                        {
                            kind: "step",
                            text: "design desenvolvido e aprovado",
                        },
                        {
                            kind: "step",
                            text: "testes de qualidade realizados",
                        },
                        { kind: "detail", text: "performance: 98/100" },
                        { kind: "detail", text: "segurança: máxima" },
                    ],
                },
            ] satisfies TerminalBlock[],
            result: "projeto publicado e entregue com sucesso!",
        },
    },
    servicos: {
        badge: "/ Serviços",
        title: "O que a WizeCode *entrega*",
        description:
            "Do planejamento à entrega, desenvolvemos soluções digitais sob medida para o seu negócio.",
        services: [
            {
                id: "Institucional",
                title: serviceCatalog["Institucional"].label,
                description: serviceCatalog["Institucional"].shortDescription,
                color: "#0f101f",
                href: serviceCatalog["Institucional"].href,
                image: {
                    src: "/images/home/websites.webp",
                    alt: "Website Institucional",
                },
            },
            {
                id: "Landing Page",
                title: serviceCatalog["Landing Page"].label,
                description: serviceCatalog["Landing Page"].shortDescription,
                color: "#37175a",
                href: serviceCatalog["Landing Page"].href,
                image: {
                    src: "/images/home/landing page.webp",
                    alt: "Landing Page",
                },
            },
            {
                id: "Sistemas",
                title: serviceCatalog["Sistemas"].label,
                description: serviceCatalog["Sistemas"].shortDescription,
                color: "#7849cb",
                href: serviceCatalog["Sistemas"].href,
                image: { src: "/images/home/sistemas2.webp", alt: "Sistemas" },
            },
            {
                id: "Automações",
                title: serviceCatalog["Automações"].label,
                description: serviceCatalog["Automações"].shortDescription,
                color: "#a67de0",
                href: serviceCatalog["Automações"].href,
                image: {
                    src: "/images/home/automacoes2.png",
                    alt: "Automações",
                },
            },
        ] satisfies ServiceItem[],
    },
    diferenciais: {
        badge: "/ Diferenciais",
        title: "Mas o que a WizeCode tem de *diferente*?",
        description:
            "Enquanto outras software houses entregam promessas, a WizeCode entrega produto.",
        items: [
            {
                letter: "W",
                title: "Wisdom",
                icon: "brain",
                description:
                    "Tecnologias que garantem escalabilidade, segurança e alta performance, seu investimento à prova de obsolescência.",
            },
            {
                letter: "I",
                title: "Intention",
                icon: "layers",
                description:
                    "Dominamos todo o ciclo de vida do software e atuamos como parceiro tecnológico que transforma conceitos em produtos prontos para crescer.",
            },
            {
                letter: "Z",
                title: "Zeal",
                icon: "sparkles",
                description:
                    "Interfaces e arquiteturas sob medida, com personalização até a satisfação total, cada pixel pensado para unir estética moderna à funcionalidade técnica.",
            },
            {
                letter: "E",
                title: "Empathy",
                icon: "empathy",
                description:
                    "Comunicação transparente e empática que traduz autoridade técnica em clareza, garantindo que você se sinta seguro e no controle em cada etapa.",
            },
        ] satisfies Value[],
    },
    portfolio: {
        badge: "/ Portfólio",
        title: "Nosso Portfólio",
        description:
            "Cases de sucesso que refletem nossa expertise e compromisso com a excelência em cada projeto.",
        button: { url: "/cases", text: "Ver todos os cases" },
        projects: cases,
    },
    stack: {
        badge: "/ Stack",
        title: "Técnologias confiáveis",
        description:
            "Stack sólida e confiável, com tecnologias modernas, garantindo a qualidade e performance dos nossos projetos.",
        techRowOne: [
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
            { id: "nodejs", name: "Node.js", logo: stackIcon("nodejs") },
        ] satisfies Technology[],
        techRowTwo: [
            {
                id: "wordpress",
                name: "WordPress",
                logo: stackIcon("wordpress"),
                blackInLight: true,
            },
            { id: "nest", name: "Nest.JS", logo: stackIcon("nestjs") },
            {
                id: "github",
                name: "GitHub",
                logo: stackIcon("github"),
                blackInLight: true,
            },
            {
                id: "postgresql",
                name: "PostgreSQL",
                logo: stackIcon("postgresql"),
            },
            { id: "docker", name: "Docker", logo: stackIcon("docker") },
            {
                id: "vercel",
                name: "Vercel",
                logo: stackIcon("vercel"),
                blackInLight: true,
            },
        ] satisfies Technology[],
        techRowThree: [
            { id: "n8n", name: "n8n", logo: stackIcon("n8n") },
            { id: "python", name: "Python", logo: stackIcon("python") },
            { id: "mongodb", name: "MongoDB", logo: stackIcon("mongodb") },
            {
                id: "datastudio",
                name: "Looker Studio",
                logo: stackIcon("datastudio"),
            },
            { id: "claude", name: "Claude", logo: stackIcon("claude") },
            {
                id: "googlecloud",
                name: "Google Cloud",
                logo: stackIcon("googlecloud"),
            },
        ] satisfies Technology[],
    },
    faq: {
        badge: "/ FAQ",
        title: "Alguma dúvida?",
        subtitle: "Estamos aqui para ajudar.",
        description: "Ainda tem dúvidas?",
        whatsappMessage: "Olá! Tenho uma dúvida sobre a WizeCode.",
        items: [
            {
                id: "faq-1",
                question: "Quanto tempo leva para desenvolver um projeto?",
                answer: "Depende do escopo. Um website institucional costuma ficar pronto em 3 a 6 semanas. Plataformas, sistemas e aplicativos mais complexos podem levar de 2 a 6 meses. Durante o briefing, a gente já consegue dar uma estimativa realista para o seu caso.",
            },
            {
                id: "faq-2",
                question: "Qual é o investimento para contratar a WizeCode?",
                answer: "Cada projeto é único, então não trabalhamos com tabelas fixas. O investimento é definido com base no escopo, complexidade e prazo. Nossa proposta é sempre personalizada, e você não tem nenhum compromisso antes de aprová-la.",
            },
            {
                id: "faq-3",
                question:
                    "Quem cuida do conteúdo do website, textos, fotos e vídeos?",
                answer: "O ideal é que o conteúdo venha da sua empresa, já que ninguém conhece o negócio melhor do que você. Mas entendemos que nem todo cliente tem isso pronto: podemos te orientar sobre o que preparar e, em casos específicos, indicar parceiros para essa parte.",
            },
            {
                id: "faq-4",
                question: "A WizeCode desenvolve para qualquer segmento?",
                answer: "Sim. Já atuamos em educação, saúde, varejo, serviços e outros. O que importa é que exista um problema real para resolver, e nós encontramos a solução tecnológica mais adequada para ele.",
            },
            {
                id: "faq-5",
                question: "Vocês fazem manutenção e suporte após a entrega?",
                answer: "Sim. A entrega do projeto não é o fim da nossa relação, é o começo. Oferecemos planos de manutenção e suporte técnico para garantir que tudo continue funcionando, evoluindo e performando bem.",
            },
            {
                id: "faq-6",
                question:
                    "É possível integrar o projeto com ferramentas que já uso?",
                answer: "Sim. Trabalhamos com integrações com sistemas de pagamento, WhatsApp, CRMs, ERPs, planilhas, redes sociais e muito mais. Se você já usa uma ferramenta e quer que o novo projeto se conecte a ela, é só nos contar no briefing.",
            },
        ] satisfies FaqItem[],
    },
    contato: {
        badge: "/ Contato",
        title: "Vamos construir algo incrível juntos?",
        description: "Nossa equipe entrará em contato em até 24 horas úteis",
        infoCards: siteContact.channels,
    },
}
