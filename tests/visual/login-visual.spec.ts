import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.parallel('Login Page Visual Tests', () => {
  let homePage: HomePage
  let loginPage: LoginPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    await page.goto('/')
  })

  test('Login Form', async () => {
    expect(await loginPage.loginForm.screenshot()).toMatchSnapshot(
      'login-form.png'
    )
  })

  test('Login Error Message', async () => {
    await loginPage.login('invalidUser', 'invalidPassword')
    expect(await loginPage.loginForm.screenshot()).toMatchSnapshot()
  })
})
