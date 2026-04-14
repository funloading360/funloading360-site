"use client";

import { HTMLAttributes, ReactNode, useEffect, useRef } from "react";

export type ModalSize = "sm" | "md" | "lg";
export type ModalVariant = "default" | "accent" | "error";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: ModalSize;
  variant?: ModalVariant;
  /** Extra classes on the panel */
  className?: string;
  /** Accessible label when title is not provided */
  "aria-label"?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
};

const variantClasses: Record<ModalVariant, string> = {
  default: "border-border",
  accent: "border-gold/50",
  error: "border-red-500/50",
};

export default function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
  variant = "default",
  className = "",
  "aria-label": ariaLabel,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Trap focus and handle Escape
  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    panelRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault();
          (e.shiftKey ? last : first)?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={[
          "relative w-full bg-surface border rounded-3xl p-8 outline-none",
          "max-h-[90vh] overflow-y-auto",
          sizeClasses[size],
          variantClasses[variant],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {title && (
          <h2
            id="modal-title"
            className={[
              "text-2xl font-bold mb-4 pr-8",
              variant === "error" ? "text-red-400" : variant === "accent" ? "text-gold" : "text-white",
            ].join(" ")}
          >
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>
  );
}

// ── Modal sub-components for composition ──────────────────────────────────────

export function ModalFooter({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={["flex gap-3 mt-6", className].join(" ")} {...props}>
      {children}
    </div>
  );
}
