# Global TradeWave — Website

Official website for **Global Agro TradeWave Pvt. Ltd.** (globaltradewave.com)

Two business verticals:

1. **International Import-Export** (`/#/products`) — rice, cashew, spices, pulses, teak wood
2. **Fresh Produce (Domestic)** (`/#/fresh-produce`) — fruits & vegetables ecommerce-style catalogue with COD ordering via WhatsApp

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 3.4 + shadcn/ui
- HashRouter (works on any static host — no server rewrite rules needed, direct links never 404)

## Repo Migration (first time only)

Move the old codebase into `archive/` and place this project at the repo root:

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
mkdir -p archive
find . -maxdepth 1 -not -name '.' -not -name '.git' -not -name 'archive' -exec mv {} archive/ \;
# now copy/unzip THIS project's files into the repo root, then:
git add -A
git commit -m "New website: two-vertical redesign; legacy code moved to archive/"
git push
```

## Mobile App (PWA)

The site is an installable **Progressive Web App** branded **"GTW Fresh"** —
customers open the site on their phone and tap **Add to Home Screen** to get a
real app icon that opens straight into the Fresh Produce shop in full-screen
app mode (no browser chrome). Works on Android and iPhone, no app store needed.

- Manifest: `public/manifest.webmanifest` (opens at `/#/fresh-produce`)
- App icons: `public/icons/`
- Offline caching: `public/sw.js` — **bump `CACHE_VERSION` on every deploy**

## Build & Deploy

```bash
npm install
npm run build      # outputs static site to dist/
```

Upload the **contents of `dist/`** to your web host — that folder is a drop-in
replacement for the current live site. `_redirects` (Netlify) and `vercel.json`
(Vercel) are included but not required, since hash routing works everywhere.

## Updating Prices Daily (Google Sheet — recommended)

The shop can read live prices from a Google Sheet you own — edit the sheet
anytime and the site updates automatically, no rebuild or re-upload needed.

**One-time setup (5 minutes):**

1. Create a new Google Sheet. In the first tab, paste this header in row 1:
   `id` | `price` | `available`
2. Add one row per item, using the IDs from `src/data/produce.ts`, e.g.:
   `potato` | `32` | `yes`
3. **Share → General access → "Anyone with the link" → Viewer**
4. Copy the sheet ID from the URL (the long code between `/d/` and `/edit`)
5. Paste it into `src/data/site.ts` → `livePricesSheetId`, then
   `npm run build` and upload `dist/` once. Done forever.

**Daily ops:** just edit the `price` column each morning. Set `available` to
`no` to mark an item out of stock (shows "Stock mein nahi" on the site).
Leave a price cell empty to fall back to the built-in default.

If the sheet is ever unreachable, the site silently falls back to the
built-in prices in `src/data/produce.ts` — the shop never breaks.

## Editing Products in Code (alternative)

Fresh produce catalogue: `src/data/produce.ts` — one line per item:

```ts
{ id: 'potato', name: 'Potato', hinglish: 'Aloo', hindi: 'आलू', category: 'vegetable', unit: 'kg', price: 30, icon: 'carrot' },
```

After editing: `npm run build` and re-upload `dist/`.

Export products (rice, cashew, etc.): `src/data/products.ts`
Company info / phone / WhatsApp number: `src/data/site.ts`

## Contact & Orders

- **WhatsApp (orders & enquiries):** +91 93362 79229 — set once in `src/data/site.ts`
- **COD orders** arrive as structured WhatsApp messages with items, quantities, indicative total, and customer name / phone / address
- **Enquiry form** delivers to info@globaltradewave.com via FormSubmit (one-time activation email on first submission)
