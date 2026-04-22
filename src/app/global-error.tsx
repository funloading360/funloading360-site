"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en-GB">
      <body style={{ background: "#0a0a0a", color: "#fff", fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", margin: 0 }}>
        <main style={{ textAlign: "center", padding: "2rem" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Something went wrong</h1>
          <p style={{ color: "#aaa", marginBottom: "2rem" }}>
            We&apos;ve been notified and are looking into it. Please try again in a moment.
          </p>
          <button
            onClick={reset}
            style={{ background: "#c9a227", color: "#000", border: "none", padding: "0.75rem 2rem", borderRadius: "0.5rem", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}
          >
            Try again
          </button>
          <p style={{ marginTop: "1.5rem", color: "#666", fontSize: "0.875rem" }}>
            Or contact us at{" "}
            <a href="mailto:FunLoading360@gmail.com" style={{ color: "#c9a227" }}>
              FunLoading360@gmail.com
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
