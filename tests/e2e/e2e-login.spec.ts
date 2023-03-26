import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { Navbar } from '../../page-objects/components/Navbar'

test.describe.parallel('Login / Logout Flow', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let navbar: Navbar

  // Before Hook
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    navbar = new Navbar(page)
    await page.goto('/')
  })

  test('Login as standard user', async () => {
    // perform login
    await loginPage.login('standard_user', 'secret_sauce')

    // assert home page and navbar
    await expect(navbar.burgerMenu).toBeVisible()
    await expect(navbar.shoopingCart).toBeVisible()
    await expect(homePage.inventoryList).toBeVisible()
    await expect(homePage.productSortContainer).toBeVisible()

    // perform logout
    await navbar.selectBurgerMenuOption('Logout')

    // assert logout
    await expect(loginPage.submitButton).toBeVisible()
  })

  test('Login as problem user', async () => {
    // perform login
    await loginPage.login('problem_user', 'secret_sauce')

    // assert home page and navbar
    await expect(navbar.burgerMenu).toBeVisible()
    await expect(navbar.shoopingCart).toBeVisible()
    await expect(homePage.inventoryList).toBeVisible()
    await expect(homePage.productSortContainer).toBeVisible()

    // perform logout
    await navbar.selectBurgerMenuOption('Logout')

    // assert logout
    await expect(loginPage.submitButton).toBeVisible()
  })

  test('Login as performance glitch user', async () => {
    // perform login
    await loginPage.login('problem_user', 'secret_sauce')

    // assert home page and navbar
    await expect(navbar.burgerMenu).toBeVisible()
    await expect(navbar.shoopingCart).toBeVisible()
    await expect(homePage.inventoryList).toBeVisible()
    await expect(homePage.productSortContainer).toBeVisible()

    // perform logout
    await navbar.selectBurgerMenuOption('Logout')

    // assert logout
    await expect(loginPage.submitButton).toBeVisible()
  })

  test('Login as locked out user', async () => {
    // perform login
    await loginPage.login('locked_out_user', 'secret_sauce')

    // assert
    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Sorry, this user has been locked out.'
    )
  })

  test('Login with empty credentials', async () => {
    // perform login
    await loginPage.login('', '')

    // assert
    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Username is required'
    )
  })

  test('Login with empty password', async () => {
    // perform login
    await loginPage.login('standard_user', '')

    // assert
    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Password is required'
    )
  })

  test('Login with empty username', async () => {
    // perform login
    await loginPage.login('', 'secret_sauce')

    // assert
    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Username is required'
    )
  })

  test('Login with wrong username and valid password', async () => {
    // perform login
    await loginPage.login('standard_uer', 'secret_sauce')

    // assert
    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    )
  })

  test('Login with valid username and wrong password', async () => {
    // perform login
    await loginPage.login('standard_user', 'secet_sauce')

    // assert
    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    )
  })

  test('Login with wrong username and wrong password', async () => {
    // perform login
    await loginPage.login('standard_uer', 'secet_sauce')

    // assert
    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Username and password do not match any user in this service'
    )
  })
})
