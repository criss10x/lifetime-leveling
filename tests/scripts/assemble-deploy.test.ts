import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { describe, expect, it } from 'vitest';
import { assembleDeploy } from '../../scripts/lib/assemble-deploy.mjs';

describe('assembleDeploy', () => {
  it('keeps studio at the main document root and product files under muslim/', async () => {
    const root = await mkdtemp(join(tmpdir(), 'lifetime-leveling-'));
    const studioDir = join(root, 'studio');
    const muslimDir = join(root, 'muslim');
    const deployDir = join(root, 'deploy');
    await mkdir(studioDir, { recursive: true });
    await mkdir(muslimDir, { recursive: true });
    await writeFile(join(studioDir, 'index.html'), 'studio');
    await writeFile(join(muslimDir, 'index.html'), 'muslim');

    await assembleDeploy({ studioDir, muslimDir, deployDir });

    await expect(readFile(join(deployDir, 'index.html'), 'utf8')).resolves.toBe('studio');
    await expect(readFile(join(deployDir, 'muslim', 'index.html'), 'utf8')).resolves.toBe('muslim');
  });
});
