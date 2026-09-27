/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VegPillars } from './components/VegPillars';
import { ServicesOverview } from './components/ServicesOverview';
import { MenuSection } from './components/MenuSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { OrderDrawer } from './components/OrderDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { MenuItem, CartItem } from './types';
import { RESTAURANT_INFO } from './data/restaurantData';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('namastey_nashik_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [confirmOrderState, setConfirmOrderState] = useState<{
    isOpen: boolean;
    items: CartItem[];
    serviceType?: 'takeaway' | 'delivery' | 'dinein';
    isFromCart?: boolean;
  }>({
    isOpen: false,
    items: [],
    serviceType: 'delivery',
    isFromCart: false,
  });

  useEffect(() => {
    try {
      localStorage.setItem('namastey_nashik_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalCartPrice = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  const handleAddToCart = (item: MenuItem, jainPrep = false) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1, jainPrep }];
    });
  };

  const handleOpenDirectOrder = (item: MenuItem, jainPrep = false) => {
    setConfirmOrderState({
      isOpen: true,
      items: [{ item, quantity: 1, jainPrep }],
      serviceType: 'delivery',
      isFromCart: false,
    });
  };

  const handleProceedCartToConfirm = (serviceType: 'takeaway' | 'delivery') => {
    setIsOrderDrawerOpen(false);
    setConfirmOrderState({
      isOpen: true,
      items: [...cart],
      serviceType,
      isFromCart: true,
    });
  };

  const handleOrderSuccess = () => {
    if (confirmOrderState.isFromCart) {
      setCart([]);
    }
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const handleToggleJain = (id: string) => {
    setCart((prev) =>
      prev.map((ci) => (ci.item.id === id ? { ...ci, jainPrep: !ci.jainPrep } : ci))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('signature-menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-body-md antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      
      {/* Top Fixed Header */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsOrderDrawerOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      <main className="w-full pt-24 sm:pt-28 bg-surface min-h-[calc(100vh-20rem)] pb-24 sm:pb-0">
        {/* Hero Section */}
        <Hero
          onOpenReservation={() => setIsReservationOpen(true)}
          onExploreMenu={scrollToMenu}
        />

        {/* Pure Veg Quality Pillars */}
        <VegPillars />

        {/* 3 Channels: Experience Your Way */}
        <ServicesOverview
          onOpenReservation={() => setIsReservationOpen(true)}
          onExploreMenu={scrollToMenu}
        />

        {/* Signature Artisanal Menu */}
        <MenuSection
          onAddToCart={handleAddToCart}
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
          onOrderNow={handleOpenDirectOrder}
        />

        {/* Verified Diner Reviews */}
        <ReviewsSection />

        {/* Location & Directions */}
        <LocationSection />

        {/* SEO & Diner Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <div className="pb-16 sm:pb-0">
        <Footer onOpenReservation={() => setIsReservationOpen(true)} />
      </div>

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Slide-over Dining Bag Drawer */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onToggleJain={handleToggleJain}
        onClearCart={handleClearCart}
        onProceedToConfirm={handleProceedCartToConfirm}
      />

      {/* Enter Name & Location Direct Order Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={confirmOrderState.isOpen}
        onClose={() => setConfirmOrderState((prev) => ({ ...prev, isOpen: false }))}
        items={confirmOrderState.items}
        defaultServiceType={confirmOrderState.serviceType}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Sticky Floating Order Summary Strip (Both Mobile & Desktop when cart has items) */}
      {totalCartCount > 0 && (
        <aside
          id="sticky-order-bar"
          className="fixed bottom-16 sm:bottom-6 left-4 right-4 md:left-auto md:right-8 md:w-96 z-40 bg-surface/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-outline-variant/30 transition-all duration-300 animate-in slide-in-from-bottom-6"
        >
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setIsOrderDrawerOpen(true)}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <div className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-bold shadow-xs">
                  {totalCartCount}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-xs text-charcoal-muted">Your Order Subtotal</span>
                <span className="font-title-lg text-base sm:text-lg text-primary font-bold">
                  ₹{totalCartPrice}
                </span>
              </div>
            </button>
            <button
              onClick={() => handleProceedCartToConfirm('delivery')}
              className="px-5 py-2.5 rounded-xl bg-pure-veg-green hover:bg-tertiary-container text-on-tertiary font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer active:scale-95"
            >
              <span>Checkout</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </aside>
      )}

      {/* Mobile Sticky Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 px-3 py-2 bg-surface-container-lowest/95 backdrop-blur-md border-t border-surface-container flex items-center justify-between gap-2 text-xs shadow-lg pb-safe">
        <a
          href={`tel:${RESTAURANT_INFO.phoneRaw}`}
          className="flex-1 py-2.5 px-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold flex items-center justify-center gap-1.5 transition-colors min-h-[44px]"
        >
          <span className="material-symbols-outlined text-[20px] text-secondary">call</span>
          <span>Call</span>
        </a>

        <button
          onClick={() => setIsReservationOpen(true)}
          className="flex-1 py-2.5 px-2 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors min-h-[44px]"
        >
          <span className="material-symbols-outlined text-[20px] text-primary">table_restaurant</span>
          <span>Book Table</span>
        </button>

        <button
          onClick={() => setIsOrderDrawerOpen(true)}
          className="flex-1 py-2.5 px-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors min-h-[44px] active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
          <span>
            {totalCartCount > 0 ? `Bag (${totalCartCount} · ₹${totalCartPrice})` : 'Order'}
          </span>
        </button>
      </div>

    </div>
  );
}
