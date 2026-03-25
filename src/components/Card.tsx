"use client";

import { HTMLAttributes, forwardRef } from "react";

export type CardVariant = "default" | "accent" | "interactive" | "minimal";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "sm" | "md" | "lg";
}

const variantClasses: Record<CardVariant, string> = {
  default: "bg-[#13131a] border border-[#2a2a3a]",
  accent: "bg-[#13131a] border border-[#f5a623]/50",
  interactive:
    "bg-[#13131a] border border-[#2a2a3a] hover:border-[#f5a623]/50 hover:bg-[#1a1a24] transition-all duration-200 cursor-pointer group",
  minimal: "bg-[#13131a]",
};

const paddingClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = "default", padding = "md", className = "", children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={[
          "rounded-2xl",
          variantClasses[variant],
          paddingClasses[padding],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
