-- 0001_schema.sql  (pemilik: B)
-- Sumber: SDD v1.0 bagian 4.1. Jangan edit file ini setelah diterapkan;
-- perubahan berikutnya selalu di file migrasi baru.

create extension if not exists postgis;
create schema if not exists seed;

create type peran           as enum ('warga','admin');
create type tingkat_urgensi as enum ('tinggi','sedang','rendah');
create type status_laporan  as enum ('menunggu','diverifikasi','diproses','selesai','ditolak','dibatalkan');
create type alasan_tolak    as enum ('duplikat','tidak_valid','konten_melanggar');

-- Angka yang bisa disetel tanpa deploy
create table app_config (
  kunci text primary key,
  nilai jsonb not null
);

create table agencies (
  id smallint generated always as identity primary key,
  nama text not null unique,
  is_simulated boolean not null default true
);

create table categories (
  id smallint generated always as identity primary key,
  nama text not null unique,
  instansi_id smallint not null references agencies(id),
  urgensi tingkat_urgensi not null,
  sla_respons_jam int not null check (sla_respons_jam > 0),
  sla_selesai_jam int not null check (sla_selesai_jam > 0)
);

create table regions (
  id int generated always as identity primary key,
  kode_wilayah text not null unique,
  nama text not null,
  kota text not null,
  geom geometry(MultiPolygon, 4326) not null,
  penduduk int not null check (penduduk > 0),
  luas_km2 numeric(8,2) not null check (luas_km2 > 0),
  persen_miskin numeric(5,2) not null,
  sumber text not null
);
create index regions_geom_idx on regions using gist (geom);

-- 1:1 dengan auth.users, dibuat otomatis oleh trigger saat daftar
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nama text not null,
  role peran not null default 'warga',
  instansi_id smallint references agencies(id),
  kelola_prioritas boolean not null default false,
  is_demo boolean not null default false,
  check (role = 'admin' or (instansi_id is null and kelola_prioritas = false))
);

create table reports (
  id uuid primary key default gen_random_uuid(),
  kode text not null unique,                        -- 'SR-' + 6 karakter
  user_id uuid not null references profiles(id),
  category_id smallint not null references categories(id),
  region_id int not null references regions(id),
  deskripsi text not null check (char_length(deskripsi) between 20 and 500),
  foto text[] not null check (cardinality(foto) between 1 and 3),
  lokasi geography(Point, 4326) not null,
  status status_laporan not null default 'menunggu',
  perkiraan_selesai date,                           -- (sebaiknya ada)
  kategori_diubah boolean not null default false,   -- (sebaiknya ada)
  created_at timestamptz not null default now(),
  responded_at timestamptz,
  resolved_at timestamptz,
  is_simulated boolean not null default false
);
create index reports_lokasi_idx on reports using gist (lokasi);
create index reports_filter_idx on reports (status, category_id, region_id);

-- Sumber timeline; satu baris per perubahan status
create table report_updates (
  id bigint generated always as identity primary key,
  report_id uuid not null references reports(id) on delete cascade,
  admin_id uuid references profiles(id),            -- null = aksi pelapor
  status_baru status_laporan not null,
  alasan_tolak alasan_tolak,
  duplikat_dari uuid references reports(id),
  catatan text,
  bukti_url text,
  created_at timestamptz not null default now(),
  check (status_baru <> 'ditolak' or alasan_tolak is not null),
  check (alasan_tolak <> 'duplikat' or duplikat_dari is not null),
  check (alasan_tolak not in ('tidak_valid','konten_melanggar') or catatan is not null),
  check (status_baru <> 'selesai' or bukti_url is not null)
);
create index report_updates_report_idx on report_updates (report_id, created_at);

create table upvotes (
  report_id uuid references reports(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (report_id, user_id)
);

create table ratings (
  report_id uuid primary key references reports(id) on delete cascade,  -- satu rating per laporan
  user_id uuid not null references profiles(id),
  nilai smallint not null check (nilai between 1 and 5),
  komentar text check (char_length(komentar) <= 300),
  created_at timestamptz not null default now()
);

create table priority_weights (
  faktor text primary key
    check (faktor in ('urgensi','volume','dukungan','umur','kerentanan','kepadatan')),
  bobot numeric(4,3) not null check (bobot between 0 and 1),
  updated_by uuid references profiles(id),
  updated_at timestamptz not null default now()
);

-- Satu baris per penyimpanan, berisi snapshot semua bobot
create table weight_changes (
  id bigint generated always as identity primary key,
  bobot_lama jsonb not null,
  bobot_baru jsonb not null,
  alasan text not null check (char_length(alasan) >= 10),
  admin_id uuid not null references profiles(id),
  created_at timestamptz not null default now()
);

create table priority_overrides (                   -- (sebaiknya ada)
  id bigint generated always as identity primary key,
  region_id int not null references regions(id),
  category_id smallint not null references categories(id),
  admin_id uuid not null references profiles(id),
  arah text not null check (arah in ('atas','bawah')),
  alasan text not null,
  aktif boolean not null default true,
  created_at timestamptz not null default now()
);

create table keberatan (                            -- (sebaiknya ada)
  id bigint generated always as identity primary key,
  report_id uuid not null references reports(id),
  user_id uuid not null references profiles(id),
  jenis text not null check (jenis in ('banding','belum_beres')),
  alasan text not null,
  status text not null default 'menunggu' check (status in ('menunggu','diterima','ditolak')),
  diputuskan_oleh uuid references profiles(id),
  created_at timestamptz not null default now()
);

create table crm_agregat (                          -- hanya jika dataset CRM DKI layak
  region_id int references regions(id),
  category_id smallint references categories(id),
  bulan date,
  jumlah_laporan int not null,
  sumber text not null,
  primary key (region_id, category_id, bulan)
);

-- Profil otomatis untuk setiap akun baru (SDD 5.1)
create or replace function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, nama)
  values (new.id, coalesce(new.raw_user_meta_data->>'nama', split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Nilai awal konfigurasi (seed_anchor diisi oleh skrip seed)
insert into app_config (kunci, nilai) values
  ('radius_serupa_m',    '100'),
  ('batas_upvote',       '10'),
  ('ambang_tolak_tetap', '0.25'),
  ('ambang_tolak_min',   '0.10'),
  ('sampel_min_rapor',   '10');

insert into priority_weights (faktor, bobot) values
  ('urgensi',    0.30),
  ('volume',     0.20),
  ('dukungan',   0.05),
  ('umur',       0.20),
  ('kerentanan', 0.15),
  ('kepadatan',  0.10);
