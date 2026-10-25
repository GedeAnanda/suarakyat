# Panduan setup repo (untuk ketua)

Ikuti sekali di awal. Perkiraan waktu: 30–45 menit. Hapus file ini setelah selesai jika tidak diperlukan lagi.

## 1. Buat repo kosong di GitHub

1. Buka github.com → **New repository**.
2. Nama: `suarakyat`. Visibilitas: **Public** (wajib untuk First Draft Submission).
3. **Jangan** centang "Add a README", ".gitignore", atau "license", karena semuanya sudah ada di starter pack.
4. Klik **Create repository**.

## 2. Buat project Next.js di laptop

```bash
npx create-next-app@latest suarakyat
```

Jawaban yang disarankan: TypeScript **Yes**, ESLint **Yes**, Tailwind CSS **Yes**, folder `src/` **No**, App Router **Yes**, import alias **biarkan default** (`@/*`). Jika pertanyaannya sedikit berbeda di versi terbaru, pilih yang setara.

## 3. Salin isi starter pack

Salin **semua** isi folder `suarakyat-starter` ke folder `suarakyat`, termasuk file tersembunyi (`.env.example`, `.gitignore`, `.github/`). Timpa `README.md` dan `.gitignore` bawaan.

```bash
# macOS / Linux
cp -r suarakyat-starter/. suarakyat/

# Windows (PowerShell)
Copy-Item -Path suarakyat-starter\* -Destination suarakyat -Recurse -Force
```

## 4. Pasang dependensi

```bash
cd suarakyat
npm install @supabase/supabase-js @supabase/ssr leaflet react-leaflet leaflet.markercluster recharts zod
npm install -D vitest @types/leaflet @types/leaflet.markercluster
```

Tambahkan baris ini ke bagian `"scripts"` di `package.json`:

```json
"test": "vitest run"
```

Cek semuanya jalan:

```bash
npm test        # harus: 14 tes lulus
npm run dev     # buka http://localhost:3000
```

Jika npm mengeluh soal *peer dependency* `react-leaflet`, cek versi `react-leaflet` yang cocok dengan versi React yang terpasang.

## 5. Push pertama

`create-next-app` sudah membuat repo git lokal, jadi tidak perlu `git init`.

```bash
git add .
git commit -m "chore: starter pack suaRAkyat"
git branch -M main
git remote add origin https://github.com/<akun-ketua>/suarakyat.git
git push -u origin main
```

## 6. Atur repo di GitHub

- **Settings → Collaborators** → undang dua anggota tim.
- **Settings → Branches** (atau **Rules**) → tambahkan aturan untuk `main`: wajib lewat pull request, minimal 1 approval.
- **Settings → General** → aktifkan "Automatically delete head branches" supaya branch fitur terhapus otomatis setelah merge.
- Tab **Actions** akan menjalankan `npm test` di setiap PR (file `.github/workflows/test.yml`).

## 7. Hubungkan ke Vercel

1. vercel.com → **Add New → Project** → import repo `suarakyat`.
2. Isi **Environment Variables** sesuai `.env.example`.
3. **Deploy**. Setelah itu, masukkan domain Vercel ke Supabase: Auth → URL Configuration → Site URL.

## 8. Untuk anggota lain

```bash
git clone https://github.com/<akun-ketua>/suarakyat.git
cd suarakyat
npm install
cp .env.example .env.local     # minta isinya ke ketua lewat chat pribadi, bukan grup
git checkout -b feat/a-landing # sesuaikan peran dan fitur
```
