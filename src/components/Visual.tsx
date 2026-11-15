import type { Service } from '../content'

// Mockup website abstrak monokrom, pengganti foto portofolio selama data masih dummy.
type Props = { variant: Service['slug']; seed?: number; className?: string; compact?: boolean }

const glows = [
  'radial-gradient(70% 55% at 70% 30%, rgba(255,255,255,0.22), transparent 70%), radial-gradient(50% 40% at 20% 80%, rgba(255,255,255,0.10), transparent 70%)',
  'radial-gradient(60% 50% at 25% 25%, rgba(255,255,255,0.20), transparent 70%), radial-gradient(60% 45% at 85% 85%, rgba(255,255,255,0.12), transparent 70%)',
  'radial-gradient(80% 50% at 50% 0%, rgba(255,255,255,0.20), transparent 70%), radial-gradient(40% 40% at 80% 70%, rgba(255,255,255,0.08), transparent 70%)',
]

const Bar = ({ w, h = 'h-2', o = 'bg-white/15' }: { w: string; h?: string; o?: string }) => (
  <div className={`${h} ${w} ${o} rounded-full`} />
)

function Screen({ variant }: { variant: Service['slug'] }) {
  if (variant === 'landing')
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-5 text-center">
        <Bar w="w-16" h="h-1.5" o="bg-white/25" />
        <div className="font-display text-2xl italic text-white/85 md:text-3xl">Diskon 30%</div>
        <Bar w="w-3/5" />
        <Bar w="w-2/5" />
        <div className="mt-2 rounded-full bg-white/85 px-4 py-1.5 text-[10px] font-medium text-black">Pesan via WhatsApp</div>
      </div>
    )
  if (variant === 'shop')
    return (
      <div className="grid h-full grid-cols-3 gap-2 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5 rounded-lg bg-white/[0.06] p-2">
            <div className="aspect-square rounded-md bg-gradient-to-br from-white/25 to-white/5" />
            <Bar w="w-4/5" h="h-1.5" />
            <Bar w="w-1/2" h="h-1.5" o="bg-white/30" />
          </div>
        ))}
      </div>
    )
  if (variant === 'app')
    return (
      <div className="flex h-full gap-3 p-4">
        <div className="flex w-1/5 flex-col gap-2 rounded-lg bg-white/[0.05] p-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Bar key={i} w="w-full" h="h-1.5" o={i === 1 ? 'bg-white/40' : 'bg-white/12'} />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="grid grid-cols-3 gap-2">
            {[62, 38, 84].map((v) => (
              <div key={v} className="rounded-lg bg-white/[0.06] p-2">
                <div className="font-display text-lg italic text-white/80">{v}</div>
                <Bar w="w-2/3" h="h-1" />
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-1.5 rounded-lg bg-white/[0.05] p-3">
            {[40, 65, 50, 80, 55, 90, 70, 95].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-white/10 to-white/40" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    )
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <div className="font-display text-sm italic text-white/80">Studio.</div>
        <div className="flex gap-2">
          <Bar w="w-6" h="h-1" />
          <Bar w="w-6" h="h-1" />
          <Bar w="w-6" h="h-1" />
        </div>
      </div>
      <div className="flex flex-1 gap-4">
        <div className="flex flex-1 flex-col justify-center gap-2">
          <div className="font-display text-xl italic leading-tight text-white/85 md:text-2xl">Tim yang kamu percaya</div>
          <Bar w="w-4/5" />
          <Bar w="w-3/5" />
        </div>
        <div className="w-2/5 rounded-xl bg-gradient-to-br from-white/25 via-white/8 to-transparent" />
      </div>
    </div>
  )
}

export default function Visual({ variant, seed = 0, className = '', compact }: Props) {
  return (
    <div className={`absolute inset-0 overflow-hidden bg-[#0d0d0d] ${className}`} style={{ backgroundImage: glows[seed % glows.length] }}>
      <div className="absolute inset-[9%] overflow-hidden rounded-xl border border-white/10 bg-black/50 shadow-2xl shadow-black/60 backdrop-blur-sm transition-transform duration-700 group-hover:scale-105">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
          <span className="ml-2 h-1.5 w-1/3 rounded-full bg-white/10" />
        </div>
        <div className={`h-[calc(100%-26px)] ${compact ? 'max-md:invisible' : ''}`}>
          <Screen variant={variant} />
        </div>
      </div>
      <div className="halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />
    </div>
  )
}
