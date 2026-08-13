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
