import { test, expect } from '@playwright/test';

test.describe('Категории', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });


  test('Фильтр по категории', async ({ page }) => {
    const categorySelect = page.getByRole('combobox').nth(2);

    await categorySelect.selectOption({ label: 'Электроника' });

    const titles = await page
      .locator('[class*="_card_title_"]')
      .allTextContents();

    titles.forEach(title => {
      const category = title.split(':')[1]?.trim();
      expect(category).toBe('Электроника');
    });
  });

  test('Все категории', async ({ page }) => {
    const categorySelect = page.getByRole('combobox').nth(2);

    await categorySelect.selectOption({ label: 'Все категории' });

    await expect(page.locator('[class*="card_"]').first()).toBeVisible();
  });

});