/**
 * Conversion Funnel Tracking
 * Measures user progression through booking flow steps
 * Identifies drop-off points for optimization
 */

import { trackPageView, trackBeginCheckout, trackBookingSubmission } from "./analytics";

/**
 * Funnel stages in order
 */
export const FUNNEL_STAGES = [
  {
    id: "services_view",
    name: "Services Page",
    description: "User viewed available services",
    order: 1,
  },
  {
    id: "add_to_cart",
    name: "Add to Cart",
    description: "User added item to cart",
    order: 2,
  },
  {
    id: "cart_view",
    name: "Cart Review",
    description: "User viewed cart",
    order: 3,
  },
  {
    id: "booking_step1",
    name: "Booking Step 1",
    description: "User started booking (product selection)",
    order: 4,
  },
  {
    id: "booking_step2",
    name: "Booking Step 2",
    description: "User entered details & upsells",
    order: 5,
  },
  {
    id: "quote_submitted",
    name: "Quote Submitted",
    description: "User submitted booking request",
    order: 6,
  },
  {
    id: "payment_initiated",
    name: "Payment Initiated",
    description: "User started payment process",
    order: 7,
  },
  {
    id: "payment_completed",
    name: "Payment Completed",
    description: "User completed payment",
    order: 8,
  },
  {
    id: "thank_you_page",
    name: "Thank You Page",
    description: "User reached confirmation page",
    order: 9,
  },
] as const;

export type FunnelStage = (typeof FUNNEL_STAGES)[number]["id"];

/**
 * Track user progress through funnel
 * Stores timestamp in localStorage for session tracking
 */
export function trackFunnelStage(stageId: FunnelStage, additionalData?: Record<string, any>) {
  const stage = FUNNEL_STAGES.find((s) => s.id === stageId);
  if (!stage) return;

  if (typeof window !== "undefined") {
    // Store in localStorage for analytics
    const funnelKey = "funnel_progress";
    const existingProgress = localStorage.getItem(funnelKey);
    const progress = existingProgress ? JSON.parse(existingProgress) : [];

    progress.push({
      stage: stageId,
      timestamp: new Date().toISOString(),
      ...additionalData,
    });

    localStorage.setItem(funnelKey, JSON.stringify(progress));

    // Track with GA4
    window.gtag?.("event", "funnel_progress", {
      funnel_stage: stageId,
      stage_name: stage.name,
      stage_order: stage.order,
      ...additionalData,
    });
  }
}

/**
 * Get current funnel stage (furthest stage reached)
 */
export function getCurrentFunnelStage(): FunnelStage | null {
  if (typeof window === "undefined") return null;

  const funnelKey = "funnel_progress";
  const progress = localStorage.getItem(funnelKey);

  if (!progress) return null;

  const stages = JSON.parse(progress);
  if (stages.length === 0) return null;

  // Get the last stage
  const lastStage = stages[stages.length - 1];
  return lastStage.stage;
}

/**
 * Get full funnel journey
 */
export function getFunnelJourney(): Array<{
  stage: FunnelStage;
  timestamp: string;
  data?: Record<string, any>;
}> {
  if (typeof window === "undefined") return [];

  const funnelKey = "funnel_progress";
  const progress = localStorage.getItem(funnelKey);

  return progress ? JSON.parse(progress) : [];
}

/**
 * Clear funnel progress (after booking completed)
 */
export function clearFunnelProgress() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("funnel_progress");
  }
}

/**
 * Calculate funnel dropout metrics
 */
export interface FunnelMetrics {
  totalSessions: number;
  stageConversions: Record<FunnelStage, number>;
  conversionRates: Record<FunnelStage, number>; // percentage from previous stage
  dropoffRates: Record<FunnelStage, number>; // percentage
  bottleneck: FunnelStage | null; // stage with highest dropout
}

export function calculateFunnelMetrics(
  journeys: Array<Array<{ stage: FunnelStage; timestamp: string }>>
): FunnelMetrics {
  const stageCounts: Record<FunnelStage, number> = {} as Record<FunnelStage, number>;

  for (const stage of FUNNEL_STAGES) {
    stageCounts[stage.id as FunnelStage] = 0;
  }

  // Count how many journeys reached each stage
  for (const journey of journeys) {
    const stagesInJourney = new Set<FunnelStage>();

    for (const event of journey) {
      stagesInJourney.add(event.stage);
    }

    for (const stage of stagesInJourney) {
      stageCounts[stage]++;
    }
  }

  const totalSessions = journeys.length;
  const conversionRates: Record<FunnelStage, number> = {} as Record<FunnelStage, number>;
  const dropoffRates: Record<FunnelStage, number> = {} as Record<FunnelStage, number>;

  let previousCount = totalSessions;

  for (const stage of FUNNEL_STAGES) {
    const stageId = stage.id as FunnelStage;
    const currentCount = stageCounts[stageId];
    const rate = previousCount > 0 ? Math.round((currentCount / previousCount) * 100) : 0;
    conversionRates[stageId] = rate;
    dropoffRates[stageId] = Math.max(0, 100 - rate);
    previousCount = currentCount;
  }

  // Find bottleneck (highest dropout)
  let bottleneck: FunnelStage | null = null;
  let maxDropoff = 0;

  for (const stage of FUNNEL_STAGES) {
    const stageId = stage.id as FunnelStage;
    if (dropoffRates[stageId] > maxDropoff) {
      maxDropoff = dropoffRates[stageId];
      bottleneck = stageId;
    }
  }

  return {
    totalSessions,
    stageConversions: stageCounts,
    conversionRates,
    dropoffRates,
    bottleneck,
  };
}

/**
 * Track specific milestones for alerts
 */
export function checkFunnelHealthAlerts(metrics: FunnelMetrics): string[] {
  const alerts: string[] = [];

  // Alert if any stage has <70% conversion from previous stage
  for (const stage of FUNNEL_STAGES) {
    const stageId = stage.id as FunnelStage;
    if (metrics.conversionRates[stageId] < 70 && metrics.conversionRates[stageId] > 0) {
      alerts.push(`⚠️ Low conversion at ${stage.name}: ${metrics.conversionRates[stageId]}%`);
    }
  }

  // Alert if booking step 2 conversion drops significantly
  const bookingStep2Id = "booking_step2" as FunnelStage;
  if (metrics.conversionRates[bookingStep2Id] < 60) {
    alerts.push("🔴 Critical: Booking Step 2 has <60% conversion. Consider form simplification.");
  }

  // Alert if quote submission has low conversion
  const quoteSubmittedId = "quote_submitted" as FunnelStage;
  if (metrics.conversionRates[quoteSubmittedId] < 50) {
    alerts.push("🔴 Critical: Quote submission has <50% conversion. Review pricing/messaging.");
  }

  return alerts;
}
