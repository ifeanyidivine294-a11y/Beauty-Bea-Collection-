import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { formatNaira } from '../utils/currency';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItems,
  } = useCart();
  const { navigate } = useNavigation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/contact');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#29151F]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-out Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#F0DCE5] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#F0DCE5] flex items-center justify-between bg-[#FFF1F6]/60">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#A80050]" />
              <h2 className="font-serif text-2xl font-bold text-[#29151F]">
                Your Cart
              </h2>
              <span className="text-xs px-2.5 py-0.5 bg-white border border-[#F0DCE5] rounded-full text-[#786873] font-semibold">
                {totalItems}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#786873] hover:text-[#29151F] hover:bg-white rounded-full transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FFF1F6]/30">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F8DDE8] flex items-center justify-center text-[#A80050]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-semibold text-[#29151F]">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-[#786873] max-w-xs">
                    Explore our luxury handbags, footwear, fine jewelry, and signature fragrances.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#A80050] hover:bg-[#8B0042] text-white text-xs font-semibold tracking-wider uppercase rounded-full transition-colors shadow-sm"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white border border-[#F0DCE5] rounded-2xl flex gap-4 transition-all hover:shadow-xs"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#FFF1F6] rounded-xl overflow-hidden shrink-0 border border-[#F0DCE5] flex items-center justify-center p-1.5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-[#29151F] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#786873] hover:text-[#A80050] p-1 transition-colors cursor-pointer"
                          title="Remove item"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant Specs */}
                      <div className="mt-1 flex items-center gap-2 text-xs text-[#786873]">
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block shrink-0"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </span>
                        {item.selectedSize && <span>· Size {item.selectedSize}</span>}
                      </div>

                      <p className="font-mono text-sm font-bold text-[#A80050] mt-1 tabular-nums">
                        {formatNaira(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-[#F0DCE5] rounded-lg bg-[#FFF1F6] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 px-2 text-[#786873] hover:text-[#29151F] hover:bg-white transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#29151F] font-mono tabular-nums min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 px-2 text-[#786873] hover:text-[#29151F] hover:bg-white transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-semibold text-xs text-[#29151F] font-mono tabular-nums">
                        Subtotal: {formatNaira(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#F0DCE5] space-y-4">
              <div className="flex items-center justify-between text-base font-bold text-[#29151F]">
                <span>Subtotal:</span>
                <span className="font-mono tabular-nums text-lg text-[#A80050]">
                  {formatNaira(subtotal)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-[#A80050] hover:bg-[#8B0042] text-white text-xs font-bold tracking-wider uppercase rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Checkout →</span>
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/shop');
                }}
                className="w-full text-center text-xs text-[#786873] hover:text-[#A80050] font-medium"
              >
                View Full Catalogue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
