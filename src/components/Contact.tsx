import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'
import { brand, contact } from '../content'
import NebulaCanvas from './NebulaCanvas'
import { Arrow, Italic, PillLink } from './ui'

export default function Contact() {
  const track = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.to(track.current, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 })
    })
    return () => ctx.revert()
  }, [])

  const text = Array.from({ length: 10 }, () => `${contact.marquee} • `).join('')

  return (
    <footer id="kontak" className="relative overflow-hidden bg-bg pt-16 pb-8 md:pt-20 md:pb-12">
      <NebulaCanvas flip />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-bg to-transparent" />

      <div className="relative z-10">
        <div className="overflow-hidden whitespace-nowrap py-4" aria-hidden>
          <div ref={track} className="inline-block font-display text-6xl italic text-text-primary/15 md:text-8xl lg:text-9xl">
            {text}
            {text}
          </div>
        </div>

        <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 pt-16 pb-24 text-center md:px-10 md:pt-24 md:pb-32">
          <h2 className="text-5xl font-light tracking-tight md:text-7xl lg:text-8xl">
            {contact.titleA} <Italic>{contact.titleB}</Italic>
          </h2>
          <p className="mt-5 max-w-md text-sm text-muted md:text-base">{contact.sub}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <PillLink href={`mailto:${contact.email}`} variant="solid">
              {contact.email} <Arrow />
            </PillLink>
            <PillLink href={contact.phoneHref} variant="outline">
              {contact.phoneLabel}
            </PillLink>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 border-t border-white/10 px-6 pt-8 md:flex-row md:justify-between md:px-10">
          <ul className="flex flex-wrap justify-center gap-6">
            {contact.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="text-sm text-muted transition-colors hover:text-text-primary">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6 text-sm text-muted">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {contact.status}
            </span>
            <span>© 2026 {brand.full}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
