import { Globe, LayoutDashboard, LucideIcon, Smartphone, Zap } from "lucide-react"

export type ServiceCategory = "Websites" | "Aplicativos" | "Automações" | "SaaS"

export const ServiceIcons: Record<ServiceCategory, LucideIcon> = {
    "Websites": Globe,
    "Aplicativos": Smartphone,
    "Automações": Zap,
    "SaaS": LayoutDashboard,
}