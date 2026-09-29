# EcoSmart FINAL V14 — Panduan Publikasi

V14 adalah paket rilis final yang disiapkan untuk hosting statis, akses HP, pembagian link ke jejaring sosial, PWA, dan langkah awal SEO/indexing Google.

## Pilihan paling mudah: Netlify
1. Buka Netlify dan login.
2. Pilih Netlify Drop.
3. Upload folder `EcoSmart_FINAL_V14` (atau hasil ekstrak ZIP ini).
4. Netlify akan memberi URL publik HTTPS.
5. Ubah nama site/subdomain bila diperlukan.

## Pilihan GitHub Pages
1. Buat repository baru di GitHub dan upload isi folder V14 ke root repository.
2. Pastikan branch utama bernama `main`.
3. Workflow `.github/workflows/pages.yml` akan men-deploy ke GitHub Pages saat push ke `main`.
4. Di Settings > Pages, pastikan sumber publikasinya menggunakan GitHub Actions bila diminta.
5. GitHub kemudian menampilkan URL site pada halaman Pages.

## Pilihan Vercel
1. Import repository V14 sebagai project baru.
2. Karena ini static site, tidak perlu build command.
3. Output/source root adalah folder repository ini.
4. Setelah deploy, Vercel memberi URL HTTPS publik.

## Setelah URL publik sudah jadi
1. Ganti `DOMAIN-ANDA` pada `robots.txt.template` dan `sitemap.xml.template` dengan URL/domain final.
2. Simpan hasilnya sebagai `robots.txt` dan `sitemap.xml` di root site.
3. Setelah URL final diketahui, isi metadata sosial di `index.html` dengan URL absolut bila diperlukan, terutama `og:url` dan `og:image`.
4. Buka Google Search Console, tambahkan/verifikasi properti website, lalu kirim `sitemap.xml`.
5. Untuk beranda, gunakan URL Inspection lalu Request indexing. Pengindeksan tidak instan dan permintaan indexing bukan jaminan halaman langsung muncul di hasil pencarian.
6. Bagikan URL publik ke WhatsApp, Instagram bio/story, Facebook, Telegram, atau jejaring sosial lain.

## Akses HP
EcoSmart dibuat responsive dan memiliki manifest + service worker. Pada browser yang mendukung pemasangan PWA, tombol install dapat muncul sehingga pengguna dapat menambahkan EcoSmart ke layar utama. PWA lengkap membutuhkan konteks HTTPS/localhost.

## Data pengguna
V14 masih menggunakan `localStorage`. Artinya riwayat, progress, challenge, quiz, dan profil tersimpan di browser/perangkat masing-masing; belum ada akun bersama atau database.

## Catatan penting sebelum publikasi
Jangan mengunggah data pribadi, API key, password, atau file rahasia ke repository publik. EcoSmart V14 tidak membutuhkan server-side secret untuk fitur intinya.


### Catatan V14 — foto Edukasi
Kartu Edukasi kini memakai foto kategori yang sesuai. Sumber dan lisensi dicatat di `PHOTO_SOURCES.md`.
