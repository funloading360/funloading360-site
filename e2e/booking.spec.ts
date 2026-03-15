import { test, expect } from "@playwright/test";

/**
 * E2E Smoke Test: Booking Flow
 *
 * Validates: Select booth → Select package → Pick date → Fill details → Submit → Thank you page
 */

test.describe("Booking Flow", () => {
  // Helper: Dismiss cookie consent banner
  const dismissCookieBanner = async (page: any) => {
    try {
      const acceptButton = page.locator('button:has-text("Accept")').first();
      const isVisible = await acceptButton.isVisible({ timeout: 2000 }).catch(() => false);
      if (isVisible) {
        await acceptButton.click();
      }
    } catch (e) {
      // Cookie banner might not be present, that's ok
    }
  };

  test("should complete booking flow successfully", async ({ page }) => {
    // Navigate to booking page
    await page.goto("/book");
    await expect(page).toHaveTitle(/Book Your Photo Booth/i);

    // Dismiss cookie banner
    await dismissCookieBanner(page);

    // ──────────────────────────────────────────────────────────
    // STEP 0: Select Booth
    // ──────────────────────────────────────────────────────────
    const boothButtons = page.locator('button:has-text("360 Slow Motion")');
    await expect(boothButtons.first()).toBeVisible();
    await boothButtons.first().click();

    // Verify Step 1 loads
    await expect(page.locator("text=Choose Your Package")).toBeVisible();

    // ──────────────────────────────────────────────────────────
    // STEP 1: Select Package
    // ──────────────────────────────────────────────────────────
    const packageButtons = page.locator("button:has-text(/Essential|Signature|Luxury/)");
    const firstPackage = packageButtons.first();
    await expect(firstPackage).toBeVisible();
    await firstPackage.click();

    // Click Continue
    const continueButtons = page.locator("button:has-text('Continue')");
    await continueButtons.last().click();

    // ──────────────────────────────────────────────────────────
    // STEP 2: Pick Date
    // ──────────────────────────────────────────────────────────
    await expect(page.locator("text=Your Preferred Date")).toBeVisible();

    // Fill in event date (30 days from now)
    const dateInput = page.locator('input[type="date"]:first-of-type');
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const formattedDate = futureDate.toISOString().split("T")[0];
    await dateInput.fill(formattedDate);

    // Click Continue
    await continueButtons.last().click();

    // ──────────────────────────────────────────────────────────
    // STEP 3: Your Details
    // ──────────────────────────────────────────────────────────
    await expect(page.locator("text=Your Details")).toBeVisible();

    // Fill in form fields
    await page.locator('input[id="book-name"]').fill("Test User");
    await page.locator('input[id="book-email"]').fill("test@example.com");
    await page.locator('input[id="book-phone"]').fill("+44 7482 112110");
    await page.locator('select[id="book-event-type"]').selectOption("Wedding");
    await page.locator('input[id="book-venue"]').fill("The Grand Hotel, London");
    await page.locator('textarea[id="book-requests"]').fill("Looking forward to it!");

    // ──────────────────────────────────────────────────────────
    // Submit Form
    // ──────────────────────────────────────────────────────────
    const submitButton = page.locator('button:has-text("Submit Booking Request")');
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // ──────────────────────────────────────────────────────────
    // Verify Thank You Page
    // ──────────────────────────────────────────────────────────
    await page.waitForURL("/thank-you");
    await expect(page).toHaveURL(/\/thank-you/);
  });

  test("should validate required fields", async ({ page }) => {
    await page.goto("/book");
    await dismissCookieBanner(page);

    // Select booth and package
    await page.locator('button:has-text("360 Slow Motion")').first().click();
    const packageButton = page.locator("button:has-text(/Essential|Signature|Luxury/)").first();
    await packageButton.click();
    await page.locator("button:has-text('Continue')").last().click();

    // Pick date and continue
    const dateInput = page.locator('input[type="date"]:first-of-type');
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const formattedDate = futureDate.toISOString().split("T")[0];
    await dateInput.fill(formattedDate);
    await page.locator("button:has-text('Continue')").last().click();

    // Try to submit without filling required fields
    const submitButton = page.locator('button:has-text("Submit Booking Request")');
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // Verify error messages appear
    const errorMessages = page.locator('[role="alert"]');
    await expect(errorMessages.first()).toBeVisible();

    // Verify we're still on the details page (not submitted)
    await expect(page.locator("text=Your Details")).toBeVisible();
  });

  test("should show error for invalid email", async ({ page }) => {
    await page.goto("/book");
    await dismissCookieBanner(page);

    // Select booth and package quickly
    await page.locator('button:has-text("360 Slow Motion")').first().click();
    await page.locator("button:has-text(/Essential|Signature|Luxury/)").first().click();
    await page.locator("button:has-text('Continue')").last().click();

    // Pick date
    const dateInput = page.locator('input[type="date"]:first-of-type');
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const formattedDate = futureDate.toISOString().split("T")[0];
    await dateInput.fill(formattedDate);
    await page.locator("button:has-text('Continue')").last().click();

    // Fill form with invalid email
    await page.locator('input[id="book-name"]').fill("Test User");
    await page.locator('input[id="book-email"]').fill("invalid-email");
    await page.locator('input[id="book-email"]').blur();

    // Check for error message
    const emailError = page.locator("text=Invalid email");
    await expect(emailError).toBeVisible({ timeout: 2000 });
  });
});
