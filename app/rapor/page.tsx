// app/rapor/page.tsx — Rapor Instansi (SDD 9), pemilik: A
// TODO(A): KartuRapor, BadgePeringatanPenolakan, TabelPerKategori. Tabel di bawah hanya bukti alur data.
// Operasi SDD 6: R8 agency_report_card. Sampai RPC siap, data diambil dari lib/mocks/rapor.json
// yang bentuknya sama dengan RaporResponse (lib/types.ts).

import type { Metadata } from 'next';
import Link from 'next/link';
import BannerSimulasi from '@/components/BannerSimulasi';
import contoh from '@/lib/mocks/rapor.json';
import { formatPoin } from '@/lib/scoring';
import type { RaporResponse } from '@/lib/types';

export const metadata: Metadata = { title: 'Rapor Instansi' };

const rapor = contoh as RaporResponse;

const desimal = (x: number) => x.toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const persen = (x: number) => `${Math.round(x * 100)}%`;
const tanggal = (iso: string) =>
  new Date(`${iso}T00:00:00+07:00`).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  });

export default function RaporPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Rapor Instansi</h1>
        <p className="mt-2 text-neutral-600">
          Nilai kinerja tiap instansi dalam merespons dan menyelesaikan laporan warga, dihitung dari data yang
          bisa diperiksa siapa saja.{' '}
          <Link href="/rapor/cara-menilai" className="underline underline-offset-2">
            Cara menilai
          </Link>
          .
        </p>
      </div>
      <BannerSimulasi />

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-full border border-dashed border-neutral-400 px-2.5 py-0.5 text-xs font-medium text-neutral-700">
            Data contoh
          </span>
          <span className="text-neutral-600">
            Periode {tanggal(rapor.periode.dari)} – {tanggal(rapor.periode.sampai)}
          </span>
        </div>
        <div className="overflow-x-auto rounded-lg border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium">Instansi</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Sampel</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">R</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">S</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">P</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">K</th>
                <th scope="col" className="px-3 py-2 text-right font-medium">Nilai</th>
                <th scope="col" className="px-3 py-2 font-medium">Huruf</th>
                <th scope="col" className="px-3 py-2 font-medium">Penolakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {rapor.instansi.map((i) => (
                <tr key={i.id}>
                  <th scope="row" className="px-3 py-2 font-medium whitespace-nowrap">{i.nama}</th>
                  <td className="px-3 py-2 text-right tabular-nums">{i.sampel}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{desimal(i.R)}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{desimal(i.S)}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{desimal(i.P)}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{desimal(i.K)}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{formatPoin(i.nilai)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {i.huruf === null
                      ? 'Data belum cukup'
                      : i.huruf === i.huruf_asli
                        ? i.huruf
                        : `${i.huruf} (angka setara ${i.huruf_asli})`}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {persen(i.tingkat_penolakan)}
                    {i.peringatan_penolakan && ' · Peringatan: huruf maksimal C'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-neutral-500">
          R = respons tepat waktu, S = selesai tepat waktu, P = porsi laporan selesai, K = kepuasan warga (skala 0–1).
        </p>
      </section>
    </div>
  );
}
