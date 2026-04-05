import { test, expect } from '@playwright/test';

test.describe('Темы UI', () => {

  test('Тёмная тема', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Switch to dark theme' }).click();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('Светлая тема', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Switch to dark theme' }).click();
    await page.getByRole('button', { name: 'Switch to light theme' }).click();

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

});