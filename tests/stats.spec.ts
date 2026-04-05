import { test, expect } from '@playwright/test';

test.describe('Статистика', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/stats');
  });

  test('Остановка таймера', async ({ page }) => {
    const stopBtn = page.getByRole('button', { name: 'Отключить автообновление' });
    await stopBtn.waitFor({ state: 'visible', timeout: 5000 });
    await stopBtn.scrollIntoViewIfNeeded();
    await stopBtn.click();
    const resumeBtn = page.getByRole('button', { name: 'resume-timer' });
    await resumeBtn.waitFor({ state: 'visible', timeout: 5000 });
    await resumeBtn.scrollIntoViewIfNeeded();
    await resumeBtn.click();

    await expect(resumeBtn).toBeVisible();
  });

  test('Возобновление таймера', async ({ page }) => {
    const stopBtn = page.getByRole('button', { name: 'Отключить автообновление' });
    await stopBtn.waitFor({ state: 'visible', timeout: 5000 });
    await stopBtn.scrollIntoViewIfNeeded();
    await stopBtn.click();
    const resumeBtn = page.getByRole('button', { name: 'resume-timer' });
    await resumeBtn.waitFor({ state: 'visible', timeout: 5000 });
    await resumeBtn.scrollIntoViewIfNeeded();
    await resumeBtn.click();

    await expect(stopBtn).toBeVisible();
  });

});