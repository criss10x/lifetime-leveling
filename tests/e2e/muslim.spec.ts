import { expect, test } from '@playwright/test';

test('Indonesian landing keeps the Android action and product proof in the mobile opening', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Muslim Leveling');
  await expect(page.getByText(/Lifetime Leveling/i)).toHaveCount(0);
  await expect(page.getByText('Temani langkah ibadahmu, satu hari pada satu waktu.')).toBeVisible();
  await expect(page.getByText('Quest ibadah harian dengan XP dan rank')).toBeVisible();
  await expect(page.getByText('Dari akun Google kami hanya menerima email, nama, dan foto profil untuk backup serta sinkronisasi progres.')).toBeVisible();

  const download = page.getByRole('link', { name: 'Download di Google Play' }).first();
  await expect(download).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=id.muslimleveling.muslim_leveling',
  );
  await expect(download).toHaveAttribute('target', '_blank');
  await expect(download).toHaveAttribute('rel', 'noreferrer');
  await expect(download).toBeInViewport();

  await expect(
    page.getByText('Gratis untuk Android · Google Sign-In opsional untuk backup progres.'),
  ).toBeVisible();
  await expect(page.getByText('Android', { exact: true })).toBeVisible();
  await expect(page.getByText(/App Store|iOS/i)).toHaveCount(0);
  await expect(
    page.getByAltText(
      'Beranda Muslim Leveling dengan quest ibadah harian, XP, rank, dan langkah berikutnya.',
    ),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Kebijakan Privasi' }).last()).toHaveAttribute(
    'href',
    '/privacy/',
  );
  await expect(page.getByRole('link', { name: 'Ketentuan Layanan' })).toHaveAttribute('href', '/terms/');
  await expect(page.getByText('© 2026 Muslim Leveling')).toBeVisible();
});

test('feature catalog follows the hero in both supported languages', async ({ page }) => {
  await page.goto('/');

  const IndonesianFeatures = page.getByRole('heading', { level: 2, name: 'Semua yang mendukung ritme ibadahmu.' });
  await expect(IndonesianFeatures).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Quest, XP, dan progres' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Jadwal salat dan kiblat' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Al-Quran dan murottal' })).toBeVisible();

  await page.goto('/en/');
  await expect(page.getByRole('heading', { level: 2, name: 'Everything that supports your worship rhythm.' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Quests, XP, and progress' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Prayer times and qibla' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Quran and murottal' })).toBeVisible();
});

test('landing proof renders every authentic Android poster with localized alternatives', async ({ page }) => {
  await page.goto('/');

  const alternatives = [
    'Beranda Muslim Leveling dengan quest ibadah harian, XP, rank, dan langkah berikutnya.',
    'Jadwal salat Muslim Leveling dengan waktu salat, pencarian kota, dan kompas kiblat.',
    'Profil Muslim Leveling dengan level, XP, streak, dan statistik pribadi.',
    'Tab Al-Quran Muslim Leveling untuk menemukan dan melanjutkan bacaan surah.',
    'Halaman Al-Quran Muslim Leveling dengan tajwid, Latin, terjemahan, dan tafsir.',
    'Tab Belajar Muslim Leveling dengan modul, progres, dan kuis.',
    'Pilihan tema terang dan gelap pada Muslim Leveling.',
  ] as const;

  for (const alt of alternatives) {
    await expect(page.getByAltText(alt)).toBeVisible();
  }
});

test('English landing translates the action and publishes reciprocal root metadata', async ({ page }) => {
  await page.goto('/en/');

  await expect(page.getByRole('link', { name: 'Download on Google Play' }).first()).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=id.muslimleveling.muslim_leveling',
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://muslim.lifetimeleveling.com/en/',
  );
  await expect(page.locator('link[rel="alternate"][hreflang="id"]')).toHaveAttribute(
    'href',
    'https://muslim.lifetimeleveling.com/',
  );
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
    'href',
    'https://muslim.lifetimeleveling.com/en/',
  );
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
    'href',
    'https://muslim.lifetimeleveling.com/',
  );
  await expect(page.getByText(/Lifetime Leveling/i)).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Privacy Policy' }).last()).toHaveAttribute('href', '/en/privacy/');
  await expect(page.getByRole('link', { name: 'Terms of Service' })).toHaveAttribute('href', '/en/terms/');
});

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

test('English support stays within the stated support scope and terms have a document status', async ({ page }) => {
  await page.goto('/en/support/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Muslim Leveling Support');
  await expect(page.getByText('Support is limited to account deletion, optional sign-in and backup, purchase-free access, prayer schedule or reminder troubleshooting, and bug reports.')).toBeVisible();

  await page.goto('/en/terms/');
  await expect(page.getByText('Document status')).toBeVisible();
  await expect(
    page.getByText('These terms apply to the Muslim Leveling Android app and supporting website.'),
  ).toBeVisible();
  await expect(page.getByText(/DRAFT|pending owner approval/i)).toHaveCount(0);
});

test('static product host exposes robots and sitemap references', async ({ page, request }) => {
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('https://muslim.lifetimeleveling.com/sitemap-index.xml');

  const sitemap = await request.get('/sitemap-index.xml');
  expect(await sitemap.text()).toContain('sitemap');

  await page.goto('/en/');
  await expect(page.locator('link[rel="alternate"][hreflang="id"]')).toHaveAttribute(
    'href',
    'https://muslim.lifetimeleveling.com/',
  );
});

test('Muslim legal and support routes publish canonical and reciprocal locale metadata', async ({ page }) => {
  const baseUrl = 'https://muslim.lifetimeleveling.com';
  const routes = ['/privacy/', '/terms/', '/support/', '/delete-account/'];

  for (const route of routes) {
    for (const locale of ['id', 'en'] as const) {
      const path = locale === 'id' ? route : `/en${route}`;
      const idUrl = `${baseUrl}${route}`;
      const enUrl = `${baseUrl}/en${route}`;

      await page.goto(path);

      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', locale === 'id' ? idUrl : enUrl);
      await expect(page.locator('link[rel="alternate"][hreflang="id"]')).toHaveAttribute('href', idUrl);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', enUrl);
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute('href', idUrl);
    }
  }
});
