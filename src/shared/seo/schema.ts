import { SURFACES, type SurfaceName } from '../config/surfaces';
import { canonicalUrl } from './metadata';
import type { Locale } from '../i18n/types';

export interface StructuredDataOptions {
  surface: SurfaceName;
  locale: Locale;
  path: string;
  title: string;
  description: string;
  faq?: {
    items: readonly { question: string; answer: string }[];
  };
}

export function getStructuredData({
  surface,
  locale,
  path,
  title,
  description,
  faq,
}: StructuredDataOptions): Record<string, unknown>[] {
  const pageUrl = canonicalUrl(surface, locale, path);
  const isRoot = path === '/' || path === '';

  if (surface === 'muslim') {
    const org = {
      '@type': 'Organization',
      name: 'Muslim Leveling',
      url: SURFACES.muslim.site,
      logo: `${SURFACES.muslim.site}/brand/muslim-leveling-icon.png`,
      parentOrganization: {
        '@type': 'Organization',
        name: 'Lifetime Leveling',
        url: SURFACES.studio.site,
      },
    };

    if (isRoot) {
      const app = {
        '@type': 'MobileApplication',
        name: 'Muslim Leveling',
        operatingSystem: 'Android',
        applicationCategory: 'LifestyleApplication',
        description,
        url: pageUrl,
        downloadUrl: 'https://play.google.com/store/apps/details?id=id.muslimleveling.muslim_leveling',
        image: `${SURFACES.muslim.site}/brand/muslim-leveling-icon.png`,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'IDR',
        },
        author: {
          '@type': 'Organization',
          name: 'Lifetime Leveling',
          url: SURFACES.studio.site,
        },
      };

      const graph: Record<string, unknown>[] = [org, app];

      if (faq && faq.items.length > 0) {
        graph.push({
          '@type': 'FAQPage',
          mainEntity: faq.items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        });
      }

      return [
        {
          '@context': 'https://schema.org',
          '@graph': graph,
        },
      ];
    }

    const webpage = {
      '@type': 'WebPage',
      name: title,
      description,
      url: pageUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Muslim Leveling',
        url: SURFACES.muslim.site,
      },
    };

    return [
      {
        '@context': 'https://schema.org',
        '@graph': [org, webpage],
      },
    ];
  }

  // Default studio / other surface
  return [
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'Lifetime Leveling',
          url: SURFACES.studio.site,
        },
        {
          '@type': 'WebPage',
          name: title,
          description,
          url: pageUrl,
        },
      ],
    },
  ];
}
