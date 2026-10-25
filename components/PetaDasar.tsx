// components/PetaDasar.tsx — peta dasar Jakarta untuk semua halaman (SDD 9.1), pemilik: A
// Leaflet hanya jalan di browser, jadi dimuat dengan next/dynamic + ssr: false.

'use client';

import dynamic from 'next/dynamic';
import type { PetaDasarProps } from './PetaDasarLeaflet';

const PetaDasarLeaflet = dynamic(() => import('./PetaDasarLeaflet'), {
  ssr: false,
  loading: () => (
    <div className="flex h-80 w-full items-center justify-center bg-neutral-100 text-sm text-neutral-500 sm:h-112">
      Memuat peta…
    </div>
  ),
});

export default function PetaDasar(props: PetaDasarProps) {
  // `isolate` menjaga z-index panel Leaflet tetap di dalam kotak peta.
  return (
    <div className="isolate overflow-hidden rounded-lg border border-neutral-200">
      <PetaDasarLeaflet {...props} />
    </div>
  );
}
