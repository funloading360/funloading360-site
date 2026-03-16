"use client";

import { useEffect } from "react";

/**
 * Web Vitals Reporter — App Router compatible
 * Uses native PerformanceObserver API to collect CWV metrics
 * and sends them to GA4 via window.gtag.
 */
export default function WebVitals() {
  useEffect(() => {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;

    function sendToGA(name: string, value: number, rating: string) {
      if (!window.gtag) return;
      window.gtag("event", name, {
        event_category: "Web Vitals",
        value: Math.round(name === "CLS" ? value * 1000 : value),
        metric_rating: rating,
        non_interaction: true,
      });
    }

    function getRating(name: string, value: number): string {
      const thresholds: Record<string, [number, number]> = {
        LCP: [2500, 4000],
        FID: [100, 300],
        CLS: [0.1, 0.25],
        TTFB: [600, 1200],
        FCP: [1800, 3000],
        INP: [200, 500],
      };
      const [good, poor] = thresholds[name] ?? [0, 0];
      if (value <= good) return "good";
      if (value <= poor) return "needs-improvement";
      return "poor";
    }

    const observers: PerformanceObserver[] = [];

    // Largest Contentful Paint
    try {
      const lcpObs = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
        sendToGA("LCP", last.startTime, getRating("LCP", last.startTime));
      });
      lcpObs.observe({ type: "largest-contentful-paint", buffered: true });
      observers.push(lcpObs);
    } catch {}

    // Cumulative Layout Shift
    try {
      let clsValue = 0;
      const clsObs = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const e = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
          if (!e.hadRecentInput) clsValue += e.value;
        }
        sendToGA("CLS", clsValue, getRating("CLS", clsValue));
      });
      clsObs.observe({ type: "layout-shift", buffered: true });
      observers.push(clsObs);
    } catch {}

    // First Contentful Paint
    try {
      const fcpObs = new PerformanceObserver((list) => {
        const entry = list.getEntries().find((e) => e.name === "first-contentful-paint");
        if (entry) sendToGA("FCP", entry.startTime, getRating("FCP", entry.startTime));
      });
      fcpObs.observe({ type: "paint", buffered: true });
      observers.push(fcpObs);
    } catch {}

    // Interaction to Next Paint (INP) — replaces FID
    try {
      const inpObs = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const e = entry as PerformanceEntry & { processingStart: number; duration: number };
          const inp = e.processingStart - e.startTime + e.duration;
          sendToGA("INP", inp, getRating("INP", inp));
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      inpObs.observe({ type: "event", buffered: true } as any);
      observers.push(inpObs);
    } catch {}

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return null;
}
