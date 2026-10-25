// components/Footer.tsx — atribusi peta dan keterangan data (pemilik: A)
// Atribusi "© OpenStreetMap contributors" wajib tampil (SDD bagian 2, lisensi ODbL).

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-5xl space-y-1 px-4 py-6 text-sm text-neutral-600">
        <p>
          Peta dasar ©{' '}
          <a
            href="https://www.openstreetmap.org/copyright"
            className="underline underline-offset-2 hover:text-neutral-900"
            target="_blank"
            rel="noreferrer"
          >
            OpenStreetMap contributors
          </a>
          .
        </p>
        <p>
          Sebagian data di aplikasi ini adalah data simulasi dan diberi label di setiap halaman.{' '}
          <Link href="/sumber-data" className="underline underline-offset-2 hover:text-neutral-900">
            Sumber data dan lisensi
          </Link>
          .
        </p>
        <p>suaRAkyat · Web in Action (WIA) MIA 2026</p>
      </div>
    </footer>
  );
}
