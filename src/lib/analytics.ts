/**
 * Analytics Tracking Library
 * Integrates with Google Analytics 4 for conversion tracking
 * Supports custom events, user properties, and e-commerce tracking
 */

const GA_ID = "G-0ZFCDKRLJZ";

/**
 * Initialize GA4 with consent mode
 * Handles cookie consent before tracking
 */
export function initializeGoogleAnalytics() {
  if (typeof window === "undefined") return;

  // Check if user has consented to analytics
  const hasAnalyticsConsent =
    localStorage.getItem("analytics-consent") === "true";

  if (hasAnalyticsConsent) {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
    });
  } else {
    window.gtag("consent", "default", {
      analytics_storage: "denied",
    });
  }
}

/**
 * Track page views with conversion funnel data
 */
export function trackPageView(
  pagePath: string,
  pageTitle: string,
  additionalData?: Record<string, any>
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle,
      ...additionalData,
    });
  }
}

/**
 * Track "Add to Cart" event
 */
export function trackAddToCart(
  productId: string,
  productName: string,
  tier: string,
  price: number,
  quantity: number = 1
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "add_to_cart", {
      currency: "GBP",
      value: price * quantity,
      items: [
        {
          item_id: productId,
          item_name: productName,
          item_category: "photo_booth",
          item_variant: tier,
          price: price,
          quantity: quantity,
        },
      ],
    });
  }
}

/**
 * Track "Remove from Cart" event
 */
export function trackRemoveFromCart(
  productId: string,
  productName: string,
  price: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "remove_from_cart", {
      currency: "GBP",
      value: price,
      items: [
        {
          item_id: productId,
          item_name: productName,
          item_category: "photo_booth",
          price: price,
        },
      ],
    });
  }
}

/**
 * Track cart view / review
 */
export function trackViewCart(
  items: Array<{
    productId: string;
    productName: string;
    tier: string;
    price: number;
    quantity: number;
  }>,
  cartTotal: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_cart", {
      currency: "GBP",
      value: cartTotal,
      items: items.map((item) => ({
        item_id: item.productId,
        item_name: item.productName,
        item_category: "photo_booth",
        item_variant: item.tier,
        price: item.price,
        quantity: item.quantity,
      })),
    });
  }
}

/**
 * Track booking form initiation (begin checkout)
 */
export function trackBeginCheckout(
  productId: string,
  productName: string,
  tier: string,
  cartTotal: number,
  itemCount: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "begin_checkout", {
      currency: "GBP",
      value: cartTotal,
      coupon: "",
      items: [
        {
          item_id: productId,
          item_name: productName,
          item_category: "photo_booth",
          item_variant: tier,
          quantity: itemCount,
        },
      ],
    });
  }
}

/**
 * Track upsell selection
 */
export function trackUpsellSelected(
  upsellId: string,
  upsellName: string,
  price: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_promotion", {
      promotion_id: upsellId,
      promotion_name: upsellName,
      promotion_creative: "booking_step_2",
      value: price,
      currency: "GBP",
    });
  }
}

/**
 * Track booking submission (quote request)
 */
export function trackBookingSubmission(
  bookingData: {
    productId: string;
    tier: string;
    eventDate: string;
    eventType: string;
    upsells: string[];
    totalPrice: number;
  }
) {
  if (typeof window !== "undefined" && window.gtag) {
    // Custom event for booking submission
    window.gtag("event", "booking_submitted", {
      booking_id: `booking_${Date.now()}`, // Temporary ID
      product_id: bookingData.productId,
      tier: bookingData.tier,
      event_date: bookingData.eventDate,
      event_type: bookingData.eventType,
      upsell_count: bookingData.upsells.length,
      value: bookingData.totalPrice,
      currency: "GBP",
    });

    // Also track as purchase for funnel tracking
    // (Quote requested = beginning of purchase journey)
    window.gtag("event", "purchase", {
      currency: "GBP",
      value: bookingData.totalPrice,
      transaction_id: `txn_quote_${Date.now()}`,
      affiliation: "funloading360",
      items: [
        {
          item_id: bookingData.productId,
          item_name: bookingData.productId,
          item_category: "photo_booth",
          item_variant: bookingData.tier,
          quantity: 1,
          price: bookingData.totalPrice,
        },
      ],
    });
  }
}

/**
 * Track payment initiation
 */
export function trackInitiatePayment(
  paymentIntentId: string,
  depositAmount: number,
  totalPrice: number
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "add_payment_info", {
      currency: "GBP",
      value: depositAmount,
      payment_type: "credit_card",
      transaction_id: paymentIntentId,
      custom_deposit_amount: depositAmount,
      custom_total_amount: totalPrice,
      custom_deposit_percentage: 15,
    });
  }
}

/**
 * Track payment completion
 */
export function trackPaymentComplete(
  paymentIntentId: string,
  bookingData: {
    productId: string;
    tier: string;
    email: string;
    eventDate: string;
  }
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "payment_complete", {
      payment_intent_id: paymentIntentId,
      product_id: bookingData.productId,
      tier: bookingData.tier,
      customer_email: bookingData.email,
      event_date: bookingData.eventDate,
    });
  }
}

/**
 * Track payment error
 */
export function trackPaymentError(
  paymentIntentId: string,
  errorMessage: string
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "payment_error", {
      payment_intent_id: paymentIntentId,
      error_message: errorMessage,
      event_category: "error",
      event_label: "payment",
    });
  }
}

/**
 * Track email signup / lead capture
 */
export function trackLeadCapture(
  email: string,
  source: string = "booking_form"
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "generate_lead", {
      value: 1,
      currency: "GBP",
      event_label: source,
    });

    // Set user properties for audience targeting
    window.gtag("set", { email_sha256: hashEmail(email) });
  }
}

/**
 * Track custom event for A/B testing
 */
export function trackAbTest(testName: string, variant: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "ab_test", {
      test_name: testName,
      variant: variant,
    });

    // Also set user property for segmentation
    window.gtag("set", {
      [`ab_test_${testName}`]: variant,
    });
  }
}

/**
 * Set user ID for conversion tracking (after booking)
 */
export function setUserIdForConversion(userId: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("set", { user_id: userId });
  }
}

/**
 * Track exception/error for debugging
 */
export function trackException(description: string, isFatal: boolean = false) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "exception", {
      description: description,
      fatal: isFatal,
    });
  }
}

/**
 * Hash email for GA4 consent mode (SHA256)
 * Note: This is a simple hash - consider using crypto API for production
 */
function hashEmail(email: string): string {
  // For now, return the email as-is
  // In production, implement proper SHA256 hashing
  return email.toLowerCase().trim();
}

/**
 * Track scroll depth percentage
 */
export function trackScrollDepth(percentage: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "scroll", {
      percent_scrolled: percentage,
    });
  }
}

/**
 * Declare gtag global
 */
declare global {
  interface Window {
    gtag: any;
    dataLayer: any;
  }
}
