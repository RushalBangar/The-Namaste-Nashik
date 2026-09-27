import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationSection: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAddr, setCopiedAddr] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address).then(() => {
      setCopiedAddr(true);
      setTimeout(() => setCopiedAddr(false), 2000);
    });
  };

  const copyPlusCode = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.plusCode).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    });
  };

  return (
    <section className="w-full py-space-xl bg-surface" id="location-section">
      <div className="max-w-[1280px] mx-auto px-margin-sm lg:px-margin">
        
        <div className="text-center max-w-2xl mx-auto pb-space-lg">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
            Centrally Situated in Nashik
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
            Visit Us at Ganesh Gunjan Apartment
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Ample ground floor vehicle parking, hassle-free accessibility, and a cozy dining room in Lawate Nagar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
          
          {/* Interactive Details Card (5 cols) */}
          <div className="lg:col-span-5 p-space-lg lg:p-space-xl rounded-2xl bg-surface-container-low flex flex-col justify-between gap-space-md shadow-xs">
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md font-bold">
                <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                <span>Shop No.1, Ganesh Gunjan Apartment</span>
              </div>

              <h3 className="font-headline-md text-headline-md text-on-surface leading-tight">
                Lawate Nagar, Nashik, Maharashtra 422002
              </h3>

              {/* Plus Code */}
              <div className="p-space-md rounded-xl bg-surface-container-lowest flex items-center justify-between gap-space-xs shadow-xs border border-outline-variant/30">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">
                    Google Maps Plus Code
                  </span>
                  <span className="font-headline-sm text-[16px] text-on-surface font-mono">
                    {RESTAURANT_INFO.plusCode}
                  </span>
                </div>
                <button
                  className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer"
                  onClick={copyPlusCode}
                  title="Copy Plus Code"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copiedCode ? 'done' : 'content_copy'}
                  </span>
                </button>
              </div>

              {/* Quick Hours & Parking Cards */}
              <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
                  <span className="block font-label-sm text-label-sm text-on-surface-variant">Opening Hours</span>
                  <span className="font-label-md text-label-md font-bold text-on-surface">11:00 AM – 11:00 PM</span>
                  <span className="text-[12px] text-tertiary font-semibold block">Open 7 Days a Week</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/30">
                  <span className="block font-label-sm text-label-sm text-on-surface-variant">Parking & Access</span>
                  <span className="font-label-md text-label-md font-bold text-on-surface">Ganesh Gunjan Bays</span>
                  <span className="text-[12px] text-secondary font-semibold block">Wheelchair Accessible</span>
                </div>
              </div>
            </div>

            {/* Sharing Actions */}
            <div className="flex flex-col gap-space-xs pt-space-sm border-t border-surface-container">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                Share & Navigate Instantly
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <a
                  className="py-2.5 px-3 rounded-lg bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-primary transition-colors text-center"
                  href={RESTAURANT_INFO.googleMapsUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[16px]">map</span>
                  <span>Open Maps</span>
                </a>

                <button
                  className="py-2.5 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container transition-colors shadow-xs cursor-pointer border border-outline-variant/40"
                  onClick={copyAddress}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copiedAddr ? 'check' : 'copy_all'}
                  </span>
                  <span>{copiedAddr ? 'Copied!' : 'Copy'}</span>
                </button>

                <a
                  className="py-2.5 px-3 rounded-lg bg-surface-container-lowest text-tertiary font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container transition-colors shadow-xs border border-outline-variant/40"
                  href={`https://api.whatsapp.com/send?text=Let%27s+dine+at+The+Namastey+Nashik+(Pure+Veg)+at+Shop+No.1,+Ganesh+Gunjan+Apartment,+Lawate+Nagar,+Nashik+422002.+Call:+02532995031`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>WhatsApp</span>
                </a>

                <a
                  className="py-2.5 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container transition-colors shadow-xs border border-outline-variant/40"
                  href={`sms:?body=The Namastey Nashik (Pure Veg), Shop 1, Ganesh Gunjan, Lawate Nagar, Nashik. Phone: 0253 299 5031`}
                >
                  <span className="material-symbols-outlined text-[16px]">sms</span>
                  <span>SMS</span>
                </a>
              </div>
            </div>

          </div>

          {/* Stylized Map View (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-md relative min-h-[380px] group border border-outline-variant/30">
            <div
              className="w-full h-full bg-cover bg-center min-h-[380px] transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${RESTAURANT_INFO.mapImageUrl}')` }}
            ></div>

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Floating Map Marker Overlay Badge */}
            <div className="absolute bottom-4 left-4 p-space-md rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-lg max-w-sm flex items-start gap-space-sm border border-outline-variant/30">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">restaurant</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-headline-sm text-[16px] text-on-surface leading-snug">
                    The Namastey Nashik
                  </h4>
                  <span className="w-2 h-2 rounded-full bg-tertiary ml-1" title="Pure Veg"></span>
                </div>
                <p className="font-body-sm text-[13px] text-on-surface-variant">
                  Ganesh Gunjan Apt, Lawate Nagar
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-label-sm text-[11px] text-tertiary font-bold bg-tertiary-fixed/30 px-1.5 py-0.5 rounded">
                    Drive-Thru Bay Open
                  </span>
                  <span className="font-label-sm text-[11px] text-secondary font-bold">
                    11 AM - 11 PM
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
