import { test, expect } from '@playwright/test';

const CART_STORAGE_KEY = 'funloading360_cart';

const buildCart = (productId = '360-slow-motion', tier = 'signature') =>
  JSON.stringify({
    items: [
      { productId, selectedTier: tier, selectedHours: 2, quantity: 1, addedAt: Date.now() },
    ],
    version: 1,
    lastModified: Date.now(),
    sessionId: 'test-session',
  });

test.describe('CRM progressive capture', () => {
  test.beforeEach(async ({ context }) => {
    // Pre-set cookie consent so banner doesn't interfere
    await context.addInitScript(() => {
      localStorage.setItem('fl360_cookie_consent', 'accepted');
    });
  });

  test('emits lead.partial when valid email is entered and blurred', async ({ page }) => {
    const crmRequests: unknown[] = [];

    // Intercept /api/crm/event calls
    await page.route('/api/crm/event', async (route) => {
      const body = route.request().postDataJSON();
      crmRequests.push(body);
      await route.fulfill({ status: 202, body: JSON.stringify({ ok: true }) });
    });

    // Pre-populate cart in localStorage so the booking page doesn't redirect to /services
    await page.addInitScript(
      ({ cartKey, cartValue }: { cartKey: string; cartValue: string }) => {
        localStorage.setItem(cartKey, cartValue);
        localStorage.setItem('fl360_cookie_consent', 'accepted');
      },
      { cartKey: CART_STORAGE_KEY, cartValue: buildCart() }
    );

    await page.goto('/book');
    await page.waitForLoadState('networkidle');

    // Wait for the booking form to appear
    await expect(page.locator('input[id="book-email"]')).toBeVisible({ timeout: 10000 });

    // Fill in email and blur
    const emailInput = page.locator('input[id="book-email"]');
    await emailInput.pressSequentially('test@example.com');
    await emailInput.blur();

    // Wait for the CRM request
    await page.waitForTimeout(500);

    const partialEvent = crmRequests.find((r: any) => r.type === 'lead.partial');
    expect(partialEvent).toBeDefined();
    expect((partialEvent as any).email).toBe('test@example.com');
  });

  test('does not emit lead.partial for invalid email', async ({ page }) => {
    const crmRequests: unknown[] = [];

    await page.route('/api/crm/event', async (route) => {
      crmRequests.push(route.request().postDataJSON());
      await route.fulfill({ status: 202, body: JSON.stringify({ ok: true }) });
    });

    // Pre-populate cart in localStorage
    await page.addInitScript(
      ({ cartKey, cartValue }: { cartKey: string; cartValue: string }) => {
        localStorage.setItem(cartKey, cartValue);
        localStorage.setItem('fl360_cookie_consent', 'accepted');
      },
      { cartKey: CART_STORAGE_KEY, cartValue: buildCart() }
    );

    await page.goto('/book');
    await page.waitForLoadState('networkidle');

    // Wait for the booking form to appear
    await expect(page.locator('input[id="book-email"]')).toBeVisible({ timeout: 10000 });

    const emailInput = page.locator('input[id="book-email"]');
    await emailInput.pressSequentially('notanemail');
    await emailInput.blur();

    await page.waitForTimeout(500);

    const partialEvent = crmRequests.find((r: any) => r.type === 'lead.partial');
    expect(partialEvent).toBeUndefined();
  });
});
