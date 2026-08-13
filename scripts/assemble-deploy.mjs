import { join } from 'node:path';
import { assembleDeploy } from './lib/assemble-deploy.mjs';

const root = process.cwd();

await assembleDeploy({
  studioDir: join(root, 'dist', 'studio'),
  muslimDir: join(root, 'dist', 'muslim'),
  deployDir: join(root, 'dist', 'deploy'),
});
