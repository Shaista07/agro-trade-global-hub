import { useEffect } from 'react'

/**
 * Adds `.is-visible` to every `.reveal` element as it scrolls into view.
 * Call once per page. Uses a MutationObserver so elements mounted later
 * (e.g. sections that appear after an async data fetch) are picked up too.
 */
export function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document
        .querySelectorAll<HTMLElement>('.reveal')
        .forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    const seen = new WeakSet<HTMLElement>()
    const observeAll = (root: ParentNode) => {
      root
        .querySelectorAll<HTMLElement>('.reveal')
        .forEach((el) => {
          if (!seen.has(el)) {
            seen.add(el)
            io.observe(el)
          }
        })
    }

    observeAll(document)

    // Watch for late-mounted .reveal elements (async sections)
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return
          const el = node as HTMLElement
          if (el.classList?.contains('reveal') && !seen.has(el)) {
            seen.add(el)
            io.observe(el)
          }
          observeAll(el)
        })
      })
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}
