import {
    Brain,
    Gauge,
    HeartHandshake,
    LayoutTemplate,
    Layers,
    Mail,
    MousePointerClick,
    Palette,
    PencilRuler,
    Search,
    Sparkles,
    TrendingUp,
    Zap,
} from "lucide-react"
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa"

/**
 * Registro central de ícones. O conteúdo (data/catálogos, e futuramente um CMS)
 * referencia ícones por string — ex.: `icon: "brain"` — e componentes traduzem
 * via `icons[nome]`. Funções não cruzam a fronteira Server → Client Component;
 * strings sim, e é o único formato que um CMS armazenaria.
 *
 * Para disponibilizar um ícone novo, adicione uma linha aqui.
 */
export const icons = {
    // Diferenciais (home)
    brain: Brain,
    layers: Layers,
    sparkles: Sparkles,
    empathy: HeartHandshake,
    // Contato / redes
    mail: Mail,
    whatsapp: FaWhatsapp,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    // Serviços
    layoutTemplate: LayoutTemplate,
    mousePointerClick: MousePointerClick,
    zap: Zap,
    // Capacidades / features
    palette: Palette,
    search: Search,
    gauge: Gauge,
    pencilRuler: PencilRuler,
    trendingUp: TrendingUp,
} as const

export type IconName = keyof typeof icons
