import React from "react"

/**
 * Converte marcadores `*destaque*` de uma string em
 * `<span className="text-accent">`.
 *
 * Serve para manter os títulos como **texto puro** nos arquivos `.data.ts`
 * (sem JSX, prontos para um futuro CMS) e deixar o realce como decisão da
 * camada de apresentação. O trecho entre asteriscos vira o span colorido.
 *
 * @example
 * accent("A *vitrine* da sua empresa")
 * // → A <span className="text-accent">vitrine</span> da sua empresa
 */
export function accent(text: string): React.ReactNode {
    return text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
            <span key={i} className="text-accent">
                {part.slice(1, -1)}
            </span>
        ) : (
            part
        )
    )
}
