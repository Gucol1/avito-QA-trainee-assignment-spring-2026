import { test, expect } from '@playwright/test';

test.describe('Срочные объявления', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Приоритет включает тогл', async ({ page }) => {
    await page.getByRole('combobox').nth(3).selectOption('urgent');

    const toggle = page.locator('._urgentToggle__slider_h1vv9_21');
    await expect(toggle).toBeChecked();
  });

  test('Включение и отображение только срочных', async ({ page }) => {
    const toggle = page.locator('._urgentToggle__slider_h1vv9_21 input[type="checkbox"]');
    await toggle.check();
    await expect(toggle).toBeChecked();

    const cards = page.locator('[class*="card_"]');
    const count = await cards.count();

    for (let i = 0; i < count; i++) {

      await expect(cards.nth(i).locator('[class*="_card_priority_"]')).toHaveCount(1);
    }
  });

});