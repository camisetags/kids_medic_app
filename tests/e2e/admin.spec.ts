import { test, expect } from '@playwright/test';
import { newChild, scheduleChild, viewFamily, returnToAdmin } from './admin-helpers';
test('admin cadastra criança e consulta visível na família e após recarregar', async ({ page }) => {
  await newChild(page);
  await scheduleChild(page);
  await viewFamily(page);
  await expect(page.getByTestId('next-appointment')).toContainText('09:00');
  await assertFamilyReload(page);
});
test('admin não exibe anotações privadas e família selecionada é isolada', async ({ page }) => {
  await page.goto('/#/admin');
  await expect(page.getByText('Para a próxima consulta', { exact: true })).toHaveCount(0);
  await viewFamily(page, 'Theo');
  await page.getByRole('link', { name: 'Anotações', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Nenhuma anotação', exact: true })).toBeVisible();
});
test('admin busca e limpa filtros', async ({ page }) => {
  await page.goto('/#/admin/criancas');
  await page.getByLabel('Buscar criança ou responsável', { exact: true }).fill('sem resultado');
  await expect(page.getByRole('heading', { name: 'Nenhuma criança encontrada', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Limpar busca', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Clara', exact: true })).toBeVisible();
});
test('remarcar e cancelar pelo admin atualiza consulta da família', async ({ page }) => {
  await newChild(page); await scheduleChild(page);
  await page.getByRole('article').filter({ hasText: 'Lucas' }).getByRole('button', { name: 'Remarcar', exact: true }).click();
  await page.getByRole('button', { name: '11:00', exact: true }).click();
  await page.getByRole('button', { name: 'Salvar alteração', exact: true }).click();
  await verifyAndCancel(page);
});
async function verifyAndCancel(page: import('@playwright/test').Page) {
  await viewFamily(page); await expect(page.getByTestId('next-appointment')).toContainText('11:00');
  await returnToAdmin(page);
  await page.getByRole('article').filter({ hasText: 'Lucas' }).getByRole('button', { name: 'Cancelar consulta', exact: true }).click();
  await page.getByRole('button', { name: 'Cancelar agendamento', exact: true }).click();
  await viewFamily(page); await expect(page.getByTestId('next-appointment')).toContainText('Nenhuma consulta agendada');
}

async function assertFamilyReload(page: import('@playwright/test').Page) {
  await page.reload();
  await expect(page.getByRole('region', { name: 'Conta de exemplo' })).toContainText('Ana');
}
