"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Turnstile } from "@marsidev/react-turnstile"
import { track } from "@/lib/analytics"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Chave de teste da Cloudflare, usada só em desenvolvimento. Troque para
 * simular cada cenário:
 *   1x00000000000000000000AA  sempre passa (padrão)
 *   3x00000000000000000000FF  força o challenge interativo (checkbox)
 *   2x00000000000000000000AB  sempre falha
 */
const SITEKEY_DEV = "1x00000000000000000000AA"

/** Um bloqueador pode impedir o script de carregar, e aí nenhum callback dispara. */
const TIMEOUT_MS = 15_000

/** Só avisa que está verificando se demorar — numa rede boa, ninguém vê. */
const DELAY_INDICADOR_MS = 2_500

const DOMINIO = "challenges.cloudflare.com"

type Causa = "bloqueado" | "navegador" | "erro"

type Status =
    | { tipo: "verificando" }
    | { tipo: "ok" }
    | { tipo: "falhou"; causa: Causa; code?: string }

const MENSAGENS: Record<Causa, { titulo: string; comoResolver: string }> = {
    bloqueado: {
        titulo: "A verificação de segurança foi bloqueada.",
        comoResolver: `Isso costuma ser causado por uma extensão de bloqueio de anúncios, uma VPN ou um firewall. Libere o domínio ${DOMINIO} e recarregue a página, ou tente por uma janela anônima.`,
    },
    navegador: {
        titulo: "Seu navegador não é compatível com a verificação de segurança.",
        comoResolver:
            "Atualize o navegador para a versão mais recente, ou abra esta página no Chrome, Firefox ou Edge.",
    },
    erro: {
        titulo: "Não conseguimos concluir a verificação de segurança.",
        comoResolver: `Recarregue a página e tente novamente. Se o erro continuar, libere o domínio ${DOMINIO} nas suas extensões de bloqueio ou use outro navegador.`,
    },
}

/**
 * O widget é **Managed** no dashboard da Cloudflare: visitantes de alto risco
 * recebem um challenge interativo e precisam enxergar o checkbox para resolvê-lo.
 * Com `appearance: "interaction-only"` o widget fica oculto para a maioria e
 * aparece só para quem precisa clicar — ao contrário de `size: "invisible"`,
 * que o escondia inclusive nesse caso e travava esses visitantes.
 *
 * Chama `onToken` com o token quando o challenge é resolvido, e com `null`
 * quando ele expira (300s) ou falha — então o formulário desabilita o envio.
 */
export function TurnstileBox({
    onToken,
}: {
    onToken: (token: string | null) => void
}) {
    const [status, setStatus] = useState<Status>({ tipo: "verificando" })
    const [demorando, setDemorando] = useState(false)
    const [interativo, setInterativo] = useState(false)

    const precisouInteragir = useRef(false)
    // Um evento por montagem: expirar e renovar não deve contar como nova tentativa.
    const jaReportou = useRef(false)

    const reportar = useCallback((resultado: "ok" | Causa, code?: string) => {
        if (jaReportou.current) return
        jaReportou.current = true
        track("turnstile_resultado", {
            resultado,
            interativo: precisouInteragir.current,
            ...(code ? { code } : {}),
        })
    }, [])

    useEffect(() => {
        if (status.tipo !== "verificando") return
        const indicador = setTimeout(
            () => setDemorando(true),
            DELAY_INDICADOR_MS
        )
        const limite = setTimeout(() => {
            // Nenhum callback disparou: o script nunca chegou a executar.
            setStatus({ tipo: "falhou", causa: "bloqueado" })
            reportar("bloqueado", "nao-carregou")
        }, TIMEOUT_MS)
        return () => {
            clearTimeout(indicador)
            clearTimeout(limite)
        }
    }, [status.tipo, reportar])

    function falhar(causa: Causa, code?: string) {
        setStatus({ tipo: "falhou", causa, code })
        onToken(null)
        reportar(causa, code)
    }

    // `onBeforeInteractive` dispara antes de a Cloudflare desenhar o checkbox,
    // então o container já expandiu quando o challenge aparece.
    const visivel =
        interativo ||
        status.tipo === "falhou" ||
        (status.tipo === "verificando" && demorando)

    return (
        <div
            className={cn(
                "space-y-1.5",
                visivel ? "mb-6" : "h-0 overflow-hidden"
            )}
        >
            {status.tipo === "verificando" && demorando && (
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="size-3.5 animate-spin" />
                    Verificando segurança...
                </p>
            )}
            {status.tipo === "falhou" && (
                <div
                    role="alert"
                    className="space-y-1 rounded-md border border-destructive/50 bg-destructive/5 p-3 text-sm text-destructive"
                >
                    <p className="font-medium">
                        {MENSAGENS[status.causa].titulo}
                    </p>
                    <p>{MENSAGENS[status.causa].comoResolver}</p>
                    {status.code && (
                        <p className="text-xs opacity-80">
                            Código do erro: {status.code}
                        </p>
                    )}
                </div>
            )}
            <Turnstile
                siteKey={
                    process.env.NODE_ENV === "development"
                        ? SITEKEY_DEV
                        : process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!
                }
                options={{ appearance: "interaction-only", size: "flexible" }}
                onBeforeInteractive={() => {
                    precisouInteragir.current = true
                    setInterativo(true)
                }}
                onSuccess={(token) => {
                    setStatus({ tipo: "ok" })
                    onToken(token)
                    reportar("ok")
                }}
                onExpire={() => {
                    setStatus({ tipo: "verificando" })
                    setDemorando(false)
                    onToken(null)
                }}
                onError={(code) => falhar("erro", code)}
                onUnsupported={() => falhar("navegador")}
            />
        </div>
    )
}
