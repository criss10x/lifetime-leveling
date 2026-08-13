import { expect, test } from '@playwright/test';

test('Muslim legal pages are public, canonical, and explain optional Google backup', async ({ page }) => {
  await page.goto('/privacy/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kebijakan Privasi Muslim Leveling');
  await expect(page.getByText('Google Account (opsional)')).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://muslim.lifetimeleveling.com/privacy/',
  );

  await page.goto('/en/privacy/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Muslim Leveling Privacy Policy');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://muslim.lifetimeleveling.com/en/privacy/',
  );
});

test('account deletion gives the exact email request and distinguishes local data from backup data', async ({ page }) => {
  await page.goto('/delete-account/');

  await expect(page.getByRole('link', { name: 'muslim.leveling@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:muslim.leveling@gmail.com',
  );
  await expect(page.getByText('Delete my Muslim Leveling account')).toBeVisible();
  await expect(page.getByText('Menghapus instalasi aplikasi akan menghapus progres yang hanya tersimpan secara lokal di perangkat.')).toBeVisible();
  await expect(page.getByText(/seluruh backup data sisi server dalam tujuh hari/i)).toBeVisible();

  await page.goto('/en/delete-account/');
  await expect(page.getByRole('link', { name: 'muslim.leveling@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:muslim.leveling@gmail.com',
  );
  await expect(page.getByText('Delete my Muslim Leveling account')).toBeVisible();
  await expect(page.getByText('Uninstalling the app removes progress that is stored only locally on your device.')).toBeVisible();
  await expect(page.getByText(/all server-side backup data within seven days/i)).toBeVisible();
});

test('English support stays within the stated support scope and terms remain a draft', async ({ page }) => {
  await page.goto('/en/support/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Muslim Leveling Support');
  await expect(page.getByText('Support is limited to account deletion, optional sign-in and backup, purchase-free access, prayer schedule or reminder troubleshooting, and bug reports.')).toBeVisible();

  await page.goto('/en/terms/');
  await expect(page.getByText('These terms are a DRAFT and are pending owner approval before production use.')).toBeVisible();
});
