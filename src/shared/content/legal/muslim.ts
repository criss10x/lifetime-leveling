export type MuslimLegalLink = {
  readonly label: string;
  readonly href: string;
};

export type MuslimLegalSection = {
  readonly title: string;
  readonly body: string;
  readonly link?: MuslimLegalLink;
};

export type MuslimLegalDocument = {
  readonly title: string;
  readonly description: string;
  readonly effectiveDate: string;
  readonly sections: readonly MuslimLegalSection[];
};

type MuslimLegalDocuments = {
  readonly privacy: MuslimLegalDocument;
  readonly terms: MuslimLegalDocument;
  readonly support: MuslimLegalDocument;
  readonly deletion: MuslimLegalDocument;
};

export const muslimLegal = {
  id: {
    privacy: {
      title: 'Kebijakan Privasi Muslim Leveling',
      description: 'Kebijakan privasi Muslim Leveling untuk aplikasi Android.',
      effectiveDate: '4 Agustus 2026',
      sections: [
        {
          title: 'Status dokumen',
          body: 'Kebijakan ini berlaku untuk aplikasi Android Muslim Leveling dan website pendukungnya.',
        },
        {
          title: 'Lokasi untuk waktu salat',
          body: 'Lokasi bersifat opsional, diproses hanya di perangkat untuk waktu salat, dan tidak pernah disimpan di server. Jika dipakai, koordinat dikirim melalui HTTPS ke eQuran.id dan api.myquran.com hanya untuk perhitungan waktu salat. Kami tidak membagikan lokasi di luar panggilan API tersebut, tidak menyimpan riwayat lokasi, dan tidak melacak lokasi di latar belakang. Anda dapat memilih kota secara manual tanpa memberi izin lokasi.',
        },
        {
          title: 'Google Account (opsional)',
          body: 'Masuk dengan Google bersifat opsional. Jika Anda memilihnya, kami menerima email, nama, dan foto profil hanya untuk backup dan sinkronisasi progres game/pembelajaran. Aplikasi tetap dapat digunakan sepenuhnya secara offline tanpa masuk Google.',
        },
        {
          title: 'Progres pembelajaran',
          body: 'Quest, XP, pencapaian, dan catatan pembelajaran disimpan secara lokal di perangkat. Salinan sinkronisasi hanya dibuat untuk akun yang masuk dan disimpan pada Supabase PostgreSQL yang terhubung dengan akun tersebut.',
        },
        {
          title: 'Pengingat salat',
          body: 'Pengingat salat menggunakan notifikasi lokal dan exact alarm. Data untuk pengingat tidak meninggalkan perangkat.',
        },
        {
          title: 'Laporan kerusakan',
          body: 'Sentry menerima log kerusakan yang dianonimkan, seperti model perangkat, versi sistem operasi, dan stack trace. Log tersebut tidak memuat konten pribadi Anda.',
        },
        {
          title: 'Tanpa iklan atau penjualan data',
          body: 'Kami tidak menggunakan iklan, pelacak iklan, atau analitik pemasaran. Kami tidak menjual atau membagikan data pribadi Anda.',
        },
        {
          title: 'Pihak ketiga',
          body: 'Kami menggunakan Supabase untuk akun dan sinkronisasi progres, Sentry untuk pelaporan kerusakan, Google Sign-In untuk autentikasi, serta eQuran.id dan MyQuran.com untuk perhitungan waktu salat.',
        },
        {
          title: 'Penyimpanan dan penghapusan',
          body: 'Progres tetap di perangkat sampai aplikasi dihapus. Backup server hanya aktif untuk akun yang masuk. Permintaan melalui email akan menghapus akun dan seluruh data server dalam tujuh hari.',
          link: {
            label: 'Petunjuk hapus akun',
            href: '/delete-account/',
          },
        },
        {
          title: 'Anak-anak',
          body: 'Muslim Leveling sesuai untuk semua usia dan tidak mengumpulkan data anak di luar yang dijelaskan di sini. Masuk akun memerlukan akun Google milik pengguna.',
        },
        {
          title: 'Perubahan dan kontak',
          body: 'Kami akan memposting perubahan kebijakan ini dengan tanggal yang diperbarui. Untuk pertanyaan, hubungi kami melalui email.',
          link: {
            label: 'muslim.leveling@gmail.com',
            href: 'mailto:muslim.leveling@gmail.com',
          },
        },
      ],
    },
    terms: {
      title: 'Ketentuan Penggunaan',
      description: 'Ketentuan penggunaan Muslim Leveling untuk aplikasi Android.',
      effectiveDate: '4 Agustus 2026',
      sections: [
        {
          title: 'Status dokumen',
          body: 'Ketentuan ini berlaku untuk aplikasi Android Muslim Leveling dan website pendukungnya.',
        },
        {
          title: 'Penggunaan aplikasi',
          body: 'Anda dapat menggunakan Muslim Leveling secara opsional dan atas kebijaksanaan Anda sendiri. Aplikasi dirancang untuk mendukung rutinitas ibadah dan pembelajaran, bukan menggantikan penilaian keagamaan pribadi.',
        },
        {
          title: 'Ketersediaan',
          body: 'Fitur, ketersediaan aplikasi, dan informasi produk dapat berubah.',
        },
        {
          title: 'Penggunaan yang wajar',
          body: 'Jangan menyalahgunakan aplikasi, mengganggu layanan, atau mencoba mengakses data maupun akun yang bukan milik Anda.',
        },
        {
          title: 'Kekayaan intelektual',
          body: 'Aplikasi, konten, dan merek Muslim Leveling merupakan milik Lifetime Leveling atau pemberi lisensinya.',
        },
        {
          title: 'Dukungan',
          body: 'Untuk pertanyaan tentang penggunaan aplikasi, hubungi dukungan Muslim Leveling.',
          link: {
            label: 'muslim.leveling@gmail.com',
            href: 'mailto:muslim.leveling@gmail.com',
          },
        },
      ],
    },
    support: {
      title: 'Dukungan',
      description: 'Cara menghubungi dukungan Muslim Leveling.',
      effectiveDate: '4 Agustus 2026',
      sections: [
        {
          title: 'Topik yang dapat dibantu',
          body: 'Dukungan hanya menangani penghapusan akun, masuk dan backup opsional, akses tanpa pembelian, masalah jadwal atau pengingat salat, dan laporan bug.',
        },
        {
          title: 'Cara menghubungi kami',
          body: 'Kirim detail yang relevan melalui email. Kami tidak menjanjikan waktu respons tertentu atau SLA.',
          link: {
            label: 'muslim.leveling@gmail.com',
            href: 'mailto:muslim.leveling@gmail.com',
          },
        },
        {
          title: 'Hapus akun',
          body: 'Untuk menghapus backup akun dan data server, gunakan petunjuk penghapusan akun.',
          link: {
            label: 'Petunjuk hapus akun',
            href: '/delete-account/',
          },
        },
      ],
    },
    deletion: {
      title: 'Hapus Akun',
      description: 'Cara menghapus akun Muslim Leveling dan backup server.',
      effectiveDate: '4 Agustus 2026',
      sections: [
        {
          title: 'Data lokal',
          body: 'Menghapus instalasi aplikasi akan menghapus progres yang hanya tersimpan secara lokal di perangkat.',
        },
        {
          title: 'Hapus backup akun',
          body: 'Kirim email, sebaiknya dari akun Google yang digunakan untuk backup, dengan subjek atau frasa persis: Delete my Muslim Leveling account. Permintaan email akan menghapus akun dan seluruh backup data sisi server dalam tujuh hari.',
          link: {
            label: 'muslim.leveling@gmail.com',
            href: 'mailto:muslim.leveling@gmail.com',
          },
        },
        {
          title: 'Jika tidak pernah masuk',
          body: 'Jika Anda tidak pernah masuk dengan Google, progres hanya berada di perangkat dan tidak ada backup server yang perlu dihapus.',
        },
      ],
    },
  },
  en: {
    privacy: {
      title: 'Muslim Leveling Privacy Policy',
      description: 'Privacy policy for the Muslim Leveling Android app.',
      effectiveDate: '4 August 2026',
      sections: [
        {
          title: 'Document status',
          body: 'This policy applies to the Muslim Leveling Android app and supporting website.',
        },
        {
          title: 'Location for prayer times',
          body: 'Location is optional, processed on-device solely for prayer times, and is never stored on our servers. If used, coordinates are sent over HTTPS to eQuran.id and api.myquran.com only for prayer-time calculation. We do not share location beyond that API call, retain location history, or track background location. You can choose a city manually without granting location permission.',
        },
        {
          title: 'Optional Google sign-in and backup',
          body: 'Google sign-in is optional. If you choose it, we receive your email, name, and profile photo solely to back up and sync game and learning progress. The app works fully offline without Google sign-in.',
        },
        {
          title: 'Learning progress',
          body: 'Quest progress, XP, achievements, and learning records are stored locally on your device. A sync copy is created only for signed-in accounts and is stored in Supabase PostgreSQL tied to that account.',
        },
        {
          title: 'Prayer reminders',
          body: 'Prayer reminders use local notifications and exact alarms. Reminder data does not leave your device.',
        },
        {
          title: 'Crash reporting',
          body: 'Sentry receives anonymized crash logs, such as device model, operating-system version, and stack trace. These logs do not include your personal content.',
        },
        {
          title: 'No advertising or data sales',
          body: 'We do not use ads, ad trackers, or marketing analytics. We do not sell or share your personal data.',
        },
        {
          title: 'Third parties',
          body: 'We use Supabase for account and progress sync, Sentry for crash reporting, Google Sign-In for authentication, and eQuran.id and MyQuran.com for prayer-time calculation.',
        },
        {
          title: 'Storage and deletion',
          body: 'Progress remains on your device until you uninstall the app. Server backup is active only for signed-in accounts. An email request removes the account and all server data within seven days.',
          link: {
            label: 'Account deletion instructions',
            href: '/en/delete-account/',
          },
        },
        {
          title: 'Children',
          body: "Muslim Leveling is suitable for all ages and does not collect children's data beyond what is described here. Account sign-in requires the user's own Google account.",
        },
        {
          title: 'Changes and contact',
          body: 'We will post policy changes with an updated date. For questions, contact us by email.',
          link: {
            label: 'muslim.leveling@gmail.com',
            href: 'mailto:muslim.leveling@gmail.com',
          },
        },
      ],
    },
    terms: {
      title: 'Terms of Use',
      description: 'Terms of use for the Muslim Leveling Android app.',
      effectiveDate: '4 August 2026',
      sections: [
        {
          title: 'Document status',
          body: 'These terms apply to the Muslim Leveling Android app and supporting website.',
        },
        {
          title: 'Using the app',
          body: 'You may use Muslim Leveling optionally and at your own discretion. The app supports worship routines and learning; it does not replace personal religious judgement.',
        },
        {
          title: 'Availability',
          body: 'Features, app availability, and product information may change.',
        },
        {
          title: 'Fair use',
          body: 'Do not misuse the app, disrupt the service, or attempt to access data or accounts that are not yours.',
        },
        {
          title: 'Intellectual property',
          body: 'The Muslim Leveling app, content, and brand belong to Lifetime Leveling or its licensors.',
        },
        {
          title: 'Support',
          body: 'For questions about using the app, contact Muslim Leveling support.',
          link: {
            label: 'muslim.leveling@gmail.com',
            href: 'mailto:muslim.leveling@gmail.com',
          },
        },
      ],
    },
    support: {
      title: 'Muslim Leveling Support',
      description: 'How to contact Muslim Leveling support.',
      effectiveDate: '4 August 2026',
      sections: [
        {
          title: 'What we can help with',
          body: 'Support is limited to account deletion, optional sign-in and backup, purchase-free access, prayer schedule or reminder troubleshooting, and bug reports.',
        },
        {
          title: 'Contact us',
          body: 'Email the relevant details. We do not promise a specific response time or SLA.',
          link: {
            label: 'muslim.leveling@gmail.com',
            href: 'mailto:muslim.leveling@gmail.com',
          },
        },
        {
          title: 'Delete an account',
          body: 'For account-backup and server-data deletion, follow the account deletion instructions.',
          link: {
            label: 'Account deletion instructions',
            href: '/en/delete-account/',
          },
        },
      ],
    },
    deletion: {
      title: 'Delete Account',
      description: 'How to delete a Muslim Leveling account and server backup.',
      effectiveDate: '4 August 2026',
      sections: [
        {
          title: 'Local data',
          body: 'Uninstalling the app removes progress that is stored only locally on your device.',
        },
        {
          title: 'Delete an account backup',
          body: 'Email us, preferably from the Google account used for backup, with the exact subject or phrase: Delete my Muslim Leveling account. An email request removes the account and all server-side backup data within seven days.',
          link: {
            label: 'muslim.leveling@gmail.com',
            href: 'mailto:muslim.leveling@gmail.com',
          },
        },
        {
          title: 'If you never signed in',
          body: 'If you never signed in with Google, progress stays only on your device and there is no server backup to delete.',
        },
      ],
    },
  },
} as const satisfies Record<'id' | 'en', MuslimLegalDocuments>;
