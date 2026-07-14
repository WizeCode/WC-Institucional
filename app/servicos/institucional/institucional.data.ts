import type { ServicoData } from "@/components/layout/servico-page"
import { cases } from "@/lib/cases"

export const institucional: ServicoData = {
    slug: "institucional",
    hero: {
        badge: "/ Website Institucional",
        title: "A *vitrine* da sua empresa no mundo digital.",
        description:
            "Um site institucional é a porta de entrada para a sua empresa no mundo digital. Ele transmite credibilidade, apresenta seus produtos e serviços, e fortalece sua marca. Com um design moderno e responsivo, garantimos que seu site seja acessível em qualquer dispositivo, proporcionando uma experiência agradável para os visitantes.",
        image: {
            src: "/images/home/websites.webp",
            alt: "Website institucional",
        },
        cta: { text: "Fale com nossa equipe", url: "/contato" },
    },
    dores: {
        badge: "/ O problema",
        title: "Na internet, sua empresa existe de verdade?",
        description:
            "Se algum destes cenários soa familiar, você está perdendo cliente todos os dias — sem nem perceber.",
        items: [
            "Procuram sua empresa no Google e não acham você — só o concorrente",
            "Toda a sua presença mora no Instagram: uma vitrine alugada, que muda de regra e pode sumir",
            "Sua empresa é séria, mas sem um site à altura o cliente não percebe isso",
            "Cliente novo só chega por indicação — nada trabalha por você sozinho",
            "Um concorrente menor parece maior e mais confiável, só por ter um bom site",
            'Pedem "manda o site de vocês" e você só tem um link do Instagram pra enviar',
        ],
    },
    capacidades: {
        badge: "/ O investimento",
        title: "O que você ganha com um site feito pela *WizeCode*?",
        description:
            "Muito além de um cartão de visitas: uma ferramenta de credibilidade e conversão.",
        items: [
            {
                title: "Design sob medida",
                description:
                    "Cada pixel pensado para traduzir a identidade da sua marca — nada de template genérico.",
                image: {
                    src: "/images/home/websites.webp",
                    alt: "Design de website institucional sob medida",
                },
                className: "md:col-span-2 lg:row-span-2",
            },
            {
                icon: "search",
                title: "SEO desde a fundação",
                description:
                    "Estrutura otimizada para o Google desde a primeira linha de código.",
            },
            {
                icon: "gauge",
                title: "Performance real",
                description:
                    "Carregamento rápido e nota alta no PageSpeed — velocidade que converte.",
            },
            {
                icon: "pencilRuler",
                title: "Fácil de atualizar",
                description:
                    "Você mantém textos e imagens sem depender de código a cada ajuste.",
            },
            {
                icon: "trendingUp",
                title: "Pronto para crescer",
                description:
                    "Uma base sólida que acompanha a evolução do seu negócio, sem retrabalho.",
                image: {
                    src: "/images/home/sistemas2.webp",
                    alt: "Website institucional preparado para escalar",
                },
                layout: "split",
                className: "lg:col-span-2",
            },
        ],
    },
    processo: {
        badge: "/ Como trabalhamos",
        title: "Do briefing ao ar, sem surpresas",
        description:
            "Um processo claro em 7 etapas, você sabe onde seu projeto está a cada momento.",
        items: [
            {
                title: "Briefing",
                description:
                    "Entendemos tudo: objetivo, identidade, UI/UX e funcionalidades.",
            },
            {
                title: "Proposta comercial",
                description:
                    "Escopo e valores — transparência total antes de começar.",
            },
            {
                title: "Plano de desenvolvimento",
                description:
                    "Um documento com prazos e processos: você sabe o que esperar.",
            },
            {
                title: "Prototipação",
                description:
                    "Você aprova o protótipo antes de uma linha de código. Só avançamos com 100% de satisfação.",
                highlight: true,
            },
            {
                title: "Codificação",
                description:
                    "Desenvolvemos com performance e SEO desde a fundação.",
            },
            {
                title: "Entrega",
                description: "Seu site no ar, testado e pronto pra converter.",
            },
            {
                title: "Manutenção & hospedagem",
                description:
                    "Por nossa conta. Você foca no negócio; a infra é com a gente.",
                highlight: true,
            },
        ],
    },
    portfolio: {
        projects: cases.filter(
            (project) => project.service === "Institucional"
        ),
    },
    faq: {
        description:
            "Reunimos as perguntas mais comuns de quem vai criar seu site. Não achou a sua?",
        whatsappMessage:
            "Olá! Tenho uma dúvida sobre o serviço de Website Institucional da WizeCode.",
        items: [
            {
                id: "faq-1",
                question:
                    "Quanto tempo leva para meu site institucional ficar no ar?",
                answer: "Um site institucional costuma ficar pronto em 3 a 6 semanas, dependendo do número de páginas e da complexidade do conteúdo. No briefing já conseguimos te passar uma estimativa realista, e durante o processo você acompanha cada etapa — sem surpresas de prazo.",
            },
            {
                id: "faq-2",
                question:
                    "Vou conseguir atualizar os textos e imagens sozinho depois?",
                answer: "Depende do plano e do projeto. Em alguns casos entregamos um painel para você mesmo editar o conteúdo sem depender de código; em outros, as alterações passam pela nossa equipe dentro da manutenção. Definimos o formato ideal no briefing, de acordo com a sua rotina e necessidade.",
            },
            {
                id: "faq-3",
                question: "Preciso ter domínio e hospedagem antes de começar?",
                answer: "A hospedagem fica por nossa conta — cuidamos de toda a infraestrutura para o site rodar rápido e seguro. O domínio (o endereço www da sua empresa) é registrado e mantido em seu nome, garantindo que ele seja sempre seu. Se ainda não tiver um, te orientamos no passo a passo.",
            },
            {
                id: "faq-4",
                question: "Meu site vai aparecer no Google?",
                answer: "Sim. Desenvolvemos o site com SEO desde a primeira linha de código: estrutura otimizada, carregamento rápido e boas práticas que ajudam o Google a entender e ranquear suas páginas. Vale lembrar que aparecer bem nas buscas é um trabalho contínuo, e deixamos a base pronta para isso.",
            },
            {
                id: "faq-5",
                question: "Já tenho um site. Vocês refazem ou migram o atual?",
                answer: "Avaliamos caso a caso. Analisamos seu site atual e, no briefing, indicamos se vale a pena migrar o conteúdo existente ou reconstruir do zero para eliminar problemas de fundação. A recomendação é sempre a que traz o melhor resultado para o seu negócio, não a mais trabalhosa.",
            },
            {
                id: "faq-6",
                question: "Vou poder ver o site antes de ele ficar pronto?",
                answer: "Sim. Antes de escrever qualquer linha de código, você aprova um protótipo visual do site. Só avançamos para o desenvolvimento com 100% da sua satisfação — assim você sabe exatamente o que vai receber, sem risco de surpresas na entrega.",
            },
        ],
    },
    contato: {
        title: "Seu site institucional está a um passo de sair do papel",
    },
}
