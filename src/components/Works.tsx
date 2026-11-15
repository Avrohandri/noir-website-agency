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
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: content.current,
        pinSpacing: false,
      })
      if (reduced) return
      const st = { trigger: section.current, start: 'top bottom', end: 'bottom top', scrub: true }
      gsap.fromTo(colA.current, { y: 120 }, { y: -160, ease: 'none', scrollTrigger: st })
      gsap.fromTo(colB.current, { y: 320 }, { y: -420, ease: 'none', scrollTrigger: st })
      gsap.utils.toArray<HTMLElement>('.work-card').forEach((el, i) => {
        gsap.fromTo(
          el,
          { rotate: rotations[i] },
          { rotate: -rotations[i] / 2, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
        )
      })
    }, section)
    return () => ctx.revert()
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

  const Card = ({ w }: { w: Work }) => (
    <button
      type="button"
      onClick={() => setOpen(w)}
      className="work-card group pointer-events-auto relative block aspect-square w-full max-w-[320px] cursor-zoom-in overflow-hidden rounded-3xl border border-stroke bg-surface text-left shadow-2xl shadow-black/50"
      aria-label={`Lihat detail ${w.title}`}
    >
      <Visual variant={w.variant} seed={w.id} compact />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-12 md:p-5">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted md:text-xs">{w.kategori}</p>
        <p className="mt-1 font-display text-lg italic text-text-primary md:text-2xl">{w.title}</p>
      </div>
    </button>
  )

  return (
    <section id="karya" ref={section} className="relative min-h-[300vh] bg-bg">
      <div ref={content} className="relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center">
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

      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-12 px-6 pt-[85vh] md:gap-40 md:px-10">
          <div ref={colA} className="flex flex-col items-start gap-[38vh]">
            {left.map((w) => (
              <Card key={w.id} w={w} />
            ))}
          </div>
          <div ref={colB} className="flex flex-col items-end gap-[38vh] pt-[30vh]">
            {right.map((w) => (
              <Card key={w.id} w={w} />
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
