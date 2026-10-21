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
import { createNote, editNote, deleteNote } from './helpers';
test('anotações persistem e podem ser removidas', async ({ page }) => {
  await page.goto('/#/familia/anotacoes');
  await createNote(page, 'Pergunta de exemplo', 'Conversar na próxima consulta.');
  await editNote(page, 'Pergunta de exemplo', 'Pergunta revisada');
  await page.reload();
  await deleteNote(page, 'Pergunta revisada');
});
test('editor apresenta marcação como texto literal', async ({ page }) => {
  await page.goto('/#/familia/anotacoes');
  await createNote(page, 'Texto literal', '<script>exemplo</script>');
  await expect(page.getByTestId('note-body').first()).toHaveText('<script>exemplo</script>');
});
