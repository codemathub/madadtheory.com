import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({ className, hoverEffect = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface-card border border-surface-border rounded-2xl p-6 shadow-sm",
        hoverEffect &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

