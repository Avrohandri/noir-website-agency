import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { faq } from '../content'
import { EASE } from '../ease'
import { Container, Italic, SectionHeader } from './ui'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="bg-bg py-16 md:py-24">
      <Container className="max-w-[900px]">
        <SectionHeader
          eyebrow="FAQ"
          align="center"
          title={
            <>
              Sering <Italic>ditanyakan</Italic>
            </>
          }
        />
        <div className="flex flex-col gap-3">
          {faq.map((item, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
                className={`rounded-[28px] border border-stroke transition-colors duration-300 ${isOpen ? 'bg-surface' : 'bg-surface/30 hover:bg-surface'}`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left text-base text-text-primary md:px-8 md:text-lg"
                  >
                    {item.q}
                    <span
                      aria-hidden
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-stroke text-muted transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl px-6 pb-6 text-sm text-muted md:px-8 md:text-base">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
