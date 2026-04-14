import { chromium } from "@playwright/test";

/**
 * Warm up key routes before tests run.
 * Turbopack compiles each route on first request in dev mode.
 * This prevents the first parallel tests from timing out during compilation.
 */
async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const baseURL = "http://localhost:3000";
  const routes = ["/", "/services", "/book", "/gallery", "/thank-you"];

  for (const route of routes) {
    try {
      await page.goto(`${baseURL}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
    } catch {
      // Route may redirect — that's fine, just warming up Turbopack
    }
  }

  await browser.close();
}

export default globalSetup;
