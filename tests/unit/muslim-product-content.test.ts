import { access, readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const contentPath = new URL('../../src/shared/content/muslim-product.ts', import.meta.url);

describe('Muslim Leveling product content', () => {
  it('keeps the approved Android-only product facts in both locales', async () => {
    await expect(access(contentPath)).resolves.toBeUndefined();

    const source = await readFile(contentPath, 'utf8');

    expect(source).toContain("https://play.google.com/store/apps/details?id=id.muslimleveling.muslim_leveling");
    expect(source).toContain('Gratis untuk Android · Google Sign-In opsional untuk backup progres.');
    expect(source).toContain('Free for Android · Google Sign-In is optional for progress backup.');
    const screenshotIds = ['dashboard-quests', 'prayer-timeline', 'streak-achievement', 'quran-murottal', 'learning-quiz', 'quran-guided-reading', 'theme-preference'];

    expect([...source.matchAll(/id: '(dashboard-quests|prayer-timeline|streak-achievement|quran-murottal|learning-quiz|quran-guided-reading|theme-preference)'/g)].map((match) => match[1])).toEqual([
      ...screenshotIds,
      ...screenshotIds,
    ]);
    expect(source).not.toMatch(/iOS|App Store/i);
  });
});
