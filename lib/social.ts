import type { IconName } from "./icons"

/**
 * Fonte única dos dados de contato/redes da WizeCode.
 *
 * Antes, essas informações estavam duplicadas na home, na página de contato e
 * no rodapé — e já divergiam entre si (ex: URL do Instagram). Aqui elas moram
 * num lugar só: mudou o número/rede, muda em um ponto.
 *
 * `channels` é consumido por quem renderiza a lista de canais (a seção Contato
 * da home e a página de contato). Os ícones são referenciados por string
 * (`IconName`), traduzidos pelo registro central em `lib/icons.ts`.
 */

interface ContactChannel {
    id: string
    icon: IconName
    label: string
    value: string
    href: string
}

const whatsappMessage = "Olá! Gostaria de saber mais sobre os serviços da WizeCode."

const siteContact = {
    whatsapp: {
        display: "+55 (34) 98439-2633",
        href: `https://wa.me/5534984392633?text=${whatsappMessage}`,
    },
    email: "contato@wizecode.com.br",
    channels: [
        {
            id: "whatsapp",
            icon: "whatsapp",
            label: "WhatsApp",
            value: "+55 (34) 98439-2633",
            href: `https://wa.me/5534984392633?text=${whatsappMessage}`,
        },
        {
            id: "email",
            icon: "mail",
            label: "E-mail",
            value: "contato@wizecode.com.br",
            href: "mailto:contato@wizecode.com.br",
        },
        {
            id: "instagram",
            icon: "instagram",
            label: "Instagram",
            value: "@wizecode",
            href: "https://www.instagram.com/wize.code/",
        },
        {
            id: "linkedin",
            icon: "linkedin",
            label: "LinkedIn",
            value: "WizeCode",
            href: "https://www.linkedin.com/company/wizecode-tech",
        },
    ] satisfies ContactChannel[],
}

export { siteContact }
export type { ContactChannel }
