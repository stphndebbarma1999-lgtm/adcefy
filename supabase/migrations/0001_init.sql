-- ADCEFY database schema.
--
-- Run this in the Supabase SQL Editor (or `supabase db push`) once per
-- project. Row Level Security is enabled on every table: the anon key can
-- only SELECT active/public rows; every write goes through server-side code
-- using the service role key (see lib/supabase/admin.ts), gated by the
-- ADMIN_PASSWORD session cookie (see middleware.ts) — never the anon key.
--
-- Categories, filters, coupons, banners and store settings are still
-- code-driven (lib/data/*) as of this migration — only `products` is wired
-- to this table so far. The other tables below are prepared for later
-- phases and safe to leave unused.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
-- Specifications, variants, images and tags are stored as JSON/array columns
-- rather than normalized child tables — this keeps admin writes a single
-- upsert instead of a multi-table transaction, which is the pragmatic choice
-- for a catalog of this size. category_id/category_slug reference the
-- static category list in lib/data/categories.ts (no FK — categories aren't
-- in the database yet).
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand text not null,
  category_id text not null,
  category_slug text not null,
  subcategory text,
  short_description text not null default '',
  description text not null default '',
  price numeric(12, 2) not null check (price >= 0),
  original_price numeric(12, 2),
  discount_percentage integer,
  images text[] not null default '{}',
  rating numeric(2, 1) not null default 0,
  review_count integer not null default 0,
  stock integer not null default 0 check (stock >= 0),
  sku text unique not null,
  specifications jsonb not null default '[]',
  variants jsonb not null default '[]',
  tags text[] not null default '{}',
  is_featured boolean not null default false,
  is_new boolean not null default false,
  is_best_seller boolean not null default false,
  status text not null default 'active' check (status in ('draft', 'active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_slug_idx on products(category_slug);
create index if not exists products_status_idx on products(status);
create index if not exists products_slug_idx on products(slug);

alter table products enable row level security;

create policy "Public can read active products" on products
  for select using (status = 'active');

-- No insert/update/delete policy for anon/authenticated — all writes go
-- through /api/admin/products/* using the service role key.

-- ---------------------------------------------------------------------------
-- customers & addresses (prepared for a later phase — not yet used by code)
-- ---------------------------------------------------------------------------
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text unique not null,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists addresses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  full_name text not null,
  phone text not null,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  is_default boolean not null default false
);

create index if not exists addresses_customer_id_idx on addresses(customer_id);

-- ---------------------------------------------------------------------------
-- orders (prepared for a later phase — not yet used by code)
-- ---------------------------------------------------------------------------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_id uuid references customers(id),
  customer_name text not null,
  email text not null,
  phone text not null,
  shipping_address jsonb not null,
  subtotal numeric(12, 2) not null,
  discount numeric(12, 2) not null default 0,
  shipping_fee numeric(12, 2) not null default 0,
  total numeric(12, 2) not null,
  coupon_code text,
  payment_method text not null check (payment_method in ('cod', 'upi', 'card', 'netbanking')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  status text not null default 'pending' check (
    status in ('pending', 'confirmed', 'packed', 'shipped', 'out-for-delivery', 'delivered', 'cancelled', 'returned')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_customer_id_idx on orders(customer_id);
create index if not exists orders_status_idx on orders(status);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id),
  name text not null,
  image text,
  sku text not null,
  variant_label text,
  quantity integer not null check (quantity > 0),
  price numeric(12, 2) not null
);

create index if not exists order_items_order_id_idx on order_items(order_id);

-- ---------------------------------------------------------------------------
-- coupons (prepared for a later phase — not yet used by code)
-- ---------------------------------------------------------------------------
create table if not exists coupons (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  discount_type text not null check (discount_type in ('percentage', 'fixed')),
  discount_value numeric(12, 2) not null,
  min_order_value numeric(12, 2),
  max_discount numeric(12, 2),
  start_date timestamptz not null,
  expiry_date timestamptz not null,
  usage_limit integer,
  used_count integer not null default 0,
  is_active boolean not null default true
);

-- ---------------------------------------------------------------------------
-- banners (prepared for a later phase — not yet used by code)
-- ---------------------------------------------------------------------------
create table if not exists banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  desktop_image text not null,
  mobile_image text,
  button_text text,
  button_url text,
  position text not null check (position in ('hero', 'promo', 'category')),
  sort_order integer not null default 1,
  is_active boolean not null default true
);

-- ---------------------------------------------------------------------------
-- store_settings (single row, prepared for a later phase — not yet used)
-- ---------------------------------------------------------------------------
create table if not exists store_settings (
  id integer primary key default 1 check (id = 1),
  store_name text not null default 'ADCEFY',
  logo_url text,
  favicon_url text,
  support_email text,
  support_phone text,
  address text,
  default_shipping_fee numeric(12, 2) not null default 99,
  free_shipping_threshold numeric(12, 2) not null default 999,
  cod_enabled boolean not null default true,
  upi_enabled boolean not null default true,
  cards_enabled boolean not null default true,
  net_banking_enabled boolean not null default true,
  instagram text,
  facebook text,
  youtube text
);

-- ---------------------------------------------------------------------------
-- Row Level Security for the not-yet-wired tables
-- ---------------------------------------------------------------------------
alter table customers enable row level security;
alter table addresses enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table coupons enable row level security;
alter table banners enable row level security;
alter table store_settings enable row level security;

create policy "Public can read active banners" on banners for select using (is_active = true);
create policy "Public can read store settings" on store_settings for select using (true);

create policy "Customers can read their own record" on customers for select using (auth.uid() = auth_user_id);
create policy "Customers can read their own addresses" on addresses for select using (
  exists (select 1 from customers c where c.id = addresses.customer_id and c.auth_user_id = auth.uid())
);
create policy "Customers can read their own orders" on orders for select using (
  exists (select 1 from customers c where c.id = orders.customer_id and c.auth_user_id = auth.uid())
);
create policy "Customers can read their own order items" on order_items for select using (
  exists (
    select 1 from orders o
    join customers c on c.id = o.customer_id
    where o.id = order_items.order_id and c.auth_user_id = auth.uid()
  )
);
