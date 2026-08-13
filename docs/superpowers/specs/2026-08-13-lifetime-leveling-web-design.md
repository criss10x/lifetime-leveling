# Lifetime Leveling Web Presence Design

> **Visual direction locked:** **Comp A — Crest as North Star**. The studio hero uses the crest as its singular north-star artifact and a structural violet route into Muslim Leveling's distinct green-and-gold featured-product field. See `.impeccable/mocks/studio-home-comp-a-crest-north-star.png` and `.impeccable/surfaces/src-pages-index-astro.md`.

**Status:** Implementation planned — visual direction approved; legal copy, final Android assets, Hostinger settings, and owner review remain release gates.

## 1. Purpose and scope

Build a bilingual, Android-first public web presence for Lifetime Leveling and its first product, Muslim Leveling.

- **Lifetime Leveling** is the parent studio: it establishes the brand and presents one featured product without pretending there is already a catalogue.
- **Muslim Leveling** is the product destination: it explains the Android app, makes the Google Play download the primary action, and hosts public legal/support information needed for Google Play and Google OAuth verification.
- The website is static. Google Cloud Platform is only used for Search Console ownership and the optional Google Sign-In/OAuth configuration; it does not host the site.

Out of scope for this release: iOS distribution, app login on the website, a CMS, a blog, analytics dashboards, and claims about user counts or outcomes that have not been verified.

## 2. Information architecture

The root locale is Bahasa Indonesia. English lives under `/en/`, avoiding a language modal and giving both versions stable, shareable URLs.

| Host | Indonesian default | English | Purpose |
|---|---|---|---|
| `lifetimeleveling.com` | `/` | `/en/` | Studio homepage |
| `muslim.lifetimeleveling.com` | `/` | `/en/` | Muslim Leveling product landing page |
| `muslim.lifetimeleveling.com` | `/privacy/`, `/terms/`, `/support/`, `/delete-account/` | `/en/privacy/`, `/en/terms/`, `/en/support/`, `/en/delete-account/` | Product legal and support pages |
| `lifetimeleveling.com` | `/privacy/`, `/terms/` | `/en/privacy/`, `/en/terms/` | Studio legal pages |

Each locale route emits its own title, description, canonical URL, `hreflang` links, Open Graph image, and language selector. The Indonesian default is canonical at the root, not `/id/`.

The `www` variant redirects to the canonical non-`www` domain. Both hosts require HTTPS before OAuth verification begins.

## 3. Brand architecture

### Lifetime Leveling — The Night Atlas

**Thesis:** Lifetime Leveling makes focused apps that help people chart meaningful daily progress. The studio site behaves like a nocturnal atlas: an expansive field, a visible first route, and a clear invitation to begin.

The violet dragon crest is the brand's singular artifact. It is used in the hero, favicon/app icon treatment, navigation, and the social preview; it is not repeated as decorative wallpaper. The system avoids generic gaming neon, glass-card stacks, and stock “SaaS” layouts.

- **Physical scene:** a dark, precise atlas viewed at night: black-violet paper, relief lines, sparse luminous routes, and a crest that acts as a north star.
- **Color strategy:** committed dark-violet. The studio is materially dark rather than a neutral black page with scattered neon.
- **Core roles:** obsidian `#09070F`, deep-violet `#1A0D2D`, crest violet `#8B3DFF`, crest light `#C45CFF`, signal lavender `#E8DCFF`, and readable mist `#DCD4E8`.
- **Typography:** a distinctive wide display sans for headings and an understated humanist sans for body/interface text. Exact open-source font choices are selected during implementation based on language support and loading performance; Inter, Space Grotesk, and generic serif/mono pairings are excluded.
- **Graphic language:** fine contour lines, coordinate labels, asymmetric route arcs, and restrained glow. The route is structural: it links hero, featured app, and future direction rather than appearing as an ornamental gradient.
- **Motion:** one continuous route-drawing interaction bound to scroll and reduced-motion preferences. No bounce/electric flicker effects. The page remains fully understandable as still HTML.

### Muslim Leveling — Green and gold, independently recognizable

Muslim Leveling preserves its current green-and-gold identity. Product screenshots, prayer-time context, and progress mechanics prove the experience. Purple must not invade the app brand; it appears only in a small parent-studio endorsement and outbound link.

- **Core roles:** current product green `#047857`, deep green `#065F46`, reward gold `#F59E0B`, warm off-white `#FAFAF7`, ink `#1A1A1A`.
- **Tone:** encouraging, contemporary, and practical. It must never imply worship is a competitive game or a condition of worth.
- **Studio endorsement:** `A Lifetime Leveling product`, in the footer and a modest top navigation link with a 16–20 px dragon mark.

## 4. Page concepts and content

### Studio homepage: `lifetimeleveling.com`

**Visitor job:** understand what Lifetime Leveling makes, remember the studio, and reach Muslim Leveling.

**Approved composition — Comp A, Crest as North Star.** The violet dragon crest is the hero's single focal artifact, set against an asymmetric night-atlas field. A restrained luminous route begins at the crest and leads to coordinate `01`, where Muslim Leveling changes the page material to its own green-and-gold surface. This hierarchy and transition are binding; generated mockup device screens and marks are not production assets.

1. **Atlas hero.** Crest at the top of a large, asymmetric violet field. The route begins beside the crest and enters a featured-product coordinate. Proposed ID headline: **“Aplikasi untuk membuat progres terasa nyata.”** English: **“Apps that make progress feel real.”** The hero has one primary action, `Explore Muslim Leveling`, and one compact language switch.
2. **First route / featured product.** A numbered route marker (`01`) introduces Muslim Leveling. The product panel changes material to green and gold, immediately differentiating product from studio. It contains its real app icon, concise purpose, three verified capability tags (daily worship quests, XP & streaks, Quran & learning), and an arrow to the product host.
3. **How progress is designed.** A three-part path explains the studio's product philosophy: daily ritual, visible progress, supportive return. This is a studio principle, not an outcome claim.
4. **Horizon.** A quiet, non-card closing line: **“More routes are being charted.”** It acknowledges future applications without teaser cards, email collection, or false launch promises.
5. **Footer.** Studio/legal links, Muslim Leveling product link, support contact, language link, and copyright.

### Muslim Leveling landing page: `muslim.lifetimeleveling.com`

**Visitor job:** understand how the app helps daily worship consistency and download the Android app.

1. **Product masthead.** Parent link, Muslim Leveling icon/name, language switch, and a compact `Android` status label. No App Store badge.
2. **Show the daily loop.** The first viewport places a real Android screenshot in an Android device frame beside the product promise. Proposed ID headline: **“Jadikan ibadah harian perjalanan yang lebih konsisten.”** Supporting copy states the actual mechanism: finish worship quests, collect XP, maintain streaks, and return tomorrow. The primary CTA is `Download di Google Play`, using the current live Play URL. A secondary text note says: `Gratis untuk Android · Google Sign-In opsional untuk backup progres.`
3. **Today, not someday.** A prayer-time-aware timeline demonstrates the product truth: a prayer window opens, a worship quest is completed, XP is earned, and a streak continues. It uses synthetic display data clearly labeled as an example, not a claim about the visitor's activity.
4. **Real capability proof.** A paced screenshot story, not a six-card feature grid: quest/XP screen, streak/achievement screen, Quran/murottal screen, and learning/quiz screen. Each screenshot is paired with one verified explanatory sentence.
5. **Consistency with compassion.** Explain reminders and haid mode with dignified language. The message is that the app follows worship rhythms rather than forcing a generic productivity schedule.
6. **Private by default.** A short factual block: local-first usage, optional Google backup, privacy-policy link, account-deletion link, and no advertising/marketing tracker claim only where it matches the published policy.
7. **Download close.** One final green-and-gold download field, Android-only statement, support address, and legal links.

### Legal and support pages

- Privacy and deletion pages adapt the published content from the Muslim Leveling repository without changing its factual data practices.
- The implementation adds bilingual versions whose meaning matches the source policy.
- A terms page is required for the public web/OAuth surface. Its wording is prepared as a plain product-website terms draft and must receive owner review before production. It must not be presented as legal advice.
- Support includes the existing `muslim.leveling@gmail.com` contact, a concise support scope, and links back to deletion/privacy.

## 5. Content and asset requirements

Before building the product landing page, collect or capture these real assets from the Android app:

1. Android launcher icon/logo.
2. Home quest and XP-progress screen.
3. Streak or achievement screen.
4. Quran reader or murottal screen.
5. Belajar/quiz screen.

Images are exported in consistent portrait dimensions, optimized as WebP/AVIF where tooling supports it, with PNG fallback only where needed. No generated UI screenshots, generic mosque stock imagery, or fabricated testimonials are used. The supplied dragon crest is copied into this repository as the studio source asset; the external `E:\New folder\...` path is not referenced by the deployed site.

## 6. Implementation architecture

- **Framework:** Astro + TypeScript, static output only.
- **Content model:** typed locale dictionaries for interface/copy and typed product configuration for URLs, app metadata, legal pages, and screenshot captions.
- **Component boundaries:** shared `StudioShell`, `ProductShell`, locale switcher, legal footer, responsive Android frame, route graphic, feature-story section, and SEO metadata component. Studio and product themes do not share color tokens beyond basic layout/accessibility tokens.
- **Interactive code:** plain browser JavaScript or an Astro island only for the language preference helper and the optional route animation. The website does not need React or a runtime-heavy UI library.
- **Performance:** fonts are self-hosted/subset when licensing permits; SVG/route effects are progressive; images use intrinsic dimensions, responsive sources, and lazy loading below the hero.

### Static build and Hostinger deployment

Hostinger Web/WordPress/Cloud shared hosting does not support Node.js server runtimes. Astro therefore builds on GitHub Actions, and Hostinger only deploys already-generated static files. [Hostinger Node.js support](https://support.hostinger.com/en/articles/1583661-is-node-js-supported-at-hostinger)

1. Source lives on `main`; all source code, checks, and documentation remain there.
2. A GitHub Actions workflow runs install, typecheck, build, link validation, and static output smoke tests.
3. On a successful `main` build, the workflow publishes generated files to a dedicated `deploy` branch. This branch contains no Node source or dependencies.
4. The deploy artifact places studio files at branch root and Muslim Leveling static files under `muslim/`.
5. Hostinger Git auto-deploy follows the `deploy` branch into the main site's `public_html`. Configure `muslim.lifetimeleveling.com` in hPanel with its custom/default folder mapped to `public_html/muslim`; hPanel supports creating a subdomain with a dedicated directory. [Hostinger subdomains](https://support.hostinger.com/en/articles/1583405-how-to-create-and-delete-subdomains-in-hostinger)
6. Connect the hPanel auto-deploy webhook to the repository's push event for the `deploy` branch. Hostinger supports auto-deploying a selected Git branch through its webhook. [Hostinger Git deployment](https://support.hostinger.com/en/articles/1583302-how-to-deploy-a-git-repository)

During setup, confirm the actual Hostinger subdomain directory displayed in hPanel before enabling production auto-deploy. If the shared-hosting folder mapping differs from `public_html/muslim`, update the deploy artifact path rather than introducing a Node/VPS runtime.

## 7. Google readiness

- Verify `lifetimeleveling.com` as a Search Console **Domain property** through DNS TXT. This covers subdomains including `muslim.lifetimeleveling.com`.
- Add the verified domain(s) to the Google OAuth consent screen only after public HTTPS pages are live.
- Set the app homepage, privacy policy, and terms to public URLs under `muslim.lifetimeleveling.com`; keep the owner account in Search Console and GCP consistent.
- Google Sign-In copy explicitly says it is optional for cloud backup/sync. The static website never initiates OAuth. Retain the Android OAuth client and the existing web/server OAuth client only where the native Android-to-Supabase token exchange requires it; do not add website JavaScript origins or redirect URIs.
- Generate `robots.txt`, root-level `sitemap-index.xml`, host-specific sitemaps, canonical URLs, and social-preview metadata.

## 8. Responsive, accessibility, and quality constraints

- Mobile-first, tested at 360 px, 390 px, 768 px, and desktop width; Android download action remains reachable within the first product viewport.
- Body text meets 4.5:1 contrast; large text and controls meet at least 3:1. Accent glow never carries information alone.
- Navigation, language controls, legal links, and Google Play CTA are keyboard reachable and have visible focus states.
- Every meaningful image has useful alternate text; route graphics are decorative or have a concise accessible summary.
- Respect `prefers-reduced-motion`, including a non-animated route and no auto-moving device mockups.
- Use semantic headings/landmarks, skip link, 44 px minimum touch targets, and no text embedded exclusively in images.

## 9. Verification plan

1. Static build, TypeScript check, and all internal link checks pass in CI.
2. Visual QA uses desktop and Android-width screenshots for both locales and both brand surfaces.
3. Accessibility audit validates heading order, keyboard flow, image alternatives, contrast, and reduced motion.
4. Performance audit checks static output, image sizing, fonts, and a fast mobile first load.
5. Production smoke test verifies HTTPS, root/English routes, subdomain routes, Google Play CTA, privacy/deletion/terms/support pages, canonical tags, and sitemap URLs.
6. Before OAuth submission, test all configured public URLs in a logged-out browser and complete Search Console DNS verification.

## 10. Open decisions to resolve during implementation planning

- Confirm the final Google Play link if it differs from the current public one.
- Provide or capture the five approved Android screenshots.
- Review and approve the first Terms of Service wording before production deployment.
- Confirm the preferred public studio support email, if different from the Muslim Leveling email.
- Confirm actual Hostinger plan/subdomain folder after hPanel setup.
