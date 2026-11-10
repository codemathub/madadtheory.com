import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyanGlow";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";

    const variantStyles = {
      primary:
        "bg-brand-primary hover:bg-brand-secondary text-white shadow-lg shadow-brand-primary/25 border border-brand-primary",
      secondary:
        "bg-brand-soft text-brand-primary hover:bg-brand-primary hover:text-white border border-brand-soft",
      outline:
        "bg-transparent text-content hover:border-brand-primary hover:text-brand-primary border border-surface-border",
      ghost: "bg-transparent text-content hover:bg-surface-subtle",
      cyanGlow:
        "bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/40 hover:bg-[#00F5FF]/20 shadow-[0_0_20px_rgba(0,245,255,0.35)]",
    };

    const sizeStyles = {
      sm: "px-4 py-2 text-xs gap-1.5",
      md: "px-6 py-2.5 text-sm gap-2",
      lg: "px-8 py-3.5 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

