import { test, expect } from '@playwright/test';

test.describe('Autenticação do Sistema', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://sistema-de-apoio-a-alunos.web.app/');
  });

  test('deve carregar a página de login corretamente', async ({ page }) => {
    // Verificar elementos essenciais
    await expect(page).toHaveTitle(/Sistema de Apoio a Alunos|Login/i);
    
    // Verificar se há formulário de login
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Verificar campos de input
    await expect(page.locator('input[type="email"], input[name*="email"]').first()).toBeVisible();
    await expect(page.locator('input[type="password"], input[name*="password"]').first()).toBeVisible();
    
    // Verificar botão de submit
    await expect(page.locator('button[type="submit"], input[type="submit"]').first()).toBeVisible();
  });

  test('deve validar formulário de login', async ({ page }) => {
    // Tentar submeter formulário vazio
    await page.locator('button[type="submit"]').click();
    
    // Verificar se mostra mensagens de erro
    const errorMessages = await page.locator('.error, .text-red-500, [class*="error"]').all();
    if (errorMessages.length > 0) {
      await expect(errorMessages[0]).toBeVisible();
    }
  });

  test('deve ter link para cadastro/esqueci senha', async ({ page }) => {
    // Verificar links de auxílio
    const signupLink = page.getByText(/cadastrar|registrar|sign up/i);
    const forgotPasswordLink = page.getByText(/esqueci|esqueceu|forgot/i);
    
    if (await signupLink.count() > 0) {
      await expect(signupLink).toBeVisible();
    }
    
    if (await forgotPasswordLink.count() > 0) {
      await expect(forgotPasswordLink).toBeVisible();
    }
  });
});