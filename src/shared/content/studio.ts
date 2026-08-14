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
    readonly body: string;
    readonly tags: readonly string[];
    readonly googleData: { readonly title: string; readonly facts: readonly string[] };
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
      eyebrow: 'LIFETIME LEVELING / ROUTE 00',
      title: 'Aplikasi untuk membuat progres terasa nyata.',
      body: 'Kami membuat aplikasi fokus yang mengubah niat baik menjadi ritme kecil yang bisa kamu lihat, rasakan, dan lanjutkan.',
      cta: 'Jelajahi Muslim Leveling',
      crestAlt: 'Lambang naga ungu Lifetime Leveling',
    },
    featuredProduct: {
      index: '01',
      label: 'Rute pertama',
      name: 'Muslim Leveling',
      body: 'Teman Android untuk membangun kebiasaan ibadah melalui ritme harian yang suportif.',
      tags: ['Quest ibadah harian', 'XP dan streak', 'Al-Quran dan belajar'],
      googleData: {
        title: 'Penggunaan data Google',
        facts: [
          'Google Sign-In opsional — Muslim Leveling tetap bisa dipakai penuh tanpa masuk.',
          'Dari akun Google kami hanya menerima email, nama, dan foto profil untuk backup serta sinkronisasi progres.',
          'Backup tersimpan di Supabase yang terhubung ke akun dan bisa dihapus lewat permintaan email.',
        ],
      },
      cta: 'Lihat Muslim Leveling',
      href: 'https://muslim.lifetimeleveling.com/',
    },
    principles: [
      ['01', 'Mulai dari hari ini', 'Hal kecil yang jelas lebih mudah dijaga daripada target yang terasa jauh.'],
      ['02', 'Lihat langkahmu', 'Progres yang terlihat memberi alasan yang tenang untuk kembali besok.'],
      ['03', 'Kembali dengan baik', 'Ritme yang manusiawi memberi ruang untuk lanjut, bukan tekanan untuk sempurna.'],
    ],
    horizon: 'Rute berikutnya sedang dipetakan.',
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
      eyebrow: 'LIFETIME LEVELING / ROUTE 00',
      title: 'Apps that make progress feel real.',
      body: 'We make focused apps that turn good intentions into small rhythms you can see, feel, and continue.',
      cta: 'Explore Muslim Leveling',
      crestAlt: 'Lifetime Leveling purple dragon crest',
    },
    featuredProduct: {
      index: '01',
      label: 'First route',
      name: 'Muslim Leveling',
      body: 'An Android companion for building worship habits through a supportive daily rhythm.',
      tags: ['Daily worship quests', 'XP and streaks', 'Quran and learning'],
      googleData: {
        title: 'Google data use',
        facts: [
          'Google Sign-In is optional — Muslim Leveling is fully usable without signing in.',
          'From your Google account we only receive your email, name, and profile photo for progress backup and sync.',
          'Backups live in Supabase tied to your account and can be removed by email request.',
        ],
      },
      cta: 'Explore Muslim Leveling',
      href: 'https://muslim.lifetimeleveling.com/en/',
    },
    principles: [
      ['01', 'Begin today', 'A clear small action is easier to sustain than a distant target.'],
      ['02', 'See your steps', 'Visible progress gives a calm reason to return tomorrow.'],
      ['03', 'Return with care', 'A human rhythm creates room to continue instead of pressure to be perfect.'],
    ],
    horizon: 'More routes are being charted.',
    footer: {
      productSupport: 'Product support',
      productSupportHref: STUDIO_PRODUCT_SUPPORT_HREF,
      legal: 'Legal',
    },
  },
} as const satisfies Record<Locale, StudioContent>;
