import { Mail } from "lucide-react";
import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaWhatsapp,
} from "react-icons/fa";
import { cn } from "@/lib/utils"

import Link from "next/link";
import Image from "next/image";

interface FooterLink {
    name: string;
    href: string;
};

interface FooterSection {
    title: string;
    links: FooterLink[];
};

interface FooterLogo {
    url: string;
    srcLight: string;
    srcDark: string;
    alt: string;
    title: string | React.ReactNode;
};

interface FooterSocial {
    icon: React.ReactNode;
    href: string;
    label: string;
};

interface FooterProps {
    logo?: FooterLogo;
    email?: string;
    whatsapp?: string;
    socials?: FooterSocial[];
    sections?: FooterSection[];
    copyright?: string;
    legalLinks?: FooterLink[];
    className?: string;
};

const defaultProps: FooterProps = {
    logo: {
        url: "/",
        srcLight: "/logos/logo_dark.svg",
        srcDark: "/logos/logo_light.svg",
        alt: "Logo WizeCode",
        title: (
            <>Wize<span className="text-brand">Code</span></>
        ),
    },
    email: "contato@wizecode.com.br",
    whatsapp: "+55 (34) 98439-2633",
    socials: [
        { icon: <FaInstagram size={16} />, href: "https://www.instagram.com/wize.code/", label: "Instagram" },
        { icon: <FaFacebook size={16} />, href: "https://www.facebook.com/wizecodebr", label: "Facebook" },
        { icon: <FaLinkedin size={16} />, href: "https://www.linkedin.com/company/wizecode-tech", label: "LinkedIn" },
        { icon: <FaGithub size={16} />, href: "https://github.com/WizeCode/", label: "GitHub" },
    ],
    sections: [
        {
            title: "Serviços",
            links: [
                { name: "Website Institucional", href: "/servicos/web/institucional" },
                { name: "Landing Page", href: "/servicos/web/landing-page" },
                { name: "Plataforma", href: "/servicos/web/plataforma" },
                { name: "E-commerce", href: "/servicos/web/e-commerce" },
                { name: "Web App", href: "/servicos/web/web-app" },
                { name: "Mobile", href: "/servicos/mobile" },
                { name: "Automação", href: "/servicos/automacao" },
            ],
        },
        {
            title: "Empresa",
            links: [
                { name: "A Wize", href: "/sobre" },
                { name: "Cases", href: "/cases" },
                { name: "Trabalhe Conosco", href: "/trabalhe-conosco" },
            ],
        },
    ],
    copyright: `© ${new Date().getFullYear()} WizeCode. Todos os direitos reservados.`,
    legalLinks: [
        { name: "Termos de Uso", href: "/termos-de-uso" },
        { name: "Política de Privacidade", href: "/politica-de-privacidade" },
    ],
};

const Footer = (props: FooterProps) => {
    const {
        logo,
        email,
        whatsapp,
        socials,
        sections,
        copyright,
        legalLinks,
        className,
    } = {
        ...defaultProps,
        ...props,
    };

    return (
        <footer className={cn("bg-muted flex px-6 py-8 m-4 rounded-md", className)}>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
                    <div className="col-span-1 flex flex-col justify-between gap-6 mb-4 lg:col-span-3 lg:mb-0">
                        {logo && (
                            <Link href={logo.url} className="flex justify-center items-center gap-2 lg:justify-start">
                                <Image className="block dark:hidden"
                                    src={logo.srcLight}
                                    alt={logo.alt}
                                    width={48}
                                    height={48}
                                />
                                <Image className="hidden dark:block"
                                    src={logo.srcDark}
                                    alt={logo.alt}
                                    width={48}
                                    height={48}
                                />

                                <h1 className="hidden text-[18px] font-semibold tracking-tighter lg:inline">
                                    {logo.title}
                                </h1>
                            </Link>
                        )}

                        <div className="flex flex-col items-center gap-2 text-muted-foreground text-[14px] lg:items-start">
                            {email && (
                                <Link className="flex items-center gap-2 transition-colors hover:text-foreground"
                                    href={`mailto:${email}`}
                                >
                                    <Mail size={16} className="shrink-0" />
                                    {email}
                                </Link>
                            )}

                            {whatsapp && (
                                <Link className="flex items-center gap-2 transition-colors hover:text-foreground"
                                    href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre os serviços da WizeCode.")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaWhatsapp size={16} className="shrink-0" />
                                    {whatsapp}
                                </Link>
                            )}

                            {socials && socials.length > 0 && (
                                <div className="mt-4 flex gap-4 text-muted-foreground">
                                    {socials.map((social) => (
                                        <Link className="transition-colors hover:text-foreground"
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                        >
                                            {social.icon}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-span-1 flex flex-col justify-center items-center gap-6 md:col-span-2 md:flex-row md:items-start lg:col-span-2">
                        {sections?.map((section, sectionIdx) => (
                            <div key={sectionIdx} className="w-full max-w-2xs md:max-w-55 lg:max-w-none">
                                <p className="mb-4 text-[14px] font-semibold tracking-tight">
                                    {section.title}
                                </p>

                                <ul className="text-muted-foreground text-[14px] space-y-2">
                                    {section.links.map((link, linkIdx) => (
                                        <li className="hover:text-primary w-fit"
                                            key={linkIdx}
                                        >
                                            <Link href={link.href}>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex flex-col justify-between items-center gap-2 text-muted-foreground text-[12px] pt-8 border-border border-t md:flex-row">
                    <p>{copyright}</p>
                    
                    <ul className="flex gap-4">
                        {legalLinks?.map((link, linkIdx) => (
                            <li key={linkIdx} className="underline underline-offset-2 hover:text-primary">
                                <Link href={link.href}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export { Footer };
