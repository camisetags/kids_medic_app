import { test, expect } from '@playwright/test';
test('entrada e navegação', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Dra. Dayse Mary', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Demonstração interativa · dados fictícios').first()).toBeVisible();
  await page.getByRole('link', { name: 'Agendar consulta', exact: true }).first().click();
  await expect(page).toHaveURL(/#\/agendar$/);
});
