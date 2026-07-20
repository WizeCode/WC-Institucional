import type { Feature } from "@/components/sections/feature-grid"
import type { TeamMember } from "@/components/sections/team"
import type { Value } from "@/components/sections/values"

export const sobre = {
    hero: {
        badge: "/ A Wize",
        title: "Somos a Wize*Code*: tecnologia com intenção.",
        description:
            "Existimos para viabilizar o sucesso digital de pequenos, médios e grandes negócios — com soluções seguras, personalizadas e inteligentes, e a clareza de quem se faz entender em cada etapa.",
        image: {
            src: "/images/sobre/equipe.JPG",
            alt: "Equipe da WizeCode desenvolvendo um projeto",
        },
    },
    sobre: {
        badge: "/ Sobre nós",
        title: "Nascemos para entregar *produto*, não promessa.",
        paragraphs: [
            "A WizeCode Inovações e Tecnologia é uma software house especializada em websites, aplicativos, automações e SaaS. Dominamos todo o ciclo de vida do software — do planejamento à performance em produção — para transformar objetivos de negócio em produto pronto para operar e crescer.",
            "Nossa história começou na prática: um projeto acadêmico na UFU, o datacana.org, que tornou acessível um grande volume de dados de pesquisa. O resultado virou vontade de empreender — primeiro como Kourly Digital, atendendo negócios do Triângulo Mineiro, até amadurecer na WizeCode.",
            "Não vendemos horas nem promessa. Atuamos como parceiro tecnológico que traduz autoridade técnica em clareza, mantendo o cliente seguro e no controle em cada etapa — desde a personalização sob medida até o total contentamento com a entrega.",
        ],
    },
    proposito: {
        badge: "/ Propósito",
        title: "Para *onde* olhamos.",
        items: [
            {
                icon: "target",
                title: "Missão",
                description:
                    "Viabilizar e potencializar a performance e o sucesso digital de pequenos, médios e grandes negócios por meio de soluções tecnológicas seguras, personalizadas, inteligentes e altamente efetivas.",
            },
            {
                icon: "telescope",
                title: "Visão",
                description:
                    "Ser reconhecida como a parceria tecnológica mais confiável e qualificada do Brasil.",
            },
        ] satisfies Feature[],
    },
    equipe: {
        badge: "/ Nossa equipe",
        title: "*Gente* por trás de tudo.",
        description:
            "Quatro sócios que uniram tecnologia, estratégia e gestão para tirar a WizeCode do papel.",
        members: [
            {
                name: "Pedro",
                role: "Co-fundador · Diretor Executivo",
                bio: "Ciência da Computação. Cuida da arquitetura e do desenvolvimento dos produtos, do planejamento à entrega.",
                image: {
                    src: "/images/sobre/pedro.JPG",
                    alt: "Foto de Pedro",
                },
            },
            {
                name: "Gustavo",
                role: "Co-fundador · Diretor de Operações",
                bio: "Engenharia da Computação. Traduz requisitos de negócio em software robusto, com foco em escalabilidade e performance.",
                image: {
                    src: "/images/sobre/gustavo.jpeg",
                    alt: "Foto de Gustavo",
                },
            },
            {
                name: "Felipe",
                role: "Co-fundador · Diretor de Marketing",
                bio: "Conecta a autoridade técnica da WizeCode a uma comunicação clara, humana e consistente com o cliente.",
                image: {
                    src: "/images/sobre/felipe.jpeg",
                    alt: "Foto de Felipe",
                },
            },
            {
                name: "Rafael",
                role: "Co-fundador · Diretor Administrativo-Financeiro",
                bio: "Garante a organização, a previsibilidade e a estrutura administrativo-financeira que sustentam cada projeto.",
                image: {
                    src: "/images/sobre/rafa.JPG",
                    alt: "Foto de Rafael",
                },
            },
        ] satisfies TeamMember[],
    },
    nota: {
        badge: "/ Nota dos fundadores",
        title: "Uma palavra de quem *começou*.",
        paragraphs: [
            'A WizeCode não começou numa mesa de reunião. Começou entre pessoas que já confiavam umas nas outras muito antes de existir uma empresa — família e amigos de longa data que resolveram parar de tratar "ter algo nosso" como ideia e torná-lo real.',
            "O que nos une vem de antes do primeiro projeto: anos de convivência, laços que a gente não escolheu por conveniência, e a mesma vontade teimosa de crescer juntos. É essa harmonia — não um método no papel — que sustenta o trabalho quando ele aperta.",
            "Por trás de cada linha de código tem gente que escolheu estar aqui, lado a lado. É o nosso maior orgulho.",
        ],
        signature: "— Pedro, Gustavo, Felipe e Rafael",
    },
    values: {
        badge: "/ Nossos valores",
        title: "O que *guia* cada entrega.",
        description:
            "W-I-Z-E não é acaso: são os princípios que sustentam o nome e o trabalho da WizeCode.",
        items: [
            {
                letter: "W",
                title: "Wisdom",
                icon: "brain",
                description:
                    "Valorizamos o conhecimento, a adaptação e o aprimoramento permanente, mantendo métodos e estratégias sempre alinhados às transformações constantes do mundo digital.",
            },
            {
                letter: "I",
                title: "Intention",
                icon: "layers",
                description:
                    "Cada solução é fruto de escolhas conscientes e bem planejadas: trabalhamos com foco, propósito e clareza para alinhar tecnologia e estratégia aos objetivos do cliente.",
            },
            {
                letter: "Z",
                title: "Zeal",
                icon: "sparkles",
                description:
                    "Conduzimos cada projeto sob medida, com o máximo empenho, organização e atenção aos detalhes — nossos esforços só se encerram com o total contentamento do cliente.",
            },
            {
                letter: "E",
                title: "Empathy",
                icon: "empathy",
                description:
                    "Valorizamos relações transparentes e comunicações claras, tratando cada projeto como uma parceria construída com respeito e atenção.",
            },
        ] satisfies Value[],
    },
    contato: {
        badge: "/ Contato",
        title: "Bora trocar uma ideia?",
        description:
            "Conte o que você tem em mente. Quem lê e responde é a nossa equipe — em até 24 horas úteis.",
    },
}
