"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Turnstile } from "@marsidev/react-turnstile"
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

export function ContatoForm() {
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

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
            descricao: "",
        },
    })

    async function onSubmit(data: ContatoFormData) {
        if (process.env.NODE_ENV !== "development" && !turnstileToken) {
            setError("root", {
                message: "Aguarde a verificação de segurança e tente novamente.",
            })
            return
        }

        const result = await enviarContato(data, turnstileToken ?? "")
        if (!result.success) {
            setError("root", { message: result.error })
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col justify-between gap-4 px-6 py-10"
        >
            <div className="flex flex-col gap-4 xl:flex-row">
                <div className="flex-1 space-y-1.5">
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

                <div className="flex-1 space-y-1.5">
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

            <div className="flex flex-col gap-4 xl:flex-row">
                <div className="flex-1 space-y-1.5">
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

                <div className="flex-1 space-y-1.5">
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

            <div className="space-y-1.5">
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

            <div className="space-y-1.5">
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

            <Button
                type="submit"
                disabled={isSubmitting}
                className="mx-auto w-full sm:self-end"
            >
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
            </Button>

            <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                options={{ size: "invisible" }}
                onSuccess={setTurnstileToken}
            />
        </form>
    )
}
