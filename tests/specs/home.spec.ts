// tests/home.spec.ts

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
});

test('Filter by Hammer checkbox option', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.filterByHammer();
    await homePage.assertFirstProductNameIs('Claw Hammer with Shock Reduction Grip');

    for (let i = 0; i < await homePage.productName.count(); i++) {
        await homePage.assertProductNameContains('HAMMER', i);
    }
});

test('Filter by sort option', async ({ page }) => {
    const homePage = new HomePage(page);

    await expect(homePage.sortSelect).toContainText('Name (A - Z)Name (Z - A)Price (High - Low)Price (Low - High)');
    await homePage.assertFirstProductNameIs('Combination Pliers');

    await homePage.sortBy('name,asc');
    await homePage.assertFirstProductNameIs('Adjustable Wrench');

    await homePage.sortBy('name,desc');
    await homePage.assertFirstProductNameIs('Wood Saw');

    await homePage.sortBy('price,desc');
    await homePage.assertFirstProductNameIs('Drawer Tool Cabinet');

    await homePage.sortBy('price,asc');
    await homePage.assertFirstProductNameIs('Washers');
});

/* test('Filter by price option', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.sortBy('price,desc');
    await homePage.assertFirstProductNameIs('Drawer Tool Cabinet');

    await homePage.filterByPrice('200');

    await page.waitForTimeout(15000);

    await homePage.assertFirstProductNameIs('Workbench with Drawers');
}); */

/* test('Filter by search option', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.searchFor('hammer');
    await homePage.assertFirstProductNameIs('Claw Hammer with Shock Reduction Grip');
}); */

/* test('Test Categories dropdown selector', async ({ page }) => {
    const homePage = new HomePage(page);
  
    await expect(homePage.categoriesDropdown).toContainText('Categories');
  
    await homePage.selectCategory('handTools');
    await homePage.assertPageTitleIs('Category: Hand Tools');
  
    await homePage.selectCategory('powerTools');
    await homePage.assertPageTitleIs('Category: Power Tools');
  
    await homePage.selectCategory('other');
    await homePage.assertPageTitleIs('Category: Other');
  
    await homePage.selectCategory('specialTools');
    await homePage.assertPageTitleIs('Category: Special Tools');
  
    await homePage.selectCategory('rentals');
    await homePage.assertPageTitleIs('Rentals');
  }); */

  