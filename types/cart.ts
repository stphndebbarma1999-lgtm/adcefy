export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  stock: number;
  selectedVariants: Record<string, string>;
  sku: string;
}

export interface WishlistItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  addedAt: string;
}
