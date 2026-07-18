import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { ArrowRight, BadgeCheck, MessageCircle, Package } from 'lucide-react'
import { PRODUCT_CATEGORIES } from '../data/products'
import { SITE } from '../data/site'
import SectionHeading from '../components/SectionHeading'
import { useReveal } from '../hooks/useReveal'

const TRADE_TERMS = [
  { term: 'FOB / CIF / EXW', note: 'Incoterms to suit your logistics setup' },
  { term: 'Full Container & LCL', note: 'From trial pallets to recurring FCL programmes' },
  { term: 'Pre-Shipment Inspection', note: 'Third-party inspection welcome on every lot' },
  { term: 'Complete Documentation', note: 'Phytosanitary, certificate of origin, fumigation, COA' },
]

export default function Products() {
  useReveal()
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 80)
      }
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.hash])

  return (
    <main>
      {/* ── Header ───────────────────────────────────────── */}
      <section className="bg-brand-950 pb-20 pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            align="left"
            eyebrow="International Vertical — Import-Export"
            title="Premium Indian products, export-ready"
            subtitle="Five export categories sourced at origin, graded to your specification, and shipped with complete export documentation. Looking for something specific? We source on request."
          />
        </div>
      </section>

      {/* ── Trade terms strip ────────────────────────────── */}
      <section className="border-b border-brand-100 bg-sand">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {TRADE_TERMS.map((t) => (
            <div key={t.term} className="reveal">
              <p className="flex items-center gap-2 text-sm font-bold text-brand-900">
                <BadgeCheck className="h-4 w-4 text-brand-500" />
                {t.term}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-brand-600">
                {t.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category sections ────────────────────────────── */}
      <section className="mx-auto max-w-7xl space-y-24 px-4 py-24 sm:px-6 lg:px-8">
        {PRODUCT_CATEGORIES.map((cat, i) => (
          <article
            key={cat.id}
            id={cat.id}
            className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <div className={`reveal ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <img
                src={cat.image}
                alt={cat.name}
                className="aspect-[3/2] w-full rounded-3xl object-cover shadow-[0_20px_50px_rgba(13,38,44,0.15)]"
              />
            </div>
            <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
              <p className="reveal text-xs font-semibold uppercase tracking-[0.22em] text-brand-500">
                {String(i + 1).padStart(2, '0')} — Category
              </p>
              <h2 className="reveal mt-3 font-display text-3xl font-bold text-brand-950">
                {cat.name}
              </h2>
              <p className="reveal mt-4 text-[15px] leading-relaxed text-brand-800/90">
                {cat.description}
              </p>

              <ul className="reveal mt-7 space-y-4">
                {cat.varieties.map((v) => (
                  <li key={v.name} className="flex gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-leaf-500" />
                    <div>
                      <p className="text-sm font-semibold text-brand-950">
                        {v.name}
                      </p>
                      <p className="text-sm text-brand-700/80">{v.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="reveal mt-7 flex items-start gap-3 rounded-2xl bg-sand p-4">
                <Package className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <p className="text-sm text-brand-800">
                  <span className="font-semibold">Packing: </span>
                  {cat.packaging}
                </p>
              </div>

              <div className="reveal mt-8 flex flex-wrap gap-4">
                <a
                  href={
                    `https://wa.me/${SITE.whatsappNumber}?text=` +
                    encodeURIComponent(
                      `Hello Global TradeWave, I would like a quote for ${cat.name}.`,
                    )
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.04]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Quote for {cat.name}
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-brand-950"
                >
                  Send Enquiry
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ── Sourcing note ────────────────────────────────── */}
      <section className="bg-brand-950 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="reveal font-display text-3xl font-bold text-cream">
            Need a product you don&rsquo;t see here?
          </h2>
          <p className="reveal mx-auto mt-4 max-w-xl text-brand-200">
            Our sourcing network covers most Indian agri-commodities and timber.
            Tell us your specification and target price — we will confirm
            availability within two working days.
          </p>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="reveal mt-8 inline-flex items-center gap-2 rounded-full bg-leaf-300 px-8 py-3.5 text-sm font-semibold text-brand-950 transition-transform hover:scale-[1.04]"
          >
            <MessageCircle className="h-4 w-4" />
            Ask on WhatsApp
          </a>
        </div>
      </section>
    </main>
  )
}
