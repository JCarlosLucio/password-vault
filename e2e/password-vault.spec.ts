import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/'); // http://localhost:3000
});

test.describe('Login', () => {
  test('should show Password Vault in title and Login', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Password Vault/);
    expect(page.getByText('Login')).toBeDefined();
  });
});
