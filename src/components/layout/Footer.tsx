import { Link } from 'react-router'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { NAV_LINKS, SITE } from '../../data/site'
import logo from '../../assets/logo.jpg'

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Global TradeWave logo"
              className="h-12 w-12 rounded-full bg-white object-cover"
            />
            <span className="font-display text-xl font-bold text-cream">
              Global TradeWave
            </span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-brand-200">
            Your trusted partner in international trade — premium Indian
            agricultural products and responsibly sourced timber, delivered
            worldwide with complete export documentation.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-cream">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-brand-200 transition-colors hover:text-leaf-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-cream">
            Our Business
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-brand-200">
            <li>
              <Link to="/products" className="transition-colors hover:text-leaf-200">
                Import-Export — Rice, Cashew, Spices, Pulses, Teak
              </Link>
            </li>
            <li>
              <Link to="/fresh-produce" className="transition-colors hover:text-leaf-200">
                Fresh Produce — Fruits &amp; Vegetables, Home Delivery (COD)
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-cream">
            Contact
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-3 text-brand-200 transition-colors hover:text-leaf-200"
              >
                <Phone className="h-4 w-4 shrink-0 text-leaf-300" />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 text-brand-200 transition-colors hover:text-leaf-200"
              >
                <Mail className="h-4 w-4 shrink-0 text-leaf-300" />
                {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-brand-200">
              <MapPin className="h-4 w-4 shrink-0 text-leaf-300" />
              {SITE.address}
            </li>
            <li>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-brand-300 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.legalName} All rights reserved.
          </p>
          <p>{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
