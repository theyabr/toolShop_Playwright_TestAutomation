// pages/checkout.page.ts

import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly productAddedMessage: Locator;
    readonly cartNavigation: Locator;
    readonly proceed1Button: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginSubmitButton: Locator;
    readonly loginMessage: Locator;
    readonly proceed2Button: Locator;
    readonly addressInput: Locator;
    readonly proceed3Button: Locator;
    readonly paymentMethodSelect: Locator;
    readonly creditCardNumberInput: Locator;
    readonly invalidCardNumberMessage: Locator;
    readonly expirationDateInput: Locator;
    readonly cvvInput: Locator;
    readonly cardHolderNameInput: Locator;
    readonly confirmPaymentButton: Locator;
    readonly finishButton: Locator;
    readonly paymentSuccessMessage: Locator;
    readonly orderConfirmationMessage: Locator;
    readonly productTitleInCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.locator('[data-test="add-to-cart"]');
        this.productAddedMessage = page.getByLabel('Product added to shopping');
        this.cartNavigation = page.locator('[data-test="nav-cart"]');
        this.productTitleInCart = page.locator('[data-test="product-title"]');
        this.proceed1Button = page.locator('[data-test="proceed-1"]');
        this.emailInput = page.locator('[data-test="email"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginSubmitButton = page.locator('[data-test="login-submit"]');
        this.loginMessage = page.locator('app-login');
        this.proceed2Button = page.locator('[data-test="proceed-2"]');
        this.addressInput = page.locator('[data-test="address"]');
        this.proceed3Button = page.locator('[data-test="proceed-3"]');
        this.paymentMethodSelect = page.locator('[data-test="payment-method"]');
        this.creditCardNumberInput = page.locator('[data-test="credit_card_number"]');
        this.invalidCardNumberMessage = page.locator('app-payment');
        this.expirationDateInput = page.locator('[data-test="expiration_date"]');
        this.cvvInput = page.locator('[data-test="cvv"]');
        this.cardHolderNameInput = page.locator('[data-test="card_holder_name"]');
        this.confirmPaymentButton = page.locator('app-payment div').filter({ hasText: 'Confirm' }).nth(3);
        this.finishButton = page.locator('[data-test="finish"]');
        this.paymentSuccessMessage = page.locator('app-payment');
        this.orderConfirmationMessage = page.locator('#order-confirmation');
    }

    async goto() {
        await this.page.goto('https://practicesoftwaretesting.com/checkout');
    }

    async addProductToCart(productName: string) {
        await this.page.getByText(productName).click();
        await this.addToCartButton.click();
        await expect(this.productAddedMessage).toContainText('Product added to shopping cart.');
        await expect(this.productAddedMessage).toBeHidden({ timeout: 20000 });
        await this.proceedToCart();
        await this.assertProductIsInCart(productName);
    }

    async assertProductIsInCart(productName: string) {
        await expect(this.productTitleInCart).toContainText(productName);
    }

    async proceedToCart() {
        await this.cartNavigation.click();
        await expect(this.proceed1Button).toBeVisible({ timeout: 20000 });
        await this.proceed1Button.click();
    }

    async assertAfterLoginCheckout() {
        await expect(this.loginMessage).toContainText('Hello Tester Testing, you are already logged in. You can proceed to checkout.');
    }

    async proceedToAddress() {
        await this.proceed2Button.click();
        await this.addressInput.click();
        await this.proceed3Button.click();
    }

    async selectPaymentMethod(method: string) {
        await this.paymentMethodSelect.selectOption(method);
    }

    async fillCreditCardDetails(cardNumber: string, expirationDate: string, cvv: string, cardHolderName: string) {
        await this.creditCardNumberInput.fill(cardNumber);
        await this.expirationDateInput.fill(expirationDate);
        await this.cvvInput.fill(cvv);
        await this.cardHolderNameInput.fill(cardHolderName);
    }

    async confirmPayment() {
        await this.confirmPaymentButton.click();
    }

    async finishOrder() {
        await this.finishButton.click();
    }

    async assertInvalidCardNumber() {
        await expect(this.invalidCardNumberMessage).toContainText('Invalid card number format.');
    }

    async assertPaymentSuccess() {
        await expect(this.paymentSuccessMessage).toContainText('Payment was successful');
    }

    async assertOrderConfirmation() {
        await expect(this.orderConfirmationMessage).toContainText('Thanks for your order! Your invoice number is');
    }


}

