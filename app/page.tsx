import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="flex justify-center mb-8">
            <svg className="w-16 h-16 text-white" viewBox="0 0 76 65" fill="currentColor">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Wear the Future
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Official Vercel merchandise. From developer-loved tees to premium accessories — rep the platform that powers the web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Shop All Products
            </Link>
            <Link
              href="/search?category=T-Shirts"
              className="border border-gray-600 text-white font-semibold px-8 py-3 rounded-lg hover:border-gray-400 transition-colors"
            >
              Browse T-Shirts
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white">Featured Products</h2>
            <p className="text-gray-400 mt-2">Our most popular gear, handpicked for you</p>
          </div>
          <Link
            href="/search"
            className="text-sm text-gray-400 hover:text-white transition-colors border border-gray-700 px-4 py-2 rounded-lg hover:border-gray-500"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {(['T-Shirts', 'Hoodies', 'Hats', 'Stickers', 'Accessories'] as const).map((cat) => (
            <Link
              key={cat}
              href={`/search?category=${encodeURIComponent(cat)}`}
              className="bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-xl p-6 text-center group transition-all duration-200 hover:-translate-y-1"
            >
              <p className="text-white font-semibold group-hover:text-gray-200">{cat}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Ship in Style?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Join thousands of developers who wear their tech identity with pride. Free shipping on orders over $50.
          </p>
          <Link
            href="/search"
            className="bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors inline-block"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}
