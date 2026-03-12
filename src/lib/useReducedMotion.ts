import { useEffect, useState } from "react";

/**
 * Hook to detect if user prefers reduced motion
 * Returns true if prefers-reduced-motion is enabled
 */
export function useReducedMotion(): boolean {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    // Check initial preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduce(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setShouldReduce(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return shouldReduce;
}
