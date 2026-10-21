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
  await page.getByRole('button', { name: 'Confirmar agendamento' }).click();
  await page.getByRole('link', { name: 'Ver consulta' }).click();
  await expect(page).toHaveURL(/#\/familia\/consultas$/);
}
export async function assertVisit(page: Page, date: string) {
  await expect(page.locator('.appointment-row').filter({ hasText: 'Primeira consulta' })).toContainText(date);
  await expect(page.locator('.appointment-row').filter({ hasText: 'Primeira consulta' })).toContainText('09:00');
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
  await page.locator('.appointment-row').filter({ hasText: date }).getByRole('button', { name: 'Cancelar consulta' }).click();
  await page.getByRole('button', { name: 'Cancelar agendamento', exact: true }).click();
}
export async function createNote(page: Page, title: string, body: string) {
  await page.getByRole('button', { name: 'Nova anotação', exact: true }).click();
  await page.getByLabel('Título', { exact: true }).fill(title);
  await page.getByLabel('Anotação', { exact: true }).fill(body);
  await page.getByRole('button', { name: 'Salvar anotação', exact: true }).click();
}
export async function editNote(page: Page, oldTitle: string, newTitle: string) {
  await page.getByRole('button', { name: `Editar ${oldTitle}`, exact: true }).click();
  await page.getByLabel('Título', { exact: true }).fill(newTitle);
  await page.getByRole('button', { name: 'Salvar alterações', exact: true }).click();
}
export async function deleteNote(page: Page, title: string) {
  await page.getByRole('button', { name: `Excluir ${title}`, exact: true }).click();
  await page.getByRole('button', { name: 'Excluir anotação', exact: true }).click();
  await expect(page.getByRole('heading', { name: title, exact: true })).toHaveCount(0);
}
export async function openDirtyDraft(page: Page) {
  await page.goto('/#/familia/anotacoes');
  await page.getByRole('button', { name: 'Nova anotação', exact: true }).click();
  await page.getByLabel('Título', { exact: true }).fill('Rascunho protegido');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Descartar este rascunho?' })).toBeVisible();
}
export async function visitAtWidth(page: Page, route: string, width: number) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(`/#${route}`);
  await expect(page.locator('main h1')).toBeVisible();
}
export async function dirtyDraftWithHistory(page: Page) {
  await page.goto('/#/familia');
  await page.getByRole('link', { name: 'Anotações', exact: true }).click();
  await page.getByRole('button', { name: 'Nova anotação', exact: true }).click();
  await page.getByLabel('Título', { exact: true }).fill('Rascunho protegido pelo histórico');
}
export async function prepareBookingReview(page: Page) {
  await startBooking(page);
  await pickSlot(page);
  await page.getByRole('button', { name: 'Revisar agendamento' }).click();
}
