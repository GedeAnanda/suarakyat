// app/page.tsx — Beranda (SDD 9), pemilik: A
// TODO(A): Hero, StatistikRingkas, PreviewPeta, TombolDemo.
// Operasi SDD 6: R1 stats_beranda (statistik ringkas), Q1 v_laporan_publik (preview peta),
// A1 POST /api/demo-login (tombol "Coba sebagai warga/admin").

import BannerSimulasi from '@/components/BannerSimulasi';

export default function BerandaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">suaRAkyat</h1>
        <p className="mt-2 text-neutral-600">
          Laporkan masalah kota, lacak penanganannya, dan lihat sendiri kenapa sebuah masalah didahulukan.
        </p>
      </div>
      <BannerSimulasi />
    </div>
  );
}
