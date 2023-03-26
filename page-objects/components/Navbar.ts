import { Locator, Page } from '@playwright/test'

export class Navbar {
  readonly page: Page
  readonly burgerMenu: Locator
  readonly shoopingCart: Locator

  constructor(page: Page) {
    this.page = page
    this.burgerMenu = page.locator('#react-burger-menu-btn')
    this.shoopingCart = page.locator('#shopping_cart_container')
  }

  async selectBurgerMenuOption(option: string) {
    await this.burgerMenu.click()
    this.page.getByText(option).click()
  }
}
