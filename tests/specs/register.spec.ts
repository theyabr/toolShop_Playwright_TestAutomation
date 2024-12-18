import { test as base } from '@playwright/test';
import { RegisterPage } from '../pages/register.page.ts';
import { LoginPage } from '../pages/login.page.ts';

// fixture to create a user before the first test
const test = base.extend<{ existentUser: void }>({
  existentUser: async ({ browser }, use) => { 
    const page = await browser.newPage();
    const registerPage = new RegisterPage(page);
    await registerPage.createUser(
      'Tester',
      'Testing',
      '1997-02-07',
      'Main Street',
      '2222333',
      'Porto',
      'Porto',
      'PT',
      '222333222',
      'depay58017@eoilup.com',
      '123456tttT_'
    );
    await page.close();
    await use();
  },
});

test.beforeEach(async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
});

test('Register an already existent user', async ({ page, existentUser }) => {
  test.slow();
  const registerPage = new RegisterPage(page);
  await registerPage.fillForm(
    'Tester',
    'Testing',
    '1997-02-07',
    'Main Street',
    '2222333',
    'Porto',
    'Porto',
    'PT',
    '222333222',
    'depay58017@eoilup.com',
    '123456tttT_'
  );
  await registerPage.registerSubmit.click();
  await registerPage.assertRegisterError();
});

test('Register a valid user', async ({ page }) => {
  test.slow();
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  const email = `user${randomNumber}@example.com`;

  await registerPage.fillForm(
    'Tester',
    'Testing',
    '1997-02-07',
    'Main Street',
    '2222333',
    'Porto',
    'Porto',
    'PT',
    '222333222',
    email,
    '123456tttT_'
  );
  await registerPage.registerSubmit.click();
  await loginPage.assertIsTheLoginPage();
});