'use client';

import { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

interface AddToCartButtonProps {
  productId: string;
  inStock: boolean;
}

export default function AddToCartButton({ productId, inStock }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!inStock || loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (res.ok) {
        setAdded(true);
        window.dispatchEvent(new Event('cart-updated'));
        setTimeout(() => setAdded(false), 2000);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  if (!inStock) {
    return (
      <button
        disabled
        className="w-full bg-gray-800 text-gray-500 font-semibold py-3 px-6 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading || added}
      className={`w-full font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ${
        added
          ? 'bg-green-600 text-white'
          : 'bg-white text-black hover:bg-gray-200 active:scale-95'
      } ${loading ? 'opacity-70 cursor-wait' : ''}`}
    >
      {added ? (
        <>
          <CheckIcon className="w-5 h-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCartIcon className="w-5 h-5" />
          {loading ? 'Adding...' : 'Add to Cart'}
        </>
      )}
    </button>
  );
}
