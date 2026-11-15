import { useEffect, useRef } from 'react'
import { createNebula } from '../gl/nebula'

type Props = { flip?: boolean; className?: string }

// Canvas nebula. Berhenti render saat keluar layar dan diam untuk pengguna reduced motion.
export default function NebulaCanvas({ flip, className = '' }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.innerWidth < 768
    const nebula = createNebula(canvas, { flip, animate: !reduced, scale: small ? 0.4 : 0.5 })
    if (!nebula) return
    const io = new IntersectionObserver(([e]) => nebula.setActive(e.isIntersecting && !document.hidden))
    io.observe(canvas)
    const onVis = () => nebula.setActive(!document.hidden && canvas.getBoundingClientRect().bottom > 0)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      nebula.destroy()
    }
  }, [flip])

  return (
    <div className={`absolute inset-0 overflow-hidden bg-bg ${className}`}>
      {/* Fallback gradient kalau WebGL tidak tersedia */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 40% at 55% 45%, rgba(255,255,255,0.14), transparent 70%), radial-gradient(40% 30% at 30% 65%, rgba(255,255,255,0.08), transparent 70%)',
        }}
      />
      <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />
    </div>
  )
}
