import React from 'react';

export const VegPillars: React.FC = () => {
  return (
    <section className="w-full py-space-xl bg-surface border-b border-surface-container-low">
      <div className="max-w-[1280px] mx-auto px-margin-sm lg:px-margin">
        
        <div className="text-center max-w-2xl mx-auto pb-space-lg">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
            Sacred Purity & Conscious Service
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
            Why Nashik Trusts Our Kitchen
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Every grain of wheat, cold-pressed oil, and aromatic clove is sourced with reverence and prepared under meticulous satvik supervision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          
          {/* Pillar 1 */}
          <div className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-200 flex flex-col gap-space-sm group shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[28px]">eco</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              100% Pure Veg Kitchen
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Zero animal products or cross-contamination. Absolute purity guaranteed with daily holy kitchen purification and non-bone-china serving ware.
            </p>
            <span className="font-label-sm text-label-sm text-tertiary font-bold mt-auto flex items-center gap-1">
              <span>Verified Green Kitchen</span>
              <span className="material-symbols-outlined text-[16px]">verified</span>
            </span>
          </div>

          {/* Pillar 2 */}
          <div className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-200 flex flex-col gap-space-sm group shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              4.6 Star Diners' Choice
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Over 2,214 authentic reviews on Google reflect our commitment to hot bhakris, fragrant rassa, and unmatched family memories.
            </p>
            <span className="font-label-sm text-label-sm text-secondary font-bold mt-auto flex items-center gap-1">
              <span>2,214+ Happy Reviews</span>
              <span className="material-symbols-outlined text-[16px]">thumb_up</span>
            </span>
          </div>

          {/* Pillar 3 */}
          <div className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-200 flex flex-col gap-space-sm group shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[28px]">diversity_3</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Inclusive & Women-Led
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Guided by passionate female chefs and restaurateurs. Unequivocally welcoming and safe for LGBTQ+ diners, solo travelers, and elders.
            </p>
            <span className="font-label-sm text-label-sm text-primary font-bold mt-auto flex items-center gap-1">
              <span>Atithi Devo Bhava</span>
              <span className="material-symbols-outlined text-[16px]">favorite</span>
            </span>
          </div>

          {/* Pillar 4 */}
          <div className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-200 flex flex-col gap-space-sm group shadow-xs">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[28px]">sanitizer</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Thermal Sanitized Prep
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Food-grade silver foil thermal packing, UV-treated water for cooking, double-washed vegetables, and contactless pickup bays.
            </p>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-bold mt-auto flex items-center gap-1">
              <span>Hospital-Grade Hygiene</span>
              <span className="material-symbols-outlined text-[16px]">shield</span>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
