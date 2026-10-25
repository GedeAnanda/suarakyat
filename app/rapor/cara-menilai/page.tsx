// app/rapor/cara-menilai/page.tsx — Cara Menilai (SDD 9), pemilik: A
// TODO(A): konten statis rumus rapor (R, S, P, K, huruf, peringatan penolakan) dari PRD bagian 8 dan SDD 8.1.
// Operasi SDD 6: tidak ada (halaman statis). Angka contoh boleh diambil dari lib/scoring/rapor.ts.

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Cara Menilai' };

export default function CaraMenilaiPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Cara Menilai Instansi</h1>
      <p className="mt-2 text-neutral-600">
        Penjelasan rumus Rapor Instansi: apa yang diukur, bobot tiap komponen, dan kapan huruf dibatasi.
      </p>
    </div>
  );
}
