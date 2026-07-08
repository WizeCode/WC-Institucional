import { services as serviceCatalog } from "@/lib/services"
import type { ServiceItem } from "@/components/sections/servicos"
import type { Diferencial } from "@/components/sections/diferenciais"
import type { Project } from "@/components/sections/portfolio"
import type { Technology } from "@/components/sections/stack"
import type { FaqItem } from "@/components/sections/faq"
import { siteContact } from "@/lib/social"

const stackIcon = (file: string) => `/images/stack/${file}.svg`

export const home = {
    servicos: {
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
        items: [
            {
                letter: "W",
                title: "Wisdom",
                icon: "brain",
                description:
                    "Tecnologias que garantem escalabilidade, segurança e alta performance — seu investimento à prova de obsolescência.",
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
                    "Interfaces e arquiteturas sob medida, com personalização até a satisfação total — cada pixel pensado para unir estética moderna à funcionalidade técnica.",
            },
            {
                letter: "E",
                title: "Empathy",
                icon: "empathy",
                description:
                    "Comunicação transparente e empática que traduz autoridade técnica em clareza, garantindo que você se sinta seguro e no controle em cada etapa.",
            },
        ] satisfies Diferencial[],
    },
    portfolio: {
        projects: [
            {
                id: "1",
                title: "Propagandista de Primeira",
                category: "Educação",
                service: "Institucional",
                year: "2025",
                description:
                    "Site institucional desenvolvido em WordPress para uma empresa de educação, com foco em apresentação de cursos, captação de leads e identidade visual alinhada ao posicionamento da marca.",
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
                    "Site institucional desenvolvido em WordPress para uma empresa de engenharia, com foco em apresentação de serviços, portfólio de projetos e otimização para SEO e performance.",
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
                    "Site institucional desenvolvido em WordPress para uma produtora audiovisual, com foco em apresentação de portfólio, serviços e integração com redes sociais.",
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
                    "Site institucional desenvolvido em WordPress para uma marca de semijoias, com foco em apresentação de produtos, catálogo editável, otimização para SEO e performance.",
                image: "/images/cases/jadevine.svg",
                href: "https://www.jadevine.com.br",
            },
        ] satisfies Project[],
    },
    stack: {
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
        items: [
            {
                id: "faq-1",
                question: "Quanto tempo leva para desenvolver um projeto?",
                answer: "Depende do escopo. Um site institucional costuma ficar pronto em 3 a 6 semanas. Plataformas, sistemas e aplicativos mais complexos podem levar de 2 a 6 meses. Durante o briefing, a gente já consegue dar uma estimativa realista para o seu caso.",
            },
            {
                id: "faq-2",
                question: "Qual é o investimento para contratar a WizeCode?",
                answer: "Cada projeto é único, então não trabalhamos com tabelas fixas. O investimento é definido com base no escopo, complexidade e prazo. Nossa proposta é sempre personalizada — e você não tem nenhum compromisso antes de aprová-la.",
            },
            {
                id: "faq-3",
                question:
                    "Quem cuida do conteúdo do site — textos, fotos e vídeos?",
                answer: "O ideal é que o conteúdo venha da sua empresa, já que ninguém conhece o negócio melhor do que você. Mas entendemos que nem todo cliente tem isso pronto: podemos te orientar sobre o que preparar e, em casos específicos, indicar parceiros para essa parte.",
            },
            {
                id: "faq-4",
                question: "A WizeCode desenvolve para qualquer segmento?",
                answer: "Sim. Já atuamos em educação, saúde, varejo, serviços e outros. O que importa é que exista um problema real para resolver — e nós encontramos a solução tecnológica mais adequada para ele.",
            },
            {
                id: "faq-5",
                question: "Vocês fazem manutenção e suporte após a entrega?",
                answer: "Sim. A entrega do projeto não é o fim da nossa relação — é o começo. Oferecemos planos de manutenção e suporte técnico para garantir que tudo continue funcionando, evoluindo e performando bem.",
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
        infoCards: siteContact.channels,
    },
}
