# ADCEFY

Electronics ecommerce storefront and admin panel for **ADCEFY** (adcefy.com), built with Next.js (App Router), TypeScript, Tailwind CSS and a Supabase-ready data layer.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the storefront and [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

## Project Structure

- `app/` — routes (storefront + `/admin`), using Server Components by default
- `components/` — `layout/`, `home/`, `product/`, `filters/`, `cart/`, `search/`, `admin/`, `ui/`
- `lib/data/` — demo/seed data + read functions (products, categories, orders, coupons, banners, settings)
- `lib/context/` — client state: cart, wishlist, and the admin working data store
- `lib/supabase/` — browser + server Supabase clients (inactive until env vars are set)
- `config/site.ts` — central store configuration (name, domain, currency, contact, shipping, payments)
- `supabase/migrations/` — prepared Postgres schema with RLS policies

## Current data mode

Without Supabase credentials, the storefront renders from the static seed data in `lib/data/`, and the admin panel (`/admin`) operates against a separate, browser-persisted (`localStorage`) demo data layer so every CRUD flow (products, categories, orders, coupons, banners, inventory, settings) works end-to-end for evaluation. **The two are not yet connected** — admin edits do not appear on the live storefront until Supabase is wired in.

To connect a real backend:

1. Create a Supabase project and run `supabase/migrations/0001_init.sql`.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`).
3. Replace the reads in `lib/data/*` and the mutations in `lib/context/AdminDataContext.tsx` with Supabase queries / Server Actions.
4. Add real authentication + role checks before trusting any admin write server-side (a hidden `/admin` URL is not access control).

## Product Images

Image fields store public URLs (e.g. from [Sirv](https://my.sirv.com/)) — never binary data. `next.config.ts` allows `*.sirv.com`; add further `remotePatterns` there for other hosts.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint
