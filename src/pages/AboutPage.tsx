import React from 'react';
import { useNavigation } from '../context/NavigationContext';

export const AboutPage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* 1. ABOUT HEADER & TOP SHOWCASE BANNER (Matching Panel 3 of Reference Image) */}
      <section className="bg-gradient-to-r from-[#F8DDE8] via-[#FFF1F6] to-[#F8DDE8] border-b border-[#F0DCE5] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-3 text-center md:text-left">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#29151F]">
                About Us
              </h1>
              <p className="text-sm sm:text-base text-[#786873]">
                Style. Quality. You.
              </p>
            </div>

            {/* Showcase Visual of Bouquet & Handbag */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-3 sm:p-4 rounded-3xl border border-white shadow-sm max-w-sm">
                <img
                  src="/product-bag-01.png"
                  alt="Beauty Bea Handbag"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
                <img
                  src="/product-perfume-01.png"
                  alt="Floral Perfume"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE & WHAT WE DO (With CEO Portrait on the Right) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-7 space-y-8">
            {/* Who We Are */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#29151F]">
                Who We Are
              </h2>
              <p className="text-sm sm:text-base text-[#29151F]/80 leading-relaxed font-sans">
                Beauty Bea Collection is a premium fashion brand in Nigeria, dedicated to helping you look and feel your best. We offer a curated selection of handbags, shoes, jewelry and perfumes for every occasion.
              </p>
            </div>

            {/* Divider */}
            <div className="w-16 h-0.5 bg-[#A80050]" />

            {/* What We Do */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#29151F]">
                What We Do
              </h2>
              <p className="text-sm sm:text-base text-[#29151F]/80 leading-relaxed font-sans">
                We bring you stylish, high-quality products with excellent customer service, fast delivery and a seamless shopping experience.
              </p>
            </div>

            {/* CEO Message */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#29151F]">
                Our CEO's Message
              </h3>
              <p className="text-sm sm:text-base italic text-[#29151F]/90 leading-relaxed font-serif">
                "At Beauty Bea Collection, our goal is to make elegance accessible to every woman in Nigeria. Thank you for being part of our fashion journey."
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A80050]">
                  — Beauty Bea, CEO
                </span>
                {/* Handwritten-style script signature */}
                <span className="font-serif italic text-2xl sm:text-3xl text-[#A80050]">
                  Beauty Bea
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/shop')}
                className="px-6 py-3 bg-[#A80050] hover:bg-[#8B0042] text-white text-xs font-bold tracking-wider uppercase rounded-full transition-all shadow-sm cursor-pointer"
              >
                Shop Our Collection
              </button>
            </div>
          </div>

          {/* Right Column: CEO Portrait Photography */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white aspect-[3/4]">
                <img
                  src="/ceo-beauty-bea.png"
                  alt="CEO of Beauty Bea Collection"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#29151F]/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
