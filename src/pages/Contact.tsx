import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { SITE } from '../data/site'
import { PRODUCT_CATEGORIES } from '../data/products'
import SectionHeading from '../components/SectionHeading'
import { useReveal } from '../hooks/useReveal'

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  useReveal()
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputCls =
    'w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-brand-400 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100'

  return (
    <main>
      {/* ── Header ───────────────────────────────────────── */}
      <section className="bg-brand-950 pb-20 pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            align="left"
            eyebrow="Contact Us"
            title="Tell us what you need — we reply within one working day"
            subtitle="Share your product, grade, quantity and destination port. The more detail you give us, the sharper our quotation."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-5">
          {/* ── Contact channels ─────────────────────────── */}
          <div className="space-y-5 lg:col-span-2">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="reveal flex items-center gap-5 rounded-3xl bg-[#25D366] p-6 text-white shadow-sm transition-transform hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold">WhatsApp — fastest response</p>
                <p className="mt-0.5 text-sm text-white/85">{SITE.phone}</p>
              </div>
            </a>

            <a
              href={SITE.phoneHref}
              className="reveal flex items-center gap-5 rounded-3xl bg-white p-6 ring-1 ring-brand-100 transition-transform hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-900 text-leaf-200">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-950">Call Us</p>
                <p className="mt-0.5 text-sm text-brand-600">{SITE.phone}</p>
              </div>
            </a>

            <a
              href={`mailto:${SITE.email}`}
              className="reveal flex items-center gap-5 rounded-3xl bg-white p-6 ring-1 ring-brand-100 transition-transform hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-900 text-leaf-200">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-950">Email</p>
                <p className="mt-0.5 text-sm text-brand-600">{SITE.email}</p>
              </div>
            </a>

            <div className="reveal flex items-center gap-5 rounded-3xl bg-white p-6 ring-1 ring-brand-100">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-900 text-leaf-200">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-950">Head Office</p>
                <p className="mt-0.5 text-sm text-brand-600">{SITE.address}</p>
              </div>
            </div>

            <div className="reveal rounded-3xl bg-sand p-6">
              <p className="text-sm font-bold text-brand-950">Working Hours</p>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-700">
                Monday – Saturday, 9:30 AM – 6:30 PM IST.
                <br />
                WhatsApp messages are answered around the clock.
              </p>
            </div>
          </div>

          {/* ── Enquiry form ─────────────────────────────── */}
          <div className="reveal rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-100 lg:col-span-3">
            {status === 'sent' ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-14 w-14 text-[#25D366]" />
                <h3 className="mt-5 font-display text-2xl font-bold text-brand-950">
                  Enquiry sent — thank you!
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-brand-700">
                  Our team will get back to you within one working day. For an
                  immediate response, message us on{' '}
                  <a
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-brand-800 underline"
                  >
                    WhatsApp
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display text-2xl font-bold text-brand-950">
                  Send an Enquiry
                </h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-600">
                      Your Name *
                    </label>
                    <input id="name" name="name" required className={inputCls} placeholder="Full name" />
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-600">
                      Company
                    </label>
                    <input id="company" name="company" className={inputCls} placeholder="Company name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-600">
                      Email *
                    </label>
                    <input id="email" name="email" type="email" required className={inputCls} placeholder="you@company.com" />
                  </div>
                  <div>
                    <label htmlFor="country" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-600">
                      Country *
                    </label>
                    <input id="country" name="country" required className={inputCls} placeholder="Destination country" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="product" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-600">
                      Product of Interest *
                    </label>
                    <select id="product" name="product" required className={inputCls} defaultValue="">
                      <option value="" disabled>
                        Select a category
                      </option>
                      {PRODUCT_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name} (Export)
                        </option>
                      ))}
                      <option value="Fresh Produce (Domestic)">
                        Fresh Produce — Domestic B2B / Bulk
                      </option>
                      <option value="Other">Other / Sourcing Request</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-600">
                      Requirement Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className={inputCls}
                      placeholder="Grade / variety, quantity, packing preference, destination port, target timeline…"
                    />
                  </div>
                </div>

                {/* FormSubmit options */}
                <input type="hidden" name="_subject" value="New enquiry — globaltradewave.com" />
                <input type="hidden" name="_template" value="table" />
                <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

                {status === 'error' && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    Something went wrong. Please email us directly at{' '}
                    <a href={`mailto:${SITE.email}`} className="font-semibold underline">
                      {SITE.email}
                    </a>{' '}
                    or message us on WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-900 px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-brand-950 disabled:opacity-60 sm:w-auto"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Enquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
