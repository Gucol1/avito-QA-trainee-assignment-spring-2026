import { test, expect } from '@playwright/test';

test.describe('Сортировка', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('По убыванию', async ({ page }) => {
    const sortBy = page.getByRole('combobox').first();
    const order = page.getByRole('combobox').nth(1);

    await sortBy.selectOption('price');
    await order.selectOption('desc');

    const pricesText = await page
      .locator('[class*="card_price"]')
      .allTextContents();

    const prices = pricesText.map(p => Number(p.replace(/\D/g, '')));

    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('По возрастанию', async ({ page }) => {
    const sortBy = page.getByRole('combobox').first();
    const order = page.getByRole('combobox').nth(1);

    await sortBy.selectOption('price');
    await order.selectOption('asc');

    const pricesText = await page
      .locator('[class*="card_price"]')
      .allTextContents();

    const prices = pricesText.map(p => Number(p.replace(/\D/g, '')));

    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

});