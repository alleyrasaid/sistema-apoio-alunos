import { test, expect } from '@playwright/test';

test.describe('Funcionalidades do Sistema de Apoio a Alunos', () => {
  test.beforeEach(async ({ page }) => {
    // Antes de cada teste, vai para a página inicial
    await page.goto('https://sistema-de-apoio-a-alunos.web.app/');
  });

  test('deve exibir a página de login corretamente', async ({ page }) => {
    // Verificar se a página carrega com elementos essenciais
    await expect(page).toHaveTitle('Login - Sistema de Apoio a Alunos');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    
    // Verificar se os campos do formulário existem
    await expect(page.getByLabel('Usuário ou email')).toBeVisible();
    await expect(page.getByLabel('Senha')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
  });

  test('deve validar formulário de login vazio', async ({ page }) => {
    // Tentar submeter formulário sem preencher
    await page.getByRole('button', { name: 'Entrar' }).click();
    
    // Verificar se permanece na mesma página (não redireciona)
    await expect(page).toHaveURL('https://sistema-de-apoio-a-alunos.web.app/');
  });

  test('deve permitir preencher campos do formulário', async ({ page }) => {
    // Preencher campos de email e senha
    await page.getByLabel('Usuário ou email').fill('aluno.exemplo@email.com');
    await page.getByLabel('Senha').fill('senhaSegura123');
    
    // Verificar se os valores foram preenchidos
    await expect(page.getByLabel('Usuário ou email')).toHaveValue('aluno.exemplo@email.com');
    await expect(page.getByLabel('Senha')).toHaveValue('senhaSegura123');
  });

  test('deve ter link para cadastro funcionando', async ({ page }) => {
    // Verificar se o link de cadastro existe e clica nele
    const signupLink = page.getByRole('link', { name: 'Clique aqui' });
    
    await expect(signupLink).toBeVisible();
    
    // Clicar no link e verificar se redireciona
    await signupLink.click();
    
    // Verificar se foi para página de cadastro (pode ser mesma URL com hash ou parâmetro)
    await expect(page).not.toHaveURL('https://sistema-de-apoio-a-alunos.web.app/');
    // Ou verificar se mudou algo na página
    await expect(page.locator('body')).toBeVisible();
  });

  test('deve ter link "Esqueceu a senha?" visível', async ({ page }) => {
    // Verificar link de recuperação de senha
    const forgotPasswordLink = page.getByText('Esqueceu a senha?');
    
    await expect(forgotPasswordLink).toBeVisible();
    await expect(forgotPasswordLink).toHaveAttribute('href', '#');
  });

  test('deve ter opção "Remember me"', async ({ page }) => {
    // Verificar checkbox de lembrar usuário
    const rememberCheckbox = page.getByLabel('Remember me');
    
    await expect(rememberCheckbox).toBeVisible();
    await expect(rememberCheckbox).not.toBeChecked();
    
    // Testar marcar e desmarcar
    await rememberCheckbox.check();
    await expect(rememberCheckbox).toBeChecked();
    
    await rememberCheckbox.uncheck();
    await expect(rememberCheckbox).not.toBeChecked();
  });

 test('deve ter botão de login social do Google', async ({ page }) => {
  // Verificar botão do Google - usando ID específico
  const googleButton = page.locator('#google-login-btn');
  
  await expect(googleButton).toBeVisible();
  await expect(googleButton).toHaveClass(/google/);
  
  // Verificar características do botão (sem verificar type já que não existe)
  const buttonId = await googleButton.getAttribute('id');
  expect(buttonId).toBe('google-login-btn');
  
  const buttonClass = await googleButton.getAttribute('class');
  expect(buttonClass).toMatch(/google/i);
  
  // Verificar se tem o SVG do Google
  const googleSVG = googleButton.locator('svg');
  await expect(googleSVG).toBeVisible();
  
  // Verificar se está dentro da seção de login social
  const socialSection = page.locator('.social-login');
  await expect(socialSection).toBeVisible();
  await expect(googleButton).toBeVisible();
});

  test('deve ser responsivo em mobile', async ({ page }) => {
    // Testar visualização mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verificar se elementos ainda estão visíveis
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByLabel('Usuário ou email')).toBeVisible();
    await expect(page.getByLabel('Senha')).toBeVisible();
  });

  test('deve ser responsivo em tablet', async ({ page }) => {
    // Testar visualização tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible();
  });

  test('deve ter ilustração e citação motivacional', async ({ page }) => {
    // Verificar elementos da coluna direita
    await expect(page.getByAltText('Ilustração de estudantes e material escolar')).toBeVisible();
    
    const quote = page.getByText('A mente que se abre a uma nova ideia');
    await expect(quote).toBeVisible();
    
    await expect(page.getByText('Albert Einstein')).toBeVisible();
  });

  test('deve carregar recursos externos corretamente', async ({ page }) => {
    // Verificar se recursos externos estão carregando
    await expect(page.locator('script[src*="firebase-app.js"]')).toBeAttached();
    await expect(page.locator('script[src*="firebase-auth.js"]')).toBeAttached();
    await expect(page.locator('script[src*="axios.min.js"]')).toBeAttached();
  });

  test('deve ter configuração do Firebase definida', async ({ page }) => {
    // Verificar se a configuração do Firebase está presente
    const firebaseConfig = await page.evaluate(() => {
      return (window as any).firebaseConfig;
    });
    
    expect(firebaseConfig).toBeDefined();
    expect(firebaseConfig.apiKey).toBe('AIzaSyAyN-BwYsEV6ItieMg8b_CLrcSPgDhfW9I');
    expect(firebaseConfig.projectId).toBe('sistema-de-apoio-a-alunos');
  });

  test('deve ter metatags para SEO', async ({ page }) => {
    // Verificar metatags importantes
    const viewportMeta = page.locator('meta[name="viewport"]');
    const charsetMeta = page.locator('meta[charset]');
    
    await expect(viewportMeta).toHaveAttribute('content', /width=device-width/);
    await expect(charsetMeta).toHaveAttribute('charset', 'UTF-8');
  });
});