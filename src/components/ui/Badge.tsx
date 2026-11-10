import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "purple" | "cyan" | "green" | "amber" | "neutral";
  size?: "sm" | "md";
}

export function Badge({
  className,
  children,
  variant = "purple",
  size = "md",
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center font-semibold rounded-full";

  const variantStyles = {
    purple: "bg-brand-soft text-brand-primary border border-brand-primary/20",
    cyan: "bg-[#00F5FF]/10 text-[#00C2D6] border border-[#00F5FF]/30",
    green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    neutral: "bg-surface-subtle text-content-muted border border-surface-border",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3.5 py-1 text-xs tracking-wide uppercase",
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...props}>
      {children}
    </span>
  );
}

