import { useEffect, useRef } from 'react'
import { createGalaxy } from '../gl/galaxy'

type Props = { flip?: boolean; className?: string }

// Canvas galaksi. Berhenti render saat keluar layar dan diam untuk pengguna reduced motion.
export default function GalaxyCanvas({ flip, className = '' }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const galaxy = createGalaxy(canvas, { flip, animate: !reduced })
    if (!galaxy) return
    let visible = false
    const sync = () => galaxy.setActive(visible && !document.hidden)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      sync()
    })
    io.observe(canvas)
    document.addEventListener('visibilitychange', sync)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
      galaxy.destroy()
    }
  }, [flip])

  return (
    <div className={`absolute inset-0 overflow-hidden bg-bg ${className}`}>
      {/* Fallback kalau WebGL tidak tersedia */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 22% at 50% 55%, rgba(255,255,255,0.16), transparent 70%), radial-gradient(12% 8% at 50% 55%, rgba(255,255,255,0.25), transparent 70%)',
        }}
      />
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
    </div>
  )
}
