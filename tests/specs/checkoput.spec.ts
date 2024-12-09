// tests/checkout.spec.ts

import { test } from '@playwright/test';
import { CheckoutPage } from '../pages/checkout.page';
import { LoginPage } from '../pages/login.page.ts';
import { HomePage } from '../pages/home.page';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
});

test('Test invalid credit card', async ({ page }) => {
  test.slow();
  const checkoutPage = new CheckoutPage(page);
  const loginPage = new LoginPage(page);
  await checkoutPage.addProductToCart('Combination Pliers');
  await loginPage.login('depay58017@eoilup.com', '123456tttT_');
  await checkoutPage.assertAfterLoginCheckout();
  await checkoutPage.proceedToAddress();
  await checkoutPage.assertProductIsInCart('Combination Pliers');
  await checkoutPage.selectPaymentMethod('credit-card');
  await checkoutPage.fillCreditCardDetails('5425233430109903', '', '', '');
  await checkoutPage.assertInvalidCardNumber();
});

test('Test checkout and payment', async ({ page }) => {
  test.slow();
  const checkoutPage = new CheckoutPage(page);
  const loginPage = new LoginPage(page);
  await checkoutPage.addProductToCart('Combination Pliers');
  await loginPage.login('depay58017@eoilup.com', '123456tttT_');
  await checkoutPage.proceedToAddress();
  await checkoutPage.selectPaymentMethod('credit-card');
  await checkoutPage.fillCreditCardDetails('5425-2334-3010-9903', '04/2026', '123', 'Tester Testing');
  await checkoutPage.confirmPayment();
  await checkoutPage.assertPaymentSuccess();
  await checkoutPage.finishOrder();
  await checkoutPage.assertOrderConfirmation();
});

test.afterEach(async ({ page }) => {
    await page.close();
  });
  