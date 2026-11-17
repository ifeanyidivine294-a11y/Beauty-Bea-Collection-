import React from 'react';
import { Phone, Mail, Clock, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_CONFIG } from '../config/business';
import { useNavigation } from '../context/NavigationContext';

export const Footer: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <footer className="relative bg-gradient-to-b from-[#29151F] via-[#200E17] to-[#14080F] text-white pt-16 pb-20 md:pb-12 border-t border-[#3A222F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <div
              onClick={() => navigate('/')}
              className="cursor-pointer inline-block"
              role="button"
              tabIndex={0}
            >
              <Logo variant="dark" size="md" />
            </div>
            <p className="font-serif italic text-base text-[#F8DDE8]">
              "{BUSINESS_CONFIG.tagline}"
            </p>
            <p className="text-xs text-[#A89CA4] leading-relaxed max-w-xs">
              Curated Nigerian fashion and beauty boutique offering premium handbags, stylish footwear, timeless jewelry and captivating fragrances.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#A80050] flex items-center justify-center transition-colors text-white"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${BUSINESS_CONFIG.email}`}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#A80050] flex items-center justify-center transition-colors text-white"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70">
                <Facebook className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70">
                <Youtube className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89CA4]">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-[#F8DDE8] transition-colors cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop')}
                  className="hover:text-[#F8DDE8] transition-colors cursor-pointer"
                >
                  Shop Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-[#F8DDE8] transition-colors cursor-pointer"
                >
                  About Our Boutique
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-[#F8DDE8] transition-colors cursor-pointer"
                >
                  Contact & Order
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Collections */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold tracking-wider text-white">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A89CA4]">
              <li>
                <button
                  onClick={() => navigate('/shop', { category: 'Bags' })}
                  className="hover:text-[#F8DDE8] transition-colors cursor-pointer text-left"
                >
                  Handbags & Totes (4 Designs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop', { category: 'Shoes' })}
                  className="hover:text-[#F8DDE8] transition-colors cursor-pointer text-left"
                >
                  Footwear & Heels (4 Designs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop', { category: 'Perfumes' })}
                  className="hover:text-[#F8DDE8] transition-colors cursor-pointer text-left"
                >
                  Signature Fragrances (3 Scents)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop', { category: 'Jewelry' })}
                  className="hover:text-[#F8DDE8] transition-colors cursor-pointer text-left"
                >
                  Timeless Jewelry (3 Sets)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold tracking-wider text-white">
              Contact & Hours
            </h4>
            <ul className="space-y-3 text-xs text-[#A89CA4]">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C21865] shrink-0 mt-0.5" />
                <a
                  href={BUSINESS_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F8DDE8] transition-colors text-white font-medium"
                >
                  {BUSINESS_CONFIG.whatsappNumber}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C21865] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${BUSINESS_CONFIG.email}`}
                  className="hover:text-[#F8DDE8] transition-colors break-all"
                >
                  {BUSINESS_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C21865] shrink-0 mt-0.5" />
                <span>6:30 AM – 5:00 PM (Africa/Lagos)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C21865] shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.town}, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A89CA4]">
          <p>© 2026 Beauty Bea Collection. All rights reserved.</p>
          <p className="font-serif italic text-white/90">
            Shop Smart. Look Elegant.
          </p>
        </div>
      </div>
    </footer>
  );
};
