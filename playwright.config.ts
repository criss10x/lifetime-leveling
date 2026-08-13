import { defineConfig, devices } from '@playwright/test';

const surface = process.env.PLAYWRIGHT_SURFACE === 'muslim' ? 'muslim' : 'studio';
const port = surface === 'studio' ? 4321 : 4322;
const baseURL = `http://127.0.0.1:${port}`;
const readinessURL = surface === 'muslim' ? `${baseURL}/privacy/` : baseURL;
const executablePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH;

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    ...devices['Desktop Chrome'],
    baseURL,
    ...(executablePath ? { launchOptions: { executablePath } } : {}),
  },
  webServer: {
    command: `node scripts/preview-surface.mjs ${surface} ${port}`,
    url: readinessURL,
    reuseExistingServer: !process.env.CI,
  },
});
