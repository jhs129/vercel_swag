import { Suspense } from 'react';
import { searchProducts, categories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import SearchForm from '@/components/SearchForm';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export const metadata = {
  title: 'Shop — Vercel Swag Store',
  description: 'Browse all Vercel merchandise.',
};

function SearchResults({ q, category }: { q: string; category: string }) {
  const results = searchProducts(q, category === 'All' ? undefined : category);

  return (
    <>
      <p className="text-gray-400 text-sm mb-6">
        {results.length} product{results.length !== 1 ? 's' : ''} found
        {q ? ` for "${q}"` : ''}
        {category && category !== 'All' ? ` in ${category}` : ''}
      </p>
      {results.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products found.</p>
          <p className="text-gray-600 mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q ?? '';
  const category = resolvedParams.category ?? 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Shop All Products</h1>
        <p className="text-gray-400">Discover the full Vercel swag collection</p>
      </div>

      <SearchForm initialQ={q} initialCategory={category} categories={[...categories]} />

      <Suspense fallback={<div className="text-gray-400 py-8">Loading products...</div>}>
        <SearchResults q={q} category={category} />
      </Suspense>
    </div>
  );
}
