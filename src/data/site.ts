export const SITE = {
  name: 'Global TradeWave',
  legalName: 'Global Agro TradeWave Pvt. Ltd.',
  tagline: "From India's Farms to the World's Markets",
  phone: '+91 88082 53244',
  phoneHref: 'tel:+918808253244',
  // WhatsApp business number (orders & enquiries) — used for all wa.me links.
  whatsappNumber: '919336279229',
  whatsapp:
    'https://wa.me/919336279229?text=' +
    encodeURIComponent(
      'Hello Global TradeWave, I would like to enquire about your export products.',
    ),
  email: 'info@globaltradewave.com',
  address: 'Ayodhya, Uttar Pradesh, India',
  // FormSubmit delivers the enquiry form to the mailbox below without any backend.
  // After the first submission, FormSubmit emails a one-time activation link to this address.
  formEndpoint: 'https://formsubmit.co/ajax/info@globaltradewave.com',
  // Live produce pricing: paste your Google Sheet ID here (the long code in the
  // sheet's URL) after sharing it as "Anyone with the link can view".
  // Daily price edits in the sheet then appear on the site automatically.
  // Leave empty ('') to always use the built-in prices in data/produce.ts.
  livePricesSheetId: '',
} as const

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Import-Export', to: '/products' },
  { label: 'Fresh Produce', to: '/fresh-produce' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

export const STATS = [
  { value: '10+', label: 'Countries Served' },
  { value: '500+', label: 'Farmer Partners' },
  { value: '2', label: 'Business Verticals' },
  { value: '99.8%', label: 'Client Satisfaction' },
] as const
