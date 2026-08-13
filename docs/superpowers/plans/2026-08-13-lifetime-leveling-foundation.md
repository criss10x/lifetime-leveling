# Lifetime Leveling Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a static Astro foundation that builds Lifetime Leveling and Muslim Leveling as independent, canonical HTTPS hosts from one TypeScript repository, then publishes only static output to a `deploy` branch for Hostinger.

**Architecture:** One Astro configuration selects either the studio or product surface through `SITE_SURFACE`. Each surface gets its own `src`, `public`, `dist`, and canonical `site` value, so `/assets` and `/_astro` resolve correctly when `muslim.lifetimeleveling.com` is mapped to `public_html/muslim`. Shared TypeScript, content types, accessibility primitives, locale routing, and SEO utilities live in `src/shared`.

**Tech Stack:** Astro static output, TypeScript strict mode, `@astrojs/sitemap`, local Fontsource packages, Vitest, Playwright, Node.js scripts, GitHub Actions, Hostinger Git auto-deploy.

**Spec:** `docs/superpowers/specs/2026-08-13-lifetime-leveling-web-design.md`

## Global Constraints

- Build static HTML only; Hostinger shared hosting must not run a Node.js server.
- Use Astro + TypeScript. Do not add React or a runtime-heavy UI library.
- Build `lifetimeleveling.com` and `muslim.lifetimeleveling.com` separately, with their own canonical URLs and asset roots.
- Bahasa Indonesia is the root locale; English uses `/en/` on each host.
- The first release is Android-only. Never include an iOS or App Store call to action.
- Google Sign-In is optional and is described only as cloud backup/sync.
- Copy the supplied dragon crest into the repository before using it at runtime; never reference `E:\New folder\Glowing Purple Dragon Crest.png` from the deployed site.
- Keep all navigation, locale controls, and calls to action keyboard accessible, with a visible focus style and 44 px minimum touch target.
- Respect `prefers-reduced-motion`; all meaningful information remains available without animation.
- Publish source from `main`; publish generated static files only to `deploy`.

---

## Planned File Structure

```text
package.json
astro.config.ts
tsconfig.json
playwright.config.ts
.github/workflows/publish-static.yml
public/
  studio/robots.txt
  muslim/robots.txt
src/
  shared/
    config/surfaces.ts
    i18n/routes.ts
    i18n/types.ts
    seo/metadata.ts
    components/BaseHead.astro
    components/LocaleSwitcher.astro
    components/SiteShell.astro
    styles/foundations.css
  studio/pages/                 # implemented by the studio plan
  muslim/pages/                 # implemented by the product plan
scripts/
  build-surface.mjs
  build-all.mjs
  preview-surface.mjs
  verify-static-links.mjs
  assemble-deploy.mjs
  lib/verify-static-links.mjs
  lib/assemble-deploy.mjs
tests/
  unit/surfaces.test.ts
  unit/routes-and-metadata.test.ts
  scripts/assemble-deploy.test.ts
  scripts/verify-static-links.test.ts
  e2e/                          # implemented after the first page exists
docs/
  hostinger-static-deploy.md
```

### Task 1: Establish the dual-surface Astro workspace

**Files:**

- Create: `package.json`
- Create: `tsconfig.json`
- Create: `astro.config.ts`
- Create: `src/shared/config/surfaces.ts`
- Create: `scripts/build-surface.mjs`
- Create: `scripts/build-all.mjs`
- Create: `scripts/preview-surface.mjs`
- Create: `tests/unit/surfaces.test.ts`

**Interfaces:**

- Consumes: no application code.
- Produces: `SurfaceName`, `SURFACES`, and `getSurface(name?: string)` for Astro configuration and test code.
- Produces: `npm run build:studio`, `npm run build:muslim`, and `npm run build`, which write to `dist/studio` and `dist/muslim` respectively.

- [ ] **Step 1: Write the failing surface-configuration test.**

```ts
// tests/unit/surfaces.test.ts
import { describe, expect, it } from 'vitest';
import { SURFACES, getSurface } from '../../src/shared/config/surfaces';

describe('surface configuration', () => {
  it('keeps each deployed host and output directory independent', () => {
    expect(SURFACES.studio).toMatchObject({
      site: 'https://lifetimeleveling.com',
      srcDir: './src/studio',
      publicDir: './public/studio',
      outDir: './dist/studio',
    });
    expect(SURFACES.muslim).toMatchObject({
      site: 'https://muslim.lifetimeleveling.com',
      srcDir: './src/muslim',
      publicDir: './public/muslim',
      outDir: './dist/muslim',
    });
  });

  it('defaults to the studio surface and rejects an unknown surface', () => {
    expect(getSurface()).toBe(SURFACES.studio);
    expect(() => getSurface('ios')).toThrow('Unknown SITE_SURFACE: ios');
  });
});
```

- [ ] **Step 2: Run the test to confirm the missing module fails.**

Run: `npm run test:unit -- tests/unit/surfaces.test.ts`

Expected: Vitest reports that `src/shared/config/surfaces` cannot be resolved.

- [ ] **Step 3: Add the workspace manifest, surface contract, and build scripts.**

Use this `src/shared/config/surfaces.ts` implementation:

```ts
export type SurfaceName = 'studio' | 'muslim';

export interface SurfaceConfig {
  readonly name: SurfaceName;
  readonly site: string;
  readonly srcDir: string;
  readonly publicDir: string;
  readonly outDir: string;
}

export const SURFACES: Record<SurfaceName, SurfaceConfig> = {
  studio: {
    name: 'studio',
    site: 'https://lifetimeleveling.com',
    srcDir: './src/studio',
    publicDir: './public/studio',
    outDir: './dist/studio',
  },
  muslim: {
    name: 'muslim',
    site: 'https://muslim.lifetimeleveling.com',
    srcDir: './src/muslim',
    publicDir: './public/muslim',
    outDir: './dist/muslim',
  },
};

export function getSurface(name = process.env.SITE_SURFACE ?? 'studio'): SurfaceConfig {
  if (name === 'studio' || name === 'muslim') return SURFACES[name];
  throw new Error(`Unknown SITE_SURFACE: ${name}`);
}
```

Create a private ESM package with this script set:

```json
{
  "name": "lifetime-leveling-web",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "engines": { "node": ">=20.0.0" },
  "scripts": {
    "dev": "astro dev",
    "check": "astro check",
    "test:unit": "vitest run",
    "test:e2e:studio": "cross-env PLAYWRIGHT_SURFACE=studio playwright test tests/e2e/studio.spec.ts",
    "test:e2e:muslim": "cross-env PLAYWRIGHT_SURFACE=muslim playwright test tests/e2e/muslim.spec.ts",
    "build:studio": "node scripts/build-surface.mjs studio",
    "build:muslim": "node scripts/build-surface.mjs muslim",
    "build": "node scripts/build-all.mjs",
    "check:links": "node scripts/verify-static-links.mjs",
    "assemble:deploy": "node scripts/assemble-deploy.mjs"
  }
}
```

Install `astro`, `@astrojs/sitemap`, `@fontsource-variable/archivo-expanded`, and `@fontsource-variable/manrope` as production dependencies. Install `typescript`, `@astrojs/check`, `vitest`, `@playwright/test`, and `cross-env` as development dependencies.

Implement `astro.config.ts` so `getSurface()` sets `site`, `srcDir`, `publicDir`, and `outDir`, while `output` stays `static` and `sitemap()` stays enabled:

```ts
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { getSurface } from './src/shared/config/surfaces';

const surface = getSurface();
const shared = fileURLToPath(new URL('./src/shared', import.meta.url));

export default defineConfig({
  output: 'static',
  site: surface.site,
  srcDir: surface.srcDir,
  publicDir: surface.publicDir,
  outDir: surface.outDir,
  integrations: [sitemap()],
  vite: { resolve: { alias: { '@shared': shared } } },
});
```

Use `astro/tsconfigs/strict` in `tsconfig.json`. Make `build-surface.mjs` validate the one required argument, then spawn `node_modules/astro/astro.js build` with `SITE_SURFACE` set. Make `build-all.mjs` invoke that same script first with `studio`, then with `muslim`, stopping on a non-zero exit. Make `preview-surface.mjs` spawn `astro preview --host 127.0.0.1 --port <passed-port>` with the selected surface.

- [ ] **Step 4: Run the unit check and a static build.**

Run: `npm run test:unit -- tests/unit/surfaces.test.ts`

Expected: 2 passing tests.

Run: `npm run check`

Expected: Astro type checking exits with status 0.

Run: `npm run build`

Expected: `dist/studio` and `dist/muslim` exist; each contains its own `sitemap-index.xml` after pages are added in the surface plans.

- [ ] **Step 5: Commit the foundation workspace.**

```bash
git add package.json package-lock.json tsconfig.json astro.config.ts src/shared/config/surfaces.ts scripts/build-surface.mjs scripts/build-all.mjs scripts/preview-surface.mjs tests/unit/surfaces.test.ts
git commit -m "chore: initialize dual-surface Astro workspace"
```

### Task 2: Add locale routing, canonical metadata, and accessible shared chrome

**Files:**

- Create: `src/shared/i18n/types.ts`
- Create: `src/shared/i18n/routes.ts`
- Create: `src/shared/seo/metadata.ts`
- Create: `src/shared/components/BaseHead.astro`
- Create: `src/shared/components/LocaleSwitcher.astro`
- Create: `src/shared/components/SiteShell.astro`
- Create: `src/shared/styles/foundations.css`
- Create: `public/studio/robots.txt`
- Create: `public/muslim/robots.txt`
- Create: `tests/unit/routes-and-metadata.test.ts`

**Interfaces:**

- Consumes: `SurfaceName` and `SURFACES` from `src/shared/config/surfaces.ts`.
- Produces: `Locale`, `localePath(locale, path)`, and `canonicalUrl(surface, locale, path)` for every page.
- Produces: `BaseHead` props `{ surface, locale, path, title, description, image? }` and `SiteShell` props `{ surface, locale, path, title, description }`.

- [ ] **Step 1: Write failing routing and canonical-URL tests.**

```ts
// tests/unit/routes-and-metadata.test.ts
import { describe, expect, it } from 'vitest';
import { canonicalUrl, localePath } from '../../src/shared/seo/metadata';

describe('locale paths', () => {
  it('keeps Indonesian at the host root and English under /en/', () => {
    expect(localePath('id', '/privacy/')).toBe('/privacy/');
    expect(localePath('en', '/privacy/')).toBe('/en/privacy/');
  });

  it('builds canonical URLs on the matching host', () => {
    expect(canonicalUrl('studio', 'id', '/')).toBe('https://lifetimeleveling.com/');
    expect(canonicalUrl('studio', 'en', '/terms/')).toBe('https://lifetimeleveling.com/en/terms/');
    expect(canonicalUrl('muslim', 'en', '/delete-account/')).toBe(
      'https://muslim.lifetimeleveling.com/en/delete-account/',
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails before the routing contract exists.**

Run: `npm run test:unit -- tests/unit/routes-and-metadata.test.ts`

Expected: Vitest reports that `src/shared/seo/metadata` cannot be resolved.

- [ ] **Step 3: Implement deterministic locale, SEO, and shell primitives.**

Use these functions without a locale modal or client-side redirect:

```ts
// src/shared/i18n/types.ts
export const LOCALES = ['id', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

// src/shared/i18n/routes.ts
import type { Locale } from './types';

export function localePath(locale: Locale, path = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return locale === 'id' ? normalized : `/en${normalized}`;
}
```

```ts
// src/shared/seo/metadata.ts
import { SURFACES, type SurfaceName } from '../config/surfaces';
import { localePath } from '../i18n/routes';
import type { Locale } from '../i18n/types';

export { localePath } from '../i18n/routes';

export function canonicalUrl(surface: SurfaceName, locale: Locale, path = '/'): string {
  return new URL(localePath(locale, path), `${SURFACES[surface].site}/`).toString();
}
```

`BaseHead.astro` must emit one canonical link, two `hreflang` links (`id` and `en`), an `x-default` link to the Indonesian URL, and Open Graph/Twitter title and description tags. `LocaleSwitcher.astro` must render two ordinary anchors, mark the active locale with `aria-current="page"`, and preserve the current local path. `SiteShell.astro` must include `<a class="skip-link" href="#main-content">Lewati ke konten utama</a>` for Indonesian and `Skip to main content` for English, then a single `<main id="main-content">` landmark.

Create exactly these robots files:

```text
# public/studio/robots.txt
User-agent: *
Allow: /
Sitemap: https://lifetimeleveling.com/sitemap-index.xml
```

```text
# public/muslim/robots.txt
User-agent: *
Allow: /
Sitemap: https://muslim.lifetimeleveling.com/sitemap-index.xml
```

In `foundations.css`, import the two local Fontsource variable fonts, set `color-scheme: dark`, preserve readable text selection, create a high-contrast `:focus-visible` outline, and disable non-essential transitions under `@media (prefers-reduced-motion: reduce)`.

- [ ] **Step 4: Run the unit and static checks.**

Run: `npm run test:unit -- tests/unit/routes-and-metadata.test.ts`

Expected: 2 passing tests.

Run: `npm run check`

Expected: no TypeScript or Astro diagnostics.

- [ ] **Step 5: Commit the shared browser contract.**

```bash
git add src/shared/i18n src/shared/seo src/shared/components src/shared/styles public/studio/robots.txt public/muslim/robots.txt tests/unit/routes-and-metadata.test.ts
git commit -m "feat: add bilingual SEO and accessibility primitives"
```

### Task 3: Assemble static output and publish the deploy branch

**Files:**

- Create: `scripts/lib/assemble-deploy.mjs`
- Create: `scripts/assemble-deploy.mjs`
- Create: `tests/scripts/assemble-deploy.test.ts`
- Create: `.github/workflows/publish-static.yml`
- Create: `docs/hostinger-static-deploy.md`

**Interfaces:**

- Consumes: `dist/studio` and `dist/muslim` created by `npm run build`.
- Produces: `dist/deploy`, with studio output at its root and Muslim Leveling output at `dist/deploy/muslim`.
- Produces: one GitHub Action that runs checks, tests, two builds, assembly, and updates only the `deploy` branch after a `main` push.

- [ ] **Step 1: Write the failing deploy-layout test.**

```ts
// tests/scripts/assemble-deploy.test.ts
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { describe, expect, it } from 'vitest';
import { assembleDeploy } from '../../scripts/lib/assemble-deploy.mjs';

describe('assembleDeploy', () => {
  it('keeps studio at the main document root and product files under muslim/', async () => {
    const root = await mkdtemp(join(tmpdir(), 'lifetime-leveling-'));
    const studioDir = join(root, 'studio');
    const muslimDir = join(root, 'muslim');
    const deployDir = join(root, 'deploy');
    await mkdir(studioDir, { recursive: true });
    await mkdir(muslimDir, { recursive: true });
    await writeFile(join(studioDir, 'index.html'), 'studio');
    await writeFile(join(muslimDir, 'index.html'), 'muslim');

    await assembleDeploy({ studioDir, muslimDir, deployDir });

    await expect(readFile(join(deployDir, 'index.html'), 'utf8')).resolves.toBe('studio');
    await expect(readFile(join(deployDir, 'muslim', 'index.html'), 'utf8')).resolves.toBe('muslim');
  });
});
```

- [ ] **Step 2: Run the test to confirm the assembly module is missing.**

Run: `npm run test:unit -- tests/scripts/assemble-deploy.test.ts`

Expected: Vitest reports that `scripts/lib/assemble-deploy.mjs` cannot be resolved.

- [ ] **Step 3: Implement deterministic assembly and CI publishing.**

Implement an exported `assembleDeploy` that removes only its passed `deployDir`, recreates it, and copies directory entries rather than copying the enclosing source directory:

```js
// scripts/lib/assemble-deploy.mjs
import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';

async function copyContents(source, destination) {
  const entries = await readdir(source, { withFileTypes: true });
  await Promise.all(entries.map((entry) =>
    cp(join(source, entry.name), join(destination, entry.name), {
      recursive: entry.isDirectory(),
      force: true,
    }),
  ));
}

export async function assembleDeploy({ studioDir, muslimDir, deployDir }) {
  await rm(deployDir, { recursive: true, force: true });
  await mkdir(deployDir, { recursive: true });
  await copyContents(studioDir, deployDir);
  const muslimDeployDir = join(deployDir, 'muslim');
  await mkdir(muslimDeployDir, { recursive: true });
  await copyContents(muslimDir, muslimDeployDir);
}
```

The CLI wrapper must call it with `dist/studio`, `dist/muslim`, and `dist/deploy` from `process.cwd()`.

Create `.github/workflows/publish-static.yml` with this exact lifecycle: trigger on pushes to `main` and manual dispatch; use Node 20 with npm caching; run `npm ci`, `npx playwright install --with-deps chromium`, `npm run check`, `npm run test:unit`, `npm run build`, `npm run check:links`, `npm run test:e2e:studio`, `npm run test:e2e:muslim`, and `npm run assemble:deploy`; then use `peaceiris/actions-gh-pages@v4` with `publish_dir: ./dist/deploy`, `publish_branch: deploy`, `github_token: ${{ secrets.GITHUB_TOKEN }}`, and `force_orphan: true`. Grant only `contents: write` to the workflow and serialize deployments with a `hostinger-static-deploy` concurrency group.

Write `docs/hostinger-static-deploy.md` with the concrete hPanel setup: connect Git to branch `deploy`, deploy it to `public_html`, create `muslim.lifetimeleveling.com`, set its document root to `public_html/muslim`, and enable Hostinger auto-deploy/webhook for pushes to `deploy`. Configure `www.lifetimeleveling.com` to redirect permanently to `https://lifetimeleveling.com/`; do not create a third static surface. The document must direct the owner to verify the actual directory shown in hPanel before the first production push.

- [ ] **Step 4: Verify the local artifact boundary.**

Run: `npm run test:unit -- tests/scripts/assemble-deploy.test.ts`

Expected: 1 passing test.

Run: `npm run build`

Expected: two host-specific static builds succeed.

Run: `npm run assemble:deploy`

Expected: `dist/deploy/index.html` belongs to the studio and `dist/deploy/muslim/index.html` belongs to Muslim Leveling; no source files or `node_modules` are inside `dist/deploy`.

- [ ] **Step 5: Commit deploy automation and operator documentation.**

```bash
git add scripts/assemble-deploy.mjs scripts/lib/assemble-deploy.mjs tests/scripts/assemble-deploy.test.ts .github/workflows/publish-static.yml docs/hostinger-static-deploy.md
git commit -m "ci: publish static Hostinger deploy branch"
```

### Task 4: Reject broken local links in generated static output

**Files:**

- Create: `scripts/lib/verify-static-links.mjs`
- Create: `scripts/verify-static-links.mjs`
- Create: `tests/scripts/verify-static-links.test.ts`

**Interfaces:**

- Consumes: `dist/studio` and `dist/muslim` after `npm run build`.
- Produces: `verifyStaticLinks({ root })`, which resolves root-relative and relative HTML `href`/`src` values against a single host output and throws one error per missing local target.

- [ ] **Step 1: Write the failing static-link verifier test.**

```ts
// tests/scripts/verify-static-links.test.ts
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { describe, expect, it } from 'vitest';
import { verifyStaticLinks } from '../../scripts/lib/verify-static-links.mjs';

describe('verifyStaticLinks', () => {
  it('accepts existing local pages and rejects a missing root-relative page', async () => {
    const root = await mkdtemp(join(tmpdir(), 'lifetime-links-'));
    await mkdir(join(root, 'privacy'), { recursive: true });
    await mkdir(join(root, '_astro'), { recursive: true });
    await writeFile(join(root, 'privacy', 'index.html'), 'privacy');
    await writeFile(join(root, '_astro', 'app.css'), 'body{}');
    await writeFile(join(root, 'index.html'), '<a href="/privacy/">Privacy</a><link href="/_astro/app.css">');

    await expect(verifyStaticLinks({ root })).resolves.toEqual([]);

    await writeFile(join(root, 'index.html'), '<a href="/missing/">Missing</a>');
    await expect(verifyStaticLinks({ root })).rejects.toThrow('/missing/');
  });
});
```

- [ ] **Step 2: Run the test to verify the link-checking module does not exist.**

Run: `npm run test:unit -- tests/scripts/verify-static-links.test.ts`

Expected: Vitest cannot resolve `scripts/lib/verify-static-links.mjs`.

- [ ] **Step 3: Implement local-only HTML reference validation.**

Parse `href` and `src` attributes from every `.html` file under a passed root. Skip empty values, `#` anchors, `mailto:`, `tel:`, `data:`, protocol-relative URLs, and absolute `http`/`https` URLs. For each other path, remove query/hash data, resolve `/path/` from the selected host root or a relative path from the referring file, and accept a file, `path/index.html`, or `path.html`. Reject a path that escapes the host root.

Use this complete exported implementation:

```js
// scripts/lib/verify-static-links.mjs
import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = join(directory, entry.name);
    if (entry.isDirectory()) return findHtmlFiles(target);
    return entry.isFile() && extname(entry.name) === '.html' ? [target] : [];
  }));
  return nested.flat();
}

function extractLocalReferences(html) {
  const values = [];
  const matcher = /(?:href|src)\s*=\s*["']([^"']+)["']/gi;
  for (let match = matcher.exec(html); match; match = matcher.exec(html)) {
    const value = match[1].trim();
    if (!value || value.startsWith('#') || value.startsWith('mailto:') || value.startsWith('tel:')) continue;
    if (value.startsWith('data:') || value.startsWith('//') || /^https?:/i.test(value)) continue;
    values.push(value);
  }
  return values;
}

function resolveReference({ root, htmlFile, rawValue }) {
  const pathname = rawValue.split(/[?#]/, 1)[0] || '/';
  const candidate = pathname.startsWith('/')
    ? resolve(root, `.${pathname}`)
    : resolve(dirname(htmlFile), pathname);
  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) {
    throw new Error(`Reference escapes static root: ${rawValue}`);
  }
  return candidate;
}

async function exists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function targetExists(candidate) {
  return (await exists(candidate))
    || (await exists(`${candidate}.html`))
    || (await exists(join(candidate, 'index.html')));
}

export async function verifyStaticLinks({ root }) {
  const absoluteRoot = resolve(root);
  const errors = [];
  for (const htmlFile of await findHtmlFiles(absoluteRoot)) {
    const source = await readFile(htmlFile, 'utf8');
    for (const rawValue of extractLocalReferences(source)) {
      const target = resolveReference({ root: absoluteRoot, htmlFile, rawValue });
      if (!(await targetExists(target))) errors.push(`${relative(absoluteRoot, htmlFile)} -> ${rawValue}`);
    }
  }
  if (errors.length > 0) throw new Error(`Broken static links:\n${errors.join('\n')}`);
  return [];
}
```

The CLI wrapper must call the function once for `dist/studio` and once for `dist/muslim`, then set a non-zero process exit code on any error. It must never make an HTTP request, so external Google Play and policy-service links remain outside this mechanical check.

- [ ] **Step 4: Verify the guard and integrate it in the local release sequence.**

Run: `npm run test:unit -- tests/scripts/verify-static-links.test.ts`

Expected: 1 passing test.

Run: `npm run build`

Expected: both static surface folders exist.

Run: `npm run check:links`

Expected: no broken root-relative or relative references in either built surface.

- [ ] **Step 5: Commit the static-link guard.**

```bash
git add scripts/lib/verify-static-links.mjs scripts/verify-static-links.mjs tests/scripts/verify-static-links.test.ts package.json .github/workflows/publish-static.yml
git commit -m "test: verify static host links before deploy"
```

## Foundation Completion Check

- `npm run check`, `npm run test:unit`, `npm run build`, `npm run check:links`, and `npm run assemble:deploy` pass locally.
- The assembled folder has no cross-host asset dependency: studio assets live at `dist/deploy/_astro`, product assets live at `dist/deploy/muslim/_astro`.
- `www.lifetimeleveling.com` redirects permanently to the canonical non-`www` studio host rather than serving duplicate content.
- `docs/hostinger-static-deploy.md` matches the actual hPanel directory before the Git webhook is enabled.
- Continue with `2026-08-13-lifetime-leveling-studio-home.md`, then `2026-08-13-muslim-leveling-product-surface.md`.
