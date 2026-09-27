import React, { useState, useMemo } from 'react';
import { MenuItem } from '../types';
import { DishModal } from './DishModal';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, jainPrep?: boolean) => void;
  onOpenOrderDrawer: () => void;
  onOrderNow?: (item: MenuItem, jainPrep?: boolean) => void;
}

export interface CuratedDish extends MenuItem {
  category: 'starters' | 'mains' | 'rice' | 'chinese' | 'continental' | 'soups';
  dietaryTags: ('chef' | 'must-try' | 'jain')[];
  badgeText: string;
  badgeColorClass: string;
  specs: string[];
}

export const CURATED_DISHES: CuratedDish[] = [
  {
    id: 'curated-01',
    name: 'Paneer Tikka Angara',
    marathiName: 'पनीर टिक्का अंगारा • Tandoori Starter',
    category: 'starters',
    price: 360,
    tag: "Chef's Special",
    tagline: 'Medium Spicy • Jain Preparation Available',
    description:
      'Smoked organic cottage cheese marinated in spiced hung yogurt, Kashmiri deghi mirch, and roasted over fragrant charcoal embers.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1XhqBit7H3pzkTrS1BNbyIv1PJrFqNcI2gorzs6yWzrIIAyMtzpLf_Kg-V-jwC1WxBHsCQft8J2UXMjzYwUrMz_xOyTGKMn-lfazkaYA4D8kqyUgjqdw9i0fq_59dr2cKPpAWmyjJXid4szC7zPydTAK65jiSsikWCuvTpJYUUdpPHA5orq1A3AQ6vv2AZ3O7Xa1qilTrIDJ13gmEZslKVe6dXHm9UGyVJYB8266zH1f8uSXHWQjt8qqw',
    isJainAvailable: true,
    spiceLevel: 'medium',
    isPopular: true,
    dietaryTags: ['chef', 'must-try', 'jain'],
    badgeText: "Chef's Special",
    badgeColorClass: 'bg-primary text-on-primary',
    specs: ['Medium Spicy', 'Jain Preparation Available'],
  },
  {
    id: 'curated-02',
    name: 'Dal Makhani Heritage',
    marathiName: 'दाल मखनी हेरिटेज • North Indian Main',
    category: 'mains',
    price: 310,
    tag: '12h Slow Cooked',
    tagline: 'Mild & Creamy • Prepared in Desi Ghee',
    description:
      'Slow-cooked black urad lentils simmered overnight over slow charcoal with churned white butter, rich tomato reduction, and fresh cream.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1X8FxonM0c1gA4RXmtuw3hYUVb8HAZG3y6hpBrCQZWMEty4J7FpJAqhn7SQiYMAr7UOY6gLK-sQcD37cM5C_dpTpoiv4EiMZHZ3zkc_B1HPyWMzc5qNG77gFCPd40w1V7ELlAlJlUEBwJ7B-FcWTiDdkos8hkCXeyH_X9QnFx2ldmmbWKrVuPuJq7-p7bUUoiNwYow7FUFFGsjax4Et2oRUGAeCWpGDlOb9bbiwwQ-cRAYK6uKymeU3fZg',
    isJainAvailable: false,
    spiceLevel: 'mild',
    isPopular: true,
    dietaryTags: ['chef', 'must-try'],
    badgeText: '12h Slow Cooked',
    badgeColorClass: 'bg-saffron-vibrant text-on-primary',
    specs: ['Mild & Creamy', 'Prepared in Desi Ghee'],
  },
  {
    id: 'curated-03',
    name: 'Subz Dum Handi Biryani',
    marathiName: 'सब्ज दम हांडी बिरयानी • Served with Raita',
    category: 'rice',
    price: 340,
    tag: 'Clay Pot Dum',
    tagline: 'Aromatic Spiced • Includes Boondi Raita',
    description:
      'Fragrant long-grain aged basmati rice layered with garden vegetables, saffron milk, caramelized shallots, sealed and steam-cooked in handi.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1WLTepefc_fir_jtIMt71xsrPE7eID2L4XQV5QRWEKD1uugx7e2DiEKxf0DytgvXDTpXNGPe3j2NhiLOmD-55JTzYNzBSDEOFdWWmZvdupYoW7JuPEmPTq9GU-iSu3_F3vRIlkvDHhQMjW5Z5U3_tD9NVQEC-IZ7CqneiLEveFzyAfm-KPLJNxYL7uUvnqOwkVe5StJPmwnbvxJnH-d0IXezaM_gzfcL7HL1TdUmjgJbsE9xQlM1NfPoHU',
    isJainAvailable: true,
    spiceLevel: 'medium',
    isPopular: true,
    dietaryTags: ['must-try', 'chef'],
    badgeText: 'Clay Pot Dum',
    badgeColorClass: 'bg-primary text-on-primary',
    specs: ['Aromatic Spiced', 'Includes Boondi Raita'],
  },
  {
    id: 'curated-04',
    name: 'Kaju Curry Shahi',
    marathiName: 'काजू करी शाही • Royal Nut Curry',
    category: 'mains',
    price: 385,
    tag: 'Royal Delicacy',
    tagline: 'Mild Royal Sweet-Savory • 100% Jain Option',
    description:
      'Golden roasted Goan cashew nuts bathed in a velvety tomato, cardamom, and melon seed mawa reduction topped with golden saffron threads.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1XEBHqENPkXdymBy3fNfMOwvsdwg9hIDvyI2nJL4-qMX5oMoOW4NyrNIk68z8cXhIVJwdAeUtYeMvwDZhPOeGRzXo0JlovlA5jcxwSzZBsfDiLzbt-Nku9_IeZB7__zqJ_DvhJvP0KnPrCktKsDPj3XZxWlC0xTvBLJogFhx9nM4Aci-s2gxqB-rwV5cWoPq8aGz824arYzVxMp3owpnGkojqhrDK-8ihs5B8ZCXlDgn_bZEGoaKmhleuM',
    isJainAvailable: true,
    spiceLevel: 'mild',
    isPopular: true,
    dietaryTags: ['chef', 'jain'],
    badgeText: 'Royal Delicacy',
    badgeColorClass: 'bg-secondary text-on-secondary',
    specs: ['Mild Royal Sweet-Savory', '100% Jain Option'],
  },
  {
    id: 'curated-05',
    name: 'Crispy Samosas & Pakoras',
    marathiName: 'समोसा पकोड़ा प्लेटर • Traditional Snack',
    category: 'starters',
    price: 180,
    tag: 'Evening Classic',
    tagline: 'Includes Saunth & Pudina Dip • Fresh Fried Daily',
    description:
      'Flaky artisanal pastry stuffed with cumin-tempered potatoes and green peas, served alongside crunchy seasonal vegetable pakoras and imli chutney.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2Rgcd3g96974XrIxB9gpKjJfzv1he6UQI1Te0YUgwhdilHEcBXzKdTXXpsvBIRARek_it7c5aoNCnxJ8pODYa_UDsz1VHyz5Cs-dac4ZlHtcqnLBvlm8iueOIa5zTRXJrMjj-xjLN9QFeEa1YjtA98nR1yPRWf6QXWHAOXMNIzJ9jube4qlKAXK7y4MuLTjc7-20konrdnviwsqKRNEuzlT6eBuPdSSxe3E0kvgCXvNQVrJyvUAAs',
    isJainAvailable: false,
    spiceLevel: 'medium',
    isPopular: true,
    dietaryTags: ['must-try'],
    badgeText: 'Evening Classic',
    badgeColorClass: 'bg-peach-tint text-primary',
    specs: ['Includes Saunth & Pudina Dip', 'Fresh Fried Daily'],
  },
  {
    id: 'curated-06',
    name: 'Garlic Cheese Burst Bread',
    marathiName: 'गार्लिक चीज़ ब्रेड • Artisanal Continental',
    category: 'continental',
    price: 240,
    tag: 'Wood-Fired',
    tagline: '100% Real Dairy Mozzarella • Oregano Marinara Dip',
    description:
      'Freshly kneaded artisanal loaf infused with roasted garlic butter, fresh rosemary, and loaded with molten whole milk mozzarella cheese.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRZd6BfUswryzAu_KcQi1BriUObtH8K-SILqiH9qt2RMMz0Sggiap_9WmeErDY9eOHwjLKP3KHHeGUPdwFzVGKjj2vZ9_QOcdEdwYGvg-6s_dpPAV5kItBkKCZgx6bsyxjs2_rvu4jMlM1O4ECkMB1ytigxvyjDzSfECTWeCgVV3Qz8jdnb-4q4lr4BLSJBbO_D-ZT_sA4y639naraHTmuUIX5V_I9PAOlSkOY8f-92Ad3FB4LsKRw',
    isJainAvailable: false,
    spiceLevel: 'mild',
    isPopular: true,
    dietaryTags: ['must-try'],
    badgeText: 'Wood-Fired',
    badgeColorClass: 'bg-secondary-container text-on-secondary-container',
    specs: ['100% Real Dairy Mozzarella', 'Oregano Marinara Dip'],
  },
  {
    id: 'curated-07',
    name: 'Neapolitan Margherita',
    marathiName: 'मार्गरेट पिज़्ज़ा • 11 Inch Thin Crust',
    category: 'continental',
    price: 390,
    tag: 'Stone Baked',
    tagline: 'Jain Pizza Crust Available • Zero Palm Oil',
    description:
      'Hand-stretched fermented sourdough, San Marzano tomato reduction, soft fresh bocconcini medallions, sweet genovese basil, and extra virgin olive oil.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCgpBN8sfA8l-WAmM4eNCsnWCYwpEXAazChF8890-vUVfkr6gp2ReC9mm7oSGofjFJm5DxTArjfZ9MqMYMvRXgG0Tgt3HRjD8s6tEhEdO8b2LTeEVuSMpw2-VfTsT80fI2RWJxrLmUkagOcAehxvpluYW4y3fTRDgahpqGNSqUhkovBj0WBzrvwgjlEjrl0GgPJSYFQotlGaljsF9VgLpTaRFMF6GRsmIVGJ1YpKL7IN7y_LNdyXw8g',
    isJainAvailable: true,
    spiceLevel: 'mild',
    isPopular: true,
    dietaryTags: ['chef', 'jain'],
    badgeText: 'Stone Baked',
    badgeColorClass: 'bg-primary text-on-primary',
    specs: ['Jain Pizza Crust Available', 'Zero Palm Oil'],
  },
  {
    id: 'curated-08',
    name: 'Hakka Noodles & Manchurian',
    marathiName: 'हक्का नूडल्स मंचूरियन • Indo-Chinese Combo',
    category: 'chinese',
    price: 320,
    tag: 'Wok Master Special',
    tagline: 'Mild Spice Kick • No Added MSG',
    description:
      'Steaming wok-tossed street noodles tossed with julienned veggies and spring onion, served with crispy vegetable Manchurian dumplings in ginger glaze.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAvKnlPC3aPuDQCQo1W7D-qPrTUjh_Bdi9FHqxRi-NH1C0q1VSxOWojEmp-y_pbnWL6aEdCdApbD6tjtYswlVKEYo7dkMzhviHokb0-c5kktupiNnKesaLGwDDTuINKKEpIU1CMWt7H8HGRgyGrZHHdCZ_Rm8X79P-MFWL2eHWQhmttRWBXoC_9KBuL3JSbqgGQrO8oy6ECfP3eRP2YmW5bPnfK5ZidmWQ7IeqQfwMPcMN0C2wNjISB',
    isJainAvailable: false,
    spiceLevel: 'medium',
    isPopular: true,
    dietaryTags: ['must-try'],
    badgeText: 'Wok Master Special',
    badgeColorClass: 'bg-peach-tint text-primary',
    specs: ['Mild Spice Kick', 'No Added MSG'],
  },
  {
    id: 'curated-09',
    name: 'Royal Nashik Mahathali',
    marathiName: 'रॉयल नाशिक महाथाली • Unlimited Dine-in',
    category: 'mains',
    price: 450,
    tag: 'Signature Grand Feast',
    tagline: '14 Authentic Delicacies • Available Lunch & Dinner',
    description:
      'A grand 14-item culinary banquet: Paneer Lababdar, Shev Bhaji, Dal Tadka, Ghee Phulkas, Basmati Pulao, Nashik Thecha, and Gulab Jamun.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1WNsCw0ITtcsj5HRqIzJoaQUHv6bFm_HSZy5Udh2kWc1D-KDGl5yI0OfKGdiP2LU-VswNSIh0H-sjSepT3kF9iDQmeUcKTPvmuiTS_JofjgKiTJ-B_gbwz9AmP1yoGc9lMH9PBq4tbD6crMRDI4IRFEpE-xI-2lrLNUwcTYCn1SmWkSmDUdRw5uk5fGfNcFEDhjOJxgHkMZw5VYMEwMRuyBjttyBUooXIFfDnuuHEbAP3gCnuMfGLJcRgk',
    isJainAvailable: true,
    spiceLevel: 'medium',
    isPopular: true,
    dietaryTags: ['chef', 'must-try'],
    badgeText: 'Signature Grand Feast',
    badgeColorClass: 'bg-saffron-deep text-on-primary',
    specs: ['14 Authentic Delicacies', 'Available Lunch & Dinner'],
  },
  {
    id: 'curated-10',
    name: 'Roasted Tomato & Basil Soup',
    marathiName: 'टोमैटो बेसिल सूप • Slow Simmered',
    category: 'soups',
    price: 160,
    tag: 'Starter Soup',
    tagline: '100% Jain Compatible • Lactose-free on request',
    description:
      'Slow fire-roasted Nashik plum tomatoes pureed with fresh Italian sweet basil, cracked black pepper, and buttered herbed croutons.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIJvsq38Q9Y1NvqB9T18qrFqEF2C0pbVZwTOAhRTdXV0A-jz0iJ9t5GdraoK3GFWAR32k8Sb30M7q5K97S50wX9qRP2Zy03t7Yx-zkAh6RSrkonCyj9wYeCL-8excMsiokuyQ73C_R2gyd-oCkMa4i_H2TU24bgglZMdgevta5olxIwtto7lbepe-o0knO0Qgz5oIdLVKLlVa1PIu2GEIPZiuPN_VLOjnLGhpHRyCC4LU3UUCBvP-l',
    isJainAvailable: true,
    spiceLevel: 'mild',
    isPopular: false,
    dietaryTags: ['jain'],
    badgeText: 'Starter Soup',
    badgeColorClass: 'bg-surface-container-high text-on-surface',
    specs: ['100% Jain Compatible', 'Lactose-free on request'],
  },
  {
    id: 'curated-11',
    name: 'Idli Sambar Platter',
    marathiName: 'इडली सांबर • Authentic South Indian',
    category: 'soups',
    price: 150,
    tag: 'Healthy Steamed',
    tagline: 'Zero Oil Preparation • High Protein & Light',
    description:
      'Triple-fermented, cloud-soft steamed rice cakes paired with slow-brewed drumstick lentil sambar and freshly grated coconut-chili chutney.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1Wb8GpJLWaZ6NuzHtPfKzap3cuj_Fc4PPiFZboHu9EsbBcffOFaHFeDXdjpgHafSf1_3_kNBD37bXtmMzC5QwQEUTUruQK0OiJPSo18JQG2qdDKjz8p4hvDlEzvul_iPyZWxyL11B9J5-x_9Q88hVL39nt4fs-tKvaTzUaqPh1whzzyp8zB1G0dQACG99FHG_y1h2S6skuoxbycMa3lrFMJ5P0A_jehLw_WGVTxC6iSN5lszhnCvKavyd4',
    isJainAvailable: true,
    spiceLevel: 'mild',
    isPopular: false,
    dietaryTags: ['jain'],
    badgeText: 'Healthy Steamed',
    badgeColorClass: 'bg-pure-veg-green text-on-tertiary',
    specs: ['Zero Oil Preparation', 'High Protein & Light'],
  },
  {
    id: 'curated-12',
    name: 'Royal Shahi Kebab Platter',
    marathiName: 'शाही कबाब प्लैटर • Charcoal Tandoor',
    category: 'starters',
    price: 495,
    tag: 'Party Platter (12 Pcs)',
    tagline: 'Perfect for 3-4 Guests • Garnish with Pomegranate',
    description:
      'Curated tasting platter: 4x Paneer Malai Tikka, 4x Spinach Hara Bhara Kebab, and 4x Melt-in-mouth Dahi Ke Kebab with walnut and mint chutneys.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUUSJ1nEx1fUAD04nCea-RwxUKP75Emc3tHPwjyeCpn1auV3aWgqgs4IAH7oUBPq8pOYSVRYBDtrFKwIqyanq1XtFi6msOgf7A4qNf19n5JopioSELBfCT_2E9C_jAsS_5MM9sDLqwdSVcYnulzvh0mWAfdxUIep1Fbf6Qu5x_W6zOKVhKDY6A_7YFUfUxdNSKI1dbaHs96UDG3M1yQCM-nMPoGSP8ts5AxMnQEJQLE5GBtzAMStBf',
    isJainAvailable: false,
    spiceLevel: 'medium',
    isPopular: true,
    dietaryTags: ['chef', 'must-try'],
    badgeText: 'Party Platter (12 Pcs)',
    badgeColorClass: 'bg-saffron-deep text-on-primary',
    specs: ['Perfect for 3-4 Guests', 'Garnish with Pomegranate'],
  },
  {
    id: 'curated-13',
    name: 'Butter Naan & Roti Basket',
    marathiName: 'बटर नान बास्केट • Clay Oven Bread Basket',
    category: 'mains',
    price: 190,
    tag: 'Tandoor Fresh',
    tagline: '100% Desi Ghee Glaze • Served Steaming Hot',
    description:
      'Freshly baked assortment from our traditional clay tandoor: 2x Garlic Butter Naan, 2x Laccha Paratha, and 2x Missi Roti brushed with pure ghee.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1WX9lZtGec95jiZMkzPs-b086ByOc91g_-4mxDL_IcK02vbOJxJPhMdgednOHlsOguG46CvM95RuUrXXoVCkl8GMX6YKDuQKlTJAtSevQHoFde2KjK4ACqulEoPpXt4BufxD8AzvLF5qB6iujhmjKVMs4Z00WHzDwLgp3Y6MaIyjV9rAhCKi3_mxVGqE7FZIGSOE2wthf2iHQcTCNynegU7qdrZ5PsYj0miARmfeqoCYCq-QLSoJCjodng',
    isJainAvailable: true,
    spiceLevel: 'mild',
    isPopular: true,
    dietaryTags: ['chef'],
    badgeText: 'Tandoor Fresh',
    badgeColorClass: 'bg-surface-container-high text-on-surface',
    specs: ['100% Desi Ghee Glaze', 'Served Steaming Hot'],
  },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  onOpenOrderDrawer,
  onOrderNow,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeDietary, setActiveDietary] = useState<'chef' | 'must-try' | 'jain' | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quantities, setQuantities] = useState<{ [dishId: string]: number }>({});
  const [addedIds, setAddedIds] = useState<{ [dishId: string]: boolean }>({});
  const [modalDish, setModalDish] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'all', label: `All Offerings (${CURATED_DISHES.length})` },
    { id: 'starters', label: 'Starters & Tandoor' },
    { id: 'mains', label: 'Main Course & Thali' },
    { id: 'rice', label: 'Rice & Dum Biryani' },
    { id: 'chinese', label: 'Indo-Chinese Delights' },
    { id: 'continental', label: 'Continental & Pizzas' },
    { id: 'soups', label: 'Soups & Traditional' },
  ];

  const filteredDishes = useMemo(() => {
    return CURATED_DISHES.filter((dish) => {
      const matchesCat = selectedCategory === 'all' || dish.category === selectedCategory;
      const matchesDiet = !activeDietary || dish.dietaryTags.includes(activeDietary);
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        dish.name.toLowerCase().includes(query) ||
        dish.marathiName.toLowerCase().includes(query) ||
        dish.description.toLowerCase().includes(query);

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

  const handleAdd = (dish: CuratedDish, e?: React.MouseEvent) => {
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

  const handleDirectOrder = (dish: CuratedDish, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onOrderNow) {
      onOrderNow(dish, activeDietary === 'jain' && dish.isJainAvailable);
    } else {
      handleAdd(dish);
      onOpenOrderDrawer();
    }
  };

  return (
    <section className="w-full bg-cream-surface py-16 px-4 md:px-8 border-t border-outline-variant/30" id="menu-explorer">
      {/* Invisible anchor for signature-menu compatibility */}
      <div id="signature-menu" className="-mt-20 pt-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-peach-tint text-primary font-label-sm text-xs font-bold tracking-wider uppercase">
                Culinary Masterpieces
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-pure-veg-green text-on-tertiary font-label-sm text-xs font-bold">
                100% Pure Veg
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-headline-lg text-primary font-bold">
              Complete Pure Veg Dining Menu
            </h2>
            <p className="font-body-md text-sm sm:text-base text-charcoal-muted">
              Crafted fresh to order in pure clarified desi ghee, aromatic cold-pressed oils, and farm-fresh ingredients.
            </p>
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-80">
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g. Paneer, Biryani, Soup)..."
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
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" id="category-pills">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`cat-pill px-5 py-2 rounded-full font-label-md text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'active-cat bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-lowest text-charcoal-muted hover:bg-peach-tint hover:text-primary border border-outline-variant/30'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Quick Dietary Preference Badges */}
        <div className="flex flex-wrap items-center gap-3 text-label-sm font-label-sm text-xs text-charcoal-muted">
          <span className="font-bold text-on-surface">Filter by:</span>

          <button
            onClick={() => setActiveDietary(activeDietary === 'chef' ? null : 'chef')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer font-semibold ${
              activeDietary === 'chef'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-high text-charcoal-muted hover:bg-peach-tint hover:text-primary'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[15px] ${
                activeDietary === 'chef' ? 'text-on-primary' : 'text-primary'
              }`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span>Chef Special</span>
          </button>

          <button
            onClick={() => setActiveDietary(activeDietary === 'must-try' ? null : 'must-try')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer font-semibold ${
              activeDietary === 'must-try'
                ? 'bg-primary text-on-primary shadow-xs'
                : 'bg-surface-container-high text-charcoal-muted hover:bg-peach-tint hover:text-primary'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[15px] ${
                activeDietary === 'must-try' ? 'text-on-primary' : 'text-saffron-vibrant'
              }`}
            >
              local_fire_department
            </span>
            <span>Must Try</span>
          </button>

          <button
            onClick={() => setActiveDietary(activeDietary === 'jain' ? null : 'jain')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer font-semibold ${
              activeDietary === 'jain'
                ? 'bg-pure-veg-green text-on-tertiary shadow-xs'
                : 'bg-surface-container-high text-charcoal-muted hover:bg-peach-tint hover:text-primary'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-pure-veg-green shrink-0"></span>
            <span>Jain Option Available</span>
          </button>

          {activeDietary && (
            <button
              onClick={() => setActiveDietary(null)}
              className="text-primary hover:underline text-xs ml-1 cursor-pointer"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Menu Grid */}
        {filteredDishes.length === 0 ? (
          <div className="py-16 text-center bg-cream-card rounded-2xl border border-dashed border-outline-variant p-8 flex flex-col items-center gap-3">
            <span className="material-symbols-outlined text-4xl text-charcoal-muted">dinner_dining</span>
            <p className="text-on-surface font-semibold">No dishes match your active filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveDietary(null);
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold"
            >
              Show All Dishes
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
                    {/* Dish Image */}
                    <div className="relative h-56 overflow-hidden bg-surface-container-high">
                      <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Pure Veg Badge */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-surface-container-lowest/90 backdrop-blur-sm flex items-center gap-1.5 shadow-xs">
                        <div className="w-3.5 h-3.5 border-2 border-pure-veg-green flex items-center justify-center p-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-pure-veg-green"></div>
                        </div>
                        <span className="font-label-sm text-[11px] text-pure-veg-green font-bold">Pure Veg</span>
                      </div>

                      {/* Pill Badge */}
                      <span
                        className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full font-label-sm text-xs font-semibold shadow-xs ${dish.badgeColorClass}`}
                      >
                        {dish.badgeText}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col gap-2.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-title-lg text-lg text-primary font-bold truncate group-hover:text-saffron-deep transition-colors">
                            {dish.name}
                          </h3>
                          <span className="font-label-sm text-xs text-charcoal-muted block truncate mt-0.5">
                            {dish.marathiName}
                          </span>
                        </div>
                        <span className="font-headline-sm text-xl text-saffron-deep font-bold shrink-0">
                          ₹{dish.price}
                        </span>
                      </div>

                      <p className="font-body-sm text-xs sm:text-sm text-charcoal-muted line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1 text-on-surface-variant font-label-sm text-xs">
                        {dish.specs.map((spec, sIdx) => (
                          <React.Fragment key={sIdx}>
                            {sIdx > 0 && <span>•</span>}
                            <span
                              className={
                                spec.includes('Jain')
                                  ? 'text-pure-veg-green font-semibold'
                                  : spec.includes('Spicy')
                                  ? 'text-saffron-deep font-semibold'
                                  : 'text-charcoal-muted'
                              }
                            >
                              {spec}
                            </span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div
                    className="p-5 pt-0 flex flex-col sm:flex-row items-center justify-between gap-2.5"
                    onClick={(e) => e.stopPropagation()}
                  >
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
                        title="Order Now (Direct Message to 0253 299 5031)"
                      >
                        <span className="material-symbols-outlined text-[17px]">send_to_mobile</span>
                        <span className="hidden xs:inline">Order Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Catering & Large Family Feasts Strip */}
        <div className="mt-4 p-6 rounded-2xl bg-peach-tint/60 border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">room_service</span>
            </div>
            <div className="flex flex-col">
              <span className="font-title-lg text-base sm:text-title-lg text-primary font-bold">
                Catering & Large Family Feasts?
              </span>
              <span className="font-body-sm text-xs sm:text-sm text-charcoal-muted">
                Customized Jain and Sattvic party platters available for gatherings of 15 to 300+ guests.
              </span>
            </div>
          </div>
          <a
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-saffron-vibrant text-on-primary font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shadow-xs"
            href="tel:+919823045678"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Contact Banquet Desk</span>
          </a>
        </div>

      </div>

      {/* Dish Detailed Preview Modal */}
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
