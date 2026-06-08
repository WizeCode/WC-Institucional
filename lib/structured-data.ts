const BASE_URL = "https://www.wizecode.com.br";

export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WizeCode",
    legalName: "Wize Inovações e Tecnologia",
    url: BASE_URL,
    logo: `${BASE_URL}/ico/android-chrome-512x512.png`,
    email: "contato@wizecode.com.br",
    telephone: "+55-34-98439-2633",
    contactPoint: {
        "@type": "ContactPoint",
        telephone: "+55-34-98439-2633",
        contactType: "customer service",
        availableLanguage: "Portuguese",
    },
    sameAs: [
        "https://www.instagram.com/wize.code/",
        "https://www.facebook.com/wizecodebr",
        "https://www.linkedin.com/company/wizecode-tech",
        "https://github.com/WizeCode/",
    ],
};

export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WizeCode",
    url: BASE_URL,
};
