import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page, request }) => {
  await request.post('http://localhost:4000/api/testing/reset'); // Reset db for testing

  await page.goto('/'); // http://localhost:3000/
});

const TEST_USER = {
  email: 'e2e@test.com',
  password: 'hashedPassword',
};

test.describe('Register', () => {
  test('should show Password Vault in title and Register', async ({ page }) => {
    await expect(page).toHaveTitle(/Password Vault/);
    await expect(page.getByRole('heading')).toHaveText('Register');
  });

  test('should register user with valid email and password', async ({
    page,
  }) => {
    await page.locator('data-test=email-input').fill(TEST_USER.email);
    await page.locator('data-test=password-input').fill(TEST_USER.password);
    await page.locator('data-test=register-btn').click();
    await expect(page.getByRole('heading')).toHaveText('Vault');
  });
});
