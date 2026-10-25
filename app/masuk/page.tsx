// app/masuk/page.tsx — Masuk / Daftar (SDD 9), pemilik: A
// TODO(A): FormMasuk, FormDaftar, InfoVerifikasiEmail.
// Operasi: Supabase Auth langsung (signInWithPassword, signUp; tidak bernomor di SDD 6), FR A1.
// proxy.ts mengirim tamu ke sini dengan ?lanjut=<rute asal>; arahkan kembali ke sana setelah login berhasil.

import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Masuk' };

export default function MasukPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Masuk atau Daftar</h1>
      <p className="mt-2 text-neutral-600">
        Masuk dengan email terverifikasi untuk melapor, mendukung laporan warga lain, dan memberi rating.
      </p>
    </div>
  );
}
