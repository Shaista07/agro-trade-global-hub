import { useEffect, useState } from 'react'
import { SITE } from '../data/site'

export interface LivePrice {
  /** Positive number overrides the built-in price; NaN means "keep default". */
  price: number
  available: boolean
}

interface LivePriceState {
  map: Record<string, LivePrice>
  /** True when a live price source was fetched successfully. */
  live: boolean
}

/**
 * Fetches daily produce prices from two optional sources, merged in order:
 *
 *  1. `SITE.pricesJsonUrl` — prices.json in the GitHub repo, regenerated every
 *     morning by the "Daily mandi price update" Action from APMC Azadpur
 *     wholesale rates. Shape: { prices: { id: { price, available } } }
 *
 *  2. `SITE.livePricesSheetId` — an optional Google Sheet (id,price,available)
 *     whose entries take priority over prices.json.
 *
 * If neither source is reachable, the shop silently falls back to the
 * built-in prices in data/produce.ts.
 */
export function useLivePrices(): LivePriceState {
  const [state, setState] = useState<LivePriceState>({ map: {}, live: false })

  useEffect(() => {
    let cancelled = false

    async function load() {
      const map: Record<string, LivePrice> = {}
      let live = false

      // Source 1: auto-generated prices.json from the GitHub Action
      if (SITE.pricesJsonUrl) {
        try {
          const res = await fetch(SITE.pricesJsonUrl, { cache: 'no-store' })
          if (!res.ok) throw new Error(String(res.status))
          const data = await res.json()
          const prices = data?.prices ?? {}
          for (const [id, entry] of Object.entries(prices)) {
            const e = entry as { price?: number; available?: boolean }
            const price = Number(e.price)
            map[id] = {
              price: Number.isFinite(price) && price > 0 ? price : NaN,
              available: e.available !== false,
            }
          }
          live = true
        } catch {
          // prices.json unreachable — continue to other sources
        }
      }

      // Source 2 (optional): manual Google Sheet overrides
      if (SITE.livePricesSheetId) {
        try {
          const res = await fetch(
            `https://docs.google.com/spreadsheets/d/${SITE.livePricesSheetId}/gviz/tq?tqx=out:csv`,
          )
          if (!res.ok) throw new Error(String(res.status))
          const csv = await res.text()
          csv
            .split(/\r?\n/)
            .slice(1) // skip header
            .forEach((line) => {
              const [rawId, rawPrice, rawAvail] = line
                .split(',')
                .map((s) => s.trim().replace(/^"|"$/g, ''))
              if (!rawId) return
              const price = Number(rawPrice)
              map[rawId] = {
                price: Number.isFinite(price) && price > 0 ? price : NaN,
                available: (rawAvail ?? 'yes').toLowerCase() !== 'no',
              }
            })
          live = true
        } catch {
          // Sheet unreachable — keep whatever prices.json gave us
        }
      }

      if (!cancelled) setState({ map, live })
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
