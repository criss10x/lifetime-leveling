import { describe, expect, it } from 'vitest';
import { getStructuredData } from '../../src/shared/seo/schema';

describe('Structured Data (JSON-LD) generation', () => {
  it('generates MobileApplication and Organization schema for Muslim landing page', () => {
    const result = getStructuredData({
      surface: 'muslim',
      locale: 'id',
      path: '/',
      title: 'Muslim Leveling | Ritme ibadah harian untuk Android',
      description: 'Aplikasi ibadah Android dengan quest harian, jadwal salat presisi, arah kiblat, dan Al-Quran tajwid.',
    });

    expect(result).toHaveLength(1);
    const root = result[0];
    expect(root['@context']).toBe('https://schema.org');

    const graph = root['@graph'] as Record<string, unknown>[];
    expect(graph).toHaveLength(2);

    const org = graph.find((item) => item['@type'] === 'Organization');
    expect(org).toBeDefined();
    expect(org?.name).toBe('Muslim Leveling');
    expect(org?.url).toBe('https://muslim.lifetimeleveling.com');

    const app = graph.find((item) => item['@type'] === 'MobileApplication');
    expect(app).toBeDefined();
    expect(app?.name).toBe('Muslim Leveling');
    expect(app?.operatingSystem).toBe('Android');
    expect(app?.applicationCategory).toBe('LifestyleApplication');
    expect(app?.downloadUrl).toBe(
      'https://play.google.com/store/apps/details?id=id.muslimleveling.muslim_leveling',
    );
    expect(app?.offers).toEqual({
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IDR',
    });
  });

  it('generates WebPage and Organization schema for Muslim subpages', () => {
    const result = getStructuredData({
      surface: 'muslim',
      locale: 'id',
      path: '/privacy/',
      title: 'Kebijakan Privasi Muslim Leveling',
      description: 'Kebijakan privasi Muslim Leveling untuk aplikasi Android.',
    });

    const graph = (result[0]['@graph'] as Record<string, unknown>[]);
    const webpage = graph.find((item) => item['@type'] === 'WebPage');
    expect(webpage).toBeDefined();
    expect(webpage?.name).toBe('Kebijakan Privasi Muslim Leveling');
    expect(webpage?.url).toBe('https://muslim.lifetimeleveling.com/privacy/');
  });

  it('generates FAQPage schema when faq items are provided on root', () => {
    const result = getStructuredData({
      surface: 'muslim',
      locale: 'id',
      path: '/',
      title: 'Muslim Leveling',
      description: 'Aplikasi ibadah Android',
      faq: {
        items: [
          { question: 'Apakah aplikasi gratis?', answer: 'Ya, sepenuhnya gratis tanpa iklan.' },
          { question: 'Bagaimana Mode Haid?', answer: 'Menjaga streak tanpa rasa bersalah.' },
        ],
      },
    });

    const graph = (result[0]['@graph'] as Record<string, unknown>[]);
    expect(graph).toHaveLength(3);

    const faqSchema = graph.find((item) => item['@type'] === 'FAQPage') as {
      '@type': string;
      mainEntity: { '@type': string; name: string; acceptedAnswer: { '@type': string; text: string } }[];
    };
    expect(faqSchema).toBeDefined();
    expect(faqSchema.mainEntity).toHaveLength(2);
    expect(faqSchema.mainEntity[0].name).toBe('Apakah aplikasi gratis?');
    expect(faqSchema.mainEntity[0].acceptedAnswer.text).toBe('Ya, sepenuhnya gratis tanpa iklan.');
  });
});
