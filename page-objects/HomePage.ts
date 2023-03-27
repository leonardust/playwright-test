import { Locator, Page } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly inventoryList: Locator
  readonly productSortContainer: Locator

  constructor(page: Page) {
    this.page = page
    this.inventoryList = page.locator('.inventory_list')
    this.productSortContainer = page.locator(
      '[data-test="product_sort_container"]'
    )
  }

  async filterProductsBy(option: string) {
    await this.productSortContainer.selectOption(option)
  }

  async actualOrderByProduct(option: string) {
    const productsOrder = await this.page
      .locator(`.inventory_item_${option}`)
      .allTextContents()
    return productsOrder
  }

  async addProductToCart(productName: string) {
    let productLocator = productName.replace(/\s+/g, '-').toLowerCase()
    await this.page.locator(`#add-to-cart-${productLocator}`).click()
  }

  async removeProductFromCart(productName: string) {
    let productLocator = productName.replace(/\s+/g, '-').toLowerCase()
    await this.page.locator(`#remove-${productLocator}`).click()
  }

  async removeButtonForProductExist(productName: string) {
    let productLocator = productName.replace(/\s+/g, '-').toLowerCase()
    await this.page.waitForSelector(`#remove-${productLocator}`)
  }
}
