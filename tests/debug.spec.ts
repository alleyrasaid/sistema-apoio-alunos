import { test, expect } from '@playwright/test';

test('debug - ver conteúdo real da página', async ({ page }) => {
  await page.goto('https://sistema-de-apoio-a-alunos.web.app/');
  
  // Capturar todo o HTML da página
  const htmlContent = await page.content();
  console.log('HTML DA PÁGINA:', htmlContent);
  
  // Capturar todos os textos visíveis
  const allTexts = await page.evaluate(() => {
    return Array.from(document.body.querySelectorAll('*'))
      .filter(element => element.children.length === 0 && element.textContent.trim() !== '')
      .map(element => element.textContent.trim());
  });
  
  console.log('TEXTOS ENCONTRADOS:', allTexts);
  
  // Capturar todos os botões
  const buttons = await page.$$eval('button', buttons => 
    buttons.map(btn => ({ text: btn.textContent.trim(), id: btn.id, class: btn.className }))
  );
  console.log('BOTÕES:', buttons);
  
  // Esperar para vermos o console
  await page.waitForTimeout(5000);
});
