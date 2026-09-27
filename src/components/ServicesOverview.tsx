import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ServicesOverviewProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({
  onOpenReservation,
  onExploreMenu,
}) => {
  return (
    <section className="w-full bg-cream-canvas py-14 px-4 md:px-8" id="services">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-xs uppercase tracking-widest text-saffron-deep font-bold">
              Seamless Hospitality
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-headline-lg text-primary font-bold">
              Experience The Namastey Your Way
            </h2>
          </div>
          <p className="font-body-md text-sm sm:text-base text-charcoal-muted max-w-md">
            Whether you crave an intimate family dinner in our opulent dining room, curbside hot takeaway, or doorstep feast.
          </p>
        </div>

        {/* 3 Dining Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Dine In Experience */}
          <div className="rounded-2xl overflow-hidden bg-cream-card shadow-md flex flex-col group border border-outline-variant/30 transition-all duration-300 hover:shadow-lg">
            <div className="relative h-56 overflow-hidden">
              <img
                src={RESTAURANT_INFO.dineInImageUrl}
                alt="Dine-in family and romantic candlelit seating at The Namastey Nashik"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-xs font-bold shadow-xs">
                Premium Dine-In
              </span>
            </div>
            
            <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="font-title-lg text-lg font-bold text-primary">
                  Dine-In Romantic & Family Ambiance
                </h3>
                <p className="font-body-sm text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                  Soft sitar melodies, brass service trays, cooling air-conditioned interiors, and spacious family banquet seating.
                </p>
                <ul className="flex flex-col gap-1.5 pt-2 text-on-surface-variant font-label-sm text-xs">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-pure-veg-green text-[16px]">done</span>
                    <span>Candlelight booths available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-pure-veg-green text-[16px]">done</span>
                    <span>Dedicated Jain food preparation station</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onOpenReservation}
                className="w-full py-2.5 rounded-xl bg-peach-tint hover:bg-primary hover:text-on-primary text-primary font-bold text-xs sm:text-sm text-center transition-all cursor-pointer shadow-xs active:scale-98"
              >
                Reserve a Table
              </button>
            </div>
          </div>

          {/* Curbside Pick-up */}
          <div className="rounded-2xl overflow-hidden bg-cream-card shadow-md flex flex-col group border border-outline-variant/30 transition-all duration-300 hover:shadow-lg">
            <div className="relative h-56 overflow-hidden bg-surface-container-high flex items-center justify-center p-6">
              <div className="w-20 h-20 rounded-full bg-peach-tint flex items-center justify-center text-primary shadow-inner">
                <span className="material-symbols-outlined text-[42px]">takeout_dining</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-xs font-bold shadow-xs">
                Express Takeaway
              </span>
            </div>

            <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="font-title-lg text-lg font-bold text-primary">
                  Curbside Quick Pick-up
                </h3>
                <p className="font-body-sm text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                  Pre-order on WhatsApp or phone. Drive by our dedicated pickup bay and receive your food piping hot in 15 minutes.
                </p>
                <ul className="flex flex-col gap-1.5 pt-2 text-on-surface-variant font-label-sm text-xs">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-pure-veg-green text-[16px]">done</span>
                    <span>Spill-proof eco-friendly containers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-pure-veg-green text-[16px]">done</span>
                    <span>Contactless trunk loading service</span>
                  </li>
                </ul>
              </div>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.mobilePhoneRaw.replace('+', '')}?text=Hello%20The%20Namastey%20Nashik,%20I%20would%20like%20to%20order%20curbside%20pickup`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-bold text-xs sm:text-sm text-center transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-98"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Direct WhatsApp Pickup</span>
              </a>
            </div>
          </div>

          {/* Express Doorstep Delivery */}
          <div className="rounded-2xl overflow-hidden bg-cream-card shadow-md flex flex-col group border border-outline-variant/30 transition-all duration-300 hover:shadow-lg">
            <div className="relative h-56 overflow-hidden bg-surface-container flex items-center justify-center p-6">
              <div className="w-20 h-20 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shadow-inner">
                <span className="material-symbols-outlined text-[42px]">electric_moped</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-xs font-bold shadow-xs">
                Doorstep Express
              </span>
            </div>

            <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="font-title-lg text-lg font-bold text-primary">
                  Express Doorstep Delivery
                </h3>
                <p className="font-body-sm text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                  Insulated thermal bags maintain oven heat and freshness right to your doorstep anywhere across Nashik city.
                </p>
                <ul className="flex flex-col gap-1.5 pt-2 text-on-surface-variant font-label-sm text-xs">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-pure-veg-green text-[16px]">done</span>
                    <span>Live GPS tracking on WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-pure-veg-green text-[16px]">done</span>
                    <span>100% Ghee freshness intact guarantee</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onExploreMenu}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-saffron-vibrant text-on-primary font-bold text-xs sm:text-sm text-center transition-all shadow-xs cursor-pointer active:scale-98"
              >
                Order Online Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
