/** @type {import('@playwright/test').PlaywrightTestConfig} */

const isCI = !!process.env.CI;

const config = {
  testDir: './tests',

  use: {
    baseURL: 'https://dev.fleetdrive360.com',

    // Headless on CI, headed locally
    headless: isCI ? true : false,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  reporter: isCI
    ? [
        ['list'],
        ['allure-playwright']
      ]
    : [
        ['list'],
        ['html', { open: 'always' }]
      ],
};

module.exports = config;