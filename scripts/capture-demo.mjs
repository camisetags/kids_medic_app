import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { startBooking, pickSlot } from '../tests/e2e/helpers.ts';
const output = process.argv[2] ?? '/private/tmp/kids-medic-preview';
const baseURL = process.argv[3] ?? 'http://127.0.0.1:4173';
await mkdir(output, { recursive: true });
async function capture(page, name, width) {
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${output}/${name}-${width}.png`, fullPage: true, animations: 'disabled' });
  console.log(`${name}-${width}: ${await page.locator('h1').first().textContent()}`);
}
const browser = await chromium.launch();
for (const width of [1440, 390]) {
  const page = await browser.newPage({ baseURL, viewport: { width, height: 1000 } });
  await page.goto('/');
  await capture(page, 'landing', width);
  await startBooking(page);
  await pickSlot(page);
  await capture(page, 'schedule', width);
  await page.getByRole('button', { name: 'Revisar agendamento' }).click();
  await capture(page, 'review', width);
  await page.getByRole('button', { name: 'Confirmar simulação' }).click();
  await capture(page, 'confirmation', width);
  await page.getByRole('link', { name: 'Ir para a área da família' }).click();
  await page.getByTestId('next-appointment').waitFor();
  await capture(page, 'family', width);
  await page.goto('/#/familia/fases');
  await capture(page, 'stages', width);
  await page.goto('/#/familia/anotacoes');
  await capture(page, 'notes', width);
  await page.getByRole('button', { name: 'Nova anotação', exact: true }).click();
  await page.getByRole('dialog', { name: 'Nova anotação' }).waitFor();
  await capture(page, 'editor', width);
  await page.close();
}
await browser.close();
