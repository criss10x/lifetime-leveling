import { describe, expect, it } from 'vitest';
import { getGuides, getGuideBySlug, guidesData } from '../../src/shared/content/guides';

describe('guides content registry', () => {
  it('contains valid guide items with non-empty metadata', () => {
    expect(guidesData.length).toBeGreaterThan(0);

    for (const guide of guidesData) {
      expect(guide.slug).toBeTruthy();
      expect(guide.title).toBeTruthy();
      expect(guide.description).toBeTruthy();
      expect(guide.category).toBeTruthy();
      expect(guide.publishDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(guide.readingTime).toBeTruthy();
    }
  });

  it('retrieves guides by slug and respects query limits', () => {
    const guide = getGuideBySlug('amalan-wanita-haid');
    expect(guide).toBeDefined();
    expect(guide?.category).toBe('Panduan Ibadah');

    const limited = getGuides(1);
    expect(limited).toHaveLength(1);
  });
});
