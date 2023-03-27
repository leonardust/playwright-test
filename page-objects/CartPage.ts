import { Locator, Page } from '@playwright/test'

export class CartPage {
  readonly page: Page
  readonly cartQuantity: Locator

  constructor(page: Page) {
    this.page = page
    this.cartQuantity = page.locator('.cart_quantity')
  }
}
