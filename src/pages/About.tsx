import { Link } from 'react-router'
import {
  ArrowRight,
  Sprout,
  ShieldCheck,
  Globe2,
  Handshake,
  Leaf,
  Scale,
  FileCheck,
  Users,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { STATS } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import farmersImg from '../assets/farmers.jpg'
import spicesImg from '../assets/spices.jpg'
import heroImg from '../assets/hero.jpg'

const VALUES = [
  {
    icon: Sprout,
    title: 'Farmer First',
    text: 'Fair, transparent pricing for our 500+ farmer partners — because sustainable supply starts with sustainable livelihoods.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Without Compromise',
    text: 'Grading, testing and inspection on every lot. If it doesn\u2019t meet the agreed specification, it doesn\u2019t ship.',
  },
  {
    icon: Handshake,
    title: 'One Accountable Partner',
    text: 'Sourcing, quality, documentation and freight under one roof — one team answers for your consignment end-to-end.',
  },
  {
    icon: Leaf,
    title: 'Responsible Sourcing',
    text: 'Promoting sustainable farming practices and legally documented timber across every category we trade.',
  },
]

const MILESTONES = [
  {
    icon: Users,
    title: '500+ Farmer Partners',
    text: 'Direct procurement relationships across Uttar Pradesh and neighbouring states, built on timely payments and fair grading.',
  },
  {
    icon: Globe2,
    title: '10+ Countries Served',
    text: 'Recurring buyers across the Gulf, South-East Asia, Africa and Europe — most of our business comes from repeat orders.',
  },
  {
    icon: Scale,
    title: '99.8% Client Satisfaction',
    text: 'Measured across delivered consignments — claims resolved quickly and transparently when they arise.',
  },
  {
    icon: FileCheck,
    title: 'Complete Documentation',
    text: 'IEC-backed exports with phytosanitary certificates, certificates of origin, fumigation and COA arranged as standard.',
  },
]

export default function About() {
  useReveal()

  return (
    <main>
      {/* ── Header ───────────────────────────────────────── */}
      <section className="bg-brand-950 pb-20 pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            align="left"
            eyebrow="About Global TradeWave"
            title="Rooted in Ayodhya. Trading with the world."
            subtitle="Global Agro TradeWave Pvt. Ltd. is an Indian export house connecting the farms of Uttar Pradesh to importers, processors and distributors worldwide."
          />
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Built one farmer, one buyer at a time"
            />
            <div className="reveal mt-8 space-y-4 text-[15px] leading-relaxed text-brand-800/90">
              <p>
                Global TradeWave was founded in Ayodhya with a frustration we kept
                hearing from both sides: farmers couldn&rsquo;t reach fair-paying
                buyers, and international importers couldn&rsquo;t find an Indian
                supplier they could truly rely on.
              </p>
              <p>
                We set out to be the bridge. Starting with rice and cashews from
                our home region, we built direct procurement relationships with
                farming communities, added grading and quality control at origin,
                and took charge of the entire export chain — documentation,
                freight and delivery.
              </p>
              <p>
                Today we run two verticals: an international arm exporting five
                product categories to more than ten countries, and a domestic
                fresh-produce arm delivering fruits and vegetables to homes and
                businesses across Uttar Pradesh. But the model hasn&rsquo;t
                changed: buy right at the farm gate, check quality obsessively,
                and stand behind everything we supply.
              </p>
            </div>
          </div>
          <div className="reveal relative">
            <img
              src={farmersImg}
              alt="Partner farmers in a green paddy field at golden hour"
              className="w-full rounded-3xl object-cover shadow-[0_24px_60px_rgba(13,38,44,0.18)]"
            />
          </div>
        </div>
      </section>

      {/* ── Stats band ───────────────────────────────────── */}
      <section className="bg-sand py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-4 text-center sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="reveal">
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

      {/* ── Values ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Stand For"
          title="Four principles behind every shipment"
        />
        <div className="mt-14 grid gap-7 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="reveal flex gap-5 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-100"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-900 text-leaf-200">
                <v.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-brand-950">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-700/80">
                  {v.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Milestones / proof ───────────────────────────── */}
      <section className="bg-brand-950 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="Proof, Not Promises"
            title="The numbers our buyers judge us by"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {MILESTONES.map((m) => (
              <div
                key={m.title}
                className="reveal rounded-3xl bg-brand-900/60 p-8 ring-1 ring-brand-800"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf-300/15 text-leaf-200">
                  <m.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-cream">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-200">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Supply chain strip ───────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="reveal order-2 lg:order-1">
            <img
              src={spicesImg}
              alt="Export-grade Indian spices prepared for shipment"
              className="w-full rounded-3xl object-cover shadow-[0_24px_60px_rgba(13,38,44,0.18)]"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Our Supply Chain"
              title="Meticulous at every step"
              subtitle="Quality is decided at origin, not at the port. Our supply chain begins with careful selection of raw material from trusted farmers and certified suppliers — and every step after that is designed to protect it."
            />
            <ul className="reveal mt-8 space-y-3 text-[15px] text-brand-800/90">
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-leaf-500" />
                Grading and moisture control before goods enter our warehouse
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-leaf-500" />
                Lab testing for purity, volatile oil and microbial safety where applicable
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-leaf-500" />
                Export-grade packing matched to destination climate and transit time
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-leaf-500" />
                Pre-shipment inspection reports shared with buyers before dispatch
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
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
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold text-cream sm:text-4xl">
              Let&rsquo;s build a supply relationship that lasts
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-200">
              Tell us what you buy, in what volume, and where it needs to land.
              We&rsquo;ll respond with availability and a quotation within one
              working day.
            </p>
            <Link
              to="/contact"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-leaf-300 px-8 py-3.5 text-sm font-semibold text-brand-950 transition-transform hover:scale-[1.04]"
            >
              Start the Conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
