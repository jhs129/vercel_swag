import { NextRequest, NextResponse } from 'next/server';
import { Cart, CartItem, parseCartFromCookie } from '@/lib/cart';
import { products } from '@/lib/products';

const CART_COOKIE = 'vercel_swag_cart';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getCart(request: NextRequest): Cart {
  const cookie = request.cookies.get(CART_COOKIE)?.value;
  return parseCartFromCookie(cookie);
}

function setCartCookie(response: NextResponse, cart: Cart): NextResponse {
  response.cookies.set(CART_COOKIE, encodeURIComponent(JSON.stringify(cart)), {
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
  });
  return response;
}

export async function GET(request: NextRequest) {
  const cart = getCart(request);
  return NextResponse.json(cart);
}

export async function POST(request: NextRequest) {
  const cart = getCart(request);
  const body = await request.json();
  const { productId, quantity = 1 } = body;

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  if (!product.inStock) {
    return NextResponse.json({ error: 'Product out of stock' }, { status: 400 });
  }

  const existingIndex = cart.items.findIndex((item) => item.productId === productId);
  if (existingIndex >= 0) {
    cart.items[existingIndex].quantity += quantity;
  } else {
    const newItem: CartItem = {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    };
    cart.items.push(newItem);
  }

  const response = NextResponse.json(cart);
  return setCartCookie(response, cart);
}

export async function PATCH(request: NextRequest) {
  const cart = getCart(request);
  const body = await request.json();
  const { productId, quantity } = body;

  const itemIndex = cart.items.findIndex((item) => item.productId === productId);
  if (itemIndex < 0) {
    return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
  }

  if (quantity <= 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  const response = NextResponse.json(cart);
  return setCartCookie(response, cart);
}

export async function DELETE(request: NextRequest) {
  const cart = getCart(request);
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    // Clear entire cart
    const emptyCart: Cart = { items: [] };
    const response = NextResponse.json(emptyCart);
    return setCartCookie(response, emptyCart);
  }

  cart.items = cart.items.filter((item) => item.productId !== productId);
  const response = NextResponse.json(cart);
  return setCartCookie(response, cart);
}
