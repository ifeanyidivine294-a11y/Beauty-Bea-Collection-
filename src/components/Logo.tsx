import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'light', size = 'md' }) => {
  const isDark = variant === 'dark';

  const heights = {
    sm: 'h-8',
    md: 'h-10 sm:h-11',
    lg: 'h-14 sm:h-16',
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none ${heights[size]} ${className}`}>
      {/* Crowned Monogram B */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-8 h-8 sm:w-10 sm:h-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`crownGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color={isDark ? '#F8DDE8' : '#C21865'} />
              <stop offset="100%" stop-color={isDark ? '#FFFFFF' : '#A80050'} />
            </linearGradient>
          </defs>

          {/* Little Regal Crown */}
          <path
            d="M 32 30 L 40 40 L 50 25 L 60 40 L 68 30 L 65 48 L 35 48 Z"
            fill={`url(#crownGrad-${variant})`}
          />
          <circle cx="32" cy="28" r="2.5" fill={isDark ? '#FFF' : '#A80050'} />
          <circle cx="50" cy="23" r="3" fill={isDark ? '#FFF' : '#A80050'} />
          <circle cx="68" cy="28" r="2.5" fill={isDark ? '#FFF' : '#A80050'} />

          {/* Serif Monogram B */}
          <text
            x="50"
            y="85"
            font-family="'Cormorant Garamond', Georgia, serif"
            font-size="46"
            font-weight="700"
            font-style="italic"
            fill={`url(#crownGrad-${variant})`}
            text-anchor="middle"
          >
            B
          </text>
        </svg>
      </div>

      {/* Typography Brand Lockup */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif text-lg sm:text-xl font-bold tracking-[0.06em] leading-tight ${
            isDark ? 'text-white' : 'text-[#29151F]'
          }`}
        >
          Beauty Bea
        </span>
        <span
          className={`text-[9px] sm:text-[10px] font-sans font-medium tracking-[0.25em] uppercase leading-none ${
            isDark ? 'text-[#F8DDE8]' : 'text-[#786873]'
          }`}
        >
          Collection
        </span>
      </div>
    </div>
  );
};
