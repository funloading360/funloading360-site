import { NextResponse } from "next/server";

/**
 * Standardized API Response Format
 *
 * Success: { ok: true, data: T }
 * Error: { ok: false, error: { message: string, field?: string, code?: string } }
 *
 * This ensures consistent error handling across all API routes
 */

export interface ApiSuccessResponse<T = any> {
  ok: true;
  data: T;
}

export interface ApiErrorResponse {
  ok: false;
  error: {
    message: string;
    field?: string;
    code?: string;
    fields?: Record<string, string[]>; // For Zod validation errors
  };
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Return a success response
 * @example
 * return successResponse({ bookingId: '123' }, 200)
 */
export function successResponse<T = any>(data: T, statusCode: number = 200): NextResponse {
  return NextResponse.json(
    { ok: true, data } as ApiSuccessResponse<T>,
    { status: statusCode }
  );
}

/**
 * Return an error response
 * @example
 * return errorResponse('Booking not found', 'bookingId', 'NOT_FOUND', 404)
 */
export function errorResponse(
  message: string,
  field?: string,
  code?: string,
  statusCode: number = 400
): NextResponse {
  return NextResponse.json(
    {
      ok: false,
      error: {
        message,
        ...(field && { field }),
        ...(code && { code }),
      },
    } as ApiErrorResponse,
    { status: statusCode }
  );
}

/**
 * Return a validation error response (e.g., Zod errors)
 * @example
 * const result = BookingSchema.safeParse(body)
 * if (!result.success) {
 *   return validationErrorResponse(result.error.flatten().fieldErrors)
 * }
 */
export function validationErrorResponse(
  fieldErrors: Record<string, string[]>
): NextResponse {
  return NextResponse.json(
    {
      ok: false,
      error: {
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        fields: fieldErrors,
      },
    } as ApiErrorResponse,
    { status: 422 }
  );
}

/**
 * Return a rate limit error
 */
export function rateLimitResponse(): NextResponse {
  return errorResponse(
    "Too many requests. Please try again later.",
    undefined,
    "RATE_LIMITED",
    429
  );
}

/**
 * Return a server error
 */
export function serverErrorResponse(message: string = "Internal server error"): NextResponse {
  return errorResponse(message, undefined, "INTERNAL_SERVER_ERROR", 500);
}
