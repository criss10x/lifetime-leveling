import { access } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const requiredMedia = [
  '../../src/muslim/assets/app-icon.png',
  '../../src/muslim/assets/screens/dashboard-quests.png',
  '../../src/muslim/assets/screens/prayer-timeline.png',
  '../../src/muslim/assets/screens/streak-achievement.png',
  '../../src/muslim/assets/screens/quran-murottal.png',
  '../../src/muslim/assets/screens/learning-quiz.png',
  '../../src/muslim/assets/screens/quran-guided-reading.png',
  '../../src/muslim/assets/screens/theme-preference.png',
].map((path) => new URL(path, import.meta.url));

describe('Muslim Leveling media', () => {
  it('keeps all approved product media accessible', async () => {
    await expect(Promise.all(requiredMedia.map((path) => access(path)))).resolves.toHaveLength(8);
  });
});
