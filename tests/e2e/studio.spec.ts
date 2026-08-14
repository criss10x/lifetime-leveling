import { expect, test } from '@playwright/test';

test('studio homepage leads clearly to its first product on a phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kebiasaan ibadah harian, dimulai dari satu quest.');
  await expect(page.getByRole('link', { name: 'Jelajahi Muslim Leveling' })).toHaveAttribute(
    'href',
    'https://muslim.lifetimeleveling.com/',
  );
  await expect(page.locator('.featured-product__frame img')).toBeVisible();
  await expect(page.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/en/');

  const brandBounds = await page.getByRole('link', { name: 'Lifetime Leveling' }).boundingBox();
  expect(brandBounds).not.toBeNull();
  expect(brandBounds!.width).toBeGreaterThanOrEqual(44);
  expect(brandBounds!.height).toBeGreaterThanOrEqual(44);
});

test('stacks the featured product into one readable column on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const intro = page.locator('.featured-product__intro');
  const frame = page.locator('.featured-product__frame');
  const details = page.locator('.featured-product__details');

  await expect(intro).toBeVisible();
  await expect(frame).toBeVisible();
  await expect(details).toBeVisible();

  const introBox = await intro.boundingBox();
  const frameBox = await frame.boundingBox();
  const detailsBox = await details.boundingBox();
  expect(introBox).not.toBeNull();
  expect(frameBox).not.toBeNull();
  expect(detailsBox).not.toBeNull();

  expect(introBox!.y).toBeLessThan(frameBox!.y);
  expect(frameBox!.y).toBeLessThan(detailsBox!.y);
});

test('separates Muslim Leveling as a real first product, not a generic card', async ({ page }) => {
  await page.goto('/');

  const product = page.getByRole('region', { name: 'Muslim Leveling' });
  await expect(product.getByText('01')).toBeVisible();
  await expect(product.getByText('Quest ibadah harian')).toBeVisible();
  await expect(product.getByText('XP dan streak')).toBeVisible();
  await expect(product.getByText('Al-Quran dan belajar')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Aplikasi berikutnya sedang disiapkan.' })).toBeVisible();
});

test('routes the English footer product link to the English Muslim Leveling site', async ({ page }) => {
  await page.goto('/en/');

  await expect(
    page.locator('footer').getByRole('link', { name: 'Muslim Leveling', exact: true }),
  ).toHaveAttribute('href', 'https://muslim.lifetimeleveling.com/en/');
});

test('stacks studio progress principles vertically on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const principles = page.locator('.progress-principles__item');
  await expect(principles).toHaveCount(3);

  const [first, second, third] = (await Promise.all(
    [0, 1, 2].map((index) => principles.nth(index).boundingBox()),
  )).map((box) => {
    expect(box).not.toBeNull();
    return box!;
  });

  expect(first.y).toBeLessThan(second.y);
  expect(second.y).toBeLessThan(third.y);
});

test('studio legal links resolve to canonical localized pages', async ({ page }) => {
  await page.goto('/privacy/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Privasi Lifetime Leveling');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://lifetimeleveling.com/privacy/',
  );
  await expect(page.getByRole('link', { name: 'Privasi Muslim Leveling' })).toHaveAttribute(
    'href',
    'https://muslim.lifetimeleveling.com/privacy/',
  );

  await page.goto('/en/privacy/');
  await expect(page.getByRole('link', { name: 'Muslim Leveling Privacy' })).toHaveAttribute(
    'href',
    'https://muslim.lifetimeleveling.com/en/privacy/',
  );

  await page.goto('/en/terms/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lifetime Leveling Terms');
});
