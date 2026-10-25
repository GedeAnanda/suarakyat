// components/BadgeStatus.tsx — status laporan sebagai teks + ikon (SDD 9.1), pemilik: A
// Warna hanya pelengkap; status selalu terbaca dari teks dan bentuk ikonnya.

import type { ReactNode } from 'react';
import type { StatusLaporan } from '@/lib/types';

export const LABEL_STATUS: Record<StatusLaporan, string> = {
  menunggu: 'Menunggu',
  diverifikasi: 'Diverifikasi',
  diproses: 'Diproses',
  selesai: 'Selesai',
  ditolak: 'Ditolak',
  dibatalkan: 'Dibatalkan',
};

const GAYA_STATUS: Record<StatusLaporan, string> = {
  menunggu: 'border-amber-300 bg-amber-50 text-amber-900',
  diverifikasi: 'border-sky-300 bg-sky-50 text-sky-900',
  diproses: 'border-indigo-300 bg-indigo-50 text-indigo-900',
  selesai: 'border-emerald-300 bg-emerald-50 text-emerald-900',
  ditolak: 'border-rose-300 bg-rose-50 text-rose-900',
  dibatalkan: 'border-neutral-300 bg-neutral-100 text-neutral-700',
};

const IKON_STATUS: Record<StatusLaporan, ReactNode> = {
  // jam
  menunggu: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  // lingkaran centang
  diverifikasi: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  // panah berputar
  diproses: (
    <>
      <path d="M20 11a8 8 0 0 0-14.9-3M4 4v4h4" />
      <path d="M4 13a8 8 0 0 0 14.9 3M20 20v-4h-4" />
    </>
  ),
  // centang ganda
  selesai: (
    <>
      <path d="m2 13 4 4L16 7" />
      <path d="m10 15 2 2 10-10" />
    </>
  ),
  // lingkaran silang
  ditolak: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6m0-6-6 6" />
    </>
  ),
  // tanda larangan
  dibatalkan: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m5.6 5.6 12.8 12.8" />
    </>
  ),
};

export default function BadgeStatus({ status, className = '' }: { status: StatusLaporan; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${GAYA_STATUS[status]} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-3.5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {IKON_STATUS[status]}
      </svg>
      {LABEL_STATUS[status]}
    </span>
  );
}
