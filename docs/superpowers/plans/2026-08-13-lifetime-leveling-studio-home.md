# Lifetime Leveling Studio Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the bilingual Lifetime Leveling studio homepage and its minimal studio legal pages around the approved Comp A "Crest as North Star" composition.

**Architecture:** The studio surface is a static Astro site using the shared locale, SEO, and accessibility primitives from the foundation plan. Its visual system is a dark-violet night atlas: the supplied dragon crest is one singular artifact, an inline SVG route provides the structural transition, and the featured Muslim Leveling field deliberately changes to green and gold.

**Tech Stack:** Astro components, TypeScript locale dictionaries, scoped CSS plus shared foundations, inline SVG, small browser JavaScript for progressive route drawing, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-13-lifetime-leveling-web-design.md`

## Global Constraints

- Complete `2026-08-13-lifetime-leveling-foundation.md` first.
- Follow the approved surface brief at `.impeccable/surfaces/src-pages-index-astro.md` and the reference composition at `.impeccable/mocks/studio-home-comp-a-crest-north-star.png`.
- Treat that mockup as hierarchy and visual-language reference only. Do not use its generated device, app UI, or product mark as production imagery.
- Use the supplied purple dragon crest only after copying it into `public/studio/brand/lifetime-leveling-crest.png`.
- Use studio violet only on studio surfaces; Muslim Leveling remains green and gold in the featured field.
- Do not build a fake multi-product catalogue, email waitlist, user metric, testimonial, iOS mention, or generic SaaS card grid.
- Use `Archivo Variable` for studio display text and `Manrope Variable` for interface/body text, from the Fontsource packages installed in the foundation plan. Use Archivo's `wdth` axis to create the wide display treatment.
- Keep the initial viewport meaningful at 360 px and avoid text embedded solely in images.

---

## Planned File Structure

```text
public/studio/
  brand/lifetime-leveling-crest.png
  site.webmanifest
src/
  shared/
    content/studio.ts
    content/legal/studio.ts
    components/LegalDocument.astro
  studio/
    components/StudioShell.astro
    components/StudioNavigation.astro
    components/AtlasRoute.astro
    components/StudioHero.astro
    components/FeaturedProduct.astro
    components/ProgressPrinciples.astro
    components/Horizon.astro
    components/StudioFooter.astro
    styles/studio.css
    pages/index.astro
    pages/en/index.astro
    pages/privacy/index.astro
    pages/terms/index.astro
    pages/en/privacy/index.astro
    pages/en/terms/index.astro
tests/
  unit/studio-content.test.ts
  e2e/studio.spec.ts
```

### Task 1: Define studio copy and route-safe content contracts

**Files:**

- Create: `src/shared/content/studio.ts`
- Create: `tests/unit/studio-content.test.ts`

**Interfaces:**

- Consumes: `Locale` from `src/shared/i18n/types.ts`.
- Produces: `studioContent: Record<Locale, StudioContent>` for all studio page components.
- Produces: `StudioContent` fields `meta`, `navigation`, `hero`, `featuredProduct`, `principles`, `horizon`, and `footer`.

- [ ] **Step 1: Write the failing bilingual-content test.**

```ts
// tests/unit/studio-content.test.ts
import { describe, expect, it } from 'vitest';
import { studioContent } from '../../src/shared/content/studio';

describe('studio content', () => {
  it('keeps the approved promise and product destination in both locales', () => {
    expect(studioContent.id.hero.title).toBe('Aplikasi untuk membuat progres terasa nyata.');
    expect(studioContent.en.hero.title).toBe('Apps that make progress feel real.');
    expect(studioContent.id.featuredProduct.href).toBe('https://muslim.lifetimeleveling.com/');
    expect(studioContent.en.featuredProduct.href).toBe('https://muslim.lifetimeleveling.com/en/');
  });

  it('does not advertise unsupported distribution platforms', () => {
    for (const locale of ['id', 'en'] as const) {
      expect(JSON.stringify(studioContent[locale])).not.toMatch(/iOS|App Store/i);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify the content module is absent.**

Run: `npm run test:unit -- tests/unit/studio-content.test.ts`

Expected: Vitest reports that `src/shared/content/studio` cannot be resolved.

- [ ] **Step 3: Implement the typed Indonesian and English dictionary.**

Use a readonly `StudioContent` interface and put these approved values in the dictionary:

```ts
export const studioContent = {
  id: {
    meta: {
      title: 'Lifetime Leveling | Aplikasi untuk progres yang terasa nyata',
      description: 'Lifetime Leveling membuat aplikasi yang membantu progres harian terasa lebih jelas dan berkelanjutan.',
    },
    navigation: { product: 'Muslim Leveling', language: 'English' },
    hero: {
      eyebrow: 'LIFETIME LEVELING / ROUTE 00',
      title: 'Aplikasi untuk membuat progres terasa nyata.',
      body: 'Kami membuat aplikasi fokus yang mengubah niat baik menjadi ritme kecil yang bisa kamu lihat, rasakan, dan lanjutkan.',
      cta: 'Jelajahi Muslim Leveling',
      crestAlt: 'Lambang naga ungu Lifetime Leveling',
    },
    featuredProduct: {
      index: '01',
      label: 'Rute pertama',
      name: 'Muslim Leveling',
      body: 'Teman Android untuk membangun kebiasaan ibadah melalui ritme harian yang suportif.',
      tags: ['Quest ibadah harian', 'XP dan streak', 'Al-Quran dan belajar'],
      cta: 'Lihat Muslim Leveling',
      href: 'https://muslim.lifetimeleveling.com/',
    },
    principles: [
      ['01', 'Mulai dari hari ini', 'Hal kecil yang jelas lebih mudah dijaga daripada target yang terasa jauh.'],
      ['02', 'Lihat langkahmu', 'Progres yang terlihat memberi alasan yang tenang untuk kembali besok.'],
      ['03', 'Kembali dengan baik', 'Ritme yang manusiawi memberi ruang untuk lanjut, bukan tekanan untuk sempurna.'],
    ],
    horizon: 'Rute berikutnya sedang dipetakan.',
    footer: { productSupport: 'Dukungan produk', legal: 'Legal' },
  },
  en: {
    meta: {
      title: 'Lifetime Leveling | Apps that make progress feel real',
      description: 'Lifetime Leveling makes focused apps that make daily progress clearer and easier to continue.',
    },
    navigation: { product: 'Muslim Leveling', language: 'Bahasa Indonesia' },
    hero: {
      eyebrow: 'LIFETIME LEVELING / ROUTE 00',
      title: 'Apps that make progress feel real.',
      body: 'We make focused apps that turn good intentions into small rhythms you can see, feel, and continue.',
      cta: 'Explore Muslim Leveling',
      crestAlt: 'Lifetime Leveling purple dragon crest',
    },
    featuredProduct: {
      index: '01',
      label: 'First route',
      name: 'Muslim Leveling',
      body: 'An Android companion for building worship habits through a supportive daily rhythm.',
      tags: ['Daily worship quests', 'XP and streaks', 'Quran and learning'],
      cta: 'Explore Muslim Leveling',
      href: 'https://muslim.lifetimeleveling.com/en/',
    },
    principles: [
      ['01', 'Begin today', 'A clear small action is easier to sustain than a distant target.'],
      ['02', 'See your steps', 'Visible progress gives a calm reason to return tomorrow.'],
      ['03', 'Return with care', 'A human rhythm creates room to continue instead of pressure to be perfect.'],
    ],
    horizon: 'More routes are being charted.',
    footer: { productSupport: 'Product support', legal: 'Legal' },
  },
} as const satisfies Record<Locale, StudioContent>;
```

Define `StudioContent` from this object shape so components cannot invent copy or route URLs. Keep the product support destination as `mailto:muslim.leveling@gmail.com`, explicitly labelled as product support rather than a generic studio inbox.

- [ ] **Step 4: Run the content test and strict checker.**

Run: `npm run test:unit -- tests/unit/studio-content.test.ts`

Expected: 2 passing tests.

Run: `npm run check`

Expected: no type error in the locale dictionary.

- [ ] **Step 5: Commit the studio copy contract.**

```bash
git add src/shared/content/studio.ts tests/unit/studio-content.test.ts
git commit -m "feat: add bilingual studio content"
```

### Task 2: Build the approved north-star hero and route system

**Files:**

- Create: `public/studio/brand/lifetime-leveling-crest.png`
- Create: `public/studio/site.webmanifest`
- Create: `src/studio/components/StudioShell.astro`
- Create: `src/studio/components/StudioNavigation.astro`
- Create: `src/studio/components/AtlasRoute.astro`
- Create: `src/studio/components/StudioHero.astro`
- Create: `src/studio/styles/studio.css`
- Create: `src/studio/pages/index.astro`
- Create: `src/studio/pages/en/index.astro`
- Create: `playwright.config.ts`
- Create: `tests/e2e/studio.spec.ts`

**Interfaces:**

- Consumes: `SiteShell`, `LocaleSwitcher`, `studioContent`, and the exact crest asset path.
- Produces: two homepage routes with the same semantic structure and locale-specific copy.
- Produces: `[data-atlas-route]`, an aria-hidden SVG whose path is fully visible without JavaScript and may draw progressively for motion-capable visitors.

- [ ] **Step 1: Write the failing homepage browser tests.**

```ts
// tests/e2e/studio.spec.ts
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
});

test('studio route is static and complete when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('[data-atlas-route] path')).toHaveCSS('stroke-dashoffset', '0px');
});
```

- [ ] **Step 2: Run the tests to verify the homepage is not present.**

Run: `npm run build:studio`

Expected: the build has no studio homepage or the following browser test cannot find the expected heading.

Run: `npm run test:e2e:studio`

Expected: the first test fails because the home route does not contain the approved hero.

- [ ] **Step 3: Copy the authentic crest and implement the visual hierarchy.**

Copy `E:\New folder\Glowing Purple Dragon Crest.png` into `public/studio/brand/lifetime-leveling-crest.png`. Add a dark `site.webmanifest` that uses `/brand/lifetime-leveling-crest.png` for its icon; do not generate a substitute dragon logo.

`StudioShell.astro` must wrap the shared `SiteShell` with `surface="studio"`, import `studio.css`, set the approved title/description plus `image="/brand/lifetime-leveling-crest.png"` via `BaseHead`, and expose a single `main` landmark. `StudioNavigation.astro` contains the compact crest mark, `Lifetime Leveling` wordmark, a product link, and `LocaleSwitcher`.

Implement the structural route as an inline SVG rather than an image:

```astro
<!-- src/studio/components/AtlasRoute.astro -->
<svg data-atlas-route aria-hidden="true" viewBox="0 0 1440 900" preserveAspectRatio="none">
  <path class="atlas-route__halo" d="M 1120 76 C 910 182, 1140 332, 846 440 S 488 642, 596 860" pathLength="1" />
  <path class="atlas-route__line" d="M 1120 76 C 910 182, 1140 332, 846 440 S 488 642, 596 860" pathLength="1" />
</svg>
```

Use the studio tokens below; the featured product colors belong only to the downstream product panel added in Task 3:

```css
:root {
  --studio-obsidian: #09070f;
  --studio-violet-deep: #1a0d2d;
  --studio-violet: #8b3dff;
  --studio-violet-light: #c45cff;
  --studio-lavender: #e8dcff;
  --studio-mist: #dcd4e8;
}

[data-atlas-route] {
  inset: 0;
  pointer-events: none;
  position: absolute;
}

.atlas-route__line {
  fill: none;
  stroke: var(--studio-violet-light);
  stroke-width: 2;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
}

@media (prefers-reduced-motion: no-preference) {
  .atlas-route__line { stroke-dashoffset: var(--atlas-route-offset, 1); }
}

@media (prefers-reduced-motion: reduce) {
  .atlas-route__line { stroke-dashoffset: 0; }
}
```

Attach a small inline script only for `prefers-reduced-motion: no-preference`: calculate scroll progress from the SVG bounding rectangle, set `--atlas-route-offset` between `1` and `0`, and use `requestAnimationFrame` from passive `scroll` and `resize` listeners. It must never hide the complete route before JavaScript runs. The hero uses the crest once, an asymmetric grid, the approved title/body/CTA, and real text for all labels.

Set `playwright.config.ts` to select the host by `PLAYWRIGHT_SURFACE`, so both this plan and the Muslim Leveling plan share one harness:

```ts
import { defineConfig, devices } from '@playwright/test';

const surface = process.env.PLAYWRIGHT_SURFACE === 'muslim' ? 'muslim' : 'studio';
const port = surface === 'studio' ? 4321 : 4322;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests/e2e',
  use: { ...devices['Desktop Chrome'], baseURL },
  webServer: {
    command: `node scripts/preview-surface.mjs ${surface} ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 4: Verify mobile hierarchy and reduced motion.**

Run: `npm run build:studio`

Expected: `dist/studio/index.html`, `dist/studio/en/index.html`, `dist/studio/brand/lifetime-leveling-crest.png`, and `dist/studio/_astro` exist.

Run: `npm run test:e2e:studio`

Expected: 2 passing browser tests at 390 px, including the reduced-motion assertion.

Use Playwright's screenshot command at 390 px and 1440 px for human comparison with Comp A. Keep the crest, asymmetric headline field, and route-to-product transition; reject any literal generated mockup device or fantasy scenery.

- [ ] **Step 5: Commit the studio hero surface.**

```bash
git add public/studio/brand/lifetime-leveling-crest.png public/studio/site.webmanifest src/studio/components src/studio/styles/studio.css src/studio/pages/index.astro src/studio/pages/en/index.astro playwright.config.ts tests/e2e/studio.spec.ts
git commit -m "feat: build Lifetime Leveling north-star homepage"
```

### Task 3: Add the featured-product field, studio principles, and horizon close

**Files:**

- Create: `src/studio/components/FeaturedProduct.astro`
- Create: `src/studio/components/ProgressPrinciples.astro`
- Create: `src/studio/components/Horizon.astro`
- Create: `src/studio/components/StudioFooter.astro`
- Modify: `src/studio/pages/index.astro`
- Modify: `src/studio/pages/en/index.astro`
- Modify: `src/studio/styles/studio.css`
- Modify: `tests/e2e/studio.spec.ts`

**Interfaces:**

- Consumes: `studioContent[locale].featuredProduct`, `.principles`, `.horizon`, and `.footer`.
- Produces: a semantic `section` for Muslim Leveling, an ordered three-principle list, and footer links without a catalogue abstraction.

- [ ] **Step 1: Extend the browser test with the required product proof.**

```ts
test('separates Muslim Leveling as a real first product, not a generic card', async ({ page }) => {
  await page.goto('/');

  const product = page.getByRole('region', { name: 'Muslim Leveling' });
  await expect(product.getByText('01')).toBeVisible();
  await expect(product.getByText('Quest ibadah harian')).toBeVisible();
  await expect(product.getByText('XP dan streak')).toBeVisible();
  await expect(product.getByText('Al-Quran dan belajar')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Rute berikutnya sedang dipetakan.' })).toBeVisible();
});
```

- [ ] **Step 2: Run the focused test to verify the feature field is missing.**

Run: `npm run test:e2e:studio`

Expected: the added test fails because the product region and horizon heading do not exist.

- [ ] **Step 3: Implement the product transition and studio philosophy.**

`FeaturedProduct.astro` must render `<section aria-labelledby="muslim-leveling-title">`, include the route index as visible text, and use the product's own material tokens:

```css
.featured-product {
  background: #065f46;
  color: #fafaf7;
}

.featured-product__tag {
  border: 1px solid color-mix(in srgb, #f59e0b 68%, transparent);
  color: #fcd98a;
}

.featured-product__link:focus-visible {
  outline-color: #f59e0b;
}
```

The product link goes to the locale-matching Muslim subdomain and uses a visible arrow text treatment, not a false Google Play badge. `ProgressPrinciples.astro` renders the three content tuples as one `<ol>`, with each item headed by the real title. `Horizon.astro` uses the locale-specific horizon text as an `h2`; it contains no signup field, teaser card, or countdown. `StudioFooter.astro` links to `/privacy/`, `/terms/`, the locale counterpart, `https://muslim.lifetimeleveling.com/`, and `mailto:muslim.leveling@gmail.com` labelled as product support.

- [ ] **Step 4: Verify both locale routes and keyboard order.**

Run: `npm run build:studio`

Expected: both localized HTML routes are generated with no broken import or asset path.

Run: `npm run test:e2e:studio`

Expected: 3 passing tests.

In a browser, tab from the skip link through navigation, product CTA, footer legal links, and locale link. Every focus target must remain visible against its surface.

- [ ] **Step 5: Commit the completed studio homepage.**

```bash
git add src/studio/components/FeaturedProduct.astro src/studio/components/ProgressPrinciples.astro src/studio/components/Horizon.astro src/studio/components/StudioFooter.astro src/studio/pages/index.astro src/studio/pages/en/index.astro src/studio/styles/studio.css tests/e2e/studio.spec.ts
git commit -m "feat: add studio product route and principles"
```

### Task 4: Publish minimal studio privacy and terms pages with an owner-review gate

**Files:**

- Create: `src/shared/content/legal/studio.ts`
- Create: `src/shared/components/LegalDocument.astro`
- Create: `src/studio/pages/privacy/index.astro`
- Create: `src/studio/pages/terms/index.astro`
- Create: `src/studio/pages/en/privacy/index.astro`
- Create: `src/studio/pages/en/terms/index.astro`
- Modify: `tests/e2e/studio.spec.ts`

**Interfaces:**

- Consumes: `SiteShell`, `studioContent`, and locale metadata helpers.
- Produces: matching Indonesian and English static legal routes for the studio host.
- Produces: `studioLegal[locale].privacy` and `.terms`, each with an effective date and an array of semantic sections.

- [ ] **Step 1: Add failing legal-route browser checks.**

```ts
test('studio legal links resolve to canonical localized pages', async ({ page }) => {
  await page.goto('/privacy/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Privasi Lifetime Leveling');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://lifetimeleveling.com/privacy/',
  );

  await page.goto('/en/terms/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lifetime Leveling Terms');
});
```

- [ ] **Step 2: Run the browser check to verify the legal pages are absent.**

Run: `npm run test:e2e:studio`

Expected: the legal-route test fails with a missing heading or a 404 page.

- [ ] **Step 3: Implement limited factual studio legal content.**

Create concise content that says the studio website itself has no user accounts, payment, or website analytics; links to an app's own privacy page for app-specific data practices; and names the web host as a provider of standard server logs. Terms must state that the site is informational, content may change, product availability varies by region, and the published contact is `muslim.leveling@gmail.com` for the first product. Do not describe this text as legal advice and do not make claims about data practices that have not been verified.

`LegalDocument.astro` receives `{ document, locale, surface, path }`, renders its effective date and each section as `<section><h2>...</h2><p>...</p></section>`, and uses `SiteShell` to generate canonical and alternate links. Use the same component for all four routes.

- [ ] **Step 4: Verify pages and obtain the production approval gate.**

Run: `npm run build:studio`

Expected: the four legal routes appear in `dist/studio` and in its sitemap.

Run: `npm run test:e2e:studio`

Expected: 4 passing tests.

Before pushing the `deploy` branch to production, present the Indonesian and English terms text to the owner for explicit approval. Do not mark the studio terms as production-ready without that approval.

- [ ] **Step 5: Commit the studio legal surface.**

```bash
git add src/shared/content/legal/studio.ts src/shared/components/LegalDocument.astro src/studio/pages/privacy src/studio/pages/terms src/studio/pages/en/privacy src/studio/pages/en/terms tests/e2e/studio.spec.ts
git commit -m "feat: add bilingual studio legal pages"
```

## Studio Completion Check

- Comp A is recognizable in hierarchy: one crest, an asymmetric violet hero, and one route into the green-and-gold Muslim Leveling field.
- At 390 px, the h1 and product destination appear before any long philosophy content.
- At desktop width, the route supports the scan path without becoming decoration or requiring animation to understand the page.
- Both locales have title, description, canonical, `hreflang`, Open Graph metadata, legal links, and accessible language controls.
- Continue with `2026-08-13-muslim-leveling-product-surface.md` before the soft-launch production check.
