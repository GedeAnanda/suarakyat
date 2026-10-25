// app/admin/laporan/[kode]/page.tsx — Detail dan Ubah Status (SDD 9), pemilik: A.
// Hanya untuk pengguna login (proxy.ts).
// TODO(A): FormUbahStatus (pilihan status sesuai tabel transisi SDD 6.3, alasan tolak, catatan,
// rujukan duplikat, unggah bukti).
// Operasi SDD 6: Q2 v_laporan_publik + v_timeline_publik, S1 unggah foto bukti, R6 update_report_status.

import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = { title: 'Ubah Status Laporan' };

// Dengan cacheComponents, `params` adalah data runtime sehingga harus dibaca di dalam <Suspense>.
export default function AdminDetailLaporanPage({ params }: PageProps<'/admin/laporan/[kode]'>) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Ubah Status Laporan</h1>
      <p className="mt-2 text-neutral-600">
        Periksa laporan lalu ubah statusnya sesuai aturan transisi, lengkap dengan alasan atau foto bukti.
      </p>
      <Suspense fallback={<p className="mt-4 text-sm text-neutral-500">Memuat kode laporan…</p>}>
        {params.then(({ kode }) => (
          <p className="mt-4 text-sm text-neutral-700">
            Kode laporan: <span className="font-mono">{kode}</span>
          </p>
        ))}
      </Suspense>
    </div>
  );
}
