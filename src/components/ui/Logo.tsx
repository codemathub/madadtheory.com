import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSiteContent } from "@/lib/siteContentStore";

interface LogoProps {
  className?: string;
  variant?: "full" | "iconOnly" | "light" | "dark";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  className,
  variant = "full",
  showTagline = false,
  size = "md",
}: LogoProps) {
  const content = useSiteContent();
  const logoSrc = content?.logoUrl || "/images/logo-raw.jpeg";

  const iconSizes = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-10 h-10 rounded-xl",
    lg: "w-14 h-14 rounded-2xl",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-2xl sm:text-3xl",
  };

  return (
    <Link
      to="/"
      className={cn("inline-flex items-center gap-3 group select-none", className)}
      aria-label="Mad Ad Theory Home"
    >
      {/* Real Brand Logo Emblem */}
      <div
        className={cn(
          "relative overflow-hidden bg-white shadow-sm border border-brand-purple/20 flex items-center justify-center p-0.5 shrink-0 transition-transform duration-300 group-hover:scale-105",
          iconSizes[size]
        )}
      >
        <img
          src={logoSrc}
          alt="Mad Ad Theory Monogram Emblem"
          className="w-full h-full object-contain"
        />
      </div>

      {variant !== "iconOnly" && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center">
            <span
              className={cn(
                "font-heading font-black tracking-tight text-text-main dark:text-text-main-dark leading-none",
                textSizes[size]
              )}
            >
              Mad Ad Theory
            </span>
          </div>
          {/* Characteristic Purple Accent Underline */}
          <div className="h-[2px] w-full bg-brand-purple rounded-full mt-1 mb-0.5"></div>
          {showTagline && (
            <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase font-bold text-brand-purple">
              Performance Marketing Agency
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
