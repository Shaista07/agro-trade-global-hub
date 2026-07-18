export interface ProduceItem {
  id: string
  name: string // English
  hinglish: string // Romanised Hindi
  hindi: string // Devanagari
  category: 'vegetable' | 'fruit'
  unit: string // e.g. 'kg', 'dozen', 'bunch'
  /**
   * BASE rate per unit — the wholesale reference rate (APMC maximum when live
   * data is available; the values below are offline fallbacks). Displayed
   * prices are computed from this base via the quantity tiers in
   * data/pricing.ts (0–10 kg: +30%, 10–20: +20%, 20–50: +15%, 50+: +10%).
   */
  price: number
  icon: string // lucide icon key mapped in the shop page (fallback if no photo)
  seasonal?: boolean
}

export const PRODUCE_ITEMS: ProduceItem[] = [
  // ── Vegetables (Sabziyan) ──────────────────────────────
  { id: 'potato', name: 'Potato', hinglish: 'Aloo', hindi: 'आलू', category: 'vegetable', unit: 'kg', price: 14, icon: 'carrot' },
  { id: 'onion', name: 'Onion', hinglish: 'Pyaaz', hindi: 'प्याज़', category: 'vegetable', unit: 'kg', price: 30, icon: 'salad' },
  { id: 'tomato', name: 'Tomato', hinglish: 'Tamatar', hindi: 'टमाटर', category: 'vegetable', unit: 'kg', price: 40, icon: 'citrus' },
  { id: 'garlic', name: 'Garlic', hinglish: 'Lehsun', hindi: 'लहसुन', category: 'vegetable', unit: 'kg', price: 200, icon: 'leaf' },
  { id: 'ginger', name: 'Ginger', hinglish: 'Adrak', hindi: 'अदरक', category: 'vegetable', unit: 'kg', price: 140, icon: 'leaf' },
  { id: 'green-chilli', name: 'Green Chilli', hinglish: 'Hari Mirch', hindi: 'हरी मिर्च', category: 'vegetable', unit: 'kg', price: 60, icon: 'leaf' },
  { id: 'okra', name: 'Okra', hinglish: 'Bhindi', hindi: 'भिंडी', category: 'vegetable', unit: 'kg', price: 30, icon: 'carrot' },
  { id: 'bottle-gourd', name: 'Bottle Gourd', hinglish: 'Lauki', hindi: 'लौकी', category: 'vegetable', unit: 'kg', price: 25, icon: 'salad' },
  { id: 'bitter-gourd', name: 'Bitter Gourd', hinglish: 'Karela', hindi: 'करेला', category: 'vegetable', unit: 'kg', price: 40, icon: 'salad' },
  { id: 'brinjal', name: 'Brinjal', hinglish: 'Baingan', hindi: 'बैंगन', category: 'vegetable', unit: 'kg', price: 25, icon: 'salad' },
  { id: 'cauliflower', name: 'Cauliflower', hinglish: 'Phool Gobhi', hindi: 'फूलगोभी', category: 'vegetable', unit: 'kg', price: 30, icon: 'sprout' },
  { id: 'cabbage', name: 'Cabbage', hinglish: 'Patta Gobhi', hindi: 'पत्ता गोभी', category: 'vegetable', unit: 'kg', price: 8, icon: 'sprout' },
  { id: 'carrot', name: 'Carrot', hinglish: 'Gajar', hindi: 'गाजर', category: 'vegetable', unit: 'kg', price: 40, icon: 'carrot' },
  { id: 'green-peas', name: 'Green Peas', hinglish: 'Matar', hindi: 'मटर', category: 'vegetable', unit: 'kg', price: 90, icon: 'sprout' },
  { id: 'spinach', name: 'Spinach', hinglish: 'Palak', hindi: 'पालक', category: 'vegetable', unit: 'bunch', price: 16, icon: 'leaf' },
  { id: 'coriander', name: 'Coriander Leaves', hinglish: 'Hara Dhaniya', hindi: 'हरा धनिया', category: 'vegetable', unit: 'bunch', price: 15, icon: 'leaf' },
  { id: 'lemon', name: 'Lemon', hinglish: 'Nimbu', hindi: 'नींबू', category: 'vegetable', unit: 'kg', price: 30, icon: 'citrus' },
  { id: 'cucumber', name: 'Cucumber', hinglish: 'Kheera', hindi: 'खीरा', category: 'vegetable', unit: 'kg', price: 20, icon: 'salad' },
  { id: 'capsicum', name: 'Capsicum', hinglish: 'Shimla Mirch', hindi: 'शिमला मिर्च', category: 'vegetable', unit: 'kg', price: 55, icon: 'salad' },
  { id: 'pumpkin', name: 'Pumpkin', hinglish: 'Kaddu', hindi: 'कद्दू', category: 'vegetable', unit: 'kg', price: 14, icon: 'salad' },
  { id: 'french-beans', name: 'French Beans', hinglish: 'Beans', hindi: 'फ्रेंच बीन्स', category: 'vegetable', unit: 'kg', price: 60, icon: 'sprout' },
  { id: 'radish', name: 'Radish', hinglish: 'Mooli', hindi: 'मूली', category: 'vegetable', unit: 'kg', price: 10, icon: 'carrot' },
  { id: 'ridge-gourd', name: 'Ridge Gourd', hinglish: 'Torai', hindi: 'तोरई', category: 'vegetable', unit: 'kg', price: 35, icon: 'salad' },
  { id: 'beetroot', name: 'Beetroot', hinglish: 'Chukandar', hindi: 'चुकंदर', category: 'vegetable', unit: 'kg', price: 40, icon: 'salad' },
  { id: 'turnip', name: 'Turnip', hinglish: 'Shalgam', hindi: 'शलगम', category: 'vegetable', unit: 'kg', price: 25, icon: 'salad' },
  { id: 'sweet-potato', name: 'Sweet Potato', hinglish: 'Shakarkandi', hindi: 'शकरकंदी', category: 'vegetable', unit: 'kg', price: 35, icon: 'carrot' },
  { id: 'arbi', name: 'Taro Root', hinglish: 'Arbi', hindi: 'अरबी', category: 'vegetable', unit: 'kg', price: 50, icon: 'salad' },
  { id: 'pointed-gourd', name: 'Pointed Gourd', hinglish: 'Parwal', hindi: 'परवल', category: 'vegetable', unit: 'kg', price: 45, icon: 'salad' },
  { id: 'ivy-gourd', name: 'Ivy Gourd', hinglish: 'Tindora', hindi: 'टिंडोरा', category: 'vegetable', unit: 'kg', price: 50, icon: 'salad' },
  { id: 'drumstick', name: 'Drumstick', hinglish: 'Sahjan', hindi: 'सहजन', category: 'vegetable', unit: 'kg', price: 80, icon: 'sprout' },
  { id: 'methi', name: 'Fenugreek Leaves', hinglish: 'Methi', hindi: 'मेथी', category: 'vegetable', unit: 'bunch', price: 20, icon: 'leaf' },

  // ── Fruits (Phal) ──────────────────────────────────────
  { id: 'banana', name: 'Banana', hinglish: 'Kela', hindi: 'केला', category: 'fruit', unit: 'dozen', price: 26, icon: 'banana' },
  { id: 'apple', name: 'Apple', hinglish: 'Seb', hindi: 'सेब', category: 'fruit', unit: 'kg', price: 100, icon: 'apple' },
  { id: 'mango', name: 'Mango', hinglish: 'Aam', hindi: 'आम', category: 'fruit', unit: 'kg', price: 130, icon: 'citrus', seasonal: true },
  { id: 'papaya', name: 'Papaya', hinglish: 'Papita', hindi: 'पपीता', category: 'fruit', unit: 'kg', price: 30, icon: 'citrus' },
  { id: 'pomegranate', name: 'Pomegranate', hinglish: 'Anaar', hindi: 'अनार', category: 'fruit', unit: 'kg', price: 160, icon: 'cherry' },
  { id: 'orange', name: 'Orange', hinglish: 'Santra', hindi: 'संतरा', category: 'fruit', unit: 'kg', price: 40, icon: 'citrus' },
  { id: 'guava', name: 'Guava', hinglish: 'Amrood', hindi: 'अमरूद', category: 'fruit', unit: 'kg', price: 60, icon: 'apple' },
  { id: 'grapes', name: 'Grapes', hinglish: 'Angoor', hindi: 'अंगूर', category: 'fruit', unit: 'kg', price: 90, icon: 'grape' },
  { id: 'watermelon', name: 'Watermelon', hinglish: 'Tarbooj', hindi: 'तरबूज़', category: 'fruit', unit: 'kg', price: 22, icon: 'citrus', seasonal: true },
  { id: 'muskmelon', name: 'Muskmelon', hinglish: 'Kharbuja', hindi: 'खरबूजा', category: 'fruit', unit: 'kg', price: 45, icon: 'citrus', seasonal: true },
  { id: 'pineapple', name: 'Pineapple', hinglish: 'Ananas', hindi: 'अनानास', category: 'fruit', unit: 'kg', price: 50, icon: 'citrus' },
  { id: 'chikoo', name: 'Chikoo (Sapota)', hinglish: 'Chikoo', hindi: 'चीकू', category: 'fruit', unit: 'kg', price: 80, icon: 'cherry' },
  { id: 'pear', name: 'Pear', hinglish: 'Nashpati', hindi: 'नाशपाती', category: 'fruit', unit: 'kg', price: 100, icon: 'apple' },
  { id: 'plum', name: 'Plum', hinglish: 'Aloo Bukhara', hindi: 'आलू बुखारा', category: 'fruit', unit: 'kg', price: 90, icon: 'cherry' },
  { id: 'peach', name: 'Peach', hinglish: 'Aadu', hindi: 'आड़ू', category: 'fruit', unit: 'kg', price: 100, icon: 'apple' },
  { id: 'litchi', name: 'Litchi', hinglish: 'Litchi', hindi: 'लीची', category: 'fruit', unit: 'kg', price: 150, icon: 'cherry', seasonal: true },
  { id: 'kinnow', name: 'Kinnow', hinglish: 'Kinnow', hindi: 'किन्नू', category: 'fruit', unit: 'kg', price: 60, icon: 'citrus', seasonal: true },
  { id: 'strawberry', name: 'Strawberry', hinglish: 'Strawberry', hindi: 'स्ट्रॉबेरी', category: 'fruit', unit: 'kg', price: 200, icon: 'cherry', seasonal: true },
  { id: 'custard-apple', name: 'Custard Apple', hinglish: 'Sitaphal', hindi: 'सीताफल', category: 'fruit', unit: 'kg', price: 100, icon: 'apple', seasonal: true },
]

export const DELIVERY_INFO = {
  areas: 'Ayodhya & nearby areas',
  b2b: 'Restaurants, hotels, caterers & kirana stores across Uttar Pradesh',
  payment: 'Cash on Delivery (COD)',
  note: 'Rates are indicative and confirmed on WhatsApp before dispatch. Quantity discounts apply automatically in your basket: 10–20 kg, 20–50 kg and 50+ kg tiers.',
}
