import { useState, useCallback, ChangeEvent, FocusEvent } from "react";
import { ZodSchema, ZodError } from "zod";

export interface FormValidationOptions<T extends Record<string, any>> {
  schema?: ZodSchema;
  initialValues: T;
  validators?: Record<string, (value: any) => string>;
  onSubmit?: (data: T) => Promise<void> | void;
}

export interface UseFormValidationReturn<T extends Record<string, any>> {
  state: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  submitError: string | null;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  validateField: (field: string | keyof T, value: any) => string;
  validateForm: () => boolean;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: string | keyof T, error: string) => void;
  clearErrors: () => void;
  setSubmitError: (error: string | null) => void;
  setState: (newState: T) => void;
}

/**
 * useFormValidation - Reusable form validation hook
 *
 * Supports:
 * - Manual field validators (custom function per field)
 * - Zod schema validation
 * - Field-level validation (on blur)
 * - Full form validation (on submit)
 * - Error state management
 * - Submission state tracking
 *
 * @example
 * const { state, errors, handleChange, handleBlur, validateForm, isSubmitting } = useFormValidation({
 *   initialValues: { name: '', email: '', phone: '' },
 *   validators: {
 *     name: (val) => !val.trim() ? 'Name required' : '',
 *     email: (val) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? 'Invalid email' : '',
 *     phone: (val) => validatePhone(val).valid ? '' : validatePhone(val).error || 'Invalid phone'
 *   }
 * })
 */
export function useFormValidation<T extends Record<string, any>>(
  options: FormValidationOptions<T>
): UseFormValidationReturn<T> {
  const { schema, initialValues, validators = {}, onSubmit } = options;

  const [state, setState] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Validate a single field using either custom validator or Zod schema
  const validateField = useCallback(
    (field: string | keyof T, value: any): string => {
      const fieldKey = String(field);
      // First try custom validator if available
      if (validators[fieldKey]) {
        return validators[fieldKey](value) || "";
      }

      // If no custom validator, Zod schema will be used on full form validation
      return "";
    },
    [validators]
  );

  // Handle input change
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setState((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  // Handle field blur - validate field and update errors
  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      const error = validateField(name as keyof T, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    },
    [validateField]
  );

  // Validate entire form using schema or custom validators
  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // If schema provided, use Zod validation
    if (schema) {
      const result = schema.safeParse(state);
      if (!result.success) {
        result.error.errors.forEach((err) => {
          const path = err.path.join(".");
          newErrors[path] = err.message;
        });
        isValid = false;
      }
    } else {
      // Use custom validators
      Object.keys(initialValues).forEach((field) => {
        const error = validateField(field, state[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  }, [schema, state, initialValues, validateField]);

  // Set individual field value
  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Set individual field error
  const setFieldError = useCallback((field: string | keyof T, error: string) => {
    const fieldKey = String(field);
    setErrors((prev) => ({
      ...prev,
      [fieldKey]: error,
    }));
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Reset submit error
  const _setSubmitError = useCallback((error: string | null) => {
    setSubmitError(error);
  }, []);

  return {
    state,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleBlur,
    validateField,
    validateForm,
    setFieldValue,
    setFieldError,
    clearErrors,
    setSubmitError: _setSubmitError,
    setState,
  };
}
