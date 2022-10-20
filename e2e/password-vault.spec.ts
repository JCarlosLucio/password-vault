import { expect, test } from '@playwright/test';

test('homepage has Password Vault in title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Password Vault/);
});
