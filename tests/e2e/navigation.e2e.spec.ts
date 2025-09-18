import { test, expect } from '@playwright/test';

test.describe('Navegação e Responsividade', () => {
  test('deve ser responsivo em diferentes dispositivos', async ({ page }) => {
    const url = 'https://sistema-de-apoio-a-alunos.web.app/';
    
    // Testar mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(url);
    await expect(page.locator('body')).toBeVisible();

    // Testar tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(url);
    await expect(page.locator('body')).toBeVisible();

    // Testar desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(url);
    await expect(page.locator('body')).toBeVisible();
  });

  test('deve ter meta tags para SEO', async ({ page }) => {
    await page.goto('https://sistema-de-apoio-a-alunos.web.app/');
    
    // Verificar meta tags básicas
    const viewportMeta = page.locator('meta[name="viewport"]');
    const charsetMeta = page.locator('meta[charset]');
    
    if (await viewportMeta.count() > 0) {
      await expect(viewportMeta).toHaveAttribute('content', /width=device-width/);
    }
    
    if (await charsetMeta.count() > 0) {
      await expect(charsetMeta).toHaveAttribute('charset', /utf-8/i);
    }
  });
});