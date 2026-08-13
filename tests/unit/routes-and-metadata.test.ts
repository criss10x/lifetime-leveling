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
