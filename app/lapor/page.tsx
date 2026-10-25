// app/lapor/page.tsx — Buat Laporan (SDD 9), pemilik: A. Hanya untuk pengguna login (proxy.ts).
// TODO(A): BannerBukanKanalResmi, PetaPin, UnggahFoto (kompres + buang EXIF di browser), DaftarLaporanSerupa.
// Operasi SDD 6: Q4 categories + agencies (pilihan kategori), S1 unggah foto ke Storage,
// R2 similar_reports (laporan serupa), R3 create_report (kirim laporan).

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Buat Laporan' };

export default function LaporPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Buat Laporan</h1>
      <p className="mt-2 text-neutral-600">
        Laporkan masalah kota dengan foto dan titik lokasi, lalu dapatkan kode untuk melacak penanganannya.
      </p>
    </div>
  );
}
