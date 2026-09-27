import React from 'react';

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
  // Dimension classes for the logo mark
  const sizeMap = {
    sm: 'h-8 w-8',
    md: 'h-11 w-11 sm:h-12 sm:w-12',
    lg: 'h-14 w-14 sm:h-16 sm:w-16',
    xl: 'h-20 w-20 sm:h-24 sm:w-24',
  };

  const imgDimensions = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 ${className}`}>
      {/* Official Circular Logo Emblem (Exact Vector Recreation of Bhatukli Logo) */}
      <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
        <svg
          viewBox="0 0 450 450"
          className={`${imgDimensions} shrink-0 drop-shadow-xs`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="The Namastey Nashik - By Bhatukli Official Emblem"
        >
          {/* Circular Badge Canvas */}
          <circle cx="225" cy="225" r="220" fill="#FFFFFF" />
          
          {/* Outer Teal Ring */}
          <circle cx="225" cy="225" r="215" fill="none" stroke="#0D828A" strokeWidth="8" />
          
          {/* Inner Thin Silver / Grey Ring */}
          <circle cx="225" cy="225" r="204" fill="none" stroke="#94A3B8" strokeWidth="3" />

          {/* Hindi Devanagari Wordmark: नमस्ते */}
          <g fill="#18181B">
            <text
              x="75"
              y="230"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Noto Sans Devanagari', 'Mukta', sans-serif"
              fontWeight="900"
              fontSize="48"
              letterSpacing="1"
            >
              नमस्ते
            </text>
          </g>

          {/* Solid Teal Circle with Spoon Silhouette */}
          <g>
            {/* The circular plate behind spoon */}
            <circle cx="305" cy="160" r="56" fill="#0D828A" />

            {/* Spoon bowl in white (negative space) */}
            <path
              d="M305 125 C317 125 324 139 324 156 C324 175 316 190 308 198 L308 216 L302 216 L302 198 C294 190 286 175 286 156 C286 139 293 125 305 125 Z"
              fill="#FFFFFF"
            />
            {/* Fine central inner line in spoon */}
            <line x1="305" y1="128" x2="305" y2="192" stroke="#0D828A" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* English Wordmark: NASH */}
          <g fill="#0D828A">
            <text
              x="76"
              y="290"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Arial Black', sans-serif"
              fontWeight="900"
              fontSize="60"
              letterSpacing="2.5"
            >
              NASH
            </text>
          </g>

          {/* Stylized 'I' as Spoon/Fork Stem cutting through */}
          <g fill="#0D828A">
            {/* Left prong of stem */}
            <rect x="296" y="216" width="6" height="90" rx="3" fill="#0D828A" />
            {/* Right prong of stem */}
            <rect x="307" y="216" width="6" height="90" rx="3" fill="#0D828A" />
          </g>

          {/* English Letter: K */}
          <g fill="#0D828A">
            <text
              x="320"
              y="290"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Arial Black', sans-serif"
              fontWeight="900"
              fontSize="60"
              letterSpacing="2.5"
            >
              K
            </text>
          </g>

          {/* Subtitle: - BY BHATUKLI - */}
          <g fill="#82929E">
            <text
              x="225"
              y="325"
              textAnchor="middle"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', sans-serif"
              fontWeight="700"
              fontSize="16.5"
              letterSpacing="3.5"
            >
              - BY BHATUKLI -
            </text>
          </g>
        </svg>
      </div>

      {/* Brand Title & Sub-branding beside Emblem */}
      {showSubtitle && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-base sm:text-[17px] font-bold text-primary tracking-tight leading-none truncate">
              The Namastey Nashik
            </span>
            <span
              className="inline-flex items-center justify-center w-3.5 h-3.5 border border-pure-veg-green rounded-[2px] p-[1.5px] shrink-0"
              title="100% Pure Vegetarian"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-pure-veg-green"></span>
            </span>
          </div>
          <span className="font-label-sm text-[10px] sm:text-[11px] text-charcoal-muted tracking-wider uppercase font-semibold mt-1 truncate">
            नमस्ते नाशिक · By Bhatukli
          </span>
        </div>
      )}
    </div>
  );
};
