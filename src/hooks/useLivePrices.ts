import { useEffect, useState } from 'react'
import { SITE } from '../data/site'

export interface LivePrice {
  /** Positive number overrides the built-in price; NaN means "keep default". */
  price: number
  available: boolean
}

interface LivePriceState {
  map: Record<string, LivePrice>
  /** True when the Google Sheet was fetched successfully. */
  live: boolean
}

/**
 * Fetches daily produce prices from a published Google Sheet.
 *
 * Sheet format (tab named anything; first row = header):
 *   id,price,available
 *   potato,32,yes
 *   onion,,no          -> keeps built-in price, marks out of stock
 *
 * If the sheet ID is not configured or the fetch fails, the shop silently
 * falls back to the built-in prices in data/produce.ts.
 */
export function useLivePrices(): LivePriceState {
  const [state, setState] = useState<LivePriceState>({ map: {}, live: false })

  useEffect(() => {
    const sheetId = SITE.livePricesSheetId
    if (!sheetId) return

    fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`)
      .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
      .then((csv) => {
        const map: Record<string, LivePrice> = {}
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
        setState({ map, live: true })
      })
      .catch(() => {
        // Sheet unreachable — keep built-in prices, no user-facing error.
      })
  }, [])

  return state
}
