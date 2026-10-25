// lib/errors.ts — peta kode error RPC ke pesan untuk pengguna (SDD v1.0 bagian 6.2)

export const PESAN_ERROR: Record<string, string> = {
  TIDAK_LOGIN: 'Silakan masuk dulu.',
  INPUT_TIDAK_VALID: 'Periksa kembali isian Anda.',
  LAPORAN_TIDAK_ADA: 'Kode laporan tidak ditemukan.',
  LUAR_WILAYAH: 'Lokasi di luar wilayah layanan (DKI Jakarta daratan).',
  BUKAN_PEMILIK: 'Aksi ini hanya untuk pelapor laporan ini.',
  BUKAN_INSTANSI: 'Laporan ini bukan milik instansi Anda.',
  BUKAN_PERENCANA: 'Hanya Perencana yang bisa mengubah bobot.',
  TRANSISI_TIDAK_VALID: 'Perubahan status ini tidak diizinkan.',
  ALASAN_WAJIB: 'Pilih alasan dan isi catatan penolakan.',
  BUKTI_WAJIB: 'Lampirkan foto bukti penyelesaian.',
  DUPLIKAT_TIDAK_VALID:
    'Laporan rujukan harus berkategori sama, masih aktif, dan berjarak paling jauh 100 m.',
  LAPORAN_TIDAK_AKTIF: 'Laporan ini sudah tidak aktif.',
  UPVOTE_SENDIRI: 'Anda tidak bisa mendukung laporan sendiri.',
  BELUM_SELESAI: 'Rating hanya bisa diberikan setelah laporan selesai.',
  SUDAH_DIRATING: 'Laporan ini sudah diberi rating.',
  BOBOT_TIDAK_VALID: 'Bobot harus 0–1 dan tidak boleh semuanya nol.',
  ALASAN_TERLALU_PENDEK: 'Alasan minimal 10 karakter.',
  DEMO_TERBATAS: 'Akun demo hanya bisa mengubah laporan simulasi.',
};

const PESAN_UMUM = 'Terjadi kesalahan. Coba lagi sebentar lagi.';

/** Ubah error dari supabase-js (atau Error biasa) menjadi pesan yang ramah pengguna. */
export function pesanError(err: unknown): string {
  if (typeof err === 'object' && err !== null && 'message' in err) {
    const kode = String((err as { message: unknown }).message);
    return PESAN_ERROR[kode] ?? PESAN_UMUM;
  }
  return PESAN_UMUM;
}
