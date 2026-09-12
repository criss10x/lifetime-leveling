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
  await expect(page.getByRole('link', { name: 'Kebijakan Privasi' }).last()).toHaveAttribute(
    'href',
    '/privacy/',
  );
  await expect(page.getByRole('link', { name: 'Ketentuan Layanan' })).toHaveAttribute('href', '/terms/');
  await expect(page.getByText('© 2026 Muslim Leveling')).toBeVisible();
});

test('landing exposes favicon and apple-touch-icon links', async ({ page }) => {
  await page.goto('/');
  const favicon = page.locator('link[rel="icon"]').first();
  const appleTouch = page.locator('link[rel="apple-touch-icon"]').first();
  await expect(favicon).toHaveAttribute('href', '/brand/muslim-leveling-icon.png');
  await expect(appleTouch).toHaveAttribute('href', '/brand/muslim-leveling-icon.png');

  // also verify the icon asset is reachable (not 404)
  const res = await page.request.get('/brand/muslim-leveling-icon.png');
  expect(res.status()).toBe(200);
});

test('feature catalog follows the hero in both supported languages', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');

  const IndonesianFeatures = page.getByRole('heading', { level: 2, name: 'Semua yang mendukung ritme ibadahmu.' });
  await expect(IndonesianFeatures).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Quest, XP, dan progres' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Jadwal salat dan kiblat' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Al-Quran dan murottal' })).toBeVisible();

  const featureItems = page.locator('.feature-catalog article');
  await expect(featureItems).toHaveCount(6);
  await expect(page.locator('.feature-catalog article svg[aria-hidden="true"]')).toHaveCount(6);

  const leadBounds = await featureItems.first().boundingBox();
  const supportingBounds = await featureItems.nth(1).boundingBox();
  expect(leadBounds?.width).toBeGreaterThan((supportingBounds?.width ?? 0) * 1.5);

  await page.goto('/en/');
  await expect(page.getByRole('heading', { level: 2, name: 'Everything that supports your worship rhythm.' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Quests, XP, and progress' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Prayer times and qibla' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Quran and murottal' })).toBeVisible();
});

test('landing proof renders every authentic Android poster with localized alternatives', async ({ page }) => {
  await page.goto('/');

  const alternatives = [
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

test('section nav links to catalog, screens, and privacy anchors on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');

  const nav = page.locator('nav.product-navigation__sections');
  await expect(nav).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Fitur' })).toHaveAttribute('href', '#feature-catalog-title');
  await expect(nav.getByRole('link', { name: 'Layar' })).toHaveAttribute('href', '#quran-murottal-title');
  await expect(nav.getByRole('link', { name: 'Privasi' })).toHaveAttribute('href', '#privacy-title');
  await expect(page.locator('#theme-announce')).toHaveAttribute('aria-live', 'polite');
});

test('theme toggle flips dark mode and persists across reload', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');

  const toggle = page.locator('[data-theme-toggle]');
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');

  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  expect(await page.evaluate(() => localStorage.getItem('muslim-theme'))).toBe('dark');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');

  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  expect(await page.evaluate(() => localStorage.getItem('muslim-theme'))).toBe('light');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('landing renders interactive FAQ section and bilingual questions', async ({ page }) => {
  await page.goto('/');

  const faqHeading = page.getByRole('heading', { level: 2, name: 'Pertanyaan yang sering diajukan' });
  await expect(faqHeading).toBeVisible();

  const faqItems = page.locator('.faq-item');
  await expect(faqItems).toHaveCount(5);

  // First item is open by default
  const firstTrigger = faqItems.first().locator('.faq-item__trigger');
  await expect(firstTrigger).toContainText('Mengapa Muslim Leveling gratis dan tanpa iklan?');
  await expect(faqItems.first()).toHaveAttribute('open', '');

  // Second item can be opened
  const secondTrigger = faqItems.nth(1).locator('.faq-item__trigger');
  await expect(secondTrigger).toContainText('Bagaimana cara kerja Mode Haid dalam menjaga progres?');
  await secondTrigger.click();
  await expect(faqItems.nth(1)).toHaveAttribute('open', '');

  // English landing
  await page.goto('/en/');
  await expect(
    page.getByRole('heading', { level: 2, name: 'Frequently asked questions' }),
  ).toBeVisible();
  await expect(page.locator('.faq-item')).toHaveCount(5);
  await expect(page.locator('.faq-item').first().locator('.faq-item__trigger')).toContainText(
    'Why is Muslim Leveling free and ad-free?',
  );
});

test('guide article amalan-wanita-haid publishes Article schema, Mode Haid callout, and download CTA', async ({ page }) => {
  await page.goto('/panduan/amalan-wanita-haid/');

  // Heading & Breadcrumb
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Amalan Berpahala untuk Wanita Saat Haid: Menjaga Ritme Ibadah Tanpa Rasa Bersalah',
  );
  await expect(page.locator('.article-breadcrumb')).toContainText('Beranda');
  await expect(page.locator('.article-breadcrumb')).toContainText('Panduan Ibadah');

  // Metadata & OpenGraph
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute('content', '2026-09-12');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://muslim.lifetimeleveling.com/panduan/amalan-wanita-haid/',
  );

  // Schema.org Article in @graph
  const scriptContent = await page.locator('script[type="application/ld+json"]').textContent();
  expect(scriptContent).toBeDefined();
  const parsed = JSON.parse(scriptContent!);
  const articleEntity = parsed['@graph']?.find((item: any) => item['@type'] === 'Article');
  expect(articleEntity).toBeDefined();
  expect(articleEntity.headline).toContain('Amalan Berpahala untuk Wanita Saat Haid');
  expect(articleEntity.datePublished).toBe('2026-09-12');

  // Content, Feature Callout, and Download CTA
  await expect(page.getByText('Fitur Mode Haid')).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Menjaga Ritme dan Kebiasaan Tanpa Beban Moral' })).toBeVisible();

  const ctaButton = page.locator('.article-cta-card a.android-download');
  await expect(ctaButton).toBeVisible();
  await expect(ctaButton).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=id.muslimleveling.muslim_leveling',
  );

  // Theme toggle on article page
  const toggle = page.locator('[data-theme-toggle]');
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('landing page renders guides section and links to hub and articles', async ({ page }) => {
  await page.goto('/');

  const section = page.locator('.guides-section');
  await expect(section).toBeVisible();
  await expect(section.getByRole('heading', { level: 2, name: 'Panduan & Inspirasi Ibadah' })).toBeVisible();

  const allLink = section.getByRole('link', { name: 'Lihat Semua Panduan' });
  await expect(allLink).toHaveAttribute('href', '/panduan/');

  const articleCard = section.locator('.guide-card').first();
  await expect(articleCard).toBeVisible();
  await expect(articleCard.getByText('Panduan Ibadah')).toBeVisible();

  // Footer link
  const footerGuide = page.locator('.product-footer nav a', { hasText: 'Panduan' });
  await expect(footerGuide).toHaveAttribute('href', '/panduan/');
});

test('guide hub page renders catalog and supports bilingual routes', async ({ page }) => {
  await page.goto('/panduan/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Panduan & Artikel Ibadah');
  const count = await page.locator('.guide-card--hub').count();
  expect(count).toBeGreaterThanOrEqual(2);
  await expect(page.locator('.article-breadcrumb')).toContainText('Panduan Ibadah');

  // English hub
  await page.goto('/en/panduan/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Worship Guides & Articles');
  await expect(page.locator('.product-footer nav a', { hasText: 'Guides' })).toHaveAttribute(
    'href',
    '/en/panduan/',
  );
});

test('guide article kebiasaan-salat-tepat-waktu publishes Article schema, callout, and download CTA', async ({ page }) => {
  await page.goto('/panduan/kebiasaan-salat-tepat-waktu/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Cara Membangun Kebiasaan Salat Tepat Waktu dengan Pendekatan Micro-Habits',
  );
  await expect(page.locator('.article-breadcrumb')).toContainText('Panduan Ibadah');
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://muslim.lifetimeleveling.com/panduan/kebiasaan-salat-tepat-waktu/',
  );

  // Schema.org Article in @graph
  const scriptContent = await page.locator('script[type="application/ld+json"]').textContent();
  expect(scriptContent).toBeDefined();
  const parsed = JSON.parse(scriptContent!);
  const articleEntity = parsed['@graph']?.find((item: any) => item['@type'] === 'Article');
  expect(articleEntity).toBeDefined();
  expect(articleEntity.headline).toContain('Cara Membangun Kebiasaan Salat Tepat Waktu');

  await expect(page.getByText('Quest & Leveling Ibadah')).toBeVisible();
  const ctaButton = page.locator('.article-cta-card a.android-download');
  await expect(ctaButton).toBeVisible();
});

test('guide article murottal-vs-membaca-mushaf publishes Article schema, callout, and download CTA', async ({ page }) => {
  await page.goto('/panduan/murottal-vs-membaca-mushaf/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Mendengarkan Murottal vs Membaca Mushaf: Mana yang Lebih Utama Saat Sibuk?',
  );
  await expect(page.locator('.article-breadcrumb')).toContainText('Panduan Ibadah');
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://muslim.lifetimeleveling.com/panduan/murottal-vs-membaca-mushaf/',
  );

  // Schema.org Article in @graph
  const scriptContent = await page.locator('script[type="application/ld+json"]').textContent();
  expect(scriptContent).toBeDefined();
  const parsed = JSON.parse(scriptContent!);
  const articleEntity = parsed['@graph']?.find((item: any) => item['@type'] === 'Article');
  expect(articleEntity).toBeDefined();
  expect(articleEntity.headline).toContain('Mendengarkan Murottal vs Membaca Mushaf');

  await expect(page.getByText('Fitur Quran & Murottal')).toBeVisible();
  const ctaButton = page.locator('.article-cta-card a.android-download');
  await expect(ctaButton).toBeVisible();
});





