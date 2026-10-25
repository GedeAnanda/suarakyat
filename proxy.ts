// proxy.ts — pengganti middleware.ts sejak Next.js 16 (pemilik: B)
// SDD 9.1: proteksi rute ini hanya kenyamanan; keamanan sebenarnya tetap di RLS dan RPC.

import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';

const RUTE_PERLU_LOGIN = ['/lapor', '/admin'];

/** Dicocokkan per segmen supaya /laporan/[kode] (publik) tidak ikut terkunci oleh /lapor. */
function perluLogin(pathname: string): boolean {
  return RUTE_PERLU_LOGIN.some((rute) => pathname === rute || pathname.startsWith(`${rute}/`));
}

export async function proxy(request: NextRequest) {
  const { response, claims } = await updateSession(request);
  const { pathname } = request.nextUrl;

  if (!claims && perluLogin(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/masuk';
    url.search = '';
    url.searchParams.set('lanjut', pathname);
    const redirect = NextResponse.redirect(url);
    // Bawa cookie sesi yang baru diperbarui (atau dihapus) ke respons redirect.
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  }

  // TODO(B): arahkan non-admin yang membuka /admin/* ke Beranda (SDD 9.1).
  // Butuh profiles.role milik auth.uid(), jadi tunggu fungsi is_admin() dan RLS di 0002_views_rls.sql.
  return response;
}

export const config = {
  // Lewati aset statis dan file data (misalnya /data/kecamatan.geojson).
  matcher: ['/((?!_next/static|_next/image|favicon.ico|data/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|geojson)$).*)'],
};
