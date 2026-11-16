import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { works, type Work } from '../content'
import { EASE } from '../ease'
import { Arrow, Italic, PillLink } from './ui'
import Visual from './Visual'

gsap.registerPlugin(ScrollTrigger)

const rotations = [-4, 3, -2, 5, -5, 2]

export default function Works() {
  const section = useRef<HTMLElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const colA = useRef<HTMLDivElement>(null)
  const colB = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<Work | null>(null)

  useLayoutEffect(() => {
    if (!section.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Pin + parallax hanya di desktop. Di HP kartu tersusun biasa supaya tidak menimpa judul.
    const mm = gsap.matchMedia(section)
    mm.add('(min-width: 768px)', () => {
      ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: content.current,
        pinSpacing: false,
      })
      if (reduced) return
      const st = { trigger: section.current, start: 'top bottom', end: 'bottom top', scrub: true }
      gsap.fromTo(colA.current, { y: 120 }, { y: -200, ease: 'none', scrollTrigger: st })
      gsap.fromTo(colB.current, { y: 360 }, { y: -480, ease: 'none', scrollTrigger: st })
      gsap.utils.toArray<HTMLElement>('.work-card-desktop').forEach((el, i) => {
        gsap.fromTo(
          el,
          { rotate: rotations[i] },
          { rotate: -rotations[i] / 2, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    })
    return () => mm.revert()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const left = works.filter((_, i) => i % 2 === 0)
  const right = works.filter((_, i) => i % 2 === 1)

  const Card = ({ w, className = '' }: { w: Work; className?: string }) => (
    <button
      type="button"
      onClick={() => setOpen(w)}
      className={`group pointer-events-auto relative isolate block w-full cursor-zoom-in overflow-hidden rounded-3xl border border-white/10 bg-surface text-left shadow-2xl shadow-black/70 transition-[border-color,box-shadow] duration-500 hover:border-white/30 hover:shadow-white/5 ${className}`}
      aria-label={`Lihat detail ${w.title}`}
    >
      <Visual variant={w.variant} seed={w.id} />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black from-30% via-black/85 to-transparent p-5 pt-24 md:p-7 md:pt-28">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted md:text-xs">
            {w.kategori} · {w.bidang}
          </p>
          <p className="mt-2 font-display text-3xl italic leading-none text-text-primary md:text-4xl">{w.title}</p>
        </div>
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-text-primary backdrop-blur-md transition-all duration-300 group-hover:border-transparent group-hover:bg-white group-hover:text-black md:h-12 md:w-12"
        >
          <Arrow />
        </span>
      </div>
    </button>
  )

  return (
    <section id="karya" ref={section} className="relative bg-bg py-16 md:min-h-[320vh] md:py-0">
      <div ref={content} className="relative z-10 flex flex-col items-center justify-center px-6 text-center md:h-screen">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">Karya</span>
          <span className="h-px w-8 bg-stroke" />
        </div>
        <h2 className="text-5xl font-light tracking-tight md:text-7xl lg:text-8xl">
          Portofolio <Italic>pilihan</Italic>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm text-muted md:text-base">
          Contoh proyek dari berbagai bidang usaha. Klik kartu untuk lihat detailnya.
        </p>
        <PillLink href="#kontak" variant="ghost" className="mt-8">
          Diskusikan proyekmu <Arrow />
        </PillLink>
      </div>

      {/* HP: daftar kartu biasa di bawah judul */}
      <div className="mt-12 flex flex-col gap-5 px-6 md:hidden">
        {works.map((w, i) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.06 }}
          >
            <Card w={w} className="aspect-[4/3]" />
          </motion.div>
        ))}
      </div>

      {/* Desktop: dua kolom parallax melewati judul yang di-pin */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden md:block">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-24 px-10 pt-[90vh] lg:gap-40">
          <div ref={colA} className="flex flex-col items-start gap-[34vh]">
            {left.map((w) => (
              <Card key={w.id} w={w} className="work-card-desktop aspect-[4/5] max-w-[min(30vw,460px)]" />
            ))}
          </div>
          <div ref={colB} className="flex flex-col items-end gap-[34vh] pt-[28vh]">
            {right.map((w) => (
              <Card key={w.id} w={w} className="work-card-desktop aspect-[4/5] max-w-[min(30vw,460px)]" />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-stroke bg-surface md:grid-cols-[1.3fr_1fr]"
            >
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px]">
                <Visual variant={open.variant} seed={open.id} />
              </div>
              <div className="flex flex-col p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-muted">
                  {open.kategori} · {open.bidang} · {open.tahun}
                </p>
                <h3 className="mt-3 font-display text-4xl italic">{open.title}</h3>
                <p className="mt-4 text-sm text-muted">{open.desc}</p>
                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  <PillLink href="#kontak" variant="solid" onClick={() => setOpen(null)}>
                    Mau yang serupa <Arrow />
                  </PillLink>
                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    className="cursor-pointer rounded-full border border-stroke px-6 py-3 text-sm text-muted hover:text-text-primary"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
