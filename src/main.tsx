import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// HashRouter keeps every route working on any static host (no server rewrite
// rules needed) — direct links and refreshes never 404. The repo also ships
// _redirects / vercel.json if you later move to Netlify/Vercel and want clean URLs.
import { HashRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)

// PWA: register the service worker in production so the shop is installable
// ("Add to Home Screen") and keeps working on flaky connections.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}
