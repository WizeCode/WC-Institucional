import React from "react"

/** `*destaque*` → text-accent; `_ênfase_` → <em>. */
const MARKERS = /(\*[^*]+\*|_[^_]+_)/g

/**
 * Converte os marcadores de uma string em elementos:
 * `*texto*` vira `<span className="text-accent">` e `_texto_` vira `<em>`.
 *
 * Serve para manter títulos e descrições como **texto puro** nos arquivos
 * `.data.ts` (sem JSX, prontos para um futuro CMS) e deixar o realce como
 * decisão da camada de apresentação.
 *
 * Os marcadores não aninham: `*_texto_*` não vira span + em.
 *
 * @example
 * rich("A *vitrine* da sua empresa")
 * // → A <span className="text-accent">vitrine</span> da sua empresa
 *
 * @example
 * rich("Soluções escaláveis – _com a clareza de quem domina o processo._")
 * // → Soluções escaláveis – <em>com a clareza de quem domina o processo.</em>
 */
export function rich(text: string): React.ReactNode {
    return text.split(MARKERS).map((part, i) => {
        if (part.startsWith("*") && part.endsWith("*")) {
            return (
                <span key={i} className="text-accent">
                    {part.slice(1, -1)}
                </span>
            )
        }
        if (part.startsWith("_") && part.endsWith("_")) {
            return <em key={i}>{part.slice(1, -1)}</em>
        }
        return part
    })
}
