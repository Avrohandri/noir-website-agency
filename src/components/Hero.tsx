import gsap from 'gsap'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { hero } from '../content'
import GalaxyCanvas from './GalaxyCanvas'
import { PillLink } from './ui'

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % hero.roles.length), 2000)
    return () => clearInterval(id)
  }, [])

  useLayoutEffect(() => {
    if (!ready || !root.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.name-reveal', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }).fromTo(
        '.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 },
        0.3,
      )
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section id="beranda" ref={root} className="relative flex min-h-svh items-center justify-center overflow-hidden">
      <GalaxyCanvas />
      <div className="absolute inset-0 bg-black/20" />
      {/* Scrim lembut di belakang teks supaya tetap terbaca di atas lengan galaksi */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(38% 32% at 50% 48%, rgba(10,10,10,0.6), transparent 100%)' }}
      />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 flex flex-col items-center px-6 pt-24 pb-28 text-center">
        <p className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted opacity-0">{hero.eyebrow}</p>

        <h1 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary opacity-0 md:text-8xl lg:text-9xl">
          {hero.titleA} {hero.titleB}
        </h1>

        <p className="blur-in mb-4 text-base text-text-primary/80 opacity-0 md:text-lg">
          {hero.rolePrefix}{' '}
          <span key={roleIndex} className="inline-block animate-role-fade-in font-display text-[1.15em] italic text-text-primary">
            {hero.roles[roleIndex]}
          </span>{' '}
          {hero.roleSuffix}
        </p>

        <p className="blur-in mb-12 max-w-md text-sm text-muted opacity-0 md:text-base">{hero.description}</p>

        <div className="blur-in inline-flex flex-wrap justify-center gap-4 opacity-0">
          <PillLink href={hero.ctaPrimary.href} variant="solid">
            {hero.ctaPrimary.label}
          </PillLink>
          <PillLink href={hero.ctaSecondary.href} variant="outline">
            {hero.ctaSecondary.label}...
          </PillLink>
        </div>
      </div>

      <a
        href="#layanan"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-stroke">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-down bg-text-primary" />
        </span>
      </a>
    </section>
  )
}
