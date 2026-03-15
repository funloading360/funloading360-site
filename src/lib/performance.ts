/**
 * Performance Optimization Utilities
 * Monitors Core Web Vitals and provides optimization strategies
 */

/**
 * Core Web Vitals thresholds (as of 2025)
 */
export const WEB_VITALS_THRESHOLDS = {
  // Largest Contentful Paint - how quickly largest content element renders
  lcp: {
    good: 2500, // milliseconds
    needsImprovement: 4000,
  },
  // First Input Delay - responsiveness to user input
  fid: {
    good: 100, // milliseconds
    needsImprovement: 300,
  },
  // Cumulative Layout Shift - visual stability
  cls: {
    good: 0.1,
    needsImprovement: 0.25,
  },
  // Time to First Byte - server response time
  ttfb: {
    good: 600, // milliseconds
    needsImprovement: 1200,
  },
  // First Contentful Paint
  fcp: {
    good: 1800, // milliseconds
    needsImprovement: 3000,
  },
};

export interface WebVitals {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  fcp?: number; // First Contentful Paint
  ini?: number; // Interaction to Next Paint
}

/**
 * Report Web Vitals using Web Vitals library
 * To be called from layout.tsx with web-vitals package
 */
export function reportWebVitals(metric: {
  name: string;
  value: number;
  id: string;
  rating?: string;
}) {
  // Send to analytics or monitoring service
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "web_vitals", {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_id: metric.id,
      metric_rating: metric.rating,
    });
  }

  // Log for debugging
  console.log(`Web Vital - ${metric.name}:`, `${metric.value}ms`, `(${metric.rating})`);
}

/**
 * Performance metrics to monitor
 */
export interface PerformanceMetrics {
  pageLoadTime: number; // DOM Content Loaded
  resourceTiming: {
    scripts: number;
    stylesheets: number;
    images: number;
    fonts: number;
    other: number;
  };
  memory?: {
    jsHeapSizeLimit: number;
    totalJSHeapSize: number;
    usedJSHeapSize: number;
  };
}

/**
 * Collect performance metrics
 */
export function collectPerformanceMetrics(): PerformanceMetrics {
  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

  const resourceTiming = {
    scripts: 0,
    stylesheets: 0,
    images: 0,
    fonts: 0,
    other: 0,
  };

  for (const resource of window.performance.getEntriesByType("resource")) {
    const name = resource.name.toLowerCase();
    if (name.endsWith(".js")) resourceTiming.scripts++;
    else if (name.endsWith(".css")) resourceTiming.stylesheets++;
    else if (/\.(png|jpg|jpeg|gif|webp|svg)$/i.test(name)) resourceTiming.images++;
    else if (/\.(woff|woff2|ttf|otf)$/i.test(name)) resourceTiming.fonts++;
    else resourceTiming.other++;
  }

  const memory = (window as any).performance?.memory;

  return {
    pageLoadTime,
    resourceTiming,
    ...(memory && { memory }),
  };
}

/**
 * Image optimization checklist
 */
export const IMAGE_OPTIMIZATION_TIPS = [
  "Use Next.js Image component with responsive sizing",
  "Provide srcSet for multiple resolutions (1x, 2x, 3x)",
  "Use modern formats: AVIF > WebP > PNG/JPG",
  "Compress images: target <100KB for thumbnails, <300KB for hero",
  "Use lazy loading (loading='lazy') for below-fold images",
  "Set explicit width/height to prevent Cumulative Layout Shift",
  "Use blurhash or LQIP (Low Quality Image Placeholder) for progressive loading",
];

/**
 * CSS optimization checklist
 */
export const CSS_OPTIMIZATION_TIPS = [
  "Use Tailwind CSS for built-in CSS optimization",
  "Purge unused CSS with PurgeCSS",
  "Inline critical CSS (above-the-fold styles)",
  "Use media queries to load styles conditionally",
  "Minimize animations (avoid 60fps for low-end devices)",
  "Use CSS containment (contain: layout) for heavy components",
  "Use CSS variables for theme switching (reduces recalc time)",
];

/**
 * JavaScript optimization checklist
 */
export const JS_OPTIMIZATION_TIPS = [
  "Use dynamic imports for route-based code splitting",
  "Defer non-critical JavaScript (defer attribute)",
  "Use async for analytics and third-party scripts",
  "Minify and compress JavaScript bundles",
  "Use Web Workers for heavy computations",
  "Implement error boundaries to prevent app crashes",
  "Avoid large bundle sizes (target <100KB gzipped)",
];

/**
 * Performance budget
 */
export interface PerformanceBudget {
  maxBundleSize: number; // KB
  maxFirstContentfulPaint: number; // ms
  maxLargestContentfulPaint: number; // ms
  maxCumulativeLayoutShift: number;
  maxTimeToInteractive: number; // ms
}

export const PERFORMANCE_BUDGET: PerformanceBudget = {
  maxBundleSize: 250, // Total JS, CSS, HTML
  maxFirstContentfulPaint: 1800,
  maxLargestContentfulPaint: 2500,
  maxCumulativeLayoutShift: 0.1,
  maxTimeToInteractive: 3800,
};

/**
 * Check if metrics meet budget
 */
export function checkPerformanceBudget(
  metrics: WebVitals,
  budget: PerformanceBudget = PERFORMANCE_BUDGET
): {
  withinBudget: boolean;
  violations: string[];
} {
  const violations: string[] = [];

  if (metrics.fcp && metrics.fcp > budget.maxFirstContentfulPaint) {
    violations.push(
      `FCP (${metrics.fcp}ms) exceeds budget (${budget.maxFirstContentfulPaint}ms)`
    );
  }

  if (metrics.lcp && metrics.lcp > budget.maxLargestContentfulPaint) {
    violations.push(
      `LCP (${metrics.lcp}ms) exceeds budget (${budget.maxLargestContentfulPaint}ms)`
    );
  }

  if (metrics.cls && metrics.cls > budget.maxCumulativeLayoutShift) {
    violations.push(
      `CLS (${metrics.cls}) exceeds budget (${budget.maxCumulativeLayoutShift})`
    );
  }

  return {
    withinBudget: violations.length === 0,
    violations,
  };
}

/**
 * Request Idle Callback polyfill for browsers that don't support it
 */
export function scheduleIdleCallback(
  callback: IdleRequestCallback,
  options?: IdleRequestOptions
): number {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    return (window as any).requestIdleCallback(callback, options);
  }

  // Fallback: use setTimeout
  return setTimeout(() => {
    const start = performance.now();
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (performance.now() - start)),
    } as IdleDeadline);
  }, 1) as unknown as number;
}

/**
 * Preload strategy for critical resources
 */
export function preloadCriticalResources() {
  const critical = [
    // Fonts
    "/fonts/playfair-display.woff2",
    "/fonts/inter.woff2",
  ];

  for (const resource of critical) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = resource.endsWith(".woff2") ? "font" : "script";
    link.href = resource;
    if (resource.endsWith(".woff2")) {
      link.crossOrigin = "anonymous";
    }
    document.head.appendChild(link);
  }
}

/**
 * Monitor performance degradation over time
 */
export function setupPerformanceMonitoring() {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;

  // Monitor Long Tasks (tasks > 50ms)
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if ("duration" in entry && entry.duration > 50) {
          console.warn(`Long task detected: ${entry.name} (${entry.duration}ms)`);

          if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "long_task", {
              task_name: entry.name,
              duration: Math.round(entry.duration),
              event_category: "performance",
            });
          }
        }
      }
    });

    observer.observe({ entryTypes: ["longtask"] });
  } catch (e) {
    // Long tasks API not available
  }
}
