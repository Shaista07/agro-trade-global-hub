import { Link } from 'react-router'
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Globe2,
  Truck,
  Handshake,
  Sprout,
  ClipboardCheck,
  PackageCheck,
  Ship,
  Quote,
} from 'lucide-react'
import { SITE, STATS } from '../data/site'
import { PRODUCT_CATEGORIES } from '../data/products'
import SectionHeading from '../components/SectionHeading'
import { useReveal } from '../hooks/useReveal'
import heroImg from '../assets/hero.jpg'
import farmersImg from '../assets/farmers.jpg'
import produceImg from '../assets/produce.jpg'
import spicesImg from '../assets/spices.jpg'

const PROCESS_STEPS = [
  {
    icon: Sprout,
    title: 'Source',
    text: 'Direct procurement from 500+ farmer partners and certified suppliers across India.',
  },
  {
    icon: ClipboardCheck,
    title: 'Quality Check',
    text: 'Grading, moisture control and lab testing against international buyer specifications.',
  },
  {
    icon: PackageCheck,
    title: 'Pack & Document',
    text: 'Export-grade packing with phytosanitary, origin and customs documentation handled end-to-end.',
  },
  {
    icon: Ship,
    title: 'Ship & Deliver',
    text: 'FOB, CIF or EXW — reliable sea and air freight to 10+ countries, tracked until delivery.',
  },
]

const WHY_US = [
  {
    icon: ShieldCheck,
    title: 'Quality You Can Verify',
    text: 'Every consignment is graded and tested against agreed specifications — pre-shipment inspection reports shared before dispatch.',
  },
  {
    icon: Globe2,
    title: 'A Growing Global Network',
    text: 'Buyers across the Gulf, South-East Asia, Africa and Europe rely on us for consistent supply, season after season.',
  },
  {
    icon: Truck,
    title: 'Logistics Without Surprises',
    text: 'From farm gate to destination port, one accountable partner manages packing, documentation, freight and tracking.',
  },
  {
    icon: Handshake,
    title: 'Farmer-Direct Pricing',
    text: 'Buying directly from farmer partners removes middlemen — better realisations for growers, sharper prices for you.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      'Global TradeWave has supplied our basmati programme for two seasons. Grain quality has been consistent across every container, and documentation is always in order before the vessel sails.',
    name: 'Procurement Head',
    role: 'Food Trading Company, Dubai, UAE',
  },
  {
    quote:
      'Their raw cashew lots arrive well-calibrated and properly dried — our processing outturn improved noticeably after switching to TradeWave as our primary supplier.',
    name: 'Managing Director',
    role: 'Nut Processing Firm, Ho Chi Minh City, Vietnam',
  },
  {
    quote:
      'What sets them apart is communication. One team answers for sourcing, quality and freight, and they flag issues before they become problems. A dependable partner for Indian agri imports.',
    name: 'Import Manager',
    role: 'Wholesale Distributor, London, UK',
  },
]

export default function Home() {
  useReveal()

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Premium Indian basmati rice and spices ready for export at a container port"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/70 to-brand-950/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-leaf-200 ring-1 ring-cream/20 backdrop-blur">
              {SITE.legalName}
            </p>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
              From India&rsquo;s Farms to the{' '}
              <span className="italic text-leaf-200">World&rsquo;s Markets</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100">
              Two businesses, one promise of quality: premium agri exports to
              10+ countries — and farm-fresh fruits &amp; vegetables delivered to
              homes and businesses across Uttar Pradesh.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-leaf-300 px-7 py-3.5 text-sm font-semibold text-brand-950 shadow-lg transition-transform hover:scale-[1.04]"
              >
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.04]"
              >
                <MessageCircle className="h-4 w-4" />
                Get a Quote on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="relative z-10 -mt-16 px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-3xl bg-brand-100 shadow-[0_20px_60px_rgba(13,38,44,0.15)] lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-cream px-6 py-8 text-center">
              <p className="font-display text-4xl font-bold text-brand-900">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Two verticals ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Two Verticals, One Standard"
          title="Choose how you want to work with us"
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* International */}
          <Link
            to="/products"
            className="reveal group relative overflow-hidden rounded-[2rem] shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(13,38,44,0.2)]"
          >
            <img
              src={spicesImg}
              alt="Indian spices and commodities prepared for export"
              className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-96"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-leaf-300">
                Vertical 01 — Global
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-cream sm:text-3xl">
                International Import-Export
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-100">
                Rice, cashews, spices, pulses and teak wood — export-grade
                quality with complete documentation, shipped to 10+ countries.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-leaf-300 px-5 py-2.5 text-sm font-semibold text-brand-950">
                Explore Export Products
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* Domestic */}
          <Link
            to="/fresh-produce"
            className="reveal group relative overflow-hidden rounded-[2rem] shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(13,38,44,0.2)]"
          >
            <img
              src={produceImg}
              alt="Fresh Indian fruits and vegetables in harvest crates"
              className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-96"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/45 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-leaf-300">
                Vertical 02 — Domestic
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-cream sm:text-3xl">
                Fresh Produce — Ghar Tak
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-brand-100">
                Taazi sabziyan aur phal, delivered to your doorstep. B2C home
                delivery &amp; B2B supply — order on WhatsApp, pay cash on
                delivery.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white">
                Order Fresh — COD
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── About teaser ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="reveal relative">
            <img
              src={farmersImg}
              alt="Indian farmers inspecting a paddy field at golden hour"
              className="w-full rounded-3xl object-cover shadow-[0_24px_60px_rgba(13,38,44,0.18)]"
            />
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-brand-950 px-6 py-5 text-cream shadow-xl sm:-right-6">
              <p className="font-display text-2xl font-bold text-leaf-200">500+</p>
              <p className="text-xs font-medium uppercase tracking-wider text-brand-200">
                Farmer partners in UP
              </p>
            </div>
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="An export house built on farmer trust"
              subtitle="Global TradeWave began in Ayodhya, Uttar Pradesh, with a simple conviction: Indian farms grow some of the world's finest produce, and global buyers deserve a partner who delivers it without compromise."
            />
            <div className="reveal mt-8 space-y-4 text-[15px] leading-relaxed text-brand-800/90">
              <p>
                Today we manage the complete journey — sourcing from our farmer
                network, grading and testing every lot, handling export
                documentation, and shipping to buyers in more than ten countries.
              </p>
              <p>
                Because we buy farmer-direct and manage logistics ourselves, our
                partners abroad get honest pricing and one accountable point of
                contact from purchase order to port of discharge.
              </p>
            </div>
            <Link
              to="/about"
              className="reveal mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900"
            >
              Read our story
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────── */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="International Import-Export"
            title="Five export categories. One standard: export quality."
            subtitle="Every product line is sourced at origin, graded to buyer specification, and shipped with complete documentation. (Fresh produce? That's our domestic vertical — delivered ghar tak.)"
          />
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/products#${cat.id}`}
                className="reveal group overflow-hidden rounded-3xl bg-cream shadow-sm ring-1 ring-brand-100 transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(13,38,44,0.14)]"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-brand-950">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-700/80">
                    {cat.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-900">
                    View varieties
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────── */}
      <section className="bg-brand-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="How We Work"
            title="Farm gate to your port, in four steps"
            subtitle="A single accountable team manages the entire chain — so you never chase suppliers, agents and freight forwarders separately."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="reveal relative rounded-3xl bg-brand-900/60 p-7 ring-1 ring-brand-800"
              >
                <span className="absolute right-6 top-6 font-display text-4xl font-bold text-brand-800">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf-300/15 text-leaf-200">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-cream">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-200">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Global TradeWave"
          title="Built for buyers who can't afford surprises"
        />
        <div className="mt-14 grid gap-7 sm:grid-cols-2">
          {WHY_US.map((item) => (
            <div
              key={item.title}
              className="reveal flex gap-5 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-100"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-900 text-leaf-200">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-brand-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-700/80">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="bg-sand py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Buyer Feedback"
            title="Trusted by importers across three continents"
          />
          <div className="mt-14 grid gap-7 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.role}
                className="reveal flex flex-col rounded-3xl bg-cream p-8 shadow-sm ring-1 ring-brand-100"
              >
                <Quote className="h-8 w-8 text-leaf-400" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-brand-800">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-brand-100 pt-4">
                  <p className="text-sm font-semibold text-brand-950">{t.name}</p>
                  <p className="text-xs text-brand-500">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="reveal relative overflow-hidden rounded-[2.5rem] bg-brand-950 px-8 py-16 text-center sm:px-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${heroImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-cream sm:text-4xl">
              Ready to source from India without the risk?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-200">
              Share your requirement — product, grade, quantity and destination —
              and receive a detailed quotation within one working day.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.04]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Your Requirement
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-8 py-3.5 text-sm font-semibold text-cream ring-1 ring-cream/30 backdrop-blur transition-colors hover:bg-cream/20"
              >
                Send an Enquiry
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
