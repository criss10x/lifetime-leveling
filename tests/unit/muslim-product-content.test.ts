import { describe, expect, it } from 'vitest';
import { muslimProductContent } from '../../src/shared/content/muslim-product';

const googlePlayUrl = 'https://play.google.com/store/apps/details?id=id.muslimleveling.muslim_leveling';
const screenshotIds = [
  'dashboard-quests',
  'prayer-timeline',
  'streak-achievement',
  'quran-murottal',
  'learning-quiz',
  'quran-guided-reading',
  'theme-preference',
];

describe('Muslim Leveling product content', () => {
  it.each([
    ['id', 'Gratis untuk Android · Google Sign-In opsional untuk backup progres.'],
    ['en', 'Free for Android · Google Sign-In is optional for progress backup.'],
  ] as const)('keeps the approved Android-only product facts for %s', (locale, note) => {
    const content = muslimProductContent[locale];

    expect(content.googlePlayUrl).toBe(googlePlayUrl);
    expect(content.hero.note).toBe(note);
    expect(content.screenshots.map((screenshot) => screenshot.id)).toEqual(screenshotIds);
    expect(JSON.stringify(content)).not.toMatch(/iOS|App Store/i);
  });
});
