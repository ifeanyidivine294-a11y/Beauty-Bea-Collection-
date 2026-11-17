import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Lock, Headphones } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

export const HomePage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION (Matching Panel 1 of Reference Image) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#F8DDE8] via-[#FFF1F6] to-[#F8DDE8] border-b border-[#F0DCE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline, Copy & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#29151F] leading-[1.1] text-balance">
                Elegance <br className="hidden sm:block" />
                <span className="italic font-normal">in Every Detail</span>
              </h1>

              <p className="text-base sm:text-lg text-[#786873] leading-relaxed max-w-lg mx-auto lg:mx-0">
                Discover timeless fashion and beauty with Beauty Bea Collection.
              </p>

              <div className="pt-2 flex justify-center lg:justify-start">
                <button
                  onClick={() => navigate('/shop')}
                  className="px-8 py-4 bg-[#A80050] hover:bg-[#8B0042] text-white text-xs font-bold tracking-wider uppercase rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2.5 cursor-pointer"
                >
                  <span>Shop the Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Hero Fashion Photography */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-white">
                  <img
                    src="/src/assets/images/hero_fashion_editorial_1794051004172.jpg"
                    alt="Elegance in Every Detail — Beauty Bea Collection"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#29151F]/40 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO (Section 4.B & 4.C of Reference Image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#29151F]">
            What We Do
          </h2>
          <p className="text-sm sm:text-base text-[#786873] leading-relaxed">
            We offer premium handbags, stylish shoes, elegant jewelry and signature perfumes — all in one place.
          </p>
        </div>

        {/* Four Category Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Bags */}
          <div className="bg-white/90 backdrop-blur-sm border border-[#F0DCE5] rounded-3xl p-5 flex flex-col justify-between items-center text-center hover:shadow-lg transition-all group">
            <div className="w-full aspect-square bg-[#FFF1F6]/60 rounded-2xl p-4 flex items-center justify-center mb-4">
              <img
                src="/product-bag-01.png"
                alt="Handbags"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-3 w-full">
              <h3 className="font-serif text-xl font-bold text-[#29151F]">Bags</h3>
              <button
                onClick={() => navigate('/shop', { category: 'Bags' })}
                className="w-full py-2 bg-[#A80050] hover:bg-[#8B0042] text-white text-[11px] font-bold rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>See all bags</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Shoes */}
          <div className="bg-white/90 backdrop-blur-sm border border-[#F0DCE5] rounded-3xl p-5 flex flex-col justify-between items-center text-center hover:shadow-lg transition-all group">
            <div className="w-full aspect-square bg-[#FFF1F6]/60 rounded-2xl p-4 flex items-center justify-center mb-4">
              <img
                src="/product-shoe-01.png"
                alt="Shoes"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-3 w-full">
              <h3 className="font-serif text-xl font-bold text-[#29151F]">Shoes</h3>
              <button
                onClick={() => navigate('/shop', { category: 'Shoes' })}
                className="w-full py-2 bg-[#A80050] hover:bg-[#8B0042] text-white text-[11px] font-bold rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>See all shoes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Jewelry */}
          <div className="bg-white/90 backdrop-blur-sm border border-[#F0DCE5] rounded-3xl p-5 flex flex-col justify-between items-center text-center hover:shadow-lg transition-all group">
            <div className="w-full aspect-square bg-[#FFF1F6]/60 rounded-2xl p-4 flex items-center justify-center mb-4">
              <img
                src="/product-jewelry-01.png"
                alt="Jewelry"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-3 w-full">
              <h3 className="font-serif text-xl font-bold text-[#29151F]">Jewelry</h3>
              <button
                onClick={() => navigate('/shop', { category: 'Jewelry' })}
                className="w-full py-2 bg-[#A80050] hover:bg-[#8B0042] text-white text-[11px] font-bold rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>See all jewelry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 4: Perfumes */}
          <div className="bg-white/90 backdrop-blur-sm border border-[#F0DCE5] rounded-3xl p-5 flex flex-col justify-between items-center text-center hover:shadow-lg transition-all group">
            <div className="w-full aspect-square bg-[#FFF1F6]/60 rounded-2xl p-4 flex items-center justify-center mb-4">
              <img
                src="/product-perfume-01.png"
                alt="Perfumes"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-3 w-full">
              <h3 className="font-serif text-xl font-bold text-[#29151F]">Perfumes</h3>
              <button
                onClick={() => navigate('/shop', { category: 'Perfumes' })}
                className="w-full py-2 bg-[#A80050] hover:bg-[#8B0042] text-white text-[11px] font-bold rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>See all perfumes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT AVAILABILITY STATEMENT & PREVIEW STRIP (Section 4.D) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#F8DDE8]/70 via-white/80 to-[#F8DDE8]/70 border border-[#F0DCE5] rounded-3xl p-8 sm:p-10 text-center space-y-6">
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-[#29151F]">
              These are some of our products.
            </h3>
            <p className="text-sm text-[#786873]">
              We have many more available. Contact us for the full collection.
            </p>
          </div>

          {/* Horizontal Gallery Preview Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-3 border border-[#F0DCE5] aspect-square flex items-center justify-center shadow-xs">
              <img src="/product-bag-03.png" alt="Noir bag" className="w-full h-full object-contain" />
            </div>
            <div className="bg-white rounded-2xl p-3 border border-[#F0DCE5] aspect-square flex items-center justify-center shadow-xs">
              <img src="/product-shoe-02.png" alt="Stiletto heels" className="w-full h-full object-contain" />
            </div>
            <div className="bg-white rounded-2xl p-3 border border-[#F0DCE5] aspect-square flex items-center justify-center shadow-xs">
              <img src="/product-jewelry-02.png" alt="Pearl earrings" className="w-full h-full object-contain" />
            </div>
            <div className="bg-white rounded-2xl p-3 border border-[#F0DCE5] aspect-square flex items-center justify-center shadow-xs">
              <img src="/product-perfume-02.png" alt="Rose perfume" className="w-full h-full object-contain" />
            </div>
          </div>

          <div>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-2.5 bg-white border border-[#A80050] text-[#A80050] hover:bg-[#A80050] hover:text-white text-xs font-bold rounded-full transition-all cursor-pointer"
            >
              Contact Us for Full Catalogue
            </button>
          </div>
        </div>
      </section>

      {/* 4. TRUST AND SERVICE HIGHLIGHTS (Section 4.E of Reference Image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm border border-[#F0DCE5] rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#F8DDE8] flex items-center justify-center text-[#A80050]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#29151F]">Premium Quality</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#F8DDE8] flex items-center justify-center text-[#A80050]">
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#29151F]">Fast Delivery</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#F8DDE8] flex items-center justify-center text-[#A80050]">
                <Lock className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#29151F]">Secure Payments</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#F8DDE8] flex items-center justify-center text-[#A80050]">
                <Headphones className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#29151F]">Excellent Customer Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
