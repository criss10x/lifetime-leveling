import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { describe, expect, it } from 'vitest';
import { verifyStaticLinks } from '../../scripts/lib/verify-static-links.mjs';

describe('verifyStaticLinks', () => {
  it('accepts existing local pages and rejects a missing root-relative page', async () => {
    const root = await mkdtemp(join(tmpdir(), 'lifetime-links-'));
    await mkdir(join(root, 'privacy'), { recursive: true });
    await mkdir(join(root, '_astro'), { recursive: true });
    await writeFile(join(root, 'privacy', 'index.html'), 'privacy');
    await writeFile(join(root, '_astro', 'app.css'), 'body{}');
    await writeFile(join(root, 'index.html'), '<a href="/privacy/">Privacy</a><link href="/_astro/app.css">');

    await expect(verifyStaticLinks({ root })).resolves.toEqual([]);

    await writeFile(join(root, 'index.html'), '<a href="/missing/">Missing</a>');
    await expect(verifyStaticLinks({ root })).rejects.toThrow('/missing/');
  });
});
