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
}
