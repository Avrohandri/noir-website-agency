import { motion } from 'motion/react'
import { services } from '../content'
import { EASE } from '../ease'
import { Container, Italic, SectionHeader } from './ui'
import Visual from './Visual'

const spans = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7']

export default function Services() {
  return (
    <section id="layanan" className="bg-bg py-12 md:py-16">
      <Container>
        <SectionHeader
          eyebrow="Layanan"
          title={
            <>
              Yang kami <Italic>bangun</Italic>
            </>
          }
          sub="Empat jenis website untuk tiap tahap bisnismu. Semuanya responsif dan siap SEO sejak hari pertama."
          action={{ label: 'Lihat paket harga', href: '#paket' }}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {services.map((s, i) => (
            <motion.a
              key={s.id}
              href="#paket"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: EASE, delay: (i % 2) * 0.1 }}
              className={`group relative flex aspect-[4/3] flex-col overflow-hidden rounded-3xl border border-stroke bg-surface md:aspect-auto md:h-[420px] ${spans[i]}`}
            >
              <Visual variant={s.slug} seed={i} />

              {/* Info dasar, selalu tampil */}
              <div className="relative mt-auto flex items-end justify-between gap-4 bg-gradient-to-t from-black/80 to-transparent p-6 pt-16 transition-opacity duration-300 group-hover:opacity-0">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-muted">
                    0{s.id} · {s.tag}
                  </span>
                  <h3 className="mt-2 text-2xl font-light text-text-primary md:text-3xl">{s.title}</h3>
                </div>
              </div>

              {/* Overlay hover */}
              <div className="absolute inset-0 flex flex-col justify-between bg-bg/70 p-6 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 md:p-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-muted">
                    0{s.id} · {s.tag}
                  </span>
                  <p className="mt-4 max-w-sm text-sm text-text-primary/85 md:text-base">{s.desc}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.fitur.map((f) => (
                      <li key={f} className="rounded-full border border-stroke px-3 py-1 text-xs text-muted">
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="relative isolate self-start rounded-full p-[1.5px]">
                  <span aria-hidden className="accent-gradient-animated absolute inset-0 -z-10 rounded-full" />
                  <span className="block rounded-full bg-white px-5 py-2.5 text-sm text-black">
                    Lihat paket · <span className="font-display italic">{s.title}</span>
                  </span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  )
}
