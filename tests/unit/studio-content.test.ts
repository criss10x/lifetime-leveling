import { describe, expect, it } from 'vitest';
import { studioContent } from '../../src/shared/content/studio';

describe('studio content', () => {
  it('keeps the approved promise and product destination in both locales', () => {
    expect(studioContent.id.hero.title).toBe('Aplikasi untuk membuat progres terasa nyata.');
    expect(studioContent.en.hero.title).toBe('Apps that make progress feel real.');
    expect(studioContent.id.featuredProduct.href).toBe('https://muslim.lifetimeleveling.com/');
    expect(studioContent.en.featuredProduct.href).toBe('https://muslim.lifetimeleveling.com/en/');
  });

  it('does not advertise unsupported distribution platforms', () => {
    for (const locale of ['id', 'en'] as const) {
      expect(JSON.stringify(studioContent[locale])).not.toMatch(/iOS|App Store/i);
    }
  });
});
