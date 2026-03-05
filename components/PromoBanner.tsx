'use client';

import { useState, useEffect } from 'react';

const promos = [
  '🚀 Free shipping on orders over $50!',
  '⚡ New arrivals just dropped — Shop the latest Vercel gear',
  '🎉 Use code DEPLOY10 for 10% off your first order',
  '✨ Members get early access to limited edition drops',
];

const ROTATION_INTERVAL_MS = 4000;

export default function PromoBanner() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % promos.length);
        setVisible(true);
      }, 300);
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-black text-sm font-medium text-center py-2 px-4">
      <span
        className="transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {promos[index]}
      </span>
    </div>
  );
}
