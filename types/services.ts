import { LayoutTemplate, MousePointerClick, Layers, Zap, LucideIcon } from "lucide-react"

export type ServiceCategory = "Institucional" | "Landing Page" | "Sistemas" | "Automações"

export interface ServiceMeta {
  label: string
  shortDescription: string
  href: string
  icon: LucideIcon
}

export const services: Record<ServiceCategory, ServiceMeta> = {
  "Institucional": {
    label: "Website Institucional",
    shortDescription: "Sua marca no digital com credibilidade e presença profissional.",
    href: "/servicos/institucional",
    icon: LayoutTemplate,
  },
  "Landing Page": {
    label: "Landing Page",
    shortDescription: "Página de alta conversão para o seu próximo lançamento ou campanha.",
    href: "/servicos/landing-page",
    icon: MousePointerClick,
  },
  "Sistemas": {
    label: "Sistemas",
    shortDescription: "Web apps, e-commerces, plataformas e aplicativos sob medida.",
    href: "/servicos/sistemas",
    icon: Layers,
  },
  "Automações": {
    label: "Automações",
    shortDescription: "Reduza tarefas manuais e ganhe eficiência onde mais importa.",
    href: "/servicos/automacoes",
    icon: Zap,
  },
}

export const ServiceIcons: Record<ServiceCategory, LucideIcon> = Object.fromEntries(
  Object.entries(services).map(([key, value]) => [key, value.icon])
) as Record<ServiceCategory, LucideIcon>