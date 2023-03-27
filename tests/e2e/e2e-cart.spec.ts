import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'
import { Navbar } from '../../page-objects/components/Navbar'
import { CartPage } from '../../page-objects/CartPage'

test.describe.parallel('Cart', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let navbar: Navbar
  let cartPage: CartPage

  // Before Hook
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    navbar = new Navbar(page)
    cartPage = new CartPage(page)
    await page.goto('/')
    await loginPage.login('standard_user', 'secret_sauce')
  })

  test('Add single product to the Cart', async () => {
    // add product
    await homePage.addProductToCart('Sauce Labs Backpack')

    // assert assert product page
    expect(await homePage.removeButtonForProductExist('Sauce Labs Backpack'))
    expect(await navbar.getNumberOfProductsInShoppingCartBadge()).toEqual('1')

    // go to the cart
    await navbar.shoopingCart.click()

    // assert cart page
    expect(await cartPage.cartQuantity.count()).toEqual(1)
  })

  test('Add multiple products to the Cart', async () => {
    // add product
    await homePage.addProductToCart('Sauce Labs Backpack')
    await homePage.addProductToCart('Sauce Labs Bolt T-Shirt')

    // assert product page
    expect(await homePage.removeButtonForProductExist('Sauce Labs Backpack'))
    expect(
      await homePage.removeButtonForProductExist('Sauce Labs Bolt T-Shirt')
    )
    expect(await navbar.getNumberOfProductsInShoppingCartBadge()).toEqual('2')

    // go to the cart
    await navbar.shoopingCart.click()

    // assert cart page
    expect(await cartPage.cartQuantity.count()).toEqual(2)
  })
})
