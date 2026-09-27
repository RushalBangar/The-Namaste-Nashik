import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationSection: React.FC = () => {
  const [copiedAddr, setCopiedAddr] = useState(false);
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);
  const [mapMode, setMapMode] = useState<'interactive' | 'satellite' | 'street'>('interactive');
  const [locatingUser, setLocatingUser] = useState(false);

  // Exact coordinates for Thatte Nagar / Lawate Nagar, Nashik
  const latitude = 20.0059;
  const longitude = 73.7898;
  const destinationQuery = encodeURIComponent(
    'The Namastey Nashik, Shop No. 7, Samarth Krupa Apartment, Thatte Nagar, Nashik, Maharashtra 422005'
  );

  const copyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address).then(() => {
      setCopiedAddr(true);
      setTimeout(() => setCopiedAddr(false), 2000);
    });
  };

  const copyPlusCode = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.plusCode).then(() => {
      setCopiedPlusCode(true);
      setTimeout(() => setCopiedPlusCode(false), 2000);
    });
  };

  // Turn-by-Turn Route from user's current GPS location
  const handleGetRouteFromHere = () => {
    if (!navigator.geolocation) {
      // Fallback directly to Google Maps navigation destination
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${destinationQuery}`,
        '_blank',
        'noopener,noreferrer'
      );
      return;
    }

    setLocatingUser(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocatingUser(false);
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destinationQuery}&travelmode=driving`;
        window.open(url, '_blank', 'noopener,noreferrer');
      },
      () => {
        setLocatingUser(false);
        // Fallback if user denies or geolocation fails
        window.open(
          `https://www.google.com/maps/dir/?api=1&destination=${destinationQuery}`,
          '_blank',
          'noopener,noreferrer'
        );
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // Google Maps Embed URLs
  const interactiveEmbedUrl = `https://maps.google.com/maps?q=${destinationQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const satelliteEmbedUrl = `https://maps.google.com/maps?q=${destinationQuery}&t=k&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="w-full bg-surface-container-low py-16 px-4 md:px-8 border-t border-outline-variant/30" id="location-section">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-xs uppercase tracking-widest text-saffron-deep font-bold">
              Visit The Sanctuary
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-headline-lg text-primary font-bold">
              Centrally Located in Nashik
            </h2>
          </div>
          <p className="font-body-md text-sm sm:text-base text-charcoal-muted max-w-md">
            Easy ground-floor access with valet parking available for diners on Thatte Nagar Main Road & Lawate Nagar.
          </p>
        </div>

        {/* Content Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Details Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            <div className="p-6 rounded-2xl bg-cream-card shadow-xs border border-outline-variant/30 flex flex-col gap-4">
              
              {/* Address Block */}
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[28px] mt-0.5 shrink-0">
                  location_on
                </span>
                <div className="flex flex-col">
                  <span className="font-title-lg text-base sm:text-title-lg text-primary font-bold">
                    Restaurant Address
                  </span>
                  <p className="font-body-md text-xs sm:text-sm text-on-surface pt-1 leading-relaxed">
                    {RESTAURANT_INFO.address}
                  </p>
                  <span className="font-label-sm text-xs text-charcoal-muted pt-1">
                    Landmark: {RESTAURANT_INFO.landmark}
                  </span>
                </div>
              </div>

              {/* Plus Code & Copy Strip */}
              <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0">tag</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-charcoal-muted uppercase tracking-wider">
                      Google Maps Plus Code
                    </span>
                    <span className="text-xs font-mono font-bold text-on-surface truncate">
                      {RESTAURANT_INFO.plusCode}
                    </span>
                  </div>
                </div>
                <button
                  onClick={copyPlusCode}
                  className="px-2.5 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-peach-tint text-primary text-xs font-bold transition-colors cursor-pointer border border-outline-variant/30 shrink-0 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedPlusCode ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedPlusCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Timings */}
              <div className="pt-2 flex flex-col gap-3 border-t border-surface-container">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                    schedule
                  </span>
                  <div>
                    <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface">
                      Operating Hours:
                    </span>
                    <span className="font-body-sm text-xs sm:text-sm text-charcoal-muted pl-1.5">
                      {RESTAURANT_INFO.hours}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                    restaurant
                  </span>
                  <div>
                    <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface">
                      Thali Service:
                    </span>
                    <span className="font-body-sm text-xs sm:text-sm text-charcoal-muted pl-1.5">
                      {RESTAURANT_INFO.thaliHours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Cluster */}
              <div className="flex flex-col gap-2.5 pt-3 border-t border-surface-container">
                {/* Live GPS Routing Button */}
                <button
                  onClick={handleGetRouteFromHere}
                  disabled={locatingUser}
                  className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-saffron-vibrant text-on-primary font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75"
                >
                  <span className="material-symbols-outlined text-[20px] animate-bounce">
                    {locatingUser ? 'sync' : 'directions_car'}
                  </span>
                  <span>
                    {locatingUser ? 'Locating your GPS...' : 'Get Turn-by-Turn Driving Directions'}
                  </span>
                </button>

                <div className="grid grid-cols-3 gap-2">
                  <a
                    className="py-2.5 px-2 rounded-xl bg-peach-tint text-primary hover:bg-primary hover:text-on-primary font-bold text-xs transition-colors border border-primary/20 flex items-center justify-center gap-1 text-center"
                    href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    <span>Call Desk</span>
                  </a>

                  <button
                    onClick={copyAddress}
                    className="py-2.5 px-2 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1 text-center"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {copiedAddr ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedAddr ? 'Copied' : 'Address'}</span>
                  </button>

                  <a
                    className="py-2.5 px-2 rounded-xl bg-pure-veg-green text-on-tertiary hover:bg-tertiary-container font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1 text-center"
                    href={`https://wa.me/${RESTAURANT_INFO.mobilePhoneRaw.replace('+', '')}?text=Hi+The+Namastey+Nashik,+could+you+please+share+your+exact+location+pin?`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Valet & Amenities Mini Bento */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-cream-card shadow-xs border border-outline-variant/30 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]">local_parking</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface">Valet Parking</span>
                  <span className="font-body-sm text-[11px] sm:text-xs text-charcoal-muted">Complimentary</span>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-cream-card shadow-xs border border-outline-variant/30 flex items-center gap-3">
                <span className="material-symbols-outlined text-pure-veg-green text-[24px]">wifi</span>
                <div className="flex flex-col">
                  <span className="font-label-md text-xs sm:text-sm font-bold text-on-surface">High Speed Wi-Fi</span>
                  <span className="font-body-sm text-[11px] sm:text-xs text-charcoal-muted">For Guests</span>
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Live Map View (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-md flex flex-col border border-outline-variant/30 bg-surface-container-lowest min-h-[460px] relative">
            
            {/* Map Mode Tabs Header */}
            <div className="px-4 py-3 bg-surface-container-high/70 backdrop-blur-md border-b border-surface-container flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1 bg-surface-container p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setMapMode('interactive')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    mapMode === 'interactive'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-charcoal-muted hover:text-primary hover:bg-surface-container-lowest'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">map</span>
                  <span>Live Map</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMapMode('satellite')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    mapMode === 'satellite'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-charcoal-muted hover:text-primary hover:bg-surface-container-lowest'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">satellite_alt</span>
                  <span>Satellite</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMapMode('street')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    mapMode === 'street'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-charcoal-muted hover:text-primary hover:bg-surface-container-lowest'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">streetview</span>
                  <span>Street View</span>
                </button>
              </div>

              {/* Direct External Map App Launchers */}
              <div className="flex items-center gap-1.5">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${destinationQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-peach-tint text-primary font-bold text-xs shadow-xs flex items-center gap-1 border border-outline-variant/30 transition-all"
                  title="Open in Google Maps App"
                >
                  <span>Google Maps</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>

                <a
                  href={`https://maps.apple.com/?daddr=${latitude},${longitude}&q=The+Namastey+Nashik`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-peach-tint text-primary font-bold text-xs shadow-xs items-center gap-1 border border-outline-variant/30 transition-all"
                  title="Open in Apple Maps"
                >
                  <span>Apple Maps</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>
            </div>

            {/* Map Frame / Canvas */}
            <div className="relative flex-1 w-full min-h-[380px] bg-surface-container-low overflow-hidden">
              {mapMode === 'interactive' && (
                <iframe
                  title="The Namastey Nashik Location Interactive Map"
                  src={interactiveEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '380px' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[380px]"
                ></iframe>
              )}

              {mapMode === 'satellite' && (
                <iframe
                  title="The Namastey Nashik Satellite Terrain Map"
                  src={satelliteEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '380px' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[380px]"
                ></iframe>
              )}

              {mapMode === 'street' && (
                <div
                  className="w-full h-full min-h-[380px] bg-cover bg-center relative group"
                  style={{ backgroundImage: `url('${RESTAURANT_INFO.mapImageUrl}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-surface/95 backdrop-blur-md shadow-lg flex items-center justify-between gap-3 border border-outline-variant/30">
                    <div className="flex flex-col">
                      <span className="font-title-md text-sm font-bold text-primary">
                        Samarth Krupa / Ganesh Gunjan Facade
                      </span>
                      <span className="font-body-sm text-xs text-charcoal-muted">
                        Ground floor dining lounge & express drive-thru pickup bay
                      </span>
                    </div>
                    <button
                      onClick={() => setMapMode('interactive')}
                      className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold shrink-0 hover:bg-saffron-vibrant cursor-pointer"
                    >
                      Switch to Live Map
                    </button>
                  </div>
                </div>
              )}

              {/* Floating Quick Action Overlay on Live Map */}
              {(mapMode === 'interactive' || mapMode === 'satellite') && (
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-10 pointer-events-auto">
                  <div className="p-3 sm:p-3.5 rounded-xl bg-surface/95 backdrop-blur-md shadow-xl text-on-surface flex items-center justify-between sm:justify-start gap-3 border border-outline-variant/30">
                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">restaurant</span>
                    </div>
                    <div className="flex flex-col pr-1">
                      <span className="font-label-sm text-xs font-bold text-primary leading-tight">
                        The Namastey Nashik
                      </span>
                      <span className="text-[10px] text-charcoal-muted truncate">
                        Thatte Nagar, Nashik (Open 11:30 AM – 11:00 PM)
                      </span>
                    </div>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${destinationQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-pure-veg-green hover:bg-tertiary-container text-on-tertiary text-xs font-bold transition-colors shadow-xs flex items-center gap-1 shrink-0"
                    >
                      <span className="material-symbols-outlined text-[14px]">directions</span>
                      <span>Navigate</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Map Assistance Footer Strip */}
            <div className="px-4 py-2.5 bg-cream-surface border-t border-surface-container flex flex-wrap items-center justify-between gap-2 text-xs text-charcoal-muted">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pure-veg-green animate-pulse"></span>
                <span>Open for Dine-In, Curbside Takeaway & Doorstep Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${destinationQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline flex items-center gap-0.5"
                >
                  <span>Open Fullscreen Map</span>
                  <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
