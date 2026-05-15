"use client";

import { 
    LayoutTemplate, 
    MousePointerClick, 
    Layers, 
    Store, 
    AppWindow, 
    Smartphone, 
    Workflow,
    Menu,
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
};

interface CtaButton {
    title: string;
    url: string;
};

interface NavbarProps {
    className?: string;
    logo?: {
        url: string;
        src: string;
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
        src: "/logos/logo_colored.svg",
        alt: "logo",
        title: (
            <>Wize<span className="text-brand">Code</span></>
        ),
    },
    menu = [
        { title: "Home", url: "/" },
        {
            title: "Serviços",
            url: "#",
            items: [
                {
                    title: "Website Institucional",
                    description:"A vitrine digital definitiva para posicionar sua marca e gerar credibilidade.",
                    icon: <LayoutTemplate className="size-5 shrink-0" />,
                    url: "/servicos/web/institucional",
                },
                {
                    title: "Landing Page",
                    description: "Páginas otimizadas com foco extremo em capturar leads e maximizar conversões.",
                    icon: <MousePointerClick className="size-5 shrink-0" />,
                    url: "/servicos/web/landing-page",
                },
                {
                    title: "Plataforma",
                    description: "Sistemas robustos e escaláveis projetados para gerenciar toda a sua operação.",
                    icon: <Layers className="size-5 shrink-0" />,
                    url: "/servicos/web/plataforma",
                },
                {
                    title: "E-commerce",
                    description: "Lojas virtuais de alta performance estruturadas para alavancar suas vendas.",
                    icon: <Store className="size-5 shrink-0" />,
                    url: "/servicos/web/e-commerce",
                },
                {
                    title: "Web App",
                    description: "Soluções sob medida com a interatividade e a fluidez de um aplicativo.",
                    icon: <AppWindow className="size-5 shrink-0" />,
                    url: "/servicos/web/web-app",
                },
                {
                    title: "Mobile",
                    description: "Aplicativos nativos para iOS e Android que conectam você ao seu cliente em qualquer lugar.",
                    icon: <Smartphone className="size-5 shrink-0" />,
                    url: "/servicos/mobile",
                },
                {
                    title: "Automação",
                    description: "Elimine tarefas manuais, reduza custos operacionais e ganhe eficiência.",
                    icon: <Workflow className="size-5 shrink-0" />,
                    url: "/servicos/automacao",
                },
            ],
        },
        {
            title: "Cases",
            url: "/cases",
        },
        {
            title: "A Wize",
            url: "/sobre",
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
                {/* Desktop Menu */}
                <nav className="hidden justify-between items-center lg:flex">
                    <div className="flex items-center gap-8">
                        <Link className="flex items-center gap-2" href={logo.url}>
                            <Image className="dark:invert"
                                src={logo.src}
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

                    <div className="flex gap-2">
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
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex justify-between items-center">
                        <Link href={logo.url} className="flex items-center gap-2">
                            <Image className="dark:invert"
                                src={logo.src}
                                alt={logo.alt}
                                width={48}
                                height={48}
                            />
                        </Link>

                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Menu size={20} className="cursor-pointer" />
                            </SheetTrigger>

                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <Link href={logo.url} className="flex items-center gap-2">
                                            <Image className="dark:invert"
                                                src={logo.src}
                                                alt={logo.alt}
                                                width={40}
                                                height={40}
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

                <NavigationMenuContent className="bg-popover text-popover-foreground">
                    {item.items.map((subItem) => (
                        <NavigationMenuLink className="w-80"
                            key={subItem.title}
                            asChild
                        >
                            <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink className="group bg-background inline-flex justify-center items-center font-medium text-[14px] px-4 py-2 rounded-md transition-colors hover:bg-muted"
                href={item.url}
            >
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem className="border-none"
                key={item.title}
                value={item.title}
            >
                <AccordionTrigger className="text-[14px] py-0 font-semibold hover:no-underline focus-visible:ring-0 focus-visible:ring-offset-0">
                    {item.title}
                </AccordionTrigger>

                <AccordionContent className="mt-4">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} />
                    ))}
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

const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
        <Link href={item.url} className="flex flex-row gap-4 w-full rounded-lg p-3 no-underline! transition-colors outline-none select-none hover:bg-muted lg:w-95">
            <div className="text-foreground mt-1">{item.icon}</div>

            <div>
                <div className="text-[14px] font-semibold">{item.title}</div>
                {item.description && (
                    <p className="text-[14px] text-muted-foreground">
                        {item.description}
                    </p>
                )}
            </div>
        </Link>
    );
};

export { Header };
