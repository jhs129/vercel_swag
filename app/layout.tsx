import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import PromoBanner from '@/components/PromoBanner';

export const metadata: Metadata = {
  title: 'Vercel Swag Store',
  description: 'Official Vercel merchandise — T-shirts, hoodies, hats, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-black text-white min-h-screen">
        <PromoBanner />
        <Navigation />
        <main>{children}</main>
        <footer className="border-t border-gray-800 mt-20 py-10 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Vercel Swag Store. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
