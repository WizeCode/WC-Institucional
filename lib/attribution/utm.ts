const STORAGE_KEY = "wc_utm_attribution"

export interface UtmAttribution {
    utm_source: string
    utm_medium: string
    utm_campaign: string
}

const EMPTY_UTM: UtmAttribution = {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
}

/**
 * Captura UTMs da URL atual e persiste em sessionStorage — modelo
 * first-touch: só grava se ainda não houver atribuição salva nesta sessão,
 * preservando a origem original mesmo que o usuário navegue depois por
 * páginas sem UTM na query string.
 */
export function captureUtm(searchParams: URLSearchParams): void {
    if (typeof window === "undefined") return

    const existing = window.sessionStorage.getItem(STORAGE_KEY)
    if (existing) return

    const utm_source = searchParams.get("utm_source")
    if (!utm_source) return // sem UTM na URL atual, nada a capturar

    const attribution: UtmAttribution = {
        utm_source,
        utm_medium: searchParams.get("utm_medium") ?? "",
        utm_campaign: searchParams.get("utm_campaign") ?? "",
    }

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
}

/** Lê a atribuição UTM persistida nesta sessão (ou vazio, se não houver). */
export function getStoredUtm(): UtmAttribution {
    if (typeof window === "undefined") return EMPTY_UTM

    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_UTM

    try {
        return JSON.parse(raw) as UtmAttribution
    } catch {
        return EMPTY_UTM
    }
}
