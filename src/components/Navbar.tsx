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
      const sections = ['overview', 'menu-explorer', 'services', 'reviews', 'location-section', 'faqs'];
      const scrollY = window.scrollY + 120;
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
    { id: 'menu-explorer', label: 'Menu', href: '#menu-explorer' },
    { id: 'services', label: 'Dining Experience', href: '#services' },
    { id: 'reviews', label: 'Reviews', href: '#reviews' },
    { id: 'location-section', label: 'Location & Hours', href: '#location-section' },
    { id: 'faqs', label: 'FAQs', href: '#faqs' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/98 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)] border-b border-outline-variant/30 transition-all">
        
        {/* Top Luxury Announcement Ribbon */}
        <div className="bg-gradient-to-r from-[#803100] via-[#944600] to-[#803100] text-cream-surface py-1.5 px-3 sm:px-4 text-center font-label-sm text-[11px] sm:text-xs tracking-wider uppercase border-b border-primary/20 shadow-inner">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-[#fed65b] text-[12px] font-bold">★</span>
            <span className="font-semibold text-white/95">PURE VEG GASTRONOMY</span>
            <span className="text-white/40">•</span>
            <span className="hidden sm:inline text-white/90">100% PURE GHEE & FRESH FARM PRODUCE</span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="text-white/90">RESERVATIONS:</span>
            <a
              href="tel:+919823045678"
              className="font-bold text-white hover:text-[#fed65b] transition-colors underline decoration-white/40 underline-offset-2"
            >
              +91 98230 45678
            </a>
            <span className="text-white/40">•</span>
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="font-bold text-white hover:text-[#fed65b] transition-colors underline decoration-white/40 underline-offset-2"
            >
              {RESTAURANT_INFO.phone}
            </a>
            <span className="text-[#fed65b] text-[12px] font-bold">★</span>
          </div>
        </div>

        {/* Main Navbar Bar */}
        <div className="h-16 sm:h-[72px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Title */}
          <a
            href="#overview"
            className="flex items-center group focus:outline-hidden min-w-0 shrink-0 transition-opacity hover:opacity-95"
            aria-label="The Namastey Nashik Homepage"
          >
            <RestaurantLogo size="md" showSubtitle={true} />
          </a>

          {/* Desktop Navigation Links (Clean, Single Line, No Clunky Blocks) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-3.5 py-2 font-label-lg text-[13.5px] xl:text-[14px] whitespace-nowrap transition-colors rounded-lg group ${
                    isActive
                      ? 'text-primary font-bold'
                      : 'text-charcoal-muted hover:text-primary font-semibold hover:bg-peach-tint/20'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Subtle, elegant luxury underline indicator */}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3.5 right-3.5 h-[2.5px] bg-primary rounded-full animate-in fade-in duration-200"></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Book Table CTA */}
            <button
              onClick={onOpenReservation}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl border border-primary/30 bg-surface-container-lowest hover:bg-peach-tint/40 text-primary text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer min-h-[40px] active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">table_restaurant</span>
              <span className="whitespace-nowrap">Book Table</span>
            </button>

            {/* Order Bag CTA with Counter */}
            <button
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-saffron-deep hover:from-saffron-deep hover:to-primary text-on-primary text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer min-h-[40px] active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[19px]">shopping_bag</span>
              <span className="hidden md:inline whitespace-nowrap">Order Bag</span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-xs font-bold leading-none shadow-xs">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center border border-outline-variant/30"
              aria-label="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-surface-container bg-surface/98 backdrop-blur-md px-4 py-4 space-y-1 shadow-xl animate-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-peach-tint/60 text-primary font-bold'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <div className="pt-3 mt-2 flex flex-col gap-2 border-t border-surface-container">
              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-outline-variant/50 text-on-surface text-xs font-bold bg-surface-container-lowest"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                <span>Call Restaurant: {RESTAURANT_INFO.phone}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">table_restaurant</span>
                <span>Reserve a Table Online</span>
              </button>
            </div>
          </div>
        )}

      </header>
    </>
  );
};
