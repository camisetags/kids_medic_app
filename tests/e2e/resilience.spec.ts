import { test, expect } from '@playwright/test';
import { createNote } from './helpers';
test('editor rejeita campos vazios e conserva o rascunho', async ({ page }) => {
  await page.goto('/#/familia/anotacoes');
  await page.getByRole('button', { name: 'Nova anotação', exact: true }).click();
  await page.getByRole('button', { name: 'Salvar anotação', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Preencha');
  await expect(page.getByLabel('Título', { exact: true })).toBeFocused();
});
test('armazenamento bloqueado permite criar em memória', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, 'localStorage', { get: () => { throw new Error('Blocked'); } }));
  await page.goto('/#/familia/anotacoes');
  await createNote(page, 'Somente nesta sessão', 'Anotação de exemplo.');
  await expect(page.getByRole('heading', { name: 'Somente nesta sessão' })).toBeVisible();
  await expect(page.getByRole('status').first()).toContainText('navegador');
});
for (const raw of ['invalid', '{"version":9}']) {
  test(`dados inválidos restauram exemplos: ${raw}`, async ({ page }) => {
    await page.addInitScript((value) => localStorage.setItem('kids-medic-demo:v1', value), raw);
    await page.goto('/#/familia');
    await expect(page.getByRole('status').first()).toContainText('restaurados');
    await expect(page.getByRole('heading', { name: 'Clara', exact: true })).toBeVisible();
  });
}
test('reiniciar demonstração restaura os exemplos', async ({ page }) => {
  await page.goto('/#/familia/anotacoes');
  await createNote(page, 'Uma nota para limpar', 'Exemplo descartável.');
  await page.getByRole('button', { name: 'Reiniciar demonstração', exact: true }).click();
  await page.getByRole('button', { name: 'Restaurar exemplos', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Uma nota para limpar' })).toHaveCount(0);
});
test('gravação bloqueada mantém anotações durante a sessão', async ({ page }) => {
  await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new Error('QuotaExceeded'); }; });
  await page.goto('/#/familia/anotacoes');
  await createNote(page, 'Falha ao persistir', 'Este exemplo permanece em memória.');
  await expect(page.getByRole('heading', { name: 'Falha ao persistir' })).toBeVisible();
  await expect(page.getByRole('status').first()).toContainText('sessão');
});
for (const route of ['/familia', '/familia/consultas', '/familia/fases', '/familia/anotacoes']) {
  test(`recarregar mantém destino ${route}`, async ({ page }) => {
    await page.goto(`/#${route}`);
    const title = await page.title();
    await page.reload();
    await expect(page).toHaveTitle(title);
    await expect(page.locator('main h1')).toBeVisible();
  });
}
import { openDirtyDraft } from './helpers';
test('Escape permite preservar um rascunho não salvo', async ({ page }) => {
  await openDirtyDraft(page);
  await page.getByRole('dialog', { name: 'Descartar este rascunho?' }).getByRole('button', { name: 'Voltar', exact: true }).click();
  await expect(page.getByLabel('Título', { exact: true })).toHaveValue('Rascunho protegido');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Descartar rascunho', exact: true }).click();
});
test('build funciona em subdiretório e recarrega a área da criança', async ({ page }) => {
  await page.goto('http://127.0.0.1:4174/kids_medic_app/#/familia');
  await expect(page.getByRole('heading', { name: 'Olá, Marina.' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Olá, Marina.' })).toBeVisible();
  await expect(page).toHaveTitle('Área da família · Dra. Dayse Mary');
});
test('rota desconhecida oferece retorno ao início', async ({ page }) => {
  await page.goto('/#/nao-existe');
  await expect(page.getByRole('heading', { name: 'Página não encontrada' })).toHaveCount(1);
  await page.getByRole('link', { name: 'Voltar ao início', exact: true }).click();
  await expect(page).toHaveURL(/#\/$/);
});
