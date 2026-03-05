'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Cart } from '@/lib/cart';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

const FREE_SHIPPING_THRESHOLD = 50;
const STANDARD_SHIPPING_COST = 9.99;

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch('/api/cart');
      if (res.ok) setCart(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateQuantity = async (productId: string, quantity: number) => {
    const res = await fetch('/api/cart', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    });
    if (res.ok) {
      const updated = await res.json();
      setCart(updated);
      window.dispatchEvent(new Event('cart-updated'));
    }
  };

  const removeItem = async (productId: string) => {
    const res = await fetch(`/api/cart?productId=${productId}`, { method: 'DELETE' });
    if (res.ok) {
      const updated = await res.json();
      setCart(updated);
      window.dispatchEvent(new Event('cart-updated'));
    }
  };

  const clearCart = async () => {
    const res = await fetch('/api/cart', { method: 'DELETE' });
    if (res.ok) {
      setCart({ items: [] });
      window.dispatchEvent(new Event('cart-updated'));
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">
        Loading cart...
      </div>
    );
  }

  const items = cart?.items ?? [];
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Link
            href="/search"
            className="bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors inline-block"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">
          Shopping Cart <span className="text-gray-500 text-xl">({count} items)</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-red-400 transition-colors"
        >
          Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex gap-4"
            >
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.slug}`}
                  className="text-white font-semibold hover:text-gray-300 transition-colors block truncate"
                >
                  {item.name}
                </Link>
                <p className="text-gray-400 text-sm mt-1">${item.price.toFixed(2)} each</p>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="w-7 h-7 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center justify-center transition-colors"
                  >
                    <MinusIcon className="w-3 h-3" />
                  </button>
                  <span className="text-white font-medium w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-7 h-7 bg-gray-800 hover:bg-gray-700 rounded-md flex items-center justify-center transition-colors"
                  >
                    <PlusIcon className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="ml-auto text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal ({count} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>{total >= FREE_SHIPPING_THRESHOLD ? 'Free' : `$${STANDARD_SHIPPING_COST.toFixed(2)}`}</span>
              </div>
              {total < FREE_SHIPPING_THRESHOLD && (
                <p className="text-xs text-yellow-500">
                  Add ${(FREE_SHIPPING_THRESHOLD - total).toFixed(2)} more for free shipping
                </p>
              )}
            </div>
            <div className="border-t border-gray-700 pt-4 mb-6">
              <div className="flex justify-between text-white font-bold text-lg">
                <span>Total</span>
                <span>${(total + (total >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST)).toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors">
              Checkout
            </button>
            <Link
              href="/search"
              className="block text-center text-gray-500 hover:text-white text-sm mt-4 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
