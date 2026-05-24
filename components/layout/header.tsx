"use client"

import {
    LayoutTemplate,
    MousePointerClick,
    Layers,
    Store,
    AppWindow,
    Smartphone,
    Workflow,
    Menu,
    Sun,
    Moon,
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useThemeToggle } from "@/components/theme-provider";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShineBorder } from "@/components/ui/shine-border";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
    dropdownLabel?: string;
    dropdownDescription?: string;
};

interface CtaButton {
    title: string;
    url: string;
};

interface NavbarProps {
    className?: string;
    logo?: {
        url: string;
        srcLight: string;
        srcDark: string;
        alt: string;
        title: string | React.ReactNode;
        className?: string;
    }
    menu?: MenuItem[];
    ctaWiz?: CtaButton;
    ctaContact?: CtaButton;
};

const Header = ({
    logo = {
        url: "/",
        srcLight: "/logos/logo_dark.svg",
        srcDark: "/logos/logo_light.svg",
        alt: "Logo WizeCode",
        title: (
            <>Wize<span className="text-brand">Code</span></>
        ),
    },
    menu = [
        {
            title: "A Wize",
            url: "/sobre",
        },
        {
            title: "Serviços",
            url: "#",
            dropdownLabel: "SOLUÇÕES DIGITAIS",
            dropdownDescription: "Tudo que o seu negócio precisa para crescer no digital.",
            items: [
                {
                    title: "Website Institucional",
                    description: "Sua marca no digital com credibilidade e presença profissional.",
                    icon: <LayoutTemplate className="size-6 shrink-0" />,
                    url: "/servicos/web/institucional",
                },
                {
                    title: "Landing Page",
                    description: "Páginas focadas em conversão para transformar visitas em leads.",
                    icon: <MousePointerClick className="size-6 shrink-0" />,
                    url: "/servicos/web/landing-page",
                },
                {
                    title: "Plataforma",
                    description: "Sistemas escaláveis para centralizar e automatizar sua operação.",
                    icon: <Layers className="size-6 shrink-0" />,
                    url: "/servicos/web/plataforma",
                },
                {
                    title: "E-commerce",
                    description: "Loja virtual de alta performance para vender mais e melhor.",
                    icon: <Store className="size-6 shrink-0" />,
                    url: "/servicos/web/e-commerce",
                },
                {
                    title: "Web App",
                    description: "Aplicações interativas e sob medida para o seu negócio.",
                    icon: <AppWindow className="size-6 shrink-0" />,
                    url: "/servicos/web/web-app",
                },
                {
                    title: "Mobile",
                    description: "Apps nativos para iOS e Android que fidelizam seu cliente.",
                    icon: <Smartphone className="size-6 shrink-0" />,
                    url: "/servicos/mobile",
                },
                {
                    title: "Automação",
                    description: "Reduza tarefas manuais e ganhe eficiência onde mais importa.",
                    icon: <Workflow className="size-6 shrink-0" />,
                    url: "/servicos/automacao",
                },
            ],
        },
        {
            title: "Cases",
            url: "/cases",
        },
        
        {
            title: "Trabalhe Conosco",
            url: "/trabalhe-conosco",
        },
    ],
    ctaWiz = { title: "Converse com Wizard", url: "#" },
    ctaContact = { title: "Entre em contato", url: "#" },
    className,
}: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isOpen]);

    return (
        <header className={cn("flex justify-center p-4 shadow-sm", className)}>
            <div className="container">
                <nav className="hidden justify-between items-center lg:flex">
                    <div className="flex items-center gap-8">
                        <Link className="flex items-center gap-2" href={logo.url}>
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

                            <h1 className="text-[18px] font-semibold tracking-tighter">
                                {logo.title}
                            </h1>
                        </Link>

                        <div className="flex items-center">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {menu.map((item) => renderMenuItem(item))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="group relative rounded-lg">
                            <ShineBorder className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                            />
                            <Button asChild size="lg" variant="outline">
                                <Link href={ctaWiz.url}>
                                    {ctaWiz.title}
                                </Link>
                            </Button>
                        </div>

                        <Button asChild size="lg">
                            <Link href={ctaContact.url}>
                                {ctaContact.title}
                            </Link>
                        </Button>

                        <ThemeToggle />
                    </div>
                </nav>

                <div className="block lg:hidden">
                    <div className="flex justify-between items-center">
                        <Link href={logo.url} className="flex items-center gap-2">
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
                        </Link>

                        <div className="flex items-center gap-4">
                            <ThemeToggle />

                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Menu size={20} className="cursor-pointer" />
                                </SheetTrigger>

                                <SheetContent className="overflow-y-auto">
                                    <SheetHeader>
                                        <SheetTitle>
                                            <Link href={logo.url} className="flex items-center gap-2">
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
                                            </Link>
                                        </SheetTitle>
                                    </SheetHeader>

                                    <div className="flex flex-col gap-8 p-4 pt-0">
                                        <Accordion className="flex flex-col gap-4 w-full"
                                            type="single"
                                            collapsible
                                        >
                                            {menu.map((item) =>
                                                renderMobileMenuItem(item)
                                            )}
                                        </Accordion>

                                        <div className="flex flex-col gap-2">
                                            <div className="group relative rounded-lg">
                                                <ShineBorder className="transition-opacity duration-200 opacity-100"
                                                    shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                                                />
                                                <Button className="w-full" asChild size="lg" variant="outline">
                                                    <Link href={ctaWiz.url}>
                                                        {ctaWiz.title}
                                                    </Link>
                                                </Button>
                                            </div>

                                            <Button asChild size="lg">
                                                <Link href={ctaContact.url}>
                                                    {ctaContact.title}
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger className="font-medium text-[14px] px-4 py-2">
                    {item.title}
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                    <div className="w-190 p-4">
                        {(item.dropdownLabel || item.dropdownDescription) && (
                            <div className="flex flex-col gap-1 mb-4">
                                {item.dropdownLabel && (
                                    <h3 className="text-[12px] font-semibold tracking-widest text-muted-foreground uppercase">
                                        {item.dropdownLabel}
                                    </h3>
                                )}
                                {item.dropdownDescription && (
                                    <p className="text-[14px] text-muted-foreground">
                                        {item.dropdownDescription}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="grid grid-cols-3 gap-2">
                            {item.items.map((subItem) => (
                                <NavigationMenuLink asChild key={subItem.title}>
                                    <DropdownCard item={subItem} />
                                </NavigationMenuLink>
                            ))}
                        </div>
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                className="group bg-background inline-flex justify-center items-center font-medium text-[14px] px-4 py-2 rounded-md transition-colors hover:bg-muted"
                href={item.url}
            >
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const DropdownCard = ({ item }: { item: MenuItem }) => {
    return (
        <Link className="flex flex-col items-start gap-3 rounded-lg p-3 transition-colors hover:bg-muted outline-none select-none focus-visible:ring-2 focus-visible:ring-ring"
            href={item.url}
        >
            {item.icon && (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {item.icon}
                </div>
            )}

            <div>
                <div className="text-[14px] font-semibold">
                    {item.title}
                </div>

                {item.description && (
                    <p className="text-muted-foreground text-[12px] mt-0.5">
                        {item.description}
                    </p>
                )}
            </div>
        </Link>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem className="border-none" key={item.title} value={item.title}>
                <AccordionTrigger className="text-[14px] py-0 font-semibold hover:no-underline focus-visible:ring-0 focus-visible:ring-offset-0">
                    {item.title}
                </AccordionTrigger>

                <AccordionContent className="mt-4">
                    <div className="flex flex-col gap-1">
                        {item.items.map((subItem) => (
                            <MobileSubItem key={subItem.title} item={subItem} />
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <Link key={item.title} href={item.url} className="text-[14px] font-semibold">
            {item.title}
        </Link>
    );
};

const MobileSubItem = ({ item }: { item: MenuItem }) => {
    return (
        <Link
            href={item.url}
            className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted no-underline!"
        >
            {item.icon && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {item.icon}
                </div>
            )}
            <span className="text-[14px] font-medium">{item.title}</span>
        </Link>
    );
};

const ThemeToggle = () => {
    const { toggle } = useThemeToggle();

    return (
        <Button
            className="shrink-0"
            size="icon"
            variant="ghost"
            onClick={toggle}
        >
            <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Alternar tema</span>
        </Button>
    );
};

export { Header };
