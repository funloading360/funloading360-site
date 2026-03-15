/**
 * A/B Testing Framework
 * Manages variants, assignments, and tracking for conversion optimization
 */

interface TestVariant {
  id: string;
  name: string;
  weight: number; // 0-100 (percentage of traffic)
  description?: string;
}

interface ABTest {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "completed";
  variants: TestVariant[];
  createdAt: Date;
  hypothesis?: string;
}

/**
 * Get or create variant assignment for user
 * Uses localStorage to persist assignment across sessions
 */
export function getVariantAssignment(testId: string, variants: TestVariant[]): string {
  const storageKey = `ab_test_${testId}`;
  const stored = localStorage.getItem(storageKey);

  if (stored && variants.some((v) => v.id === stored)) {
    return stored;
  }

  // Assign new variant based on weights
  const variant = assignVariant(variants);
  localStorage.setItem(storageKey, variant.id);

  return variant.id;
}

/**
 * Assign variant based on weights
 * Uses random number between 0-100
 */
function assignVariant(variants: TestVariant[]): TestVariant {
  const rand = Math.random() * 100;
  let cumulative = 0;

  for (const variant of variants) {
    cumulative += variant.weight;
    if (rand <= cumulative) {
      return variant;
    }
  }

  // Fallback to last variant
  return variants[variants.length - 1];
}

/**
 * Check if user is in specific variant
 */
export function isInVariant(testId: string, variantId: string, variants: TestVariant[]): boolean {
  const assigned = getVariantAssignment(testId, variants);
  return assigned === variantId;
}

/**
 * Active A/B Tests
 * Add new tests here to enable them
 */
export const ACTIVE_TESTS: ABTest[] = [
  {
    id: "upsell_placement",
    name: "Upsell Placement Optimization",
    description: "Test different upsell display strategies",
    status: "active",
    hypothesis:
      "Moving upsells earlier in the flow (before form) will increase conversion",
    variants: [
      {
        id: "control",
        name: "Control (Step 2 - after details)",
        weight: 50,
        description: "Current placement: upsells shown after contact details",
      },
      {
        id: "before_form",
        name: "Treatment (After tier selection, before form)",
        weight: 50,
        description: "Show upsells immediately after product/tier selection",
      },
    ],
    createdAt: new Date("2026-03-15"),
  },

  {
    id: "payment_button_text",
    name: "Payment CTA Button Text",
    description: "Test different call-to-action button text for payment",
    status: "active",
    hypothesis:
      "More specific button text (vs generic 'Continue') increases click-through",
    variants: [
      {
        id: "generic",
        name: "Generic CTA",
        weight: 50,
        description: '"Continuă" (Continue)',
      },
      {
        id: "specific",
        name: "Specific CTA",
        weight: 50,
        description: '"Plăteste Depozit" (Pay Deposit)',
      },
    ],
    createdAt: new Date("2026-03-15"),
  },

  {
    id: "form_field_count",
    name: "Form Field Reduction",
    description: "Test shorter form with optional special requests",
    status: "active",
    hypothesis:
      "Removing optional fields (special requests) reduces form abandonment",
    variants: [
      {
        id: "full_form",
        name: "Full Form (all fields)",
        weight: 50,
        description: "Include special requests textarea",
      },
      {
        id: "minimal_form",
        name: "Minimal Form (required only)",
        weight: 50,
        description: "Hide optional fields by default",
      },
    ],
    createdAt: new Date("2026-03-15"),
  },

  {
    id: "deposit_messaging",
    name: "Deposit Amount Messaging",
    description: "Test messaging around 15% deposit requirement",
    status: "active",
    hypothesis:
      "Emphasizing deposit amount upfront (vs total price) increases clarity",
    variants: [
      {
        id: "total_only",
        name: "Total Price Only",
        weight: 50,
        description: "Show: Total £500",
      },
      {
        id: "deposit_highlighted",
        name: "Deposit + Remaining",
        weight: 50,
        description: "Show: Deposit £75 + Balance £425",
      },
    ],
    createdAt: new Date("2026-03-15"),
  },
];

/**
 * Get active test by ID
 */
export function getTest(testId: string): ABTest | undefined {
  return ACTIVE_TESTS.find((t) => t.id === testId && t.status === "active");
}

/**
 * Get user's variant for all active tests
 */
export function getUserVariants(): Record<string, string> {
  const variants: Record<string, string> = {};

  for (const test of ACTIVE_TESTS) {
    if (test.status === "active") {
      variants[test.id] = getVariantAssignment(test.id, test.variants);
    }
  }

  return variants;
}

/**
 * Clear all test assignments (for testing)
 */
export function clearTestAssignments() {
  for (const test of ACTIVE_TESTS) {
    localStorage.removeItem(`ab_test_${test.id}`);
  }
}

/**
 * Export test assignments for analytics
 */
export function getTestAssignmentsForAnalytics(): Record<string, string> {
  return getUserVariants();
}
