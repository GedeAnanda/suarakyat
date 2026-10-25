// app/api/demo-login/route.ts — A1 · POST /api/demo-login (SDD 6.6, pemilik: B)
// Kredensial akun demo hanya dibaca di server; browser cukup mengirim { peran }.

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const BodyDemoLogin = z.object({ peran: z.enum(['warga', 'admin']) });
type PeranDemo = z.infer<typeof BodyDemoLogin>['peran'];

/** Dibaca per request (bukan saat modul dimuat) supaya selalu memakai env runtime. */
function akunDemo(peran: PeranDemo): { email?: string; password?: string; redirect: string } {
  return peran === 'warga'
    ? { email: process.env.DEMO_WARGA_EMAIL, password: process.env.DEMO_WARGA_PASSWORD, redirect: '/lapor' }
    : { email: process.env.DEMO_ADMIN_EMAIL, password: process.env.DEMO_ADMIN_PASSWORD, redirect: '/admin/laporan' };
}

export async function POST(request: Request) {
  const body = BodyDemoLogin.safeParse(await request.json().catch(() => null));
  if (!body.success) {
    return NextResponse.json({ error: 'PERAN_TIDAK_VALID' }, { status: 400 });
  }

  const akun = akunDemo(body.data.peran);
  if (!akun.email || !akun.password) {
    console.error(`[demo-login] Kredensial demo untuk peran "${body.data.peran}" belum diisi di env.`);
    return NextResponse.json({ error: 'DEMO_BELUM_DIATUR' }, { status: 500 });
  }

  try {
    // Cookie sesi Supabase ditulis lewat cookies() di lib/supabase/server.ts.
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email: akun.email, password: akun.password });
    if (error) {
      console.error(`[demo-login] Login demo gagal: ${error.code ?? error.message}`);
      return NextResponse.json({ error: 'LOGIN_DEMO_GAGAL' }, { status: 500 });
    }
  } catch (err) {
    console.error('[demo-login]', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'LOGIN_DEMO_GAGAL' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, redirect: akun.redirect });
}
