# Muslim Leveling Product Surface Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual, Android-first Muslim Leveling product site with authentic app proof, Google Play download action, factual privacy/support/account-deletion pages, and a soft-launch verification checklist for Search Console and optional Android Google Sign-In.

**Architecture:** Muslim Leveling is its own static Astro surface with a green-and-gold product system, separate canonical host, and a small parent-studio endorsement. Typed content describes only features verified in the Android source. Product images are imported as real Android captures so Astro can produce responsive optimized output; the build must fail rather than silently deploy generated or missing screenshots.

**Tech Stack:** Astro static output, TypeScript content and media manifests, `astro:assets`, scoped CSS, Vitest, Playwright, GitHub Actions, Google Search Console, Google Cloud OAuth consent configuration, Hostinger static Git deploy.

**Spec:** `docs/superpowers/specs/2026-08-13-lifetime-leveling-web-design.md`

## Global Constraints

- Complete `2026-08-13-lifetime-leveling-foundation.md` and `2026-08-13-lifetime-leveling-studio-home.md` first.
- Muslim Leveling is Android-only in this release. The sole store action is `https://play.google.com/store/apps/details?id=id.muslimleveling.muslim_leveling`.
- Google Sign-In is optional for backup/sync; the app works without it. Do not create a website Google OAuth flow. Keep the existing web/server client only for the native Android-to-Supabase token exchange, not as a browser client for this static site.
- Preserve Muslim Leveling's green-and-gold identity. Purple is limited to a small `A Lifetime Leveling product` endorsement/link.
- Use only real Android app icon and captures. Do not use generated app UI, mosque stock imagery, fabricated testimonials, or unverified outcomes.
- Every stated privacy fact must match the source policy at `C:\Users\Administrator\Documents\Muslim Leveling\docs\privacy-policy.md` and the current `criss10x/Muslim-Leveling` `main` branch before release.
- State the Sentry crash-reporting practice accurately. Do not claim that the app has no technical telemetry; it has no ads or marketing trackers according to the published policy.
- Provide `/privacy/`, `/terms/`, `/support/`, and `/delete-account/` plus English equivalents before OAuth verification.
- All legal text requires owner review before the production deploy; no page may call itself legal advice.
- Keep page content understandable without motion, use semantic headings/landmarks, meet contrast requirements, and keep the Google Play action reachable in the first product viewport on 360 px width.

---

## Planned File Structure

```text
public/muslim/
  brand/lifetime-leveling-crest.png
  brand/muslim-leveling-icon.png
src/
  shared/
    content/muslim-product.ts
    content/legal/muslim.ts
  muslim/
    assets/app-icon.png
    assets/screens/dashboard-quests.png
    assets/screens/prayer-timeline.png
    assets/screens/streak-achievement.png
    assets/screens/quran-murottal.png
    assets/screens/learning-quiz.png
    components/ProductShell.astro
    components/ProductNavigation.astro
    components/AndroidDownloadButton.astro
    components/AndroidFrame.astro
    components/ProductHero.astro
    components/DailyLoop.astro
    components/ScreenshotStory.astro
    components/CompassionSection.astro
    components/PrivacyFacts.astro
    components/ProductFooter.astro
    styles/muslim.css
    pages/index.astro
    pages/en/index.astro
    pages/privacy/index.astro
    pages/terms/index.astro
    pages/support/index.astro
    pages/delete-account/index.astro
    pages/en/privacy/index.astro
    pages/en/terms/index.astro
    pages/en/support/index.astro
    pages/en/delete-account/index.astro
docs/
  google-verification-soft-launch.md
tests/
  unit/muslim-product-content.test.ts
  unit/muslim-media.test.ts
  e2e/muslim.spec.ts
```

### Task 1: Lock factual product content and the authentic-media contract

**Files:**

- Create: `src/shared/content/muslim-product.ts`
- Create: `src/muslim/assets/app-icon.png`
- Create: `src/muslim/assets/screens/dashboard-quests.png`
- Create: `src/muslim/assets/screens/prayer-timeline.png`
- Create: `src/muslim/assets/screens/streak-achievement.png`
- Create: `src/muslim/assets/screens/quran-murottal.png`
- Create: `src/muslim/assets/screens/learning-quiz.png`
- Create: `public/muslim/brand/muslim-leveling-icon.png`
- Create: `tests/unit/muslim-product-content.test.ts`
- Create: `tests/unit/muslim-media.test.ts`

**Interfaces:**

- Consumes: `Locale` from `src/shared/i18n/types.ts`.
- Produces: `muslimProductContent: Record<Locale, MuslimProductContent>` with exact public product copy and `googlePlayUrl`.
- Produces: a five-image media inventory that must exist before the product build is accepted.

- [ ] **Step 1: Write failing content and media tests.**

```ts
// tests/unit/muslim-product-content.test.ts
import { describe, expect, it } from 'vitest';
import { muslimProductContent } from '../../src/shared/content/muslim-product';

describe('Muslim Leveling product content', () => {
  it('keeps Android download and optional backup wording precise', () => {
    expect(muslimProductContent.id.googlePlayUrl).toBe(
      'https://play.google.com/store/apps/details?id=id.muslimleveling.muslim_leveling',
    );
    expect(muslimProductContent.id.hero.note).toBe(
      'Gratis untuk Android · Google Sign-In opsional untuk backup progres.',
    );
    expect(muslimProductContent.en.hero.note).toBe(
      'Free for Android · Google Sign-In is optional for progress backup.',
    );
  });

  it('does not offer an iOS or App Store download', () => {
    for (const locale of ['id', 'en'] as const) {
      expect(JSON.stringify(muslimProductContent[locale])).not.toMatch(/iOS|App Store/i);
    }
  });
});
```

```ts
// tests/unit/muslim-media.test.ts
import { access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const requiredMedia = [
  'src/muslim/assets/app-icon.png',
  'src/muslim/assets/screens/dashboard-quests.png',
  'src/muslim/assets/screens/prayer-timeline.png',
  'src/muslim/assets/screens/streak-achievement.png',
  'src/muslim/assets/screens/quran-murottal.png',
  'src/muslim/assets/screens/learning-quiz.png',
];

describe('Muslim Leveling media inventory', () => {
  it('contains only named, reviewable Android source captures', async () => {
    await Promise.all(requiredMedia.map(async (file) => {
      await expect(access(resolve(file))).resolves.toBeUndefined();
    }));
  });
});
```

- [ ] **Step 2: Run both tests to verify the contract is not yet satisfied.**

Run: `npm run test:unit -- tests/unit/muslim-product-content.test.ts`

Expected: Vitest cannot resolve the product content module.

Run: `npm run test:unit -- tests/unit/muslim-media.test.ts`

Expected: the required app-icon and screenshot paths fail access checks.

- [ ] **Step 3: Add factual locale copy and collect the six source assets.**

Use this dictionary contract and values:

```ts
export interface MuslimProductContent {
  readonly googlePlayUrl: string;
  readonly meta: { readonly title: string; readonly description: string };
  readonly navigation: { readonly parent: string; readonly language: string; readonly android: string };
  readonly hero: {
    readonly title: string;
    readonly body: string;
    readonly cta: string;
    readonly note: string;
  };
  readonly dailyLoop: { readonly label: string; readonly title: string; readonly steps: readonly string[] };
  readonly screenshots: readonly { readonly title: string; readonly body: string; readonly alt: string }[];
  readonly compassion: { readonly title: string; readonly body: string };
  readonly privacyFacts: { readonly title: string; readonly body: string; readonly links: readonly string[] };
}

export const muslimProductContent = {
  id: {
    googlePlayUrl: 'https://play.google.com/store/apps/details?id=id.muslimleveling.muslim_leveling',
    meta: {
      title: 'Muslim Leveling | Bangun kebiasaan ibadah dengan lebih konsisten',
      description: 'Aplikasi Android untuk membantu Muslim muda menjaga ritme ibadah harian dengan quest, XP, streak, Al-Quran, dan belajar.',
    },
    navigation: { parent: 'A Lifetime Leveling product', language: 'English', android: 'Android' },
    hero: {
      title: 'Jadikan ibadah harian perjalanan yang lebih konsisten.',
      body: 'Selesaikan quest ibadah, kumpulkan XP, jaga streak, lalu kembali besok dengan langkah yang terasa mungkin.',
      cta: 'Download di Google Play',
      note: 'Gratis untuk Android · Google Sign-In opsional untuk backup progres.',
    },
    dailyLoop: {
      label: 'Contoh alur harian',
      title: 'Hari ini, bukan nanti.',
      steps: ['Waktu shalat tiba', 'Selesaikan quest ibadah', 'Dapatkan XP', 'Lanjutkan streak dengan tenang'],
    },
    screenshots: [
      { title: 'Quest yang dekat dengan harimu', body: 'Catat ibadah harian dan lihat progresnya dalam satu tempat.', alt: 'Layar Android Muslim Leveling yang menampilkan quest ibadah harian dan XP' },
      { title: 'Progres yang terlihat', body: 'Streak dan pencapaian membuat langkah yang sudah kamu jaga tetap terasa berarti.', alt: 'Layar Android Muslim Leveling yang menampilkan streak dan pencapaian' },
      { title: 'Al-Quran dan murottal', body: 'Lanjutkan bacaan dan dengarkan murottal tanpa keluar dari perjalananmu.', alt: 'Layar Android Muslim Leveling yang menampilkan pembaca Al-Quran dan murottal' },
      { title: 'Belajar sedikit demi sedikit', body: 'Artikel dan kuis membantu pembelajaran tetap terhubung dengan praktik harian.', alt: 'Layar Android Muslim Leveling yang menampilkan artikel atau kuis belajar' },
    ],
    compassion: {
      title: 'Konsisten dengan ruang untuk ritmemu.',
      body: 'Pengingat mengikuti waktu ibadah. Mode haid membantu menjaga perjalananmu tanpa memaksakan ritme yang tidak sesuai.',
    },
    privacyFacts: {
      title: 'Privat sejak awal.',
      body: 'Progres utama disimpan di perangkat. Backup Google bersifat opsional. Muslim Leveling tidak menayangkan iklan atau memakai tracker pemasaran; laporan crash anonim digunakan untuk memperbaiki aplikasi.',
      links: ['Kebijakan privasi', 'Hapus akun'],
    },
  },
  en: {
    googlePlayUrl: 'https://play.google.com/store/apps/details?id=id.muslimleveling.muslim_leveling',
    meta: {
      title: 'Muslim Leveling | Build more consistent worship habits',
      description: 'An Android app that helps young Muslims keep a daily worship rhythm with quests, XP, streaks, Quran, and learning.',
    },
    navigation: { parent: 'A Lifetime Leveling product', language: 'Bahasa Indonesia', android: 'Android' },
    hero: {
      title: 'Make daily worship a more consistent journey.',
      body: 'Complete worship quests, collect XP, keep your streak, and return tomorrow with a step that feels possible.',
      cta: 'Download on Google Play',
      note: 'Free for Android · Google Sign-In is optional for progress backup.',
    },
    dailyLoop: {
      label: 'An example daily flow',
      title: 'Today, not someday.',
      steps: ['A prayer time arrives', 'Complete a worship quest', 'Earn XP', 'Continue your streak with care'],
    },
    screenshots: [
      { title: 'Quests close to your day', body: 'Record daily worship and see its progress in one place.', alt: 'Muslim Leveling Android screen showing daily worship quests and XP' },
      { title: 'Progress you can see', body: 'Streaks and achievements help the steps you kept feel meaningful.', alt: 'Muslim Leveling Android screen showing a streak and achievements' },
      { title: 'Quran and murottal', body: 'Continue reading and listen to murottal without leaving your journey.', alt: 'Muslim Leveling Android screen showing the Quran reader and murottal' },
      { title: 'Learn a little at a time', body: 'Articles and quizzes keep learning connected to daily practice.', alt: 'Muslim Leveling Android screen showing a learning article or quiz' },
    ],
    compassion: {
      title: 'Consistency with room for your rhythm.',
      body: 'Reminders follow worship times. Haid mode helps preserve your journey without forcing an unsuitable rhythm.',
    },
    privacyFacts: {
      title: 'Private by default.',
      body: 'Primary progress stays on your device. Google backup is optional. Muslim Leveling has no ads or marketing trackers; anonymized crash reports help improve the app.',
      links: ['Privacy policy', 'Delete account'],
    },
  },
} as const satisfies Record<Locale, MuslimProductContent>;
```

Copy the actual Android launcher icon from `C:\Users\Administrator\Documents\Muslim Leveling\android\app\src\main\res\mipmap-xxxhdpi\ic_launcher.png` to both `src/muslim/assets/app-icon.png` and `public/muslim/brand/muslim-leveling-icon.png`; the public copy is the stable Open Graph image source. Capture the five named product states in the Android app, save them as the five named PNG paths, and review each image against the content label before adding it. Use no capture that exposes an account email, access token, private location, or developer-only debug information.

- [ ] **Step 4: Verify facts and assets before any page renders them.**

Run: `npm run test:unit -- tests/unit/muslim-product-content.test.ts`

Expected: 2 passing tests.

Run: `npm run test:unit -- tests/unit/muslim-media.test.ts`

Expected: 1 passing test after all six checked-in assets exist.

Compare every privacy sentence in `muslimProductContent` with the current privacy policy source. Confirm that the Google Play package identifier remains `id.muslimleveling.muslim_leveling` before release.

- [ ] **Step 5: Commit product facts and authentic media.**

```bash
git add src/shared/content/muslim-product.ts src/muslim/assets public/muslim/brand/muslim-leveling-icon.png tests/unit/muslim-product-content.test.ts tests/unit/muslim-media.test.ts
git commit -m "feat: add verified Muslim Leveling content and media"
```

### Task 2: Build the Android-first landing experience

**Files:**

- Create: `public/muslim/brand/lifetime-leveling-crest.png`
- Create: `src/muslim/components/ProductShell.astro`
- Create: `src/muslim/components/ProductNavigation.astro`
- Create: `src/muslim/components/AndroidDownloadButton.astro`
- Create: `src/muslim/components/AndroidFrame.astro`
- Create: `src/muslim/components/ProductHero.astro`
- Create: `src/muslim/components/DailyLoop.astro`
- Create: `src/muslim/components/ScreenshotStory.astro`
- Create: `src/muslim/components/CompassionSection.astro`
- Create: `src/muslim/components/PrivacyFacts.astro`
- Create: `src/muslim/components/ProductFooter.astro`
- Create: `src/muslim/styles/muslim.css`
- Create: `src/muslim/pages/index.astro`
- Create: `src/muslim/pages/en/index.astro`
- Create: `tests/e2e/muslim.spec.ts`

**Interfaces:**

- Consumes: `muslimProductContent`, real `ImageMetadata` imported from six assets, shared locale/SEO/shell primitives.
- Produces: both product landing pages, a reusable `AndroidDownloadButton`, and an `AndroidFrame` accepting `{ image, alt, priority? }`.
- Produces: a visible direct Google Play link and no secondary distribution store action.

- [ ] **Step 1: Write the failing Android-first browser tests.**

```ts
// tests/e2e/muslim.spec.ts
import { expect, test } from '@playwright/test';

test('product hero gives an Android download action in the first viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Jadikan ibadah harian perjalanan yang lebih konsisten.',
  );
  await expect(page.getByRole('link', { name: 'Download di Google Play' })).toHaveAttribute(
    'href',
    'https://play.google.com/store/apps/details?id=id.muslimleveling.muslim_leveling',
  );
  await expect(page.getByText('Gratis untuk Android · Google Sign-In opsional untuk backup progres.')).toBeVisible();
  await expect(page.getByText('Android', { exact: true })).toBeVisible();
  await expect(page.getByText(/App Store|iOS/i)).toHaveCount(0);
});

test('product proof uses authentic images with useful alternatives', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByAltText('Layar Android Muslim Leveling yang menampilkan quest ibadah harian dan XP')).toBeVisible();
  await expect(page.getByAltText('Layar Android Muslim Leveling yang menampilkan pembaca Al-Quran dan murottal')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Kebijakan privasi' })).toHaveAttribute('href', '/privacy/');
});
```

- [ ] **Step 2: Run the tests to verify there is no product surface yet.**

Run: `npm run build:muslim`

Expected: the build has no completed product landing route or the tests cannot find the required page content.

Run: `npm run test:e2e:muslim`

Expected: the first test fails because the Android download action is absent.

- [ ] **Step 3: Implement the green-and-gold product system and semantic page sequence.**

Copy the same supplied crest into `public/muslim/brand/lifetime-leveling-crest.png` for the 16-20 px parent endorsement only. Do not use purple as a product background, border system, or reward color.

`ProductShell.astro` wraps `SiteShell` with `surface="muslim"`, imports `muslim.css`, and supplies `image="/brand/muslim-leveling-icon.png"` to `BaseHead` for a stable real Open Graph image. `ProductNavigation.astro` has a small linked `A Lifetime Leveling product` endorsement, real product icon/name, Android status, and `LocaleSwitcher`. `AndroidDownloadButton.astro` must render an ordinary external `<a>` with `target="_blank"`, `rel="noreferrer"`, `href={googlePlayUrl}`, and a minimum 44 px target.

`AndroidFrame.astro` imports `Image` from `astro:assets` and accepts the actual image metadata:

```astro
---
import { Image, type ImageMetadata } from 'astro:assets';

interface Props {
  image: ImageMetadata;
  alt: string;
  priority?: boolean;
}

const { image, alt, priority = false } = Astro.props;
---

<figure class="android-frame">
  <Image src={image} alt={alt} widths={[360, 540, 720]} formats={['webp']} loading={priority ? 'eager' : 'lazy'} />
</figure>
```

Compose the landing page in this order: hero with one real quest screenshot and Google Play action; clearly-labelled example daily loop; four-image screenshot story; compassion section mentioning haid mode; factual privacy facts with legal links; final download close and support/legal footer. Render the daily loop as an ordered list and label it as an example so it is never mistaken for the visitor's live prayer data.

Use these product tokens in `muslim.css`:

```css
:root {
  --muslim-green: #047857;
  --muslim-green-deep: #065f46;
  --muslim-gold: #f59e0b;
  --muslim-warm-white: #fafaf7;
  --muslim-ink: #1a1a1a;
}

.product-page {
  background: var(--muslim-warm-white);
  color: var(--muslim-ink);
}

.download-button {
  background: var(--muslim-green);
  color: var(--muslim-warm-white);
}

.download-button:focus-visible {
  outline: 3px solid var(--muslim-gold);
  outline-offset: 4px;
}
```

- [ ] **Step 4: Verify product truth, responsive images, and English routing.**

Run: `npm run build:muslim`

Expected: `dist/muslim/index.html`, `dist/muslim/en/index.html`, responsive `/_astro` image derivatives, and a Muslim-specific sitemap exist.

Run: `npm run test:e2e:muslim`

Expected: 2 passing browser tests.

At 390 px, verify the Google Play action can be reached without passing the daily-loop section. At 1440 px, verify the green-and-gold product surface remains dominant and the parent endorsement stays visually subordinate.

- [ ] **Step 5: Commit the Android-first product landing page.**

```bash
git add public/muslim/brand/lifetime-leveling-crest.png src/muslim/components src/muslim/styles/muslim.css src/muslim/pages/index.astro src/muslim/pages/en/index.astro tests/e2e/muslim.spec.ts
git commit -m "feat: build Android-first Muslim Leveling landing page"
```

### Task 3: Publish factual product legal, support, and account-deletion routes

**Files:**

- Create: `src/shared/content/legal/muslim.ts`
- Create: `src/muslim/pages/privacy/index.astro`
- Create: `src/muslim/pages/terms/index.astro`
- Create: `src/muslim/pages/support/index.astro`
- Create: `src/muslim/pages/delete-account/index.astro`
- Create: `src/muslim/pages/en/privacy/index.astro`
- Create: `src/muslim/pages/en/terms/index.astro`
- Create: `src/muslim/pages/en/support/index.astro`
- Create: `src/muslim/pages/en/delete-account/index.astro`
- Modify: `tests/e2e/muslim.spec.ts`

**Interfaces:**

- Consumes: `LegalDocument.astro` from the studio plan and published Muslim Leveling privacy facts.
- Produces: `muslimLegal: Record<Locale, MuslimLegalDocuments>` with `privacy`, `terms`, `support`, and `deleteAccount` documents.
- Produces: all Google OAuth public policy URLs at the product host, in both locales.

- [ ] **Step 1: Add failing legal and support route tests.**

```ts
test('privacy, terms, support, and deletion pages are public and canonical', async ({ page }) => {
  await page.goto('/privacy/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kebijakan Privasi Muslim Leveling');
  await expect(page.getByText('Google Account (opsional)')).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://muslim.lifetimeleveling.com/privacy/',
  );

  await page.goto('/delete-account/');
  await expect(page.getByRole('link', { name: 'muslim.leveling@gmail.com' })).toHaveAttribute(
    'href',
    'mailto:muslim.leveling@gmail.com',
  );

  await page.goto('/en/support/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Muslim Leveling Support');
});
```

- [ ] **Step 2: Run the test to verify legal routes are absent.**

Run: `npm run test:e2e:muslim`

Expected: the added test fails because the legal pages do not exist.

- [ ] **Step 3: Migrate the policy faithfully and add the remaining public documents.**

Create Indonesian and English documents with an effective date of `4 August 2026` until the owner supplies a new approved date. The privacy document must accurately cover these published facts:

1. Optional device-only location for prayer times, with coordinates sent over HTTPS to eQuran.id and MyQuran.com when used; manual city selection remains available.
2. Optional Google Account email, name, and photo used only for backup/sync.
3. Quest progress, XP, achievements, and learning records stored locally; a signed-in backup copy syncs to Supabase PostgreSQL.
4. Local prayer notifications and alarms that do not send data away.
5. Anonymized Sentry crash reports containing device model, OS version, and stack trace, not personal content.
6. No ads, ad trackers, or analytics for marketing; no sale of personal data; no location-history or background-location tracking.
7. Supabase, Sentry, Google Sign-In, eQuran.id, and MyQuran.com as named third parties.
8. Account deletion by email within 7 days.

The deletion page must state the exact support address `muslim.leveling@gmail.com`, ask the user to email from the Google account used for optional backup when possible, use the request phrase `Delete my Muslim Leveling account`, and explain that uninstalling removes local-only data while the email request removes server-side backup data. The support page must list only supported topics: account deletion, optional sign-in/backup, purchase-free app access, prayer schedule/reminder troubleshooting, and bug reports. It must not promise a response time.

The terms document must state: use of the app/website is at the user's discretion; the product supports worship routines but does not replace personal religious judgement; service availability may change; intellectual property remains with Lifetime Leveling or its licensors; misuse is prohibited; and the contact route is `muslim.leveling@gmail.com`. Mark the terms in the project review notes as awaiting owner legal approval, and do not deploy them to production until approval is given.

Use `LegalDocument.astro` for every page, passing the correct `surface="muslim"`, `locale`, and local path. Add locale-switch links that stay on the same document type.

- [ ] **Step 4: Verify text, canonical metadata, and policy-route discoverability.**

Run: `npm run build:muslim`

Expected: all eight legal/support routes appear in `dist/muslim`, and `sitemap-index.xml` references the product sitemap.

Run: `npm run test:e2e:muslim`

Expected: 3 passing browser tests.

Compare the built Indonesian privacy page line by line with `C:\Users\Administrator\Documents\Muslim Leveling\docs\privacy-policy.md` and the latest repository `main` version. Record any factual change in the app repository first, then reflect the same approved wording here.

- [ ] **Step 5: Commit the product public-verification surface.**

```bash
git add src/shared/content/legal/muslim.ts src/muslim/pages/privacy src/muslim/pages/terms src/muslim/pages/support src/muslim/pages/delete-account src/muslim/pages/en/privacy src/muslim/pages/en/terms src/muslim/pages/en/support src/muslim/pages/en/delete-account tests/e2e/muslim.spec.ts
git commit -m "feat: add Muslim Leveling legal and support routes"
```

### Task 4: Execute the soft-launch verification and GCP ownership checklist

**Files:**

- Create: `docs/google-verification-soft-launch.md`
- Modify: `tests/e2e/muslim.spec.ts`
- Modify: `.github/workflows/publish-static.yml`

**Interfaces:**

- Consumes: completed static output, public product policy URLs, Hostinger `deploy` branch mapping, and the Android application ID.
- Produces: an owner-operated checklist for Search Console, Google OAuth consent verification, Hostinger deployment, and a reproducible release test set.

- [ ] **Step 1: Add failing release assertions for static discoverability.**

```ts
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
```

- [ ] **Step 2: Run the release assertion to verify the deployed static output is incomplete.**

Run: `npm run build`

Expected: build or route output fails until every surface page and robots file exists.

Run: `npm run test:e2e:muslim`

Expected: the release assertion fails until the product static host serves its robots and sitemap files.

- [ ] **Step 3: Complete release automation and write the owner checklist.**

Ensure `publish-static.yml` invokes both `npm run test:e2e:studio` and `npm run test:e2e:muslim` after `npm run build`, before `npm run assemble:deploy`. Keep the deployment action limited to pushes from `main`.

Write `docs/google-verification-soft-launch.md` with these exact owner actions:

1. In DNS for `lifetimeleveling.com`, add the Google Search Console TXT record for a **Domain property** and complete verification. This property covers the Muslim subdomain.
2. In Hostinger, map `lifetimeleveling.com` to `public_html` and `muslim.lifetimeleveling.com` to `public_html/muslim`, enable HTTPS for both, and verify the four Indonesian product URLs plus their English counterparts in a logged-out browser.
3. In Google Cloud, keep the mobile Android OAuth client registered for package `id.muslimleveling.muslim_leveling` and the release-keystore SHA-1. Retain the existing web/server OAuth client only because the Android app passes it as `serverClientId` for its native token exchange with Supabase; do not add website JavaScript origins, browser redirects, or a website sign-in flow.
4. Configure the OAuth consent screen/application public links to `https://muslim.lifetimeleveling.com/`, `https://muslim.lifetimeleveling.com/privacy/`, and `https://muslim.lifetimeleveling.com/terms/`. Add the verified owner domain only after those HTTPS routes are live.
5. Confirm the consent copy says Google Sign-In is optional and used solely for progress backup/sync.
6. Submit only after the owner has approved the bilingual privacy and terms text, reviewed all real screenshots, and clicked each Google Play/privacy/terms/deletion/support link on Android and desktop.

- [ ] **Step 4: Run the complete release test set and perform the production smoke test.**

Run: `npm run check`

Expected: Astro and TypeScript pass.

Run: `npm run test:unit`

Expected: all content, route, deploy-layout, and authentic-media tests pass.

Run: `npm run build`

Expected: both host-specific static builds succeed.

Run: `npm run test:e2e:studio`

Expected: every studio browser test passes.

Run: `npm run test:e2e:muslim`

Expected: every Muslim Leveling browser test passes.

After Hostinger receives the `deploy` branch, check `https://lifetimeleveling.com/`, `https://lifetimeleveling.com/en/`, `https://muslim.lifetimeleveling.com/`, `https://muslim.lifetimeleveling.com/en/`, `/privacy/`, `/terms/`, `/support/`, and `/delete-account/` in a logged-out browser. Confirm HTTPS, canonical host, visible language link, Google Play link, and no 404 asset requests.

- [ ] **Step 5: Commit release hardening and tag the soft-launch candidate.**

```bash
git add docs/google-verification-soft-launch.md tests/e2e/muslim.spec.ts .github/workflows/publish-static.yml
git commit -m "docs: add Muslim Leveling soft-launch verification"
git tag -a v0.1.0-soft-launch -m "Lifetime Leveling web soft launch"
```

## Product and Soft-Launch Completion Check

- The product site feels like Muslim Leveling first, with only a quiet parent-studio endorsement.
- One Google Play call to action is available in the first mobile viewport; no iOS language or button appears anywhere.
- All six assets are real, reviewed Android material; no generated mockup screen is shipped.
- Public privacy, terms, support, and deletion pages are bilingual, canonical, indexed intentionally, and owner-approved before production.
- Search Console domain verification, Android OAuth ownership, and the public HTTPS URLs are configured without making GCP the website host.
