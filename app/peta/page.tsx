// app/peta/page.tsx — Peta Laporan (SDD 9), pemilik: A
// TODO(A): PetaLaporan (cluster dengan leaflet.markercluster), FilterKategoriStatus, KartuLaporan.
// Operasi SDD 6: Q1 v_laporan_publik (titik laporan), Q4 categories + agencies (filter),
// F1 /data/kecamatan.geojson (batas kecamatan).

import type { Metadata } from 'next';
import BadgeStatus from '@/components/BadgeStatus';
import BannerSimulasi from '@/components/BannerSimulasi';
import PetaDasar from '@/components/PetaDasar';
import type { StatusLaporan } from '@/lib/types';

export const metadata: Metadata = { title: 'Peta Laporan' };

// Status yang tampil di peta publik (dibatalkan tidak muncul di v_laporan_publik).
const STATUS_PUBLIK: StatusLaporan[] = ['menunggu', 'diverifikasi', 'diproses', 'selesai', 'ditolak'];

export default function PetaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Peta Laporan</h1>
        <p className="mt-2 text-neutral-600">
          Lihat semua laporan warga di DKI Jakarta beserta statusnya, lalu saring menurut kategori dan status.
        </p>
      </div>
      <BannerSimulasi />
      <PetaDasar />
      <section aria-labelledby="keterangan-status">
        <h2 id="keterangan-status" className="text-sm font-medium text-neutral-700">
          Keterangan status
        </h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {STATUS_PUBLIK.map((status) => (
            <li key={status}>
              <BadgeStatus status={status} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
