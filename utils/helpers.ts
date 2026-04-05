export const extractPrices = async (page) => {
  const prices = await page.locator('[data-testid="price"]').allTextContents();
  return prices.map(p => Number(p.replace(/\D/g, '')));
};

export const isSortedAsc = (arr: number[]) =>
  arr.every((v, i) => i === 0 || arr[i - 1] <= v);

export const isSortedDesc = (arr: number[]) =>
  arr.every((v, i) => i === 0 || arr[i - 1] >= v);