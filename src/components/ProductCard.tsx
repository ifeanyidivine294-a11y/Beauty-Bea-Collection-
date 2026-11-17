import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { formatNaira } from '../utils/currency';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { navigate } = useNavigation();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Order Now: carries product details directly into Contact / Order form!
  const handleOrderNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/contact', {
      preselectedProduct: {
        product,
        color: selectedColor,
      },
    });
  };

  // Add to Cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, selectedSize, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="group bg-white/90 backdrop-blur-sm border border-[#F0DCE5] rounded-3xl overflow-hidden p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-[#C21865]/40 hover:-translate-y-1">
      {/* Product Image Frame */}
      <div className="relative aspect-square bg-[#FFF1F6]/50 rounded-2xl overflow-hidden flex items-center justify-center p-3 mb-4">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quick Add to Cart Button on Top Right */}
        <button
          onClick={handleAddToCart}
          className="absolute top-2.5 right-2.5 p-2 bg-white/90 hover:bg-[#A80050] text-[#29151F] hover:text-white rounded-full shadow-sm border border-[#F0DCE5] transition-all cursor-pointer"
          aria-label={`Add ${product.name} to cart`}
          title="Add to shopping cart"
        >
          {addedAnimation ? <Check className="w-4 h-4 text-emerald-600" /> : <ShoppingBag className="w-4 h-4" />}
        </button>
      </div>

      {/* Info: Name, Price, Swatches */}
      <div className="space-y-3">
        <div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#29151F] line-clamp-1 group-hover:text-[#A80050] transition-colors">
            {product.name}
          </h3>
          <p className="font-mono text-sm sm:text-base font-bold text-[#A80050] mt-0.5 tabular-nums">
            {formatNaira(product.price)}
          </p>
        </div>

        {/* Available Color Swatches */}
        <div className="flex items-center gap-1.5 pt-1">
          {product.colors.map((color) => {
            const isSelected = selectedColor.name === color.name;
            return (
              <button
                key={color.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all relative flex items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-offset-2 ring-[#A80050] scale-110'
                    : 'hover:scale-105 border border-black/10'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name}`}
              >
                {isSelected && (
                  <Check
                    className={`w-3 h-3 ${
                      ['White', 'Clear', 'Gold', 'Silver', 'Nude', 'Pink'].includes(color.name)
                        ? 'text-black'
                        : 'text-white'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Shoe Size Selection (Only when shoe) */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            <span className="text-[10px] text-[#786873] mr-1">Size:</span>
            {product.sizes.map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(sz);
                }}
                className={`px-1.5 py-0.5 text-[10px] font-mono rounded border transition-colors cursor-pointer ${
                  selectedSize === sz
                    ? 'bg-[#A80050] text-white border-[#A80050]'
                    : 'bg-white text-[#29151F] border-[#F0DCE5] hover:border-[#A80050]'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        )}

        {/* Primary "Order Now" Button */}
        <button
          onClick={handleOrderNow}
          className="w-full py-2.5 px-4 bg-[#A80050] hover:bg-[#8B0042] text-white text-xs font-bold tracking-wider uppercase rounded-full transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95 text-center mt-2"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};
