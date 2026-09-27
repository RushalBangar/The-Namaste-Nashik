import React, { useState } from 'react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('dinner-1');
  const [guests, setGuests] = useState('4');
  const [seating, setSeating] = useState('ac_family');
  const [isJain, setIsJain] = useState(false);
  const [specialRequests, setSpecialRequests] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl rounded-2xl bg-surface-container-lowest shadow-2xl overflow-hidden max-h-[92vh] flex flex-col z-10 animate-in fade-in zoom-in-95 duration-150 my-auto">
        
        {/* Modal Header */}
        <div className="px-4 py-3.5 sm:px-6 sm:py-4 bg-surface-container-high flex items-center justify-between border-b border-surface-container shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
              <span className="material-symbols-outlined text-[18px]">table_restaurant</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface leading-tight">
                Reserve a Pure Veg Dining Table
              </h3>
              <span className="font-label-sm text-xs text-secondary font-medium">
                The Namastey Nashik · Lawate Nagar
              </span>
            </div>
          </div>
          <button
            className="p-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
            onClick={onClose}
            aria-label="Close reservation modal"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Modal Body Form */}
        <form className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-3.5 sm:gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface-variant font-bold">
                Guest Name *
              </label>
              <input
                className="w-full px-3 py-2.5 rounded-xl bg-surface text-on-surface font-body-sm text-xs sm:text-sm shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary/40 border border-outline-variant/60"
                placeholder="e.g. Ramesh Kulkarni"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface-variant font-bold">
                Contact Phone *
              </label>
              <input
                className="w-full px-3 py-2.5 rounded-xl bg-surface text-on-surface font-body-sm text-xs sm:text-sm shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary/40 border border-outline-variant/60"
                placeholder="e.g. 098220 12345"
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface-variant font-bold">
                Date *
              </label>
              <input
                className="w-full px-3 py-2.5 rounded-xl bg-surface text-on-surface font-body-sm text-xs sm:text-sm shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary/40 border border-outline-variant/60"
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface-variant font-bold">
                Time Slot *
              </label>
              <select
                className="w-full px-3 py-2.5 rounded-xl bg-surface text-on-surface font-body-sm text-xs sm:text-sm shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary/40 border border-outline-variant/60"
                required
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              >
                <option value="lunch-1">12:30 PM (Lunch Thali)</option>
                <option value="lunch-2">01:30 PM (Lunch Thali)</option>
                <option value="dinner-1">07:30 PM (Dinner)</option>
                <option value="dinner-2">08:30 PM (Peak Dinner)</option>
                <option value="dinner-3">09:30 PM (Late Sitting)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface-variant font-bold">
                Guests *
              </label>
              <select
                className="w-full px-3 py-2.5 rounded-xl bg-surface text-on-surface font-body-sm text-xs sm:text-sm shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary/40 border border-outline-variant/60"
                required
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="2">2 Guests (Cozy)</option>
                <option value="4">4 Guests (Family)</option>
                <option value="6">6 Guests (Large Table)</option>
                <option value="8+">8+ Guests (Celebration)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-xs text-on-surface-variant font-bold">
              Seating Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              <label
                className={`p-2 sm:p-2.5 rounded-xl text-center cursor-pointer transition-colors flex flex-col items-center gap-1 border select-none ${
                  seating === 'ac_family'
                    ? 'bg-primary-container text-on-primary-container border-primary font-bold shadow-xs'
                    : 'bg-surface-container-low text-on-surface border-outline-variant/40 hover:bg-surface-container'
                }`}
              >
                <input
                  checked={seating === 'ac_family'}
                  onChange={() => setSeating('ac_family')}
                  className="hidden"
                  name="seating"
                  type="radio"
                  value="ac_family"
                />
                <span className="font-label-sm text-[11px] sm:text-xs">AC Family</span>
              </label>

              <label
                className={`p-2 sm:p-2.5 rounded-xl text-center cursor-pointer transition-colors flex flex-col items-center gap-1 border select-none ${
                  seating === 'main_dining'
                    ? 'bg-primary-container text-on-primary-container border-primary font-bold shadow-xs'
                    : 'bg-surface-container-low text-on-surface border-outline-variant/40 hover:bg-surface-container'
                }`}
              >
                <input
                  checked={seating === 'main_dining'}
                  onChange={() => setSeating('main_dining')}
                  className="hidden"
                  name="seating"
                  type="radio"
                  value="main_dining"
                />
                <span className="font-label-sm text-[11px] sm:text-xs">Main Hall</span>
              </label>

              <label
                className={`p-2 sm:p-2.5 rounded-xl text-center cursor-pointer transition-colors flex flex-col items-center gap-1 border select-none ${
                  seating === 'window'
                    ? 'bg-primary-container text-on-primary-container border-primary font-bold shadow-xs'
                    : 'bg-surface-container-low text-on-surface border-outline-variant/40 hover:bg-surface-container'
                }`}
              >
                <input
                  checked={seating === 'window'}
                  onChange={() => setSeating('window')}
                  className="hidden"
                  name="seating"
                  type="radio"
                  value="window"
                />
                <span className="font-label-sm text-[11px] sm:text-xs">Window Side</span>
              </label>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-tertiary-fixed/20 flex items-start gap-2 border border-tertiary-fixed">
            <input
              checked={isJain}
              onChange={(e) => setIsJain(e.target.checked)}
              className="mt-0.5 accent-tertiary w-4 h-4 rounded cursor-pointer shrink-0"
              id="jain-req"
              type="checkbox"
            />
            <label className="font-body-sm text-xs text-on-surface leading-tight cursor-pointer select-none" htmlFor="jain-req">
              <strong className="text-tertiary font-bold">Strict Jain Dining:</strong> Prepare all courses without onion, garlic, or root vegetables using dedicated utensils.
            </label>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-xs text-on-surface-variant font-bold">
              Special Requests (Optional)
            </label>
            <textarea
              className="w-full px-3 py-2 rounded-xl bg-surface text-on-surface font-body-sm text-xs sm:text-sm shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary/40 border border-outline-variant/60"
              placeholder="e.g. Birthday celebration, high chair, senior citizen seating..."
              rows={2}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            ></textarea>
          </div>

          {success && (
            <div className="p-3.5 rounded-xl bg-tertiary text-on-tertiary font-label-md text-xs sm:text-sm text-center font-bold shadow-md animate-in fade-in">
              ✓ Table Reserved! We look forward to welcoming you at Lawate Nagar.
            </div>
          )}

          <button
            className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container font-label-lg text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer min-h-[46px] active:scale-[0.98]"
            type="submit"
          >
            <span className="material-symbols-outlined text-[20px]">check</span>
            <span>Confirm Table Reservation</span>
          </button>
        </form>

      </div>
    </div>
  );
};
