import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { RestaurantLogo } from './RestaurantLogo';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenReservation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'signature-menu', 'services', 'reviews', 'location-section'];
      const scrollY = window.scrollY + 100;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'overview', label: 'Home', href: '#overview' },
    { id: 'our-story', label: 'Our Story', href: '#services' },
    { id: 'menu', label: 'Menu', href: '#menu-explorer' },
    { id: 'signature-dishes', label: 'Signature Dishes', href: '#menu-explorer' },
    { id: 'dining-experience', label: 'Dining Experience', href: '#services' },
    { id: 'reviews', label: 'Reviews', href: '#reviews' },
    { id: 'location-section', label: 'Contact & Location', href: '#location-section' },
    { id: 'faqs', label: 'FAQs', href: '#faqs' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/60 transition-all">
        {/* Top Luxury Announcement Ribbon */}
        <div className="bg-saffron-deep text-on-primary py-1.5 px-3 text-center font-label-sm text-[11px] sm:text-xs tracking-wider uppercase flex items-center justify-center gap-2 border-b border-primary/20">
          <span className="material-symbols-outlined text-[14px]">hotel_class</span>
          <span className="truncate">Pure Veg Gastronomy • 100% Pure Ghee & Fresh Farm Produce • Call for Table Reservations: +91 98230 45678</span>
          <span className="hidden md:inline">•</span>
          <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="hidden md:inline font-bold underline hover:text-peach-tint">
            {RESTAURANT_INFO.phone}
          </a>
          <span className="material-symbols-outlined text-[14px]">hotel_class</span>
        </div>

        <div className="h-16 sm:h-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-margin flex items-center justify-between gap-2 sm:gap-space-md">
          
          {/* Brand Logo & Title with Official Logo */}
          <a className="flex items-center group focus:outline-hidden min-w-0" href="#overview">
            <RestaurantLogo size="md" showSubtitle={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-space-sm">
            {navLinks.map((link) => (
              <a
                key={link.id}
                className={`px-3 py-1.5 transition-colors rounded-lg font-label-lg text-xs sm:text-sm font-semibold ${
                  activeSection === link.id
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                }`}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-primary text-primary hover:bg-peach-tint/40 text-xs sm:text-sm font-bold transition-all cursor-pointer min-h-[40px]"
            >
              <span className="material-symbols-outlined text-[18px]">table_restaurant</span>
              <span>Book Table</span>
            </button>

            <button
              onClick={onOpenCart}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-primary hover:bg-saffron-vibrant text-on-primary text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer min-h-[40px] active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">shopping_bag</span>
              <span className="hidden xs:inline">Order Bag</span>
              <span className="px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-bold leading-none">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-surface-container bg-surface/98 backdrop-blur-md px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  activeSection === link.id
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface hover:bg-surface-container'
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-2 border-t border-surface-container">
              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-3 rounded-lg border border-outline-variant/60 text-on-surface font-label-md bg-surface-container-lowest"
              >
                <span className="material-symbols-outlined text-[20px] text-secondary">call</span>
                <span>Call {RESTAURANT_INFO.phone}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3 rounded-lg bg-primary text-on-primary font-label-lg font-bold shadow-md active:bg-primary-container"
              >
                Book Table
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop for mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs xl:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};
