import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  timeout: 30000,
  retries: 0,
  testDir: '../tests/e2e',
  use: {
    baseURL: 'https://www.saucedemo.com/',
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'Webkit',
      use: { browserName: 'webkit' },
    },
  ],
  reporter: [
    ['junit', { outputFile: '../junit-results/e2e-test-results.xml-report' }],
  ],
}

export default config
