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
  // Live produce pricing (primary): prices.json in the GitHub repo, refreshed
  // automatically every morning by the "Daily mandi price update" GitHub
  // Action from APMC Azadpur rates. The site fetches it on every visit with
  // no caching, so prices are always current.
  pricesJsonUrl:
    'https://raw.githubusercontent.com/Shaista07/agro-trade-global-hub/main/prices.json',
  // 45-day per-commodity rate + arrival history, regenerated daily by the
  // same GitHub Action. Powers the Mandi Bhav trends & forecast chart.
  historyJsonUrl:
    'https://raw.githubusercontent.com/Shaista07/agro-trade-global-hub/main/history.json',
  // Live produce pricing (optional override): paste a Google Sheet ID here
  // (shared as "Anyone with the link can view") and its prices take priority
  // over the auto-generated prices.json. Leave empty ('') to disable.
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
