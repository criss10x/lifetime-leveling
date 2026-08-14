import type { Locale } from '../i18n/types';

type Principle = readonly [index: string, title: string, body: string];

export interface StudioContent {
  readonly meta: {
    readonly title: string;
    readonly description: string;
  };
  readonly navigation: {
    readonly product: string;
    readonly language: string;
  };
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly cta: string;
    readonly crestAlt: string;
  };
  readonly featuredProduct: {
    readonly index: string;
    readonly label: string;
    readonly name: string;
    readonly frameAlt: string;
    readonly body: string;
    readonly tags: readonly string[];
    readonly cta: string;
    readonly href: string;
  };
  readonly principles: readonly Principle[];
  readonly horizon: string;
  readonly footer: {
    readonly productSupport: string;
    readonly productSupportHref: typeof STUDIO_PRODUCT_SUPPORT_HREF;
    readonly legal: string;
  };
}

export const STUDIO_PRODUCT_SUPPORT_HREF = 'mailto:muslim.leveling@gmail.com' as const;

export const studioContent = {
  id: {
    meta: {
      title: 'Lifetime Leveling | Aplikasi untuk progres yang terasa nyata',
      description: 'Lifetime Leveling membuat aplikasi yang membantu progres harian terasa lebih jelas dan berkelanjutan.',
    },
    navigation: { product: 'Muslim Leveling', language: 'English' },
    hero: {
      eyebrow: 'LIFETIME LEVELING',
      title: 'Kebiasaan ibadah harian, dimulai dari satu quest.',
      body: 'Muslim Leveling — aplikasi Android pertama dari Lifetime Leveling — mengubah ibadah harian menjadi quest dengan XP, level, dan streak. Dengan ritme yang manusiawi, bukan tekanan untuk sempurna.',
      cta: 'Jelajahi Muslim Leveling',
      crestAlt: 'Lambang naga ungu Lifetime Leveling',
    },
    featuredProduct: {
      index: '01',
      label: 'Aplikasi pertama',
      name: 'Muslim Leveling',
      frameAlt: 'Beranda Muslim Leveling dengan quest ibadah harian, XP, rank, dan langkah berikutnya.',
      body: 'Teman Android untuk membangun kebiasaan ibadah melalui ritme harian yang suportif.',
      tags: ['Quest ibadah harian', 'XP dan streak', 'Al-Quran dan belajar'],
      cta: 'Lihat Muslim Leveling',
      href: 'https://muslim.lifetimeleveling.com/',
    },
    principles: [
      ['01', 'Mulai dari hari ini', 'Hal kecil yang jelas lebih mudah dijaga daripada target yang terasa jauh.'],
      ['02', 'Lihat langkahmu', 'Progres yang terlihat memberi alasan yang tenang untuk kembali besok.'],
      ['03', 'Kembali dengan baik', 'Ritme yang manusiawi memberi ruang untuk lanjut, bukan tekanan untuk sempurna.'],
    ],
    horizon: 'Aplikasi berikutnya sedang disiapkan.',
    footer: {
      productSupport: 'Dukungan produk',
      productSupportHref: STUDIO_PRODUCT_SUPPORT_HREF,
      legal: 'Legal',
    },
  },
  en: {
    meta: {
      title: 'Lifetime Leveling | Apps that make progress feel real',
      description: 'Lifetime Leveling makes focused apps that make daily progress clearer and easier to continue.',
    },
    navigation: { product: 'Muslim Leveling', language: 'Bahasa Indonesia' },
    hero: {
      eyebrow: 'LIFETIME LEVELING',
      title: 'Build a daily worship habit, one quest at a time.',
      body: 'Muslim Leveling — the first Android app from Lifetime Leveling — turns daily worship into quests with XP, levels, and streaks. At a human rhythm, not pressure to be perfect.',
      cta: 'Explore Muslim Leveling',
      crestAlt: 'Lifetime Leveling purple dragon crest',
    },
    featuredProduct: {
      index: '01',
      label: 'First app',
      name: 'Muslim Leveling',
      frameAlt: 'Muslim Leveling home screen with daily worship quests, XP, rank, and a next step.',
      body: 'An Android companion for building worship habits through a supportive daily rhythm.',
      tags: ['Daily worship quests', 'XP and streaks', 'Quran and learning'],
      cta: 'Explore Muslim Leveling',
      href: 'https://muslim.lifetimeleveling.com/en/',
    },
    principles: [
      ['01', 'Begin today', 'A clear small action is easier to sustain than a distant target.'],
      ['02', 'See your steps', 'Visible progress gives a calm reason to return tomorrow.'],
      ['03', 'Return with care', 'A human rhythm creates room to continue instead of pressure to be perfect.'],
    ],
    horizon: 'The next app is in the works.',
    footer: {
      productSupport: 'Product support',
      productSupportHref: STUDIO_PRODUCT_SUPPORT_HREF,
      legal: 'Legal',
    },
  },
} as const satisfies Record<Locale, StudioContent>;
