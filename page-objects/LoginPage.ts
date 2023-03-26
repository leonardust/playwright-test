import { Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly errorMessage: Locator
  readonly loginForm: Locator

  constructor(page: Page) {
    super(page)
    this.usernameInput = page.locator('#user-name')
    this.passwordInput = page.locator('#password')
    this.submitButton = page.locator('#login-button')
    this.errorMessage = page.locator('[data-test="error"]')
    this.loginForm = page.locator('.login-box')
  }

  async login(username: string, password: string) {
    await this.usernameInput.type(username)
    await this.passwordInput.type(password)
    await this.submitButton.click()
  }
}
