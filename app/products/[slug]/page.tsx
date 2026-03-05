import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, products } from '@/lib/products';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCard from '@/components/ProductCard';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} — Vercel Swag Store`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/search" className="hover:text-white transition-colors">Shop</Link>
        <span>/</span>
        <Link href={`/search?category=${encodeURIComponent(product.category)}`} className="hover:text-white transition-colors">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-300">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-2">{product.category}</p>
          <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-white mb-6">${product.price.toFixed(2)}</p>

          {/* Stock indicator */}
          <div className="mb-6">
            {product.inStock ? (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                <span className="text-green-400 font-medium">
                  In Stock ({product.stockCount} remaining)
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full inline-block" />
                <span className="text-red-400 font-medium">Out of Stock</span>
              </div>
            )}
          </div>

          <p className="text-gray-400 leading-relaxed mb-8">{product.description}</p>

          <AddToCartButton productId={product.id} inStock={product.inStock} />

          <div className="mt-8 pt-8 border-t border-gray-800 grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="text-gray-500">Free Shipping</p>
              <p className="text-white font-medium">Orders over $50</p>
            </div>
            <div>
              <p className="text-gray-500">Returns</p>
              <p className="text-white font-medium">30-day policy</p>
            </div>
            <div>
              <p className="text-gray-500">Support</p>
              <p className="text-white font-medium">24/7 help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-white mb-8">More in {product.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
