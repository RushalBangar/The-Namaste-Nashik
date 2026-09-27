import React, { useState } from 'react';

interface RestaurantLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const RestaurantLogo: React.FC<RestaurantLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const [imgError, setImgError] = useState(false);

  // Dimension classes
  const sizeMap = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10 sm:h-12 sm:w-12',
    lg: 'h-14 w-14 sm:h-16 sm:w-16',
    xl: 'h-20 w-20 sm:h-24 sm:w-24',
  };

  const imgDimensions = sizeMap[size];

  if (!imgError) {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <img
          src="/logo.png"
          alt="The Namastey Nashik - By Bhatukli (नमस्ते नाशिक)"
          className={`${imgDimensions} object-contain rounded-full shadow-xs border border-teal-600/20 bg-white p-0.5 shrink-0 transition-transform duration-300 hover:scale-105`}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
        {showSubtitle && (
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-base sm:text-lg font-bold text-primary tracking-tight leading-none truncate">
                The Namastey Nashik
              </span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 border border-pure-veg-green rounded-[2px] p-[1.5px] shrink-0" title="100% Pure Vegetarian">
                <span className="w-1.5 h-1.5 rounded-full bg-pure-veg-green"></span>
              </span>
            </div>
            <span className="font-label-sm text-[10px] sm:text-xs text-charcoal-muted tracking-wider uppercase font-semibold mt-0.5 truncate">
              नमस्ते नाशिक · By Bhatukli
            </span>
          </div>
        )}
      </div>
    );
  }

  // High fidelity vector SVG Fallback matching the uploaded emblem exactly
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 400 400"
        className={`${imgDimensions} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Namastey Nashik Logo"
      >
        {/* Outer and inner concentric circles */}
        <circle cx="200" cy="200" r="192" fill="#FFFFFF" stroke="#0E747F" strokeWidth="8" />
        <circle cx="200" cy="200" r="180" fill="none" stroke="#D1D5DB" strokeWidth="3" />

        {/* Hindi Devanagari 'नमस्ते' */}
        <text
          x="75"
          y="180"
          fontFamily="sans-serif"
          fontWeight="900"
          fontSize="56"
          fill="#111827"
          letterSpacing="1"
        >
          नमस्ते
        </text>

        {/* English 'NASHIK' */}
        <text
          x="72"
          y="250"
          fontFamily="sans-serif"
          fontWeight="800"
          fontSize="68"
          fill="#0E747F"
          letterSpacing="4"
        >
          NASH
        </text>

        <text
          x="300"
          y="250"
          fontFamily="sans-serif"
          fontWeight="800"
          fontSize="68"
          fill="#0E747F"
        >
          K
        </text>

        {/* Right Spoon / Fork Culinary Emblem */}
        <circle cx="265" cy="165" r="50" fill="#0E747F" />
        {/* Spoon Head Cutout */}
        <path
          d="M265 132 C255 132 248 144 248 160 C248 174 256 186 265 190 C274 186 282 174 282 160 C282 144 275 132 265 132 Z"
          fill="#FFFFFF"
        />
        {/* Center Vertical Handle / Fork Stems */}
        <rect x="260" y="190" width="4" height="75" rx="2" fill="#0E747F" />
        <rect x="268" y="190" width="4" height="75" rx="2" fill="#0E747F" />

        {/* Subtitle '- BY BHATUKLI -' */}
        <text
          x="200"
          y="285"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontWeight="600"
          fontSize="18"
          fill="#6B7280"
          letterSpacing="4"
        >
          - BY BHATUKLI -
        </text>
      </svg>

      {showSubtitle && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-base sm:text-lg font-bold text-primary tracking-tight leading-none truncate">
              The Namastey Nashik
            </span>
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 border border-pure-veg-green rounded-[2px] p-[1.5px] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-pure-veg-green"></span>
            </span>
          </div>
          <span className="font-label-sm text-[10px] sm:text-xs text-charcoal-muted tracking-wider uppercase font-semibold mt-0.5 truncate">
            नमस्ते नाशिक · By Bhatukli
          </span>
        </div>
      )}
    </div>
  );
};
