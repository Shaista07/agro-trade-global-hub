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

## Updating Prices Daily (automatic — APMC mandi rates)

Prices update **by themselves** every morning:

1. The GitHub Action `.github/workflows/daily-prices.yml` runs at ~7:00 AM IST
2. It downloads the day's P.T.R. PDF from APMC Azadpur (Delhi), parses the
   wholesale **Maximum** rate and arrival tonnage per commodity, and commits
   two files to this repo:
   - `prices.json` — today's base rate per item
   - `history.json` — rolling 45-day rate + arrival history per item
     (powers the Mandi Bhav trends & forecast chart)
3. The website fetches both files on every visit (no caching) — visitors
   always see the current day's prices and up-to-date charts

**Customer-facing prices** are computed on the site from the base rate via
quantity tiers (`src/data/pricing.ts`):

| Quantity | Rate |
|---|---|
| 0–10 kg | base (APMC max) + 30% |
| 10–20 kg | base + 20% |
| 20–50 kg | base + 15% |
| 50+ kg | base + 10% (wholesale) |

Fresh-cut vegetables (any vegetable, customer-described cut) cost the
applicable tier rate + 15%. Tier margins, the cut premium, and labels are all
editable in `src/data/pricing.ts`.

Items missing from the day's mandi report keep their previous price. If the
APMC site is down, the action fails safely and the site keeps the last good
prices. Manual run: GitHub → Actions → "Daily mandi price update" → Run
workflow.

### Mandi Bhav — Trends & Forecast chart

The Fresh Produce page includes a per-commodity chart (`src/components/PriceTrends.tsx`):
30 days of retail rates (APMC max + 30%) and arrival tonnage from `history.json`,
plus a 3-day forecast using a **volume-weighted moving average** (weights = mandi
arrival volumes, damped trend capped at ±2%/day). The chart is labelled as an
indicative forecast, not binding. Items with fewer than 7 days of history are
excluded automatically; if `history.json` is unavailable the section hides itself.

### Optional manual override (Google Sheet)

To override any auto price manually, create a Google Sheet with columns
`id,price,available`, share as "Anyone with the link can view", and paste its
ID into `src/data/site.ts` → `livePricesSheetId`. Sheet entries take
priority over the auto-generated prices. Leave empty to disable.

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
