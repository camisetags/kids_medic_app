import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e', timeout: 15000, use: { baseURL: 'http://127.0.0.1:4173', viewport: { width: 1440, height: 1000 }, timezoneId: 'America/Sao_Paulo', trace: 'retain-on-failure' },
  webServer: [
    { command: 'npm run dev -- --port 4173', url: 'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI },
    { command: 'npm run preview -- --port 4174 --base /kids_medic_app/', url: 'http://127.0.0.1:4174/kids_medic_app/', reuseExistingServer: !process.env.CI },
  ],
  reporter: 'list', workers: 1,
});
