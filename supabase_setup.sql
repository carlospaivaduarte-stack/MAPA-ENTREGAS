-- MEU MAPA V7 - SUPABASE SETUP
-- Execute no SQL Editor do Supabase.

create extension if not exists pgcrypto;

create table if not exists public.drivers (
  id uuid primary key,
  name text not null default 'Motoboy',
  phone text,
  lat double precision,
  lng double precision,
  accuracy double precision,
  is_online boolean not null default false,
  last_seen timestamptz not null default now()
);

create table if not exists public.deliveries (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid references public.drivers(id) on delete set null,
  client_name text not null default 'Cliente',
  client_phone text,
  lat double precision not null,
  lng double precision not null,
  status text not null default 'pending' check (status in ('pending','done','failed')),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.drivers enable row level security;
alter table public.deliveries enable row level security;

-- PROTÓTIPO:
-- Estas políticas deixam o acesso aberto via anon key.
-- Para produção, substitua por autenticação e políticas restritas.
drop policy if exists "prototype drivers all" on public.drivers;
create policy "prototype drivers all" on public.drivers for all to anon using (true) with check (true);

drop policy if exists "prototype deliveries all" on public.deliveries;
create policy "prototype deliveries all" on public.deliveries for all to anon using (true) with check (true);

-- Ativa Realtime para as tabelas.
alter publication supabase_realtime add table public.drivers;
alter publication supabase_realtime add table public.deliveries;
