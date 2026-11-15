import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { loading } from '../content'

const DURATION = 2700

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const total = reduced ? 600 : DURATION
    let raf = 0
    let timeout = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / total, 1)
      setCount(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else timeout = window.setTimeout(onComplete, 400)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeout)
    }
  }, [onComplete])

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % loading.words.length), 900)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col bg-bg px-6 py-6 md:px-10 md:py-8"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-label={`Memuat ${count} persen`}
    >
      <motion.span
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-xs uppercase tracking-[0.3em] text-muted"
      >
        {loading.label}
      </motion.span>

      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"
          >
            {loading.words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex justify-end">
        <span className="font-display text-6xl tabular-nums text-text-primary md:text-8xl lg:text-9xl">
          {String(count).padStart(3, '0')}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-stroke/50">
        <div
          className="accent-gradient h-full origin-left"
          style={{ transform: `scaleX(${count / 100})`, boxShadow: '0 0 8px rgba(245, 245, 245, 0.35)' }}
        />
      </div>
    </motion.div>
  )
}
