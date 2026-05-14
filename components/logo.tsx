"use client";

import { Download } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface LogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  url: string;
  className?: string;
  children: React.ReactNode;
}

interface LogoImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

interface LogoTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

interface LogoBrandDownloadProps {
  children: React.ReactNode;
  files: Array<{
    name: string;
    path: string;
    format: "svg" | "png" | "jpg" | "jpeg" | "webp";
  }>;
  className?: string;
}

const LogoBrandDownload = ({
  children,
  files,
  className,
}: LogoBrandDownloadProps) => {
  const handleDownload = async (file: LogoBrandDownloadProps["files"][0]) => {
    try {
      const response = await fetch(file.path);
      if (!response.ok) throw new Error(`Failed to fetch ${file.name}`);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download file:", error);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className={cn("inline-block", className)}>{children}</div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        {files.map((file) => (
          <ContextMenuItem
            key={file.path}
            onClick={() => handleDownload(file)}
            className="cursor-pointer"
          >
            <Download className="mr-2 h-4 w-4" />
            Download {file.format.toUpperCase()}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};

const Logo = ({ url, className, children, ...props }: LogoProps) => {
  return (
    <a
      href={url}
      className={cn("flex max-h-8 items-center gap-2", className)}
      {...props}
    >
      {children}
    </a>
  );
};

const LogoImage = ({ src, alt, className, width = 48, height = 32 }: LogoImageProps) => (
  <Image src={src} alt={alt} width={width} height={height} className={cn("block h-8 w-auto", className)} />
);

const LogoImageMobile = ({ src, alt, className, width = 48, height = 32 }: LogoImageProps) => (
  <Image src={src} alt={alt} width={width} height={height} className={cn("flex h-8 w-auto md:hidden", className)} />
);

const LogoImageDesktop = ({ src, alt, className, width = 48, height = 32 }: LogoImageProps) => (
  <Image src={src} alt={alt} width={width} height={height} className={cn("hidden h-8 w-auto md:flex", className)} />
);

const LogoText = ({ children, className, ...props }: LogoTextProps) => (
  <span
    className={cn("text-lg font-semibold tracking-tighter", className)}
    {...props}
  >
    {children}
  </span>
);

const LogoTextMobile = ({ children, className, ...props }: LogoTextProps) => (
  <span
    className={cn(
      "text-lg font-semibold tracking-tighter md:hidden",
      className,
    )}
    {...props}
  >
    {children}
  </span>
);

const LogoTextDesktop = ({ children, className, ...props }: LogoTextProps) => (
  <span
    className={cn(
      "hidden text-lg font-semibold tracking-tighter md:flex",
      className,
    )}
    {...props}
  >
    {children}
  </span>
);

export {
  Logo,
  LogoBrandDownload,
  LogoImage,
  LogoImageDesktop,
  LogoImageMobile,
  LogoText,
  LogoTextDesktop,
  LogoTextMobile,
};
