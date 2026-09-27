import React, { useState, useMemo } from 'react';
import { MenuItem } from '../types';
import { DishModal } from './DishModal';
import { OFFICIAL_CATEGORIES, OFFICIAL_MENU_ITEMS } from '../data/officialMenuData';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, jainPrep?: boolean) => void;
  onOpenOrderDrawer: () => void;
  onOrderNow?: (item: MenuItem, jainPrep?: boolean) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onOpenOrderDrawer,
  onOrderNow,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDietary, setActiveDietary] = useState<'chef' | 'jain' | 'spicy' | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quantities, setQuantities] = useState<{ [dishId: string]: number }>({});
  const [addedIds, setAddedIds] = useState<{ [dishId: string]: boolean }>({});
  const [modalDish, setModalDish] = useState<MenuItem | null>(null);
  const [menuViewMode, setMenuViewMode] = useState<'digital' | 'scanned_card'>('digital');
  const [selectedCardPage, setSelectedCardPage] = useState<number>(0);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return OFFICIAL_MENU_ITEMS.filter((dish) => {
      // Category match
      let matchesCat = true;
      if (selectedCategory !== 'all') {
        matchesCat = dish.category === selectedCategory;
      }

      // Dietary filter match
      let matchesDiet = true;
      if (activeDietary === 'chef') {
        matchesDiet = dish.category === 'chef_special' || dish.tag.includes('Chef') || dish.tag.includes('Signature');
      } else if (activeDietary === 'jain') {
        matchesDiet = dish.isJainAvailable === true;
      } else if (activeDietary === 'spicy') {
        matchesDiet = dish.spiceLevel === 'spicy';
      }

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        dish.name.toLowerCase().includes(query) ||
        (dish.marathiName && dish.marathiName.toLowerCase().includes(query)) ||
        dish.description.toLowerCase().includes(query) ||
        dish.tagline.toLowerCase().includes(query);

      return matchesCat && matchesDiet && matchesSearch;
    });
  }, [selectedCategory, activeDietary, searchQuery]);

  const handleQtyChange = (dishId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[dishId] || 1;
      const updated = Math.max(1, current + delta);
      return { ...prev, [dishId]: updated };
    });
  };

  const handleAdd = (dish: MenuItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const qty = quantities[dish.id] || 1;
    for (let i = 0; i < qty; i++) {
      onAddToCart(dish, activeDietary === 'jain' && dish.isJainAvailable);
    }
    setAddedIds((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [dish.id]: false }));
    }, 1200);
  };

  const handleDirectOrder = (dish: MenuItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onOrderNow) {
      onOrderNow(dish, activeDietary === 'jain' && dish.isJainAvailable);
    } else {
      handleAdd(dish);
      onOpenOrderDrawer();
    }
  };

  // Original menu card pages summary
  const menuCardPages = [
    {
      page: 1,
      title: 'Page 1: Tandoor Starters & Maharashtrian Main Course',
      desc: 'Hara Bhara Kabab (₹229), Paneer Tikka (₹289), Shev Bhaji (₹219), Bhindi Masala (₹219), Paneer Kadhai (₹289), Kaju Masala (₹289)',
    },
    {
      page: 2,
      title: 'Page 2: Namastey Nashik Chef Special',
      desc: 'Hare Nariyal Ki Sabzi (₹339), Paneer Khas (₹349), Veg Jalfrezi (₹329), Dum Ki Handi (₹329), Sabz Lovely Garden (₹339), Changezi Paneer (₹349)',
    },
    {
      page: 3,
      title: 'Page 3: Dal, Indian Breads & Rice/Biryani',
      desc: 'Dal Tadkewali (₹229), Tandoori Roti (₹30/35), Garlic Naan (₹79/99), Veg Dum Biryani (₹289), Hyderabadi Biryani (₹299), Dal Khichdi (₹249)',
    },
    {
      page: 4,
      title: 'Page 4: Chinese Rice, Noodles, Milkshakes & Desserts',
      desc: 'Veg Fried Rice (₹249), Triple Schezwan Rice (₹309), Hakka Noodles (₹249), Milkshakes (₹149), Sizzling Brownie (₹219), Gulab Jamun (₹99)',
    },
    {
      page: 5,
      title: 'Page 5: Soups & Chinese Starters (11 AM - 11 PM)',
      desc: 'Manchow Soup (₹149), Lemon Coriander (₹149), Tomato Basil (₹149), Veg Manchurian (₹229), Paneer Chilli (₹269), Crispy Corn (₹229)',
    },
    {
      page: 6,
      title: 'Page 6: Beverages, Fresh Juices, Mocktails & Papad/Khakra',
      desc: 'Butter Milk (₹49), Cold Coffee (₹109), Fresh Juices (₹119), Virgin Mojito (₹109), Rumali Khakra (₹189), Cheese Rumali Khakra (₹229)',
    },
    {
      page: 7,
      title: 'Page 7: Pizza, Pasta, Sandwiches & Salads/Raita',
      desc: 'Pizza Margherita (₹219), Paneer Treat Pizza (₹259), Penne Alfredo (₹259), Veg Cheese Grill Sandwich (₹159), Boondi Raita (₹99)',
    },
  ];

  return (
    <section className="w-full bg-cream-surface py-16 px-4 md:px-8 border-t border-outline-variant/30" id="menu-explorer">
      {/* Invisible anchor for backward compatibility */}
      <div id="signature-menu" className="-mt-20 pt-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-peach-tint text-primary font-label-sm text-xs font-bold tracking-wider uppercase">
                Official Restaurant Menu
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-pure-veg-green text-on-tertiary font-label-sm text-xs font-bold">
                100% Pure Veg • Clarified Desi Ghee
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-headline-lg text-primary font-bold">
              The Namastey Nashik Original Menu
            </h2>
            <p className="font-body-md text-sm sm:text-base text-charcoal-muted max-w-2xl">
              Authentic printed restaurant menu with 140+ pure vegetarian delicacies — from our iconic <em>Hare Nariyal Ki Sabzi</em> and <em>Paneer Khas</em> to hand-tossed <em>Cheese Rumali Khakra</em>.
            </p>
          </div>

          {/* Mode Switcher: Interactive Digital Menu vs Scanned Menu Cards */}
          <div className="flex items-center gap-2 bg-surface-container p-1 rounded-2xl border border-outline-variant/30 shrink-0">
            <button
              onClick={() => setMenuViewMode('digital')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                menuViewMode === 'digital'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-charcoal-muted hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">touch_app</span>
              <span>Interactive Menu ({OFFICIAL_MENU_ITEMS.length})</span>
            </button>

            <button
              onClick={() => setMenuViewMode('scanned_card')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                menuViewMode === 'scanned_card'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-charcoal-muted hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">menu_book</span>
              <span>Menu Card (7 Pages)</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Scanned Original Menu Card Gallery */}
        {menuViewMode === 'scanned_card' ? (
          <div className="flex flex-col gap-6 p-6 rounded-3xl bg-cream-card border border-outline-variant/30 shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-surface-container">
              <div>
                <span className="font-label-sm text-xs font-bold text-saffron-deep uppercase tracking-wider">
                  Original Printed Restaurant Menu
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-primary font-bold">
                  {menuCardPages[selectedCardPage].title}
                </h3>
                <p className="font-body-sm text-xs sm:text-sm text-charcoal-muted mt-0.5">
                  {menuCardPages[selectedCardPage].desc}
                </p>
              </div>

              {/* Page navigation buttons */}
              <div className="flex items-center gap-2">
                <button
                  disabled={selectedCardPage === 0}
                  onClick={() => setSelectedCardPage((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-xl border border-outline-variant bg-surface text-xs font-bold text-primary disabled:opacity-40 hover:bg-peach-tint cursor-pointer"
                >
                  ← Prev Page
                </button>
                <span className="font-label-md text-xs font-bold text-primary px-2">
                  Page {selectedCardPage + 1} of 7
                </span>
                <button
                  disabled={selectedCardPage === 6}
                  onClick={() => setSelectedCardPage((prev) => Math.min(6, prev + 1))}
                  className="px-3 py-1.5 rounded-xl border border-outline-variant bg-surface text-xs font-bold text-primary disabled:opacity-40 hover:bg-peach-tint cursor-pointer"
                >
                  Next Page →
                </button>
              </div>
            </div>

            {/* Page selection pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {menuCardPages.map((pg, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCardPage(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCardPage === idx
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container text-charcoal-muted hover:bg-peach-tint hover:text-primary'
                  }`}
                >
                  Page {pg.page}: {pg.title.split(':')[1]?.trim() || pg.title}
                </button>
              ))}
            </div>

            {/* Scanned Menu Page Content Preview Table */}
            <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-peach-tint flex items-center justify-center text-primary font-bold text-sm">
                    {selectedCardPage + 1}
                  </div>
                  <span className="font-title-md text-sm sm:text-base font-bold text-primary">
                    Dishes on {menuCardPages[selectedCardPage].title}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setMenuViewMode('digital');
                    if (selectedCardPage === 0) setSelectedCategory('tandoor_starters');
                    if (selectedCardPage === 1) setSelectedCategory('chef_special');
                    if (selectedCardPage === 2) setSelectedCategory('dal_breads');
                    if (selectedCardPage === 3) setSelectedCategory('chinese');
                    if (selectedCardPage === 4) setSelectedCategory('soups');
                    if (selectedCardPage === 5) setSelectedCategory('beverages_desserts');
                    if (selectedCardPage === 6) setSelectedCategory('pizza_pasta');
                  }}
                  className="text-xs font-bold text-saffron-deep hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Order these items in Digital Menu</span>
                  <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                </button>
              </div>

              {/* Items Table for this card page */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {OFFICIAL_MENU_ITEMS.filter((item) => {
                  if (selectedCardPage === 0) return item.category === 'tandoor_starters' || item.category === 'maharashtrian';
                  if (selectedCardPage === 1) return item.category === 'chef_special';
                  if (selectedCardPage === 2) return item.category === 'dal_breads' || item.category === 'rice_biryani';
                  if (selectedCardPage === 3) return item.category === 'chinese';
                  if (selectedCardPage === 4) return item.category === 'soups';
                  if (selectedCardPage === 5) return item.category === 'beverages_desserts' || item.category === 'papad_khakra';
                  return item.category === 'pizza_pasta';
                }).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setModalDish(item)}
                    className="p-3.5 rounded-xl bg-surface-container-low hover:bg-peach-tint/40 border border-outline-variant/30 flex items-center justify-between gap-3 cursor-pointer transition-colors"
                  >
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-title-sm text-xs sm:text-sm font-bold text-on-surface truncate">
                          {item.name}
                        </span>
                        {item.isJainAvailable && (
                          <span className="w-1.5 h-1.5 rounded-full bg-pure-veg-green shrink-0" title="Jain Available"></span>
                        )}
                      </div>
                      <span className="font-label-sm text-[11px] text-charcoal-muted truncate">
                        {item.tagline}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-title-md text-sm font-bold text-primary">₹{item.price}</span>
                      <button
                        onClick={(e) => handleAdd(item, e)}
                        className="p-1.5 rounded-lg bg-primary hover:bg-saffron-vibrant text-on-primary transition-all cursor-pointer"
                        title="Add to bag"
                      >
                        <span className="material-symbols-outlined text-[15px]">add</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* View Mode 2: Interactive Digital Menu Browser */
          <>
            {/* Search & Dietary Filters Bar */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <input
                  id="menu-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 140+ dishes (e.g. Paneer Khas, Rumali Khakra, Shev Bhaji, Mojito)..."
                  className="w-full px-4 py-2.5 pl-10 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-sm shadow-xs border border-outline-variant/40 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
                <span className="material-symbols-outlined absolute left-3 top-3 text-[18px] text-charcoal-muted pointer-events-none">
                  search
                </span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-charcoal-muted hover:text-primary cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                )}
              </div>

              {/* Quick Dietary Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-on-surface mr-1">Filter:</span>

                <button
                  onClick={() => setActiveDietary(activeDietary === 'chef' ? null : 'chef')}
                  className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer font-bold ${
                    activeDietary === 'chef'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-lowest text-charcoal-muted hover:bg-peach-tint hover:text-primary border border-outline-variant/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span>Chef Specials</span>
                </button>

                <button
                  onClick={() => setActiveDietary(activeDietary === 'jain' ? null : 'jain')}
                  className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer font-bold ${
                    activeDietary === 'jain'
                      ? 'bg-pure-veg-green text-on-tertiary shadow-xs'
                      : 'bg-surface-container-lowest text-charcoal-muted hover:bg-peach-tint hover:text-primary border border-outline-variant/40'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-pure-veg-green shrink-0"></span>
                  <span>Jain Friendly</span>
                </button>

                <button
                  onClick={() => setActiveDietary(activeDietary === 'spicy' ? null : 'spicy')}
                  className={`px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer font-bold ${
                    activeDietary === 'spicy'
                      ? 'bg-saffron-deep text-on-primary shadow-xs'
                      : 'bg-surface-container-lowest text-charcoal-muted hover:bg-peach-tint hover:text-primary border border-outline-variant/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
                  <span>Spicy</span>
                </button>

                {activeDietary && (
                  <button
                    onClick={() => setActiveDietary(null)}
                    className="text-primary hover:underline text-xs ml-1 cursor-pointer font-semibold"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Category Pills Bar (Horizontal Scroll) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" id="category-pills">
              {OFFICIAL_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full font-label-md text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-primary text-on-primary shadow-xs'
                        : 'bg-surface-container-lowest text-charcoal-muted hover:bg-peach-tint hover:text-primary border border-outline-variant/30'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Results Count & Current Active Filters Banner */}
            <div className="flex items-center justify-between text-xs text-charcoal-muted">
              <span>
                Showing <strong>{filteredDishes.length}</strong> delicacies
                {selectedCategory !== 'all' && ` in ${OFFICIAL_CATEGORIES.find((c) => c.id === selectedCategory)?.label}`}
                {activeDietary && ` (${activeDietary} filter applied)`}
              </span>
              {(selectedCategory !== 'all' || activeDietary || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setActiveDietary(null);
                    setSearchQuery('');
                  }}
                  className="text-primary font-bold hover:underline cursor-pointer"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Dish Cards Grid */}
            {filteredDishes.length === 0 ? (
              <div className="py-16 text-center bg-cream-card rounded-2xl border border-dashed border-outline-variant p-8 flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-4xl text-charcoal-muted">dinner_dining</span>
                <p className="text-on-surface font-semibold">No dishes match your active search or filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setActiveDietary(null);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold"
                >
                  Reset & Show All Items
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="menu-items-grid">
                {filteredDishes.map((dish) => {
                  const qty = quantities[dish.id] || 1;
                  const isAdded = addedIds[dish.id];

                  return (
                    <div
                      key={dish.id}
                      onClick={() => setModalDish(dish)}
                      className="menu-card rounded-2xl overflow-hidden bg-cream-card shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-outline-variant/30 cursor-pointer group"
                    >
                      <div>
                        {/* Dish Visual Header */}
                        <div className="relative h-48 overflow-hidden bg-surface-container-high">
                          <img
                            src={dish.imageUrl}
                            alt={dish.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          {/* Pure Veg Badge */}
                          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-surface-container-lowest/90 backdrop-blur-sm flex items-center gap-1.5 shadow-xs">
                            <div className="w-3 h-3 border border-pure-veg-green flex items-center justify-center p-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-pure-veg-green"></div>
                            </div>
                            <span className="font-label-sm text-[10px] text-pure-veg-green font-bold">Pure Veg</span>
                          </div>

                          {/* Tag / Category Badge */}
                          <span
                            className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full font-label-sm text-xs font-semibold shadow-xs ${
                              dish.category === 'chef_special'
                                ? 'bg-primary text-on-primary'
                                : 'bg-surface-container-lowest/90 text-primary border border-primary/20'
                            }`}
                          >
                            {dish.tag}
                          </span>
                        </div>

                        {/* Dish Details */}
                        <div className="p-5 flex flex-col gap-2">
                          <div className="flex items-baseline justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="font-title-lg text-lg text-primary font-bold truncate group-hover:text-saffron-deep transition-colors">
                                {dish.name}
                              </h3>
                              {dish.marathiName && (
                                <span className="font-label-sm text-xs text-charcoal-muted block truncate mt-0.5">
                                  {dish.marathiName}
                                </span>
                              )}
                            </div>
                            <span className="font-headline-sm text-xl text-saffron-deep font-bold shrink-0">
                              ₹{dish.price}
                            </span>
                          </div>

                          <p className="font-body-sm text-xs sm:text-sm text-charcoal-muted line-clamp-2 leading-relaxed">
                            {dish.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 pt-1 text-on-surface-variant font-label-sm text-xs">
                            <span className="text-charcoal-muted">{dish.tagline}</span>
                            {dish.isJainAvailable && (
                              <>
                                <span>•</span>
                                <span className="text-pure-veg-green font-semibold">Jain Available</span>
                              </>
                            )}
                            {dish.spiceLevel === 'spicy' && (
                              <>
                                <span>•</span>
                                <span className="text-saffron-deep font-semibold">Spicy</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions Bar */}
                      <div
                        className="p-5 pt-0 flex flex-col sm:flex-row items-center justify-between gap-2.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Quantity Counter */}
                        <div className="flex items-center rounded-xl bg-surface-container px-2 py-1 w-full sm:w-auto justify-between sm:justify-start">
                          <button
                            onClick={() => handleQtyChange(dish.id, -1)}
                            className="text-primary hover:text-saffron-vibrant px-2 font-bold text-base cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-3 font-title-md text-sm font-bold text-on-surface min-w-[24px] text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleQtyChange(dish.id, 1)}
                            className="text-primary hover:text-saffron-vibrant px-2 font-bold text-base cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Order Actions */}
                        <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
                          <button
                            onClick={(e) => handleAdd(dish, e)}
                            className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95 ${
                              isAdded
                                ? 'bg-pure-veg-green text-on-tertiary'
                                : 'bg-primary hover:bg-saffron-vibrant text-on-primary'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[17px]">
                              {isAdded ? 'done' : 'shopping_bag'}
                            </span>
                            <span>{isAdded ? 'Added!' : '+ Bag'}</span>
                          </button>

                          <button
                            onClick={(e) => handleDirectOrder(dish, e)}
                            className="py-2.5 px-3 rounded-xl bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-bold text-xs transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer active:scale-95 whitespace-nowrap"
                            title="Direct Order via WhatsApp"
                          >
                            <span className="material-symbols-outlined text-[17px]">send_to_mobile</span>
                            <span className="hidden xs:inline">Order</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Custom Banquet & Family Feasts Strip */}
        <div className="mt-4 p-6 rounded-2xl bg-peach-tint/60 border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">room_service</span>
            </div>
            <div className="flex flex-col">
              <span className="font-title-lg text-base sm:text-title-lg text-primary font-bold">
                Special Catering & Custom Jain Feasts?
              </span>
              <span className="font-body-sm text-xs sm:text-sm text-charcoal-muted">
                Pre-order whole thali platters, live tandoor stations, or customized zero-onion zero-garlic menus for family occasions.
              </span>
            </div>
          </div>
          <a
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-saffron-vibrant text-on-primary font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shadow-xs"
            href="tel:+919823045678"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Call +91 98230 45678</span>
          </a>
        </div>

      </div>

      {/* Dish Detailed Modal */}
      {modalDish && (
        <DishModal
          dish={modalDish}
          isOpen={Boolean(modalDish)}
          onClose={() => setModalDish(null)}
          onAddToCart={(dish, jain) => onAddToCart(dish, jain)}
          onOrderNow={onOrderNow}
        />
      )}
    </section>
  );
};
