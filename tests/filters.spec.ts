import { test, expect } from '@playwright/test';

test.describe('Фильтр по цене', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Валидация ввода', async ({ page }) => {
    const min = page.getByPlaceholder('От');

    await min.fill('-100');
    await expect(min).toHaveValue('');

    await min.fill('12.5');
    await expect(min).toHaveValue('12');

    await min.fill('abc');
    await expect(min).toHaveValue('');
  });

  test('Диапазон + проверка URL', async ({ page }) => {
    await page.getByPlaceholder('От').fill('7000');
    await page.getByPlaceholder('До').fill('10000');

    await expect(page).toHaveURL(/minPrice=7000/);
    await expect(page).toHaveURL(/maxPrice=10000/);

    const pricesText = await page
      .locator('[class*="card_price"]')
      .allTextContents();

    const prices = pricesText.map(p => Number(p.replace(/\D/g, '')));

    prices.forEach(p => {
      expect(p).toBeGreaterThanOrEqual(7000);
      expect(p).toBeLessThanOrEqual(10000);
    });
  });

  test('Только нижний порог', async ({ page }) => {
    await page.getByPlaceholder('От').fill('5000');

    await expect(page).toHaveURL(/minPrice=5000/);

    const prices = await page
      .locator('[class*="card_price"]')
      .allTextContents();

    prices
      .map(p => Number(p.replace(/\D/g, '')))
      .forEach(p => expect(p).toBeGreaterThanOrEqual(5000));
  });

  test('Только верхний порог', async ({ page }) => {
    await page.getByPlaceholder('До').fill('10000');

    await expect(page).toHaveURL(/maxPrice=10000/);

    const prices = await page
      .locator('[class*="card_price"]')
      .allTextContents();

    prices
      .map(p => Number(p.replace(/\D/g, '')))
      .forEach(p => expect(p).toBeLessThanOrEqual(10000));
  });

  test('min > max → нет объявлений', async ({ page }) => {
    await page.getByPlaceholder('От').fill('10000');
    await page.getByPlaceholder('До').fill('5000');

    await expect(page.locator('[class*="card_"]')).toHaveCount(0);
  });

});