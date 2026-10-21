import { expect, test, type Page } from '@playwright/test';
import { prepareBookingReview } from './helpers';
async function assertAccount(page: Page) {
  const account = page.getByRole('region', { name: 'Conta de exemplo' });
  await expect(account).toContainText('ResponsávelMarina');
  await expect(account).toContainText('CriançaClara · 9 meses');
}
test('área da família identifica responsável e criança sem assumir a identidade do visitante', async ({ page }) => {
  await page.goto('/#/familia');
  await assertAccount(page);
  await expect(page.getByRole('heading', { name: 'Resumo', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Agendar consulta', exact: true })).toBeVisible();
});
async function assertConfirmation(page: Page) {
  await expect(page.getByRole('heading', { name: 'Agendamento confirmado', exact: true })).toBeVisible();
  await expect(page.getByRole('main')).toContainText('Clara');
  await expect(page.getByRole('main')).toContainText('09:00');
  await page.getByRole('link', { name: 'Ver consulta', exact: true }).click();
  await expect(page).toHaveURL(/#\/familia\/consultas$/);
}
test('confirmação resume a consulta e leva diretamente às consultas', async ({ page }) => {
  await prepareBookingReview(page);
  await assertAccount(page);
  await page.getByRole('button', { name: 'Confirmar agendamento', exact: true }).click();
  await assertConfirmation(page);
  await expect(page.locator('.appointment-row').filter({ hasText: 'Primeira consulta' })).toContainText('Clara');
});
