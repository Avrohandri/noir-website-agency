import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { works, type Work } from '../content'
import { EASE } from '../ease'
import { Arrow, Container, Italic, PillLink, SectionHeader } from './ui'
import WorkCreative from './WorkCreative'

// Ring 3D: kartu ditempel di silinder dengan kamera tepat di pusatnya,
// jadi tiap kartu menghadap kamera dan kartu di tepi tampak lebih besar.
// Geometri dalam piksel desain di kanvas 1172 px, lalu kanvas di-scale ke layar.
const W = 1172 // lebar kanvas desain
const H = 400 // tinggi kanvas desain
const R = 891 // jari-jari silinder = jarak perspektif (kamera di pusat)
const N = 37 // jumlah kartu di ring, berulang dari 10 desain
const STEP = 360 / N
const CULL = 42 // kartu di luar +-42 derajat disembunyikan
const SPEED = 3.2 // derajat per detik
const CARD_Y = 196 // pusat vertikal kartu
const HORIZON = CARD_Y + 302 // titik mata di bawah kartu: tepi atas kartu tampak miring

export default function Works() {
  const stage = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLButtonElement | null)[]>([])
  const [k, setK] = useState(1)
  const [open, setOpen] = useState<Work | null>(null)
  const drag = useRef({ down: false, x: 0, moved: 0 })

  // Skala kanvas mengikuti lebar layar. Di HP kartu tetap besar dan ring terpotong di sisi.
  useEffect(() => {
    const fit = () => setK(Math.min(1.35, Math.max(0.92, window.innerWidth / W)))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let phase = -2
    let speed = SPEED
    let target = SPEED
    let last = performance.now()
    let raf = 0
    let visible = false

    const place = () => {
      for (let i = 0; i < N; i++) {
        const el = cards.current[i]
        if (!el) continue
        const a = ((((i * STEP + phase) % 360) + 540) % 360) - 180
        if (Math.abs(a) > CULL) {
          el.style.visibility = 'hidden'
          continue
        }
        el.style.visibility = 'visible'
        const r = (a * Math.PI) / 180
        const c = Math.cos(r)
        el.style.transform = `translate3d(${R * Math.sin(r)}px,0,${R * (1 - c)}px) rotateY(${-a}deg)`
        el.style.filter = `brightness(${(0.78 + 0.5 * (1 / c - 1)).toFixed(3)})`
      }
    }

    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.1)
      last = t
      speed += (target - speed) * Math.min(1, dt * 4)
      if (!reduced && !drag.current.down) phase -= speed * dt
      place()
      if (visible) raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    })
    if (stage.current) io.observe(stage.current)
    place()

    const el = stage.current!
    const onEnter = () => (target = SPEED * 0.25)
    const onLeave = () => (target = SPEED)
    const onDown = (e: PointerEvent) => {
      drag.current = { down: true, x: e.clientX, moved: 0 }
    }
    const onMove = (e: PointerEvent) => {
      if (!drag.current.down) return
      const dx = e.clientX - drag.current.x
      drag.current.x = e.clientX
      drag.current.moved += Math.abs(dx)
      phase += dx * 0.07
      if (!visible) place()
    }
    const onUp = () => {
      drag.current.down = false
    }
    const onVis = () => (last = performance.now())
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('visibilitychange', onVis)
    }
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

  const onCardClick = (w: Work) => {
    // Abaikan klik yang sebenarnya akhir dari gerakan drag
    if (drag.current.moved > 6) return
    setOpen(w)
  }

  return (
    <section id="karya" className="relative overflow-hidden bg-bg pt-16 pb-8 md:pt-24 md:pb-12">
      <Container>
        <SectionHeader
          eyebrow="Karya"
          align="center"
          title={
            <>
              Portofolio <Italic>pilihan</Italic>
            </>
          }
          sub="Contoh proyek dari berbagai bidang usaha. Geser atau klik kartu untuk lihat detailnya."
        />
        <div className="-mt-4 flex justify-center md:-mt-6">
          <PillLink href="#kontak" variant="ghost">
            Diskusikan proyekmu <Arrow />
          </PillLink>
        </div>
      </Container>

      <motion.div
        ref={stage}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: EASE }}
        className="relative mt-4 cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing md:mt-2"
        style={{ height: H * k }}
      >
        {/* Cahaya lantai tipis di bawah ring */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
          style={{ background: 'radial-gradient(50% 60% at 50% 100%, rgba(255,255,255,0.06), transparent 70%)' }}
        />
        <div
          className="absolute top-0 left-1/2"
          style={{ width: W, height: H, transform: `translateX(-50%) scale(${k})`, transformOrigin: '50% 0' }}
        >
          <div
            className="absolute inset-0"
            style={{ perspective: `${R}px`, perspectiveOrigin: `${W / 2}px ${HORIZON}px`, transformStyle: 'preserve-3d' }}
          >
            {Array.from({ length: N }).map((_, i) => {
              const w = works[i % works.length]
              const unique = i < works.length
              return (
                <button
                  key={i}
                  ref={(el) => {
                    cards.current[i] = el
                  }}
                  type="button"
                  onClick={() => onCardClick(w)}
                  tabIndex={unique ? 0 : -1}
                  aria-hidden={unique ? undefined : true}
                  aria-label={`Lihat detail ${w.title}`}
                  className="group absolute cursor-pointer overflow-hidden rounded-xl bg-surface text-left will-change-transform [backface-visibility:hidden]"
                  style={{
                    left: W / 2,
                    top: CARD_Y,
                    width: 130,
                    height: 300,
                    margin: '-150px 0 0 -65px',
                    visibility: 'hidden',
                    boxShadow: '0 24px 46px rgba(0,0,0,.6), 0 3px 8px rgba(0,0,0,.5)',
                  }}
                >
                  <WorkCreative work={w} />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-xl transition-shadow duration-300 group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,.5)]"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.14), inset 0 16px 30px rgba(255,255,255,.05)' }}
                  />
                </button>
              )
            })}
          </div>
        </div>
        {/* Fade ke background di kiri, kanan, dan bawah */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[12vw] bg-gradient-to-r from-bg to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[12vw] bg-gradient-to-l from-bg to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent" />
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md md:p-10"
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
              className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-3xl border border-stroke bg-surface p-5 sm:flex-row sm:items-stretch md:gap-8 md:p-8"
            >
              {/* Kartu diperbesar 1.5x */}
              <div className="relative shrink-0 overflow-hidden rounded-2xl shadow-2xl shadow-black/60" style={{ width: 195, height: 450 }}>
                <div style={{ width: 130, height: 300, transform: 'scale(1.5)', transformOrigin: '0 0', position: 'relative' }}>
                  <WorkCreative work={open} />
                </div>
              </div>
              <div className="flex flex-col self-stretch">
                <p className="text-xs uppercase tracking-[0.25em] text-muted">
                  {open.kategori} · {open.bidang} · {open.tahun}
                </p>
                <h3 className="mt-3 font-display text-4xl italic md:text-5xl">{open.title}</h3>
                <span className="mt-4 h-px w-12" style={{ background: open.accent }} />
                <p className="mt-4 text-sm text-muted md:text-base">{open.desc}</p>
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
