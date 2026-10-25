// app/prioritas/page.tsx — Dashboard Prioritas (SDD 9), pemilik: A
// TODO(A): PetaChoropleth (5 kelas tetap), DaftarPeringkat, BarKontribusi, PanelSimulator, RiwayatBobot,
// FormSimpanBobot (khusus Perencana). Tabel di bawah hanya bukti alur data.
// Operasi SDD 6: R9 priority_factors, Q5 priority_weights, Q6 v_riwayat_bobot, F1 /data/kecamatan.geojson,
// R10 save_weights, L1 lib/scoring. Sampai RPC siap, faktor mentah diambil dari lib/mocks/prioritas.json
// dan bobot dari BOBOT_AWAL. Saat PanelSimulator dibuat, pindahkan hitungSkor ke Client Component
// supaya skor dihitung ulang di browser setiap slider digeser (SDD 2.1 dan 8.3).

import type { Metadata } from 'next';
import BannerSimulasi from '@/components/BannerSimulasi';
import contoh from '@/lib/mocks/prioritas.json';
import { BOBOT_AWAL, FAKTOR, LABEL_FAKTOR, formatPoin, hitungSkor } from '@/lib/scoring';
import type { PriorityFactorsResponse } from '@/lib/types';

export const metadata: Metadata = { title: 'Prioritas' };

const data = contoh as PriorityFactorsResponse;

export default function PrioritasPage() {
  const hasil = hitungSkor(data.isu, BOBOT_AWAL);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard Prioritas</h1>
        <p className="mt-2 text-neutral-600">
          Urutan isu wilayah yang didahulukan, alasan di balik setiap skor, dan simulator untuk menguji bobot
          lain.
        </p>
      </div>
      <BannerSimulasi />

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full border border-dashed border-neutral-400 px-2.5 py-0.5 text-xs font-medium text-neutral-700">
            Data contoh
          </span>
          <span className="text-neutral-600">Dihitung dengan lib/scoring memakai bobot awal.</span>
        </div>
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr>
                <th scope="col" className="px-3 py-2 text-right font-medium">#</th>
                <th scope="col" className="px-3 py-2 font-medium">Isu wilayah</th>
                <th scope="col" className="px-3 py-2 font-medium">Kategori</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Laporan aktif</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Skor</th>
                <th scope="col" className="px-3 py-2 font-medium">Penjelasan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {hasil.map((s) => (
                <tr key={s.id}>
                  <td className="px-3 py-2 text-right tabular-nums">{s.peringkat}</td>
                  <th scope="row" className="px-3 py-2 font-medium whitespace-nowrap">
                    {s.kecamatan}
                    <span className="block text-xs font-normal text-neutral-500">{s.kota}</span>
                  </th>
                  <td className="px-3 py-2 whitespace-nowrap">{s.kategori}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{s.laporan_aktif}</td>
                  <td className="px-3 py-2 text-right font-medium tabular-nums">{formatPoin(s.skor)}</td>
                  <td className="min-w-72 px-3 py-2 text-neutral-600">{s.penjelasan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-neutral-500">
          Bobot awal:{' '}
          {FAKTOR.map((f) => `${LABEL_FAKTOR[f]} ${Math.round(BOBOT_AWAL[f] * 100)}%`).join(', ')}.
        </p>
      </section>
    </div>
  );
}
