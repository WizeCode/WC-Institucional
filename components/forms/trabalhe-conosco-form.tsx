"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePostHog } from "posthog-js/react"
import { Turnstile } from "@marsidev/react-turnstile"
import Link from "next/link"
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

/** Formata progressivamente um WhatsApp brasileiro: (11) 99999-9999. */
function maskWhatsapp(value: string): string {
    const d = value.replace(/\D/g, "").slice(0, 11)
    if (d.length === 0) return ""
    if (d.length <= 2) return `(${d}`
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
    if (d.length <= 10)
        return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function TrabalheConoscoForm() {
    const posthog = usePostHog()

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
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    // Muda a key para remontar (limpar) o input de arquivo após o envio.
    const [curriculoKey, setCurriculoKey] = useState(0)

    // UTMs lidas da URL uma única vez (inicializador lazy, sem hydration
    // mismatch pois os valores só entram no payload, nunca são renderizados).
    const [utm] = useState(() => {
        if (typeof window === "undefined") {
            return { utm_source: "", utm_medium: "", utm_campaign: "" }
        }
        const params = new URLSearchParams(window.location.search)
        return {
            utm_source: params.get("utm_source") ?? "",
            utm_medium: params.get("utm_medium") ?? "",
            utm_campaign: params.get("utm_campaign") ?? "",
        }
    })

    async function onSubmit(data: TalentoFormData) {
        const fileError = validarCurriculo(curriculo)
        if (fileError) {
            setCurriculoError(fileError)
            return
        }
        setCurriculoError(null)

        if (process.env.NODE_ENV !== "development" && !turnstileToken) {
            setError("root", {
                message: "Aguarde a verificação de segurança e tente novamente.",
            })
            return
        }

        const fd = new FormData()
        Object.entries(data).forEach(([key, value]) =>
            fd.append(key, String(value))
        )
        fd.append("curriculo", curriculo as File)
        fd.append("utm_source", utm.utm_source)
        fd.append("utm_medium", utm.utm_medium)
        fd.append("utm_campaign", utm.utm_campaign)
        if (turnstileToken) fd.append("turnstileToken", turnstileToken)

        const result = await enviarCandidatura(fd)
        if (!result.success) {
            setError("root", { message: result.error })
            return
        }

        posthog?.capture("talent_pool_form_submitted", {
            area: data.area,
            modalidade: data.modalidade,
            disponibilidade: data.disponibilidade,
        })

        setSuccess(true)
        reset()
        setCurriculo(null)
        setCurriculoKey((k) => k + 1)
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
                            {errors.modalidade.message ?? "Selecione a modalidade"}
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
                        <span className="text-muted-foreground">(opcional)</span>
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
                        <span className="text-muted-foreground">(opcional)</span>
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
                            className: "cursor-pointer",
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
                        {curriculo ? curriculo.name : "Nenhum arquivo selecionado"}
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
                        className="text-sm font-normal leading-snug"
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
                <p className="text-sm text-destructive">{errors.root.message}</p>
            )}

            {success && (
                <p className="text-sm text-green-600">
                    Candidatura enviada com sucesso! Entraremos em contato em breve.
                </p>
            )}

            <Button
                type="submit"
                disabled={isSubmitting}
                className="mx-auto w-full sm:self-end"
            >
                {isSubmitting ? "Enviando..." : "Enviar candidatura"}
            </Button>

            <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                options={{ size: "invisible" }}
                onSuccess={setTurnstileToken}
            />
        </form>
    )
}
