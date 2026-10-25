// lib/supabase/admin.ts — client Supabase dengan service role (pemilik: B)
// RAHASIA: melewati RLS. Hanya untuk API route di server (misalnya /api/cron/reset-demo).
// `import 'server-only'` membuat build gagal jika file ini terimpor dari komponen browser.

import 'server-only';
import { createClient } from '@supabase/supabase-js';

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY belum diisi di lingkungan server.');
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
