import { expect, test } from '@playwright/test';

import { hashPassword } from '../apps/client/src/utils/crypto';

const TEST_USER = {
  email: 'e2e@test.com',
  password: 'hashedPassword',
};

const TEST_LOGIN_USER = {
  email: 'test@test.com',
  password: '123456',
};

test.beforeEach(async ({ page, request }) => {
  await request.post('http://localhost:4000/api/testing/reset'); // Reset db for testing

  // register user
  await request.post('http://localhost:4000/api/users', {
    data: {
      email: TEST_LOGIN_USER.email,
      hashedPassword: hashPassword(TEST_LOGIN_USER.password),
    },
  });

  await page.goto('/'); // http://localhost:3000/
});

test.describe('Register', () => {
  test('should show Password Vault in title and Register', async ({ page }) => {
    await expect(page).toHaveTitle(/Password Vault/);
    await expect(page.getByRole('heading')).toHaveText('Register');
  });

  test('should register user with valid email and password', async ({
    page,
  }) => {
    await page.getByTestId('email-input').fill(TEST_USER.email);
    await page.getByTestId('password-input').fill(TEST_USER.password);
    await page.getByTestId('register-btn').click();
    await expect(page.getByRole('heading')).toHaveText('Vault');
  });
});

test.describe('Login', () => {
  test('should go to Login page when pressing "Login" in Register page', async ({
    page,
  }) => {
    await page.getByTestId('go-to-login-btn').click();
    await expect(page.getByRole('heading')).toHaveText('Login');
  });

  test('should go back to Register page when pressing "Register" in Login page', async ({
    page,
  }) => {
    await page.getByTestId('go-to-login-btn').click();
    await expect(page.getByRole('heading')).toHaveText('Login');
    await page.getByTestId('go-to-register-btn').click();
    await expect(page.getByRole('heading')).toHaveText('Register');
  });

  test('should login user with valid email and password', async ({ page }) => {
    await page.getByTestId('go-to-login-btn').click();
    await page.getByTestId('email-input').fill(TEST_LOGIN_USER.email);
    await page.getByTestId('password-input').fill(TEST_LOGIN_USER.password);
    await page.getByTestId('login-btn').click();
    await expect(page.getByRole('heading')).toHaveText('Vault');
  });
});
