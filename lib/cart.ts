export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

export function getCartTotal(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartCount(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.quantity, 0);
}

export function parseCartFromCookie(cookieValue: string | undefined): Cart {
  if (!cookieValue) return { items: [] };
  try {
    const parsed = JSON.parse(decodeURIComponent(cookieValue));
    if (parsed && Array.isArray(parsed.items)) {
      return parsed as Cart;
    }
    return { items: [] };
  } catch {
    return { items: [] };
  }
}
