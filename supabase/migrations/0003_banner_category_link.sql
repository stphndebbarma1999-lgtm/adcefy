-- Lets a banner be linked to a category so clicking it opens that
-- category page. Nullable + on delete set null: a banner with no link
-- (or whose linked category was deleted) simply becomes non-clickable
-- rather than erroring.

alter table banners add column if not exists category_id uuid references categories(id) on delete set null;
create index if not exists banners_category_id_idx on banners(category_id);
