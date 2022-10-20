import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/'); // http://localhost:3000
});

test.describe('Register', () => {
  test('should show Password Vault in title and Register', async ({ page }) => {
    await expect(page).toHaveTitle(/Password Vault/);
    await expect(page.getByRole('heading')).toHaveText('Register');
  });
});
