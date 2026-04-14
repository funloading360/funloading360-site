import { test, expect } from "@playwright/test";

/**
 * E2E Smoke Test: Booking Flow
 */

const CART_STORAGE_KEY = "funloading360_cart";

const buildCart = (productId = "360-slow-motion", tier = "signature") =>
  JSON.stringify({
    items: [
      { productId, selectedTier: tier, selectedHours: 2, quantity: 1, addedAt: Date.now() },
    ],
    version: 1,
    lastModified: Date.now(),
    sessionId: "test-session",
  });

/** Calendar availability mock — returns empty unavailable list so all dates are open */
const mockCalendar = async (page: any) => {
  await page.route("**/api/calendar/availability**", (route: any) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ data: { unavailableDates: [], perProduct: {} } }),
    })
  );
};

test.describe("Booking Flow", () => {
  const dismissCookieBanner = async (page: any) => {
    try {
      // "Accept & Continue" is disabled until the checkbox is checked — click "Decline Analytics" instead
      const btn = page.locator('button:has-text("Decline Analytics")').first();
      if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) await btn.click();
    } catch {}
  };

  const goToBookWithCart = async (
    page: any,
    productId = "360-slow-motion",
    tier = "signature"
  ) => {
    await mockCalendar(page);
    // Pre-populate localStorage before page load so useCart reads the cart immediately
    // on mount, preventing the "empty cart → /services" redirect.
    // Also pre-set cookie consent so the banner never shows and blocks clicks.
    await page.addInitScript(
      ({ cartKey, cartValue }: { cartKey: string; cartValue: string }) => {
        localStorage.setItem(cartKey, cartValue);
        localStorage.setItem("fl360_cookie_consent", "declined");
      },
      { cartKey: CART_STORAGE_KEY, cartValue: buildCart(productId, tier) }
    );
    await page.goto("/book");
  };

  /** Click the first available future date on the CustomCalendar */
  const pickCalendarDate = async (page: any) => {
    // Calendar renders day buttons (just the day number) — click the first enabled one
    const dayButton = page
      .locator(".grid.grid-cols-7 button:not([disabled])")
      .first();
    await expect(dayButton).toBeVisible({ timeout: 5000 });
    await dayButton.click();
  };

  test("should load booking page with cart pre-populated", async ({ page }) => {
    await goToBookWithCart(page);
    await dismissCookieBanner(page);

    await expect(page).toHaveTitle(/Book Your Photo Booth/i);
    await expect(page.locator("text=360 Slow Motion Booth").first()).toBeVisible({ timeout: 8000 });
  });

  test("should display all form sections", async ({ page }) => {
    await goToBookWithCart(page);
    await dismissCookieBanner(page);

    await expect(page.locator("text=360 Slow Motion Booth").first()).toBeVisible({ timeout: 8000 });
    await expect(page.locator("text=Event Date")).toBeVisible();
    await expect(page.locator("text=Personal Details")).toBeVisible();
    await expect(page.locator("text=Available Add-ons")).toBeVisible();
    await expect(page.locator("text=Summary")).toBeVisible();
  });

  test("should complete booking form successfully (mocked API)", async ({ page }) => {
    await page.route("**/api/checkout/create-session", (route: any) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, data: { checkoutUrl: "/thank-you?session_id=test_mock" } }),
      })
    );

    const consoleLogs: string[] = [];
    page.on('console', msg => {
      consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
      if (msg.text().includes('onChange') || msg.text().includes('handleSubmit')) {
        console.log('>>>', msg.text());
      }
    });

    await goToBookWithCart(page);
    await dismissCookieBanner(page);
    await expect(page.locator("text=360 Slow Motion Booth").first()).toBeVisible({ timeout: 8000 });

    // Fill event date via calendar
    await pickCalendarDate(page);

    // Fill contact details — use pressSequentially to fire per-key React synthetic events
    await page.locator('input[id="book-name"]').pressSequentially("Test User");
    await page.locator('input[id="book-email"]').pressSequentially("test@example.com");
    await page.locator('input[id="book-phone"]').pressSequentially("+447482112110");
    await page.locator('select[id="book-event-type"]').selectOption("Wedding");
    await page.locator('input[id="book-venue"]').pressSequentially("The Grand Hotel, London");

    await page.locator('button:has-text("Proceed to Payment")').click();
    await page.waitForTimeout(2000);
    console.log('BROWSER LOGS:', consoleLogs.filter(l => l.includes('handleSubmit') || l.includes('error') || l.includes('Error')).join('\n'));
    await page.waitForURL(/\/thank-you/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/thank-you/);
  });

  test("should validate required fields on submit", async ({ page }) => {
    await goToBookWithCart(page);
    await dismissCookieBanner(page);
    await expect(page.locator("text=360 Slow Motion Booth").first()).toBeVisible({ timeout: 8000 });

    await page.locator('button:has-text("Proceed to Payment")').click();

    await expect(
      page.locator("text=is required").or(page.locator("text=required")).first()
    ).toBeVisible({ timeout: 3000 });
    await expect(page).toHaveURL(/\/book/);
  });

  test("should show error for invalid email on blur", async ({ page }) => {
    await goToBookWithCart(page);
    await dismissCookieBanner(page);
    await expect(page.locator("text=360 Slow Motion Booth").first()).toBeVisible({ timeout: 8000 });

    await page.locator('input[id="book-email"]').fill("invalid-email");
    await page.locator('input[id="book-email"]').blur();
    await expect(page.locator("text=Invalid email format")).toBeVisible({ timeout: 3000 });
  });

  test("should show error for invalid UK phone on blur", async ({ page }) => {
    await goToBookWithCart(page);
    await dismissCookieBanner(page);
    await expect(page.locator("text=360 Slow Motion Booth").first()).toBeVisible({ timeout: 8000 });

    await page.locator('input[id="book-phone"]').fill("12345");
    await page.locator('input[id="book-phone"]').blur();
    await expect(page.locator("text=valid UK phone number")).toBeVisible({ timeout: 3000 });
  });

  test("should redirect to /services when navigating to /book with empty cart", async ({ page }) => {
    await page.goto("/book");
    await page.waitForURL(/\/services/, { timeout: 15000, waitUntil: "commit" });
    await expect(page).toHaveURL(/\/services/);
  });

  test("URL params add to cart then clear (smoke test)", async ({ page }) => {
    await page.goto("/book?productId=360-slow-motion&tier=signature");
    await expect(page).toHaveTitle(/Book Your Photo Booth/i, { timeout: 15000 });
    await expect(page).toHaveURL(/\/(book|services)/);
  });
});
