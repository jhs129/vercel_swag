'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Navigation() {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = useCallback(async () => {
    try {
      const res = await fetch('/api/cart');
      if (res.ok) {
        const cart = await res.json();
        const count = cart.items.reduce(
          (sum: number, item: { quantity: number }) => sum + item.quantity,
          0
        );
        setCartCount(count);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchCartCount();
    const handler = () => fetchCartCount();
    window.addEventListener('cart-updated', handler);
    return () => window.removeEventListener('cart-updated', handler);
  }, [fetchCartCount]);

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 text-white font-bold text-xl">
            <svg className="w-6 h-6" viewBox="0 0 76 65" fill="currentColor">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
            <span>Swag Store</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
              Home
            </Link>
            <Link href="/search" className="text-gray-300 hover:text-white transition-colors text-sm">
              Shop
            </Link>
            <Link href="/search?category=T-Shirts" className="text-gray-300 hover:text-white transition-colors text-sm">
              T-Shirts
            </Link>
            <Link href="/search?category=Hoodies" className="text-gray-300 hover:text-white transition-colors text-sm">
              Hoodies
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/search" className="text-gray-300 hover:text-white transition-colors">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </Link>
            <Link href="/cart" className="relative text-gray-300 hover:text-white transition-colors">
              <ShoppingCartIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
