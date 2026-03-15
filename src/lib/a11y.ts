/**
 * Accessibility Utilities & WCAG 2.1 AA Compliance
 * Helpers for keyboard navigation, focus management, and aria attributes
 */

/**
 * Focus trap for modals and overlays
 * Ensures keyboard focus stays within modal when open
 */
export function createFocusTrap(containerRef: React.RefObject<HTMLDivElement>) {
  return (event: KeyboardEvent) => {
    if (event.key !== "Tab" || !containerRef.current) return;

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Shift + Tab on first element: focus last
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    }

    // Tab on last element: focus first
    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  };
}

/**
 * Announce text to screen readers
 * Used for dynamic content updates
 */
export function announceToScreenReader(
  message: string,
  priority: "polite" | "assertive" = "polite"
) {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only"; // Hidden visually but announced to screen readers
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Validate form input accessibility
 * Check for labels, error messages, and aria attributes
 */
export interface A11yFormValidation {
  valid: boolean;
  errors: string[];
}

export function validateFormA11y(form: HTMLFormElement): A11yFormValidation {
  const errors: string[] = [];
  const inputs = form.querySelectorAll('input, select, textarea');

  inputs.forEach((input) => {
    const inputElement = input as HTMLInputElement;

    // Check for associated label
    if (inputElement.id) {
      const label = form.querySelector(`label[for="${inputElement.id}"]`);
      if (!label) {
        errors.push(`Input #${inputElement.id} missing associated label`);
      }
    } else {
      errors.push("Input missing id attribute for label association");
    }

    // Check for aria-describedby for error messages
    if (inputElement.hasAttribute("required") && !inputElement.hasAttribute("aria-describedby")) {
      // Optional: required fields should have aria-describedby pointing to error/hint text
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Skip link HTML
 * Allows keyboard users to skip repetitive navigation
 * Usage: Add this HTML to your layout
 */
export function getSkipLinkHTML(targetId: string = "main-content"): string {
  return `<a href="#${targetId}" class="sr-only focus:not-sr-only fixed top-0 left-0 z-[9999] bg-blue-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white">Skip to main content</a>`;
}

/**
 * Get contrast ratio between two colors (hex format)
 * Returns ratio (e.g., 7.5 is WCAG AAA compliant for normal text)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

function getLuminance(hex: string): number {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const sRGB = [r, g, b].map((x) => {
    const val = x / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Accessible color palette validation
 * Checks if color combinations meet WCAG AA/AAA standards
 */
export function validateColorPalette(
  foreground: string,
  background: string,
  level: "AA" | "AAA" = "AA"
): {
  compliant: boolean;
  ratio: number;
  required: number;
} {
  const ratio = getContrastRatio(foreground, background);
  const required = level === "AAA" ? 7 : 4.5;

  return {
    compliant: ratio >= required,
    ratio: Math.round(ratio * 100) / 100,
    required,
  };
}

/**
 * Check if element is visible to screen readers
 */
export function isAccessible(element: HTMLElement): boolean {
  // Check for hidden attribute
  if (element.hasAttribute("hidden")) return false;

  // Check for aria-hidden
  if (element.getAttribute("aria-hidden") === "true") return false;

  // Check for display: none or visibility: hidden
  const styles = window.getComputedStyle(element);
  if (styles.display === "none" || styles.visibility === "hidden") return false;

  return true;
}

/**
 * Accessible Tooltip Helper
 * Generates unique tooltip ID for aria-describedby
 */
export function generateTooltipId(): string {
  return `tooltip-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Accessibility test checklist
 */
export const A11Y_CHECKLIST = {
  keyboard: {
    title: "Keyboard Navigation",
    items: [
      "All interactive elements are reachable via Tab key",
      "Tab order follows logical page flow",
      "Focus visible on all interactive elements",
      "No keyboard traps (users can exit any element)",
      "Escape key closes modals/overlays",
    ],
  },
  semantic: {
    title: "Semantic HTML",
    items: [
      "Proper heading hierarchy (h1, h2, h3...)",
      "Lists marked with <ul> or <ol>",
      "Links use <a> element (not <button> styled as link)",
      "Buttons use <button> element",
      "Form controls have <label> elements",
    ],
  },
  ariaAttributes: {
    title: "ARIA & Labels",
    items: [
      "Form inputs have aria-labels or associated labels",
      "Buttons have descriptive text or aria-label",
      "Icons have aria-label if conveying meaning",
      "Errors announced to screen readers (aria-live)",
      "Live regions use aria-live for updates",
    ],
  },
  contrast: {
    title: "Color Contrast",
    items: [
      "Text contrast >= 4.5:1 (normal text, WCAG AA)",
      "Text contrast >= 7:1 (WCAG AAA, recommended)",
      "UI components contrast >= 3:1",
      "Doesn't rely on color alone to convey meaning",
    ],
  },
  images: {
    title: "Images & Media",
    items: [
      "All images have alt text",
      "Decorative images use alt=\"\"",
      "Videos have captions (if audio content)",
      "No autoplay of videos/audio",
    ],
  },
  mobile: {
    title: "Mobile & Touch",
    items: [
      "Touch targets >= 44x44px (minimum)",
      "Zoom can be used (not locked to max-scale=1)",
      "Content reflows for mobile screens",
      "No horizontal scrolling on mobile",
    ],
  },
};
