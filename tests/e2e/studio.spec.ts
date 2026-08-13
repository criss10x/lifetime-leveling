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
