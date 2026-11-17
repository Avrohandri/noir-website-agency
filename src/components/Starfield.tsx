import { useEffect, useRef } from 'react'

// Latar bintang kecil untuk semua section setelah hero, termasuk footer.
// Canvas fixed di belakang konten, redup supaya teks tetap terbaca.
// Sebagian bintang berkelip pelan. Reduced motion: bintang diam.
type Star = { x: number; y: number; r: number; a: number; spark: boolean; tw: number; ph: number; sp: number }

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
      const count = Math.round((w * h) / 4200)
      stars = Array.from({ length: count }, () => {
        const roll = Math.random()
        // spark: bintang terang yang berkelip jelas, dengan halo dan kilau silang saat puncak
        const spark = roll < 0.07
        const big = roll < 0.16
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: spark ? 1.1 + Math.random() * 0.6 : big ? 0.9 + Math.random() * 0.4 : 0.4 + Math.random() * 0.45,
          a: spark ? 1 : big ? 0.55 + Math.random() * 0.25 : 0.2 + Math.random() * 0.32,
          spark,
          tw: spark ? 1 : Math.random() < 0.4 ? 0.4 + Math.random() * 0.4 : 0,
          ph: Math.random() * Math.PI * 2,
          sp: spark ? 0.6 + Math.random() * 1.1 : 0.4 + Math.random() * 0.9,
        }
      })
    }

    const draw = (t: number) => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#eef1f8'
      ctx.strokeStyle = '#eef1f8'
      const s = t / 1000
      for (const st of stars) {
        const wave = 0.5 + 0.5 * Math.sin(s * st.sp + st.ph)
        if (st.spark) {
          // Kelip tajam: lama redup, sebentar menyala terang
          const k = reduced ? 0.7 : 0.12 + 0.88 * Math.pow(wave, 3)
          ctx.globalAlpha = 0.16 * k
          ctx.beginPath()
          ctx.arc(st.x, st.y, st.r * 4.5, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = k
          ctx.beginPath()
          ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2)
          ctx.fill()
          if (k > 0.55) {
            const len = st.r * 7 * k
            ctx.globalAlpha = (k - 0.55) * 1.1
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(st.x - len, st.y)
            ctx.lineTo(st.x + len, st.y)
            ctx.moveTo(st.x, st.y - len)
            ctx.lineTo(st.x, st.y + len)
            ctx.stroke()
          }
          continue
        }
        const k = st.tw && !reduced ? 1 - st.tw * wave : 1
        ctx.globalAlpha = st.a * k
        ctx.beginPath()
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Kelip cukup 30 fps
    const loop = (t: number) => {
      if (t - last > 33) {
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
