import React, { useState } from 'react';
import { MenuItem } from '../types';
import { DishVisual } from './DishIllustrations';

interface DishModalProps {
  dish: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (dish: MenuItem, jainPrep?: boolean) => void;
}

export const DishModal: React.FC<DishModalProps> = ({ dish, isOpen, onClose, onAddToCart }) => {
  const [isJainSelected, setIsJainSelected] = useState(false);
  const [added, setAdded] = useState(false);

  if (!isOpen || !dish) return null;

  const handleAdd = () => {
    onAddToCart(dish, isJainSelected && dish.isJainAvailable);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-outline-variant/40 relative animate-in fade-in zoom-in-95 duration-150 my-auto max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-surface-container-lowest/85 hover:bg-surface-container-lowest text-on-surface backdrop-blur-sm transition-colors cursor-pointer shadow-xs min-h-[36px] min-w-[36px] flex items-center justify-center"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Visual Media Container */}
        <div className="relative h-56 sm:h-64 bg-surface-container shrink-0 overflow-hidden">
          <DishVisual
            dishId={dish.id}
            imageUrl={dish.imageUrl}
            name={dish.name}
            category={dish.category}
            className="w-full h-full"
          />
          <div className="absolute top-3 left-3 bg-surface-container-lowest/95 backdrop-blur-sm px-2.5 py-1 rounded-md border border-tertiary shadow-xs flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
            <span className="text-[11px] font-bold text-tertiary uppercase">100% Pure Veg</span>
          </div>

          <div className="absolute bottom-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-md shadow-xs">
            {dish.tag}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-y-auto">
          
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-headline-sm text-xl sm:text-2xl font-bold text-on-surface leading-tight">
                {dish.name}
              </h3>
              {dish.marathiName && (
                <div className="text-xs sm:text-sm text-secondary font-semibold mt-0.5">
                  {dish.marathiName}
                </div>
              )}
            </div>
            <div className="text-right shrink-0">
              <div className="font-headline-sm text-xl sm:text-2xl font-bold text-primary">
                ₹{dish.price}
              </div>
              <span className="text-[11px] text-on-surface-variant block">Inc. all taxes</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-body-sm">
            {dish.description}
          </p>

          {/* Quick Specifications */}
          <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-surface-container text-center text-xs">
            <div className="bg-surface-container-low p-2 rounded-lg">
              <span className="block text-[10px] text-on-surface-variant uppercase font-bold">Service</span>
              <span className="font-semibold text-on-surface text-[11px] sm:text-xs truncate block">{dish.tagline}</span>
            </div>
            <div className="bg-surface-container-low p-2 rounded-lg">
              <span className="block text-[10px] text-on-surface-variant uppercase font-bold">Spice Level</span>
              <span className={`font-bold capitalize text-[11px] sm:text-xs ${dish.spiceLevel === 'spicy' ? 'text-primary' : 'text-secondary'}`}>
                {dish.spiceLevel}
              </span>
            </div>
            <div className="bg-surface-container-low p-2 rounded-lg">
              <span className="block text-[10px] text-on-surface-variant uppercase font-bold">Packaging</span>
              <span className="font-bold text-tertiary text-[11px] sm:text-xs">Thermal Sealed</span>
            </div>
          </div>

          {/* Jain Option Switcher if Available */}
          {dish.isJainAvailable ? (
            <div className="p-3 bg-tertiary-fixed/20 border border-tertiary-fixed rounded-xl flex items-center justify-between gap-2">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-tertiary shrink-0 mt-0.5">eco</span>
                <div>
                  <div className="text-xs font-bold text-on-surface">
                    Jain Preparation Available
                  </div>
                  <div className="text-[11px] text-tertiary font-medium">
                    Prepared without root vegetables, garlic, or onions.
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsJainSelected(!isJainSelected)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer shrink-0 min-h-[36px] ${
                  isJainSelected
                    ? 'bg-tertiary text-on-tertiary border-tertiary shadow-xs'
                    : 'bg-surface-container-lowest text-tertiary border-tertiary hover:bg-tertiary-fixed/40'
                }`}
              >
                {isJainSelected ? 'Selected ✓' : 'Select Jain'}
              </button>
            </div>
          ) : (
            <div className="text-[11px] text-on-surface-variant italic">
              * Prepared with traditional authentic spices & farm-fresh aromatics.
            </div>
          )}

          {/* Action Row */}
          <div className="pt-2 flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onClose}
              className="px-3.5 sm:px-4 py-3 text-xs font-semibold text-on-surface-variant hover:text-on-surface border border-outline-variant/60 rounded-xl cursor-pointer min-h-[44px]"
            >
              Back
            </button>
            <button
              onClick={handleAdd}
              className={`flex-1 py-3 px-4 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer min-h-[44px] active:scale-[0.98] ${
                added
                  ? 'bg-tertiary text-on-tertiary'
                  : 'bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {added ? 'check' : 'shopping_bag'}
              </span>
              <span>{added ? 'Added to Order Bag' : `Add to Order Bag (₹${dish.price})`}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
