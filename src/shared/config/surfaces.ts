export type SurfaceName = 'studio' | 'muslim';

export interface SurfaceConfig {
  readonly name: SurfaceName;
  readonly site: string;
  readonly srcDir: string;
  readonly publicDir: string;
  readonly outDir: string;
}

export const SURFACES: Record<SurfaceName, SurfaceConfig> = {
  studio: {
    name: 'studio',
    site: 'https://lifetimeleveling.com',
    srcDir: './src/studio',
    publicDir: './public/studio',
    outDir: './dist/studio',
  },
  muslim: {
    name: 'muslim',
    site: 'https://muslim.lifetimeleveling.com',
    srcDir: './src/muslim',
    publicDir: './public/muslim',
    outDir: './dist/muslim',
  },
};

export function getSurface(name = process.env.SITE_SURFACE ?? 'studio'): SurfaceConfig {
  if (name === 'studio' || name === 'muslim') return SURFACES[name];
  throw new Error(`Unknown SITE_SURFACE: ${name}`);
}
