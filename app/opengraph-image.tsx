import { ImageResponse } from "next/og"

export const alt =
    "WizeCode — Tecnologia inteligente, do planejamento à performance"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

async function loadGeomFont(weight: 400 | 700): Promise<ArrayBuffer | null> {
    try {
        const css = await fetch(
            `https://fonts.googleapis.com/css2?family=Geom:wght@${weight}&display=swap`
        ).then((r) => r.text())

        const url = css.match(/src: url\(([^)]+)\)/)?.[1]
        if (!url) return null

        return fetch(url).then((r) => r.arrayBuffer())
    } catch {
        return null
    }
}

export default async function Image() {
    const [fontRegular, fontBold] = await Promise.all([
        loadGeomFont(400),
        loadGeomFont(700),
    ])

    const fonts = []
    if (fontRegular)
        fonts.push({
            name: "Geom",
            data: fontRegular,
            style: "normal" as const,
            weight: 400 as const,
        })
    if (fontBold)
        fonts.push({
            name: "Geom",
            data: fontBold,
            style: "normal" as const,
            weight: 700 as const,
        })

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "80px",
                background: "linear-gradient(135deg, #0f101f 0%, #1a0a2e 100%)",
                fontFamily: fonts.length ? "Geom, sans-serif" : "sans-serif",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Glow decorativo superior direito */}
            <div
                style={{
                    position: "absolute",
                    top: -120,
                    right: -120,
                    width: 480,
                    height: 480,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(120,73,203,0.35) 0%, transparent 70%)",
                    display: "flex",
                }}
            />
            {/* Glow decorativo inferior */}
            <div
                style={{
                    position: "absolute",
                    bottom: -80,
                    left: 200,
                    width: 320,
                    height: 320,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(120,73,203,0.18) 0%, transparent 70%)",
                    display: "flex",
                }}
            />

            {/* Wordmark */}
            <div
                style={{
                    display: "flex",
                    alignItems: "baseline",
                    marginBottom: "28px",
                }}
            >
                <span
                    style={{
                        fontSize: 72,
                        fontWeight: 700,
                        color: "#ffffff",
                        letterSpacing: "-3px",
                    }}
                >
                    Wize
                </span>
                <span
                    style={{
                        fontSize: 72,
                        fontWeight: 700,
                        color: "#7849cb",
                        letterSpacing: "-3px",
                    }}
                >
                    Code
                </span>
            </div>

            {/* Tagline */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: 36,
                    fontWeight: 400,
                    color: "#e2e2e2",
                    maxWidth: 820,
                    lineHeight: 1.35,
                }}
            >
                Tecnologia inteligente,{" "}
                <span style={{ color: "#a78bfa" }}>
                    do planejamento à performance.
                </span>
            </div>

            {/* Rodapé com domínio */}
            <div
                style={{
                    position: "absolute",
                    bottom: 72,
                    left: 80,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                }}
            >
                <div
                    style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#7849cb",
                        display: "flex",
                    }}
                />
                <span
                    style={{
                        fontSize: 22,
                        color: "rgba(255,255,255,0.45)",
                        fontWeight: 400,
                        letterSpacing: "0.5px",
                    }}
                >
                    wizecode.com.br
                </span>
            </div>
        </div>,
        {
            ...size,
            fonts,
        }
    )
}
