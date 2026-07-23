interface CasesHubData {
    meta: { title: string; description: string; canonical: string }
    hero: { badge: string; title: string; description: string }
    frase: { quote: string }
    contato: { badge: string; title: string; description: string }
}

export const casesHub: CasesHubData = {
    meta: {
        title: "Cases",
        description:
            "Projetos entregues pela WizeCode: websites, sistemas e automações que geraram resultado real para nossos clientes.",
        canonical: "/cases",
    },
    hero: {
        badge: "/ Cases",
        title: "Projetos que viram *resultado*",
        description:
            "Uma seleção do que já entregamos, de websites institucionais a sistemas sob medida. Cada case é uma empresa que passou a existir de verdade no digital.",
    },
    frase: {
        quote: "Não entregamos só código. Entregamos a presença digital que faz o cliente ser levado a sério.",
    },
    contato: {
        badge: "/ Contato",
        title: "Seu projeto pode ser o próximo case",
        description:
            "Preencha o formulário e nossa equipe entrará em contato em até 24 horas úteis",
    },
}
