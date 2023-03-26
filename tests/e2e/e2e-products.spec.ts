import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { Navbar } from '../../page-objects/components/Navbar'

let expectedProductOrder

test.describe.parallel('Products', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let navbar: Navbar

  // Before Hook
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    navbar = new Navbar(page)
    await page.goto('/')
    await loginPage.login('standard_user', 'secret_sauce')
  })

  test('Filter products by name in ascending order', async () => {
    // filter products
    await homePage.filterProductsBy('Name (A to Z)')

    // assert order
    expectedProductOrder = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
    ]
    expect(await homePage.actualOrderByProduct('name')).toEqual(
      expectedProductOrder
    )
  })

  test('Filter products by name in decending order', async () => {
    // filter products
    await homePage.filterProductsBy('Name (Z to A)')

    // assert order
    expectedProductOrder = [
      'Test.allTheThings() T-Shirt (Red)',
      'Sauce Labs Onesie',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Bike Light',
      'Sauce Labs Backpack',
    ]
    expect(await homePage.actualOrderByProduct('name')).toEqual(
      expectedProductOrder
    )
  })

  test('Filter products by price in ascending order', async () => {
    // filter products
    await homePage.filterProductsBy('Price (low to high)')

    // assert order
    expectedProductOrder = [
      '$7.99',
      '$9.99',
      '$15.99',
      '$15.99',
      '$29.99',
      '$49.99',
    ]
    expect(await homePage.actualOrderByProduct('price')).toEqual(
      expectedProductOrder
    )
  })

  test('Filter products by price in decending order', async () => {
    // filter products
    await homePage.filterProductsBy('Price (high to low)')

    // assert order
    expectedProductOrder = [
      '$49.99',
      '$29.99',
      '$15.99',
      '$15.99',
      '$9.99',
      '$7.99',
    ]
    expect(await homePage.actualOrderByProduct('price')).toEqual(
      expectedProductOrder
    )
  })
})
