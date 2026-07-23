import type { MetadataRoute } from "next"

const BASE_URL = "https://www.wizecode.com.br"

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/contato`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/chat`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/trabalhe-conosco`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ]
}
