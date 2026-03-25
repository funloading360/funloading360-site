"use client";

import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
  useId,
} from "react";

// ── Shared styles ──────────────────────────────────────────────────────────────

const baseInputClass =
  "w-full px-4 py-3 rounded-xl bg-[#13131a] border text-white placeholder:text-gray-500 outline-none transition-all duration-200 min-h-[44px]";

const stateClasses = {
  normal:
    "border-[#2a2a3a] focus:border-[#f5a623]/50 focus:ring-1 focus:ring-[#f5a623]/20",
  error:
    "border-red-500/50 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/20",
  disabled: "border-[#2a2a3a] text-gray-400 placeholder:text-gray-600 cursor-not-allowed opacity-50",
};

// ── Input ──────────────────────────────────────────────────────────────────────

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, hint, disabled, className = "", id: propId, ...props }, ref) => {
    const generatedId = useId();
    const id = propId ?? generatedId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;

    const describedBy = [error ? errorId : null, hint ? hintId : null]
      .filter(Boolean)
      .join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={[
            baseInputClass,
            disabled ? stateClasses.disabled : error ? stateClasses.error : stateClasses.normal,
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {hint && !error && (
          <p id={hintId} className="text-xs text-gray-500">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="flex items-start gap-1.5 text-red-400 text-xs">
            <span aria-hidden="true" className="text-base leading-none">⚠</span>
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

// ── Textarea ───────────────────────────────────────────────────────────────────

export interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  rows?: number;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, hint, disabled, className = "", id: propId, rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const id = propId ?? generatedId;
    const errorId = `${id}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          disabled={disabled}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          className={[
            baseInputClass,
            "resize-none",
            "min-h-[unset]",
            disabled ? stateClasses.disabled : error ? stateClasses.error : stateClasses.normal,
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-gray-500">{hint}</p>
        )}
        {error && (
          <p id={errorId} role="alert" className="flex items-start gap-1.5 text-red-400 text-xs">
            <span aria-hidden="true" className="text-base leading-none">⚠</span>
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";

// ── Select ─────────────────────────────────────────────────────────────────────

export interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, hint, disabled, className = "", id: propId, children, ...props }, ref) => {
    const generatedId = useId();
    const id = propId ?? generatedId;
    const errorId = `${id}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          disabled={disabled}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          className={[
            baseInputClass,
            "cursor-pointer",
            disabled ? stateClasses.disabled : error ? stateClasses.error : stateClasses.normal,
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {children}
        </select>
        {hint && !error && (
          <p className="text-xs text-gray-500">{hint}</p>
        )}
        {error && (
          <p id={errorId} role="alert" className="flex items-start gap-1.5 text-red-400 text-xs">
            <span aria-hidden="true" className="text-base leading-none">⚠</span>
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormInput;
