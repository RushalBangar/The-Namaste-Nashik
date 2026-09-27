import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { RestaurantLogo } from './RestaurantLogo';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-surface-container-low border-t border-surface-container">
      <div className="max-w-[1280px] mx-auto px-margin-sm lg:px-margin pt-space-xl pb-space-lg">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl pb-space-xl">
          
          {/* Brand & Culture (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start gap-space-md">
            <RestaurantLogo size="lg" showSubtitle={true} />

            <p className="font-body-md text-body-md text-charcoal-muted max-w-md pt-1">
              Nashik's premier luxury pure vegetarian culinary sanctuary. Rooted in authentic Vedic cooking principles, slow-crafted in pure desi ghee, and elevated for contemporary epicurean indulgence.
            </p>

            <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
              <span className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-primary font-semibold">
                <span className="material-symbols-outlined text-[16px]">female</span>
                Women-Owned
              </span>
              <span className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface font-semibold">
                <span className="material-symbols-outlined text-[16px] text-secondary">favorite</span>
                LGBTQ+ Friendly
              </span>
              <span className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-tertiary font-semibold">
                <span className="material-symbols-outlined text-[16px]">eco</span>
                100% Pure Veg Certified
              </span>
            </div>
          </div>

          {/* Visit & Connect (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-space-sm">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Visit & Connect
            </h3>
            <div className="flex items-start gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5">location_on</span>
              <p>{RESTAURANT_INFO.address}</p>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[20px] text-primary shrink-0">schedule</span>
              <p>Open Daily: 11:00 AM – 11:00 PM</p>
            </div>
            <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[20px] text-primary shrink-0">phone</span>
              <a className="hover:text-primary transition-colors font-semibold" href={`tel:${RESTAURANT_INFO.phoneRaw}`}>
                {RESTAURANT_INFO.phone}
              </a>
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Quick Navigation
            </h3>
            <div className="flex flex-col gap-space-xs">
              <a className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors" href="#overview">
                Overview
              </a>
              <a className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors" href="#signature-menu">
                Artisanal Menu
              </a>
              <a className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors" href="#services">
                Banqueting & Catering
              </a>
              <a className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors" href="#reviews">
                Guest Reviews
              </a>
              <a className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors" href="#location-section">
                Find Directions
              </a>
              <button
                className="font-label-lg text-label-lg text-primary hover:text-primary-container font-semibold transition-colors mt-space-xs text-left cursor-pointer"
                onClick={onOpenReservation}
              >
                Reserve a Thali Table →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md bg-surface-container-high/40 rounded-xl px-space-lg py-space-md border border-outline-variant/20">
          <div className="font-label-sm text-label-sm text-on-surface-variant text-center sm:text-left">
            © 2026 The Namastey Nashik. All pure vegetarian rights reserved. Handcrafted in Nashik.
          </div>
          <button
            className="inline-flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            onClick={scrollToTop}
          >
            <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
            <span>Back to top</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
