'use client';

import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export default function Header({ cartItemCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1" />
          
          <h1 
            className="text-2xl font-bold text-casa-magenta font-serif"
            style={{ color: '#C5195F' }}
          >
            CASA COPENHAGEN
          </h1>
          
          <div className="flex-1 flex justify-end">
            <button
              onClick={onCartClick}
              className={`relative p-2 transition-all duration-200 ${
                cartItemCount > 0 
                  ? 'text-onyx' 
                  : 'text-onyx hover:text-casa-magenta'
              }`}
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-casa-magenta text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
