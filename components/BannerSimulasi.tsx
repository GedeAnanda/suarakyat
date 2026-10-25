// components/BannerSimulasi.tsx — pemberitahuan data simulasi (SDD 9, 9.1), pemilik: A

import Link from 'next/link';

export default function BannerSimulasi() {
  return (
    <aside role="note" className="flex gap-3 rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
      <svg
        viewBox="0 0 24 24"
        className="mt-0.5 size-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </svg>
      <p>
        <strong className="font-semibold text-neutral-900">Data simulasi.</strong> Sebagian laporan, instansi, dan angka
        di aplikasi ini dibuat untuk keperluan lomba dan bukan data resmi pemerintah.{' '}
        <Link href="/sumber-data" className="underline underline-offset-2 hover:text-neutral-900">
          Lihat sumber data
        </Link>
        .
      </p>
    </aside>
  );
}
