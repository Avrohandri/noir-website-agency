import { useEffect, useState } from 'react'
import { brand, nav } from '../content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>(nav[0].id)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = [...nav.map((n) => n.id), 'kontak'].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <nav
        aria-label="Navigasi utama"
        className={`inline-flex items-center rounded-full border border-white/10 bg-surface/80 px-2 py-2 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? 'shadow-md shadow-black/10' : ''
        }`}
      >
        <a href="#beranda" aria-label={`${brand.full}, ke atas`} className="group relative mr-1 h-9 w-9 shrink-0 transition-transform duration-300 hover:scale-110">
          <span className="accent-gradient absolute inset-0 rounded-full transition-transform duration-500 group-hover:rotate-180" />
          <span className="absolute inset-[1.5px] flex items-center justify-center rounded-full bg-bg font-display text-[15px] italic">
            {brand.monogram}
          </span>
        </a>

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {nav.map((item) => {
          const isActive = active === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? 'true' : undefined}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                isActive ? 'bg-stroke/50 text-text-primary' : 'text-muted hover:bg-stroke/50 hover:text-text-primary'
              } ${item.id === 'beranda' ? 'hidden sm:inline-block' : ''}`}
            >
              {item.label}
            </a>
          )
        })}

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        <a href="#kontak" className="group relative isolate ml-1 rounded-full text-xs sm:ml-0 sm:text-sm">
          <span aria-hidden className="ring-hover accent-gradient" />
          <span className="flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-text-primary backdrop-blur-md sm:px-4 sm:py-2">
            Hubungi <span aria-hidden>↗</span>
          </span>
        </a>
      </nav>
    </header>
  )
}
