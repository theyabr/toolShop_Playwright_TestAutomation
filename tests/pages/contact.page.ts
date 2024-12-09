// pages/contact.page.ts

import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';


export class ContactPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectSelect: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly successAlert: Locator;
  readonly messageError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="first-name"]');
    this.lastNameInput = page.locator('[data-test="last-name"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.subjectSelect = page.locator('[data-test="subject"]');
    this.messageInput = page.locator('[data-test="message"]');
    this.submitButton = page.locator('[data-test="contact-submit"]');
    this.successAlert = page.getByRole('alert');
    this.messageError = page.locator('[data-test="message-error"] div');
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/contact');
  }

  async sendMessage(
    firstName: string,
    lastName: string,
    email: string,
    subject: string,
    message: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.subjectSelect.selectOption(subject);
    await this.messageInput.fill(message);
    await this.submitButton.click();
  }

  async assertSuccessMessage() {
    await expect(this.successAlert).toContainText(
      'Thanks for your message! We will contact you shortly.'
    );
  }

  async assertErrorMessage(message: string) {
    await expect(this.messageError).toContainText(message);
  }
}