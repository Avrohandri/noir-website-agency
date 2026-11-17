import { motion } from 'motion/react'
import { packets } from '../content'
import { EASE } from '../ease'
import { Arrow, Container, Italic, PillLink, SectionHeader } from './ui'

export default function Pricing() {
  return (
    <section id="paket" className="py-16 md:py-24">
      <Container>
        <SectionHeader
          eyebrow="Paket Harga"
          title={
            <>
              Pilih paket, <Italic>mulai jalan</Italic>
            </>
          }
          sub="Semua paket sudah termasuk domain, hosting tahun pertama, dan garansi maintenance."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {packets.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
              className={`group relative isolate flex flex-col rounded-3xl border p-7 transition-colors duration-300 md:p-8 ${
                p.highlight ? 'border-muted/40 bg-surface' : 'border-stroke bg-surface/40 hover:bg-surface'
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-7 rounded-full bg-text-primary px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-bg">
                  Rekomendasi
                </span>
              )}
              <p className="text-xs uppercase tracking-[0.25em] text-muted">0{p.id}</p>
              <h3 className="mt-3 text-2xl font-light text-text-primary">{p.title}</h3>
              <p className="mt-2 min-h-[2.75rem] text-sm text-muted">{p.desc}</p>

              <div className="my-7 border-y border-stroke py-6">
                <p className="text-xs text-muted">Mulai dari</p>
                <p className="mt-1 font-display text-5xl italic text-text-primary">
                  <span className="mr-1 align-top font-body text-base not-italic text-muted">Rp</span>
                  {p.price}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-stroke px-3 py-1 text-text-primary/80">{p.revisi}x revisi desain</span>
                  <span className="rounded-full border border-stroke px-3 py-1 text-text-primary/80">{p.waktu}</span>
                </div>
              </div>

              <ul className="mb-8 flex flex-col gap-3">
                {p.fitur.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-text-primary/80">
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-muted" />
                    {f}
                  </li>
                ))}
              </ul>

              <PillLink href="#kontak" variant={p.highlight ? 'solid' : 'outline'} className="mt-auto w-full">
                Pilih paket ini <Arrow />
              </PillLink>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          Revisi di luar jatah paket dihitung sebagai pekerjaan tambahan. Pengerjaan dimulai setelah materi dari kamu lengkap.
        </p>
      </Container>
    </section>
  )
}
