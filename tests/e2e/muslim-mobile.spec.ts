// @ts-nocheck
import { test, expect } from '@playwright/test';

test('mobile touch targets are at least 44px tall on footer and floating CTA', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('muslim-theme', 'light'));
  await page.goto('/');

  const failing = await page.evaluate(() => {
    const out = [];
    const targets = [
      ...document.querySelectorAll('.product-footer nav a'),
    ];
    const fab = document.querySelector('.floating-cta');
    if (fab) targets.push(fab);
    for (const el of targets) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      if (r.width === 0 || r.height === 0) continue;
      if (r.height < 44) {
        out.push({ tag: el.tagName, text: (el.textContent || '').trim().slice(0, 30), w: Math.round(r.width), h: Math.round(r.height), cls: (el.className || '').toString().slice(0, 40) });
      }
    }
    return out;
  });

  expect.soft(failing, JSON.stringify(failing, null, 2)).toEqual([]);
});

test('light compassion h2 contrast is at least AA-large (3:1)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.addInitScript(() => localStorage.setItem('muslim-theme', 'light'));
  await page.goto('/');

  const ratio = await page.evaluate(() => {
    function srgbToLinear(c) { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    function relLum([r, g, b]) { return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b); }
    function ratio(a, b) { const L1 = relLum(a), L2 = relLum(b); const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1]; return (hi + 0.05) / (lo + 0.05); }
    function parse(s) { return s.match(/\d+/g).map(Number).slice(0, 3); }
    const h2 = document.querySelector('.compassion-section h2');
    const wrap = document.querySelector('.compassion-section');
    return +ratio(parse(getComputedStyle(wrap).backgroundColor), parse(getComputedStyle(h2).color)).toFixed(2);
  });

  expect.soft(ratio, `compassion h2 contrast ${ratio}:1`).toBeGreaterThanOrEqual(4.5);
});

test('dark progress section body is high-contrast (no mint-on-green trap)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.addInitScript(() => localStorage.setItem('muslim-theme', 'dark'));
  await page.goto('/');

  const data = await page.evaluate(() => {
    function srgbToLinear(c) { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    function relLum([r, g, b]) { return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b); }
    function ratio(a, b) { const L1 = relLum(a), L2 = relLum(b); const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1]; return (hi + 0.05) / (lo + 0.05); }
    function parse(s) { return s.match(/\d+/g).map(Number).slice(0, 3); }
    const section = document.querySelector('.screenshot-story--progress');
    const p = section.querySelector('p');
    return {
      bg: getComputedStyle(section).backgroundColor,
      pColor: getComputedStyle(p).color,
      ratio: +ratio(parse(getComputedStyle(section).backgroundColor), parse(getComputedStyle(p).color)).toFixed(2),
    };
  });

  // Use neutral/near-white tokens (high luminance difference) rather than mint-on-green
  // which can pass 4.5:1 but read as dark-on-dark perceptually.
  const [br, bg, bb] = data.pColor.match(/\d+/g).map(Number);
  const saturation = (Math.max(br, bg, bb) - Math.min(br, bg, bb)) / Math.max(br, bg, bb);
  expect.soft(data.ratio, `progress p contrast ${data.ratio}:1`).toBeGreaterThanOrEqual(10);
  expect.soft(saturation, `progress p saturation ${saturation.toFixed(2)} should be low (near-white, not mint)`).toBeLessThan(0.4);
});

test('mobile learning section stacks vertically (no 2-col squeeze)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('muslim-theme', 'light'));
  await page.goto('/');

  const layout = await page.evaluate(() => {
    const sec = document.querySelector('.screenshot-story--learning');
    const content = sec.querySelector('.screenshot-story__content');
    const copy = sec.querySelector('.screenshot-story__copy');
    const frame = sec.querySelector('.android-frame');
    const cr = copy.getBoundingClientRect();
    const fr = frame.getBoundingClientRect();
    return {
      gridCols: getComputedStyle(content).gridTemplateColumns,
      copyW: Math.round(cr.width),
      copyLeft: Math.round(cr.left),
      copyBottom: Math.round(cr.bottom),
      frameTop: Math.round(fr.top),
      frameLeft: Math.round(fr.left),
      frameW: Math.round(fr.width),
    };
  });

  // expect single column: only 1 grid track, not 2
  expect.soft(layout.gridCols.split(' ').length, `learning grid has ${layout.gridCols}`).toBe(1);
  // expect copy column to have actual width (not a 60px squeezed sliver)
  expect.soft(layout.copyW, `learning copy width ${layout.copyW}px should be > 200`).toBeGreaterThan(200);
  // expect image to sit below copy, not beside it
  expect.soft(layout.frameTop, `frame top ${layout.frameTop} should be >= copy bottom ${layout.copyBottom}`).toBeGreaterThanOrEqual(layout.copyBottom - 5);
});

test('mobile screenshot images do not overflow their section (no horizontal scroll)', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => localStorage.setItem('muslim-theme', 'light'));
  await page.goto('/');

  const data = await page.evaluate(() => {
    const overflowX = document.documentElement.scrollWidth - window.innerWidth;
    const frames = [...document.querySelectorAll('.screenshot-story .android-frame')];
    const imgs = [...document.querySelectorAll('.screenshot-story .android-frame img')];
    return {
      vw: window.innerWidth,
      overflowX,
      frameWidths: frames.map((f) => Math.round(f.getBoundingClientRect().width)),
      imgWidths: imgs.map((i) => Math.round(i.getBoundingClientRect().width)),
    };
  });

  expect.soft(data.overflowX, `page overflows horizontally by ${data.overflowX}px`).toBeLessThanOrEqual(0);
  for (const w of data.frameWidths) {
    expect.soft(w, `android-frame width ${w}px <= viewport`).toBeLessThanOrEqual(data.vw + 1);
  }
  for (const w of data.imgWidths) {
    expect.soft(w, `img width ${w}px <= viewport`).toBeLessThanOrEqual(data.vw + 1);
  }
});

test('desktop hero copy aligns left (not centered)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.addInitScript(() => localStorage.setItem('muslim-theme', 'light'));
  await page.goto('/');

  const data = await page.evaluate(() => {
    const grid = document.querySelector('.product-hero__grid');
    const copy = document.querySelector('.product-hero__copy');
    const hero = document.querySelector('.product-hero');
    const daily = document.querySelector('.daily-loop h2');
    return {
      vw: window.innerWidth,
      gridLeft: Math.round(grid.getBoundingClientRect().left),
      gridMaxW: getComputedStyle(grid).maxWidth,
      copyLeft: Math.round(copy.getBoundingClientRect().left),
      copyRight: Math.round(copy.getBoundingClientRect().right),
      copyW: Math.round(copy.getBoundingClientRect().width),
      heroBg: getComputedStyle(hero).backgroundImage,
      heroPadL: parseFloat(getComputedStyle(hero).paddingLeft),
      dailyLeft: Math.round(daily.getBoundingClientRect().left),
    };
  });

  // Grid must start at the left padding of the hero, aligned with content
  // sections below (DailyLoop, ScreenshotStory -- all use 24px container gutter
  // derived from min(100% - 2rem, 77rem) + margin-inline: auto).
  const heroPadL = data.heroPadL;
  expect.soft(Math.abs(data.gridLeft - heroPadL), `hero grid left ${data.gridLeft}px should match hero padding-left ${heroPadL}px`).toBeLessThanOrEqual(2);
  expect.soft(heroPadL, `hero padding-left ${heroPadL}px should match DailyLoop H2 left ${data.dailyLeft}px (±2)`).toBeLessThanOrEqual(24 + 2);
  expect.soft(Math.abs(heroPadL - data.dailyLeft), `hero (${heroPadL}) and DailyLoop (${data.dailyLeft}) should align`).toBeLessThanOrEqual(2);
  // Copy must be in the left half of the viewport (not centered around viewport center 640).
  const vwCenter = data.vw / 2;
  expect.soft((data.copyLeft + data.copyRight) / 2, `hero copy center ${(data.copyLeft + data.copyRight) / 2} should be < viewport center ${vwCenter}`).toBeLessThan(vwCenter - 100);
  // Hero must carry the poster image as a fallback background (so non-autoplay users still see motion hint).
  expect.soft(/hero-poster/.test(data.heroBg), `hero bg-image should reference poster, got: ${data.heroBg}`).toBe(true);
});

test('desktop hero background is the user photo (background-hero.webp)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.addInitScript(() => localStorage.setItem('muslim-theme', 'dark'));
  await page.goto('/');

  // ponytail: verify the hero uses a photo background instead of GPU shader.
  const data = await page.evaluate(() => {
    const img = document.querySelector('[class*="bg-photo"]') || document.querySelector('.product-hero__bg-photo');
    const bgEl = img || document.querySelector('.product-hero__bg-canvas');
    return {
      ok: !!bgEl,
      hasPhotoImg: !!(img && img.tagName === 'IMG'),
      photoSrc: img?.getAttribute('src') ?? null,
      canvasExists: !!(bgEl && bgEl.tagName === 'CANVAS'),
    };
  });

  expect.soft(data.ok).toBe(true);
  expect.soft(data.hasPhotoImg).toBe(true, 'Hero should use <img> for background, not canvas');
  expect.soft(data.photoSrc).toContain('background-hero.webp');
  expect.soft(data.canvasExists).toBe(false, 'Canvas should be removed when using photo background');
});
test('nav header top-state passes AA contrast in both light and dark', async ({ page }) => {
  for (const theme of ['light', 'dark'] as const) {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript((t) => localStorage.setItem('muslim-theme', t), theme);
    await page.goto('/');

    // @ts-ignore — inner helpers are plain JS; strict TS is noise here.
    const data = await page.evaluate(() => {
      function srgbToLinear(c) { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
      function relLum([r, g, b]) { return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b); }
      function ratio(a, b) { const L1 = relLum(a), L2 = relLum(b); const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1]; return (hi + 0.05) / (lo + 0.05); }
      // header is now always --muslim-surface-deep, not transparent, so bg is the header itself
      const header = document.querySelector('body[data-surface=\"muslim\"] > header');
      const brand = header.querySelector('.product-navigation__brand');
      const sectionLink = header.querySelector('.product-navigation__sections a');
      const actions = header.querySelector('.product-navigation__platform');
      const parse = (s) => s.match(/\d+/g).map(Number).slice(0, 3);
      const headerBg = getComputedStyle(header).backgroundColor;
      const rows = [
        { label: 'brand', el: brand },
        { label: 'section link', el: sectionLink },
        { label: 'platform label', el: actions },
      ].filter((r) => r.el !== null).map((r) => ({ label: r.label, fg: getComputedStyle(r.el).color, bg: headerBg, r: +ratio(parse(headerBg), parse(getComputedStyle(r.el).color)).toFixed(2) }));
      return { headerBg, rows, isTransparent: /rgba\([^)]+,\s*0\)/.test(headerBg) || headerBg === 'rgba(0, 0, 0, 0)' };
    });

    // header must NOT be transparent (the root cause)
    expect.soft(data.isTransparent, `header must have a non-transparent bg in ${theme} mode`).toBe(false);
    for (const row of data.rows) {
      expect.soft(row.r, `${theme}/${row.label} contrast ${row.r}:1`).toBeGreaterThanOrEqual(4.5);
    }
  }
});
