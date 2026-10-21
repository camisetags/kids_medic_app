import { expect, type Page } from '@playwright/test';
export async function startBooking(page: Page) {
  await page.goto('/#/agendar');
  await page.getByRole('button', { name: /Primeira consulta/ }).click();
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
}
export async function pickSlot(page: Page): Promise<string> {
  const day = page.getByTestId('available-day').first();
  const label = await day.getAttribute('data-label');
  await day.click();
  await page.getByRole('button', { name: '09:00', exact: true }).click();
  return label!;
}
export async function confirmBooking(page: Page) {
  await page.getByRole('button', { name: 'Revisar agendamento' }).click();
  await page.getByRole('button', { name: 'Confirmar simulação' }).click();
  await page.getByRole('link', { name: 'Ir para a área da família' }).click();
}
export async function assertVisit(page: Page, date: string) {
  await expect(page.getByTestId('next-appointment')).toContainText(date);
  await expect(page.getByTestId('next-appointment')).toContainText('09:00');
}
export async function reloadAndAssertVisit(page: Page, date: string) {
  await page.reload();
  await assertVisit(page, date);
}
export async function bookFirstVisit(page: Page) {
  await startBooking(page);
  const date = await pickSlot(page);
  await confirmBooking(page);
  return date;
}
export async function cancelChosenVisit(page: Page, date: string) {
  await page.getByRole('link', { name: 'Consultas', exact: true }).click();
  await page.locator('.appointment-row').filter({ hasText: date }).getByRole('button', { name: 'Cancelar simulação' }).click();
  await page.getByRole('button', { name: 'Cancelar agendamento', exact: true }).click();
}
