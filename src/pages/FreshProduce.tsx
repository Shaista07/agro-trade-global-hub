import { useEffect, useMemo, useState } from 'react'
import {
  Apple,
  Banana,
  Carrot,
  Cherry,
  Citrus,
  Grape,
  Leaf,
  Salad,
  Sprout,
  Search,
  ShoppingBasket,
  Minus,
  Plus,
  X,
  Trash2,
  MessageCircle,
  Bike,
  Banknote,
  Percent,
  Scissors,
  Loader2,
  Download,
} from 'lucide-react'
import { PRODUCE_ITEMS, DELIVERY_INFO } from '../data/produce'
import type { ProduceItem } from '../data/produce'
import {
  tierFor,
  unitRate,
  retailRate,
  wholesaleRate,
  PRICING_NOTE,
} from '../data/pricing'
import { SITE } from '../data/site'
import SectionHeading from '../components/SectionHeading'
import PriceTrends from '../components/PriceTrends'
import { useReveal } from '../hooks/useReveal'
import { useLivePrices } from '../hooks/useLivePrices'
import produceImg from '../assets/produce.jpg'

const ICONS: Record<string, typeof Apple> = {
  apple: Apple,
  banana: Banana,
  carrot: Carrot,
  cherry: Cherry,
  citrus: Citrus,
  grape: Grape,
  leaf: Leaf,
  salad: Salad,
  sprout: Sprout,
}

type Filter = 'all' | 'vegetable' | 'fruit'

interface CartLine {
  qty: number
  cut: boolean
  cutNote: string
}
type Cart = Record<string, CartLine>

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`

// Real product photos (one per produce id), bundled by Vite.
const produceImages = import.meta.glob('../assets/produce/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function produceImage(id: string): string | undefined {
  return produceImages[`../assets/produce/${id}.jpg`]
}

export default function FreshProduce() {
  useReveal()
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<Cart>({})
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [placing, setPlacing] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' })
  const [formError, setFormError] = useState('')
  const { map: liveMap, live } = useLivePrices()

  // ── PWA install prompt ─────────────────────────────────
  const [deferredPrompt, setDeferredPrompt] = useState<
    (Event & { prompt: () => void; userChoice: Promise<{ outcome: string }> }) | null
  >(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true
    if (standalone || sessionStorage.getItem('gtw-install-dismissed')) return
    setShowInstall(true)
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as typeof deferredPrompt)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function installApp() {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setShowInstall(false)
  }

  function dismissInstall() {
    sessionStorage.setItem('gtw-install-dismissed', '1')
    setShowInstall(false)
  }

  // Catalogue with live sheet/JSON base rates merged over the defaults.
  const pricedItems = useMemo(
    () =>
      PRODUCE_ITEMS.map((it) => {
        const lp = liveMap[it.id]
        return {
          ...it,
          price: lp && lp.price > 0 ? lp.price : it.price,
          available: lp ? lp.available : true,
        }
      }),
    [liveMap],
  )

  const items = useMemo(() => {
    return pricedItems.filter((it) => {
      const matchesFilter = filter === 'all' || it.category === filter
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        it.name.toLowerCase().includes(q) ||
        it.hinglish.toLowerCase().includes(q) ||
        it.hindi.includes(query.trim())
      return matchesFilter && matchesQuery
    })
  }, [pricedItems, filter, query])

  const cartEntries = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, line]) => {
          const item = pricedItems.find((p) => p.id === id)
          if (!item || line.qty <= 0) return null
          const rate = unitRate(item.price, line.qty, line.cut)
          return { item, ...line, rate, lineTotal: rate * line.qty }
        })
        .filter((e): e is NonNullable<typeof e> => e !== null),
    [pricedItems, cart],
  )
  const totalLines = cartEntries.length
  const subtotal = cartEntries.reduce((s, e) => s + e.lineTotal, 0)

  function setQty(id: string, qty: number) {
    setCart((prev) => {
      const next = { ...prev }
      if (qty <= 0) {
        delete next[id]
      } else {
        const existing = next[id]
        next[id] = {
          qty,
          cut: existing?.cut ?? false,
          cutNote: existing?.cutNote ?? '',
        }
      }
      return next
    })
  }

  function setCut(id: string, cut: boolean) {
    setCart((prev) =>
      prev[id] ? { ...prev, [id]: { ...prev[id], cut } } : prev,
    )
  }

  function setCutNote(id: string, cutNote: string) {
    setCart((prev) =>
      prev[id] ? { ...prev, [id]: { ...prev[id], cutNote } } : prev,
    )
  }

  function validate() {
    if (cartEntries.length === 0) return 'Your basket is empty.'
    const cutMissing = cartEntries.find((e) => e.cut && !e.cutNote.trim())
    if (cutMissing)
      return `Please describe the cut type for ${cutMissing.item.name} (${cutMissing.item.hinglish}).`
    if (!form.name.trim()) return 'Please enter your name.'
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      return 'Please enter a valid 10-digit Indian mobile number.'
    if (form.address.trim().length < 10)
      return 'Please enter your full delivery address.'
    return ''
  }

  function placeOrder() {
    const err = validate()
    setFormError(err)
    if (err) return
    setPlacing(true)

    const itemLines: string[] = cartEntries.map((e, i) => {
      const tier = tierFor(e.qty)
      const base = `${i + 1}. ${e.item.name} (${e.item.hinglish}) — ${e.qty} ${e.item.unit} @ ${inr(e.rate)}/${e.item.unit} (${tier.short}) = ${inr(e.lineTotal)}`
      return e.cut
        ? `${base}\n   Fresh Cut +15%: ${e.cutNote.trim()}`
        : base
    })

    const message = [
      'NEW ORDER — GTW Fresh (COD)',
      '----------------------------',
      ...itemLines,
      '----------------------------',
      `Subtotal (indicative): ${inr(subtotal)}`,
      '',
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Address: ${form.address.trim()}`,
      form.note.trim() ? `Note: ${form.note.trim()}` : '',
      'Payment: Cash on Delivery',
      '(Rates: APMC max + quantity-tier margin; final bill confirmed here before dispatch)',
    ]
      .filter(Boolean)
      .join('\n')

    const url = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener')
    setTimeout(() => setPlacing(false), 800)
  }

  return (
    <main>
      {/* ── Header ───────────────────────────────────────── */}
      <section className="bg-brand-950 pb-20 pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            align="left"
            eyebrow="Domestic Vertical — Fresh Produce"
            title="Farm-fresh fruits & vegetables, delivered home"
            subtitle="Sourced every morning from our farmer network and delivered to your doorstep. Retail to wholesale quantities, fresh-cut vegetables on request — pay cash on delivery."
          />
          <div className="reveal mt-8 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-900/70 px-4 py-2 text-brand-100 ring-1 ring-brand-800">
              <Bike className="h-4 w-4 text-leaf-300" />
              Home delivery — {DELIVERY_INFO.areas}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-900/70 px-4 py-2 text-brand-100 ring-1 ring-brand-800">
              <Banknote className="h-4 w-4 text-leaf-300" />
              {DELIVERY_INFO.payment}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-900/70 px-4 py-2 text-brand-100 ring-1 ring-brand-800">
              <Percent className="h-4 w-4 text-leaf-300" />
              Auto bulk discounts — 10 / 20 / 50+ kg tiers
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-900/70 px-4 py-2 text-brand-100 ring-1 ring-brand-800">
              <Scissors className="h-4 w-4 text-leaf-300" />
              Fresh-cut vegetables, any cut you need
            </span>
          </div>
        </div>
      </section>

      {/* ── Shop toolbar ─────────────────────────────────── */}
      <section className="sticky top-20 z-30 border-b border-brand-100 bg-cream/95 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex rounded-full bg-sand p-1">
            {(
              [
                ['all', 'Sab Kuch (All)'],
                ['vegetable', 'Sabziyan (Vegetables)'],
                ['fruit', 'Phal (Fruits)'],
              ] as [Filter, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === key
                    ? 'bg-brand-900 text-cream'
                    : 'text-brand-700 hover:text-brand-950'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search — aloo, tamatar, आम…"
              className="w-full rounded-full border border-brand-200 bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold ${
              live ? 'bg-leaf-100 text-leaf-500' : 'bg-sand text-brand-500'
            }`}
            title={
              live
                ? 'Base rates are being read live from the daily mandi report'
                : 'Showing standard base rates — live feed not connected'
            }
          >
            <span
              className={`h-2 w-2 rounded-full ${
                live ? 'animate-pulse bg-[#25D366]' : 'bg-brand-300'
              }`}
            />
            {live ? 'Live Mandi Rates' : 'Standard Rates'}
          </span>
        </div>
      </section>

      {/* ── Install app banner ───────────────────────────── */}
      {showInstall && (
        <div className="border-b border-brand-100 bg-leaf-100">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <Download className="h-4 w-4 shrink-0 text-brand-800" />
            <p className="text-xs font-medium text-brand-800 sm:text-sm">
              <strong>GTW Fresh app install karein</strong> — home screen se ek
              tap mein order.{' '}
              {!deferredPrompt && (
                <span className="text-brand-600">
                  Browser menu → &ldquo;Add to Home Screen&rdquo; (iPhone: Share
                  → Add to Home Screen)
                </span>
              )}
            </p>
            {deferredPrompt && (
              <button
                onClick={installApp}
                className="rounded-full bg-brand-900 px-4 py-1.5 text-xs font-bold text-cream transition-colors hover:bg-brand-950"
              >
                Install Now
              </button>
            )}
            <button
              onClick={dismissInstall}
              className="text-brand-500 hover:text-brand-800"
              aria-label="Dismiss install banner"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── Product grid ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <p className="py-20 text-center text-brand-600">
            Kuch nahi mila — try another search, or ask us on WhatsApp. We source
            on request.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((item) => (
              <ProduceCard
                key={item.id}
                item={item}
                qty={cart[item.id]?.qty ?? 0}
                onQty={(q) => setQty(item.id, q)}
              />
            ))}
          </div>
        )}
        <p className="mt-10 rounded-2xl bg-sand px-5 py-4 text-center text-xs leading-relaxed text-brand-700">
          {PRICING_NOTE} Something not listed, or bulk supply for your
          restaurant / hotel / store?{' '}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-brand-900 underline"
          >
            Message us on WhatsApp
          </a>{' '}
          — we source on request.
        </p>
      </section>

      {/* ── Price trends & forecast ──────────────────────── */}
      <PriceTrends />

      {/* ── B2B band ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="reveal relative overflow-hidden rounded-[2.5rem] bg-brand-950 px-8 py-14 sm:px-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              backgroundImage: `url(${produceImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="relative flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold text-cream sm:text-3xl">
                Restaurant, hotel ya kirana store?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-200">
                Order 50+ kg straight from this page and wholesale rates apply
                automatically. Fresh-cut vegetables prepared to your spec —
                fine chop, julienne, dice, anything your kitchen needs.
              </p>
            </div>
            <a
              href={
                `https://wa.me/${SITE.whatsappNumber}?text=` +
                encodeURIComponent(
                  'Hello Global TradeWave, I need B2B bulk supply of fresh fruits & vegetables for my business. Please share rates.',
                )
              }
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.04]"
            >
              <MessageCircle className="h-4 w-4" />
              Get Bulk Rates on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Floating basket button ───────────────────────── */}
      {totalLines > 0 && !drawerOpen && (
        <button
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full bg-brand-900 py-3 pl-5 pr-6 text-cream shadow-[0_12px_40px_rgba(13,38,44,0.4)] transition-transform hover:scale-[1.03]"
        >
          <span className="relative">
            <ShoppingBasket className="h-6 w-6" />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-leaf-300 text-[11px] font-bold text-brand-950">
              {totalLines}
            </span>
          </span>
          <span className="text-sm font-semibold">
            View Basket · {inr(subtotal)}
          </span>
        </button>
      )}

      {/* ── Basket drawer ────────────────────────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-brand-950/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl">
            <div className="flex items-center justify-between border-b border-brand-100 px-6 py-5">
              <h3 className="flex items-center gap-2 font-display text-xl font-bold text-brand-950">
                <ShoppingBasket className="h-5 w-5" />
                Your Basket
              </h3>
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-brand-700 hover:bg-brand-100"
                aria-label="Close basket"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {cartEntries.length === 0 ? (
                <p className="py-16 text-center text-sm text-brand-600">
                  Your basket is empty. Add some taazi sabziyan aur phal!
                </p>
              ) : (
                <ul className="space-y-4">
                  {cartEntries.map((e) => {
                    const Icon = ICONS[e.item.icon] ?? Leaf
                    const img = produceImage(e.item.id)
                    const tier = tierFor(e.qty)
                    return (
                      <li
                        key={e.item.id}
                        className="rounded-2xl bg-white p-3 ring-1 ring-brand-100"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f6f5f0] text-leaf-500">
                            {img ? (
                              <img
                                src={img}
                                alt={e.item.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Icon className="h-6 w-6" />
                            )}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-brand-950">
                              {e.item.name} ({e.item.hinglish})
                            </p>
                            <p className="text-xs text-brand-500">
                              {inr(e.rate)}/{e.item.unit} · {tier.short}
                              {e.cut && ' + cut'}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-brand-950">
                            {inr(e.lineTotal)}
                          </p>
                          <button
                            onClick={() => setQty(e.item.id, 0)}
                            className="text-brand-400 hover:text-red-600"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* quantity controls */}
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            onClick={() => setQty(e.item.id, e.qty - 1)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand text-brand-800 hover:bg-brand-100"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <div className="flex items-center gap-1 rounded-full bg-sand px-3 py-1.5">
                            <input
                              type="number"
                              min={1}
                              value={e.qty}
                              onChange={(ev) =>
                                setQty(
                                  e.item.id,
                                  Math.max(0, Math.floor(Number(ev.target.value) || 0)),
                                )
                              }
                              className="w-14 bg-transparent text-center text-sm font-bold text-brand-950 outline-none"
                            />
                            <span className="text-xs text-brand-500">
                              {e.item.unit}
                            </span>
                          </div>
                          <button
                            onClick={() => setQty(e.item.id, e.qty + 1)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand text-brand-800 hover:bg-brand-100"
                            aria-label="Increase"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                          <div className="ml-auto flex gap-1">
                            {[5, 10, 25, 50].map((n) => (
                              <button
                                key={n}
                                onClick={() => setQty(e.item.id, n)}
                                className={`rounded-full px-2 py-1 text-[11px] font-bold ${
                                  e.qty === n
                                    ? 'bg-brand-900 text-cream'
                                    : 'bg-sand text-brand-600 hover:bg-brand-100'
                                }`}
                              >
                                {n}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* fresh-cut option (vegetables only) */}
                        {e.item.category === 'vegetable' && (
                          <div className="mt-3 rounded-xl bg-sand/70 p-2.5">
                            <label className="flex cursor-pointer items-center gap-2">
                              <input
                                type="checkbox"
                                checked={e.cut}
                                onChange={(ev) => setCut(e.item.id, ev.target.checked)}
                                className="h-4 w-4 rounded accent-brand-900"
                              />
                              <Scissors className="h-3.5 w-3.5 text-brand-600" />
                              <span className="text-xs font-semibold text-brand-800">
                                Fresh Cut +15% — kaat ke dijiye
                              </span>
                            </label>
                            {e.cut && (
                              <input
                                value={e.cutNote}
                                onChange={(ev) => setCutNote(e.item.id, ev.target.value)}
                                placeholder="Cut type — e.g. fine chop, julienne, dice, slices…"
                                className="mt-2 w-full rounded-lg border border-brand-200 bg-white px-3 py-2 text-xs outline-none focus:border-brand-500"
                              />
                            )}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}

              {cartEntries.length > 0 && (
                <div className="mt-6 space-y-4 border-t border-brand-100 pt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-brand-700">Subtotal (indicative)</span>
                    <span className="font-display text-xl font-bold text-brand-950">
                      {inr(subtotal)}
                    </span>
                  </div>
                  <p className="rounded-xl bg-sand px-4 py-3 text-xs leading-relaxed text-brand-700">
                    Payment: <strong>Cash on Delivery</strong>. Rates follow
                    daily mandi maximums with quantity-tier margins — final bill
                    confirmed on WhatsApp before dispatch.
                  </p>

                  <div className="space-y-3">
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name *"
                      className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Mobile number (10-digit) *"
                      inputMode="numeric"
                      maxLength={10}
                      className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                    <textarea
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      placeholder="Full delivery address with landmark *"
                      rows={3}
                      className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                    <input
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      placeholder="Delivery note (optional — time slot, instructions)"
                      className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                  </div>

                  {formError && (
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                      {formError}
                    </p>
                  )}
                </div>
              )}
            </div>

            {cartEntries.length > 0 && (
              <div className="border-t border-brand-100 p-6">
                <button
                  onClick={placeOrder}
                  disabled={placing}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {placing ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <MessageCircle className="h-5 w-5" />
                  )}
                  Place Order on WhatsApp · {inr(subtotal)}
                </button>
                <p className="mt-3 text-center text-[11px] text-brand-500">
                  Your order opens as a ready-to-send WhatsApp message — just
                  press send.
                </p>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  )
}

function ProduceCard({
  item,
  qty,
  onQty,
}: {
  item: ProduceItem & { available: boolean }
  qty: number
  onQty: (qty: number) => void
}) {
  const Icon = ICONS[item.icon] ?? Leaf
  const img = produceImage(item.id)
  return (
    <div
      className={`group flex flex-col rounded-3xl bg-white p-4 ring-1 ring-brand-100 transition-all ${
        item.available
          ? 'hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(13,38,44,0.12)]'
          : 'opacity-70'
      }`}
    >
      <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-2xl bg-[#f6f5f0] sm:h-32">
        {img ? (
          <img
            src={img}
            alt={`${item.name} (${item.hinglish})`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Icon
            className={`h-14 w-14 transition-transform group-hover:scale-110 ${
              item.category === 'fruit' ? 'text-amber-500' : 'text-leaf-500'
            }`}
          />
        )}
        {item.seasonal && item.available && (
          <span className="absolute left-2 top-2 rounded-full bg-brand-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-leaf-200">
            Seasonal
          </span>
        )}
        {!item.available && (
          <span className="absolute left-2 top-2 rounded-full bg-red-700 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Out of Stock
          </span>
        )}
      </div>
      <div className="mt-3 flex-1">
        <p className="font-display text-base font-bold leading-tight text-brand-950">
          {item.name}
        </p>
        <p className="mt-0.5 text-xs text-brand-600">
          {item.hinglish} · <span className="font-medium">{item.hindi}</span>
        </p>
        <p className="mt-2 text-sm font-bold text-brand-900">
          {inr(retailRate(item.price))}
          <span className="text-xs font-medium text-brand-500">
            {' '}
            / {item.unit}
          </span>
        </p>
        <p className="mt-0.5 text-[11px] font-medium text-leaf-500">
          50+ {item.unit}: {inr(wholesaleRate(item.price))}/{item.unit}
        </p>
      </div>
      <div className="mt-3">
        {!item.available ? (
          <button
            disabled
            className="w-full cursor-not-allowed rounded-full bg-brand-100 py-2.5 text-xs font-bold uppercase tracking-wider text-brand-500"
          >
            Stock mein nahi
          </button>
        ) : qty === 0 ? (
          <button
            onClick={() => onQty(1)}
            className="w-full rounded-full bg-brand-900 py-2.5 text-xs font-bold uppercase tracking-wider text-cream transition-colors hover:bg-brand-950"
          >
            Add to Basket
          </button>
        ) : (
          <div className="flex items-center justify-between rounded-full bg-brand-900 p-1">
            <button
              onClick={() => onQty(qty - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/15 text-cream hover:bg-cream/25"
              aria-label="Decrease"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-sm font-bold text-cream">
              {qty} {item.unit}
            </span>
            <button
              onClick={() => onQty(qty + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/15 text-cream hover:bg-cream/25"
              aria-label="Increase"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
