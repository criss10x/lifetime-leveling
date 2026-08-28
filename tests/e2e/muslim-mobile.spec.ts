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
