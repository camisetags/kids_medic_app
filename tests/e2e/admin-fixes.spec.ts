import { test, expect, type Page } from '@playwright/test';
import { pickAdminSlot } from './admin-helpers';
async function prepareDateFilter(page: Page) {
  await page.goto('/#/admin');
  const select = page.getByLabel('Data', { exact: true });
  await select.selectOption({ index: 1 });
  return { value: await select.inputValue(), label: await select.locator('option:checked').innerText() };
}
async function moveFirstVisit(page: Page) {
  await page.getByRole('article').first().getByRole('button', { name: 'Remarcar', exact: true }).click();
  await pickAdminSlot(page);
  await page.getByRole('button', { name: 'Salvar alteração', exact: true }).click();
}
test('data selecionada continua visível após remarcar a última consulta daquele dia', async ({ page }) => {
  const selected = await prepareDateFilter(page);
  await moveFirstVisit(page);
  await expect(page.getByLabel('Data', { exact: true })).toHaveValue(selected.value);
  await expect(page.getByLabel('Data', { exact: true }).locator('option:checked')).toHaveText(selected.label);
  await expect(page.getByRole('heading', { name: 'Nenhuma consulta encontrada', exact: true })).toBeVisible();
});
test('agenda foca dia e horário quando faltam na confirmação', async ({ page }) => {
  await page.goto('/#/admin');
  await page.getByRole('button', { name: 'Nova consulta', exact: true }).click();
  await page.getByLabel('Criança', { exact: true }).selectOption('clara');
  await page.getByRole('button', { name: 'Salvar consulta', exact: true }).click();
  await expect(page.getByRole('group', { name: 'Dia', exact: true })).toBeFocused();
});

test('agenda foca horário quando apenas a hora falta', async ({ page }) => {
  await page.goto('/#/admin');
  await page.getByRole('button', { name: 'Nova consulta', exact: true }).click();
  await page.getByLabel('Criança', { exact: true }).selectOption('clara');
  await page.getByTestId('available-day').first().click();
  await page.getByRole('button', { name: 'Salvar consulta', exact: true }).click(); await expect(page.getByRole('group', { name: 'Horário', exact: true })).toBeFocused();
});
