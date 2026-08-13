# Checklist soft-launch: Lifetime Leveling & Muslim Leveling

Dokumen ini adalah checklist untuk pemilik sebelum soft-launch. Website statis di-host oleh Hostinger melalui branch GitHub `deploy`; GCP tidak menjadi hosting website.

## 1. Verifikasi Google Search Console

1. Di DNS untuk `lifetimeleveling.com`, tambahkan TXT record dari Google Search Console untuk **Domain property**.
2. Selesaikan verifikasinya setelah DNS terpropagasi. Domain property tersebut juga mencakup `muslim.lifetimeleveling.com`.

## 2. Pemetaan dan smoke test Hostinger

1. Petakan `lifetimeleveling.com` ke `public_html` dan `muslim.lifetimeleveling.com` ke `public_html/muslim`.
2. Aktifkan HTTPS untuk kedua host sebelum memasukkan domain pada konfigurasi Google.
3. Dalam browser logged-out, buka versi Indonesia dan English untuk semua rute berikut pada `https://muslim.lifetimeleveling.com`:
   - `/` dan `/en/`
   - `/privacy/` dan `/en/privacy/`
   - `/terms/` dan `/en/terms/`
   - `/support/` dan `/en/support/`
   - `/delete-account/` dan `/en/delete-account/`
4. Periksa HTTPS, canonical host, tombol bahasa, Google Play, dan bahwa tidak ada aset yang 404.

## 3. Google Cloud: Android OAuth saja

1. Pertahankan OAuth client Android untuk package `id.muslimleveling.muslim_leveling` beserta SHA-1 release keystore-nya.
2. Pertahankan OAuth client web/server yang sudah ada hanya karena Android mengirimkannya sebagai `serverClientId` untuk native token exchange dengan Supabase.
3. Jangan menambahkan JavaScript origin, browser redirect URI, atau alur sign-in website. Situs ini tidak menjalankan Google OAuth di browser.

## 4. OAuth consent screen / application links

Setelah rute HTTPS sudah hidup, konfigurasi public links berikut:

- `https://muslim.lifetimeleveling.com/`
- `https://muslim.lifetimeleveling.com/privacy/`
- `https://muslim.lifetimeleveling.com/terms/`

Tambahkan verified owner domain hanya setelah rute HTTPS tersebut live.

Contoh wording persetujuan yang harus dipertahankan:

> Google Sign-In optional / opsional dan dipakai hanya untuk backup serta sinkronisasi progres. Aplikasi tidak mewajibkan login Google untuk digunakan.

## 5. Persetujuan dan pemeriksaan sebelum push/deploy

- Pemilik sudah menyetujui teks privacy dan terms bilingual; persetujuan ini sudah dicatat di proyek.
- Pemilik sudah meninjau tujuh screenshot Android asli yang dipakai pada landing page; ini juga sudah dicatat di proyek.
- Pada hari rilis, klik satu per satu tautan Google Play, Privacy, Terms, Delete Account, dan Support dari Android serta desktop.
- Hanya setelah checklist ini selesai, push branch rilis sesuai alur GitHub/Hostinger yang dipilih. Dokumen ini tidak melakukan push atau deploy.

## Reproduksi pemeriksaan browser lokal

CI menjalankan `npm run test:e2e:studio` dan `npm run test:e2e:muslim` di Ubuntu. Di Windows, jalankan build terlebih dahulu, lalu kelola preview setiap surface secara eksplisit dan set `PLAYWRIGHT_EXECUTABLE_PATH` ke Chrome lokal sebelum memanggil file Playwright. Cara ini menghindari penghentian `webServer` Playwright yang tidak konsisten di Windows tanpa mengubah konfigurasi atau cakupan test CI.

## Batas peran layanan

GCP hanya digunakan untuk Android OAuth dan verifikasi Search Console. Hostinger meng-host website statis melalui branch GitHub `deploy`.
