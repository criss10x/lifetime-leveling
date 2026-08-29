# Hero animated background — `<video>` element (Muslim surface)

GPU-accelerated background video for `muslim.lifetimeleveling.com` hero. Replaces the CSS Aurora approach (commit `6afad10`, reverted) after Kris found it "jelek sekali, kurang wow". The video supplies the wow that gradient mesh can't.

## What shipped (commits `4a84af2` + `2d2a7f8`, branch `main`)

### 1. Asset pipeline (FFmpeg locally)

Source from user at `~/.hermes/cache/videos/video_*.mp4`. Pipeline (run inside repo root):

```bash
mkdir -p public/muslim/hero

# MP4 (Safari compat): strip audio, scale 1920:-2, 24fps, CRF 28, faststart
ffmpeg -i ~/.hermes/cache/videos/video_4068b4c7a435.mp4 \
  -ss 0 -to 6 -an -vf "scale=1920:-2,fps=24" \
  -c:v libx264 -crf 28 -preset slow -movflags +faststart \
  -y public/muslim/hero/hero.mp4

# WebM (Chrome/Edge/Firefox modern): VP9, CRF 34
ffmpeg -i ~/.hermes/cache/videos/video_4068b4c7a435.mp4 \
  -ss 0 -to 6 -an -vf "scale=1920:-2,fps=24" \
  -c:v libvpx-vp9 -crf 34 -b:v 0 -strict experimental \
  -y public/muslim/hero/hero.webm

# Poster (static fallback, no audio): first frame WebP
ffmpeg -i public/muslim/hero/hero.mp4 -vframes 1 -q:v 75 \
  -y public/muslim/hero/hero-poster.webp
```

Target sizes for a 10s/720p source:

| File | ~Size | Purpose |
|---|---|---|
| `hero.mp4` | 884KB | H.264 primary for Safari |
| `hero.webm` | 985KB | VP9 primary for Chrome/Edge/Firefox |
| `hero-poster.webp` | 39KB | Static fallback until video buffers |

Total ~1.9MB. **Trim to 6s** so loop doesn't feel like it stalls (10s feels long in a hero loop). **Strip audio** with `-an` — background video with audio is hostile UX.

### 2. Component markup (`src/muslim/components/ProductHero.astro`)

```astro
<section class="product-hero" aria-labelledby="product-hero-title">
  <video class="product-hero__bg-video" autoplay muted loop playsinline
         preload="metadata" poster="/hero/hero-poster.webp"
         data-intersection="observe">
    <source src="/hero/hero.webm" type="video/webm">
    <source src="/hero/hero.mp4" type="video/mp4">
  </video>
  <div class="product-hero__bg-overlay"></div>
  <div class="product-hero__grid product-hero__grid--solo">
    <div class="product-hero__copy">
      <!-- eyebrow, h1, tagline, CTA, quick features, note -->
    </div>
  </div>
</section>
<script is:inline>
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target.querySelector('.product-hero__bg-video');
        if (!video) return;
        if (entry.isIntersecting) video.play();
        else video.pause();
      });
    }, { rootMargin: '200px 0px', threshold: 0.01 });
    document.querySelectorAll('section.product-hero').forEach(section => {
      observer.observe(section);
      section.addEventListener('click', () => {
        const video = section.querySelector('.product-hero__bg-video');
        if (video) video.play();
      });
    });
  }
</script>
```

Key attributes and why:
- `autoplay muted loop playsinline` — all four are MANDATORY for iOS Safari autoplay. Missing `muted` = no autoplay. Missing `playsinline` = iOS opens fullscreen player.
- `preload="metadata"` — fetch dimensions/duration but not the whole stream. `preload="auto"` would download the full 1MB on page load.
- `poster="/hero/hero-poster.webp"` — renders instantly while video buffers; same fallback for `prefers-reduced-motion` and mobile.
- WebM before MP4 — modern browsers prefer WebM (~30% smaller at same quality).
- `<video>` placed BEFORE `.product-hero__grid` so its z-index doesn't trap focus order weirdly.
- IntersectionObserver `pause()` on scroll out — releases GPU decode, critical on battery-powered devices.

### 3. CSS (`src/muslim/styles/muslim.css`)

```css
.product-hero {
  position: relative;
  overflow: clip;
  background: var(--muslim-surface-deep);
  color: var(--muslim-text-on-deep);
}
/* ponytail: GPU-accelerated bg video — lazy-load + pause off-screen */
.product-hero__bg-video {
  position: absolute;
  inset: -15% -10%; /* expand beyond viewport for cover on scroll */
  z-index: -2;
  width: auto;
  min-height: 100%;
  height: auto;
  object-fit: cover;
  transform: translateZ(0); /* promote to compositor layer */
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .product-hero__bg-video { display: none !important; }
}
@media (max-width: 768px) {
  .product-hero__bg-video { display: none; }
  .product-hero { background-image: url('/hero/hero-poster.webp'); background-size: cover; }
}
.product-hero__bg-overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(180deg, rgba(5,13,10,0) 40%, rgb(5,13,10,0.38) 100%);
  pointer-events: none;
}
:root[data-theme='light'] .product-hero__bg-overlay {
  background: linear-gradient(180deg, rgba(6,95,70,0) 38%, rgb(5,26,20,0.22) 100%);
}
.product-hero__grid--solo { grid-template-columns: minmax(0, 1fr); max-width: 47rem; }
```

Three performance moves:
- `transform: translateZ(0)` + `pointer-events: none` — promotes to compositor layer, prevents scroll hit-testing overhead.
- `inset: -15% -10%` — expands beyond viewport so `object-fit: cover` keeps edges covered during scroll bounce.
- `min-height: 100%; height: auto` — fixes Safari's `<video>` sizing bug (otherwise `<video>` collapses to 0 in some flex/grid parents).

Three fallbacks (in priority order):
- `prefers-reduced-motion: reduce` → video hidden, hero shows flat `--muslim-surface-deep`.
- `max-width: 768px` → video hidden on mobile, hero shows poster as static bg (mobile low-end stutters on full-screen video).
- `.product-hero__bg-overlay` scrim → CTA + stats stay legible over video.

## Hero without product proof (screenshot mockup removed)

User asked "hilangkan screenshotnya di hero section" after video + overlay were already in. The right-column Android phone mockup was redundant now that bg video provides ambient motion.

What changed:
- `ProductHero.astro`: removed `AndroidFrame` import, removed `.product-hero__proof` div, removed unused `image` destructure (Prop kept for back-compat with index.astro callers).
- `muslim.css`: removed `.product-hero__proof`, `.android-frame`, and the `poster-reveal` @keyframes (only used by proof). Added `.product-hero__grid--solo` modifier (1fr, max-width 47rem).
- `muslim.spec.ts`: 2 tests touched:
  - `Indonesian landing keeps the Android action and product proof…` — removed the alt-text assertion for hero proof image (no longer in DOM).
  - `landing proof renders every authentic Android poster…` — list dropped from 7 alts to 6 (hero alt removed). The 6 remaining are in `ScreenshotStory` and `DailyLoop` sections.

## Verification recipe

Vision models are unreliable here (503s, hallucinated content). Use computed-style + property probe:

```js
// @ts-nocheck — run inside repo root so ESM resolves playwright
import { chromium } from 'playwright';
const b = await chromium.launch();
for (const theme of ['light', 'dark']) {
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  await p.addInitScript(t => localStorage.setItem('muslim-theme', t), theme);
  await p.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(800);
  const data = await p.evaluate(() => {
    const v = document.querySelector('.product-hero__bg-video');
    const cs = v ? getComputedStyle(v) : null;
    return {
      hasVideo: !!v,
      src: v?.querySelector('source')?.src,
      paused: v?.paused,
      readyState: v?.readyState, // expect 4 = HAVE_ENOUGH_DATA
      objectFit: cs?.objectFit,
      zIndex: cs?.zIndex,
      poster: v?.poster,
    };
  });
  console.log(theme, data);
  await p.close();
}
await b.close();
```

Pass criteria: `hasVideo: true`, `paused: false`, `readyState: 4`, `objectFit: cover`, `zIndex: '-2'`.

## Pitfalls hit

- **Hero assets missing from `dist/deploy/`** — same trap as favicon (see `references/favicon-deploy-root-trap.md`). `public/muslim/hero/*.mp4|webm|webp` is deployed at `/hero/*` on the `muslim.lifetimeleveling.com` subdomain, but `assemble:deploy` doesn't bundle per-surface publicDir content into the root. If a future commit needs these assets served at `lifetimeleveling.com/hero/*`, copy them to `public/studio/hero/`.
- **`<video>` collapse to 0 height** — Safari + some grid parents need `min-height: 100%; height: auto` to render. Don't trust `width: 100%; height: 100%` alone.
- **`min-height: 100%` requires parent to have height** — `.product-hero` already has `min-height: calc(100svh - 4.75rem)` via `.product-hero__grid`, so this works. If hero height is auto, video collapses.
- **Forgot `position: relative` on `.product-hero`** — z-index stacking fails, video renders BELOW body bg. The CSS above already has it; flag if you ever refactor.
- **CI failed when assets shipped to wrong publicDir** — same as favicon trap; verify with `npm run check:links` before push.
- **patch tool on `muslim.css` returns "modified since you last read" warning** — after multiple edits in a session, the tool refuses partial matches. Fall back to a Python in-place replace via `execute_code` with `read_file` + `replace` + `write_file` (the canonical multi-line string is exactly what `read_file` returns).

## Related references

- `references/favicon-deploy-root-trap.md` — same `public/<surface>/brand/` → `dist/deploy/brand/` trap.
- `references/mobile-and-contrast-audit-recipe.md` — contrast verification pattern.
- `references/dark-mode-theme-pattern.md` — `:root[data-theme='dark']` cascade.
