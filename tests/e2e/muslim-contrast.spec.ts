// @ts-nocheck — contrast helpers are plain JS; strict TS inference is noise here.
import { test, expect } from '@playwright/test';

test('dark mode h2 contrast is readable on every section (AA / 4.5:1)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.addInitScript(() => localStorage.setItem('muslim-theme', 'dark'));
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  const samples = await page.evaluate(() => {
    function srgbToLinear(c) { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    function relLum([r, g, b]) { return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b); }
    function ratio(bg, fg) {
      const L1 = relLum(bg), L2 = relLum(fg);
      const [hi, lo] = L1 > L2 ? [L1, L2] : [L2, L1];
      return (hi + 0.05) / (lo + 0.05);
    }
    function parse(s) { return s.match(/\d+/g).map(Number).slice(0, 3); }
    const sections = [
      ['daily-loop', '.daily-loop'],
      ['screenshot-library', '.screenshot-story--library'],
      ['screenshot-learning', '.screenshot-story--learning'],
      ['screenshot-theme', '.screenshot-story--theme'],
      ['privacy', '.privacy-facts'],
      ['footer', '.product-footer'],
    ];
    return sections.map(([name, sel]) => {
      const wrap = document.querySelector(sel);
      if (!wrap) return { name, missing: true };
      const h2 = wrap.querySelector('h2') || wrap.querySelector('p');
      const wrapBg = getComputedStyle(wrap).backgroundColor;
      const fg = getComputedStyle(h2).color;
      // compose: if bg is rgba with alpha < 1, sample the body's effective bg
      const m = wrapBg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
      let effectiveBg = wrapBg;
      if (m && parseFloat(m[4] ?? '1') < 1) {
        // fall back to body bg
        effectiveBg = getComputedStyle(document.body).backgroundColor;
      }
      return { name, wrapBg: effectiveBg, fg, ratio: ratio(parse(effectiveBg), parse(fg)).toFixed(2) };
    });
  });

  for (const s of samples) {
    if (s.missing) continue;
    const r = parseFloat(s.ratio);
    expect.soft(r, `${s.name} h2 contrast ${s.ratio}:1 should be >= 4.5`).toBeGreaterThanOrEqual(4.5);
  }
});
