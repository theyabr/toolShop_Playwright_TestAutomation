// tests/pages/register.page.ts

import { expect, Locator, Page } from '@playwright/test';


export class RegisterPage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly registerLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dobInput: Locator;
  readonly addressInput: Locator;
  readonly postcodeInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countrySelect: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerSubmit: Locator;
  readonly registerForm: Locator;
  readonly registerError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator('[data-test="nav-sign-in"]');
    this.registerLink = page.locator('[data-test="register-link"]');
    this.firstNameInput = page.locator('[data-test="first-name"]');
    this.lastNameInput = page.locator('[data-test="last-name"]');
    this.dobInput = page.locator('[data-test="dob"]');
    this.addressInput = page.locator('[data-test="address"]');
    this.postcodeInput = page.locator('[data-test="postcode"]');
    this.cityInput = page.locator('[data-test="city"]');
    this.stateInput = page.locator('[data-test="state"]');
    this.countrySelect = page.locator('[data-test="country"]');
    this.phoneInput = page.locator('[data-test="phone"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.registerSubmit =  page.locator('[data-test="register-submit"]');
    this.registerForm = page.locator('[data-test="register-form"]');
    this.registerError = page.locator('[data-test="register-error"]');
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/register');
    await this.assertIsTheRegisterPage();
  }

  async fillForm(
    firstName: string,
    lastName: string,
    dob: string,
    address: string,
    postcode: string,
    city: string,
    state: string,
    country: string,
    phone: string,
    email: string,
    password: string
  ) {
    //await this.signInButton.click();
    //await this.registerLink.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.dobInput.fill(dob);
    await this.addressInput.fill(address);
    await this.postcodeInput.fill(postcode);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.countrySelect.selectOption(country);
    await this.phoneInput.fill(phone);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async assertIsTheRegisterPage() {
    await expect(this.registerForm).toBeVisible();
  }

  async assertRegisterError() {
    await expect(this.registerError).toContainText('A customer with this email address already exists.');
  }
  
}
