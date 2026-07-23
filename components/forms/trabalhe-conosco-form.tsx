"use client"

import { useState } from "react"
import { useForm, Controller, type FieldErrors } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { track } from "@/lib/analytics"
import Link from "next/link"
import { TurnstileBox } from "@/components/providers/turnstile-box"
import {
    talentoSchema,
    validarCurriculo,
    areaOptions,
    modalidadeOptions,
    disponibilidadeOptions,
    CURRICULO_ACCEPT,
    type TalentoFormData,
} from "@/lib/talentos/schema"
import { enviarCandidatura } from "@/lib/talentos/actions"
import { getStoredUtm } from "@/lib/attribution/utm"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function maskWhatsapp(value: string): string {
    const d = value.replace(/\D/g, "").slice(0, 11)
    if (d.length === 0) return ""
    if (d.length <= 2) return `(${d}`
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
    if (d.length <= 10)
        return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function utmEventProps() {
    const utm = getStoredUtm()
    return {
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
    }
}

export function TrabalheConoscoForm() {
    const {
        register,
        handleSubmit,
        control,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TalentoFormData>({
        resolver: zodResolver(talentoSchema),
        defaultValues: {
            nome: "",
            email: "",
            whatsapp: "",
            apresentacao: "",
            github: "",
            linkedin: "",
            consentimento: false,
        },
    })

    const [curriculo, setCurriculo] = useState<File | null>(null)
    const [curriculoError, setCurriculoError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [curriculoKey, setCurriculoKey] = useState(0)
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
    const [turnstileKey, setTurnstileKey] = useState(0)

    async function onSubmit(data: TalentoFormData) {
        const utm = getStoredUtm()
        const eventProps = {
            area: data.area,
            modalidade: data.modalidade,
            disponibilidade: data.disponibilidade,
            utm_source: utm.utm_source,
            utm_medium: utm.utm_medium,
            utm_campaign: utm.utm_campaign,
        }

        const fileError = validarCurriculo(curriculo)
        if (fileError) {
            setCurriculoError(fileError)
            track("talent_pool_form_validation_failed", {
                ...eventProps,
                fields: "curriculo",
            })
            return
        }
        setCurriculoError(null)

        track("talent_pool_form_submit_attempted", eventProps)

        const fd = new FormData()
        Object.entries(data).forEach(([key, value]) =>
            fd.append(key, String(value))
        )
        fd.append("curriculo", curriculo as File)
        fd.append("utm_source", utm.utm_source)
        fd.append("utm_medium", utm.utm_medium)
        fd.append("utm_campaign", utm.utm_campaign)
        fd.append("turnstileToken", turnstileToken ?? "")

        const result = await enviarCandidatura(fd)

        setTurnstileToken(null)
        setTurnstileKey((k) => k + 1)

        if (!result.success) {
            track("talent_pool_form_submit_failed", {
                ...eventProps,
                reason: result.error,
            })
            setError("root", { message: result.error })
            return
        }

        track("talent_pool_form_submitted", eventProps)

        setSuccess(true)
        reset()
        setCurriculo(null)
        setCurriculoKey((k) => k + 1)
    }

    function onInvalid(formErrors: FieldErrors<TalentoFormData>) {
        track("talent_pool_form_validation_failed", {
            ...utmEventProps(),
            fields: Object.keys(formErrors).join(","),
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit, onInvalid)}
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
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="joao@email.com"
                        aria-invalid={!!errors.email}
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-xs text-destructive">
                            {errors.email.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-4 xl:flex-row">
                <div className="flex-1 space-y-1.5">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Controller
                        name="whatsapp"
                        control={control}
                        render={({ field }) => (
                            <Input
                                id="whatsapp"
                                type="tel"
                                inputMode="numeric"
                                placeholder="(11) 99999-9999"
                                aria-invalid={!!errors.whatsapp}
                                value={field.value ?? ""}
                                onBlur={field.onBlur}
                                onChange={(e) =>
                                    field.onChange(maskWhatsapp(e.target.value))
                                }
                            />
                        )}
                    />
                    {errors.whatsapp && (
                        <p className="text-xs text-destructive">
                            {errors.whatsapp.message}
                        </p>
                    )}
                </div>

                <div className="flex-1 space-y-1.5">
                    <Label htmlFor="area">Área de interesse</Label>
                    <Controller
                        name="area"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger
                                    id="area"
                                    className="w-full"
                                    aria-invalid={!!errors.area}
                                >
                                    <SelectValue placeholder="Selecione uma área" />
                                </SelectTrigger>
                                <SelectContent>
                                    {areaOptions.map((option) => (
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
                    {errors.area && (
                        <p className="text-xs text-destructive">
                            {errors.area.message ?? "Selecione uma área"}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-4 xl:flex-row">
                <div className="flex-1 space-y-1.5">
                    <Label htmlFor="modalidade">Modalidade desejada</Label>
                    <Controller
                        name="modalidade"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger
                                    id="modalidade"
                                    className="w-full"
                                    aria-invalid={!!errors.modalidade}
                                >
                                    <SelectValue placeholder="Selecione a modalidade" />
                                </SelectTrigger>
                                <SelectContent>
                                    {modalidadeOptions.map((option) => (
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
                    {errors.modalidade && (
                        <p className="text-xs text-destructive">
                            {errors.modalidade.message ??
                                "Selecione a modalidade"}
                        </p>
                    )}
                </div>

                <div className="flex-1 space-y-1.5">
                    <Label htmlFor="disponibilidade">Disponibilidade</Label>
                    <Controller
                        name="disponibilidade"
                        control={control}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger
                                    id="disponibilidade"
                                    className="w-full"
                                    aria-invalid={!!errors.disponibilidade}
                                >
                                    <SelectValue placeholder="Selecione a disponibilidade" />
                                </SelectTrigger>
                                <SelectContent>
                                    {disponibilidadeOptions.map((option) => (
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
                    {errors.disponibilidade && (
                        <p className="text-xs text-destructive">
                            {errors.disponibilidade.message ??
                                "Selecione a disponibilidade"}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-4 xl:flex-row">
                <div className="flex-1 space-y-1.5">
                    <Label htmlFor="github">
                        GitHub{" "}
                        <span className="text-muted-foreground">
                            (opcional)
                        </span>
                    </Label>
                    <Input
                        id="github"
                        type="url"
                        placeholder="https://github.com/usuario"
                        aria-invalid={!!errors.github}
                        {...register("github")}
                    />
                    {errors.github && (
                        <p className="text-xs text-destructive">
                            {errors.github.message}
                        </p>
                    )}
                </div>

                <div className="flex-1 space-y-1.5">
                    <Label htmlFor="linkedin">
                        LinkedIn{" "}
                        <span className="text-muted-foreground">
                            (opcional)
                        </span>
                    </Label>
                    <Input
                        id="linkedin"
                        type="url"
                        placeholder="https://linkedin.com/in/usuario"
                        aria-invalid={!!errors.linkedin}
                        {...register("linkedin")}
                    />
                    {errors.linkedin && (
                        <p className="text-xs text-destructive">
                            {errors.linkedin.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="apresentacao">
                    Apresentação{" "}
                    <span className="text-muted-foreground">(opcional)</span>
                </Label>
                <Textarea
                    id="apresentacao"
                    placeholder="Conte um pouco sobre você, sua experiência e o que procura..."
                    aria-invalid={!!errors.apresentacao}
                    className="field-sizing-fixed min-h-32 resize-y"
                    {...register("apresentacao")}
                />
                {errors.apresentacao && (
                    <p className="text-xs text-destructive">
                        {errors.apresentacao.message}
                    </p>
                )}
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="curriculo">Currículo (PDF, até 5MB)</Label>
                <div className="flex items-center gap-3">
                    <label
                        htmlFor="curriculo"
                        className={buttonVariants({
                            variant: "outline",
                            size: "sm",
                            className: "cursor-pointer shadow-sm",
                        })}
                    >
                        <Upload />
                        {curriculo ? "Trocar arquivo" : "Selecionar PDF"}
                    </label>
                    <span
                        className={
                            curriculo
                                ? "truncate text-sm text-foreground"
                                : "truncate text-sm text-muted-foreground"
                        }
                    >
                        {curriculo
                            ? curriculo.name
                            : "Nenhum arquivo selecionado"}
                    </span>
                    <input
                        key={curriculoKey}
                        id="curriculo"
                        type="file"
                        accept={CURRICULO_ACCEPT}
                        className="sr-only"
                        onChange={(e) => {
                            setCurriculo(e.target.files?.[0] ?? null)
                            setCurriculoError(null)
                        }}
                    />
                </div>
                {curriculoError && (
                    <p className="text-xs text-destructive">{curriculoError}</p>
                )}
            </div>

            <div className="space-y-1.5">
                <div className="flex items-start gap-2">
                    <Controller
                        name="consentimento"
                        control={control}
                        render={({ field }) => (
                            <Checkbox
                                id="consentimento"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                aria-invalid={!!errors.consentimento}
                                className="mt-0.5"
                            />
                        )}
                    />
                    <Label
                        htmlFor="consentimento"
                        className="block text-sm leading-snug font-normal"
                    >
                        Li e concordo com a{" "}
                        <Link
                            href="/politica-de-privacidade"
                            target="_blank"
                            className="underline underline-offset-2"
                        >
                            política de privacidade
                        </Link>
                        .
                    </Label>
                </div>
                {errors.consentimento && (
                    <p className="text-xs text-destructive">
                        {errors.consentimento.message}
                    </p>
                )}
            </div>

            {errors.root && (
                <p className="text-sm text-destructive">
                    {errors.root.message}
                </p>
            )}

            {success && (
                <p className="text-sm text-green-600">
                    Candidatura enviada com sucesso! Entraremos em contato em
                    breve.
                </p>
            )}

            <TurnstileBox key={turnstileKey} onToken={setTurnstileToken} />

            <Button
                type="submit"
                disabled={isSubmitting || !turnstileToken}
                className="mx-auto w-full sm:self-end"
            >
                {isSubmitting ? "Enviando..." : "Enviar candidatura"}
            </Button>
        </form>
    )
}
