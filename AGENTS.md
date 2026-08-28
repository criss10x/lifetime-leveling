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
│   └── [FeatureCatalog, DailyLoop, ScreenshotStory, CompassionSection, PrivacyFacts, ProductFooter].astro
├── styles/muslim.css             # ONLY stylesheet for Muslim surface
├── content/muslim-product.ts     # All copy: hero, features, navigation, meta
├── pages/                        # index.astro, en/index.astro, privacy/, delete-account/, support/, terms/
```

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
