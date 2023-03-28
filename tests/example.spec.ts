import { test, expect } from '@playwright/test'
import { loadHomePage, assertTitle, makeScreenshot } from '../utils/helpers'

test('Simple basic test', async ({ page }) => {
  await page.goto('https://www.example.com')

  const pageTitle = page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
})

test('Clicking on the Elements', async ({ page }) => {
  await page.goto('http://zero.webappsecurity.com/index.html')
  await page.click('#signin_button')
  await page.click('input[type="submit"]')

  const errorMessage = page.locator('.alert-error')
  await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.describe('My first Test Suite @mySuiteTag', () => {
  test('Working with inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')

    await page.type('#user_login', 'someUsername')
    await page.type('#user_password', 'someUserPassword')
    await page.click('input[type="submit"]')

    const errorMessage = page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
  })

  test('Assertions @myTestTag', async ({ page }) => {
    await page.goto('https://www.example.com')
    await expect(page).toHaveURL('https://www.example.com')
    await expect(page).toHaveTitle('Example Domain')

    const element = page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText('Example Domain')
    await expect(element).toHaveCount(1)

    const nonExistingElement = page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
  })
})

test.describe.parallel('Hooks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.example.com')
  })

  test('Full page screenshot', async ({ page }) => {
    await makeScreenshot(page)
  })

  test('Single element screenshot', async ({ page }) => {
    const element = page.locator('h1')
    await element.screenshot({ path: 'single_screenshot.png' })
  })
})

test('Custom helpers', async ({ page }) => {
  await loadHomePage(page)
  await assertTitle(page)
})
