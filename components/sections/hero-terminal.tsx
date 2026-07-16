import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
} from "@/components/ui/terminal"
import { cn } from "@/lib/utils"

/** Tipo da linha: define símbolo, recuo e cor. */
type TerminalLineKind = "error" | "step" | "detail"

interface TerminalLine {
    kind: TerminalLineKind
    text: string
}

/** Um comando e a saída que ele produz. */
interface TerminalBlock {
    command: string
    lines: TerminalLine[]
}

interface HeroTerminalProps {
    blocks: TerminalBlock[]
    /** Linha final de sucesso, destacada. */
    result: string
    className?: string
}

const lineStyles: Record<TerminalLineKind, { prefix: string; class: string }> =
    {
        error: { prefix: "⚠︎ ", class: "pl-4 text-red-500" },
        step: { prefix: "> ", class: "pl-4 text-foreground" },
        detail: { prefix: "", class: "pl-12 text-muted-foreground" },
    }

/**
 * Terminal animado do hero, montado a partir de dados serializáveis.
 *
 * Símbolos (`$`, `⚠︎`, `>`, `✓`), cores e o espaçamento entre blocos são
 * decisão daqui — o `.data.ts` só descreve comandos e texto.
 *
 * ```tsx
 * <Hero …>
 *     <HeroTerminal {...home.hero.terminal} />
 * </Hero>
 * ```
 */
const HeroTerminal = ({ blocks, result, className }: HeroTerminalProps) => (
    // Lista plana: o Terminal sequencia via `Children.toArray`, que achata
    // arrays mas não Fragments.
    <Terminal
        className={cn("max-h-136 max-w-xl", className)}
        startOnView={false}
    >
        {[
            ...blocks.flatMap((block, blockIndex) => [
                <TypingAnimation
                    key={`command-${blockIndex}`}
                    className={cn("font-bold", blockIndex > 0 && "mt-4")}
                    prefix={<span className="text-accent">$ </span>}
                >
                    {block.command}
                </TypingAnimation>,
                ...block.lines.map((line, lineIndex) => (
                    <AnimatedSpan
                        key={`line-${blockIndex}-${lineIndex}`}
                        className={lineStyles[line.kind].class}
                    >
                        {`${lineStyles[line.kind].prefix}${line.text}`}
                    </AnimatedSpan>
                )),
            ]),
            <AnimatedSpan
                key="result"
                className="mt-4 pl-4 font-bold text-emerald-500"
            >
                {`✓ ${result}`}
            </AnimatedSpan>,
        ]}
    </Terminal>
)

export { HeroTerminal }
export type { TerminalBlock, TerminalLine, TerminalLineKind }
