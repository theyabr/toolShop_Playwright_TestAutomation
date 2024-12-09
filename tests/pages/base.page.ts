// pages/home.page.ts
// I tried to implement base page but the actions were executing 
// too fast without waiting so I kept but it is not on the rest of the code

import { Locator, Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToUrl(url: string) {
    await this.page.goto(url);
  }

  async clickElement(element: Locator) {
    await element.click();
  }

  async fillFormField(element: Locator, value: string) {
    await element.fill(value);
  }

  async selectOption(element: Locator,value: string){
    await element.selectOption(value);
  }

  async waitForElementVisibility(element: Locator) {
    await expect(element).toBeVisible();
  }

  async waitForElementHidden(element: Locator) {
    await expect(element).toBeHidden();
  }

  async verifyElementContainsText(element: Locator, value: string) {
    await expect(element).toContainText(value);
  }
  
  async takeScreenshot(filename: string) {
    await this.page.screenshot({path: filename});
  }
  
}