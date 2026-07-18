import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Menu, X, MessageCircle } from 'lucide-react'
import { NAV_LINKS, SITE } from '../../data/site'
import logo from '../../assets/logo.jpg'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 shadow-[0_2px_24px_rgba(13,38,44,0.08)] backdrop-blur'
          : 'bg-cream/60 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Global TradeWave logo"
            className="h-12 w-12 rounded-full object-cover ring-1 ring-brand-100"
          />
          <div className="leading-tight">
            <span className="block font-display text-xl font-bold text-brand-900">
              Global TradeWave
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-brand-500">
              Premium Agri Exports
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-900 text-cream'
                    : 'text-brand-800 hover:bg-brand-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03]"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
        </nav>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-900 hover:bg-brand-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-brand-100 bg-cream px-4 pb-6 pt-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-base font-medium ${
                  isActive ? 'bg-brand-900 text-cream' : 'text-brand-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-base font-semibold text-white"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp Us
          </a>
        </nav>
      )}
    </header>
  )
}
