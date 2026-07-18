/**
 * GTW Fresh — tiered pricing engine.
 *
 * The base rate per item is the APMC Azadpur wholesale MAXIMUM rate (₹/kg,
 * ₹/dozen or ₹/bunch depending on the item's unit). Customers are charged the
 * base rate plus a margin that depends on the quantity they buy:
 *
 *   50+ units   → base + 10%   (wholesale)
 *   20–50 units → base + 15%
 *   10–20 units → base + 20%
 *   0–10 units  → base + 30%   (retail)
 *
 * Fresh-cut vegetables carry a 15% premium over the applicable tier rate.
 * All rates are rounded to the nearest rupee and remain indicative — the
 * final bill is confirmed on WhatsApp before dispatch.
 */

export interface PriceTier {
  /** Inclusive lower bound of the tier (in the item's unit). */
  min: number
  margin: number
  label: string
  short: string
}

export const PRICE_TIERS: PriceTier[] = [
  { min: 50, margin: 0.1, label: 'Wholesale · 50+ kg', short: '50+ kg rate' },
  { min: 20, margin: 0.15, label: '20–50 kg', short: '20–50 kg rate' },
  { min: 10, margin: 0.2, label: '10–20 kg', short: '10–20 kg rate' },
  { min: 0, margin: 0.3, label: 'Retail · 0–10 kg', short: '0–10 kg rate' },
]

export const CUT_PREMIUM = 0.15

export function tierFor(qty: number): PriceTier {
  return PRICE_TIERS.find((t) => qty >= t.min) ?? PRICE_TIERS[PRICE_TIERS.length - 1]
}

/** Unit rate for a given base rate, quantity and cut preference. */
export function unitRate(base: number, qty: number, cut: boolean): number {
  const tier = tierFor(Math.max(qty, 1))
  const rate = base * (1 + tier.margin) * (cut ? 1 + CUT_PREMIUM : 1)
  return Math.round(rate)
}

/** The retail (0–10) rate — what cards display as the headline price. */
export function retailRate(base: number): number {
  return Math.round(base * (1 + PRICE_TIERS[PRICE_TIERS.length - 1].margin))
}

/** The 50+ wholesale rate — advertised on cards for bulk buyers. */
export function wholesaleRate(base: number): number {
  return Math.round(base * (1 + PRICE_TIERS[0].margin))
}

export const PRICING_NOTE =
  'Rates follow APMC Azadpur wholesale maximums plus a quantity-based margin: 0–10 kg +30%, 10–20 kg +20%, 20–50 kg +15%, 50+ kg +10%. Fresh-cut vegetables: tier rate +15%. Final bill confirmed on WhatsApp before dispatch.'
