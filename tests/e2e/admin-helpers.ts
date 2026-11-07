import { expect, type Page } from '@playwright/test';
export async function newChild(page: Page, name = 'Lucas') {
  await page.goto('/#/admin/criancas');
  await page.getByRole('button', { name: 'Nova criança', exact: true }).click();
  await fillChild(page, name);
  await page.getByRole('button', { name: 'Salvar criança', exact: true }).click();
}
export async function scheduleChild(page: Page, name = 'Lucas') {
  await page.getByRole('link', { name: 'Agenda', exact: true }).click();
  await page.getByRole('button', { name: 'Nova consulta', exact: true }).click();
  await page.getByLabel('Criança', { exact: true }).selectOption({ label: name });
  await pickAdminSlot(page);
  await page.getByRole('button', { name: 'Salvar consulta', exact: true }).click();
}
export async function pickAdminSlot(page: Page) {
  await page.getByTestId('available-day').first().click();
  await page.getByRole('button', { name: '09:00', exact: true }).click();
}
export async function viewFamily(page: Page, name = 'Lucas') {
  await page.goto('/#/admin/criancas');
  await page.getByRole('article').filter({ hasText: name }).getByRole('button', { name: 'Ver como família', exact: true }).click();
  await expect(page.getByRole('region', { name: 'Conta de exemplo' })).toContainText(name);
}
export async function returnToAdmin(page: Page) {
  await page.getByRole('link', { name: 'Admin da demonstração', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Agenda', exact: true })).toBeVisible();
}

async function fillChild(page: Page, name: string) {
  await page.getByLabel('Nome da criança', { exact: true }).fill(name);
  await page.getByLabel('Idade em meses', { exact: true }).fill('24');
  await page.getByLabel('Responsável', { exact: true }).fill('Ana');
}
