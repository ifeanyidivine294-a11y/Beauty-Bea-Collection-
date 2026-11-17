import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check, Plus, Minus } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { formatNaira } from '../utils/currency';
import { useCart } from '../context/CartContext';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product || !selectedColor) return null;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#17131B]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FFF9F5] border border-[#EDE5E9] rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#77717A] hover:text-[#17131B] hover:bg-white rounded-full transition-colors z-10 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Showcase */}
          <div className="bg-white p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#EDE5E9]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-72 object-contain"
            />
          </div>

          {/* Details & Selectors */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#B51F63]">
                {product.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#17131B]">
                {product.name}
              </h3>
              <p className="font-mono text-xl font-bold text-[#17131B] tabular-nums">
                {formatNaira(product.price)}
              </p>
              <p className="text-sm text-[#77717A] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Variants */}
            <div className="space-y-4 pt-4 border-t border-[#EDE5E9]">
              {/* Colours */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#17131B] uppercase tracking-wider">
                  Select Colour: <span className="text-[#B51F63] font-medium">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full transition-all relative flex items-center justify-center cursor-pointer ${
                          isSelected
                            ? 'ring-2 ring-offset-2 ring-[#B51F63] scale-110'
                            : 'hover:scale-105 border border-black/10'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {isSelected && (
                          <Check
                            className={`w-3.5 h-3.5 ${
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
              </div>

              {/* Shoe Size */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#17131B] uppercase tracking-wider">
                    Shoe Size (EU): <span className="text-[#B51F63] font-medium">{selectedSize}</span>
                  </label>
                  <div className="grid grid-cols-6 gap-1.5">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-1.5 text-xs font-mono font-medium rounded-lg border transition-colors cursor-pointer ${
                          selectedSize === size
                            ? 'bg-[#B51F63] text-white border-[#B51F63]'
                            : 'bg-white text-[#17131B] border-[#EDE5E9] hover:border-[#B51F63]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-semibold text-[#17131B] uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#EDE5E9] rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-[#77717A] hover:text-[#17131B] transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-semibold font-mono tabular-nums min-w-[24px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-[#77717A] hover:text-[#17131B] transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 bg-[#B51F63] hover:bg-[#92174F] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{addedSuccess ? 'Added to Bag!' : `Add to Cart · ${formatNaira(product.price * quantity)}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
