import React from "react"

interface FormLayoutProps {
    title: React.ReactNode
    description: React.ReactNode
    aside?: React.ReactNode
    children: React.ReactNode
}

/**
 * Esqueleto das páginas de formulário: texto à esquerda, formulário à direita.
 *
 * Presentacional puro — recebe todo o conteúdo por props. O `<Section>` fica por
 * fora, na página. O formulário entra por `children`; `aside` é um slot opcional
 * abaixo do texto (ex: a lista de canais de contato).
 */
const FormLayout = ({ title, description, aside, children }: FormLayoutProps) => {
    return (
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
            <div className="mb-8 flex flex-1 flex-col gap-2 text-start">
                <h1 className="text-2xl font-bold text-pretty lg:text-3xl xl:text-4xl">
                    {title}
                </h1>
                <p className="mb-4 text-lg text-muted-foreground lg:text-xl">
                    {description}
                </p>
                {aside}
            </div>
            <div className="flex-1 rounded-lg shadow-lg dark:bg-muted">
                {children}
            </div>
        </div>
    )
}

export { FormLayout }
