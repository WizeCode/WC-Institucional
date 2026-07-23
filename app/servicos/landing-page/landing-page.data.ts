import type { ServicoData } from "@/components/templates/servico-page"

export const landingPage: ServicoData = {
    slug: "landing-page",
    hero: {
        badge: "/ Landing Page",
        title: "Seu anúncio merece uma página que *converte*.",
        description:
            "De nada adianta investir em tráfego se o clique cai numa página lenta e cheia de distração. A gente constrói a página do seu anúncio ou lançamento com um objetivo só: transformar visitante em lead. Rápida no celular, medindo cada real e sem perder ninguém pelo caminho.",
        image: {
            src: "/images/home/landing-page.webp",
            alt: "Landing page de alta conversão desenvolvida pela WizeCode",
        },
        cta: { text: "Fale com nossa equipe", url: "/contato" },
    },
    dores: {
        badge: "/ Problema",
        title: "Sua verba de anúncio está indo pro ralo?",
        description:
            "Se algum destes cenários soa familiar, você está pagando pelo clique e perdendo a venda logo depois dele.",
        items: [
            "Você paga o anúncio, mas a página demora a carregar e o visitante desiste antes de ver a oferta",
            "A página até é bonita, mas você não faz ideia de quantos cliques viraram lead",
            "O lead preenche o formulário e a informação some num e-mail que ninguém abre",
            "Você quer testar uma oferta nova, mas depende do site inteiro pra colocar uma página no ar",
            "No computador funciona, mas no celular, de onde vem o anúncio, a página fica quebrada",
            "É uma página só cheia de menu e link, quando devia ter um caminho só até o botão",
        ],
    },
    capacidades: {
        badge: "/ O investimento",
        title: "O que você ganha com uma landing da *WizeCode*?",
        description:
            "Não é mais uma página no seu site: é uma página construída para uma coisa só: fazer o visitante do seu anúncio agir.",
        items: [
            {
                title: "Feita pra uma coisa só: converter",
                description:
                    "Sem menu, sem link que dispersa: um caminho direto da oferta até o botão. Cada elemento existe para levar ao próximo passo.",
                image: {
                    src: "/images/services/landingpages/vendas.jpg",
                    alt: "Landing page focada em conversão",
                },
                className: "md:col-span-2 lg:row-span-2",
            },
            {
                icon: "gauge",
                title: "Rápida onde importa",
                description:
                    "Carrega veloz no celular, de onde vem a maior parte do seu tráfego pago. Página lenta é lead que você já pagou e perdeu.",
            },
            {
                icon: "search",
                title: "Você mede cada real",
                description:
                    "Pixel e eventos de conversão configurados: dá pra saber o custo por lead e otimizar a campanha com número, não achismo.",
            },
            {
                icon: "zap",
                title: "O lead cai no lugar certo",
                description:
                    "O formulário joga o contato direto no WhatsApp, e-mail ou planilha da sua equipe, sem digitação manual, sem lead esquecido.",
            },
            {
                icon: "sparkles",
                title: "No ar em dias, não meses",
                description:
                    "É uma página, não um site inteiro. Dá pra subir rápido, testar a oferta e ajustar sem esperar um projeto grande terminar.",
                image: {
                    src: "/images/services/landingpages/steps.jpg",
                    alt: "Landing page publicada rapidamente para validar uma oferta",
                },
                layout: "split",
                className: "lg:col-span-2",
            },
        ],
    },
    processo: {
        badge: "/ Como trabalhamos",
        title: "Da oferta ao ar, sem enrolação",
        description:
            "Um processo enxuto: você traz a oferta e o objetivo, a gente constrói a página pronta pra receber o seu tráfego.",
        items: [
            {
                title: "Briefing da oferta",
                description:
                    "Você traz a oferta, o público e o objetivo da página. A gente entende o que o visitante precisa fazer.",
            },
            {
                title: "Prototipação",
                description:
                    "Você aprova o layout da página antes de escrevermos uma linha de código.",
                highlight: true,
            },
            {
                title: "Construção & rastreamento",
                description:
                    "Colocamos a página de pé com o pixel, os eventos e o formulário já integrados ao seu destino.",
            },
            {
                title: "No ar & medindo",
                description:
                    "Publicamos, conectamos à sua campanha e acompanhamos a conversão para ajustar o que precisar.",
                highlight: true,
            },
        ],
    },
    faq: {
        description:
            "Reunimos as perguntas mais comuns de quem vai criar uma landing page. Não achou a sua?",
        whatsappMessage:
            "Olá! Tenho uma dúvida sobre o serviço de Landing Page da WizeCode.",
        items: [
            {
                id: "faq-1",
                question:
                    "Qual a diferença entre uma landing page e um site institucional?",
                answer: "O site institucional apresenta a sua empresa inteira: várias páginas, credibilidade, presença no Google. A landing page é uma página só, com um objetivo único: converter o visitante de um anúncio ou lançamento em lead ou venda. Uma constrói a marca no digital; a outra transforma tráfego em resultado. Muitos clientes têm as duas coisas, cada uma no seu papel.",
            },
            {
                id: "faq-2",
                question: "Vocês escrevem o texto da página?",
                answer: "O texto que convence, a oferta, os argumentos, o preço, é seu ou de quem cuida do seu marketing, porque ninguém conhece a sua oferta melhor que você. A gente entra na estrutura: organiza esse conteúdo no fluxo que leva à conversão, cuida do design, da velocidade e de tudo que faz a página funcionar. Se você chegar sem o texto pronto, orientamos o que cada parte precisa ter.",
            },
            {
                id: "faq-3",
                question: "Em quanto tempo a landing fica no ar?",
                answer: "Por ser uma página só, uma landing costuma ir ao ar em poucos dias depois que a oferta e o conteúdo estão definidos. É justamente essa agilidade que permite testar uma campanha ou validar uma oferta sem esperar o prazo de um site completo.",
            },
            {
                id: "faq-4",
                question:
                    "Dá para conectar com meu anúncio do Meta ou do Google?",
                answer: "Sim, essa é a ideia. Configuramos o pixel e os eventos de conversão para que a sua campanha do Meta Ads ou Google Ads saiba exatamente quantas pessoas viraram lead na página. Assim você mede o custo por resultado e otimiza o anúncio com base em número real, não em achismo.",
            },
            {
                id: "faq-5",
                question: "Para onde vão os leads que preenchem o formulário?",
                answer: "Para onde a sua equipe atende. Ligamos o formulário ao WhatsApp, e-mail, planilha ou CRM que você já usa, para que o contato chegue na hora, no lugar certo, sem ninguém precisar copiar dado na mão. Lead que demora a ser respondido esfria, por isso ele cai direto no seu fluxo de atendimento.",
            },
            {
                id: "faq-6",
                question:
                    "Preciso ter um site pronto para ter uma landing page?",
                answer: "Não. A landing page funciona sozinha, no seu próprio endereço, sem depender de um site institucional. Se você já tem um site, ela convive com ele numa boa; se não tem, a landing pode ser o seu primeiro passo no digital, focada em converter o tráfego que você já traz.",
            },
        ],
    },
    contato: {
        title: "Qual oferta você quer colocar pra converter?",
    },
}
