import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginSubmitButton: Locator;
  readonly navMenu: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly loginError: Locator;
  readonly loginForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator('[data-test="nav-sign-in"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginSubmitButton = page.locator('[data-test="login-submit"]');
    this.navMenu = page.locator('[data-test="nav-menu"]');
    this.emailError = page.locator('[data-test="email-error"] div');
    this.passwordError = page.locator('[data-test="password-error"] div');
    this.loginError = page.locator('[data-test="login-error"] div');
    this.loginForm = page.locator('[data-test="login-form"]');
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/login');
    await this.assertIsTheLoginPage();
  }

  async login(email: string, password: string) {
    //await this.signInButton.click();
    await this.emailInput.clear();
    await this.passwordInput.clear();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginSubmitButton.click();
  }

  async assertLoginSuccess(name: string) {
    await expect(this.navMenu).toBeVisible({ timeout: 20000 });
    await expect(this.navMenu).toContainText(name);
    //falta
  }

  async assertLoginError() {
    await expect(this.loginError).toBeVisible();
    await expect(this.loginError).toContainText('Invalid email or password');
  }

  async assertEmailEmptyError() {
    await expect(this.emailError).toBeVisible();
    await expect(this.emailError).toContainText('Email is required');
  }

  async assertPasswordEmptyError() {
    await expect(this.passwordError).toBeVisible();
    await expect(this.passwordError).toContainText('Password is required');
  }

  async assertInvalidEmailFormatError() {
    await expect(this.emailError).toBeVisible();
    await expect(this.emailError).toContainText('Email format is invalid');
  }

  async assertIsTheLoginPage() {
    //await expect(this.loginForm).toBeVisible({ timeout: 15000 });
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

}
