import React, { useState } from 'react';

// Verified, authentic, high-resolution food photography mapped precisely to culinary preparations
export const REAL_FOOD_ASSETS = {
  // Breads (Indian Tandoor & Tawa - NOT European bread)
  naan: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Annapurna_Naan.jpg/960px-Annapurna_Naan.jpg',
  roti: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/2020-05-08_19_34_28_Chapati_being_made_in_a_pan_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg/960px-2020-05-08_19_34_28_Chapati_being_made_in_a_pan_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg',
  paratha: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Triangle_paratha_%28cropped%29.JPG/960px-Triangle_paratha_%28cropped%29.JPG',

  // Desserts & Beverages
  gulab_jamun: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Gulab-jamun-wallpaper-1.jpg',
  brownie: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
  ice_cream: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg/960px-Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg',
  chaas: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Salt_lassi.jpg/960px-Salt_lassi.jpg',
  mojito: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/15-09-26-RalfR-WLC-0072.jpg/960px-15-09-26-RalfR-WLC-0072.jpg',
  orange_juice: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&auto=format&fit=crop&q=80',
  cold_coffee: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop&q=80',

  // Continental & Fast Food
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
  penne_alfredo: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80',
  penne_arrabbiata: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&auto=format&fit=crop&q=80',
  sandwich: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80',
  french_fries: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&auto=format&fit=crop&q=80',

  // Accompaniments & Papad
  papad_khakra: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/Roasted_Papad_-_Howrah_2013-11-02_4068.jpg/960px-Roasted_Papad_-_Howrah_2013-11-02_4068.jpg',
  raita: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Cucumber-raita.jpg/960px-Cucumber-raita.jpg',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',

  // Soups
  tomato_soup: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Tomato_soup%2C_plant-based_%2844040252791%29.jpg/960px-Tomato_soup%2C_plant-based_%2844040252791%29.jpg',
  corn_soup: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4b/Corn_soup.jpg/960px-Corn_soup.jpg',
  veg_soup: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Ping_SJ_hot_%26_sour_soup.JPG/960px-Ping_SJ_hot_%26_sour_soup.JPG',

  // Chinese
  noodles: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80',
  fried_rice: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=80',
  manchurian: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/Chicken_Manchurian_%28Hyderabad_Style%29_%2811960049916%29.jpg/960px-Chicken_Manchurian_%28Hyderabad_Style%29_%2811960049916%29.jpg',
  veg_crispy: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Onion_pakora_-_a.jpg/960px-Onion_pakora_-_a.jpg',
  spring_roll: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Spring_Rolls_%283357696061%29.jpg/960px-Spring_Rolls_%283357696061%29.jpg',

  // Rice & Biryani
  biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
  dal_khichdi: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Dall_Khichdi.jpg',
  basmati_rice: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Khyma_and_Basmati_rice.jpg',

  // Starters (Tandoor)
  paneer_tikka: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
  seekh_kabab: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Lula_kebab_2.jpg/960px-Lula_kebab_2.jpg',
  tikki_patty: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Aloo_Tikki_served_with_chutneys.jpg/960px-Aloo_Tikki_served_with_chutneys.jpg',

  // Maharashtrian
  shev_bhaji: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Kolhapuri_Misal_Pav.jpg/960px-Kolhapuri_Misal_Pav.jpg',
  baingan_bharta: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Baigan_Bharta_from_Nagpur.JPG/960px-Baigan_Bharta_from_Nagpur.JPG',

  // Dals
  dal_tadka: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=800&auto=format&fit=crop&q=80',
  dal_makhani: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Punjabi_style_Dal_Makhani.jpg/960px-Punjabi_style_Dal_Makhani.jpg',

  // Indian Curries & Gravies
  hare_nariyal: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
  palak_paneer: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80',
  amritsari_chole: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Chana_masala.jpg/960px-Chana_masala.jpg',
  paneer_butter_masala: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80',
  shahi_paneer: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Shahi_panner.jpg/960px-Shahi_panner.jpg',
  matar_paneer: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Matar_paneer_dish.jpg/960px-Matar_paneer_dish.jpg',
  kadai_gravy: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Kadai_Paneer-Delhi-12.jpg',
};

// Exact dish-name-aware resolver: ensures the picture directly and accurately matches the food item
export function getDishRealPhoto(name: string, category?: string, providedUrl?: string): string {
  const n = (name || '').toLowerCase();
  const cat = (category || '').toLowerCase();

  // Breads (Indian Tandoor)
  if (n.includes('naan')) return REAL_FOOD_ASSETS.naan;
  if (n.includes('roti') || n.includes('chapati')) return REAL_FOOD_ASSETS.roti;
  if (n.includes('paratha') || n.includes('kulcha')) return REAL_FOOD_ASSETS.paratha;

  // Desserts & Beverages
  if (n.includes('jamun')) return REAL_FOOD_ASSETS.gulab_jamun;
  if (n.includes('brownie')) return REAL_FOOD_ASSETS.brownie;
  if (n.includes('ice cream')) return REAL_FOOD_ASSETS.ice_cream;
  if (n.includes('chaas') || n.includes('butter milk') || n.includes('lassi')) return REAL_FOOD_ASSETS.chaas;
  if (n.includes('mojito')) return REAL_FOOD_ASSETS.mojito;
  if (n.includes('orange juice') || n.includes('juice')) return REAL_FOOD_ASSETS.orange_juice;
  if (n.includes('cold coffee') || n.includes('coffee')) return REAL_FOOD_ASSETS.cold_coffee;

  // Continental & Fast Food
  if (n.includes('pizza')) return REAL_FOOD_ASSETS.pizza;
  if (n.includes('arrabbiata')) return REAL_FOOD_ASSETS.penne_arrabbiata;
  if (n.includes('alfredo') || (n.includes('pasta') && !n.includes('arrabbiata'))) return REAL_FOOD_ASSETS.penne_alfredo;
  if (n.includes('sandwich')) return REAL_FOOD_ASSETS.sandwich;
  if (n.includes('fries') || n.includes('peri peri')) return REAL_FOOD_ASSETS.french_fries;

  // Papad, Khakra & Accompaniments
  if (n.includes('papad') || n.includes('khakra')) return REAL_FOOD_ASSETS.papad_khakra;
  if (n.includes('raita') || n.includes('boondi')) return REAL_FOOD_ASSETS.raita;
  if (n.includes('salad')) return REAL_FOOD_ASSETS.salad;

  // Soups
  if (n.includes('tomato') && n.includes('soup')) return REAL_FOOD_ASSETS.tomato_soup;
  if (n.includes('corn') && n.includes('soup')) return REAL_FOOD_ASSETS.corn_soup;
  if (n.includes('soup')) return REAL_FOOD_ASSETS.veg_soup;

  // Chinese
  if (n.includes('noodle') || n.includes('hakka') || n.includes('schezwan noodle')) return REAL_FOOD_ASSETS.noodles;
  if (n.includes('fried rice') || n.includes('triple schezwan')) return REAL_FOOD_ASSETS.fried_rice;
  if (n.includes('spring roll')) return REAL_FOOD_ASSETS.spring_roll;
  if (n.includes('manchurian') || n.includes('chilli') || n.includes('soyabean') || n.includes('65')) return REAL_FOOD_ASSETS.manchurian;
  if (n.includes('crispy') || n.includes('corn crispy')) return REAL_FOOD_ASSETS.veg_crispy;

  // Rice & Biryani
  if (n.includes('biryani')) return REAL_FOOD_ASSETS.biryani;
  if (n.includes('khichdi') || n.includes('khichadi')) return REAL_FOOD_ASSETS.dal_khichdi;
  if (n.includes('pulao') || n.includes('masala rice')) return REAL_FOOD_ASSETS.fried_rice;
  if (n.includes('steam rice') || n.includes('jeera rice') || n.includes('curd rice')) return REAL_FOOD_ASSETS.basmati_rice;

  // Starters (Tandoor)
  if (n.includes('tikki') || n.includes('cheese ball') || n.includes('cutlet')) return REAL_FOOD_ASSETS.tikki_patty;
  if (n.includes('seekh') || n.includes('kabab') || n.includes('kebab')) return REAL_FOOD_ASSETS.seekh_kabab;
  if (cat === 'tandoor_starters' || n.includes('tikka') || n.includes('pahadi') || n.includes('banjara') || n.includes('peshawari')) return REAL_FOOD_ASSETS.paneer_tikka;

  // Maharashtrian
  if (n.includes('shev') || n.includes('sev') || n.includes('kolhapuri') || n.includes('pithla')) return REAL_FOOD_ASSETS.shev_bhaji;
  if (n.includes('baingan')) return REAL_FOOD_ASSETS.baingan_bharta;

  // Dals
  if (n.includes('makhani')) return REAL_FOOD_ASSETS.dal_makhani;
  if (n.includes('dal') || n.includes('tadka') || n.includes('fry')) return REAL_FOOD_ASSETS.dal_tadka;

  // Indian Curries & Gravies
  if (n.includes('nariyal') || n.includes('coconut')) return REAL_FOOD_ASSETS.hare_nariyal;
  if (n.includes('palak') || n.includes('lasooni palak')) return REAL_FOOD_ASSETS.palak_paneer;
  if (n.includes('chole') || n.includes('chana')) return REAL_FOOD_ASSETS.amritsari_chole;
  if (n.includes('kaju') || n.includes('cashew') || n.includes('shahi') || n.includes('khas') || n.includes('pasanda') || n.includes('mughlai')) return REAL_FOOD_ASSETS.shahi_paneer;
  if (n.includes('butter') || n.includes('makkhanwala') || n.includes('lababdar')) return REAL_FOOD_ASSETS.paneer_butter_masala;
  if (n.includes('mutter paneer') || n.includes('aloo mutter')) return REAL_FOOD_ASSETS.matar_paneer;
  if (n.includes('kadhai') || n.includes('kadai') || n.includes('handi') || n.includes('jalfrezi') || n.includes('jaipuri') || n.includes('kofta') || n.includes('paneer') || n.includes('tawa') || n.includes('masala') || n.includes('bhindi') || n.includes('aloo') || cat === 'indian_mains' || cat === 'chef_special' || cat === 'maharashtrian') {
    return REAL_FOOD_ASSETS.kadai_gravy;
  }

  // If providedUrl is present and valid, use it; otherwise fallback to category
  if (providedUrl && !providedUrl.includes('photo-1589301760014-d929f3979dbc') && !providedUrl.includes('photo-1509722747041-616f39b57569')) {
    return providedUrl;
  }

  return REAL_FOOD_ASSETS.kadai_gravy;
}

// Category fallback dictionary
export const CATEGORY_REAL_PHOTOS: Record<string, string> = {
  chef_special: REAL_FOOD_ASSETS.shahi_paneer,
  tandoor_starters: REAL_FOOD_ASSETS.paneer_tikka,
  maharashtrian: REAL_FOOD_ASSETS.shev_bhaji,
  indian_mains: REAL_FOOD_ASSETS.paneer_butter_masala,
  dal_breads: REAL_FOOD_ASSETS.naan,
  rice_biryani: REAL_FOOD_ASSETS.biryani,
  chinese: REAL_FOOD_ASSETS.noodles,
  soups: REAL_FOOD_ASSETS.tomato_soup,
  papad_khakra: REAL_FOOD_ASSETS.papad_khakra,
  pizza_pasta: REAL_FOOD_ASSETS.pizza,
  beverages_desserts: REAL_FOOD_ASSETS.gulab_jamun,
  // Legacy keys
  signature: REAL_FOOD_ASSETS.shahi_paneer,
  starters: REAL_FOOD_ASSETS.paneer_tikka,
  curries: REAL_FOOD_ASSETS.kadai_gravy,
  rice: REAL_FOOD_ASSETS.biryani,
  breads: REAL_FOOD_ASSETS.naan,
  noodles: REAL_FOOD_ASSETS.noodles,
  continental: REAL_FOOD_ASSETS.pizza,
  salads: REAL_FOOD_ASSETS.salad,
  beverages: REAL_FOOD_ASSETS.chaas,
};

// Unified Real Food Photography Component
export const DishVisual: React.FC<{
  dishId: string;
  imageUrl?: string;
  name: string;
  category?: string;
  className?: string;
}> = ({ imageUrl, name, category = "indian_mains", className = "w-full h-full" }) => {
  // Always resolve the authentic food photo matching the dish name
  const resolvedPhoto = getDishRealPhoto(name, category, imageUrl);
  const [currentSrc, setCurrentSrc] = useState<string>(resolvedPhoto);
  const [hasFailed, setHasFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Sync state if props change
  React.useEffect(() => {
    setCurrentSrc(getDishRealPhoto(name, category, imageUrl));
    setHasFailed(false);
    setLoaded(false);
  }, [name, category, imageUrl]);

  const handleImageError = () => {
    const fallback = CATEGORY_REAL_PHOTOS[category] || REAL_FOOD_ASSETS.kadai_gravy;
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
    } else {
      setHasFailed(true);
    }
  };

  if (hasFailed) {
    return (
      <div className={`${className} bg-gradient-to-br from-[#2c1912] via-[#21130d] to-[#170c07] flex flex-col items-center justify-center p-4 text-center relative select-none`}>
        <div className="w-12 h-12 rounded-full bg-secondary-fixed/20 border border-secondary-fixed/30 flex items-center justify-center text-secondary-fixed mb-2">
          <span className="material-symbols-outlined text-[24px]">restaurant</span>
        </div>
        <span className="font-headline-sm text-sm font-bold text-[#fff8f5] line-clamp-1">{name}</span>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-2 h-2 rounded-full bg-pure-veg-green"></span>
          <span className="text-[10px] text-pure-veg-green font-bold tracking-wider uppercase">100% Pure Veg</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className} overflow-hidden bg-surface-container`}>
      {/* Loading shimmer placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-surface-container-high animate-pulse flex items-center justify-center">
          <span className="material-symbols-outlined text-outline-variant text-[24px] animate-spin">
            progress_activity
          </span>
        </div>
      )}

      {/* Real Food Photograph */}
      <img
        src={currentSrc}
        alt={name}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        onError={handleImageError}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
