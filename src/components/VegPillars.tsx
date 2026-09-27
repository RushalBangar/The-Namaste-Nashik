import React from 'react';

export const VegPillars: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-low py-12 px-4 md:px-8 border-y border-outline-variant/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="p-6 rounded-2xl bg-cream-card shadow-xs flex flex-col gap-3 transition-transform hover:-translate-y-1 border border-outline-variant/20">
          <div className="w-12 h-12 rounded-xl bg-peach-tint flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[26px]">eco</span>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="font-title-lg text-lg font-bold text-primary">100% Pure Veg Kitchen</h2>
            <p className="font-body-sm text-sm text-charcoal-muted leading-relaxed">
              Zero cross-contamination with dedicated chef stations, pure ingredients, and separate Vedic prep areas.
            </p>
          </div>
          <div className="pt-2 text-pure-veg-green font-label-sm text-xs font-bold flex items-center gap-1.5 mt-auto">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>Strictly Certified Vegetarian</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-2xl bg-cream-card shadow-xs flex flex-col gap-3 transition-transform hover:-translate-y-1 border border-outline-variant/20">
          <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined text-[26px]">history_edu</span>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="font-title-lg text-lg font-bold text-primary">25+ Years Legacy of Taste</h2>
            <p className="font-body-sm text-sm text-charcoal-muted leading-relaxed">
              Traditional heirloom recipes perfected over decades by regional master khansamas and legacy cooks.
            </p>
          </div>
          <div className="pt-2 text-primary font-label-sm text-xs font-bold flex items-center gap-1.5 mt-auto">
            <span className="material-symbols-outlined text-[16px]">award_star</span>
            <span>Time-Honored Flavors</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-2xl bg-cream-card shadow-xs flex flex-col gap-3 transition-transform hover:-translate-y-1 border border-outline-variant/20">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
            <span className="material-symbols-outlined text-[26px]">psychiatry</span>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="font-title-lg text-lg font-bold text-primary">Authentic Regional Spices</h2>
            <p className="font-body-sm text-sm text-charcoal-muted leading-relaxed">
              Sourced directly from local Nashik farmers, Lasalgaon farms, and royal spice hubs of North India.
            </p>
          </div>
          <div className="pt-2 text-primary font-label-sm text-xs font-bold flex items-center gap-1.5 mt-auto">
            <span className="material-symbols-outlined text-[16px]">local_florist</span>
            <span>Slow Pounded Spices</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-6 rounded-2xl bg-cream-card shadow-xs flex flex-col gap-3 transition-transform hover:-translate-y-1 border border-outline-variant/20">
          <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
            <span className="material-symbols-outlined text-[26px]">health_and_safety</span>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="font-title-lg text-lg font-bold text-primary">Highest Sanitization Standards</h2>
            <p className="font-body-sm text-sm text-charcoal-muted leading-relaxed">
              Hospital-grade hygiene protocols, RO-filtered cooking water, and a glass-enclosed viewing kitchen.
            </p>
          </div>
          <div className="pt-2 text-pure-veg-green font-label-sm text-xs font-bold flex items-center gap-1.5 mt-auto">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span>Open Kitchen Transparency</span>
          </div>
        </div>

      </div>
    </section>
  );
};
