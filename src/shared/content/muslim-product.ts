import type { Locale } from '../i18n/types';

export interface MuslimProductContent {
  readonly googlePlayUrl: string;
  readonly meta: { readonly title: string; readonly description: string };
  readonly navigation: { readonly product: string; readonly android: string; readonly language: string };
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly tagline: string;
    readonly body: string;
    readonly features: readonly string[];
    readonly cta: string;
    readonly note: string;
  };
  readonly featureCatalog: {
    readonly title: string;
    readonly body: string;
    readonly items: readonly { readonly title: string; readonly body: string }[];
  };
  readonly dailyLoop: {
    readonly title: string;
    readonly body: string;
    readonly steps: readonly { readonly title: string; readonly body: string }[];
  };
  readonly screenshots: readonly {
    readonly id: string;
    readonly title: string;
    readonly body: string;
    readonly alt: string;
  }[];
  readonly compassion: { readonly title: string; readonly body: string };
  readonly privacyFacts: { readonly title: string; readonly body: string; readonly facts: readonly string[] };
}

const googlePlayUrl = 'https://play.google.com/store/apps/details?id=id.muslimleveling.muslim_leveling';

export const muslimProductContent: Record<Locale, MuslimProductContent> = {
  id: {
    googlePlayUrl,
    meta: {
      title: 'Muslim Leveling | Ritme ibadah harian untuk Android',
      description: 'Muslim Leveling membantu membangun ritme ibadah harian melalui quest, jadwal salat, Al-Quran, dan belajar.',
    },
    navigation: { product: 'Muslim Leveling', android: 'Android', language: 'English' },
    hero: {
      eyebrow: 'APLIKASI IBADAH ANDROID',
      title: 'Muslim Leveling',
      tagline: 'Temani langkah ibadahmu, satu hari pada satu waktu.',
      body: 'Muslim Leveling adalah aplikasi Android untuk membangun ritme ibadah harian melalui quest, jadwal salat, Al-Quran, dan belajar — dengan level, XP, dan streak yang membuat progres terasa nyata.',
      features: [
        'Quest ibadah harian dengan XP dan rank',
        'Jadwal salat, pilihan kota, dan arah kiblat',
        'Al-Quran dengan tajwid, Latin, terjemahan, dan tafsir',
        'Belajar bertahap dengan modul dan kuis',
      ],
      cta: 'Download di Google Play',
      note: 'Gratis untuk Android · Google Sign-In opsional untuk backup progres.',
    },
    featureCatalog: {
      title: 'Semua yang mendukung ritme ibadahmu.',
      body: 'Dari satu quest hingga satu ayat yang ingin kamu lanjutkan, Muslim Leveling menyatukan hal-hal yang kamu perlukan untuk menjaga langkah harianmu.',
      items: [
        { title: 'Quest, XP, dan progres', body: 'Quest salat, rawatib, tilawah, dan sedekah memberi satu langkah kecil yang dapat dijaga setiap hari.' },
        { title: 'Jadwal salat dan kiblat', body: 'Pilih kota, lihat waktu salat berikutnya, gunakan arah kiblat, dan atur pengingat yang sesuai untukmu.' },
        { title: 'Al-Quran dan murottal', body: 'Lanjutkan bacaan terakhir, dengarkan murottal per ayat, dan pilih qari yang nyaman untukmu.' },
        { title: 'Tajwid, Latin, dan tafsir', body: 'Atur tampilan bacaan dengan tajwid, Latin, terjemahan, dan tafsir saat kamu membutuhkannya.' },
        { title: 'Belajar dan kuis', body: 'Pelajari materi Islam secara bertahap, lalu uji pemahamanmu lewat kuis singkat.' },
        { title: 'Ritme yang fleksibel', body: 'Mode haid menjaga progres tetap adil, sementara tema terang dan gelap membantu kamu membaca dengan nyaman.' },
      ],
    },
    dailyLoop: {
      title: 'Jadwal salat tetap dekat',
      body: 'Pilih kota, lihat waktu salat berikutnya, dan gunakan arah kiblat saat membutuhkannya.',
      steps: [
        { title: 'Mulai dari yang dekat', body: 'Pilih satu quest ibadah untuk hari ini.' },
        { title: 'Ikuti waktunya', body: 'Jadikan jadwal salat sebagai penanda ritme, bukan tekanan.' },
        { title: 'Lihat langkah yang terjaga', body: 'XP, rank, dan streak membantu langkah kecil tetap terlihat.' },
      ],
    },
    screenshots: [
      { id: 'dashboard-quests', title: 'Quest ibadah harian', body: 'Quest, XP, rank, dan langkah berikutnya memberi arah yang tenang.', alt: 'Beranda Muslim Leveling dengan quest ibadah harian, XP, rank, dan langkah berikutnya.' },
      { id: 'prayer-timeline', title: 'Waktu salat dan kiblat', body: 'Waktu salat, pilihan kota, dan arah kiblat tersedia saat dibutuhkan.', alt: 'Jadwal salat Muslim Leveling dengan waktu salat, pencarian kota, dan kompas kiblat.' },
      { id: 'streak-achievement', title: 'Progres yang terlihat', body: 'Level, XP, streak, dan statistik membuat langkah yang terjaga lebih mudah dilihat.', alt: 'Profil Muslim Leveling dengan level, XP, streak, dan statistik pribadi.' },
      { id: 'quran-murottal', title: 'Perpustakaan Al-Quran', body: 'Temukan dan lanjutkan membaca Al-Quran dari satu tempat.', alt: 'Tab Al-Quran Muslim Leveling untuk menemukan dan melanjutkan bacaan surah.' },
      { id: 'learning-quiz', title: 'Belajar bertahap', body: 'Selesaikan modul dan kuis dalam langkah yang dapat dijangkau.', alt: 'Tab Belajar Muslim Leveling dengan modul, progres, dan kuis.' },
      { id: 'quran-guided-reading', title: 'Membaca Al-Quran dengan panduan', body: 'Tajwid, Latin, terjemahan, dan tafsir mendukung pengalaman membaca yang lebih tenang.', alt: 'Halaman Al-Quran Muslim Leveling dengan tajwid, Latin, terjemahan, dan tafsir.' },
      { id: 'theme-preference', title: 'Tampilan yang nyaman', body: 'Pilih tampilan terang atau gelap yang sesuai dengan momen ibadahmu.', alt: 'Pilihan tema terang dan gelap pada Muslim Leveling.' },
    ],
    compassion: {
      title: 'Ritme yang memberi ruang',
      body: 'Mode haid mendukung perjalananmu tanpa memaksa ritme yang tidak sesuai. Kembali saat waktunya terasa tepat, tanpa rasa bersalah.',
    },
    privacyFacts: {
      title: 'Progres dan privasi',
      body: 'Progres utama tersimpan di perangkatmu. Jika kamu memilih masuk dengan Google, Muslim Leveling memakai akun Google hanya untuk backup dan sinkronisasi progres.',
      facts: [
        'Google Sign-In opsional — aplikasi tetap bisa dipakai penuh tanpa masuk.',
        'Dari akun Google kami hanya menerima email, nama, dan foto profil untuk backup serta sinkronisasi progres.',
        'Backup tersimpan di Supabase yang terhubung ke akunmu dan bisa dihapus lewat permintaan email.',
        'Tanpa iklan.',
        'Tanpa pelacak pemasaran.',
        'Laporan crash yang dianonimkan membantu meningkatkan aplikasi.',
      ],
    },
  },
  en: {
    googlePlayUrl,
    meta: {
      title: 'Muslim Leveling | A daily worship rhythm for Android',
      description: 'Muslim Leveling supports a daily worship rhythm through quests, prayer times, Quran, and learning.',
    },
    navigation: { product: 'Muslim Leveling', android: 'Android', language: 'Bahasa Indonesia' },
    hero: {
      eyebrow: 'ANDROID WORSHIP APP',
      title: 'Muslim Leveling',
      tagline: 'Support your worship journey, one day at a time.',
      body: 'Muslim Leveling is an Android app for building a daily worship rhythm through quests, prayer times, Quran, and learning — with levels, XP, and streaks that make progress feel real.',
      features: [
        'Daily worship quests with XP and rank',
        'Prayer times, city selection, and qibla direction',
        'Quran with tajwid, Latin, translation, and tafsir',
        'Step-by-step learning with modules and quizzes',
      ],
      cta: 'Download on Google Play',
      note: 'Free for Android · Google Sign-In is optional for progress backup.',
    },
    featureCatalog: {
      title: 'Everything that supports your worship rhythm.',
      body: 'From one quest to the next Quran verse you want to return to, Muslim Leveling brings together what you need to keep your daily steps steady.',
      items: [
        { title: 'Quests, XP, and progress', body: 'Prayer, rawatib, tilawah, and sedekah quests offer one small step you can keep each day.' },
        { title: 'Prayer times and qibla', body: 'Choose a city, see the next prayer time, use qibla direction, and set reminders that suit you.' },
        { title: 'Quran and murottal', body: 'Resume your last reading, listen to murottal by verse, and choose a qari that feels right for you.' },
        { title: 'Tajwid, Latin, and tafsir', body: 'Set up reading with tajwid, Latin, translation, and tafsir whenever you need them.' },
        { title: 'Learning and quizzes', body: 'Learn Islamic material step by step, then check your understanding with short quizzes.' },
        { title: 'A flexible rhythm', body: 'Haid mode keeps progress fair, while light and dark themes help make reading comfortable.' },
      ],
    },
    dailyLoop: {
      title: 'Keep prayer times close',
      body: 'Choose a city, see the next prayer time, and use qibla direction when you need it.',
      steps: [
        { title: 'Begin with what is close', body: 'Choose one worship quest for today.' },
        { title: 'Follow the time', body: 'Let prayer times mark a rhythm, not create pressure.' },
        { title: 'See the steps you kept', body: 'XP, rank, and streaks help small steps remain visible.' },
      ],
    },
    screenshots: [
      { id: 'dashboard-quests', title: 'Daily worship quests', body: 'Quests, XP, rank, and a next step offer calm direction.', alt: 'Muslim Leveling home screen with daily worship quests, XP, rank, and a next step.' },
      { id: 'prayer-timeline', title: 'Prayer times and qibla', body: 'Prayer times, city selection, and qibla direction are available when needed.', alt: 'Muslim Leveling prayer schedule with prayer times, city search, and a qibla compass.' },
      { id: 'streak-achievement', title: 'Progress you can see', body: 'Level, XP, streaks, and statistics make the steps you kept visible.', alt: 'Muslim Leveling profile with level, XP, streak, and personal statistics.' },
      { id: 'quran-murottal', title: 'Quran library', body: 'Find and resume Quran reading in one place.', alt: 'Muslim Leveling Quran tab for finding and resuming a surah.' },
      { id: 'learning-quiz', title: 'Learning in steps', body: 'Complete modules and quizzes in manageable steps.', alt: 'Muslim Leveling learning tab with modules, progress, and quizzes.' },
      { id: 'quran-guided-reading', title: 'Guided Quran reading', body: 'Tajwid, Latin, translation, and tafsir support a calmer reading experience.', alt: 'Muslim Leveling Quran reading screen with tajwid, Latin, translation, and tafsir.' },
      { id: 'theme-preference', title: 'A comfortable appearance', body: 'Choose a light or dark appearance that suits the worship moment.', alt: 'Muslim Leveling light and dark theme preference.' },
    ],
    compassion: {
      title: 'A rhythm that leaves room',
      body: 'Haid mode supports your journey without forcing an unsuitable rhythm. Return when the time feels right, without guilt.',
    },
    privacyFacts: {
      title: 'Progress and privacy',
      body: 'Primary progress stays on your device. If you choose to sign in with Google, Muslim Leveling uses your Google account only for progress backup and sync.',
      facts: [
        'Google Sign-In is optional — the app is fully usable without signing in.',
        'From your Google account we only receive your email, name, and profile photo for progress backup and sync.',
        'Backups live in Supabase tied to your account and can be removed by email request.',
        'No ads.',
        'No marketing trackers.',
        'Anonymized crash reports help improve the app.',
      ],
    },
  },
};
