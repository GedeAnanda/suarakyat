// lib/supabase/client.ts — client Supabase untuk Client Component (pemilik: B)
// Hanya memakai anon key; akses data tetap dibatasi RLS dan RPC (SDD bagian 5).

import { createBrowserClient } from '@supabase/ssr';
import { wajibEnvSupabase } from './env';

export function createClient() {
  const { url, anonKey } = wajibEnvSupabase();
  return createBrowserClient(url, anonKey);
}
