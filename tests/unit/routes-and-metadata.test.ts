import { readFile } from 'node:fs/promises';
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

describe('locale switcher accessibility', () => {
  it('gives each language link a 44px touch target', async () => {
    const [switcher, foundations] = await Promise.all([
      readFile(new URL('../../src/shared/components/LocaleSwitcher.astro', import.meta.url), 'utf8'),
      readFile(new URL('../../src/shared/styles/foundations.css', import.meta.url), 'utf8'),
    ]);

    expect(switcher).toContain('class="locale-switcher__link"');
    expect(foundations).toMatch(/\.locale-switcher__link\s*\{[\s\S]*min-inline-size:\s*44px;/);
    expect(foundations).toMatch(/\.locale-switcher__link\s*\{[\s\S]*min-block-size:\s*44px;/);
  });
});
