import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useNavigation } from '../context/NavigationContext';

export const ShopPage: React.FC = () => {
  const { selectedShopCategory, setSelectedShopCategory, navigate } = useNavigation();

  const categories = ['All', 'Bags', 'Shoes', 'Jewelry', 'Perfumes'];

  // Filter products based on selected tab
  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedShopCategory === 'All') return true;
    if (selectedShopCategory === 'Bags') return product.category === 'HANDBAGS';
    if (selectedShopCategory === 'Shoes') return product.category === 'SHOES';
    if (selectedShopCategory === 'Jewelry') return product.category === 'JEWELRY';
    if (selectedShopCategory === 'Perfumes') return product.category === 'PERFUMES';
    return true;
  });

  return (
    <div className="space-y-12 sm:space-y-16 pb-24">
      {/* 1. SHOP HEADER & SHOWCASE BANNER (Matching Panel 2 of Reference Image) */}
      <section className="bg-gradient-to-r from-[#F8DDE8] via-[#FFF1F6] to-[#F8DDE8] border-b border-[#F0DCE5] py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Title & Copy */}
            <div className="md:col-span-7 space-y-3 text-center md:text-left">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#29151F]">
                Our Collection
              </h1>
              <p className="text-sm sm:text-base text-[#786873]">
                Shop premium fashion and beauty products
              </p>
            </div>

            {/* Showcase Visual of Bag & Heels */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-3 sm:p-4 rounded-3xl border border-white shadow-sm max-w-sm">
                <img
                  src="/product-bag-02.png"
                  alt="Luxury Handbag"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
                <img
                  src="/product-shoe-02.png"
                  alt="Pointed Pumps"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS & PRODUCT CATALOGUE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Pills Bar (Matching Reference Image) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedShopCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedShopCategory(cat)}
                className={`px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#A80050] text-white shadow-sm'
                    : 'bg-white text-[#786873] border border-[#F0DCE5] hover:text-[#29151F] hover:border-[#A80050]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Grid: Exactly 2 columns on Mobile, 4 columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Availability Statement at end of catalogue */}
        <div className="pt-8 pb-4 text-center border-t border-[#F0DCE5]">
          <p className="text-sm font-medium text-[#786873]">
            More designs available.{' '}
            <button
              onClick={() => navigate('/contact')}
              className="text-[#A80050] font-bold hover:underline cursor-pointer"
            >
              Contact us.
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
