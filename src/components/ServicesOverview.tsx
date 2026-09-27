import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { RestaurantHeroIllustration, RegionalSpecialtyIllustration } from './DishIllustrations';

interface ServicesOverviewProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ onOpenReservation, onExploreMenu }) => {
  const [dineInError, setDineInError] = useState(false);
  const [driveThruError, setDriveThruError] = useState(false);
  const [deliveryError, setDeliveryError] = useState(false);

  return (
    <section id="services" className="w-full py-12 sm:py-space-xl bg-surface-container-low border-b border-surface-container">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-margin">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 sm:pb-space-lg">
          <div>
            <span className="font-label-sm text-xs sm:text-label-sm text-secondary uppercase tracking-widest font-bold">
              Seamless Hospitality
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg text-on-surface mt-1">
              Experience The Namastey Your Way
            </h2>
          </div>
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-md">
            Whether you crave a grand thali feast under chandelier glow, a rapid drive-through dinner, or quiet doorstep indulgence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-space-md">
          
          {/* Channel 1: Dine-In */}
          <div className="rounded-2xl bg-surface-container-lowest overflow-hidden shadow-md flex flex-col group border border-outline-variant/30">
            <div className="relative h-52 sm:h-56 bg-surface-container overflow-hidden">
              {dineInError ? (
                <RestaurantHeroIllustration className="w-full h-full" />
              ) : (
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={RESTAURANT_INFO.dineInImageUrl}
                  alt="Spacious air conditioned family dining hall at The Namastey Nashik"
                  onError={() => setDineInError(true)}
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm font-label-sm text-xs font-bold text-primary flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[16px]">ac_unit</span>
                Fully Air-Conditioned
              </div>
            </div>

            <div className="p-4 sm:p-space-lg flex flex-col flex-1 gap-2.5 sm:gap-space-sm">
              <h3 className="font-headline-md text-lg sm:text-headline-md text-on-surface font-bold">
                Dine-In Brassware Ambiance
              </h3>
              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Savor piping hot meals served in shining traditional brass thalis and copper handis. Attentive table captains, comfortable family seating, and soothing classical instrumental notes.
              </p>
              
              <ul className="flex flex-col gap-2 py-1 text-on-surface-variant font-body-sm text-xs sm:text-sm">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                  <span>Spacious booth & large family tables</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                  <span>Warm, safe, and LGBTQ+ inclusive space</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                  <span>Dedicated Jain food utensils upon request</span>
                </li>
              </ul>

              <button
                className="mt-auto w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer min-h-[44px]"
                onClick={onOpenReservation}
              >
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                <span>Reserve Dine-In Table</span>
              </button>
            </div>
          </div>

          {/* Channel 2: Takeaway & Drive-Through */}
          <div className="rounded-2xl bg-surface-container-lowest overflow-hidden shadow-md flex flex-col group border border-outline-variant/30">
            <div className="relative h-52 sm:h-56 bg-surface-container overflow-hidden">
              {driveThruError ? (
                <RegionalSpecialtyIllustration type="biryani" className="w-full h-full" />
              ) : (
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={RESTAURANT_INFO.driveThruImageUrl}
                  alt="Curbside takeaway pickup bay outside Ganesh Gunjan Apartment"
                  onError={() => setDriveThruError(true)}
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-xs font-bold flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[16px]">no_crash</span>
                Zero-Wait Drive-Through
              </div>
            </div>

            <div className="p-4 sm:p-space-lg flex flex-col flex-1 gap-2.5 sm:gap-space-sm">
              <h3 className="font-headline-md text-lg sm:text-headline-md text-on-surface font-bold">
                Curbside Drive-Through
              </h3>
              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Reserved vehicle bay inside Ganesh Gunjan compound. Pre-order via call or web, drive up, and receive your steaming feast placed directly into your car with zero parking friction.
              </p>

              <ul className="flex flex-col gap-2 py-1 text-on-surface-variant font-body-sm text-xs sm:text-sm">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                  <span>Dedicated parking bays on Ground Floor</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                  <span>Hot bag sealed before car arrival</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                  <span>UPI QR payment right at your car window</span>
                </li>
              </ul>

              <button
                className="mt-auto w-full py-3 px-4 rounded-xl bg-surface-container-high text-on-surface font-label-lg text-xs sm:text-sm font-semibold hover:bg-surface-container transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer min-h-[44px]"
                onClick={onExploreMenu}
              >
                <span className="material-symbols-outlined text-[20px] text-secondary">shopping_bag</span>
                <span>Pre-Order Takeaway Bay</span>
              </button>
            </div>
          </div>

          {/* Channel 3: Contactless Delivery */}
          <div className="rounded-2xl bg-surface-container-lowest overflow-hidden shadow-md flex flex-col group border border-outline-variant/30">
            <div className="relative h-52 sm:h-56 bg-surface-container overflow-hidden">
              {deliveryError ? (
                <RegionalSpecialtyIllustration type="misal" className="w-full h-full" />
              ) : (
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={RESTAURANT_INFO.deliveryImageUrl}
                  alt="Pristine food packaging with sealed tamper-proof containers"
                  onError={() => setDeliveryError(true)}
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm font-label-sm text-xs font-bold text-tertiary flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Tamper-Proof Seals
              </div>
            </div>

            <div className="p-4 sm:p-space-lg flex flex-col flex-1 gap-2.5 sm:gap-space-sm">
              <h3 className="font-headline-md text-lg sm:text-headline-md text-on-surface font-bold">
                Direct Doorstep Delivery
              </h3>
              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Freshly prepared in batches and dispatched in insulated thermal carriers across Lawate Nagar, Tidke Colony, Gangapur Road, and beyond. Pure satvik standards preserved intact.
              </p>

              <ul className="flex flex-col gap-2 py-1 text-on-surface-variant font-body-sm text-xs sm:text-sm">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                  <span>Leakproof food-grade containers</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                  <span>Live temperature monitoring during transit</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">check_circle</span>
                  <span>Complimentary house pickle & roasted papad</span>
                </li>
              </ul>

              <a
                className="mt-auto w-full py-3 px-4 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container font-label-lg text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 border border-outline-variant/40 min-h-[44px]"
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              >
                <span className="material-symbols-outlined text-[20px]">two_wheeler</span>
                <span>Call For Delivery ({RESTAURANT_INFO.phone})</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
