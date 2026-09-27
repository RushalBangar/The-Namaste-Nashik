import React, { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { RestaurantLogo } from './RestaurantLogo';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  defaultServiceType?: 'takeaway' | 'delivery' | 'dinein';
  onOrderSuccess: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
  items,
  defaultServiceType = 'delivery',
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [serviceType, setServiceType] = useState<'delivery' | 'takeaway' | 'dinein'>(defaultServiceType);
  const [specialNotes, setSpecialNotes] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sentOrderId, setSentOrderId] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // Restore saved details from local storage for convenience
  useEffect(() => {
    try {
      const savedInfo = localStorage.getItem('namastey_customer_details');
      if (savedInfo) {
        const parsed = JSON.parse(savedInfo);
        if (parsed.name) setCustomerName(parsed.name);
        if (parsed.location) setCustomerLocation(parsed.location);
        if (parsed.phone) setCustomerPhone(parsed.phone);
      }
    } catch {
      // Ignore storage errors
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setValidationError('');
      setServiceType(defaultServiceType);
    }
  }, [isOpen, defaultServiceType]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const total = subtotal;

  const handleFetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      setValidationError('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const lat = pos.coords.latitude.toFixed(5);
        const lng = pos.coords.longitude.toFixed(5);
        setCustomerLocation(`GPS Location: ${lat}, ${lng} (Near Lawate Nagar, Nashik)`);
        setValidationError('');
      },
      () => {
        setIsLocating(false);
        setCustomerLocation('Lawate Nagar, Nashik 422002');
      },
      { timeout: 8000 }
    );
  };

  const generateOrderMessage = (orderId: string) => {
    const serviceLabels = {
      delivery: '🚀 DOORSTEP DELIVERY',
      takeaway: '🚗 DRIVE-THRU TAKEAWAY',
      dinein: '🍽️ DINE-IN TABLE ORDER',
    };

    let msg = `*🌿 NEW ORDER - THE NAMASTEY NASHIK*\n`;
    msg += `*Order ID:* #${orderId}\n`;
    msg += `*Service:* ${serviceLabels[serviceType]}\n`;
    msg += `--------------------------------\n`;
    msg += `*👤 Customer Name:* ${customerName.trim()}\n`;
    msg += `*📍 Location / Address:* ${customerLocation.trim()}\n`;
    if (customerPhone.trim()) {
      msg += `*📞 Contact Phone:* ${customerPhone.trim()}\n`;
    }
    msg += `--------------------------------\n`;
    msg += `*📋 ORDER DETAILS:*\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.quantity}x *${item.item.name}* ${item.jainPrep ? '[100% JAIN]' : ''} - ₹${
        item.item.price * item.quantity
      }\n`;
    });
    msg += `--------------------------------\n`;
    msg += `*💰 Total Bill Estimate:* ₹${total}\n`;
    if (specialNotes.trim()) {
      msg += `*📝 Special Request:* ${specialNotes.trim()}\n`;
    }
    msg += `--------------------------------\n`;
    msg += `*Restaurant:* The Namastey Nashik (Pure Veg)\n`;
    msg += `*Phone:* ${RESTAURANT_INFO.phone}\n`;
    msg += `*Timings:* 12:00 PM – 11:00 PM Daily`;

    return msg;
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setValidationError('Please enter your Name before confirming the order.');
      return;
    }

    if (!customerLocation.trim()) {
      setValidationError('Please enter your Delivery Address, Table No., or Location.');
      return;
    }

    if (items.length === 0) {
      setValidationError('Your order is empty. Please select food items.');
      return;
    }

    // Save details for next time
    try {
      localStorage.setItem(
        'namastey_customer_details',
        JSON.stringify({
          name: customerName.trim(),
          location: customerLocation.trim(),
          phone: customerPhone.trim(),
        })
      );
    } catch {
      // Ignore
    }

    const orderId = 'NN-' + Math.floor(10000 + Math.random() * 90000);
    setSentOrderId(orderId);
    setValidationError('');

    const orderMessage = generateOrderMessage(orderId);
    const encoded = encodeURIComponent(orderMessage);

    // Primary direct communication: WhatsApp to restaurant's number
    // Restaurant's number is 0253 299 5031 -> international format 912532995031
    const whatsappUrl = `https://api.whatsapp.com/send?phone=912532995031&text=${encoded}`;
    
    // Attempt opening WhatsApp in new tab / application
    const win = window.open(whatsappUrl, '_blank');
    if (!win) {
      // Popup blocked or fallback, direct href assignment
      window.location.href = whatsappUrl;
    }

    setIsSubmitted(true);
    onOrderSuccess();
  };

  const orderMessageText = sentOrderId ? generateOrderMessage(sentOrderId) : '';
  const directWhatsAppLink = `https://api.whatsapp.com/send?phone=912532995031&text=${encodeURIComponent(
    orderMessageText
  )}`;
  const directSmsLink = `sms:+912532995031?body=${encodeURIComponent(orderMessageText)}`;

  return (
    <div className="fixed inset-0 z-60 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-outline-variant/40 relative my-auto max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-4 bg-surface-container-high border-b border-surface-container flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <RestaurantLogo size="sm" showSubtitle={false} />
            <div>
              <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface leading-tight">
                {isSubmitted ? 'Order Message Dispatched!' : 'Confirm Order & Send to Restaurant'}
              </h3>
              <p className="font-label-sm text-xs text-secondary font-medium">
                Direct to: {RESTAURANT_INFO.phone} (The Namastey Nashik)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            /* Success confirmation screen */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-tertiary/15 text-tertiary flex items-center justify-center animate-bounce">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold uppercase tracking-wider mb-2">
                  Order #{sentOrderId}
                </span>
                <h4 className="font-headline-sm text-xl font-bold text-on-surface">
                  Direct Message Sent to Restaurant!
                </h4>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant max-w-sm mx-auto mt-1">
                  Your order details, name (<strong className="text-on-surface">{customerName}</strong>), and delivery location have been formatted and sent directly to the restaurant desk at <strong className="text-primary">{RESTAURANT_INFO.phone}</strong>.
                </p>
              </div>

              {/* Order summary box */}
              <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-left text-xs space-y-1.5">
                <div className="flex justify-between font-bold text-on-surface border-b border-surface-container pb-1.5">
                  <span>Delivery to:</span>
                  <span className="text-primary truncate max-w-[200px]">{customerLocation}</span>
                </div>
                <div className="space-y-1 py-1 max-h-32 overflow-y-auto">
                  {items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-on-surface-variant">
                      <span>{it.quantity}x {it.item.name} {it.jainPrep ? '(Jain)' : ''}</span>
                      <span className="font-semibold text-on-surface">₹{it.item.price * it.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-bold text-sm text-primary pt-1.5 border-t border-surface-container">
                  <span>Total Amount:</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Direct Communication Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <a
                  href={directWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-tertiary hover:bg-tertiary-container text-on-tertiary font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Re-open WhatsApp Message</span>
                </a>

                <a
                  href={directSmsLink}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">sms</span>
                  <span>Send via Direct SMS ({RESTAURANT_INFO.phone})</span>
                </a>

                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">phone_in_talk</span>
                  <span>Call Restaurant Desk Directly ({RESTAURANT_INFO.phone})</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full mt-1 py-2 text-xs text-on-surface-variant hover:text-on-surface cursor-pointer font-medium"
                >
                  Done / Close
                </button>
              </div>
            </div>
          ) : (
            /* Input Form: Name & Location */
            <form onSubmit={handleConfirmOrder} className="space-y-4">
              
              {/* Instructions banner */}
              <div className="p-3 rounded-xl bg-primary-container/40 border border-primary/20 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                  info
                </span>
                <p className="font-body-sm text-xs text-on-primary-container leading-relaxed">
                  Please enter your <strong>Name</strong> and <strong>Location</strong> below. When you click confirm, it will send your order receipt directly to restaurant number <strong>{RESTAURANT_INFO.phone}</strong>.
                </p>
              </div>

              {/* Validation alert */}
              {validationError && (
                <div className="p-3 rounded-xl bg-error-container text-on-error-container text-xs font-bold flex items-center gap-2 animate-shake">
                  <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
                  <span>{validationError}</span>
                </div>
              )}

              {/* Service Type Selector */}
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1.5">
                  Select Order Service:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setServiceType('delivery')}
                    className={`py-2 px-2 rounded-lg text-xs font-bold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                      serviceType === 'delivery'
                        ? 'bg-primary text-on-primary border-primary shadow-xs'
                        : 'bg-surface-container-low text-on-surface border-outline-variant/40 hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">two_wheeler</span>
                    <span>Doorstep</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType('takeaway')}
                    className={`py-2 px-2 rounded-lg text-xs font-bold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                      serviceType === 'takeaway'
                        ? 'bg-primary text-on-primary border-primary shadow-xs'
                        : 'bg-surface-container-low text-on-surface border-outline-variant/40 hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">no_crash</span>
                    <span>Drive-Thru</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType('dinein')}
                    className={`py-2 px-2 rounded-lg text-xs font-bold flex flex-col items-center gap-1 border transition-all cursor-pointer ${
                      serviceType === 'dinein'
                        ? 'bg-primary text-on-primary border-primary shadow-xs'
                        : 'bg-surface-container-low text-on-surface border-outline-variant/40 hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">table_restaurant</span>
                    <span>Dine-In Table</span>
                  </button>
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="customer-name" className="block text-xs font-bold text-on-surface mb-1">
                  Your Full Name <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">
                    person
                  </span>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    placeholder="e.g. Rushal Bangar"
                    className="w-full pl-9 pr-3 py-2.5 bg-surface-container-lowest text-on-surface text-xs sm:text-sm rounded-xl border border-outline-variant/50 focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary shadow-xs"
                  />
                </div>
              </div>

              {/* Location Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="customer-location" className="text-xs font-bold text-on-surface">
                    Your Location / Address / Table No. <span className="text-primary">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleFetchCurrentLocation}
                    disabled={isLocating}
                    className="text-[11px] text-primary hover:text-primary-container font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-60"
                  >
                    <span className="material-symbols-outlined text-[14px]">my_location</span>
                    <span>{isLocating ? 'Locating...' : 'Use GPS Location'}</span>
                  </button>
                </div>

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">
                    location_on
                  </span>
                  <textarea
                    id="customer-location"
                    required
                    rows={2}
                    value={customerLocation}
                    onChange={(e) => {
                      setCustomerLocation(e.target.value);
                      if (validationError) setValidationError('');
                    }}
                    placeholder={
                      serviceType === 'dinein'
                        ? 'e.g. Table 4, AC Family Hall'
                        : serviceType === 'takeaway'
                        ? 'e.g. Car MH-15-AB1234 / Pickup counter'
                        : 'e.g. Flat 301, Shree Ganesh Apt, Lawate Nagar, Nashik'
                    }
                    className="w-full pl-9 pr-3 py-2.5 bg-surface-container-lowest text-on-surface text-xs sm:text-sm rounded-xl border border-outline-variant/50 focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary shadow-xs resize-none"
                  />
                </div>

                {/* Quick location chips for Nashik */}
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <span className="text-[10px] text-on-surface-variant font-medium self-center">Quick:</span>
                  {[
                    'Lawate Nagar, Nashik',
                    'College Road, Nashik',
                    'Indira Nagar, Nashik',
                    'Table 5 (Dine-in)',
                    'Drive-thru Pickup',
                  ].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setCustomerLocation(loc)}
                      className="px-2 py-0.5 rounded-md bg-surface-container hover:bg-surface-container-high text-[10px] text-on-surface font-medium transition-colors cursor-pointer"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="customer-phone" className="block text-xs font-bold text-on-surface mb-1">
                  Your Phone Number (For Order Updates)
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">
                    call
                  </span>
                  <input
                    id="customer-phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 98220 12345"
                    className="w-full pl-9 pr-3 py-2.5 bg-surface-container-lowest text-on-surface text-xs sm:text-sm rounded-xl border border-outline-variant/50 focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary shadow-xs"
                  />
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label htmlFor="order-notes" className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Special Notes / Cooking Preferences (Optional)
                </label>
                <input
                  id="order-notes"
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Extra spicy, serve hot, Jain preparation"
                  className="w-full px-3 py-2 bg-surface-container-lowest text-on-surface text-xs rounded-xl border border-outline-variant/50 focus:outline-hidden focus:ring-1 focus:ring-primary/40 shadow-xs"
                />
              </div>

              {/* Items Preview List */}
              <div className="pt-2 border-t border-surface-container">
                <div className="flex items-center justify-between text-xs font-bold text-on-surface mb-2">
                  <span>Selected Delicacies ({items.length}):</span>
                  <span className="text-primary font-bold text-sm">Total: ₹{total}</span>
                </div>
                <div className="max-h-28 overflow-y-auto space-y-1.5 p-2 rounded-lg bg-surface-container-low border border-outline-variant/30 text-xs">
                  {items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-on-surface">
                      <span className="truncate pr-2">
                        {it.quantity}x {it.item.name} {it.jainPrep ? '🌿 [Jain]' : ''}
                      </span>
                      <span className="font-semibold shrink-0">₹{it.item.price * it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm & Send Button */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-tertiary hover:bg-tertiary-container text-on-tertiary font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer min-h-[46px] active:scale-[0.99]"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>Confirm & Send Direct Message to {RESTAURANT_INFO.phone}</span>
                </button>

                <p className="text-[11px] text-center text-on-surface-variant">
                  Instantly connects to The Namastey Nashik order desk on WhatsApp & SMS.
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
