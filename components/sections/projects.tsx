import React from "react"
import { Badge, type BadgeVariant } from "@/components/ui/badge"

/**
 * Prova social para páginas de serviço que ainda não têm case lançado. Mostra
 * projetos reais ou em andamento em cards enxutos (título + segmento + uma
 * linha), sem depender de imagem nem de link ao vivo — é o que a diferencia do
 * `Portfolio`, que exige um case publicado. Opcional no `ServicoPage`: quando o
 * `data.projetos` é omitido, a seção não renderiza.
 */

interface ProjectItem {
    title: string
    segment: string
    description: string
}

interface ProjectsProps {
    badge?: string
    badgeVariant?: BadgeVariant
    title: React.ReactNode
    description: React.ReactNode
    items: ProjectItem[]
}

const Projects = ({
    badge,
    badgeVariant = "outline",
    title,
    description,
    items,
}: ProjectsProps) => {
    return (
        <div className="flex flex-col">
            <div className="mx-auto flex max-w-xl flex-col justify-center gap-4 text-center">
                {badge && (
                    <Badge className="mx-auto" variant={badgeVariant}>
                        {badge}
                    </Badge>
                )}
                <h2 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                    {title}
                </h2>
                <p className="mb-4 max-w-xl text-muted-foreground lg:text-xl">
                    {description}
                </p>
            </div>
            <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
                {items.map((item) => (
                    <div
                        key={item.title}
                        className="flex flex-col gap-3 rounded-lg bg-muted/70 p-8 transition-transform duration-300 hover:-translate-y-3"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <h3 className="text-2xl font-medium">
                                {item.title}
                            </h3>
                            <Badge variant="outline" className="shrink-0">
                                {item.segment}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export { Projects }
export type { ProjectItem, ProjectsProps }
