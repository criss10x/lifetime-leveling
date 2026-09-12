export interface GuideItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishDate: string;
  publishDateDisplay: string;
  readingTime: string;
  featured?: boolean;
}

export const guidesData: readonly GuideItem[] = [
  {
    slug: 'kebiasaan-salat-tepat-waktu',
    title: 'Cara Membangun Kebiasaan Salat Tepat Waktu dengan Pendekatan Micro-Habits',
    description:
      'Panduan praktis melatih kebiasaan salat lima waktu tepat waktu tanpa merasa terbebani. Terapkan metode micro-habits dan jaga konsistensi bersama Muslim Leveling.',
    category: 'Panduan Ibadah',
    publishDate: '2026-09-12',
    publishDateDisplay: '12 September 2026',
    readingTime: '5 menit membaca',
    featured: true,
  },
  {
    slug: 'amalan-wanita-haid',
    title: 'Amalan Berpahala untuk Wanita Saat Haid: Menjaga Ritme Ibadah Tanpa Rasa Bersalah',
    description:
      'Panduan amalan berpahala untuk wanita muslimah saat sedang haid. Tetap dekat dengan Allah melalui dzikir, doa, sedekah, dan menjaga ritme ibadah tanpa rasa bersalah.',
    category: 'Panduan Ibadah',
    publishDate: '2026-09-12',
    publishDateDisplay: '12 September 2026',
    readingTime: '5 menit membaca',
    featured: true,
  },
];

export function getGuides(limit?: number): readonly GuideItem[] {
  if (limit) {
    return guidesData.slice(0, limit);
  }
  return guidesData;
}

export function getGuideBySlug(slug: string): GuideItem | undefined {
  return guidesData.find((item) => item.slug === slug);
}
