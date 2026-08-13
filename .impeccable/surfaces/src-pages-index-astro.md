---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/en/index.astro"]
---

# Approved surface brief: Lifetime Leveling studio homepage

## Scope

- **Primary target:** `src/pages/index.astro` (Bahasa Indonesia homepage)
- **Related target:** `src/pages/en/index.astro` (English homepage)
- **Visitor job:** understand what Lifetime Leveling makes, remember the studio, and reach its first product, Muslim Leveling.
- **Primary action:** Explore Muslim Leveling.

## Approved visual direction

**Comp A — Crest as North Star** is the approved north star. The studio is a dark-violet night atlas: the supplied dragon crest is the singular artifact at the hero's upper edge, while one structural violet route travels into the first product coordinate. The featured Muslim Leveling surface shifts decisively into its own green-and-gold material so the relationship is clear without merging the two brands.

Reference: `.impeccable/mocks/studio-home-comp-a-crest-north-star.png`.

## Signature moment

On first view, the dragon crest and headline establish the studio's promise. As the visitor continues, the route visibly leads to route `01`, Muslim Leveling. The route may draw subtly with scroll, but it must remain intelligible in a static and reduced-motion experience.

## Content and proof

- Headline: `Aplikasi untuk membuat progres terasa nyata.` / `Apps that make progress feel real.`
- Featured product: Muslim Leveling, an Android app for young Muslims building consistent worship habits.
- Verified proof tags only: daily worship quests; XP and streaks; Quran and learning.
- No unverified user counts, outcomes, testimonials, launch claims, or iOS availability.

## Design system constraints

- Studio tokens: obsidian `#09070F`, deep violet `#1A0D2D`, crest violet `#8B3DFF`, crest light `#C45CFF`, signal lavender `#E8DCFF`, mist `#DCD4E8`.
- Use a wide, high-impact display sans with a calm humanist sans for interface and body copy; choose final open-source families for Indonesian and English support during implementation.
- Render routes and contour details as accessible SVG/CSS geometry, not rasterized pseudo-texture.
- The supplied crest must be copied into the deployed repository asset directory; the external source path must not be referenced at runtime.
- Product screenshots must be authentic Android captures collected from Muslim Leveling; generated mockup screens are direction-only and must never be represented as product UI.
- Keep every core action keyboard reachable, preserve contrast, use semantic HTML, support 360 px upward, and respect `prefers-reduced-motion`.

## Required inventory

| Element | Intended implementation | Source/status |
| --- | --- | --- |
| Dragon crest | Responsive image / social asset | Supplied image; copy into project before build |
| Atlas route and contours | Semantic decorative SVG/CSS | Build from approved direction |
| Muslim Leveling mark | Real product asset | Needs final exported app icon |
| Android device content | Real screenshots inside responsive Android frame | Needs five approved product captures |
| Studio/product copy | Locale dictionaries | Use approved bilingual copy, then owner review |

## Explicit non-goals

Avoid generic SaaS cards, gaming-neon effects, fabricated app screenshots, purple product screens, App Store/iOS copy, and a false multi-product catalogue. The generated composition is a reference for hierarchy and visual language, not a literal page asset.
