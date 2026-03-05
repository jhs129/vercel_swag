export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: 'T-Shirts' | 'Hoodies' | 'Hats' | 'Stickers' | 'Accessories';
  image: string;
  inStock: boolean;
  stockCount: number;
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'vercel-classic-tee',
    name: 'Vercel Classic Tee',
    description: 'The iconic Vercel triangle on a premium cotton tee. Soft, comfortable, and built for developers who ship fast.',
    price: 29.99,
    category: 'T-Shirts',
    image: 'https://placehold.co/600x600/000000/ffffff?text=Vercel+Classic+Tee',
    inStock: true,
    stockCount: 42,
  },
  {
    id: '2',
    slug: 'deploy-everywhere-tee',
    name: 'Deploy Everywhere Tee',
    description: 'Show the world you deploy everywhere with this minimalist tee featuring the Vercel globe logo.',
    price: 29.99,
    category: 'T-Shirts',
    image: 'https://placehold.co/600x600/111111/ffffff?text=Deploy+Everywhere+Tee',
    inStock: true,
    stockCount: 28,
  },
  {
    id: '3',
    slug: 'ship-it-tee',
    name: 'Ship It Tee',
    description: 'A bold statement tee for developers who get things done. 100% organic cotton.',
    price: 34.99,
    category: 'T-Shirts',
    image: 'https://placehold.co/600x600/222222/ffffff?text=Ship+It+Tee',
    inStock: true,
    stockCount: 15,
  },
  {
    id: '4',
    slug: 'vercel-pullover-hoodie',
    name: 'Vercel Pullover Hoodie',
    description: 'Stay cozy while you code with this premium pullover hoodie. Features the Vercel wordmark on the chest.',
    price: 69.99,
    category: 'Hoodies',
    image: 'https://placehold.co/600x600/0a0a0a/ffffff?text=Vercel+Pullover+Hoodie',
    inStock: true,
    stockCount: 20,
  },
  {
    id: '5',
    slug: 'dark-mode-hoodie',
    name: 'Dark Mode Hoodie',
    description: 'For those who live in dark mode. A zip-up hoodie with subtle Vercel branding and a spacious front pocket.',
    price: 74.99,
    category: 'Hoodies',
    image: 'https://placehold.co/600x600/1a1a1a/ffffff?text=Dark+Mode+Hoodie',
    inStock: false,
    stockCount: 0,
  },
  {
    id: '6',
    slug: 'vercel-snapback-hat',
    name: 'Vercel Snapback Hat',
    description: 'A clean snapback hat with the Vercel triangle embroidered on the front. One size fits all.',
    price: 39.99,
    category: 'Hats',
    image: 'https://placehold.co/600x600/333333/ffffff?text=Vercel+Snapback+Hat',
    inStock: true,
    stockCount: 35,
  },
  {
    id: '7',
    slug: 'edge-runtime-dad-hat',
    name: 'Edge Runtime Dad Hat',
    description: 'A relaxed, unstructured dad hat for edge computing enthusiasts. Garment washed for a lived-in feel.',
    price: 34.99,
    category: 'Hats',
    image: 'https://placehold.co/600x600/444444/ffffff?text=Edge+Runtime+Dad+Hat',
    inStock: true,
    stockCount: 18,
  },
  {
    id: '8',
    slug: 'vercel-logo-sticker-pack',
    name: 'Vercel Logo Sticker Pack',
    description: 'A pack of 10 premium vinyl stickers featuring the Vercel logo in various styles. Waterproof and UV-resistant.',
    price: 9.99,
    category: 'Stickers',
    image: 'https://placehold.co/600x600/555555/ffffff?text=Vercel+Sticker+Pack',
    inStock: true,
    stockCount: 50,
  },
  {
    id: '9',
    slug: 'next-js-holographic-sticker',
    name: 'Next.js Holographic Sticker',
    description: 'A holographic sticker featuring the Next.js logo. Perfect for your laptop, water bottle, or wherever you want to show your Next.js love.',
    price: 4.99,
    category: 'Stickers',
    image: 'https://placehold.co/600x600/666666/ffffff?text=Next.js+Holographic+Sticker',
    inStock: true,
    stockCount: 50,
  },
  {
    id: '10',
    slug: 'vercel-laptop-sleeve',
    name: 'Vercel Laptop Sleeve',
    description: 'Protect your laptop in style with this premium neoprene sleeve. Features a subtle Vercel logo and fits most 13-15" laptops.',
    price: 49.99,
    category: 'Accessories',
    image: 'https://placehold.co/600x600/111827/ffffff?text=Vercel+Laptop+Sleeve',
    inStock: true,
    stockCount: 12,
  },
  {
    id: '11',
    slug: 'vercel-water-bottle',
    name: 'Vercel Water Bottle',
    description: 'Stay hydrated while you deploy. An insulated stainless steel water bottle with the Vercel logo.',
    price: 39.99,
    category: 'Accessories',
    image: 'https://placehold.co/600x600/1f2937/ffffff?text=Vercel+Water+Bottle',
    inStock: true,
    stockCount: 25,
  },
  {
    id: '12',
    slug: 'vercel-tote-bag',
    name: 'Vercel Tote Bag',
    description: 'A heavy-duty canvas tote bag with the Vercel logo. Great for carrying your gear to and from the office or a hackathon.',
    price: 24.99,
    category: 'Accessories',
    image: 'https://placehold.co/600x600/374151/ffffff?text=Vercel+Tote+Bag',
    inStock: true,
    stockCount: 8,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string, category?: string): Product[] {
  let filtered = products;
  if (category && category !== 'All') {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }
  return filtered;
}

export const categories = ['All', 'T-Shirts', 'Hoodies', 'Hats', 'Stickers', 'Accessories'] as const;
