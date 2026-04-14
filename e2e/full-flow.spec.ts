import { test, expect } from "@playwright/test";

/**
 * E2E Comprehensive Test: Services → Booking → Confirmation
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

const mockCalendar = async (page: any) => {
  await page.route("**/api/calendar/availability**", (route: any) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ data: { unavailableDates: [], perProduct: {} } }),
    })
  );
};

test.describe("Full Booking Flow: Services → Booking", () => {
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

  const pickCalendarDate = async (page: any) => {
    const dayButton = page
      .locator(".grid.grid-cols-7 button:not([disabled])")
      .first();
    await expect(dayButton).toBeVisible({ timeout: 5000 });
    await dayButton.click();
  };

  test("should complete full journey from services to thank-you page", async ({ page }) => {
    await page.route("**/api/checkout/create-session", (route: any) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, data: { checkoutUrl: "/thank-you?session_id=test_mock" } }),
      })
    );

    // ── STEP 1: Services page ──────────────────────────────
    // Pre-dismiss cookie consent so the banner never blocks clicks throughout the journey
    await page.addInitScript(() => {
      localStorage.setItem("fl360_cookie_consent", "declined");
    });
    await page.goto("/services");
    await expect(page).toHaveTitle(/Services|Photo Booth/i);
    await expect(page.locator("text=360 Slow Motion Booth")).toBeVisible();
    await expect(page.locator('a:has-text("View Packages")').first()).toBeVisible();

    // ── STEP 2: Booking page ──────────────────────────────
    await mockCalendar(page);
    await page.addInitScript(
      ({ key, value }: { key: string; value: string }) => {
        localStorage.setItem(key, value);
      },
      { key: CART_STORAGE_KEY, value: buildCart() }
    );
    await page.goto("/book");
    await expect(page).toHaveTitle(/Book Your Photo Booth/i);
    await expect(page.locator("text=360 Slow Motion Booth").first()).toBeVisible({ timeout: 8000 });
    await expect(page.locator("text=Summary")).toBeVisible();

    // ── STEP 3: Select add-on ──────────────────────────────
    await page.locator('button:has-text("Guest Book")').click();
    await expect(page.locator("text=Selected Add-ons")).toBeVisible({ timeout: 3000 });

    // ── STEP 4: Fill booking details ──────────────────────
    // Use pressSequentially to fire per-key React synthetic events (matches booking.spec.ts pattern)
    await pickCalendarDate(page);
    await page.locator('input[id="book-name"]').pressSequentially("Jane Smith");
    await page.locator('input[id="book-email"]').pressSequentially("jane@example.com");
    await page.locator('input[id="book-phone"]').pressSequentially("+447900123456");
    // Select event type and force React to recognise the change (React 19 controlled-select quirk)
    await page.locator('select[id="book-event-type"]').selectOption("Wedding");
    await page.evaluate(() => {
      const sel = document.querySelector<HTMLSelectElement>('#book-event-type');
      if (!sel) return;
      const nativeSet = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')!.set!;
      nativeSet.call(sel, 'Wedding');
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await page.locator('input[id="book-venue"]').pressSequentially("Grand Hotel, London");

    // ── STEP 5: Submit ────────────────────────────────────
    await page.locator('button:has-text("Proceed to Payment")').click();

    // ── STEP 6: Thank You page ────────────────────────────
    await page.waitForURL(/\/thank-you/, { timeout: 15000 });
    await expect(page).toHaveURL(/\/thank-you/);
    await expect(
      page.locator("text=Confirmed").or(page.locator("text=Received")).first()
    ).toBeVisible({ timeout: 5000 });
  });

  test("should validate required fields on booking page", async ({ page }) => {
    await goToBookWithCart(page, "360-slow-motion", "essential");
    await dismissCookieBanner(page);
    await expect(page.locator("text=360 Slow Motion Booth").first()).toBeVisible({ timeout: 8000 });

    await page.locator('button:has-text("Proceed to Payment")').click();

    await expect(
      page.locator("text=is required").or(page.locator("text=required")).first()
    ).toBeVisible({ timeout: 3000 });
    await expect(page).toHaveURL(/\/book/);
  });

  test("should update sidebar total when add-on selected", async ({ page }) => {
    await goToBookWithCart(page, "360-slow-motion", "essential");
    await dismissCookieBanner(page);
    await expect(page.locator("text=360 Slow Motion Booth").first()).toBeVisible({ timeout: 8000 });

    const totalEl = page.locator(".text-2xl.font-bold.text-gold").first();
    await expect(totalEl).toBeVisible();
    const initialTotal = await totalEl.textContent();

    await page.locator('button:has-text("Guest Book")').click();
    await expect(totalEl).not.toHaveText(initialTotal || "", { timeout: 3000 });
  });

  test("cart page should redirect to /book", async ({ page }) => {
    await page.goto("/cart");
    await page.waitForURL(/\/book/, { timeout: 10000 });
    await expect(page).toHaveURL(/\/book/);
  });

  test("cart should persist across page navigation", async ({ page }) => {
    await goToBookWithCart(page);
    await expect(page.locator("text=360 Slow Motion Booth").first()).toBeVisible({ timeout: 8000 });

    await page.goto("/gallery");
    await expect(page).toHaveTitle(/Gallery|Photo Booth/i);

    await page.goto("/book");
    await expect(page.locator("text=360 Slow Motion Booth").first()).toBeVisible({ timeout: 8000 });
  });

  test("/services page shows View Packages links pointing to /pricing", async ({ page }) => {
    await page.goto("/services");
    await dismissCookieBanner(page);

    const link = page.locator('a:has-text("View Packages")').first();
    await expect(link).toBeVisible();
    const href = await link.getAttribute("href");
    expect(href).toMatch(/\/pricing/);
  });

  test("payment deposit option shows 15% of total", async ({ page }) => {
    await goToBookWithCart(page, "360-slow-motion", "essential");
    await dismissCookieBanner(page);
    await expect(page.locator("text=360 Slow Motion Booth").first()).toBeVisible({ timeout: 8000 });

    await expect(page.locator("text=Pay 15% Deposit")).toBeVisible();
  });
});
