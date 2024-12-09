import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.ts'; 

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});

test('Login as a valid user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('depay58017@eoilup.com', '123456tttT_');
  await loginPage.assertLoginSuccess('Tester Testing');
});

test('Login with invalid email and password', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Email com formato inválido
  await loginPage.login('sfdsfdsfds', 'fdsfdsfds');
  await loginPage.assertInvalidEmailFormatError(); 

  // Senha inválida e email com formato correto
  await loginPage.login('depay58018@eoilup.com', 'fdsfdsfds');
  await loginPage.assertLoginError();

  // Login e senha vazios
  await loginPage.login('', '');
  await loginPage.assertEmailEmptyError();
  await loginPage.assertPasswordEmptyError();
});