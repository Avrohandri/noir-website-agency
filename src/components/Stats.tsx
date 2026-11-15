import { animate, motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { stats } from '../content'
import { EASE } from '../ease'
import { Container } from './ui'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.8, ease: EASE, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      <span className="text-muted">{suffix}</span>
    </span>
  )
}

export default function Stats() {
  return (
    <section aria-label="Statistik" className="bg-bg py-16 md:py-24">
      <Container>
        <div className="grid grid-cols-1 border-y border-stroke md:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
              className={`flex flex-col items-center gap-2 py-10 text-center md:py-14 ${i > 0 ? 'border-t border-stroke md:border-t-0 md:border-l' : ''}`}
            >
              <span className="font-display text-6xl italic text-text-primary md:text-7xl">
                <Counter value={s.value} suffix={s.suffix} />
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-muted">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
