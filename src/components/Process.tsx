import { motion } from 'motion/react'
import { process } from '../content'
import { EASE } from '../ease'
import { Container, Italic, SectionHeader } from './ui'

export default function Process() {
  return (
    <section id="proses" className="bg-bg py-16 md:py-24">
      <Container>
        <SectionHeader
          eyebrow="Cara Kerja"
          title={
            <>
              Empat langkah sampai <Italic>tayang</Italic>
            </>
          }
          sub="Kamu tahu posisi proyekmu di tiap tahap."
        />

        <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.6, ease: EASE }}
            className="accent-gradient absolute top-[1.4rem] left-0 hidden h-px w-full origin-left opacity-40 md:block"
          />
          {process.map((step, i) => (
            <motion.li
              key={step.no}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.12 }}
              className="relative"
            >
              <span className="relative z-10 inline-flex h-11 items-center bg-bg pr-4 font-display text-3xl italic text-text-primary">
                {step.no}
              </span>
              <h3 className="mt-5 text-xl font-light text-text-primary">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.desc}</p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
