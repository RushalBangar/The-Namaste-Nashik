import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationSection: React.FC = () => {
  const [copiedAddr, setCopiedAddr] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address).then(() => {
      setCopiedAddr(true);
      setTimeout(() => setCopiedAddr(false), 2000);
    });
  };

  return (
    <section className="w-full bg-surface-container-low py-16 px-4 md:px-8 border-t border-outline-variant/30" id="location-section">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-xs uppercase tracking-widest text-saffron-deep font-bold">
              Visit The Sanctuary
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-headline-lg text-primary font-bold">
              Centrally Located in Nashik
            </h2>
          </div>
          <p className="font-body-md text-sm sm:text-base text-charcoal-muted max-w-md">
            Easy ground-floor access with valet parking available for diners on Thatte Nagar Main Road.
          </p>
        </div>

        {/* Content Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Cards Bento (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="p-6 rounded-2xl bg-cream-card shadow-xs border border-outline-variant/30 flex flex-col gap-4">
              
              {/* Address Block */}
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[28px] mt-0.5 shrink-0">
                  location_on
                </span>
                <div className="flex flex-col">
                  <span className="font-title-lg text-base sm:text-title-lg text-primary font-bold">
                    Restaurant Address
                  </span>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface pt-1 leading-relaxed">
                    {RESTAURANT_INFO.address}
                  </p>
                  <span className="font-label-sm text-xs text-charcoal-muted pt-1">
                    Landmark: {RESTAURANT_INFO.landmark}
                  </span>
                </div>
              </div>

              {/* Timings */}
              <div className="pt-2 flex flex-col gap-3 border-t border-surface-container">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                    schedule
                  </span>
                  <div>
                    <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface">
                      Operating Hours:
                    </span>
                    <span className="font-body-sm text-xs sm:text-sm text-charcoal-muted pl-1.5">
                      {RESTAURANT_INFO.hours}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                    restaurant
                  </span>
                  <div>
                    <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface">
                      Thali Service:
                    </span>
                    <span className="font-body-sm text-xs sm:text-sm text-charcoal-muted pl-1.5">
                      {RESTAURANT_INFO.thaliHours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-surface-container">
                <a
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary hover:bg-saffron-vibrant text-on-primary font-bold text-xs sm:text-sm transition-colors shadow-xs"
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[18px]">directions</span>
                  <span>Get Directions</span>
                </a>

                <a
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-peach-tint text-primary hover:bg-primary hover:text-on-primary font-bold text-xs sm:text-sm transition-colors border border-primary/20"
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>{RESTAURANT_INFO.phone}</span>
                </a>

                <button
                  onClick={copyAddress}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-semibold text-xs transition-colors cursor-pointer"
                  title="Copy Address"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedAddr ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedAddr ? 'Copied' : 'Copy'}</span>
                </button>

                <a
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-pure-veg-green text-on-tertiary hover:bg-tertiary-container font-bold text-xs sm:text-sm transition-colors shadow-xs"
                  href={`https://wa.me/${RESTAURANT_INFO.mobilePhoneRaw.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Valet & Amenities Mini Bento */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-cream-card shadow-xs border border-outline-variant/30 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]">local_parking</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface">Valet Parking</span>
                  <span className="font-body-sm text-[11px] sm:text-xs text-charcoal-muted">Complimentary</span>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-cream-card shadow-xs border border-outline-variant/30 flex items-center gap-3">
                <span className="material-symbols-outlined text-pure-veg-green text-[24px]">wifi</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface">High Speed Wi-Fi</span>
                  <span className="font-body-sm text-[11px] sm:text-xs text-charcoal-muted">For Guests</span>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Map View (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-md flex flex-col border border-outline-variant/30 min-h-[360px] relative">
            <div
              className="w-full h-80 lg:h-full min-h-[360px] bg-cover bg-center relative"
              style={{ backgroundImage: `url('${RESTAURANT_INFO.mapImageUrl}')` }}
            >
              <div className="absolute bottom-4 left-4 p-3.5 rounded-xl bg-surface/90 backdrop-blur-md shadow-md text-on-surface flex items-center gap-2 border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary text-[22px]">pin_drop</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-xs font-bold text-on-surface">
                    The Namastey Nashik
                  </span>
                  <span className="text-[11px] text-charcoal-muted">
                    Thatte Nagar & Lawate Nagar, Nashik
                  </span>
                </div>
              </div>

              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-surface/90 backdrop-blur-md text-primary font-bold text-xs shadow-xs flex items-center gap-1 hover:bg-primary hover:text-on-primary transition-all"
              >
                <span>View Full Map</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
