// tests/scoring.test.ts — tes rumus (pemilik: C). Jalankan: npm test
// Kasus diambil dari SDD v1.0 bagian 13.1.

import { describe, expect, it } from 'vitest';
import {
  BOBOT_AWAL,
  FAKTOR,
  PRESET,
  hitungSkor,
  kalimatKonsekuensi,
  kenapaBelum,
  normalisasiBobot,
  selisihPeringkat,
} from '../lib/scoring';
import { hurufAkhir, hurufDari, kepuasan, nilaiRapor, peringatanPenolakan } from '../lib/scoring/rapor';
import type { FaktorIsu, PriorityFactorsResponse } from '../lib/types';
import contoh from '../lib/mocks/prioritas.json';

const isu = (contoh as PriorityFactorsResponse).isu;
const jumlah = (o: Record<string, number>) => Object.values(o).reduce((s, x) => s + x, 0);

describe('rapor', () => {
  it('contoh hitungan PRD menghasilkan 73,5 dan huruf B', () => {
    const nilai = nilaiRapor(0.84, 0.63, 0.72, 0.75);
    expect(nilai).toBe(73.5);
    expect(hurufDari(nilai)).toBe('B');
  });

  it('peringatan penolakan menahan huruf A menjadi C', () => {
    expect(hurufAkhir('A', true, 50)).toBe('C');
    expect(hurufAkhir('D', true, 50)).toBe('D');
  });

  it('dua dinas curang tetap kena peringatan karena batas tetap 25%', () => {
    expect(peringatanPenolakan(0.3, [0.05, 0.06, 0.3])).toBe(true);
  });

  it('peringatan relatif memakai median dinas lain', () => {
    expect(peringatanPenolakan(0.2, [0.05, 0.06, 0.08])).toBe(true);
    expect(peringatanPenolakan(0.1, [0.05, 0.06, 0.32])).toBe(false);
  });

  it('sampel kurang dari 10 tidak diberi huruf', () => {
    expect(hurufAkhir('B', false, 8)).toBeNull();
  });

  it('tanpa rating, K = 0,6', () => {
    expect(kepuasan(0, 0)).toBeCloseTo(0.6, 10);
  });
});

describe('skor prioritas', () => {
  it('normalisasi bobot selalu berjumlah 1', () => {
    for (const b of [BOBOT_AWAL, ...Object.values(PRESET)]) {
      expect(jumlah(normalisasiBobot(b))).toBeCloseTo(1, 10);
    }
  });

  it('semua bobot nol ditolak', () => {
    const nol = Object.fromEntries(FAKTOR.map((f) => [f, 0])) as typeof BOBOT_AWAL;
    expect(() => normalisasiBobot(nol)).toThrow('BOBOT_TIDAK_VALID');
  });

  it('jumlah kontribusi sama dengan skor', () => {
    for (const s of hitungSkor(isu, BOBOT_AWAL)) {
      expect(Math.abs(jumlah(s.kontribusi) - s.skor)).toBeLessThan(0.1);
    }
  });

  it('peringkat urut menurun dan dimulai dari 1', () => {
    const hasil = hitungSkor(isu, BOBOT_AWAL);
    expect(hasil[0].peringkat).toBe(1);
    for (let i = 1; i < hasil.length; i++) expect(hasil[i - 1].skor).toBeGreaterThanOrEqual(hasil[i].skor);
  });

  it('faktor yang sama di semua isu bernilai 0 dan dicatat', () => {
    const sama: FaktorIsu[] = isu.map((i) => ({ ...i, mentah: { ...i.mentah, kerentanan: 4 } }));
    const hasil = hitungSkor(sama, BOBOT_AWAL);
    expect(hasil[0].faktor_tidak_membedakan).toContain('kerentanan');
    for (const s of hasil) expect(s.kontribusi.kerentanan).toBe(0);
  });

  it('mode crm: umur null membuat bobot umur 0', () => {
    const crm: FaktorIsu[] = isu.map((i) => ({ ...i, mentah: { ...i.mentah, umur: null } }));
    for (const s of hitungSkor(crm, BOBOT_AWAL)) expect(s.kontribusi.umur).toBe(0);
  });

  it('preset mengubah peringkat dan selisih dihitung', () => {
    const resmi = hitungSkor(isu, BOBOT_AWAL);
    const sim = hitungSkor(isu, PRESET.kerentanan);
    const selisih = selisihPeringkat(resmi, sim);
    expect(Object.keys(selisih)).toHaveLength(isu.length);
    expect(typeof kalimatKonsekuensi(resmi, sim, 3)).toBe('string');
  });

  it('"Kenapa belum?" memberi pendorong, penahan, dan peringkat tiap preset', () => {
    const k = kenapaBelum(isu[4].id, isu, BOBOT_AWAL, 'menunggu');
    expect(k.total).toBe(isu.length);
    expect(k.per_preset).toHaveLength(3);
    expect(k.penahan.maksimal).toBeGreaterThanOrEqual(k.penahan.poin);
    expect(k.catatan).not.toBeNull();
  });
});
