import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const [surface, ...extraArguments] = process.argv.slice(2);

if (!surface || extraArguments.length > 0) {
  console.error('Usage: node scripts/build-surface.mjs <studio|muslim>');
  process.exit(1);
}

const astro = resolve(process.cwd(), 'node_modules/astro/astro.js');
const child = spawn(process.execPath, [astro, 'build'], {
  env: { ...process.env, SITE_SURFACE: surface },
  stdio: 'inherit',
});

child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
