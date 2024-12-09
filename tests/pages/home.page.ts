// pages/home.page.ts

import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';


export class HomePage {
  readonly page: Page;
  readonly filterSelect: Locator;
  readonly sortSelect: Locator;
  readonly priceSlider: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productName: Locator;
  readonly categoriesDropdown: Locator;
  readonly handToolsOption: Locator;
  readonly powerToolsOption: Locator;
  readonly otherOption: Locator;
  readonly specialToolsOption: Locator;
  readonly rentalsOption: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterSelect = page.locator('#filters');
    this.sortSelect = page.locator('[data-test="sort"]');
    this.priceSlider = page.getByRole('slider', { name: 'ngx-slider-max' });
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.productName = page.locator('[data-test="product-name"]');
    this.categoriesDropdown = page.locator('[data-test="nav-categories"]');
    this.handToolsOption = page.locator('[data-test="nav-hand-tools"]');
    this.powerToolsOption = page.locator('[data-test="nav-power-tools"]');
    this.otherOption = page.locator('[data-test="nav-other"]');
    this.specialToolsOption = page.locator('[data-test="nav-special-tools"]');
    this.rentalsOption = page.locator('[data-test="nav-rentals"]');
    this.pageTitle = page.locator('[data-test="page-title"]');
  }

  async goto() {
    await this.page.goto('https://practicesoftwaretesting.com/');
  }

  async filterByHammer() {
    await this.filterSelect.getByText('Hammer').click();
  }

  async sortBy(option: string) {
    await this.sortSelect.selectOption(option);
  }

  async filterByPrice(price: string) {
    await this.priceSlider.click();
    await this.priceSlider.evaluate((node) => {
      (node as HTMLInputElement).ariaValueNow = price;
      node.dispatchEvent(new Event('change'));
    });
  }

  async searchFor(query: string) {
    await this.searchInput.click();
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async assertProductNameContains(text: string, index: number = 0) {
    const productNames = this.productName.nth(index);
    const textContent = await productNames.textContent();
    if (textContent !== null) {
      expect(textContent.toUpperCase()).toContain(text.toUpperCase());
    }
  }

  async assertFirstProductNameIs(name: string) {
    await expect(this.productName.first()).toContainText(name);
  }

  async selectCategory(category: 'handTools' | 'powerTools' | 'other' | 'specialTools' | 'rentals') {
    await this.categoriesDropdown.click();
    switch (category) {
      case 'handTools':
        await this.handToolsOption.click();
        break;
      case 'powerTools':
        await this.powerToolsOption.click();
        break;
      case 'other':
        await this.otherOption.click();
        break;
      case 'specialTools':
        await this.specialToolsOption.click();
        break;
      case 'rentals':
        await this.rentalsOption.click();
        break;
    }
  }

  async assertPageTitleIs(title: string) {
    await expect(this.pageTitle).toContainText(title);
  }
}