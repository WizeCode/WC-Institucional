"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { TurnstileBox } from "@/components/providers/turnstile-box"
import { sendBriefing } from "@/lib/chat/actions"

export interface BriefingData {
    empresa: string
    segmento: string
    projeto_descricao: string
    funcionalidades_essenciais: string[]
    problema_principal: string
    prazo: string
    orcamento: string
    classificacao_servico: string
    [key: string]: unknown
}

interface BriefingDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    briefing: BriefingData
    briefingRaw: string
    conversation: { role: string; content: string }[]
}

export function BriefingDialog({
    open,
    onOpenChange,
    briefing,
    briefingRaw,
    conversation,
}: BriefingDialogProps) {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState(false)
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
    // Tokens são de uso único: remonta o widget para obter um novo a cada envio.
    const [turnstileKey, setTurnstileKey] = useState(0)

    async function handleSubmit() {
        if (!nome.trim() || !email.trim() || !whatsapp.trim()) return
        setLoading(true)
        setError(false)

        const result = await sendBriefing(
            briefingRaw,
            turnstileToken ?? "",
            conversation,
            {
                nome,
                email,
                whatsapp,
            }
        )

        // O token foi consumido pelo servidor, valendo ou não.
        setTurnstileToken(null)
        setTurnstileKey((k) => k + 1)

        setLoading(false)
        if (result?.success) {
            setSent(true)
        } else {
            setError(true)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Projeto registrado!
                    </DialogTitle>
                    <DialogDescription>
                        Confira o resumo abaixo e preencha seus dados para
                        receber a proposta.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 rounded-lg bg-muted/50 p-4 text-sm">
                    <div className="flex gap-2">
                        <span className="w-20 shrink-0 text-muted-foreground">
                            Empresa
                        </span>
                        <span className="font-medium">
                            {briefing.empresa || "—"}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <span className="w-20 shrink-0 text-muted-foreground">
                            Segmento
                        </span>
                        <span>{briefing.segmento || "—"}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="w-20 shrink-0 text-muted-foreground">
                            Projeto
                        </span>
                        <span className="line-clamp-2">
                            {briefing.projeto_descricao || "—"}
                        </span>
                    </div>

                    {briefing.funcionalidades_essenciais?.length > 0 && (
                        <div className="flex gap-2">
                            <span className="w-20 shrink-0 pt-0.5 text-muted-foreground">
                                Essencial
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {briefing.funcionalidades_essenciais.map(
                                    (f, i) => (
                                        <span
                                            key={i}
                                            className="rounded-md border bg-background px-2 py-0.5 text-xs font-medium"
                                        >
                                            {f}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>
                    )}

                    {briefing.prazo && (
                        <div className="flex gap-2">
                            <span className="w-20 shrink-0 text-muted-foreground">
                                Prazo
                            </span>
                            <span>{briefing.prazo}</span>
                        </div>
                    )}
                </div>

                <Separator />

                {sent ? (
                    <p className="py-2 text-center text-sm text-muted-foreground">
                        Proposta enviada! Nossa equipe entrará em contato em
                        breve.
                    </p>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm font-medium">
                            Seus dados de contato
                        </p>

                        <div className="space-y-1.5">
                            <Label htmlFor="nome">Nome completo</Label>
                            <Input
                                id="nome"
                                placeholder="João da Silva"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="joao@empresa.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="whatsapp">WhatsApp</Label>
                            <Input
                                id="whatsapp"
                                type="tel"
                                placeholder="(11) 99999-9999"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-destructive">
                                Erro ao enviar. Tente novamente.
                            </p>
                        )}

                        <TurnstileBox
                            key={turnstileKey}
                            onToken={setTurnstileToken}
                        />
                    </div>
                )}

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Fechar
                    </Button>
                    {!sent && (
                        <Button
                            onClick={handleSubmit}
                            disabled={
                                loading ||
                                !turnstileToken ||
                                !nome.trim() ||
                                !email.trim() ||
                                !whatsapp.trim()
                            }
                        >
                            {loading ? "Enviando..." : "Enviar proposta"}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
