import { test, expect } from '@playwright/test';
test('entrada e navegação', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Dra. Dayse Mary', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Demonstração interativa · dados fictícios').first()).toBeVisible();
  await page.getByRole('link', { name: 'Agendar consulta', exact: true }).first().click();
  await expect(page).toHaveURL(/#\/agendar$/);
});
import { startBooking, pickSlot, confirmBooking, assertVisit, reloadAndAssertVisit } from './helpers';
test('agendamento persiste na área da criança', async ({ page }) => {
  await startBooking(page);
  const date = await pickSlot(page);
  await confirmBooking(page);
  await assertVisit(page, date);
  await reloadAndAssertVisit(page, date);
});
import { bookFirstVisit, cancelChosenVisit } from './helpers';
test('cancelamento libera o horário para outra simulação', async ({ page }) => {
  const date = await bookFirstVisit(page);
  await cancelChosenVisit(page, date);
  await startBooking(page);
  expect(await pickSlot(page)).toBe(date);
  await expect(page.getByRole('button', { name: '09:00', exact: true })).toHaveAttribute('aria-pressed', 'true');
});
