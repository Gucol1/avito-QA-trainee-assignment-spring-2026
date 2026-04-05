import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  retries: 0,

  use: {
    baseURL: 'https://cerulean-praline-8e5aa6.netlify.app/',
    headless: true,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: 'Android (Pixel 5)',
      use: {
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'iOS (iPhone 12)',
      use: {
        ...devices['iPhone 12'],
      },
    },
  ],
});