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
  test('should go to Register page when pressing "Register" in Login page', async ({
    page,
  }) => {
    await expect(page).toHaveTitle(/Password Vault/);
    await page.getByTestId('go-to-register-btn').click();
    await expect(page.getByTestId('form-heading')).toHaveText('Register');
  });

  test('should register user with valid email and password', async ({
    page,
  }) => {
    await page.getByTestId('go-to-register-btn').click();
    await page.getByTestId('email-input').fill(TEST_USER.email);
    await page.getByTestId('password-input').fill(TEST_USER.password);
    await page.getByTestId('register-btn').click();
    await expect(page.locator('#toast-register-success')).toHaveText(
      'Welcome!',
    );
    await expect(page.getByTestId('vault-heading')).toHaveText('Vault');
  });

  test('should fail register if email is taken', async ({ page }) => {
    await page.getByTestId('go-to-register-btn').click();
    await page.getByTestId('email-input').fill(TEST_LOGIN_USER.email);
    await page.getByTestId('password-input').fill(TEST_LOGIN_USER.password);
    await page.getByTestId('register-btn').click();
    await expect(page.locator('#toast-error-title')).toHaveText(
      'An error occurred',
    );
    await expect(page.locator('#toast-error-description')).toHaveText(
      'Email already taken',
    );
    await expect(page.getByTestId('form-heading')).toHaveText('Register');
  });
});

test.describe('Login', () => {
  test('should show Password Vault in title and Login', async ({ page }) => {
    await expect(page).toHaveTitle(/Password Vault/);
    await expect(page.getByTestId('form-heading')).toHaveText('Login');
  });

  test('should go back to Register page when pressing "Register" in Login page', async ({
    page,
  }) => {
    await expect(page.getByTestId('form-heading')).toHaveText('Login');
    await page.getByTestId('go-to-register-btn').click();
    await expect(page.getByTestId('form-heading')).toHaveText('Register');
  });

  test('should login user with valid email and password', async ({ page }) => {
    await page.getByTestId('email-input').fill(TEST_LOGIN_USER.email);
    await page.getByTestId('password-input').fill(TEST_LOGIN_USER.password);
    await page.getByTestId('login-btn').click();
    await expect(page.locator('#toast-login-success')).toHaveText(
      'Welcome back!',
    );
    await expect(page.getByTestId('vault-heading')).toHaveText('Vault');
  });

  test('should fail login if incorrect credentials', async ({ page }) => {
    await page.getByTestId('email-input').fill(TEST_LOGIN_USER.email);
    await page.getByTestId('password-input').fill('wrongpassword');
    await page.getByTestId('login-btn').click();
    await expect(page.locator('#toast-error-title')).toHaveText(
      'An error occurred',
    );
    await expect(page.locator('#toast-error-description')).toHaveText(
      'Invalid email or password',
    );
    await expect(page.getByTestId('form-heading')).toHaveText('Login');
  });
});
