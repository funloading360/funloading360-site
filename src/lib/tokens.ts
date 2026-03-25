// FunLoading360 Design System — Design Tokens
// Single source of truth for all visual constants

export const colors = {
  // Brand
  gold: "#f5a623",
  goldHover: "#fbbf4a",
  goldLight: "rgba(245,166,35,0.2)",
  goldBorder: "rgba(245,166,35,0.5)",
  goldShadow: "rgba(245,166,35,0.2)",
  goldShadowHover: "rgba(245,166,35,0.4)",

  // Background layers
  bg: "#0a0a0e",
  surface: "#13131a",
  surfaceHover: "#1a1a24",

  // Borders
  border: "#2a2a3a",
  borderHover: "rgba(245,166,35,0.4)",

  // Text
  textPrimary: "#ffffff",
  textSecondary: "#9ca3af", // gray-400
  textMuted: "#6b7280",    // gray-500
  textDisabled: "#4b5563", // gray-600

  // Semantic
  error: "#f87171",          // red-400
  errorBorder: "rgba(248,113,113,0.5)",
  errorBg: "rgba(248,113,113,0.1)",
  errorFocus: "rgba(248,113,113,0.2)",

  success: "#4ade80",        // green-400
  successBorder: "rgba(74,222,128,0.5)",
  successBg: "rgba(74,222,128,0.1)",

  // Overlay
  overlay: "rgba(0,0,0,0.7)",
} as const;

export const radius = {
  sm: "0.75rem",    // rounded-xl  (inputs, small elements)
  md: "1rem",       // rounded-2xl (cards)
  lg: "1.5rem",     // rounded-3xl (modals)
  full: "9999px",   // rounded-full (buttons, badges)
} as const;

export const spacing = {
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
} as const;

export const typography = {
  fontFamily: "inherit",
  sizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
  },
  weights: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;

export const transitions = {
  fast: "150ms ease",
  base: "200ms ease",
  slow: "300ms ease",
} as const;

export const shadows = {
  goldSm: `0 4px 15px ${colors.goldShadow}`,
  goldMd: `0 8px 30px ${colors.goldShadow}`,
  goldHover: `0 8px 30px ${colors.goldShadowHover}`,
} as const;

// Min touch target sizes (WCAG 2.5.5 — AAA)
export const a11y = {
  minTouchTarget: "44px",
  minTouchTargetMobile: "48px",
} as const;
