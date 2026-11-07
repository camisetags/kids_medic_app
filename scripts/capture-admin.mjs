import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { newChild, scheduleChild, viewFamily } from '../tests/e2e/admin-helpers.ts';
const output = process.argv[2] ?? '/private/tmp/kids-admin-preview';
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
async function capture(page, name, width) {
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${output}/${name}-${width}.png`, fullPage: true, animations: 'disabled' });
}
async function captureForms(page, width) {
  await page.getByRole('button', { name: 'Nova consulta', exact: true }).click();
  await capture(page, 'new-visit', width);
  await page.getByRole('button', { name: 'Fechar', exact: true }).click();
}
for (const width of [1440, 390]) {
  const page = await browser.newPage({ baseURL: 'http://127.0.0.1:4173', viewport: { width, height: 1000 } });
  await page.goto('/#/admin');
  await capture(page, 'agenda', width);
  await captureForms(page, width);
  await newChild(page);
  await capture(page, 'children', width);
  await scheduleChild(page);
  await capture(page, 'scheduled', width);
  await viewFamily(page);
  await capture(page, 'family', width);
  await page.close();
}
await browser.close();
