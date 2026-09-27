import React, { useState } from 'react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onToggleJain: (id: string) => void;
  onClearCart: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onToggleJain,
  onClearCart,
}) => {
  const [bagServiceType, setBagServiceType] = useState<'takeaway' | 'delivery'>('takeaway');
  const [currentTip, setCurrentTip] = useState<number>(0);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const total = subtotal + currentTip;

  const handleTip = (amount: number) => {
    setCurrentTip((prev) => (prev === amount ? 0 : amount));
  };

  const sendOrderViaWhatsApp = () => {
    if (cart.length === 0) {
      return;
    }

    let orderText = `*New Order from The Namastey Nashik Portal*\n`;
    orderText += `*Service:* ${bagServiceType === 'takeaway' ? 'DRIVE-THRU PICKUP' : 'DOORSTEP DELIVERY'}\n`;
    orderText += `--------------------------------\n`;
    cart.forEach((item) => {
      orderText += `• ${item.quantity}x ${item.item.name} ${item.jainPrep ? '(JAIN)' : ''} - ₹${
        item.item.price * item.quantity
      }\n`;
    });
    orderText += `--------------------------------\n`;
    if (currentTip > 0) {
      orderText += `Kitchen Support Tip: ₹${currentTip}\n`;
    }
    orderText += `*Total Estimate:* ₹${total}\n`;
    orderText += `*Pickup/Address Location:* Ganesh Gunjan Apt, Lawate Nagar, Nashik\n`;
    orderText += `100% Certified Pure Vegetarian`;

    const encoded = encodeURIComponent(orderText);
    return `https://api.whatsapp.com/send?phone=912532995031&text=${encoded}`;
  };

  const whatsappHref = sendOrderViaWhatsApp();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end" id="order-slide-panel">
      {/* Backdrop tap to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md h-full bg-surface-container-lowest shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        
        {/* Slide-over Header */}
        <div className="px-4 py-3.5 bg-surface-container-high flex items-center justify-between border-b border-surface-container shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface leading-tight">Your Dining Bag</h3>
              <span className="font-label-sm text-xs text-secondary font-medium">The Namastey Nashik Express</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {cart.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-on-surface-variant hover:text-error px-2 py-1 rounded transition-colors cursor-pointer"
                title="Clear all items"
              >
                Clear
              </button>
            )}
            <button
              className="p-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              onClick={onClose}
              aria-label="Close cart"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>
        </div>

        {/* Item List Container */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3" id="bag-items-list">
          {cart.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center gap-3 text-on-surface-variant my-auto">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline-variant">
                <span className="material-symbols-outlined text-[36px]">soup_kitchen</span>
              </div>
              <p className="font-headline-sm text-lg font-bold text-on-surface">Your pure veg bag is hungry!</p>
              <p className="font-body-sm text-xs text-on-surface-variant max-w-xs leading-relaxed">
                Explore our signature thalis, paneer tikka, and shev bhaji to build your takeaway or home delivery feast.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer"
              >
                Browse Signature Menu
              </button>
            </div>
          ) : (
            cart.map((cItem) => {
              const itemTotal = cItem.item.price * cItem.quantity;

              return (
                <div key={cItem.item.id} className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-outline-variant/30 shadow-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center justify-center w-3 h-3 border border-tertiary rounded-[1.5px] p-[1px] shrink-0" title="Pure Veg">
                          <span className="w-1 h-1 rounded-full bg-tertiary"></span>
                        </span>
                        <h4 className="font-label-md text-xs sm:text-sm font-bold text-on-surface truncate">
                          {cItem.item.name}
                        </h4>
                      </div>
                      <span className="font-label-sm text-[11px] text-secondary font-semibold pl-4.5 block">
                        ₹{cItem.item.price} each
                      </span>
                    </div>
                    <span className="font-headline-sm text-sm sm:text-base font-bold text-primary shrink-0">
                      ₹{itemTotal}
                    </span>
                  </div>

                  {cItem.item.isJainAvailable && (
                    <label className="inline-flex items-center gap-1.5 text-[11px] font-label-sm text-tertiary cursor-pointer font-semibold select-none bg-tertiary-fixed/20 p-1.5 rounded-md">
                      <input
                        type="checkbox"
                        checked={cItem.jainPrep}
                        onChange={() => onToggleJain(cItem.item.id)}
                        className="w-3.5 h-3.5 accent-tertiary rounded cursor-pointer"
                      />
                      <span>Make 100% Jain (No Onion/Garlic)</span>
                    </label>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-surface-container">
                    <button
                      onClick={() => onRemoveItem(cItem.item.id)}
                      className="text-on-surface-variant hover:text-error text-xs flex items-center gap-1 cursor-pointer transition-colors p-1"
                      title="Remove"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                      <span>Remove</span>
                    </button>

                    <div className="flex items-center gap-1.5 bg-surface-container-lowest rounded-lg p-0.5 border border-outline-variant/30">
                      <button
                        onClick={() => onUpdateQuantity(cItem.item.id, -1)}
                        className="w-7 h-7 rounded bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-sm cursor-pointer active:scale-95 transition-all"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="font-label-md text-xs sm:text-sm font-bold px-2 text-center min-w-[20px]">
                        {cItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cItem.item.id, 1)}
                        className="w-7 h-7 rounded bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center font-bold text-sm cursor-pointer active:scale-95 transition-all"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Slide-over Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 bg-surface-container-low flex flex-col gap-2.5 border-t border-surface-container shrink-0">
            {/* Service Type Selection */}
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`py-2 px-3 rounded-lg font-label-sm text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  bagServiceType === 'takeaway'
                    ? 'bg-primary-container text-on-primary-container shadow-xs'
                    : 'bg-surface-container-lowest text-on-surface border border-outline-variant/30'
                }`}
                onClick={() => setBagServiceType('takeaway')}
              >
                <span className="material-symbols-outlined text-[16px]">no_crash</span>
                <span>Drive-Thru Pickup</span>
              </button>

              <button
                className={`py-2 px-3 rounded-lg font-label-sm text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  bagServiceType === 'delivery'
                    ? 'bg-primary-container text-on-primary-container shadow-xs font-bold'
                    : 'bg-surface-container-lowest text-on-surface border border-outline-variant/30'
                }`}
                onClick={() => setBagServiceType('delivery')}
              >
                <span className="material-symbols-outlined text-[16px]">two_wheeler</span>
                <span>Doorstep Delivery</span>
              </button>
            </div>

            {/* Kitchen Tip / Women Staff Support */}
            <div className="p-2 rounded-lg bg-surface-container-lowest flex items-center justify-between text-on-surface font-label-sm text-xs border border-outline-variant/30">
              <span className="flex items-center gap-1 text-[11px] sm:text-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">female</span>
                <span>Women Kitchen Tip:</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  className={`px-2 py-0.5 rounded text-xs font-bold transition-colors cursor-pointer ${
                    currentTip === 20 ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-primary-container'
                  }`}
                  onClick={() => handleTip(20)}
                >
                  +₹20
                </button>
                <button
                  className={`px-2 py-0.5 rounded text-xs font-bold transition-colors cursor-pointer ${
                    currentTip === 50 ? 'bg-primary text-on-primary' : 'bg-surface-container hover:bg-primary-container'
                  }`}
                  onClick={() => handleTip(50)}
                >
                  +₹50
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="flex justify-between items-baseline pt-0.5">
              <span className="font-body-md text-xs sm:text-sm text-on-surface-variant">Estimated Bill:</span>
              <span className="font-headline-sm text-lg sm:text-xl text-primary font-bold">
                ₹{total}
              </span>
            </div>

            {/* WhatsApp Direct Checkout Button */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-tertiary hover:bg-tertiary-container text-on-tertiary font-label-lg text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-md min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Send Order via WhatsApp</span>
            </a>

            {/* Call to Order Option */}
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="w-full py-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface border border-outline-variant/40 font-label-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors text-center"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">call</span>
              <span>Or Call {RESTAURANT_INFO.phone} to Order</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
