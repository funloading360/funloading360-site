import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // Capture 10% of sessions in prod for performance monitoring
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Capture replays only when an error occurs — zero cost in normal traffic
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: false,
    }),
  ],

  // Silence noisy browser extensions
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed",
    /^Network Error/,
    /^Loading chunk/,
  ],
});
