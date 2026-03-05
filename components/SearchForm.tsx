'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchFormProps {
  initialQ: string;
  initialCategory: string;
  categories: string[];
}

export default function SearchForm({ initialQ, initialCategory, categories }: SearchFormProps) {
  const router = useRouter();
  const [q, setQ] = useState(initialQ);
  const [category, setCategory] = useState(initialCategory);
  const [, startTransition] = useTransition();

  const updateSearch = (newQ: string, newCategory: string) => {
    const params = new URLSearchParams();
    if (newQ) params.set('q', newQ);
    if (newCategory && newCategory !== 'All') params.set('category', newCategory);
    const queryString = params.toString();
    startTransition(() => {
      router.push(`/search${queryString ? `?${queryString}` : ''}`);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearch(q, category);
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    updateSearch(q, cat);
  };

  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-gray-900 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-gray-500 transition-colors"
          />
        </div>
        <button
          type="submit"
          className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Search
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              category === cat
                ? 'bg-white text-black'
                : 'bg-gray-900 text-gray-400 border border-gray-700 hover:border-gray-500 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
