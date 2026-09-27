import React, { useState } from 'react';

interface RealPhotoProps {
  className?: string;
  alt?: string;
}

// Curated Category Real High-Resolution Food Photography
export const CATEGORY_REAL_PHOTOS: Record<string, string> = {
  signature: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80",
  khakra: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80",
  starters: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80",
  chinese_starters: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80",
  soups: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80",
  curries: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80",
  rice: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80",
  breads: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80",
  noodles: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80",
  continental: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
  salads: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
  beverages: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80",
};

// Unified Real Food Photography Component (No Cartoons / No SVGs)
export const DishVisual: React.FC<{
  dishId: string;
  imageUrl?: string;
  name: string;
  category?: string;
  className?: string;
}> = ({ imageUrl, name, category = "curries", className = "w-full h-full" }) => {
  const [useBackup, setUseBackup] = useState(false);
  const [completeError, setCompleteError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const fallbackUrl = CATEGORY_REAL_PHOTOS[category] || CATEGORY_REAL_PHOTOS.curries;
  const primarySrc = imageUrl || fallbackUrl;

  if (completeError) {
    return (
      <div className={`${className} bg-gradient-to-br from-[#2c1912] via-[#21130d] to-[#170c07] flex flex-col items-center justify-center p-4 text-center relative select-none`}>
        <div className="w-12 h-12 rounded-full bg-secondary-fixed/20 border border-secondary-fixed/30 flex items-center justify-center text-secondary-fixed mb-2">
          <span className="material-symbols-outlined text-[24px]">restaurant</span>
        </div>
        <span className="font-headline-sm text-sm font-bold text-[#fff8f5] line-clamp-1">{name}</span>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          <span className="text-[10px] text-tertiary-fixed font-bold tracking-wider uppercase">100% Pure Veg</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className} overflow-hidden bg-surface-container`}>
      {/* Skeleton shimmer while image is loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-surface-container-high animate-pulse flex items-center justify-center">
          <span className="material-symbols-outlined text-outline-variant text-[28px] animate-spin">
            progress_activity
          </span>
        </div>
      )}

      <img
        src={useBackup ? fallbackUrl : primarySrc}
        alt={`Authentic real dish photograph of ${name} at The Namastey Nashik`}
        className={`${className} object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!useBackup) {
            setUseBackup(true);
          } else {
            setCompleteError(true);
          }
        }}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    </div>
  );
};

// Real Photography exports for Hero & Specialty sections (No SVGs/Cartoons)
export const RestaurantHeroIllustration: React.FC<RealPhotoProps> = ({ className = "w-full h-full", alt = "The Namastey Nashik Grand Fine Dine Hall" }) => (
  <img
    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80"
    alt={alt}
    className={`${className} object-cover`}
    referrerPolicy="no-referrer"
  />
);

export const ThaliIllustration: React.FC<RealPhotoProps> = ({ className = "w-full h-full", alt = "Maharashtrian Special Pure Veg Thali Feast" }) => (
  <img
    src="https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&auto=format&fit=crop&q=80"
    alt={alt}
    className={`${className} object-cover`}
    referrerPolicy="no-referrer"
  />
);

export const PaneerTikkaIllustration: React.FC<RealPhotoProps> = ({ className = "w-full h-full", alt = "Clay Tandoor Char-grilled Paneer Tikka" }) => (
  <img
    src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80"
    alt={alt}
    className={`${className} object-cover`}
    referrerPolicy="no-referrer"
  />
);

export const ShevBhajiIllustration: React.FC<RealPhotoProps> = ({ className = "w-full h-full", alt = "Authentic Nashik Shev Bhaji" }) => (
  <img
    src="https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&auto=format&fit=crop&q=80"
    alt={alt}
    className={`${className} object-cover`}
    referrerPolicy="no-referrer"
  />
);

export const DalMakhaniIllustration: React.FC<RealPhotoProps> = ({ className = "w-full h-full", alt = "Slow Cooked Dal Makhani with Butter" }) => (
  <img
    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80"
    alt={alt}
    className={`${className} object-cover`}
    referrerPolicy="no-referrer"
  />
);

export const VegCrispyIllustration: React.FC<RealPhotoProps> = ({ className = "w-full h-full", alt = "Golden Crispy Veg Indo-Chinese" }) => (
  <img
    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80"
    alt={alt}
    className={`${className} object-cover`}
    referrerPolicy="no-referrer"
  />
);

export const RabdiKulfiIllustration: React.FC<RealPhotoProps> = ({ className = "w-full h-full", alt = "Royal Kashmiri Rabdi Kulfi" }) => (
  <img
    src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80"
    alt={alt}
    className={`${className} object-cover`}
    referrerPolicy="no-referrer"
  />
);

export const RegionalSpecialtyIllustration: React.FC<{ type?: string; className?: string }> = ({ className = "w-full h-full" }) => (
  <img
    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80"
    alt="Nashik Regional Pure Veg Delicacy"
    className={`${className} object-cover`}
    referrerPolicy="no-referrer"
  />
);

export const KajuCurryIllustration: React.FC<RealPhotoProps> = ({ className = "w-full h-full", alt = "Royal Kaju Curry Masala" }) => (
  <img
    src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80"
    alt={alt}
    className={`${className} object-cover`}
    referrerPolicy="no-referrer"
  />
);

export const PalakPaneerIllustration: React.FC<RealPhotoProps> = ({ className = "w-full h-full", alt = "Farm Fresh Palak Paneer Lahsuni" }) => (
  <img
    src="https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80"
    alt={alt}
    className={`${className} object-cover`}
    referrerPolicy="no-referrer"
  />
);

export const KulchaCholeIllustration: React.FC<RealPhotoProps> = ({ className = "w-full h-full", alt = "Amritsari Butter Kulcha" }) => (
  <img
    src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80"
    alt={alt}
    className={`${className} object-cover`}
    referrerPolicy="no-referrer"
  />
);
