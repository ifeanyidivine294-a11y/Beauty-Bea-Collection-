import React from 'react';
import { Home, ShoppingBag, User, Phone } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const MobileBottomNav: React.FC = () => {
  const { currentPath, navigate } = useNavigation();

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F0DCE5] px-4 py-2 shadow-lg">
      <div className="grid grid-cols-4 gap-1">
        <button
          onClick={() => navigate('/')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            currentPath === '/' ? 'text-[#A80050]' : 'text-[#786873]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Home</span>
        </button>

        <button
          onClick={() => navigate('/shop')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            currentPath === '/shop' ? 'text-[#A80050]' : 'text-[#786873]'
          }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Shop</span>
        </button>

        <button
          onClick={() => navigate('/about')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            currentPath === '/about' ? 'text-[#A80050]' : 'text-[#786873]'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">About</span>
        </button>

        <button
          onClick={() => navigate('/contact')}
          className={`flex flex-col items-center justify-center py-1 rounded-xl transition-colors ${
            currentPath === '/contact' ? 'text-[#A80050]' : 'text-[#786873]'
          }`}
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Contact</span>
        </button>
      </div>
    </div>
  );
};
