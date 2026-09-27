import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';

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
    { id: 'overview', label: 'Overview', href: '#overview' },
    { id: 'signature-menu', label: 'Menu', href: '#signature-menu' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'reviews', label: 'Reviews', href: '#reviews' },
    { id: 'location-section', label: 'Location', href: '#location-section' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/60 transition-all">
        {/* Top Announcement Ribbon */}
        <div className="bg-primary-container text-on-primary-container py-1 px-3 text-center font-label-sm text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 sm:gap-2 tracking-wide border-b border-primary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-pulse shrink-0"></span>
          <span className="truncate">100% Pure Veg Dining · Lawate Nagar, Nashik</span>
          <span className="hidden md:inline opacity-60">•</span>
          <span className="hidden md:inline">Women-Owned & LGBTQ+ Welcoming</span>
          <span className="opacity-60">•</span>
          <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="underline font-bold shrink-0 hover:text-primary-fixed">
            0253 299 5031
          </a>
        </div>

        <div className="h-16 sm:h-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-margin flex items-center justify-between gap-2 sm:gap-space-md">
          
          {/* Brand Logo & Title */}
          <a className="flex items-center gap-2 sm:gap-space-sm group focus:outline-hidden min-w-0" href="#overview">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-200 shrink-0">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">temple_hindu</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1 sm:gap-space-xs">
                <span className="font-headline-sm text-sm sm:text-headline-sm text-on-surface tracking-tight leading-none truncate">
                  The Namastey Nashik
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 sm:w-3.5 sm:h-3.5 border border-tertiary rounded-[2px] p-[1.5px] ml-0.5 shrink-0" title="100% Pure Vegetarian">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                </span>
              </div>
              <span className="font-label-sm text-[10px] sm:text-label-sm text-secondary tracking-wider font-semibold uppercase mt-0.5 truncate">
                थे नमस्ते नाशिक · Pure Veg
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-space-sm">
            {navLinks.map((link) => (
              <a
                key={link.id}
                className={`px-space-md py-space-xs transition-colors rounded-lg font-label-lg text-label-lg ${
                  activeSection === link.id
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-space-sm shrink-0">
            {/* Phone link on desktop/tablet */}
            <a
              className="hidden md:flex items-center gap-space-xs px-3 py-1.5 text-on-surface hover:text-primary transition-colors font-label-md text-label-md whitespace-nowrap"
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">call</span>
              <span>{RESTAURANT_INFO.phone}</span>
            </a>

            {/* Bag Button */}
            <button
              aria-label="Order Bag"
              onClick={onOpenCart}
              className="relative p-2 sm:p-space-xs rounded-full hover:bg-surface-container active:scale-95 transition-all text-on-surface flex items-center justify-center cursor-pointer min-h-[40px] min-w-[40px]"
            >
              <span className="material-symbols-outlined text-[22px] sm:text-[24px]">shopping_bag</span>
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px] flex items-center justify-center font-bold shadow-xs">
                {cartCount}
              </span>
            </button>

            {/* Book Table Button (Desktop) */}
            <button
              onClick={onOpenReservation}
              className="hidden sm:inline-flex items-center justify-center px-space-md py-2.5 bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container rounded-lg font-label-lg text-label-lg transition-colors duration-200 shadow-[0_2px_8px_rgba(164,53,0,0.18)] cursor-pointer"
            >
              Book Table
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container active:bg-surface-container-high transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
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
