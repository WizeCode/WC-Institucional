import {
    Bot,
    Brain,
    CalendarClock,
    Gauge,
    GraduationCap,
    HeartHandshake,
    LayoutTemplate,
    Layers,
    Mail,
    MessagesSquare,
    MousePointerClick,
    Palette,
    PencilRuler,
    Search,
    ShieldCheck,
    Sparkles,
    Target,
    Telescope,
    TrendingUp,
    Users,
    Wallet,
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
    // Values (home)
    brain: Brain,
    layers: Layers,
    sparkles: Sparkles,
    empathy: HeartHandshake,
    // Contact / redes
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
    // Trabalhe conosco
    wallet: Wallet,
    shieldCheck: ShieldCheck,
    calendarClock: CalendarClock,
    graduationCap: GraduationCap,
    messagesSquare: MessagesSquare,
    bot: Bot,
    users: Users,
    // A Wize
    target: Target,
    telescope: Telescope,
} as const

export type IconName = keyof typeof icons
