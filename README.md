# 🎂 The Birthday Adventure — Panduan Lengkap

Website interaktif spesial ulang tahun yang romantis, menyenangkan, dan berkesan. Dokumen ini berisi panduan lengkap untuk:
1. **Menghubungkan Form Harapan (Wish Form) ke Google Spreadsheet Anda**
2. **Publish / Upload Project ke GitHub**
3. **Deploy & Hosting Gratis di Render.com**
4. **Menjalankan & Menyesuaikan Konten di Komputer Lokal**

---

## 📑 Daftar Isi
- [1. Cara Menghubungkan Wish Form ke Google Sheet](#1-cara-menghubungkan-wish-form-ke-google-sheet)
- [2. Cara Publish ke GitHub](#2-cara-publish-ke-github)
- [3. Cara Hosting di Render.com (Gratis & Cepat)](#3-cara-hosting-di-rendercom-gratis--cepat)
- [4. Menjalankan di Komputer Lokal (Development)](#4-menjalankan-di-komputer-lokal-development)
- [5. Kustomisasi Foto, Lagu, dan Pesan Romantis](#5-kustomisasi-foto-lagu-dan-pesan-romantis)
- [6. Struktur Folder Project](#6-struktur-folder-project)

---

## 1. Cara Menghubungkan Wish Form ke Google Sheet

Harapan yang ditulis pasangan di **Bab 04 (Kotak Harapan)** akan otomatis terkirim dan tersimpan rapi ke Google Spreadsheet Anda:
👉 **[Link Google Spreadsheet Anda](https://docs.google.com/spreadsheets/d/1pF-qkBZtk4j9XjPmN2ej7UsOy2ZoZoGhc8QAs56dkxg/edit?usp=sharing)**

Ikuti 6 langkah mudah berikut:

### Langkah 1: Buka Google Apps Script
1. Buka spreadsheet Anda melalui browser:
   `https://docs.google.com/spreadsheets/d/1pF-qkBZtk4j9XjPmN2ej7UsOy2ZoZoGhc8QAs56dkxg/edit`
2. Di menu bagian atas, klik **Extensions** (atau **Ekstensi**) lalu pilih **Apps Script**.

### Langkah 2: Masukkan Kode Script
1. Di halaman editor Google Apps Script yang baru terbuka, hapus semua kode bawaan yang ada (misal `function myFunction() {}`).
2. Buka file [google-apps-script/Code.gs](file:///d:/project%20my%20gf/google-apps-script/Code.gs) di project ini, **copy semua isinya**, lalu **paste** ke editor Apps Script.
3. *(Opsional)* Jika Anda ingin mendapatkan notifikasi email setiap kali pasangan mengirim harapan:
   - Ganti `ganti_dengan_email_anda@gmail.com` pada baris `EMAIL_RECIPIENT` dengan alamat email Gmail Anda.
   - Ubah `const SEND_EMAIL_NOTIFICATION = false;` menjadi `true;`.
4. Klik tombol **Save** (ikon disket 💾) di bagian toolbar atas.

### Langkah 3: Deploy sebagai Web App
1. Klik tombol biru **Deploy** (atau **Terapkan**) di pojok kanan atas, lalu pilih **New deployment** (Penerapan baru).
2. Klik ikon gerigi ⚙️ di sebelah kiri bertuliskan *Select type*, lalu pilih **Web app** (Aplikasi web).
3. Isi pengaturannya seperti berikut:
   - **Description**: `Birthday Wish Webhook`
   - **Execute as**: **Me (email Anda)**
   - **Who has access**: **Anyone** (Siapa saja)  
     ⚠️ *Sangat penting memilih "Anyone" agar form di website bisa mengirimkan data tanpa perlu login akun Google.*
4. Klik tombol **Deploy**.

### Langkah 4: Berikan Otorisasi Izin Akses
1. Jika muncul jendela otorisasi, klik **Authorize access** (Izinkan akses).
2. Pilih akun Google Anda.
3. Jika Google menampilkan peringatan *"Google hasn't verified this app"*:
   - Klik teks **Advanced** (Lanjutan) di kiri bawah.
   - Klik **Go to Birthday Wish Form (unsafe)**.
   - Klik tombol **Allow** (Izinkan).

### Langkah 5: Salin URL Web App
1. Setelah berhasil dideploy, Google akan menampilkan **Web App URL** yang berakhiran `/exec`.
   Contoh formatnya:
   ```text
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
   ```
2. Klik tombol **Copy** di samping URL tersebut.

### Langkah 6: Tempel URL ke Project Website
1. Buka file [src/data/birthdayConfig.js](file:///d:/project%20my%20gf/src/data/birthdayConfig.js) di VS Code / editor Anda.
2. Cari baris `googleAppsScriptUrl: "",` (sekitar baris 90).
3. Tempelkan URL yang sudah Anda copy tadi di dalam tanda kutip:
   ```javascript
   // src/data/birthdayConfig.js
   googleAppsScriptUrl: "https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec",
   ```
4. Simpan file (`Ctrl + S`). Sekarang form harapan sudah terhubung langsung ke Google Sheets Anda! 🎉

---

## 2. Cara Publish ke GitHub

Untuk menghosting di Render.com secara otomatis dan gratis, Anda perlu meng-upload kode project ini ke akun GitHub Anda.

### Langkah 1: Buat Repository Baru di GitHub
1. Buka [https://github.com](https://github.com) dan login ke akun GitHub Anda.
2. Klik tombol **+** di pojok kanan atas, pilih **New repository**.
3. Beri nama repository, misalnya: `birthday-adventure` atau `project-my-gf`.
4. Pilih **Public** atau **Private** (Render.com mendukung keduanya).
5. ⚠️ **JANGAN** centang *"Add a README file"*, *"Add .gitignore"*, atau *"Choose a license"* (karena project lokal kita sudah memilikinya).
6. Klik tombol **Create repository**.
7. Salin URL git repository Anda, contohnya:
   ```text
   https://github.com/USERNAME_ANDA/birthday-adventure.git
   ```

### Langkah 2: Push Kode dari Komputer ke GitHub
Buka terminal (PowerShell atau Command Prompt) di folder project ini (`d:\project my gf`), lalu jalankan perintah berikut secara berurutan:

```bash
# 1. Masukkan semua file ke git staging
git add .

# 2. Simpan commit pertama Anda
git commit -m "feat: complete interactive birthday adventure"

# 3. Ubah nama branch utama menjadi main
git branch -M main

# 4. Hubungkan project lokal ke repository GitHub Anda (ganti URL di bawah dengan URL repo Anda)
git remote add origin https://github.com/USERNAME_ANDA/birthday-adventure.git

# 5. Upload / push kode ke GitHub
git push -u origin main
```

> **Catatan**: Jika terminal meminta login GitHub, lakukan login melalui browser atau masukkan Personal Access Token (PAT) Anda.

---

## 3. Cara Hosting di Render.com (Gratis & Cepat)

Render.com menyediakan hosting gratis untuk aplikasi web statis berbasis Vite/React dengan SSL/HTTPS otomatis dan custom domain.

### Langkah 1: Buat Akun & Sambungkan GitHub ke Render
1. Kunjungi [https://render.com](https://render.com) dan klik **Sign Up** atau **Log In**.
2. Pilih login menggunakan akun **GitHub** Anda agar Render langsung terhubung dengan repository Anda.

### Langkah 2: Buat Static Site Baru
1. Di Dashboard Render, klik tombol **New +** (di kanan atas) lalu pilih **Static Site**.
2. Di bagian *Connect a repository*, pilih repository GitHub yang baru saja Anda buat tadi (misal: `birthday-adventure`).
   *(Jika belum muncul, klik "Configure account" untuk mengizinkan akses ke repository tersebut).*

### Langkah 3: Pengaturan Konfigurasi (Build Settings)
Isi formulir konfigurasi di Render dengan nilai berikut:

| Pengaturan | Nilai yang Harus Diisi | Keterangan |
| :--- | :--- | :--- |
| **Name** | `birthday-adventure` *(atau nama bebas)* | Akan menjadi subdomain: `nama.onrender.com` |
| **Branch** | `main` | Branch tempat kode Anda berada |
| **Root Directory** | *(Biarkan kosong)* | Default root |
| **Build Command** | `npm run build` | Perintah untuk mem-build Vite React |
| **Publish Directory** | `dist` | Folder hasil build yang akan disajikan ke publik |

### Langkah 4: Tambahkan Rewrite Rule (Penting untuk Single Page App)
Agar saat halaman di-refresh tidak menghasilkan 404 Not Found:
1. Scroll ke bawah ke bagian **Redirects/Rewrites**.
2. Klik **Add Rule**.
3. Atur:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`

### Langkah 5: Klik Deploy!
1. Klik tombol **Create Static Site** di bagian paling bawah.
2. Render akan secara otomatis menjalankan `npm run build` dan mempublikasikan website Anda.
3. Proses build membutuhkan waktu sekitar 1 - 2 menit.
4. Setelah status berubah menjadi **Live**, Anda akan mendapatkan link website gratis dengan HTTPS, misalnya:
   `https://birthday-adventure.onrender.com`
5. Buka link tersebut di smartphone untuk mencoba langsung! ❤️

---

## 4. Menjalankan di Komputer Lokal (Development)

Jika Anda ingin mencoba atau mengedit website di komputer Anda terlebih dahulu:

1. Buka folder ini di terminal atau VS Code.
2. Jalankan perintah:
   ```bash
   npm run dev
   ```
3. Buka tautan yang muncul di browser:
   ```text
   http://localhost:5173/
   ```

---

## 5. Kustomisasi Foto, Lagu, dan Pesan Romantis

Semua konten personalisasi telah dirancang agar sangat mudah diubah:

### 1. Mengubah Data Utama & Konfigurasi
Buka [src/data/birthdayConfig.js](file:///d:/project%20my%20gf/src/data/birthdayConfig.js) untuk mengubah:
- `recipientName`: Nama panggilan pasangan (contoh: `"Herlin"`).
- `senderName`: Nama Anda.
- `birthdayDate`: Tanggal ulang tahun (contoh: `"04 Oktober 2026"`).
- `googleAppsScriptUrl`: URL Web App Google Apps Script hasil deploy.
- `letter`: Teks surat cinta personal.
- `finalSurprise`: Pesan penutup dan ucapan selamat ulang tahun.

### 2. Mengubah Foto Galeri Kenangan
1. Masukkan foto-foto Anda berdua ke folder `public/photos/`.
2. Buka [src/data/memories.js](file:///d:/project%20my%20gf/src/data/memories.js) untuk menyesuaikan caption, tahun, lokasi, dan catatan di balik polaroid.

### 3. Mengubah Musik Latar
1. Taruh file audio MP3 Anda ke dalam folder `public/music/`:
   - `background.mp3`: Musik romantis yang diputar selama menjelajah website.
   - `happy-birthday.mp3`: Lagu ulang tahun yang diputar saat lilin kue ditiup.
   *(Jika belum ada file MP3, website memiliki synthesizer nada romantis bawaan otomatis)*.

### 4. Mengubah Kuis Hubungan
Buka [src/data/questions.js](file:///d:/project%20my%20gf/src/data/questions.js) untuk menambah pertanyaan, mengubah pilihan jawaban, dan komentar lucu di setiap soal kuis.

---

## 6. Struktur Folder Project

```text
project-my-gf/
│
├── public/
│   ├── music/               # File lagu (background.mp3, happy-birthday.mp3)
│   ├── photos/              # Foto kenangan berdua
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── Landing.jsx          # Bab 01: Pengecekan kecantikan & Intro
│   │   ├── Verification.jsx     # Bab 02: Verifikasi cinta & tiket kerajaan
│   │   ├── Quiz.jsx             # Bab 03: Kuis memori hubungan
│   │   ├── WishForm.jsx         # Bab 04: Kotak harapan terhubung Google Sheet
│   │   ├── Gallery.jsx          # Bab 05: Galeri polaroid kenangan & lightbox
│   │   ├── LoveLetter.jsx       # Bab 06: Surat cinta amplop bersegel lilin
│   │   ├── Certificate.jsx      # Bab 07: Sertifikat digital yang bisa diunduh (PNG)
│   │   ├── FinalSurprise.jsx    # Bab 08: Hitung mundur, kue ulang tahun & tiup lilin
│   │   ├── MusicController.jsx  # Kontroler floating musik & volume
│   │   ├── ProgressBar.jsx      # Progress bar bab di bagian atas
│   │   └── EasterEggsModal.jsx  # 3 Easter eggs tersembunyi
│   │
│   ├── data/
│   │   ├── birthdayConfig.js    # Konfigurasi nama, tanggal, & Webhook URL
│   │   ├── questions.js         # Daftar soal kuis & komentar lucu
│   │   └── memories.js          # Daftar memori foto & cerita
│   │
│   ├── utils/
│   │   └── audioManager.js      # Pengatur musik MP3 & Web Audio Synth
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css               # Desain glassmorphism & palet warna romantis
│
├── google-apps-script/
│   └── Code.gs                  # Kode Apps Script untuk Google Sheets
├── package.json
└── README.md
```

---

Dibuat dengan segenap cinta dan kebahagiaan. Selamat merayakan hari ulang tahun pasangan tercinta! ❤️✨
