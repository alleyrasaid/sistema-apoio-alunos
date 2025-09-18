import { test, expect } from '@playwright/test';

test('deve carregar a página de login', async ({ page }) => {
  await page.goto('https://sistema-de-apoio-a-alunos.web.app/');
  await expect(page).toHaveTitle('Login - Sistema de Apoio a Alunos');
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

test('deve ser responsivo', async ({ page }) => {
  await page.goto('https://sistema-de-apoio-a-alunos.web.app/');
  
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  
  await page.setViewportSize({ width: 1280, height: 720 });
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
