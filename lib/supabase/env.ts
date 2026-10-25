// lib/supabase/env.ts — baca variabel lingkungan Supabase (pemilik: B)
// Dicek saat runtime, bukan saat build, supaya `npm run build` tetap lulus tanpa .env.local.
// Nama variabel ditulis lengkap (bukan process.env[nama]) agar Next.js bisa menyisipkannya ke bundel browser.

export function envSupabase(): { url: string; anonKey: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && anonKey ? { url, anonKey } : null;
}

export function wajibEnvSupabase(): { url: string; anonKey: string } {
  const env = envSupabase();
  if (!env) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY belum diisi. Salin .env.example menjadi .env.local lalu isi nilainya.',
    );
  }
  return env;
}
