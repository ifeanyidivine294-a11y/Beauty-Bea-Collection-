import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { formatNaira } from '../utils/currency';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { navigate } = useNavigation();
  const { addToCart } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.colors.some((c) => c.name.toLowerCase().includes(query.toLowerCase()))
      )
    : PRODUCTS.slice(0, 4); // Suggest 4 featured products initially

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#29151F]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search Container */}
      <div className="relative bg-white border border-[#F0DCE5] rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#F0DCE5] flex items-center gap-3 bg-[#FFF1F6]/50">
          <Search className="w-5 h-5 text-[#C21865]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search handbags, shoes, jewelry, perfumes or colours..."
            className="w-full bg-transparent text-sm sm:text-base text-[#29151F] placeholder:text-[#786873] focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#786873] hover:text-[#29151F] hover:bg-white rounded-full transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#786873] px-2 mb-2">
            {query.trim() ? `Search Results (${results.length})` : 'Popular in Store'}
          </span>

          {results.length === 0 ? (
            <div className="text-center py-8 text-sm text-[#786873]">
              No products found matching "{query}". Try searching for bags, shoes, or perfumes.
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                className="p-3 hover:bg-[#FFF1F6] rounded-2xl flex items-center justify-between gap-3 transition-colors cursor-pointer group"
                onClick={() => {
                  onClose();
                  navigate('/shop', { category: product.category === 'HANDBAGS' ? 'Bags' : product.category === 'SHOES' ? 'Shoes' : product.category === 'PERFUMES' ? 'Perfumes' : 'Jewelry' });
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl p-1 border border-[#F0DCE5] flex items-center justify-center shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#29151F] group-hover:text-[#A80050] transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-xs text-[#786873] font-mono tabular-nums">
                      {formatNaira(product.price)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, product.colors[0], product.sizes?.[0], 1);
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-[#A80050] text-white text-[11px] font-bold rounded-full hover:bg-[#8B0042] transition-colors"
                  >
                    Add
                  </button>
                  <ArrowRight className="w-4 h-4 text-[#786873] group-hover:text-[#A80050] transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
