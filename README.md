# Tool Shop Test Automation

**Description:**

This project utilizes Playwright and TypeScript to conduct comprehensive end-to-end testing on the "Tool Shop" web application. It leverages the Page Object Model (POM) design pattern for enhanced code organization, maintainability, and scalability.

**Features:**

* **End-to-end testing with Playwright:** Simulates real user interactions to ensure the application functions correctly as a whole.
* **TypeScript for type safety:**  Provides static typing for improved code quality, maintainability, and early error detection.
* **Page Object Model (POM):** Encapsulates page interactions and elements for better code reusability and reduced maintenance.
* **Test scenarios covered:**
    *  Login functionality with various user credentials and scenarios.
    *  Registration of new users.
    *  Home page interactions, including filtering, sorting, and searching for products.
    *  Contact page form submission and validation.
    *  Category navigation from the homepage.

**Getting Started:**

1. **Prerequisites:**
   * [Node.js](https://nodejs.org/) v18 or higher
   * [npm](https://www.npmjs.com/) v8 or higher
   * [Playwright](https://playwright.dev/docs/intro)

2. **Clone the repository:**

    Inside a folder you want to clone the repository insert in command line:
   ```
   git clone https://github.com/theyabr/toolShop_Playwright_TestAutomation.git
   ```

4. **Install dependencies:**

   Go to the folder you cloned the repository:
   ```
   cd toolShop_Playwright_TestAutomation
   npm install
   ```

6. **Run tests:**

    Use this command to run the tests:
   
   ```
   npx playwright test
   ```

6. **Generate Allure Report:**

After running the tests, use this command to generate the Allure report:
```
allure generate ./test-results --clean -o ./allure-report
```
To open the report in your browser, use:
```
allure open ./allure-report
```

**Project Structure:**
   ```
   ├── tests
   │   ├── pages       # Page Object Model classes
   │   │   ├── checkout.page.ts
   │   │   ├── contact.page.ts
   │   │   ├── home.page.ts
   │   │   ├── login.page.ts
   │   │   └── register.page.ts
   │   └── specs       # Test files
   │       ├── checkout.spec.ts
   │       ├── contact.spec.ts
   │       ├── home.spec.ts
   │       ├── login.spec.ts
   │       └── register.spec.ts
   ├── playwright.config.ts  # Playwright configuration
   └── tsconfig.json         # TypeScript configuration
   ```

**Technologies Used:**

* Playwright
* TypeScript
* Allure report
