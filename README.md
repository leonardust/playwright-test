1. **Project setup:**

   Create package.json

   ```bash
   npm init
   ```

   Install prettier (optional)

   ```bash
   npm install prettier
   ```

   Install playwright

   ```bash
   npm install @playwright/test
   ```

   Install browsers

   ```
   npx playwright install
   ```

2. **Create first test**

   Import test runner and assertions:

   ```typescript
   import { test, expect } from '@playwright/test'
   ```

   Write example test:

   ```typescript
   test('Simple basic test', async ({ page }) => {
     await page.goto('https://www.example.com')
     const pageTitle = await page.locator('h1')
     await expect(pageTitle).toContainText('Example Domain')
   })
   ```

3. **Execute test**

   run test in default headless mode

   ```bash
   npx playwright test
   ```

   run test with browser

   ```bash
   npx playwright test --headed
   ```

   run tests in selected browser

   ```bash
   npx playwright test --browser=firefox
   ```

   run tests in all browsers

   ```bash
   npx playwright test --browser=all
   ```

   run specific test

   ```bash
   npx playwright test tests/example.spec.ts
   ```

   run test with specific tag

   ```bash
   npx playwright test --grep @myTestTag
   ```

   run tests except test with specific tag

   ```bash
   npx playwright test --grep-invert  @myTestTag
   ```

   running test using projects config

   ```bash
   npx playwright test --config=playwright.config.ts --project=Webkit
   ```

4. **Reporters**

   Line reporter

   ```bash
   npx playwright test --config=playwright.config.ts --project=Chromium --reporter=line
   ```

   ```bash
   Running 4 tests using 1 worker

   [4/4] [Chromium] › tests\example.spec.ts:32:7 › My first Test     Suite @mySuiteTag ›

   4 passed (9.9s)
   ```

   List reporter

   ```bash
   npx playwright test --config=playwright.config.ts --project=Chromium --reporter=list
   ```

   ```bash
   Running 4 tests using 1 worker

   ✓ 1 [Chromium] › tests\example.spec.ts:3:5 › Simple basic test (751ms)
   ✓ 2 [Chromium] › tests\example.spec.ts:10:5 › Clicking on the Elements (2.0s)
   ✓ 3 …pec.ts:20:7 › My first Test Suite @mySuiteTag › Working with inputs (2.8s)
   ✓ 4 ….ts:32:7 › My first Test Suite @mySuiteTag › Assertions @myTestTag (661ms)

   4 passed (7.0s)
   ```

   Dot reporter

   ```bash
   npx playwright test --config=playwright.config.ts --project=Chromium --reporter=dot
   ```

   ```bash
   Running 4 tests using 1 worker

   ····

   4 passed (6.9s)
   ```

   Junit reporter

   ```bash
   npx playwright test --config=playwright.config.ts --project=Chromium --reporter=junit
   ```

   ```bash
   <testsuites id="" name="" tests="4" failures="0" skipped="0" errors="0" time="16.84699699997902">
      <testsuite name="tests\example.spec.ts" timestamp="1678030320748" hostname="Chromium" tests="4" failures="0" skipped="0" time="16.105" errors="0">
         <testcase name="Simple basic test" classname="tests\example.spec.ts" time="2.268"></testcase>
         <testcase name="Clicking on the Elements" classname="tests\example.spec.ts" time="2.606"></testcase>
         <testcase name="My first Test Suite @mySuiteTag › Working with inputs" classname="tests\example.spec.ts" time="2.19"></testcase>
         <testcase name="My first Test Suite @mySuiteTag › Assertions @myTestTag" classname="tests\example.spec.ts" time="9.041"></testcase>
      /testsuite>
   </testsuites>
   ```

   Html reporter

   ```bash
   npx playwright test --config=playwright.config.ts --project=Chromium --reporter=html
   ```

   ```bash
   Running 4 tests using 1 worker

   4 passed (7.1s)

   To open last HTML report run:
   npx playwright show-report
   ```

5. **Screenshot**

   Full page screenshot

   ```typescript
   await page.screenshot({ path: 'screenshot.png', fullPage: true })
   ```

   Element screenshot

   ```typescript
   const element = page.locator('h1') {
   await element.screenshot({ path: 'single_screenshot.png
   })

   ```

6. **Custom functions can be stored in helpers.ts**

   ```typescript
   export async function loadHomePage(page) {
     await page.goto('https://www.example.com')
   }
   ```

   }`

   Import custom functions

   ```typescript
   import { loadHomePage, assertTitle, makeScreenshot } from '../helpers'
   ```

7. **Npm scripts package.json**

   ```typescript
   "scripts": {
    "tests:chrome": "playwright test --config=playwright.config.ts --project=Chromium",
    "tests:firefox": "playwright test --config=playwright.config.ts --project=Firefox",
    "tests:webkit": "playwright test --config=playwright.config.ts --project=Webkit"
   }
   ```

   Run npm script

   ```typescript
   npm run tests:webkit
   ```

   Override npm script

   ```typescript
   npm run tests:webkit -- --headed
   ```

8. **Visual testing**

   Full snapshot

   ```typescript
   expect(await page.screenshot()).toMatchSnapshot('homepage.png')
   ```

   Element snapshot

   ```typescript
   const pageElement = await page.$('h1')
   expect(await pageElement.screenshot()).toMatchSnapshot('page-title.png')
   ```

   Update snapshot

   ```typescript
   npx playwright test --config=config/visual.config.ts --project=chromium --update-snapshot
   ```

9. **Tips & Tricks**

   Open page in device emulator

   ```bash
   npx playwright open --device='iPhone 11' wikipedia.org
   ```

   Create pdf from the website

   ```bash
   npx playwright pdf https://www.example.com my-file.pdf
   ```

   Generate customize screenshot

   ```bash
   npx playwright screenshot --device="iPhone 11" --color-scheme=dark --wait-for-timeout=1000 twitter.com twitter-iphone-image.png
   ```

   Emulate Browser Language & Timezone

   ```bash
   npx playwright open --timezone="Europe/Rome" --lang="it-IT" google.com
   ```

   Generate random String
   ```typescript
   import crypto from 'crypto'

   export async function getRandomString() {
      return crypto.randomBytes(20).toString('hex')
   }
   ```

10. **Custom Reporting**



