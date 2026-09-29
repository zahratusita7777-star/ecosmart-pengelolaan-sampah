# EcoSmart FINAL V14

EcoSmart adalah aplikasi web rekomendasi pengelolaan sampah rumah tangga berbasis Simple Additive Weighting (SAW).

## Fitur utama
- Landing page, Dashboard, Analisis, Proses SAW, Hasil, Detail SAW, Simulator, Aksi, Manfaat, Edukasi, Quiz, Helper, Visual Helper, Challenge, Progress, Riwayat, Eco Map, SAW Lab, dan Tentang.
- Penyimpanan data demo menggunakan `localStorage` pada browser/perangkat pengguna.
- Hasil analisis dapat dibagikan, dicetak, dan disimpan sebagai JSON.
- Dukungan PWA melalui manifest, ikon, service worker, dan tombol pemasangan jika browser mendukung.
- Responsive design untuk desktop dan HP.
- Metadata Open Graph/Twitter dan structured data dasar untuk kesiapan publikasi.
- Deployment config siap untuk GitHub Pages, Netlify, dan Vercel.
- GitHub Actions workflow untuk deployment otomatis ke GitHub Pages.
- Halaman 404 dan file `.nojekyll` untuk hosting statis.

## Jalankan lokal
Buka `index.html` pada browser modern untuk menggunakan fitur utama. Untuk menguji service worker/PWA secara lengkap, gunakan localhost atau hosting HTTPS.

## Data pengguna
Profil, progress, challenge, quiz, dan riwayat pada versi ini disimpan di browser perangkat pengguna. Data belum terpusat ke database.

## Publikasi
V14 sudah disiapkan sebagai paket static hosting. Untuk akses publik melalui HP, deploy ke hosting seperti GitHub Pages, Netlify, atau Vercel lalu bagikan URL HTTPS yang diberikan hosting.

Untuk langkah Google Search, baca `PUBLICATION.md`. Google menyarankan penggunaan Search Console, termasuk sitemap dan URL Inspection, untuk membantu penemuan/indexing situs.

Untuk menyiapkan sitemap setelah URL final diketahui, ubah `DOMAIN-ANDA` pada `sitemap.xml.template` lalu simpan sebagai `sitemap.xml`. Lakukan hal yang sama untuk `robots.txt.template`.

## Struktur publikasi
- `.github/workflows/pages.yml` → deployment GitHub Pages
- `.nojekyll` → penanda static site untuk GitHub Pages
- `netlify.toml` → konfigurasi Netlify
- `vercel.json` → konfigurasi Vercel
- `404.html` → fallback halaman tidak ditemukan
- `robots.txt.template` + `sitemap.xml.template` → template setelah URL final tersedia
- `PUBLICATION.md` → langkah publikasi dan Google Search Console


## Sumber foto edukasi
Foto kartu Edukasi pada V14 memakai sumber Wikimedia Commons dengan lisensi yang mengizinkan penggunaan ulang.
- Organik — “Food-scraps-compost.jpg”, Philip Cohen, CC BY 2.0. https://commons.wikimedia.org/wiki/File:Food-scraps-compost.jpg
- Plastik — “Recyclables.JPG”, Streetwise Cycle, public domain. https://commons.wikimedia.org/wiki/File:Recyclables.JPG
- Kertas — “Recycling Newspapers.JPG”, MarkBuckawicki, CC0. https://commons.wikimedia.org/wiki/File:Recycling_Newspapers.JPG
- Kaca — “Glass-recycling.jpg”, Skatebiker, public domain. https://commons.wikimedia.org/wiki/File:Glass-recycling.jpg
- Logam — “Cans recycling.jpg”, Radulf del Maresme, CC BY-SA 4.0. https://commons.wikimedia.org/wiki/File:Cans_recycling.jpg
