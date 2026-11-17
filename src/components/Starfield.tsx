import { useEffect, useRef } from 'react'

// Latar bintang kecil untuk section di antara hero dan footer.
// Canvas fixed di belakang konten, redup supaya teks tetap terbaca.
// Sebagian bintang berkelip pelan. Reduced motion: bintang diam.
type Star = { x: number; y: number; r: number; a: number; tw: number; ph: number; sp: number }

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let stars: Star[] = []
    let raf = 0
    let last = 0

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round((w * h) / 5200)
      stars = Array.from({ length: count }, () => {
        const big = Math.random() < 0.06
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: big ? 0.9 + Math.random() * 0.5 : 0.35 + Math.random() * 0.45,
          a: big ? 0.45 + Math.random() * 0.2 : 0.12 + Math.random() * 0.28,
          tw: Math.random() < 0.35 ? 0.5 + Math.random() * 0.4 : 0,
          ph: Math.random() * Math.PI * 2,
          sp: 0.4 + Math.random() * 0.9,
        }
      })
    }

    const draw = (t: number) => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)
      const s = t / 1000
      for (const st of stars) {
        const k = st.tw && !reduced ? 1 - st.tw * (0.5 + 0.5 * Math.sin(s * st.sp + st.ph)) : 1
        ctx.globalAlpha = st.a * k
        ctx.fillStyle = '#e8ecf5'
        ctx.beginPath()
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Kelip pelan cukup 20 fps
    const loop = (t: number) => {
      if (t - last > 50) {
        last = t
        draw(t)
      }
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      if (reduced) draw(0)
      else if (!document.hidden) raf = requestAnimationFrame(loop)
    }

    const onResize = () => {
      build()
      draw(performance.now())
    }

    build()
    draw(0)
    start()
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', start)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', start)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}
