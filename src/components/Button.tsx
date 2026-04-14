"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-background font-bold hover:bg-[#fbbf4a] shadow-lg shadow-gold/20 hover:shadow-gold/40 hover:-translate-y-0.5 disabled:bg-gold/70 disabled:shadow-none disabled:translate-y-0",
  secondary:
    "border border-border text-white font-semibold hover:border-gold/40 hover:bg-white/5 disabled:opacity-50",
  ghost:
    "text-white font-semibold hover:bg-white/5 disabled:opacity-50",
  danger:
    "bg-red-500/20 text-red-400 font-semibold border border-red-500/50 hover:bg-red-500/30 disabled:opacity-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-6 py-2 text-sm min-h-[44px]",
  md: "px-8 py-4 text-base min-h-[44px]",
  lg: "px-10 py-5 text-lg min-h-[48px]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={[
          "rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? "w-full" : "",
          isDisabled ? "cursor-not-allowed" : "cursor-pointer",
          loading ? "cursor-wait" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading ? (
          <>
            <span
              className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
              aria-hidden="true"
            />
            <span>{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
