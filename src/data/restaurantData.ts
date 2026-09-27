import { MenuItem, Review } from '../types';
import { OFFICIAL_MENU_ITEMS } from './officialMenuData';

export const RESTAURANT_INFO = {
  name: "The Namastey Nashik",
  marathiName: "थे नमस्ते नाशिक",
  tagline: "100% Pure Vegetarian Fine Dine & Family Restaurant",
  subTagline: "Proudly Women-Owned & LGBTQ+ Welcoming",
  phone: "0253 299 5031",
  phoneRaw: "+912532995031",
  mobilePhone: "+91 98230 45678",
  mobilePhoneRaw: "+919823045678",
  address: "Shop No. 7, Samarth Krupa Apartment, Thatte Nagar / Lawate Nagar, Nashik, Maharashtra 422005",
  landmark: "Opposite Old Gangapur Road Junction",
  plusCode: "XQR5+9J Nashik, Maharashtra",
  pincode: "422005",
  rating: 4.8,
  totalReviews: "2,400+",
  hours: "11:30 AM – 11:00 PM Daily",
  thaliHours: "Lunch: 12:00 PM - 3:30 PM • Dinner: 7:00 PM - 10:30 PM",
  services: ["Dine-in", "Drive-Through Takeaway", "No-Contact Delivery"],
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Namastey+Nashik+Thatte+Nagar+Nashik+Maharashtra+422005",
  logoUrl: "https://lh3.googleusercontent.com/aida/AEtjO1WTXjBokMSgPKijLTTlczSfCiEZdYT07KAb5b8LwGzNsCDfy9S5x0XBvfNlhWpvZYVov3YK13MKRITN3AXtIErqD0ruJJrf1lvQ-8AQBDtrl_NA7oRWfHr3nPVXqqd732PGd5ql7ZE8-I8QG23rw1dJ-b1GRMunjuLJyBnzib4jkU61-L1unQ2i8TsYXu2aCMy30lHy90-71_yvJn1uRhPFHgmF9PfB_hDm5boh2_dNqG-Gdi7hlhiwQH0",
  heroImageUrl: "https://lh3.googleusercontent.com/aida/AEtjO1VobwBkIJ7KA_m4bGdqrJDIYHLSH6jKvi3kjgnNBr5uFjHC_JgbI-zuloLv7717cWt2f3PE1OfysvBA1y8bj_udUdZQaZuGZ7YzQmCaRAxbExXqVYTi2r7xNbum6xiaMQrRMzQIeLSRf9JmoAIt9crgeAb7yila8Q1_-eISacFCsueHJ8x69onWbb6FlUkQ06OQpU_vuQqne2uELmJTFYb5OM60PIKh8ZPdF3JnpvuJZMU4DGq4Uev4Es",
  dineInImageUrl: "https://lh3.googleusercontent.com/aida/AEtjO1WT_zq6KbwPS30WahjLXBt-G5bMKuF1bUUT55UwF5QXBaAS_s86jaleJRJUtUUgIfZDCssVfkasGEX7ZSjeicGhzSf6wcuWmO5s4JxyN25T13nhkwWp6jlg0p3wwW8ZB71jmTuFVRpQKM3Xn_8SRULmf-Z9dlg3XT4ccEW8ZDAgdor4KWZkllFIAKwo3CsfaPDOmxpE5yZZXJthcoJodzBxhmuZXKiYlwygmhTGMVkLY6PsYlGPVRcMQEQ",
  driveThruImageUrl: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&auto=format&fit=crop&q=80",
  deliveryImageUrl: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=800&auto=format&fit=crop&q=80",
  mapImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCduzUvHSQrC3Frmr8pj3U1nPyvtyrEJM8kbdY2d6HRjDO5YHAAmbgVXX1bl9Fbn6wFbhxqf6wzP-ovQvh0XtIf2GSaF_mRpZLllZY9FIJUlXaaC_knu9Kaq-s-oSlR0detgXI3lXRU3gmWxYXywOgfEmhO3jVkhGPm0gjwlymllFMAdsXXPctwWQbPZvlv26yiww8oMAMiwmGUBTOAGLsp2AYr85WYya5S_zT55PjCQ-UiQLl1VTmE",
};

export const MENU_ITEMS: MenuItem[] = OFFICIAL_MENU_ITEMS;

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Pooja Deshmukh",
    role: "Google Verified Diner",
    rating: 5,
    content: "Hands down one of the finest pure veg fine dine places in Nashik! Paneer Khas and the Shev Bhaji taste unbelievable. Super clean ambiance and respectful staff.",
    date: "2 weeks ago",
  },
  {
    id: "rev-2",
    author: "Amit Joshi",
    role: "Local Guide (Nashik)",
    rating: 5,
    content: "Loved the inclusive and warm atmosphere. Being a women-owned establishment, the attention to cleanliness and hygiene really stands out. Their drive-through takeaway was super fast!",
    date: "1 month ago",
  },
  {
    id: "rev-3",
    author: "Sneha Patil",
    role: "Google Verified Diner",
    rating: 5,
    content: "We ordered no-contact delivery for our family dinner. The food arrived steaming hot in sturdy spill-proof boxes. Paneer Tikka Masala, Cheese Rumali Khakra, and Dal Makhani were top tier.",
    date: "3 weeks ago",
  }
];

export const RATING_STATS = {
  overall: 4.8,
  totalReviews: "2,400+",
  breakdown: [
    { label: "5 Stars", percentage: 88 },
    { label: "4 Stars", percentage: 10 },
    { label: "3 Stars", percentage: 1.5 },
    { label: "2 Stars", percentage: 0.3 },
    { label: "1 Star", percentage: 0.2 },
  ],
  aspects: [
    { name: "Pure Veg Taste & Authenticity", score: "4.9" },
    { name: "Cleanliness & Sanitation", score: "5.0" },
    { name: "Welcoming & Inclusive Service", score: "4.8" },
    { name: "Takeaway & Delivery Speed", score: "4.8" },
  ]
};
