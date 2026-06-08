import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "WizeCode — Tecnologia inteligente",
        short_name: "WizeCode",
        description:
            "Transformamos objetivos de negócio em soluções digitais inteligentes: websites, e-commerce, apps mobile e automação.",
        start_url: "/",
        display: "standalone",
        theme_color: "#7849cb",
        background_color: "#0f101f",
        icons: [
            {
                src: "/ico/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/ico/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
