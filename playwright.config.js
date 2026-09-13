// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  use: {
    headless: false,
    actionTimeout: 10000, // 10 seconds
    navigationTimeout: 30000, // 30 seconds
    screenshot: 'on',
    trace: 'on',
    
  },

  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  
});