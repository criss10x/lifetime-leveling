import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const buildSurface = fileURLToPath(new URL('./build-surface.mjs', import.meta.url));

for (const surface of ['studio', 'muslim']) {
  const result = spawnSync(process.execPath, [buildSurface, surface], { stdio: 'inherit' });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
