import type { ServicoData } from "@/components/templates/servico-page"
import type { Technology } from "@/components/sections/stack"

const stackIcon = (file: string) => `/images/stack/${file}.svg`

export const automacoes: ServicoData = {
    slug: "automacoes",
    hero: {
        badge: "/ Automações",
        title: "Pare de fazer *na mão* o que um robô faz sozinho.",
        description:
            "Toda tarefa repetitiva é hora de gente boa indo embora. A gente automatiza o trabalho manual, coleta de dados, respostas, relatórios, integrações, para o seu time focar no que só ele faz.",
        image: {
            src: "/images/home/automacoes2.png",
            alt: "Automação de processos desenvolvida pela WizeCode",
        },
        cta: { text: "Fale com nossa equipe", url: "/contato" },
    },
    dores: {
        badge: "/ Problema",
        title: "Sua equipe ainda faz trabalho de robô?",
        description:
            "Se algum destes cenários soa familiar, você está pagando hora de gente para uma tarefa que roda sozinha.",
        items: [
            "Alguém copia dado de um sistema para o outro, na mão, todo dia",
            "Uma planilha que só existe porque alguém a atualiza manualmente sem parar",
            "Lead ou cliente chega e demora horas para receber a primeira resposta",
            "O relatório da semana toma meio dia de alguém para ficar pronto",
            "Tem uma tarefa repetitiva que ninguém automatizou porque “nunca sobra tempo”",
            "A informação está espalhada em vários lugares e ninguém consegue consolidar",
        ],
    },
    capacidades: {
        badge: "/ O investimento",
        title: "O que você ganha com uma automação da *WizeCode*?",
        description:
            "Não é mais um software para alguém operar: é um processo que passa a rodar sozinho, do jeito que o seu negócio funciona.",
        items: [
            {
                title: "Trabalha enquanto você dorme",
                description:
                    "A automação roda 24 horas por dia, no mesmo ritmo e sem o erro de quem faz na pressa.",
                image: {
                    src: "/images/services/automacao/workflows.png",
                    alt: "Automação que roda sem intervenção manual",
                },
                className: "md:col-span-2 lg:row-span-2",
            },
            {
                icon: "zap",
                title: "Integra o que você já usa",
                description:
                    "WhatsApp, e-mail, planilhas e sistemas trabalhando juntos, sem digitar duas vezes.",
            },
            {
                icon: "brain",
                title: "IA que lê e decide",
                description:
                    "Modelos que interpretam texto, analisam e respondem, não só apertam botão.",
            },
            {
                icon: "gauge",
                title: "Números em tempo real",
                description:
                    "Dashboards que se atualizam sozinhos: a decisão para de esperar o relatório.",
            },
            {
                icon: "trendingUp",
                title: "Começa pequeno e cresce",
                description:
                    "Automatizamos uma dor primeiro, provamos o resultado e expandimos a partir dela.",
                image: {
                    src: "/images/services/automacao/whatsss.png",
                    alt: "Automação que evolui a partir de um primeiro fluxo",
                },
                layout: "split",
                className: "lg:col-span-2",
            },
        ],
    },
    processo: {
        badge: "/ Como trabalhamos",
        title: "Da dor ao fluxo rodando, sem burocracia",
        description:
            "Um processo enxuto: você traz o problema e a gente vai construindo junto, ajustando no uso real.",
        items: [
            {
                title: "Conversa & diagnóstico",
                description:
                    "Você descreve a dor e a gente mapeia o processo manual, do começo ao fim.",
            },
            {
                title: "Desenho do fluxo",
                description:
                    "Definimos o que a automação faz e quais ferramentas ela vai conectar.",
            },
            {
                title: "Construção",
                description:
                    "Colocamos o fluxo para rodar: a primeira versão já é praticamente o produto.",
                highlight: true,
            },
            {
                title: "Ajustes & monitoramento",
                description:
                    "Refinamos no uso real e acompanhamos a automação rodando, corrigindo o que aparecer.",
                highlight: true,
            },
        ],
    },
    projetos: {
        badge: "/ O que automatizamos",
        title: "Automações que já colocamos para rodar",
        description:
            "Alguns dos fluxos que construímos para tirar o trabalho manual do caminho dos nossos clientes.",
        items: [
            {
                title: "Chatbots com IA",
                segment: "Atendimento",
                description:
                    "Atendimento e triagem automatizados, respondendo na hora pelo canal do cliente.",
            },
            {
                title: "Robô de coleta de dados",
                segment: "Scraping",
                description:
                    "Coleta automática de informação que alimenta o sistema de um cliente.",
            },
            {
                title: "Dashboards automáticos",
                segment: "Dados & BI",
                description:
                    "Indicadores no Looker Studio sempre atualizados, sem ninguém montar planilha.",
            },
            {
                title: "Análise financeira",
                segment: "Análise com IA",
                description:
                    "Avaliação automática de situação financeira a partir dos dados recebidos.",
            },
        ],
    },
    stack: {
        badge: "/ Tecnologia",
        badgeVariant: "outline",
        title: "As ferramentas por trás das suas automações",
        description:
            "A mesma stack que usamos nas nossas próprias automações: orquestração, IA e integração com o que você já tem.",
        groups: [
            {
                name: "Orquestração & IA",
                items: [
                    { id: "n8n", name: "n8n", logo: stackIcon("n8n") },
                    {
                        id: "openrouter",
                        name: "OpenRouter",
                        logo: stackIcon("openrouter"),
                        blackInLight: true,
                    },
                ] satisfies Technology[],
            },
            {
                name: "Scraping & scripts",
                items: [
                    { id: "python", name: "Python", logo: stackIcon("python") },
                    {
                        id: "selenium",
                        name: "Selenium",
                        logo: stackIcon("selenium"),
                    },
                ] satisfies Technology[],
            },
            {
                name: "Dados & BI",
                items: [
                    {
                        id: "googlesheets",
                        name: "Google Sheets",
                        logo: stackIcon("googlesheets"),
                        blackInLight: true,
                    },
                    {
                        id: "postgresql",
                        name: "PostgreSQL",
                        logo: stackIcon("postgresql"),
                    },
                    {
                        id: "datastudio",
                        name: "Looker Studio",
                        logo: stackIcon("datastudio"),
                    },
                ] satisfies Technology[],
            },
            {
                name: "Integrações & canais",
                items: [
                    {
                        id: "whatsapp",
                        name: "WhatsApp",
                        logo: stackIcon("whatsapp"),
                        blackInLight: true,
                    },
                    {
                        id: "gmail",
                        name: "Gmail",
                        logo: stackIcon("gmail"),
                        blackInLight: true,
                    },
                    {
                        id: "telegram",
                        name: "Telegram",
                        logo: stackIcon("telegram"),
                        blackInLight: true,
                    },
                ] satisfies Technology[],
            },
        ],
    },
    faq: {
        description:
            "Reunimos as perguntas mais comuns de quem quer automatizar um processo. Não achou a sua?",
        whatsappMessage:
            "Olá! Tenho uma dúvida sobre o serviço de Automações da WizeCode.",
        items: [
            {
                id: "faq-1",
                question: "Como sei se o meu processo dá para automatizar?",
                answer: "Se é uma tarefa repetitiva, com passos previsíveis e que alguém faz na mão hoje, quase sempre dá. Na conversa inicial a gente mapeia o seu processo e te diz, com honestidade, o que vale automatizar agora e o que é melhor deixar para depois.",
            },
            {
                id: "faq-2",
                question: "Preciso trocar os sistemas que já uso?",
                answer: "Não. A ideia da automação é justamente conectar o que você já tem, WhatsApp, e-mail, planilhas, seu sistema atual, em vez de substituir tudo. A gente integra as ferramentas existentes num fluxo só.",
            },
            {
                id: "faq-3",
                question: "Quanto tempo leva para uma automação ficar no ar?",
                answer: "Automações simples costumam ir ao ar em poucos dias; fluxos mais completos, com IA e várias integrações, levam algumas semanas. Como começamos por uma dor específica e evoluímos a partir dela, você vê resultado cedo, sem esperar um projeto gigante terminar.",
            },
            {
                id: "faq-4",
                question: "E se a automação der erro no meio do caminho?",
                answer: "Automação boa avisa quando algo falha em vez de errar em silêncio. Configuramos alertas e monitoramento, e seguimos acompanhando o fluxo rodando para corrigir rápido o que aparecer. Você não fica sozinho depois da entrega.",
            },
            {
                id: "faq-5",
                question: "A parte de IA funciona de verdade ou é só enfeite?",
                answer: "Funciona de verdade. Usamos modelos de linguagem para tarefas concretas: ler e classificar mensagens, analisar dados, responder cliente, resumir documento. A IA entra onde ela resolve, não como enfeite; se uma regra simples já dá conta, usamos a regra simples.",
            },
            {
                id: "faq-6",
                question: "Depois de pronta, quem cuida da automação?",
                answer: "Nós. A automação fica hospedada e monitorada por nossa conta, e seguimos disponíveis para ajustes e melhorias conforme o seu processo muda. Você foca no negócio; manter o fluxo rodando é com a gente.",
            },
        ],
    },
    contato: {
        title: "Qual processo você quer tirar das suas costas?",
    },
}
