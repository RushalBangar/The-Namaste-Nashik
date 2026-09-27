import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';
import { MenuItem } from '../types';
import { DishModal } from './DishModal';
import { DishVisual } from './DishIllustrations';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, jainPrep?: boolean) => void;
  onOpenOrderDrawer: () => void;
  onOrderNow?: (item: MenuItem, jainPrep?: boolean) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onAddToCart, onOpenOrderDrawer, onOrderNow }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [jainOnly, setJainOnly] = useState<boolean>(false);
  const [selectedSpice, setSelectedSpice] = useState<'all' | 'mild' | 'medium' | 'spicy'>('all');
  const [bestsellerOnly, setBestsellerOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedItemIds, setAddedItemIds] = useState<{ [key: string]: boolean }>({});
  const [modalDish, setModalDish] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Delicacies', icon: 'restaurant' },
    { id: 'signature', label: "⭐ Chef's Specials", icon: 'star' },
    { id: 'khakra', label: '🫓 Papad & Khakra', icon: 'bakery_dining' },
    { id: 'starters', label: '🍢 Tandoor Starters', icon: 'kebab_dining' },
    { id: 'chinese_starters', label: '🥢 Indo-Chinese', icon: 'ramen_dining' },
    { id: 'soups', label: '🍲 Handcrafted Soups', icon: 'soup_kitchen' },
    { id: 'curries', label: '🥘 Dal & Curries', icon: 'dinner_dining' },
    { id: 'rice', label: '🍚 Rice & Biryani', icon: 'rice_bowl' },
    { id: 'breads', label: '🫓 Tandoor Breads', icon: 'flatware' },
    { id: 'noodles', label: '🍜 Noodles & Rice', icon: 'set_meal' },
    { id: 'continental', label: '🍕 Continental & Pizza', icon: 'local_pizza' },
    { id: 'salads', label: '🥗 Salads & Raitas', icon: 'eco' },
    { id: 'beverages', label: '🍹 Mocktails & Coolers', icon: 'local_bar' },
  ];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MENU_ITEMS.length };
    MENU_ITEMS.forEach((dish) => {
      counts[dish.category] = (counts[dish.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS.filter((item) => {
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
      const jainMatch = !jainOnly || item.isJainAvailable;
      const spiceMatch = selectedSpice === 'all' || item.spiceLevel === selectedSpice;
      const bestsellerMatch = !bestsellerOnly || Boolean(item.isPopular);
      const query = searchQuery.toLowerCase().trim();
      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        (item.marathiName && item.marathiName.toLowerCase().includes(query)) ||
        item.description.toLowerCase().includes(query) ||
        item.tag.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query);
      return categoryMatch && jainMatch && spiceMatch && bestsellerMatch && searchMatch;
    });

    if (sortBy === 'price-asc') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      items = [...items].sort((a, b) => b.price - a.price);
    }

    return items;
  }, [selectedCategory, jainOnly, selectedSpice, bestsellerOnly, sortBy, searchQuery]);

  const handleAdd = (item: MenuItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onAddToCart(item, jainOnly && item.isJainAvailable);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setJainOnly(false);
    setSelectedSpice('all');
    setBestsellerOnly(false);
    setSortBy('featured');
    setSearchQuery('');
  };

  return (
    <section className="w-full py-12 sm:py-space-xl bg-surface" id="signature-menu">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-margin">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 sm:pb-space-lg">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-xs sm:text-label-sm text-primary uppercase tracking-widest font-bold">
                100% Pure Vegetarian Gastronomy
              </span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 border border-tertiary rounded-[2px] p-[1.5px]" title="Pure Veg">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              </span>
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-headline-lg text-on-surface mt-1">
              Complete Pure Veg Dining Menu
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
              Serving 12:00 PM – 11:00 PM Daily. Featuring Chef's Signature creations, clay tandoor starters, handcrafted soups, stone-ground curries, and tropical coolers.
            </p>
          </div>

          {/* Quick Bag / Order Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenOrderDrawer}
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              <span>View Order Bag</span>
            </button>
          </div>
        </div>

        {/* Functional Filters Toolbar */}
        <div className="p-3 sm:p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 mb-5 sm:mb-6 shadow-xs flex flex-col gap-3">
          
          {/* Row 1: Search & Jain Toggle & Sort */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Real-time Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                className="w-full pl-10 pr-9 py-2.5 bg-surface-container-lowest text-on-surface font-body-sm text-xs sm:text-sm rounded-xl shadow-xs focus:outline-hidden focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface-variant border border-outline-variant/40"
                id="menu-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by dish name, ingredient (e.g. Paneer Khas, Khakra, Biryani)..."
                type="text"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-on-surface-variant hover:text-on-surface text-sm cursor-pointer p-0.5"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Jain Only Toggle & Sort Dropdown */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              {/* Jain Only Toggle */}
              <label className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl cursor-pointer transition-all border shadow-xs select-none ${
                jainOnly
                  ? 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary font-bold'
                  : 'bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:bg-surface-container'
              }`}>
                <input
                  className="w-4 h-4 accent-tertiary rounded cursor-pointer"
                  id="jain-toggle"
                  type="checkbox"
                  checked={jainOnly}
                  onChange={(e) => setJainOnly(e.target.checked)}
                />
                <span className="font-label-md text-xs sm:text-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  Jain Only (No Onion/Garlic)
                </span>
              </label>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1 bg-surface-container-lowest px-2.5 py-1.5 rounded-xl border border-outline-variant/30 shadow-xs">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">sort</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-semibold text-on-surface focus:outline-hidden cursor-pointer py-1"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

          </div>

          {/* Row 2: Spice Level Filter Chips & Active Summary */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-surface-container">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mr-1 shrink-0">Spice:</span>
              
              <button
                onClick={() => setSelectedSpice('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                  selectedSpice === 'all'
                    ? 'bg-on-surface text-surface shadow-xs'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                }`}
              >
                All Spice
              </button>
              
              <button
                onClick={() => setSelectedSpice('mild')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1 ${
                  selectedSpice === 'mild'
                    ? 'bg-secondary text-on-secondary shadow-xs'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                }`}
              >
                <span>🟢</span>
                <span>Mild</span>
              </button>

              <button
                onClick={() => setSelectedSpice('medium')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1 ${
                  selectedSpice === 'medium'
                    ? 'bg-primary-container text-on-primary-container shadow-xs'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                }`}
              >
                <span>🟡</span>
                <span>Medium</span>
              </button>

              <button
                onClick={() => setSelectedSpice('spicy')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1 ${
                  selectedSpice === 'spicy'
                    ? 'bg-error text-on-error shadow-xs'
                    : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                }`}
              >
                <span>🌶️</span>
                <span>Spicy</span>
              </button>

              <div className="w-[1px] h-4 bg-outline-variant/40 mx-1 shrink-0 hidden sm:block" />

              <button
                onClick={() => setBestsellerOnly(!bestsellerOnly)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 flex items-center gap-1 border ${
                  bestsellerOnly
                    ? 'bg-secondary text-on-secondary border-secondary shadow-xs'
                    : 'bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:bg-surface-container'
                }`}
              >
                <span>⭐</span>
                <span>Bestsellers Only</span>
              </button>
            </div>

            {/* Results count & reset */}
            <div className="flex items-center gap-2 ml-auto text-xs text-on-surface-variant">
              <span>Showing <strong>{filteredItems.length}</strong> items</span>
              {(selectedCategory !== 'all' || jainOnly || selectedSpice !== 'all' || bestsellerOnly || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="text-primary hover:underline font-bold cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Category Filter Tabs - Mobile Horizontal Scrollable */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x" id="category-tabs">
            {categories.map((cat) => {
              const count = categoryCounts[cat.id] ?? 0;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl font-label-md text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer shrink-0 snap-start flex items-center gap-1.5 active:scale-95 border ${
                    isSelected
                      ? 'bg-primary text-on-primary border-primary shadow-sm font-bold'
                      : 'bg-surface-container-lowest text-on-surface border-outline-variant/30 hover:bg-surface-container'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isSelected ? 'bg-on-primary text-primary' : 'bg-surface-container-high text-on-surface-variant'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Grid with Real Food Photography */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6 flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-[48px] text-outline-variant">search_off</span>
            <h3 className="font-headline-sm text-lg font-bold text-on-surface">No dishes match your active filters</h3>
            <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant max-w-md">
              Try switching categories, clearing the search keyword, or unchecking the Jain-only filter to see more pure veg delicacies.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" id="dish-grid">
            {filteredItems.map((dish) => {
              const isAdded = addedItemIds[dish.id];

              return (
                <div
                  key={dish.id}
                  onClick={() => setModalDish(dish)}
                  className="dish-card rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-lg overflow-hidden flex flex-col group cursor-pointer transition-all duration-200 border border-outline-variant/30 active:scale-[0.99]"
                >
                  {/* Real Food Image Banner */}
                  <div className="relative h-48 sm:h-52 bg-surface-container overflow-hidden">
                    <DishVisual
                      dishId={dish.id}
                      imageUrl={dish.imageUrl}
                      name={dish.name}
                      category={dish.category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient shade for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Top-left Badges */}
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-wrap gap-1.5 z-10">
                      <span className="px-2.5 py-1 rounded-md bg-primary-container text-on-primary-container font-label-sm text-[10px] sm:text-xs font-bold shadow-xs">
                        {dish.tag}
                      </span>
                      {dish.isJainAvailable && (
                        <span className="px-2.5 py-1 rounded-md bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[10px] sm:text-xs font-bold shadow-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                          Jain Option
                        </span>
                      )}
                    </div>

                    {/* Spice Level Indicator */}
                    <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-white font-label-sm text-[10px] z-10 flex items-center gap-1">
                      <span>{dish.spiceLevel === 'spicy' ? '🌶️ Spicy' : dish.spiceLevel === 'medium' ? '🟡 Medium' : '🟢 Mild'}</span>
                    </div>

                    {/* Price Badge on photo */}
                    <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-3 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-primary font-headline-sm text-sm sm:text-base font-bold shadow-md z-10">
                      ₹{dish.price}
                    </div>
                  </div>

                  {/* Dish Card Body */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface leading-snug group-hover:text-primary transition-colors truncate">
                          {dish.name}
                        </h3>
                        {dish.marathiName && (
                          <span className="font-label-sm text-xs text-secondary font-semibold block mt-0.5">
                            {dish.marathiName}
                          </span>
                        )}
                      </div>
                      <span
                        className="inline-flex items-center justify-center w-4 h-4 border border-tertiary rounded-[2px] p-[2px] shrink-0 mt-1"
                        title="100% Pure Vegetarian"
                      >
                        <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                      </span>
                    </div>

                    <p className="font-body-sm text-xs text-on-surface-variant flex-1 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>

                    {/* Tagline spec pill */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="inline-flex items-center gap-1 font-label-sm text-[11px] text-primary bg-primary-fixed/40 px-2 py-0.5 rounded-md font-medium">
                        <span className="material-symbols-outlined text-[13px]">local_fire_department</span>
                        {dish.tagline}
                      </span>
                    </div>

                    {/* Action Buttons: Order Now & Add to Bag */}
                    <div className="pt-2 sm:pt-3 mt-auto flex items-center gap-2">
                      <button
                        type="button"
                        className="flex-1 py-2.5 px-3 rounded-xl font-label-md text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer min-h-[42px] bg-tertiary hover:bg-tertiary-container text-on-tertiary active:scale-[0.98]"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOrderNow) {
                            onOrderNow(dish, jainOnly && dish.isJainAvailable);
                          } else {
                            handleAdd(dish, e);
                          }
                        }}
                        title="Order this dish & send direct message to restaurant"
                      >
                        <span className="material-symbols-outlined text-[18px]">send_to_mobile</span>
                        <span>Order Now</span>
                      </button>

                      <button
                        type="button"
                        className={`py-2.5 px-3 rounded-xl font-label-md text-xs font-semibold transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer min-h-[42px] active:scale-[0.98] ${
                          isAdded
                            ? 'bg-secondary text-on-secondary'
                            : 'bg-surface-container-high hover:bg-surface-container text-on-surface border border-outline-variant/40'
                        }`}
                        onClick={(e) => handleAdd(dish, e)}
                        title="Add to dining bag"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {isAdded ? 'check' : 'add_shopping_cart'}
                        </span>
                        <span>{isAdded ? 'Added' : '+ Bag'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Quick Phone Order Strip */}
        <div className="mt-8 sm:mt-space-xl p-4 sm:p-space-lg rounded-2xl bg-surface-container-high flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs border border-outline-variant/30">
          <div className="flex items-center gap-3 sm:gap-space-md">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
              <span className="material-symbols-outlined text-[20px] sm:text-[24px]">call</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-base sm:text-headline-sm text-on-surface leading-tight font-bold">
                Prefer Ordering Directly Over Phone?
              </h4>
              <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant mt-0.5">
                Our Lawate Nagar order desk is open daily 12:00 PM – 11:00 PM for dine-in bookings, takeaways & doorstep delivery.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto">
            <a
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-label-lg text-xs sm:text-sm font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-md whitespace-nowrap min-h-[44px]"
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
            >
              <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
              <span>Call {RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>

      </div>

      {/* Dish Preview Modal */}
      <DishModal
        dish={modalDish}
        isOpen={Boolean(modalDish)}
        onClose={() => setModalDish(null)}
        onAddToCart={onAddToCart}
        onOrderNow={onOrderNow}
      />
    </section>
  );
};
