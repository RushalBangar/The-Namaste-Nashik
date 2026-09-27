import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { RestaurantHeroIllustration } from './DishIllustrations';

interface HeroProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onExploreMenu }) => {
  const [heroImgError, setHeroImgError] = useState(false);

  return (
    <section id="overview" className="relative w-full bg-surface-container-low overflow-hidden pt-4 sm:pt-8 pb-12 lg:pb-28">
      {/* Ambient Heritage Jali & Light Glows */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] bg-secondary-container/20 rounded-full blur-3xl pointer-events-none -ml-20"></div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-margin">
        
        {/* Breadcrumb & Purity Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 sm:pb-space-lg">
          <div className="flex items-center gap-1.5 font-label-md text-xs sm:text-label-md text-on-surface-variant truncate">
            <span>Lawate Nagar</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Nashik</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary font-semibold">The Namastey Nashik</span>
          </div>

          {/* 100% Pure Veg Pulsing Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-xs self-start sm:self-auto border border-tertiary/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary"></span>
            </span>
            <span className="inline-flex items-center justify-center w-3.5 h-3.5 border border-tertiary rounded-[2px] p-[1.5px]">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            </span>
            <span className="font-label-sm text-[10px] sm:text-label-sm text-tertiary font-bold tracking-wider uppercase">
              100% Pure Vegetarian · १००% शुद्ध शाकाहारी
            </span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-space-xl items-center">
          
          {/* Text & Action Area (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-space-md">
            
            {/* Inclusion & Community Badges */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-space-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high font-label-sm text-[11px] sm:text-label-sm text-primary font-semibold">
                <span className="material-symbols-outlined text-[14px] sm:text-[15px]">female</span>
                Women-Owned
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high font-label-sm text-[11px] sm:text-label-sm text-on-surface font-semibold">
                <span className="material-symbols-outlined text-[14px] sm:text-[15px] text-secondary">favorite</span>
                LGBTQ+ Welcoming Space
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high font-label-sm text-[11px] sm:text-label-sm text-secondary font-semibold">
                <span className="material-symbols-outlined text-[14px] sm:text-[15px]">family_restroom</span>
                Safe Family Dining
              </span>
              <a
                href="#reviews"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] sm:text-label-sm font-bold shadow-xs hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined text-[14px] sm:text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                4.6 (2,214+ Reviews)
              </a>
            </div>

            <h1 className="font-display-lg text-2xl sm:text-4xl md:text-5xl lg:text-display-lg text-on-surface tracking-tight leading-[1.15]">
              Nashik's Premier Pure Veg <span className="italic text-primary font-serif">Gastronomic</span> Experience.
            </h1>

            <p className="font-body-md text-xs sm:text-base lg:text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Welcome to <strong className="text-on-surface font-semibold">The Namastey Nashik (थे नमस्ते नाशिक)</strong>. Experience authentic vegetarian flavors crafted with farm-fresh produce, traditional hospitality, and inclusive warmth in the heart of Lawate Nagar.
            </p>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-space-sm pt-1">
              <button
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-lg text-xs sm:text-sm font-bold shadow-md active:scale-[0.98] transition-all cursor-pointer min-h-[46px]"
                onClick={onOpenReservation}
              >
                <span className="material-symbols-outlined text-[20px]">table_restaurant</span>
                <span>Reserve a Table</span>
              </button>

              <button
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-container-highest text-on-surface hover:bg-surface-container active:scale-[0.98] rounded-xl font-label-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer min-h-[46px]"
                onClick={onExploreMenu}
              >
                <span className="material-symbols-outlined text-[20px] text-secondary">restaurant_menu</span>
                <span>Explore Menu & Order</span>
              </button>

              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-surface-container-lowest text-on-surface hover:text-primary rounded-xl font-label-lg text-xs sm:text-sm font-semibold shadow-xs transition-all border border-outline-variant/30 min-h-[46px]"
                href="#location-section"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">directions</span>
                <span>Get Directions</span>
              </a>

              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-secondary hover:text-on-surface font-label-lg text-xs sm:text-sm font-semibold transition-colors min-h-[44px]"
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>{RESTAURANT_INFO.phone}</span>
              </a>
            </div>

            {/* Quick Service Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-space-sm pt-2 sm:pt-space-md max-w-xl">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-container-lowest/90 border border-outline-variant/30 shadow-xs">
                <span className="material-symbols-outlined text-[22px] text-tertiary shrink-0">soup_kitchen</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-[12px] font-bold text-on-surface truncate">100% Satvik & Jain</span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant leading-none truncate">Separate prep on call</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-container-lowest/90 border border-outline-variant/30 shadow-xs">
                <span className="material-symbols-outlined text-[22px] text-secondary shrink-0">local_parking</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-[12px] font-bold text-on-surface truncate">Private Parking</span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant leading-none truncate">Drive-through bay</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-container-lowest/90 border border-outline-variant/30 shadow-xs">
                <span className="material-symbols-outlined text-[22px] text-primary shrink-0">delivery_dining</span>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-[12px] font-bold text-on-surface truncate">Thermal Sealed</span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant leading-none truncate">Zero contact delivery</span>
                </div>
              </div>
            </div>

          </div>

          {/* Centerpiece Visual Composition (5 cols) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-high aspect-[4/3] sm:aspect-[4/5] max-h-[440px] sm:max-h-none group">
              {heroImgError ? (
                <RestaurantHeroIllustration className="w-full h-full" />
              ) : (
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={RESTAURANT_INFO.heroImageUrl}
                  alt="Luxurious dining hall at The Namastey Nashik featuring polished brass thalis set on teakwood tables, soft pendant brass lanterns glowing with warm amber light, welcoming upscale pure vegetarian ambiance"
                  onError={() => setHeroImgError(true)}
                  referrerPolicy="no-referrer"
                />
              )}
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-transparent to-black/20 pointer-events-none"></div>

              {/* Floating Stamp Card Overlap */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-space-md rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-lg flex items-center justify-between gap-2 border border-outline-variant/30">
                <div className="flex items-center gap-2 sm:gap-space-sm min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
                    <span className="material-symbols-outlined text-[22px] sm:text-[28px]">dinner_dining</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-headline-sm text-sm sm:text-[16px] leading-tight text-on-surface truncate">
                      Maharashtrian Shahi Thali
                    </h4>
                    <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant truncate">
                      Signature bronze katori ensemble
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-headline-sm text-base sm:text-headline-sm text-primary font-bold">₹260</span>
                  <span className="block font-label-sm text-[10px] sm:text-label-sm text-tertiary font-semibold uppercase">
                    Lunch & Dinner
                  </span>
                </div>
              </div>

              {/* Floating Trust Badge Top Right */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-md flex items-center gap-1.5 border border-outline-variant/30">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <span className="font-label-sm text-[11px] sm:text-label-sm font-bold text-on-surface">FSSAI Certified</span>
              </div>
            </div>

            {/* Decorative Accent Ribbon */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-secondary-fixed/40 -z-10 rotate-6 hidden sm:block"></div>
          </div>

        </div>

      </div>
    </section>
  );
};
