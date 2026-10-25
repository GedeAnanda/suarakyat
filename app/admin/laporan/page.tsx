// app/admin/laporan/page.tsx — Laporan Instansi (SDD 9), pemilik: A. Hanya untuk pengguna login (proxy.ts).
// TODO(A): TabelLaporanAdmin (boleh digulir ke samping di ponsel), urut terlambat lalu batas_selesai.
// Operasi SDD 6: Q3 v_laporan_admin (RLS otomatis membatasi ke instansi admin).

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Laporan Instansi' };

export default function AdminLaporanPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Laporan Instansi</h1>
      <p className="mt-2 text-neutral-600">
        Daftar laporan untuk instansi Anda, dengan laporan yang melewati batas waktu di urutan teratas.
      </p>
    </div>
  );
}
