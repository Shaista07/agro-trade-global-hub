export interface ProduceItem {
  id: string
  name: string // English
  hinglish: string // Romanised Hindi
  hindi: string // Devanagari
  category: 'vegetable' | 'fruit'
  unit: string // e.g. 'kg', 'dozen', 'bunch'
  price: number // indicative ₹ per unit
  icon: string // lucide icon key mapped in the shop page
  seasonal?: boolean
}

/**
 * Indicative retail prices (₹) — final bill is always confirmed on WhatsApp
 * before dispatch, as mandi rates move daily.
 */
export const PRODUCE_ITEMS: ProduceItem[] = [
  // ── Vegetables (Sabziyan) ──────────────────────────────
  { id: 'potato', name: 'Potato', hinglish: 'Aloo', hindi: 'आलू', category: 'vegetable', unit: 'kg', price: 30, icon: 'carrot' },
  { id: 'onion', name: 'Onion', hinglish: 'Pyaaz', hindi: 'प्याज़', category: 'vegetable', unit: 'kg', price: 40, icon: 'salad' },
  { id: 'tomato', name: 'Tomato', hinglish: 'Tamatar', hindi: 'टमाटर', category: 'vegetable', unit: 'kg', price: 40, icon: 'citrus' },
  { id: 'garlic', name: 'Garlic', hinglish: 'Lehsun', hindi: 'लहसुन', category: 'vegetable', unit: 'kg', price: 160, icon: 'leaf' },
  { id: 'ginger', name: 'Ginger', hinglish: 'Adrak', hindi: 'अदरक', category: 'vegetable', unit: 'kg', price: 80, icon: 'leaf' },
  { id: 'green-chilli', name: 'Green Chilli', hinglish: 'Hari Mirch', hindi: 'हरी मिर्च', category: 'vegetable', unit: 'kg', price: 60, icon: 'leaf' },
  { id: 'okra', name: 'Okra', hinglish: 'Bhindi', hindi: 'भिंडी', category: 'vegetable', unit: 'kg', price: 50, icon: 'carrot' },
  { id: 'bottle-gourd', name: 'Bottle Gourd', hinglish: 'Lauki', hindi: 'लौकी', category: 'vegetable', unit: 'kg', price: 30, icon: 'salad' },
  { id: 'bitter-gourd', name: 'Bitter Gourd', hinglish: 'Karela', hindi: 'करेला', category: 'vegetable', unit: 'kg', price: 50, icon: 'salad' },
  { id: 'brinjal', name: 'Brinjal', hinglish: 'Baingan', hindi: 'बैंगन', category: 'vegetable', unit: 'kg', price: 40, icon: 'salad' },
  { id: 'cauliflower', name: 'Cauliflower', hinglish: 'Phool Gobhi', hindi: 'फूलगोभी', category: 'vegetable', unit: 'kg', price: 40, icon: 'sprout' },
  { id: 'cabbage', name: 'Cabbage', hinglish: 'Patta Gobhi', hindi: 'पत्ता गोभी', category: 'vegetable', unit: 'kg', price: 30, icon: 'sprout' },
  { id: 'carrot', name: 'Carrot', hinglish: 'Gajar', hindi: 'गाजर', category: 'vegetable', unit: 'kg', price: 50, icon: 'carrot' },
  { id: 'green-peas', name: 'Green Peas', hinglish: 'Matar', hindi: 'मटर', category: 'vegetable', unit: 'kg', price: 60, icon: 'sprout' },
  { id: 'spinach', name: 'Spinach', hinglish: 'Palak', hindi: 'पालक', category: 'vegetable', unit: 'bunch', price: 30, icon: 'leaf' },
  { id: 'coriander', name: 'Coriander Leaves', hinglish: 'Hara Dhaniya', hindi: 'हरा धनिया', category: 'vegetable', unit: 'bunch', price: 20, icon: 'leaf' },
  { id: 'lemon', name: 'Lemon', hinglish: 'Nimbu', hindi: 'नींबू', category: 'vegetable', unit: 'kg', price: 80, icon: 'citrus' },
  { id: 'cucumber', name: 'Cucumber', hinglish: 'Kheera', hindi: 'खीरा', category: 'vegetable', unit: 'kg', price: 40, icon: 'salad' },
  { id: 'capsicum', name: 'Capsicum', hinglish: 'Shimla Mirch', hindi: 'शिमला मिर्च', category: 'vegetable', unit: 'kg', price: 70, icon: 'salad' },
  { id: 'pumpkin', name: 'Pumpkin', hinglish: 'Kaddu', hindi: 'कद्दू', category: 'vegetable', unit: 'kg', price: 25, icon: 'salad' },

  // ── Fruits (Phal) ──────────────────────────────────────
  { id: 'banana', name: 'Banana', hinglish: 'Kela', hindi: 'केला', category: 'fruit', unit: 'dozen', price: 60, icon: 'banana' },
  { id: 'apple', name: 'Apple', hinglish: 'Seb', hindi: 'सेब', category: 'fruit', unit: 'kg', price: 120, icon: 'apple' },
  { id: 'mango', name: 'Mango', hinglish: 'Aam', hindi: 'आम', category: 'fruit', unit: 'kg', price: 100, icon: 'citrus', seasonal: true },
  { id: 'papaya', name: 'Papaya', hinglish: 'Papita', hindi: 'पपीता', category: 'fruit', unit: 'kg', price: 45, icon: 'citrus' },
  { id: 'pomegranate', name: 'Pomegranate', hinglish: 'Anaar', hindi: 'अनार', category: 'fruit', unit: 'kg', price: 130, icon: 'cherry' },
  { id: 'orange', name: 'Orange', hinglish: 'Santra', hindi: 'संतरा', category: 'fruit', unit: 'kg', price: 80, icon: 'citrus' },
  { id: 'guava', name: 'Guava', hinglish: 'Amrood', hindi: 'अमरूद', category: 'fruit', unit: 'kg', price: 55, icon: 'apple' },
  { id: 'grapes', name: 'Grapes', hinglish: 'Angoor', hindi: 'अंगूर', category: 'fruit', unit: 'kg', price: 85, icon: 'grape' },
  { id: 'watermelon', name: 'Watermelon', hinglish: 'Tarbooj', hindi: 'तरबूज़', category: 'fruit', unit: 'kg', price: 30, icon: 'citrus', seasonal: true },
  { id: 'muskmelon', name: 'Muskmelon', hinglish: 'Kharbuja', hindi: 'खरबूजा', category: 'fruit', unit: 'kg', price: 45, icon: 'citrus', seasonal: true },
]

export const DELIVERY_INFO = {
  areas: 'Ayodhya & nearby areas',
  b2b: 'Restaurants, hotels, caterers & kirana stores across Uttar Pradesh',
  payment: 'Cash on Delivery (COD)',
  note: 'Prices are indicative — final bill is confirmed on WhatsApp before dispatch, as mandi rates change daily.',
}
