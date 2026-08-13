import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { getSurface } from './src/shared/config/surfaces';

const surface = getSurface();
const shared = fileURLToPath(new URL('./src/shared', import.meta.url));

export default defineConfig({
  output: 'static',
  site: surface.site,
  srcDir: surface.srcDir,
  publicDir: surface.publicDir,
  outDir: surface.outDir,
  integrations: [sitemap()],
  vite: { resolve: { alias: { '@shared': shared } } },
});
