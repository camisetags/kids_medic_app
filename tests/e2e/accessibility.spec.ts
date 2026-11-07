import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { visitAtWidth, bookFirstVisit, createNote } from './helpers';
for (const width of [1440, 390]) {
  for (const route of ['/admin', '/admin/criancas', '/', '/agendar', '/familia', '/familia/consultas', '/familia/fases', '/familia/anotacoes']) {
    test(`acessibilidade e largura ${width} ${route}`, async ({ page }) => {
      await visitAtWidth(page, route, width);
      const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(result.violations.map((item) => `${item.id}: ${item.nodes.map((node) => node.target.join(' ')).join(', ')}`)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    });
  }
}
test('jornada completa no celular', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await bookFirstVisit(page);
  await page.getByRole('link', { name: 'Anotações', exact: true }).click();
  await createNote(page, 'Uma descoberta', 'Exemplo guardado no celular.');
  await expect(page.getByRole('heading', { name: 'Uma descoberta' })).toBeVisible();
});
test('editor acessível com movimento reduzido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#/familia/anotacoes?nova=1');
  await expect(page.getByRole('dialog', { name: 'Nova anotação' })).toBeVisible();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()).violations).toEqual([]);
});
for (const width of [1440, 390]) {
  for (const [route, action] of [['/admin', 'Nova consulta'], ['/admin/criancas', 'Nova criança']]) {
    test(`modal administrativo acessível ${width} ${action}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 }); await page.goto(`/#${route}`);
      await page.getByRole('button', { name: action, exact: true }).click();
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()).violations).toEqual([]);
    });
  }
}
