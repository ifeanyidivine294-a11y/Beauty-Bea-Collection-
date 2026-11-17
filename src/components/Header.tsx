import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { SearchModal } from './SearchModal';

export const Header: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { currentPath, navigate } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFF1F6]/90 backdrop-blur-md border-b border-[#F0DCE5] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('/')}
            className="focus:outline-none cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNavClick('/')}
            aria-label="Beauty Bea Collection Home"
          >
            <Logo size="md" />
          </div>

          {/* Navigation Links: Home, Shop, About, Contact */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <button
              onClick={() => handleNavClick('/')}
              className={`transition-colors py-1 relative whitespace-nowrap cursor-pointer ${
                currentPath === '/'
                  ? 'text-[#A80050] font-semibold'
                  : 'text-[#29151F] hover:text-[#A80050]'
              }`}
            >
              Home
              {currentPath === '/' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A80050]" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('/shop')}
              className={`transition-colors py-1 relative whitespace-nowrap cursor-pointer ${
                currentPath === '/shop'
                  ? 'text-[#A80050] font-semibold'
                  : 'text-[#29151F] hover:text-[#A80050]'
              }`}
            >
              Shop
              {currentPath === '/shop' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A80050]" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('/about')}
              className={`transition-colors py-1 relative whitespace-nowrap cursor-pointer ${
                currentPath === '/about'
                  ? 'text-[#A80050] font-semibold'
                  : 'text-[#29151F] hover:text-[#A80050]'
              }`}
            >
              About
              {currentPath === '/about' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A80050]" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('/contact')}
              className={`transition-colors py-1 relative whitespace-nowrap cursor-pointer ${
                currentPath === '/contact'
                  ? 'text-[#A80050] font-semibold'
                  : 'text-[#29151F] hover:text-[#A80050]'
              }`}
            >
              Contact
              {currentPath === '/contact' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A80050]" />
              )}
            </button>
          </nav>

          {/* Header Action Controls: Search & Shopping Bag */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-[#29151F] hover:text-[#A80050] hover:bg-white rounded-full transition-colors cursor-pointer"
              aria-label="Search collection"
              title="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Bag Icon with Count */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-[#29151F] hover:text-[#A80050] hover:bg-white rounded-full transition-colors cursor-pointer"
              aria-label={`Shopping bag with ${totalItems} items`}
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#A80050] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#29151F] hover:text-[#A80050] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFF1F6] border-b border-[#F0DCE5] px-6 py-6 animate-in slide-in-from-top-2 duration-200 shadow-xl space-y-4">
            <nav className="flex flex-col gap-2 text-base font-medium">
              <button
                onClick={() => handleNavClick('/')}
                className={`text-left py-2.5 px-3 rounded-xl transition-colors ${
                  currentPath === '/'
                    ? 'bg-[#F8DDE8] text-[#A80050] font-bold'
                    : 'text-[#29151F] hover:bg-white/60'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('/shop')}
                className={`text-left py-2.5 px-3 rounded-xl transition-colors ${
                  currentPath === '/shop'
                    ? 'bg-[#F8DDE8] text-[#A80050] font-bold'
                    : 'text-[#29151F] hover:bg-white/60'
                }`}
              >
                Shop Catalogue
              </button>
              <button
                onClick={() => handleNavClick('/about')}
                className={`text-left py-2.5 px-3 rounded-xl transition-colors ${
                  currentPath === '/about'
                    ? 'bg-[#F8DDE8] text-[#A80050] font-bold'
                    : 'text-[#29151F] hover:bg-white/60'
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => handleNavClick('/contact')}
                className={`text-left py-2.5 px-3 rounded-xl transition-colors ${
                  currentPath === '/contact'
                    ? 'bg-[#F8DDE8] text-[#A80050] font-bold'
                    : 'text-[#29151F] hover:bg-white/60'
                }`}
              >
                Contact & Order
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
