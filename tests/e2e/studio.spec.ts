import { expect, test } from '@playwright/test';

test('studio homepage leads clearly to its first product on a phone viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Aplikasi untuk membuat progres terasa nyata.');
  await expect(page.getByRole('link', { name: 'Jelajahi Muslim Leveling' })).toHaveAttribute(
    'href',
    'https://muslim.lifetimeleveling.com/',
  );
  await expect(page.locator('[data-atlas-route]')).toHaveAttribute('aria-hidden', 'true');
  await expect(page.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/en/');

  const brandBounds = await page.getByRole('link', { name: 'Lifetime Leveling' }).boundingBox();
  expect(brandBounds).not.toBeNull();
  expect(brandBounds!.width).toBeGreaterThanOrEqual(44);
  expect(brandBounds!.height).toBeGreaterThanOrEqual(44);
});

test('studio route is static and complete when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('[data-atlas-route] .atlas-route__line')).toHaveCSS('stroke-dashoffset', '0px');
});

test('separates Muslim Leveling as a real first product, not a generic card', async ({ page }) => {
  await page.goto('/');

  const product = page.getByRole('region', { name: 'Muslim Leveling' });
  await expect(product.getByText('01')).toBeVisible();
  await expect(product.getByText('Quest ibadah harian')).toBeVisible();
  await expect(product.getByText('XP dan streak')).toBeVisible();
  await expect(product.getByText('Al-Quran dan belajar')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Rute berikutnya sedang dipetakan.' })).toBeVisible();
});

test('routes the English footer product link to the English Muslim Leveling site', async ({ page }) => {
  await page.goto('/en/');

  await expect(
    page.locator('footer').getByRole('link', { name: 'Muslim Leveling', exact: true }),
  ).toHaveAttribute('href', 'https://muslim.lifetimeleveling.com/en/');
});
