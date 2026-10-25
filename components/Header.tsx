// components/Header.tsx — navigasi utama (pemilik: A)
// TODO(A): kolom cari kode laporan di header (FR C2, operasi Q2).

import Link from 'next/link';

const NAVIGASI = [
  { href: '/', label: 'Beranda' },
  { href: '/peta', label: 'Peta' },
  { href: '/rapor', label: 'Rapor Instansi' },
  { href: '/rapor/cara-menilai', label: 'Cara Menilai' },
  { href: '/prioritas', label: 'Prioritas' },
  { href: '/sumber-data', label: 'Sumber Data' },
];

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight text-neutral-900">
          suaRAkyat
        </Link>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Link href="/masuk" className="rounded-md px-3 py-1.5 text-neutral-700 hover:bg-neutral-100">
            Masuk
          </Link>
          <Link href="/lapor" className="rounded-md bg-neutral-900 px-3 py-1.5 text-white hover:bg-neutral-700">
            Lapor
          </Link>
        </div>
      </div>
      <nav aria-label="Navigasi utama" className="mx-auto max-w-5xl overflow-x-auto px-4">
        <ul className="flex gap-1 pb-2 text-sm whitespace-nowrap">
          {NAVIGASI.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-3 py-1.5 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
