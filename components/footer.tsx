import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa"
import { Mail } from "lucide-react"
import { Logo, LogoImage, LogoTextDesktop } from "@/components/logo"

import { cn } from "@/lib/utils"

interface FooterLink {
  name: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface FooterLogo {
  url: string
  src: string
  alt: string
  title: string | React.ReactNode
}

interface FooterSocial {
  icon: React.ReactNode
  href: string
  label: string
}

interface FooterProps {
  logo?: FooterLogo
  email?: string
  whatsapp?: string
  socials?: FooterSocial[]
  sections?: FooterSection[]
  copyright?: string
  legalLinks?: FooterLink[]
  className?: string
}

const defaultProps: FooterProps = {
  logo: {
    url: "/",
    src: "/assets/logo_colored.svg",
    alt: "logo",
    title: (
      <>
        Wize<span className="text-brand">Code</span>
      </>
    ),
  },
  email: "contato@wizecode.com.br",
  whatsapp: "+55 (34) 98439-2633",
  socials: [
    { icon: <FaInstagram />, href: "https://www.instagram.com/wize.code/", label: "Instagram" },
    { icon: <FaFacebook />, href: "https://www.facebook.com/wizecodebr", label: "Facebook" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/company/wizecode-tech", label: "LinkedIn" },
  ],
  sections: [
    {
      title: "Serviços",
      links: [
        {
          name: "Website Institucional",
          href: "/servicos/website-institucional",
        },
        { name: "Landing Page", href: "/servicos/landing-page" },
        { name: "Sistema", href: "/servicos/sistema" },
        { name: "Automação", href: "/servicos/automacao" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { name: "A Wize", href: "/a-wize" },
        { name: "Cases", href: "/cases" },
        { name: "Trabalhe Conosco", href: "/trabalhe-conosco" },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} WizeCode. Todos os direitos reservados.`,
  legalLinks: [
    { name: "Termos de Uso", href: "#" },
    { name: "Política de Privacidade", href: "#" },
  ],
}

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
  }

  return (
    <section className={cn("flex w-full px-4 py-16", className)}>
      <div className="container mx-auto">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 flex flex-col justify-between lg:mb-0">
              <Logo url={logo?.url ?? "/"}>
                <LogoImage
                  src="/assets/logo_colored.svg"
                  alt="WizeCode"
                  className="max-h-8 dark:invert"
                />
                <LogoTextDesktop>
                  Wize<span className="text-brand">Code</span>
                </LogoTextDesktop>
              </Logo>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre os serviços da WizeCode.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-foreground"
                  >
                    <FaWhatsapp className="size-4 shrink-0" />
                    {whatsapp}
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 transition-colors hover:text-foreground"
                  >
                    <Mail className="size-4 shrink-0" />
                    {email}
                  </a>
                )}
                {socials && socials.length > 0 && (
                  <div className="mt-4 flex gap-4 text-muted-foreground">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-foreground"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {sections?.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 text-sm font-semibold tracking-tight">
                  {section.title}
                </h3>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border pt-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {legalLinks?.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}

export { Footer }
