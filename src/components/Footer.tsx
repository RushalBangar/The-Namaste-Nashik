import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { RestaurantLogo } from './RestaurantLogo';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-8">
        
        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: About & Purity */}
          <div className="flex flex-col gap-4">
            <RestaurantLogo size="md" showSubtitle={true} />
            <p className="font-body-md text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              Nashik's premier luxury pure vegetarian culinary sanctuary. Rooted in authentic Vedic cooking principles, slow-crafted in pure desi ghee, and elevated for contemporary epicurean indulgence.
            </p>
            <div className="flex items-center gap-2 text-pure-veg-green font-label-md text-xs sm:text-sm font-semibold">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>100% Certified Pure Vegetarian Kitchen</span>
            </div>
          </div>

          {/* Col 2: Gastronomic Journey */}
          <div className="flex flex-col gap-4">
            <span className="font-title-lg text-base sm:text-title-lg text-primary font-bold">
              Gastronomic Journey
            </span>
            <div className="flex flex-col gap-2 font-body-sm text-xs sm:text-sm text-on-surface-variant">
              <a className="hover:text-primary transition-colors" href="#overview">
                Home
              </a>
              <a className="hover:text-primary transition-colors" href="#services">
                Our Culinary Heritage
              </a>
              <a className="hover:text-primary transition-colors" href="#menu-explorer">
                Gourmet Menu
              </a>
              <a className="hover:text-primary transition-colors" href="#menu-explorer">
                Signature Creations
              </a>
              <a className="hover:text-primary transition-colors" href="#services">
                Royal Ambience
              </a>
              <a className="hover:text-primary transition-colors" href="#reviews">
                Guest Testimonials
              </a>
              <a className="hover:text-primary transition-colors" href="#faqs">
                Dining FAQs
              </a>
            </div>
          </div>

          {/* Col 3: Timings & Service */}
          <div className="flex flex-col gap-4">
            <span className="font-title-lg text-base sm:text-title-lg text-primary font-bold">
              Timings & Service
            </span>
            
            <div className="flex items-start gap-2.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                schedule
              </span>
              <div>
                <p className="font-label-md text-xs sm:text-sm text-on-surface font-semibold">Dining Hours</p>
                <p className="font-body-md text-xs text-charcoal-muted">Monday - Sunday</p>
                <p className="font-body-md text-xs text-charcoal-muted">11:30 AM – 11:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                dinner_dining
              </span>
              <div>
                <p className="font-label-md text-xs sm:text-sm text-on-surface font-semibold">Thali Service</p>
                <p className="font-body-md text-xs text-charcoal-muted">Lunch: 12:00 PM - 3:30 PM</p>
                <p className="font-body-md text-xs text-charcoal-muted">Dinner: 7:00 PM - 10:30 PM</p>
              </div>
            </div>

            <button
              onClick={onOpenReservation}
              className="text-left font-label-md text-xs text-primary font-bold hover:underline cursor-pointer pt-1"
            >
              Reserve a Table Online →
            </button>
          </div>

          {/* Col 4: Visit & Connect */}
          <div className="flex flex-col gap-4">
            <span className="font-title-lg text-base sm:text-title-lg text-primary font-bold">
              Visit & Connect
            </span>

            <div className="flex items-start gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                location_on
              </span>
              <p className="font-body-md text-xs text-charcoal-muted leading-relaxed">
                {RESTAURANT_INFO.address}
              </p>
            </div>

            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                call
              </span>
              <a
                className="font-body-md text-xs font-semibold text-charcoal-muted hover:text-primary transition-colors"
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              >
                {RESTAURANT_INFO.phone}
              </a>
              <span className="text-charcoal-muted">•</span>
              <a
                className="font-body-md text-xs font-semibold text-charcoal-muted hover:text-primary transition-colors"
                href={`tel:${RESTAURANT_INFO.mobilePhoneRaw}`}
              >
                {RESTAURANT_INFO.mobilePhone}
              </a>
            </div>

            <div className="pt-1">
              <a
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-pure-veg-green hover:bg-tertiary-container text-on-tertiary font-bold text-xs transition-colors shadow-xs"
                href={`https://wa.me/${RESTAURANT_INFO.mobilePhoneRaw.replace('+', '')}?text=Hello%20The%20Namastey%20Nashik,%20I%20would%20like%20to%20place%20an%20order`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Direct WhatsApp Order</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-surface-container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="font-body-sm text-xs text-charcoal-muted">
            © The Namastey Nashik Pure Veg. All rights reserved. Crafted for extraordinary vegetarian fine dining.
          </p>
          <div className="flex items-center gap-4 text-xs text-charcoal-muted">
            <a className="hover:text-primary transition-colors" href="#location-section">
              Privacy Policy
            </a>
            <span>•</span>
            <a className="hover:text-primary transition-colors" href="#location-section">
              Terms of Hospitality
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
