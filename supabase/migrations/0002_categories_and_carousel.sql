-- Adds categories to the database (previously code-only) and allows a new
-- "carousel" banner position for the homepage hero carousel.
--
-- Run this in the Supabase SQL Editor after 0001_init.sql.

-- ---------------------------------------------------------------------------
-- categories
-- ---------------------------------------------------------------------------
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  image text,
  icon text not null default 'LayoutGrid',
  sort_order integer not null default 1,
  is_active boolean not null default true,
  filters jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists categories_slug_idx on categories(slug);
create index if not exists categories_is_active_idx on categories(is_active);

alter table categories enable row level security;

create policy "Public can read active categories" on categories
  for select using (is_active = true);

-- No insert/update/delete policy for anon/authenticated — all writes go
-- through /api/admin/categories/* using the service role key.

-- Seed the categories already live on the storefront so the admin list
-- isn't empty after this migration. Filters (brand/price/etc. sidebars)
-- stay code-driven in lib/data/categories.ts, matched by slug — the
-- `filters` column here is left at its default and currently unused.
insert into categories (slug, name, description, icon, sort_order, is_active) values
  ('mobile', 'Mobile', 'Smartphones from the latest flagships to reliable everyday phones.', 'Smartphone', 1, true),
  ('mobile-accessories', 'Mobile Accessories', 'Chargers, cables, cases and everything to complete your phone setup.', 'Headphones', 2, true),
  ('laptop', 'Laptop', 'Laptops built for work, study, gaming and everyday computing.', 'Laptop', 3, true),
  ('gadgets', 'Gadgets', 'Smartwatches, earbuds, speakers and other everyday tech.', 'Watch', 4, true),
  ('computer', 'Computer', 'Keyboards, mice, monitors and computer accessories.', 'Monitor', 5, true),
  ('headphones-earbuds', 'Headphones & Earbuds', 'Wired and wireless headphones and earbuds for every budget.', 'Headphones', 6, true),
  ('smartwatches', 'Smartwatches', 'Fitness trackers and smartwatches to stay connected on the go.', 'Watch', 7, true),
  ('tablets', 'Tablets', 'Tablets for work, study and entertainment.', 'Tablet', 8, true),
  ('cameras', 'Cameras', 'DSLRs, mirrorless and point-and-shoot cameras.', 'Camera', 9, true),
  ('gaming', 'Gaming', 'Consoles, controllers and gaming accessories.', 'Gamepad2', 10, true),
  ('speakers', 'Speakers', 'Portable and home speakers for every occasion.', 'Speaker', 11, true)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- banners: allow the new "carousel" position used by the homepage
-- (must happen before the insert below, which uses position = 'carousel')
-- ---------------------------------------------------------------------------
alter table banners drop constraint if exists banners_position_check;
alter table banners add constraint banners_position_check
  check (position in ('hero', 'promo', 'category', 'carousel'));

-- Seed 6 empty homepage carousel slots (admin fills in real images later).
insert into banners (title, desktop_image, button_url, position, sort_order, is_active) values
  ('Latest Technology, Better Prices', '', '/mobile', 'carousel', 1, false),
  ('New Mobile Launches', '', '/mobile', 'carousel', 2, false),
  ('Laptops for Work & Play', '', '/laptop', 'carousel', 3, false),
  ('Gadgets & Wearables', '', '/gadgets', 'carousel', 4, false),
  ('Computer Accessories', '', '/computer', 'carousel', 5, false),
  ('Audio & Sound', '', '/headphones-earbuds', 'carousel', 6, false);
