"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TurnstileBox } from "@/components/providers/turnstile-box"
import {
    contatoSchema,
    servicoOptions,
    type ContatoFormData,
} from "@/lib/contato/schema"
import { enviarContato } from "@/lib/contato/actions"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ContatoFormProps {
    servicoPadrao?: ContatoFormData["servico"]
}

export function ContatoForm({ servicoPadrao }: ContatoFormProps = {}) {
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
    // Tokens são de uso único: remonta o widget para obter um novo a cada envio.
    const [turnstileKey, setTurnstileKey] = useState(0)

    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<ContatoFormData>({
        resolver: zodResolver(contatoSchema),
        defaultValues: {
            nome: "",
            empresa: "",
            email: "",
            telefone: "",
            servico: servicoPadrao,
            descricao: "",
        },
    })

    async function onSubmit(data: ContatoFormData) {
        const result = await enviarContato(data, turnstileToken ?? "")

        // O token foi consumido pelo servidor, valendo ou não.
        setTurnstileToken(null)
        setTurnstileKey((k) => k + 1)

        if (!result.success) {
            setError("root", { message: result.error })
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col justify-between gap-6 px-6 py-10"
        >
            <div className="flex flex-col gap-6 xl:flex-row">
                <div className="flex-1 space-y-2.5">
                    <Label htmlFor="nome">Nome completo</Label>
                    <Input
                        id="nome"
                        placeholder="João da Silva"
                        aria-invalid={!!errors.nome}
                        {...register("nome")}
                    />
                    {errors.nome && (
                        <p className="text-xs text-destructive">
                            {errors.nome.message}
                        </p>
                    )}
                </div>

                <div className="flex-1 space-y-2.5">
                    <Label htmlFor="empresa">
                        Empresa{" "}
                        <span className="text-muted-foreground">
                            (opcional)
                        </span>
                    </Label>
                    <Input
                        id="empresa"
                        placeholder="WizeCode"
                        aria-invalid={!!errors.empresa}
                        {...register("empresa")}
                    />
                    {errors.empresa && (
                        <p className="text-xs text-destructive">
                            {errors.empresa.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-6 xl:flex-row">
                <div className="flex-1 space-y-2.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="joao@empresa.com"
                        aria-invalid={!!errors.email}
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-xs text-destructive">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className="flex-1 space-y-2.5">
                    <Label htmlFor="telefone">Telefone / WhatsApp</Label>
                    <Input
                        id="telefone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        aria-invalid={!!errors.telefone}
                        {...register("telefone")}
                    />
                    {errors.telefone && (
                        <p className="text-xs text-destructive">
                            {errors.telefone.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-2.5">
                <Label htmlFor="servico">Tipo de serviço</Label>
                <Controller
                    name="servico"
                    control={control}
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                        >
                            <SelectTrigger
                                id="servico"
                                className="w-full"
                                aria-invalid={!!errors.servico}
                            >
                                <SelectValue placeholder="Selecione um serviço" />
                            </SelectTrigger>
                            <SelectContent>
                                {servicoOptions.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.servico && (
                    <p className="text-xs text-destructive">
                        {errors.servico.message ??
                            "Selecione um tipo de serviço"}
                    </p>
                )}
            </div>

            <div className="space-y-2.5">
                <Label htmlFor="descricao">Descrição da demanda</Label>
                <Textarea
                    id="descricao"
                    placeholder="Descreva o que você precisa, seu objetivo e qualquer detalhe relevante..."
                    aria-invalid={!!errors.descricao}
                    className="field-sizing-fixed min-h-32 resize-y"
                    {...register("descricao")}
                />
                {errors.descricao && (
                    <p className="text-xs text-destructive">
                        {errors.descricao.message}
                    </p>
                )}
            </div>

            {errors.root && (
                <p className="text-sm text-destructive">
                    {errors.root.message}
                </p>
            )}

            {isSubmitSuccessful && (
                <p className="text-sm text-green-600">
                    Mensagem enviada com sucesso!
                </p>
            )}

            {/* Agrupados: como filho direto do form, o Turnstile colapsado ainda
                somaria um gap-6 de cada lado. */}
            <div className="flex flex-col">
                <TurnstileBox key={turnstileKey} onToken={setTurnstileToken} />

                <Button
                    type="submit"
                    disabled={isSubmitting || !turnstileToken}
                    className="mx-auto w-full sm:self-end"
                >
                    {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                </Button>
            </div>
        </form>
    )
}
