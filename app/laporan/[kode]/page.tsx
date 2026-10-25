// app/laporan/[kode]/page.tsx — Detail & Lacak (SDD 9), pemilik: A
// TODO(A): GaleriSebelumSesudah, Timeline, IndikatorSLA, TombolUpvote, PanelKenapaBelum, FormRating,
// TombolBatalkan, dan halaman 404 bersahabat dengan kolom cari kode (SDD 11.1).
// Operasi SDD 6: Q2 v_laporan_publik + v_timeline_publik, R4 toggle_upvote, R5 cancel_report,
// R7 rate_report, R9 priority_factors + L1 kenapaBelum (lib/scoring) untuk panel "Kenapa belum?".

import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = { title: 'Detail Laporan' };

// Dengan cacheComponents, `params` adalah data runtime sehingga harus dibaca di dalam <Suspense>.
export default function DetailLaporanPage({ params }: PageProps<'/laporan/[kode]'>) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Detail Laporan</h1>
      <p className="mt-2 text-neutral-600">
        Lacak status laporan, riwayat penanganannya, dan posisinya di daftar prioritas.
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
