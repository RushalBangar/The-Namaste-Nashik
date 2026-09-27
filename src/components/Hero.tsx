import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, onExploreMenu }) => {
  return (
    <div id="overview" className="w-full flex flex-col">
      {/* Top Luxury Alert / Announcement */}
      <section className="w-full bg-cream-surface py-2.5 px-4 text-center border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 text-charcoal-muted">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-peach-tint/60 text-primary font-label-md text-xs sm:text-label-md font-semibold">
            <span className="material-symbols-outlined text-[15px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              workspace_premium
            </span>
            Food Connoisseur Award 2024
          </span>
          <span className="font-body-sm text-xs sm:text-body-sm font-semibold text-primary">
            Voted #1 Pure Vegetarian Dining Destination in Nashik
          </span>
          <span className="hidden md:inline text-outline-variant">•</span>
          <span className="hidden md:inline font-body-sm text-xs sm:text-body-sm text-charcoal-muted">
            Table reservations recommended for weekend evenings
          </span>
        </div>
      </section>

      {/* Hero Section with Bespoke Split Layout */}
      <section className="relative w-full overflow-hidden bg-cream-canvas py-10 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Content Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Trust Badges Strip */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach-tint text-primary font-label-md text-xs sm:text-label-md font-semibold">
                <span className="material-symbols-outlined text-[16px]">verified</span> 100% Pure Ghee
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-xs sm:text-label-md font-semibold">
                <span className="material-symbols-outlined text-[16px]">eco</span> Farm Fresh Produce
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-xs sm:text-label-md font-semibold">
                <span className="material-symbols-outlined text-[16px]">sanitizer</span> Hygienic Kitchen
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs sm:text-label-md font-semibold">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.8 ★ Rated (2,400+)
              </span>
            </div>

            {/* Headline & Editorial Storytelling */}
            <div className="flex flex-col gap-3">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-display text-primary tracking-tight leading-tight">
                Nashik's Premier Pure Veg <br className="hidden sm:inline" />
                <span className="italic font-display text-saffron-deep">Gastronomic Experience.</span>
              </h1>
              <p className="font-body-lg text-base sm:text-body-lg text-charcoal-muted max-w-2xl leading-relaxed">
                A culinary journey rooted in authentic Indian flavors, crafted with pure organic spices, clarified butter, and garden-fresh ingredients. Experience true Maharashtra warmth and royal Indian hospitality.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-primary hover:bg-saffron-vibrant text-on-primary font-bold text-sm sm:text-base shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
                <span>Explore Full Menu</span>
              </button>

              <button
                onClick={onOpenReservation}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-surface-container-lowest hover:bg-peach-tint/50 text-primary border border-primary/20 font-bold text-sm sm:text-base shadow-xs transition-all hover:shadow-md cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">table_restaurant</span>
                <span>Book Your Table</span>
              </button>

              <div className="flex items-center gap-2 pl-1 sm:pl-2 text-on-surface-variant font-label-md text-xs sm:text-label-md">
                <div className="w-2.5 h-2.5 rounded-full bg-pure-veg-green animate-pulse"></div>
                <span className="font-semibold text-pure-veg-green">Table Wait Time: &lt; 10 Mins</span>
              </div>
            </div>

            {/* Quick Glance Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="p-3.5 sm:p-4 rounded-xl bg-cream-surface border border-outline-variant/30 flex flex-col">
                <span className="font-display text-2xl sm:text-headline-md text-primary font-bold">25+</span>
                <span className="font-label-sm text-[10px] sm:text-label-sm text-charcoal-muted uppercase tracking-wider font-semibold mt-0.5">
                  Years Culinary Heritage
                </span>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-cream-surface border border-outline-variant/30 flex flex-col">
                <span className="font-display text-2xl sm:text-headline-md text-primary font-bold">100%</span>
                <span className="font-label-sm text-[10px] sm:text-label-sm text-charcoal-muted uppercase tracking-wider font-semibold mt-0.5">
                  Desi Ghee Prepared
                </span>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-cream-surface border border-outline-variant/30 flex flex-col">
                <span className="font-display text-2xl sm:text-headline-md text-primary font-bold">140+</span>
                <span className="font-label-sm text-[10px] sm:text-label-sm text-charcoal-muted uppercase tracking-wider font-semibold mt-0.5">
                  Authentic Veg Curations
                </span>
              </div>
            </div>

          </div>

          {/* Right Feature Visual Lounge (5 cols) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl group border border-outline-variant/30">
              <img
                src={RESTAURANT_INFO.heroImageUrl}
                alt="The Namastey Nashik warm regal fine dining lounge interior"
                className="w-full h-[360px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-md flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-pure-veg-green"></span>
                <span className="font-label-sm text-xs text-on-surface uppercase tracking-wider font-bold">
                  100% Sattvic Ready
                </span>
              </div>

              <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 p-4 rounded-xl bg-surface/95 backdrop-blur-md shadow-lg flex items-center justify-between gap-3">
                <div className="flex flex-col min-w-0">
                  <span className="font-title-lg text-base sm:text-title-lg text-primary font-bold truncate">
                    Signature Dining Lounge
                  </span>
                  <span className="font-body-sm text-xs sm:text-body-sm text-charcoal-muted truncate">
                    Chandeliers, brass tableware & family seating
                  </span>
                </div>
                <button
                  onClick={onOpenReservation}
                  className="p-2.5 rounded-lg bg-peach-tint text-primary hover:bg-primary hover:text-on-primary transition-colors cursor-pointer shrink-0"
                  title="Reserve Table in Lounge"
                >
                  <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
