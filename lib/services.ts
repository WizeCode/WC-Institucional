import type { IconName } from "./icons"

/**
 * Catálogo único de serviços da WizeCode — fonte de verdade para home, header,
 * footer, portfólio e rota de cases.
 *
 * O ícone é referenciado por string (`IconName`, do registro em `lib/icons.ts`),
 * não pelo componente: assim o catálogo atravessa a fronteira Server → Client
 * sem quebrar e fica pronto para um CMS. Quem precisa renderizar o ícone faz
 * `icons[service.icon]`.
 */

export type ServiceCategory =
    | "Institucional"
    | "Landing Page"
    | "Sistemas"
    | "Automações"

export interface ServiceMeta {
    label: string
    shortDescription: string
    href: string
    icon: IconName
}

export const services: Record<ServiceCategory, ServiceMeta> = {
    Institucional: {
        label: "Website Institucional",
        shortDescription:
            "Sua marca no digital com credibilidade e presença profissional.",
        href: "/servicos/institucional",
        icon: "layoutTemplate",
    },
    "Landing Page": {
        label: "Landing Page",
        shortDescription:
            "Página de alta conversão para o seu próximo lançamento ou campanha.",
        href: "/servicos/landing-page",
        icon: "mousePointerClick",
    },
    Sistemas: {
        label: "Sistemas",
        shortDescription:
            "Web apps, e-commerces, plataformas e aplicativos sob medida.",
        href: "/servicos/sistemas",
        icon: "layers",
    },
    Automações: {
        label: "Automações",
        shortDescription:
            "Reduza tarefas manuais e ganhe eficiência onde mais importa.",
        href: "/servicos/automacoes",
        icon: "zap",
    },
}
