// lib/supabase/server.ts — client Supabase untuk Server Component, Server Action, dan Route Handler (pemilik: B)
// Buat client baru di setiap request; jangan simpan di variabel global.

import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { wajibEnvSupabase } from './env';

export async function createClient() {
  const { url, anonKey } = wajibEnvSupabase();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Dipanggil dari Server Component (cookie tidak bisa ditulis di sana).
          // Aman diabaikan karena proxy.ts sudah memperbarui sesi di setiap request.
        }
      },
    },
  });
}
