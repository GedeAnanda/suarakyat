// components/PetaDasarLeaflet.tsx — isi peta Leaflet (pemilik: A)
// Jangan impor file ini langsung dari halaman: Leaflet butuh `window`. Pakai <PetaDasar />.

'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useState, type ReactNode } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const PUSAT_JAKARTA: [number, number] = [-6.2, 106.85];
const ZOOM_AWAL = 11;

export interface PetaDasarProps {
  /** Atur tinggi lewat kelas Tailwind, misalnya "h-96". */
  className?: string;
  /** Lapisan tambahan: marker, cluster, GeoJSON kecamatan, dan sebagainya. */
  children?: ReactNode;
}

export default function PetaDasarLeaflet({ className = 'h-80 sm:h-112', children }: PetaDasarProps) {
  // MapContainer (react-leaflet 5) menghapus peta saat effect-nya di-cleanup, tapi tidak membuatnya lagi.
  // Dengan cacheComponents, Next.js menyembunyikan halaman lama lewat <Activity> (effect di-cleanup) dan
  // menampilkannya lagi saat pengguna kembali, sehingga peta crash. Mengganti key saat cleanup membuat
  // MapContainer dipasang ulang dengan peta baru.
  const [kunciPeta, setKunciPeta] = useState(0);
  useEffect(() => () => setKunciPeta((k) => k + 1), []);

  return (
    <MapContainer
      key={kunciPeta}
      center={PUSAT_JAKARTA}
      zoom={ZOOM_AWAL}
      scrollWheelZoom={false}
      className={`w-full ${className}`}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
      />
      {children}
    </MapContainer>
  );
}
