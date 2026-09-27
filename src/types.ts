export type MenuCategory =
  | 'all'
  | 'signature'
  | 'khakra'
  | 'starters'
  | 'chinese_starters'
  | 'soups'
  | 'curries'
  | 'rice'
  | 'breads'
  | 'noodles'
  | 'continental'
  | 'salads'
  | 'beverages';

export interface MenuItem {
  id: string;
  name: string;
  marathiName?: string;
  tag: string;
  category: MenuCategory | string;
  price: number;
  description: string;
  tagline: string;
  isJainAvailable: boolean;
  spiceLevel: 'mild' | 'medium' | 'spicy';
  isPopular?: boolean;
  imageUrl: string;
}


export interface CartItem {
  item: MenuItem;
  quantity: number;
  jainPrep: boolean;
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  content: string;
  date: string;
}

export interface ReservationData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seating: 'ac_family' | 'main_hall' | 'outdoor_patio';
  specialRequests?: string;
  isJainPreference?: boolean;
}
