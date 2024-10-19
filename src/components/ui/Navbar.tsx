// components/ui/Navbar.tsx

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <p className="text-2xl font-bold text-blue-600">Vosic</p>
        </Link>
        <div className="space-x-4">
          {/* <Link href="/features"
            <p className="text-gray-700 hover:text-blue-600">Features</p>
          </Link> */}
          {/* <Link href="/pricing">
            <p className="text-gray-700 hover:text-blue-600">Pricing</p>
          </Link> */}
          <Link href="/contact">
            <Button variant="default">Contact Us!</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
