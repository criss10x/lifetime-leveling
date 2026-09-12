# AGENTS.md

Repo conventions for AI coding agents (Codex, Claude Code, Gemini, future tools).
**Read this before editing.**

## What this is

Astro 5 static site for **Lifetime Leveling** — umbrella studio of **Muslim Leveling** (Android worship app, Indonesian market).
- Studio surface: `lifetimeleveling.com`
- Muslim surface: `muslim.lifetimeleveling.com`
- Bilingual ID/EN via `[locale]` route segments (root = ID, `/en/` = EN)

## Build & test

```
npm run build:muslim       # build the Muslim surface only (fast)
npm run build:studio       # build the Studio surface
npm run build              # both
npm run test:e2e:muslim    # Playwright e2e for Muslim surface
npm run check:links        # verify static link integrity
```

Surface env var: `PLAYWRIGHT_SURFACE=muslim` (or `studio`) gates tests and the dev server.
e2e config auto-spawns preview on port 4322 with `reuseExistingServer: !CI`.

## Deploy flow (CRITICAL — easy to get wrong)

```
main (source)  →  GitHub Action  →  deploy (built dist, force-orphan)  →  Hostinger auto-sync
```

- **DO push source changes to `main`** — Action runs `npm ci` → tests → `npm run build` → `assemble:deploy` → `peaceiris/actions-gh-pages@v4` force-pushes `dist/deploy/` to the `deploy` branch.
- **DO NOT manually push to `deploy`** — `force_orphan: true` will discard your source code on next Action run.
- The `deploy` branch contains only built static files (root `index.html`, `en/`, `muslim/`, `_astro/`, `robots.txt`, `sitemap-index.xml`, `.nojekyll`).
- Workflow file: `.github/workflows/publish-static.yml`. Concurrency group `hostinger-static-deploy` prevents overlapping deploys.

## Muslim surface design system

File: `src/muslim/styles/muslim.css`

**Brand palette (raw, never use directly in component styles):**
- `--muslim-green: #047857`
- `--muslim-green-deep: #065f46`
- `--muslim-gold: #f59e0b` (hover `#fbbf24`)
- `--muslim-warm-white: #fafaf7`
- `--muslim-ink: #1a1a1a`

**Semantic tokens (use these in component styles, not raw palette):**
- Surfaces: `--muslim-surface`, `--muslim-surface-soft`, `--muslim-surface-alt`, `--muslim-surface-deep`, `--muslim-surface-brand`
- Text: `--muslim-text`, `--muslim-text-muted`, `--muslim-text-on-deep`, `--muslim-text-on-deep-muted`, `--muslim-text-on-brand`, `--muslim-text-gold`
- Borders/tiles: `--muslim-border`, `--muslim-border-on-deep`, `--muslim-tile`, `--muslim-tile-strong`, `--muslim-icon-bg`

These tokens flip on `:root[data-theme='dark']` — **never add a new hex color**; extend the token list instead.

## Dark mode conventions

- **Pre-paint boot:** inline `<script is:inline>` in `src/shared/components/BaseHead.astro` reads `localStorage['muslim-theme']` (falls back to `matchMedia('(prefers-color-scheme: dark)')`) and sets `document.documentElement.dataset.theme` BEFORE stylesheets load. Prevents flash.
- **Toggle UI:** button with `data-theme-toggle` attribute in `src/muslim/components/ProductNavigation.astro`. 44×44 min touch target, `aria-pressed` reflects state, sun/moon SVG swap via `:root[data-theme]`.
- **Toggle handler:** `src/muslim/components/ProductShell.astro` `<script>` block. Sets `documentElement.dataset.theme` AND `body.dataset.theme` (CSS keyed off `:root`), persists to localStorage with try/catch.
- **CSS dark palette:** `:root[data-theme='dark'] body[data-surface='muslim']` block in `muslim.css` overrides the 18 semantic tokens. Specificity (0,2,1) > base (0,1,1).
- **No `backdrop-filter` on `<header>`** — creates a containing block for `position: fixed` descendants (broke the floating CTA).

## Sticky header / floating CTA

- `body[data-surface='muslim'] > header` is `position: sticky; top: 0; z-index: 10` with `is-scrolled` class toggled by scroll listener (adds box-shadow).
- `.floating-cta` is `position: fixed; bottom: max(1rem, env(safe-area-inset-bottom, 0px))` on mobile only (≤760px). Hides on scroll past 8px (`.is-hidden`).
- `.product-navigation__cta` is the inline desktop download (≥761px).
- Scroll-reveal via IntersectionObserver targets `.feature-catalog, .daily-loop, .screenshot-story, .compassion-section, .privacy-facts`. Respects `prefers-reduced-motion`.

## Project structure (Muslim surface)

```
src/muslim/
├── components/
│   ├── ProductShell.astro        # Layout wrapper + <script> for all interactivity
│   ├── ProductNavigation.astro   # Nav + theme toggle + desktop CTA + mobile floating CTA
│   ├── ProductHero.astro         # Hero section (eyebrow, h1, tagline, CTA, 2 quick features)
│   ├── AndroidDownloadButton.astro  # Gold CTA, variant: 'default' | 'hero'
│   ├── AndroidFrame.astro        # Phone mockup wrapper
│   ├── ArticleLayout.astro       # Layout for SEO guide articles (breadcrumbs, meta, schema, CTA)
│   ├── GuidesSection.astro       # Homepage section displaying latest guide cards
│   └── [FeatureCatalog, DailyLoop, ScreenshotStory, CompassionSection, PrivacyFacts, ProductFooter].astro
├── styles/muslim.css             # ONLY stylesheet for Muslim surface
├── content/muslim-product.ts     # All copy: hero, features, navigation, meta
├── pages/                        # index.astro, en/index.astro, panduan/, privacy/, delete-account/, support/, terms/
src/shared/content/
├── guides.ts                     # Single source of truth for all SEO articles & guides
└── muslim-product.ts             # Marketing and app product copy
```

## Publishing SEO Articles & Guides (`/panduan/`)

Muslim Leveling uses a **Hub-and-Spoke (Topic Cluster)** architecture for SEO articles.
- Catalog Hub: `https://muslim.lifetimeleveling.com/panduan/` (and `/en/panduan/`)
- Article URLs: `https://muslim.lifetimeleveling.com/panduan/[slug]/`

### How to Create a New Article (2-Step Workflow)

When requested to create or publish a new article:

1. **Register metadata in `src/shared/content/guides.ts`**:
   Add an entry to `guidesData`:
   ```ts
   {
     slug: 'your-article-slug',
     title: 'Judul Lengkap Artikel (Menarik & Humanis)',
     description: 'Meta deskripsi ringkas untuk snippet Google dan kartu pratinjau (140-160 karakter).',
     category: 'Panduan Ibadah', // atau kategori lain yang relevan
     publishDate: 'YYYY-MM-DD',
     publishDateDisplay: 'DD MMMM YYYY',
     readingTime: '5 menit membaca',
     featured: true, // opsional: true untuk tampil di beranda
   }
   ```
   *Registering here automatically exposes the article in the `/panduan/` catalog hub, the homepage Guides section, and unit tests.*

2. **Create the article page in `src/muslim/pages/panduan/[slug]/index.astro`**:
   Use `<ArticleLayout>` with schema and copy:
   ```astro
   ---
   import ArticleLayout from '../../../components/ArticleLayout.astro';
   import { getGuideBySlug } from '@shared/content/guides';

   const guide = getGuideBySlug('your-article-slug')!;
   const articleSchema = {
     headline: guide.title,
     description: guide.description,
     datePublished: guide.publishDate,
     dateModified: guide.publishDate,
     authorName: 'Muslim Leveling',
     image: 'https://muslim.lifetimeleveling.com/brand/muslim-leveling-icon.png',
   };
   ---

   <ArticleLayout
     title={guide.title}
     description={guide.description}
     publishDate={guide.publishDate}
     publishDateDisplay={guide.publishDateDisplay}
     readingTime={guide.readingTime}
     category={guide.category}
     path={`/panduan/${guide.slug}/`}
     locale="id"
     {articleSchema}
   >
     <!-- Article content: h2, h3, p, ul, blockquote -->

     <!-- Optional Feature Callout for Muslim Leveling differentiators -->
     <div class="article-callout">
       <div class="article-callout__badge">Fitur Pembeda</div>
       <h3>Nama Fitur di Muslim Leveling</h3>
       <p>Penjelasan solusi kontekstual dari aplikasi.</p>
       <ul>
         <li>Poin manfaat 1</li>
         <li>Poin manfaat 2</li>
       </ul>
     </div>
   </ArticleLayout>
   ```

### Writing & SEO Style Rules for Articles:
- **No Em Dashes**: Never use em dashes (`—`). Use commas, colons, parentheses, or periods instead.
- **No AI Buzzwords/Clichés**: Avoid words like *delve, leverage, foster, streamline, tapestry, moreover, furthermore, paramount, beacon*.
- **Tone**: Warm, compassionate, spiritually grounded, authentic Indonesian Muslim vocabulary (*saudariku, datang bulan, ketenangan hati, keistiqamahan, ridha Allah*).
- **Product Integration**: Seamlessly connect the article's topic with a Muslim Leveling feature (e.g. Mode Haid, daily quests without guilt, prayer times, qibla, murottal, ad-free privacy).
- **Verification Commands after creating an article**:
  1. `npm run check:links` (ensure all static links resolve)
  2. `npm run test:e2e:muslim` (e2e suite verifies routing and schema)
  3. `npm run build:muslim` (build must succeed cleanly)


## Per-feature commit cadence

This repo values atomic, revert-friendly commits. When shipping a feature:
1. **chore:** refactor only (no behavior change) — separate commit, easy to revert
2. **feat:** user-facing change, including any cross-cutting UI work that touches the same files
3. **test:** blackbox e2e for the interactive parts

Combine steps 1+2 ONLY if the refactor and the feature share so many hunks that splitting is impractical. Always commit tests separately.

## Tests (Playwright)

- Spec file: `tests/e2e/muslim.spec.ts`
- Each test gets a fresh browser context — localStorage is per-test.
- For dark-mode tests: use `page.evaluate(() => { document.documentElement.dataset.theme = 'dark' })` for instant flip, or click `[data-theme-toggle]` and assert the state transition.

## Git workflow

- Branch: `main` (production)
- Other branches in use: `codex/lifetime-leveling-web`, `deploy` (CI-managed, force-orphan, do not push)
- Commits use `type(scope): summary` format. Examples: `chore(muslim):`, `feat(muslim):`, `fix(studio):`, `test(muslim):`
- Always rebuild after edits: `PLAYWRIGHT_SURFACE=muslim npm run build:muslim`
- Always run e2e after feature work: `PLAYWRIGHT_SURFACE=muslim npm run test:e2e:muslim`

## AI agent notes

- WIP from other agents may exist as uncommitted changes. Run `git status --short` and `git diff` before implementing requested features.
- "Implement → analyze + test → commit per feature" is the expected flow.
- For user-facing copy changes, follow `src/muslim/content/muslim-product.ts` (and `en` variant) — do not hardcode strings in templates.
- Cross-checks technical claims with Gemini when stakes are high (deploy, auth, payment).
