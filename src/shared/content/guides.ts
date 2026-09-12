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
    slug: 'waktu-mustajab-hari-jumat',
    title: 'Waktu Mustajab Berdoa di Hari Jumat: Kapan Tepatnya dan Amalan Pembukanya?',
    description:
      'Pelajari dua waktu paling mustajab untuk berdoa di hari Jumat sesuai hadits shahih, adab munajat, dan amalan pembuka keberkahan bersama Muslim Leveling.',
    category: 'Panduan Ibadah',
    publishDate: '2026-09-12',
    publishDateDisplay: '12 September 2026',
    readingTime: '5 menit membaca',
    featured: true,
  },
  {
    slug: 'tata-cara-salat-tahajud',
    title: 'Tata Cara Salat Tahajud yang Benar: Niat, Waktu Utama, dan Tips Bangun Malam',
    description:
      'Panduan lengkap tata cara salat tahajud, niat, waktu sepertiga malam terbaik, doa mustajab, serta tips konsisten bangun malam bersama Muslim Leveling.',
    category: 'Panduan Ibadah',
    publishDate: '2026-09-12',
    publishDateDisplay: '12 September 2026',
    readingTime: '6 menit membaca',
    featured: true,
  },
  {
    slug: 'cara-menentukan-arah-kiblat',
    title: 'Cara Menentukan Arah Kiblat yang Akurat di HP dan Ruangan Tanpa Bingung',
    description:
      'Panduan praktis menentukan arah kiblat akurat menggunakan HP dan metode alami. Atasi kompas error, kalibrasi sensor, dan temukan kiblat tanpa iklan bersama Muslim Leveling.',
    category: 'Panduan Ibadah',
    publishDate: '2026-09-12',
    publishDateDisplay: '12 September 2026',
    readingTime: '5 menit membaca',
    featured: true,
  },
  {
    slug: 'dzikir-pagi-dan-petang',
    title: 'Panduan Dzikir Pagi dan Petang: Waktu Terbaik, Manfaat, dan Tips Istiqamah',
    description:
      'Pelajari waktu utama dzikir pagi dan petang, keutamaan spiritualnya, serta tips membiasakannya setiap hari tanpa rasa terbebani bersama Muslim Leveling.',
    category: 'Panduan Ibadah',
    publishDate: '2026-09-12',
    publishDateDisplay: '12 September 2026',
    readingTime: '5 menit membaca',
    featured: true,
  },
  {
    slug: 'murottal-vs-membaca-mushaf',
    title: 'Mendengarkan Murottal vs Membaca Mushaf: Mana yang Lebih Utama Saat Sibuk?',
    description:
      'Bimbang antara mendengarkan murottal atau membaca mushaf saat jadwal padat? Simak perbandingan keutamaan, tinjauan fiqih, dan tips menjaganya setiap hari.',
    category: 'Panduan Ibadah',
    publishDate: '2026-09-12',
    publishDateDisplay: '12 September 2026',
    readingTime: '5 menit membaca',
    featured: true,
  },
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
