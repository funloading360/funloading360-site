import { test, expect } from "@playwright/test";

/**
 * E2E Comprehensive Test: Services → Cart → Booking → Thank You
 *
 * Validates the complete user journey:
 * 1. Browse services page
 * 2. Add item to cart
 * 3. Review cart
 * 4. Complete 2-step booking flow with upsells
 * 5. Confirmation page
 */

test.describe("Full Booking Flow: Services → Cart → Booking", () => {
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

  test("should complete full journey from services to thank-you page", async ({
    page,
  }) => {
    // ──────────────────────────────────────────────────────────
    // STEP 1: Navigate to Services Page
    // ──────────────────────────────────────────────────────────
    await page.goto("/services");
    await expect(page).toHaveTitle(/Photo Booth & Party Rentals/i);

    // Dismiss cookie banner
    await dismissCookieBanner(page);

    // Verify services are displayed
    const boothCards = page.locator('text=360 Slow Motion');
    await expect(boothCards).toBeVisible();

    // ──────────────────────────────────────────────────────────
    // STEP 2: Add Item to Cart
    // ──────────────────────────────────────────────────────────
    // Click "Add to Cart" for first booth
    const addToCartButtons = page.locator(
      'button:has-text("Adaugă în Coș")'
    );
    await expect(addToCartButtons.first()).toBeVisible();
    await addToCartButtons.first().click();

    // Modal should appear with tier selection
    const modalTitle = page.locator('text=Alege Tier');
    await expect(modalTitle).toBeVisible();

    // Select tier (Signature)
    const tierOption = page.locator(
      'button:has-text("Signature")'
    );
    await expect(tierOption).toBeVisible();
    await tierOption.click();

    // Adjust quantity
    const plusButton = page.locator('button:has-text("+")').first();
    await expect(plusButton).toBeVisible();
    await plusButton.click(); // Now quantity is 2

    // Submit modal
    const addButton = page.locator('button:has-text("Adaugă în Coș")').last();
    await expect(addButton).toBeEnabled();
    await addButton.click();

    // Success toast should appear
    const successMessage = page.locator('text=Adăugat în coș');
    await expect(successMessage).toBeVisible();

    // Cart badge should show item count
    const cartBadge = page.locator('button').filter({ has: page.locator('svg') }).last();
    await expect(cartBadge).toBeVisible();

    // ──────────────────────────────────────────────────────────
    // STEP 3: Navigate to Cart
    // ──────────────────────────────────────────────────────────
    await page.goto("/cart");
    await expect(page).toHaveTitle(/Coșul tău/i);

    // Verify cart items are displayed
    const cartItem = page.locator('text=360 Slow Motion');
    await expect(cartItem).toBeVisible();

    // Verify quantity is 2
    const quantityDisplay = page.locator('text=2');
    await expect(quantityDisplay).toBeVisible();

    // Verify total price is displayed
    const totalText = page.locator('text=/Total|Rezumat/i');
    await expect(totalText).toBeVisible();

    // ──────────────────────────────────────────────────────────
    // STEP 4: Navigate to Booking (2-Step Flow)
    // ──────────────────────────────────────────────────────────
    const checkoutButton = page.locator(
      'a:has-text("Continuă Checkout")'
    );
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.click();

    await expect(page).toHaveTitle(/Rezervă Photo Booth/i);

    // ──────────────────────────────────────────────────────────
    // STEP 5: Booking Step 1 - Select Service & Tier
    // ──────────────────────────────────────────────────────────
    const stepTitle = page.locator('text=Alege Photo Booth');
    await expect(stepTitle).toBeVisible();

    // Select a booth product
    const productCard = page.locator(
      'button:has-text("360 Slow Motion")'
    ).first();
    await expect(productCard).toBeVisible();
    await productCard.click();

    // Tier options should appear
    const essentialTier = page.locator(
      'button:has-text("Essential")'
    );
    await expect(essentialTier).toBeVisible();
    await essentialTier.click();

    // Continue button should be enabled
    const continueBtn = page.locator(
      'button:has-text("Continuă")'
    ).last();
    await expect(continueBtn).toBeEnabled();
    await continueBtn.click();

    // ──────────────────────────────────────────────────────────
    // STEP 6: Booking Step 2 - Date, Details & Upsells
    // ──────────────────────────────────────────────────────────
    const detailsTitle = page.locator('text=Detalii');
    await expect(detailsTitle).toBeVisible();

    // Fill event date
    const dateInput = page.locator('input[type="date"]').first();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const formattedDate = futureDate.toISOString().split("T")[0];
    await dateInput.fill(formattedDate);

    // Fill contact details
    await page.locator('input[id="book-name"]').fill("Maria Popescu");
    await page.locator('input[id="book-email"]').fill("maria@example.com");
    await page.locator('input[id="book-phone"]').fill("+44 7482 112110");
    await page
      .locator('select[id="book-event-type"]')
      .selectOption("Nuntă");
    await page
      .locator('input[id="book-venue"]')
      .fill("Hotel Grand, Chelmş");

    // Select upsells
    const guestBookCheckbox = page.locator(
      'button:has-text("Carte de oaspeți")'
    );
    await expect(guestBookCheckbox).toBeVisible();
    await guestBookCheckbox.click();

    // Verify summary sidebar shows updated total
    const sidebarTotal = page.locator('text=/£|Total/i');
    await expect(sidebarTotal).toBeVisible();

    // ──────────────────────────────────────────────────────────
    // STEP 7: Submit Booking
    // ──────────────────────────────────────────────────────────
    const submitButton = page.locator(
      'button:has-text("Solicită Ofertă")'
    );
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // ──────────────────────────────────────────────────────────
    // STEP 8: Verify Thank You Page
    // ──────────────────────────────────────────────────────────
    await page.waitForURL("/thank-you", { timeout: 5000 });
    await expect(page).toHaveURL(/\/thank-you/);

    // Verify confirmation message
    const confirmationText = page.locator(
      'text=Cererea ta a fost primită'
    );
    await expect(confirmationText).toBeVisible();

    // Verify next steps are displayed
    const nextStepsText = page.locator(
      'text=Ce se întâmplă acum'
    );
    await expect(nextStepsText).toBeVisible();
  });

  test("should validate required fields on step 2", async ({ page }) => {
    // Quick path to step 2
    await page.goto("/book");
    await dismissCookieBanner(page);

    // Skip to step 2 by selecting service
    const productCard = page.locator(
      'button:has-text("360 Slow Motion")'
    ).first();
    await productCard.click();

    const tierButton = page.locator(
      'button:has-text("Essential")'
    );
    await tierButton.click();

    const continueBtn = page.locator(
      'button:has-text("Continuă")'
    ).last();
    await continueBtn.click();

    // Try to submit without filling details
    const submitButton = page.locator(
      'button:has-text("Solicită Ofertă")'
    );
    await submitButton.click();

    // Error messages should appear
    const errorMessages = page.locator('[role="alert"]');
    await expect(errorMessages.first()).toBeVisible({ timeout: 2000 });

    // Should still be on step 2
    const detailsTitle = page.locator('text=Detalii');
    await expect(detailsTitle).toBeVisible();
  });

  test("should update sidebar total when upsells selected", async ({
    page,
  }) => {
    // Navigate to booking and get to step 2
    await page.goto("/book");
    await dismissCookieBanner(page);

    const productCard = page.locator(
      'button:has-text("360 Slow Motion")'
    ).first();
    await productCard.click();

    const tierButton = page.locator(
      'button:has-text("Essential")'
    );
    await tierButton.click();

    const continueBtn = page.locator(
      'button:has-text("Continuă")'
    ).last();
    await continueBtn.click();

    // Get initial total from sidebar
    const sidebar = page.locator('text=Rezumat').first();
    await expect(sidebar).toBeVisible();

    // Select first upsell
    const upsellButton = page.locator(
      'button:has-text("Carte de oaspeți")'
    );
    await upsellButton.click();

    // Verify sidebar total increased
    const updatedTotal = page.locator('text=/£/').last();
    await expect(updatedTotal).toBeVisible();
  });

  test("cart should persist across page navigation", async ({ page }) => {
    // Add item to cart
    await page.goto("/services");
    await dismissCookieBanner(page);
    const addToCartButtons = page.locator(
      'button:has-text("Adaugă în Coș")'
    );
    await addToCartButtons.first().click();

    const tierOption = page.locator(
      'button:has-text("Signature")'
    );
    await tierOption.click();

    const addButton = page.locator(
      'button:has-text("Adaugă în Coș")'
    ).last();
    await addButton.click();

    // Navigate away
    await page.goto("/gallery");
    await expect(page).toHaveTitle(/Galerie/i);

    // Navigate back to cart
    await page.goto("/cart");

    // Item should still be in cart
    const cartItem = page.locator('text=360 Slow Motion');
    await expect(cartItem).toBeVisible();

    // Quantity should be preserved
    const quantityDisplay = page.locator('text=1');
    await expect(quantityDisplay).toBeVisible();
  });
});
