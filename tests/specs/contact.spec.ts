// tests/contact.spec.ts

import { test, expect } from '@playwright/test';
import { ContactPage } from '../pages/contact.page';

test('Send contact message successfully', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.goto();
  await contactPage.sendMessage(
    'Tester',
    'Testing',
    'testertesting@example.com',
    'webmaster',
    '012345678901234567890123456789012345678901234567890123456789'
  );
  await contactPage.assertSuccessMessage();
});

test('Send contact message less than 50 chars', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.goto();
  await contactPage.sendMessage(
    'Tester',
    'Testing',
    'testertesting@example.com',
    'webmaster',
    'Test message.'
  );
  await contactPage.assertErrorMessage('Message must be minimal 50 characters');
});