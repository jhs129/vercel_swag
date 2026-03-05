import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-200 hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-gray-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-semibold text-sm bg-gray-800 px-3 py-1 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{product.category}</p>
          <h3 className="text-white font-semibold text-sm group-hover:text-gray-200 transition-colors">
            {product.name}
          </h3>
          <p className="text-white font-bold mt-2">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
