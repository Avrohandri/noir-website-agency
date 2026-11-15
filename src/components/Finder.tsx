import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { finder, packets, type Paket } from '../content'
import { EASE } from '../ease'
import { Arrow, Container, Italic, PillLink, SectionHeader } from './ui'

type Answers = Record<string, number>

// Logika rekomendasi dari repo awal: bobot kebutuhan paling dominan
function recommend(a: Answers): Paket | null {
  const jenis = a.jenis ?? 0
  const kebutuhan = a.kebutuhan ?? 0
  const budget = a.budget ?? 0
  const id = Math.max(jenis, Math.round(jenis * 0.2 + kebutuhan * 0.79 + budget * 0.01))
  return packets.find((p) => p.id === id) ?? null
}

export default function Finder() {
  const [answers, setAnswers] = useState<Answers>({})
  const [result, setResult] = useState<Paket | null>(null)
  const canSubmit = answers.jenis && answers.kebutuhan

  const pick = (key: string, weight: number) => {
    setAnswers((a) => ({ ...a, [key]: weight }))
    setResult(null)
  }
  const reset = () => {
    setAnswers({})
    setResult(null)
  }

  return (
    <section id="cari-paket" className="bg-bg py-16 md:py-24">
      <Container>
        <SectionHeader
          eyebrow="Cari Paket"
          title={
            <>
              Bingung pilih <Italic>paket?</Italic>
            </>
          }
          sub="Jawab tiga pertanyaan singkat. Kami cocokkan dengan paket yang pas buat bisnismu."
        />

        <div className="flex flex-col gap-4">
          {finder.questions.map((q, qi) => (
            <motion.fieldset
              key={q.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE, delay: qi * 0.08 }}
              className="flex flex-col gap-4 rounded-[32px] border border-stroke bg-surface/30 p-4 transition-colors duration-300 hover:bg-surface sm:rounded-full md:flex-row md:items-center md:gap-6 md:p-3 md:pl-4"
            >
              <legend className="sr-only">{q.q}</legend>
              <div className="flex items-center gap-4 md:w-[38%]">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stroke font-display text-xl italic text-text-primary">
                  {qi + 1}
                </span>
                <div>
                  <p className="text-base text-text-primary md:text-lg">{q.q}</p>
                  {'optional' in q && <p className="text-xs text-muted">Opsional</p>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:ml-auto md:justify-end">
                {q.options.map((o) => {
                  const selected = answers[q.key] === o.weight
                  return (
                    <button
                      key={o.label}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => pick(q.key, o.weight)}
                      className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-all duration-300 ${
                        selected
                          ? 'border-text-primary bg-text-primary text-bg'
                          : 'border-stroke text-muted hover:border-muted hover:text-text-primary'
                      }`}
                    >
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </motion.fieldset>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => setResult(recommend(answers))}
            className="group relative isolate inline-flex cursor-pointer items-center gap-2 rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg transition-all duration-300 hover:scale-105 hover:bg-bg hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-text-primary disabled:hover:text-bg"
          >
            <span aria-hidden className="ring-hover accent-gradient" />
            Carikan paket <Arrow />
          </button>
          {Object.keys(answers).length > 0 && (
            <button type="button" onClick={reset} className="cursor-pointer text-sm text-muted underline-offset-4 hover:text-text-primary hover:underline">
              Ulangi
            </button>
          )}
        </div>
        {!canSubmit && <p className="mt-3 text-center text-xs text-muted">Jawab pertanyaan 1 dan 2 dulu.</p>}

        <div aria-live="polite">
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="relative isolate mt-10 rounded-[32px] p-px"
              >
                <span aria-hidden className="accent-gradient-animated absolute inset-0 -z-10 rounded-[32px] opacity-60" />
                <div className="flex flex-col gap-6 rounded-[31px] bg-surface p-6 md:flex-row md:items-center md:justify-between md:p-10">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">Paket yang cocok buatmu</p>
                    <h3 className="mt-3 font-display text-4xl italic md:text-5xl">{result.title}</h3>
                    <p className="mt-3 max-w-md text-sm text-muted">{result.desc}</p>
                  </div>
                  <div className="flex flex-col items-start gap-4 md:items-end">
                    <p className="text-sm text-muted">
                      Mulai <span className="font-display text-3xl italic text-text-primary">Rp{result.price}</span>
                    </p>
                    <PillLink href="#paket" variant="solid">
                      Lihat detail paket <Arrow />
                    </PillLink>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
