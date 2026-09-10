-- ADCEFY database schema.
--
-- This is prepared architecture for when Supabase credentials are connected
-- (see lib/supabase/client.ts and lib/supabase/server.ts). It has not been
-- run against a live project. Review and apply with the Supabase CLI:
--   supabase db push
--
-- Row Level Security (RLS) is enabled on every table. Public read policies
-- are provided for storefront browsing; all writes are expected to go
-- through server-side code (Server Actions / Route Handlers) using the
-- authenticated admin role — never the anon key for mutations.

create extension if not exists "pgcrypto";

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
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists category_filters (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete cascade,
  filter_id text not null,
  label text not null,
  type text not null check (type in ('checkbox', 'range', 'toggle')),
  options jsonb,
  min_value numeric,
  max_value numeric
);

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand text not null,
  category_id uuid not null references categories(id),
  subcategory text,
  short_description text,
  description text,
  price numeric(12, 2) not null check (price >= 0),
  original_price numeric(12, 2),
  stock integer not null default 0 check (stock >= 0),
  sku text unique not null,
  rating numeric(2, 1) not null default 0,
  review_count integer not null default 0,
  tags text[] not null default '{}',
  is_featured boolean not null default false,
  is_new boolean not null default false,
  is_best_seller boolean not null default false,
  status text not null default 'active' check (status in ('draft', 'active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on products(category_id);
create index if not exists products_status_idx on products(status);
create index if not exists products_slug_idx on products(slug);

-- Public image URLs only (e.g. Sirv) — never binary image data.
create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  sort_order integer not null default 1
);

create index if not exists product_images_product_id_idx on product_images(product_id);

create table if not exists product_specifications (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  label text not null,
  value text not null,
  sort_order integer not null default 1
);

create index if not exists product_specifications_product_id_idx on product_specifications(product_id);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  name text not null,
  sort_order integer not null default 1
);

create table if not exists product_variant_options (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid not null references product_variants(id) on delete cascade,
  name text not null,
  price_adjustment numeric(12, 2) default 0,
  stock integer,
  sku text,
  sort_order integer not null default 1
);

create index if not exists product_variant_options_variant_id_idx on product_variant_options(variant_id);

-- ---------------------------------------------------------------------------
-- customers & addresses
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
-- orders
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
-- coupons
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
-- banners
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
-- store_settings (single row)
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
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table categories enable row level security;
alter table category_filters enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_specifications enable row level security;
alter table product_variants enable row level security;
alter table product_variant_options enable row level security;
alter table customers enable row level security;
alter table addresses enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table coupons enable row level security;
alter table banners enable row level security;
alter table store_settings enable row level security;

-- Public (anon) read access for storefront browsing.
create policy "Public can read active categories" on categories for select using (is_active = true);
create policy "Public can read category filters" on category_filters for select using (true);
create policy "Public can read active products" on products for select using (status = 'active');
create policy "Public can read product images" on product_images for select using (true);
create policy "Public can read product specifications" on product_specifications for select using (true);
create policy "Public can read product variants" on product_variants for select using (true);
create policy "Public can read product variant options" on product_variant_options for select using (true);
create policy "Public can read active banners" on banners for select using (is_active = true);
create policy "Public can read store settings" on store_settings for select using (true);

-- Customers/addresses/orders: only the owning authenticated user may read their own rows.
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

-- No public policies are defined for INSERT/UPDATE/DELETE on any table, and
-- none for coupons (validated server-side). All writes — including every
-- admin CRUD action in components/admin — must go through server-side code
-- running with an authenticated staff/admin role, never the browser anon key.
