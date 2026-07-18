import { useEffect, useMemo, useState } from 'react'
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { TrendingUp, Info } from 'lucide-react'
import { PRODUCE_ITEMS } from '../data/produce'
import { retailRate } from '../data/pricing'
import { SITE } from '../data/site'

interface HistoryPoint {
  d: string // ISO date
  max: number // APMC maximum wholesale rate
  arr: number // arrival tonnage (demand proxy)
}

interface HistoryData {
  updated: string
  items: Record<string, HistoryPoint[]>
}

interface ChartPoint {
  label: string
  rate?: number
  forecast?: number
  arrival?: number
}

const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`

function fmtDay(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  })
}

/** Volume-weighted moving average of the last n points (weights = arrivals). */
function vwma(points: HistoryPoint[], n: number): number {
  const slice = points.slice(-n)
  let sw = 0
  let wsum = 0
  for (const p of slice) {
    const w = p.arr > 0 ? p.arr : 1
    sw += retailRate(p.max) * w
    wsum += w
  }
  return wsum ? sw / wsum : 0
}

export default function PriceTrends() {
  const [history, setHistory] = useState<HistoryData | null>(null)
  const [failed, setFailed] = useState(false)
  const [selected, setSelected] = useState('potato')

  useEffect(() => {
    fetch(SITE.historyJsonUrl, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: HistoryData) => setHistory(data))
      .catch(() => setFailed(true))
  }, [])

  // Commodities that have enough history to chart
  const chartable = useMemo(() => {
    if (!history) return []
    return PRODUCE_ITEMS.filter(
      (it) => (history.items[it.id]?.length ?? 0) >= 7,
    )
  }, [history])

  const { points, forecastValues, currentRate, avg30 } = useMemo(() => {
    if (!history) {
      return { points: [] as ChartPoint[], forecastValues: [] as number[], currentRate: 0, avg30: 0 }
    }
    const series = (history.items[selected] ?? []).slice(-30)
    if (series.length < 7) {
      return { points: [] as ChartPoint[], forecastValues: [] as number[], currentRate: 0, avg30: 0 }
    }

    const actual: ChartPoint[] = series.map((p) => ({
      label: fmtDay(p.d),
      rate: retailRate(p.max),
      arrival: p.arr,
    }))

    // Forecast: VWMA(7) with a damped trend, 3 days out
    const vNow = vwma(series, 7)
    const vPrev = vwma(series.slice(0, -7), 7)
    const rawTrend = vPrev > 0 ? (vNow - vPrev) / 7 : 0
    const cap = vNow * 0.02 // max ±2% drift per day
    const trend = Math.max(-cap, Math.min(cap, rawTrend)) * 0.5

    const lastDate = new Date(series[series.length - 1].d + 'T00:00:00')
    const fValues = [1, 2, 3].map((i) => Math.round(vNow + trend * i))
    const forecast: ChartPoint[] = fValues.map((v, i) => {
      const d = new Date(lastDate)
      d.setDate(d.getDate() + i + 1)
      return {
        label: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        forecast: v,
      }
    })

    // bridge so the dashed line connects to the last actual point
    actual[actual.length - 1].forecast = actual[actual.length - 1].rate

    const avg =
      actual.reduce((s, p) => s + (p.rate ?? 0), 0) / (actual.length || 1)

    return {
      points: [...actual, ...forecast],
      forecastValues: fValues,
      currentRate: retailRate(series[series.length - 1].max),
      avg30: avg,
    }
  }, [history, selected])

  if (failed) return null // history not published yet — hide section silently
  if (!history) return null

  const selectedItem = PRODUCE_ITEMS.find((it) => it.id === selected)

  return (
    <section className="bg-sand py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-500">
            Unique to GTW Fresh
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">
            Mandi Bhav — Trends &amp; Forecast
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-700/80">
            30 days of Azadpur mandi rates and arrival volumes, with a
            volume-weighted moving-average forecast for the next 3 days — so
            you can plan when to buy.
          </p>
        </div>

        <div className="reveal mt-10 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-brand-100 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <label
              htmlFor="trend-item"
              className="text-xs font-semibold uppercase tracking-wider text-brand-600"
            >
              Commodity
            </label>
            <select
              id="trend-item"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="rounded-full border border-brand-200 bg-cream px-4 py-2.5 text-sm font-semibold text-brand-900 outline-none focus:border-brand-500"
            >
              {chartable.map((it) => (
                <option key={it.id} value={it.id}>
                  {it.name} ({it.hinglish})
                </option>
              ))}
            </select>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-leaf-100 px-3 py-1.5 text-[11px] font-semibold text-brand-800">
              <TrendingUp className="h-3.5 w-3.5" />
              Azadpur Mandi · Delhi
            </span>
          </div>

          {points.length === 0 ? (
            <p className="py-16 text-center text-sm text-brand-600">
              Not enough history for {selectedItem?.name} yet — check back in a
              few days.
            </p>
          ) : (
            <>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-cream px-2 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-500">
                    Today (retail)
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-brand-950 sm:text-xl">
                    {inr(currentRate)}
                    <span className="text-xs font-medium text-brand-500">
                      /{selectedItem?.unit}
                    </span>
                  </p>
                </div>
                <div className="rounded-2xl bg-cream px-2 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-500">
                    30-day average
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-brand-950 sm:text-xl">
                    {inr(avg30)}
                  </p>
                </div>
                <div className="rounded-2xl bg-leaf-100 px-2 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-600">
                    3-day forecast
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-brand-950 sm:text-xl">
                    {inr(Math.min(...forecastValues))}–{inr(Math.max(...forecastValues))}
                  </p>
                </div>
              </div>

              <div className="mt-6 h-72 w-full sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={points}
                    margin={{ top: 8, right: 4, bottom: 0, left: -14 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e7e2d4" />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 10, fill: '#5c7570' }}
                      interval="preserveStartEnd"
                      minTickGap={28}
                    />
                    <YAxis
                      yAxisId="rate"
                      tick={{ fontSize: 10, fill: '#5c7570' }}
                      tickFormatter={(v: number) => `₹${v}`}
                      domain={['auto', 'auto']}
                    />
                    <YAxis
                      yAxisId="arr"
                      orientation="right"
                      tick={{ fontSize: 10, fill: '#aab' }}
                      tickFormatter={(v: number) => `${v}t`}
                      hide
                    />
                    <Tooltip
                      formatter={(value: number, name: string) =>
                        name === 'Arrival (tonnes)'
                          ? [`${value} t`, name]
                          : [`₹${value}/${selectedItem?.unit}`, name]
                      }
                      contentStyle={{
                        borderRadius: 12,
                        border: '1px solid #dceaea',
                        fontSize: 12,
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar
                      yAxisId="arr"
                      dataKey="arrival"
                      name="Arrival (tonnes)"
                      fill="#dde8a8"
                      radius={[3, 3, 0, 0]}
                    />
                    <Line
                      yAxisId="rate"
                      type="monotone"
                      dataKey="rate"
                      name={`Retail rate (₹/${selectedItem?.unit})`}
                      stroke="#123036"
                      strokeWidth={2.5}
                      dot={false}
                    />
                    <Line
                      yAxisId="rate"
                      type="monotone"
                      dataKey="forecast"
                      name="Forecast (not binding)"
                      stroke="#8fa83f"
                      strokeWidth={2.5}
                      strokeDasharray="6 5"
                      dot={{ r: 3.5, fill: '#8fa83f' }}
                      connectNulls
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <p className="mt-5 flex items-start gap-2 rounded-xl bg-sand px-4 py-3 text-[11px] leading-relaxed text-brand-700">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Forecast is a volume-weighted moving-average projection based on
                mandi arrival volumes and daily maximum rates. It is indicative
                only — not binding. Actual daily rate is confirmed on WhatsApp
                before dispatch.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
