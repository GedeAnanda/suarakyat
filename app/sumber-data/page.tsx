// app/sumber-data/page.tsx — Sumber Data (SDD 9), pemilik: A (isi dari C)
// TODO(A, C): daftar dataset beserta sumber dan lisensinya (batas kecamatan, BPS, CRM DKI jika layak,
// OpenStreetMap, foto seed) serta penjelasan skenario data simulasi (FR G3, SDD 10).
// Operasi SDD 6: tidak ada (halaman statis).

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Sumber Data' };

export default function SumberDataPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Sumber Data</h1>
      <p className="mt-2 text-neutral-600">
        Daftar dataset yang dipakai aplikasi ini, lisensinya, dan bagian mana yang merupakan data simulasi.
      </p>
    </div>
  );
}
