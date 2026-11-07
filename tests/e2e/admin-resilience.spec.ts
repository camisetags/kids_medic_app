import { test, expect, type Page } from '@playwright/test';
import { newChild, viewFamily } from './admin-helpers';
async function openChildEditor(page: Page) {
  await page.goto('/#/admin/criancas');
  await page.getByRole('button', { name: 'Nova criança', exact: true }).click();
}
test('cadastro inválido mantém formulário e foca primeiro erro', async ({ page }) => {
  await openChildEditor(page);
  await page.getByRole('button', { name: 'Salvar criança', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Preencha');
  await expect(page.getByLabel('Nome da criança', { exact: true })).toBeFocused();
});
test('Escape protege rascunho administrativo', async ({ page }) => {
  await openChildEditor(page); await page.getByLabel('Nome da criança', { exact: true }).fill('Rascunho');
  await page.keyboard.press('Escape');
  await page.getByRole('dialog', { name: 'Descartar alterações?' }).getByRole('button', { name: 'Voltar', exact: true }).click();
  await expect(page.getByLabel('Nome da criança', { exact: true })).toHaveValue('Rascunho');
});
async function draftWithHistory(page: Page) {
  await page.goto('/#/admin');
  await page.getByRole('link', { name: 'Crianças', exact: true }).click();
  await page.getByRole('button', { name: 'Nova criança', exact: true }).click();
  await page.getByLabel('Nome da criança', { exact: true }).fill('Rascunho');
}
test('histórico protege cadastro e descarte permite sair', async ({ page }) => {
  await draftWithHistory(page); await page.goBack();
  await expect(page.getByRole('dialog', { name: 'Descartar alterações?' })).toBeVisible();
  await page.getByRole('button', { name: 'Descartar alterações', exact: true }).click();
  await expect(page).toHaveURL(/#\/admin$/);
});
test('edição de responsável aparece na família', async ({ page }) => {
  await newChild(page);
  await page.getByRole('article').filter({ hasText: 'Lucas' }).getByRole('button', { name: 'Editar', exact: true }).click();
  await page.getByLabel('Responsável', { exact: true }).fill('Bia');
  await page.getByRole('button', { name: 'Salvar criança', exact: true }).click();
  await viewFamily(page); await expect(page.getByRole('region', { name: 'Conta de exemplo' })).toContainText('Bia');
});
test('cadastro continua em memória quando gravação está bloqueada', async ({ page }) => {
  await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new Error('QuotaExceeded'); }; });
  await newChild(page);
  await expect(page.getByRole('heading', { name: 'Lucas', exact: true })).toBeVisible();
  await expect(page.getByRole('status').first()).toContainText('sessão');
});
test('agenda filtra data e situação sem esconder controles', async ({ page }) => {
  await page.goto('/#/admin');
  await page.getByLabel('Data', { exact: true }).selectOption({ index: 1 });
  await expect(page.getByRole('article')).toHaveCount(1);
  await page.getByLabel('Situação', { exact: true }).selectOption('cancelled');
  await expect(page.getByRole('heading', { name: 'Nenhuma consulta encontrada', exact: true })).toBeVisible();
});
test('nome longo cabe no cadastro e no contexto da família no celular', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await newChild(page, 'Criança de exemplo '.repeat(5));
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await viewFamily(page, 'Criança de exemplo');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
