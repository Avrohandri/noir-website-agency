import type { CSSProperties, ReactNode } from 'react'
import type { Work } from '../content'

// Kartu poster portofolio, digambar di kanvas desain 130 x 300 px.
// Semua ukuran di sini dalam piksel desain; ring 3D yang men-scale ke layar.
// Warna: monokrom + satu aksen per proyek (work.accent).

const serif = '"Instrument Serif", ui-serif, Georgia, serif'

type BoxProps = { s: CSSProperties; children?: ReactNode; className?: string }
const Box = ({ s, children, className }: BoxProps) => (
  <div className={className} style={{ position: 'absolute', ...s }}>
    {children}
  </div>
)

// Judul besar kondensed ala poster
const Big = ({ top, size, color, children, left = 10, shadow }: { top: number; size: number; color: string; children: ReactNode; left?: number; shadow?: string }) => (
  <Box
    s={{
      left,
      top,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 0.95,
      letterSpacing: '-0.02em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      transform: 'scaleX(.88)',
      transformOrigin: 'left center',
      color,
      textShadow: shadow,
    }}
  >
    {children}
  </Box>
)

const Serif = ({ top, size, color, children, left = 10, italic = true }: { top: number; size: number; color: string; children: ReactNode; left?: number; italic?: boolean }) => (
  <Box s={{ left, right: 10, top, fontFamily: serif, fontStyle: italic ? 'italic' : 'normal', fontSize: size, lineHeight: 1, color, whiteSpace: "nowrap" }}>{children}</Box>
)

const Tiny = ({ top, children, color = 'rgba(255,255,255,.6)', left = 10, right, size = 4.4, ls = '.16em', align }: { top: number; children: ReactNode; color?: string; left?: number; right?: number; size?: number; ls?: string; align?: 'right' | 'center' }) => (
  <Box s={{ left, right, top, fontSize: size, letterSpacing: ls, textTransform: 'uppercase', color, fontWeight: 600, textAlign: align, whiteSpace: 'nowrap' }}>{children}</Box>
)

const Line = ({ top, w, color = 'rgba(255,255,255,.14)', left = 10, h = 2.2 }: { top: number; w: number; color?: string; left?: number; h?: number }) => (
  <Box s={{ left, top, width: w, height: h, borderRadius: 2, background: color }} />
)

const Pill = ({ top, children, bg, color, left = 10 }: { top: number; children: ReactNode; bg: string; color: string; left?: number }) => (
  <Box s={{ left, top, padding: '4px 10px', borderRadius: 20, background: bg, color, fontSize: 4.8, fontWeight: 700, letterSpacing: '.06em', whiteSpace: 'nowrap' }}>{children}</Box>
)

function Kopi({ a }: { a: string }) {
  return (
    <>
      <Box s={{ inset: 0, background: 'radial-gradient(120% 70% at 50% 100%, #2a2522 0%, #121110 60%, #0b0b0b 100%)' }} />
      {/* cangkir */}
      <Box s={{ left: 32, top: 168, width: 66, height: 52, borderRadius: '6px 6px 30px 30px', background: 'linear-gradient(180deg,#eceae6,#bdb9b3)' }} />
      <Box s={{ left: 92, top: 178, width: 18, height: 22, borderRadius: '0 14px 14px 0', border: '4px solid #cfcbc5', borderLeft: 'none' }} />
      <Box s={{ left: 36, top: 168, width: 58, height: 8, borderRadius: '50%', background: '#3b2a1e' }} />
      <Box s={{ left: 20, top: 220, width: 90, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,.18)', filter: 'blur(1px)' }} />
      {[0, 1, 2].map((i) => (
        <Box key={i} s={{ left: 46 + i * 14, top: 128 + (i % 2) * 6, width: 6, height: 30, borderRadius: 8, border: '1.5px solid rgba(255,255,255,.22)', borderBottom: 'none', borderRight: 'none' }} />
      ))}
      <Tiny top={18}>Kopi Senja · Menu musiman</Tiny>
      <Serif top={34} size={24} color="#f5f5f5">Seduh</Serif>
      <Serif top={58} size={20} color={a}>pelan-pelan.</Serif>
      <Box s={{ left: 10, top: 96, padding: '3px 7px', background: a, color: '#111', fontSize: 6, fontWeight: 800, letterSpacing: '.04em', borderRadius: 3 }}>DISKON 30%</Box>
      <Pill top={262} bg="#f5f5f5" color="#111">PESAN VIA WHATSAPP →</Pill>
    </>
  )
}

function Batik({ a }: { a: string }) {
  return (
    <>
      <Box s={{ inset: 0, background: '#efedea' }} />
      <Box
        s={{
          left: 0,
          right: 0,
          top: 118,
          bottom: 0,
          background: `radial-gradient(circle at 50% 50%, ${a} 0 2px, transparent 2.5px) 0 0/14px 14px, radial-gradient(circle at 50% 50%, transparent 0 4px, #1a1a1a 4.5px 5.3px, transparent 5.8px) 7px 7px/14px 14px, #e2ddd6`,
        }}
      />
      <Box s={{ left: 0, right: 0, top: 118, height: 40, background: 'linear-gradient(180deg,#efedea,rgba(239,237,234,0))' }} />
      <Tiny top={18} color="#8d8a85" align="right" left={10} right={10}>Koleksi tulis tangan</Tiny>
      <Big top={30} size={15} color="#16171b">Batik</Big>
      <Big top={45} size={15} color={a}>Lestari</Big>
      <Box s={{ left: 10, top: 72, fontSize: 5.2, fontWeight: 700, color: '#16171b', lineHeight: 1.8 }}>
        <div>◆ QRIS &amp; VIRTUAL ACCOUNT</div>
        <div>◆ ONGKIR OTOMATIS</div>
      </Box>
      <Box s={{ left: 10, right: 10, bottom: 12, padding: 7, borderRadius: 7, background: 'rgba(255,255,255,.92)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 5.4, fontWeight: 700, color: '#16171b' }}>Kain Parang · Rp349rb</span>
        <span style={{ fontSize: 4.6, fontWeight: 700, color: '#fff', background: '#16171b', padding: '3px 6px', borderRadius: 10 }}>+ KERANJANG</span>
      </Box>
    </>
  )
}

function Klinik({ a }: { a: string }) {
  return (
    <>
      <Box s={{ inset: 0, background: 'linear-gradient(180deg,#ffffff,#eef1f1)' }} />
      <Box s={{ left: 0, right: 0, top: 0, height: 150, background: 'linear-gradient(160deg,#d9dede,#b9c0c0)' }} />
      {/* ikon salib medis */}
      <Box s={{ left: 47, top: 44, width: 36, height: 36, borderRadius: 10, background: '#fff', boxShadow: '0 6px 16px rgba(0,0,0,.12)' }} />
      <Box s={{ left: 61, top: 51, width: 8, height: 22, borderRadius: 2, background: a }} />
      <Box s={{ left: 54, top: 58, width: 22, height: 8, borderRadius: 2, background: a }} />
      <Tiny top={16} color="#5f6666">Klinik Sehat Medika</Tiny>
      <Serif top={102} size={17} color="#16171b">Sehat dimulai</Serif>
      <Serif top={121} size={17} color="#16171b">dari sini.</Serif>
      <Tiny top={162} color="#16171b" size={5}>Jadwal dokter hari ini</Tiny>
      {['dr. Rina · Umum', 'dr. Bayu · Gigi', 'dr. Sari · Anak'].map((t, i) => (
        <Box key={t} s={{ left: 10, right: 10, top: 174 + i * 22, height: 17, borderRadius: 5, background: '#fff', boxShadow: '0 1px 0 rgba(0,0,0,.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 7px' }}>
          <span style={{ fontSize: 5.2, color: '#16171b', fontWeight: 600 }}>{t}</span>
          <span style={{ fontSize: 4.4, color: i === 0 ? a : '#9aa0a0', fontWeight: 700 }}>{i === 0 ? 'TERSEDIA' : '13.00'}</span>
        </Box>
      ))}
      <Pill top={262} bg="#16171b" color="#fff">BUAT JANJI →</Pill>
    </>
  )
}

function Kost({ a }: { a: string }) {
  return (
    <>
      <Box s={{ inset: 0, background: '#0e1014' }} />
      <Tiny top={16}>Kost Harmoni · Dashboard</Tiny>
      <Box s={{ left: 10, top: 34, fontSize: 4.6, color: 'rgba(255,255,255,.5)' }}>Okupansi bulan ini</Box>
      <Big top={42} size={34} color="#f5f5f5">92%</Big>
      <Box s={{ left: 10, top: 80, width: 110, height: 4, borderRadius: 4, background: 'rgba(255,255,255,.08)' }} />
      <Box s={{ left: 10, top: 80, width: 101, height: 4, borderRadius: 4, background: a }} />
      {/* grafik */}
      <Box s={{ left: 10, right: 10, top: 96, height: 70, borderRadius: 8, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)' }} />
      {[30, 46, 38, 58, 50, 66, 62, 74].map((h, i) => (
        <Box key={i} s={{ left: 18 + i * 12.5, top: 160 - h * 0.85, width: 7, height: h * 0.85, borderRadius: 2, background: i === 7 ? a : 'rgba(255,255,255,.22)' }} />
      ))}
      <Tiny top={178}>Kamar</Tiny>
      <Box s={{ left: 10, top: 190, display: 'grid', gridTemplateColumns: 'repeat(5, 18px)', gap: 4 }}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} style={{ height: 14, borderRadius: 3, background: [3, 9].includes(i) ? 'transparent' : 'rgba(255,255,255,.14)', border: [3, 9].includes(i) ? `1px solid ${a}` : 'none' }} />
        ))}
      </Box>
      <Box s={{ left: 10, right: 10, top: 260, height: 22, borderRadius: 6, background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 7px' }}>
        <span style={{ fontSize: 5, color: '#fff', fontWeight: 600 }}>2 kamar kosong</span>
        <span style={{ fontSize: 4.6, color: a, fontWeight: 700 }}>LIHAT →</span>
      </Box>
    </>
  )
}

function Bengkel({ a }: { a: string }) {
  return (
    <>
      <Box s={{ inset: 0, background: 'linear-gradient(180deg,#151515,#0a0a0a)' }} />
      {/* roda gigi */}
      <Box s={{ left: 30, top: 150, width: 120, height: 120, borderRadius: '50%', border: '14px dashed rgba(255,255,255,.12)' }} />
      <Box s={{ left: 62, top: 182, width: 56, height: 56, borderRadius: '50%', border: '8px solid rgba(255,255,255,.18)' }} />
      <Tiny top={18}>Bengkel Jaya Motor</Tiny>
      <Big top={32} size={25} color="#f5f5f5">Servis</Big>
      <Big top={56} size={25} color="#f5f5f5">cepat.</Big>
      <Box s={{ left: -8, right: -8, top: 92, height: 14, background: a, transform: 'rotate(-3deg)' }} />
      <Box s={{ left: 0, right: 0, top: 95, transform: 'rotate(-3deg)', textAlign: 'center', fontSize: 6, fontWeight: 800, letterSpacing: '.08em', color: '#fff' }}>BOOKING ONLINE · TANPA ANTRE</Box>
      <Box s={{ left: 10, top: 120, fontSize: 5.2, color: 'rgba(255,255,255,.75)', lineHeight: 1.8, fontWeight: 600 }}>
        <div>• Ganti oli 30 menit</div>
        <div>• Tune up &amp; cek rem</div>
      </Box>
      <Pill top={262} bg={a} color="#fff">BOOKING SEKARANG →</Pill>
    </>
  )
}

function Pajak({ a }: { a: string }) {
  return (
    <>
      <Box s={{ inset: 0, background: 'linear-gradient(180deg,#14161a,#0b0c0f)' }} />
      <Box s={{ left: 10, right: 10, top: 14, display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 9, color: '#f5f5f5' }}>Arunika</span>
        <span style={{ fontSize: 5, color: a, fontWeight: 700, alignSelf: 'center' }}>✳ KONSULTAN</span>
      </Box>
      <Line top={32} w={110} color="rgba(255,255,255,.08)" h={1} />
      <Serif top={52} size={18} color="#f5f5f5">Pajak beres,</Serif>
      <Serif top={73} size={18} color={a}>bisnis tenang.</Serif>
      <Box s={{ left: 10, top: 108, width: 96, fontSize: 4.6, lineHeight: 1.7, color: 'rgba(255,255,255,.6)' }}>
        Pendampingan SPT, PPh badan, dan perencanaan pajak untuk UMKM sampai korporasi.
      </Box>
      {[
        ['250+', 'klien UMKM'],
        ['12 th', 'pengalaman'],
      ].map(([n, l], i) => (
        <Box key={l} s={{ left: 10 + i * 58, top: 160, width: 52 }}>
          <div style={{ fontFamily: serif, fontSize: 17, color: '#f5f5f5', lineHeight: 1 }}>{n}</div>
          <div style={{ fontSize: 4.4, color: 'rgba(255,255,255,.5)', marginTop: 3, letterSpacing: '.1em', textTransform: 'uppercase' }}>{l}</div>
        </Box>
      ))}
      {[0, 1, 2].map((i) => (
        <Line key={i} top={204 + i * 10} w={[96, 80, 88][i]} />
      ))}
      <Pill top={262} bg="transparent" color="#f5f5f5" left={10}>
        <span style={{ border: `1px solid ${a}`, padding: '4px 10px', borderRadius: 20 }}>KONSULTASI GRATIS</span>
      </Pill>
    </>
  )
}

function Glow({ a }: { a: string }) {
  return (
    <>
      <Box s={{ inset: 0, background: 'linear-gradient(170deg,#f3f1f0,#d9d5d2 60%,#c4bfbb)' }} />
      {/* botol produk */}
      <Box s={{ left: 26, top: 150, width: 30, height: 86, borderRadius: '8px 8px 6px 6px', background: 'linear-gradient(90deg,#2a2a2a,#4a4a4a 40%,#1d1d1d)' }} />
      <Box s={{ left: 34, top: 136, width: 14, height: 16, borderRadius: 3, background: '#111' }} />
      <Box s={{ left: 62, top: 176, width: 42, height: 60, borderRadius: 8, background: 'linear-gradient(90deg,#fafafa,#e3e0dd 60%,#cfcac6)', boxShadow: '0 8px 16px rgba(0,0,0,.15)' }} />
      <Box s={{ left: 62, top: 168, width: 42, height: 10, borderRadius: '6px 6px 2px 2px', background: a }} />
      <Box s={{ left: 20, top: 236, width: 92, height: 6, borderRadius: '50%', background: 'rgba(0,0,0,.18)', filter: 'blur(2px)' }} />
      <Tiny top={18} color="#6f6a66">Glow Skin Lab</Tiny>
      <Serif top={34} size={18} color="#16171b" italic={false}>COLLECTION</Serif>
      <Serif top={53} size={18} color={a} italic={false}>EXCLUSIVE</Serif>
      <Box s={{ left: 10, top: 84, fontSize: 5, color: '#4a4643', fontWeight: 600, lineHeight: 1.7 }}>
        <div>Serum · Toner · Moisturizer</div>
        <div style={{ color: '#16171b', fontWeight: 800 }}>Bundling hemat 25%</div>
      </Box>
      <Pill top={262} bg="#16171b" color="#fff">BELANJA SEKARANG</Pill>
    </>
  )
}

function Properti({ a }: { a: string }) {
  return (
    <>
      <Box s={{ inset: 0, background: 'linear-gradient(180deg,#1b1d1f 0%,#0c0d0e 100%)' }} />
      {/* siluet gedung */}
      {[
        [8, 150, 30, 120],
        [40, 112, 34, 158],
        [76, 136, 26, 134],
        [104, 170, 22, 100],
      ].map(([l, t, w, h], i) => (
        <Box key={i} s={{ left: l, top: t, width: w, height: h, background: i === 1 ? '#2b2e31' : '#222527', borderTop: i === 1 ? `2px solid ${a}` : 'none' }}>
          <div style={{ position: 'absolute', inset: '8px 5px', background: 'repeating-linear-gradient(180deg, rgba(255,255,255,.16) 0 3px, transparent 3px 9px)', opacity: 0.7 }} />
        </Box>
      ))}
      <Box s={{ left: 0, right: 0, top: 220, bottom: 0, background: 'linear-gradient(180deg,rgba(12,13,14,0),#0c0d0e 40%)' }} />
      <Tiny top={18}>Sinar Residence · Bekasi</Tiny>
      <Big top={32} size={15} color="#f5f5f5">Rumah pertama</Big>
      <Big top={48} size={15} color="#f5f5f5">tanpa ribet.</Big>
      <Box s={{ left: 10, top: 80, fontSize: 5, color: 'rgba(255,255,255,.7)' }}>Cicilan mulai</Box>
      <Big top={88} size={16} color={a}>Rp3,2 jt/bln</Big>
      <Box s={{ left: 10, right: 10, top: 252, padding: '6px 8px', borderRadius: 7, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.1)', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 5, color: '#fff', fontWeight: 600 }}>Jadwalkan survei</span>
        <span style={{ fontSize: 5, color: a, fontWeight: 800 }}>→</span>
      </Box>
    </>
  )
}

function Kelas({ a }: { a: string }) {
  return (
    <>
      <Box s={{ inset: 0, background: '#f4f4f5' }} />
      <Box s={{ left: 0, right: 0, top: 0, height: 108, background: '#16171b' }} />
      <Tiny top={16}>KelasKu · Belajar online</Tiny>
      <Big top={32} size={15} color="#f5f5f5">Belajar skill</Big>
      <Big top={48} size={15} color={a}>yang dibayar.</Big>
      <Box s={{ left: 10, top: 76, fontSize: 4.8, color: 'rgba(255,255,255,.6)' }}>120+ kelas · sertifikat resmi</Box>
      {[
        ['UI/UX Dasar', 72],
        ['Digital Marketing', 45],
        ['Excel Bisnis', 90],
      ].map(([t, p], i) => (
        <Box key={t as string} s={{ left: 10, right: 10, top: 122 + i * 42, height: 34, borderRadius: 7, background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,.06)', padding: '6px 7px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 5.4, fontWeight: 700, color: '#16171b' }}>{t}</span>
            <span style={{ fontSize: 4.6, fontWeight: 700, color: '#6b6b70' }}>{p}%</span>
          </div>
          <div style={{ marginTop: 9, height: 3, borderRadius: 3, background: '#e7e7ea' }}>
            <div style={{ width: `${p}%`, height: 3, borderRadius: 3, background: i === 0 ? a : '#16171b' }} />
          </div>
        </Box>
      ))}
      <Pill top={262} bg={a} color="#16171b">LANJUT BELAJAR →</Pill>
    </>
  )
}

function Catering({ a }: { a: string }) {
  return (
    <>
      <Box s={{ inset: 0, background: 'radial-gradient(90% 55% at 50% 72%, #2b2724 0%, #121212 70%)' }} />
      {/* piring tampak atas */}
      <Box s={{ left: 15, top: 160, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle,#efefef 0 38%,#d9d9d9 39% 46%,#f5f5f5 47% 100%)', boxShadow: '0 14px 30px rgba(0,0,0,.6)' }} />
      <Box s={{ left: 47, top: 192, width: 36, height: 36, borderRadius: '50%', background: `radial-gradient(circle at 40% 40%, ${a}, #7a3a12)` }} />
      <Box s={{ left: 58, top: 198, width: 10, height: 6, borderRadius: '50%', background: '#4b7a3a' }} />
      <Tiny top={18}>Rasa Nusantara · Katering</Tiny>
      <Big top={32} size={11} color="rgba(255,255,255,.85)">Paket nasi box</Big>
      <Big top={46} size={30} color={a} shadow={`0 0 18px ${a}66`}>50% off</Big>
      <Box s={{ left: 10, top: 84, fontSize: 5, color: 'rgba(255,255,255,.7)', lineHeight: 1.7 }}>
        <div>Pesanan pertama, minimal 50 box.</div>
        <div>Antar se-Jabodetabek.</div>
      </Box>
      <Pill top={272} bg="#f5f5f5" color="#111">LIHAT MENU →</Pill>
    </>
  )
}

const MAP = {
  kopi: Kopi,
  batik: Batik,
  klinik: Klinik,
  kost: Kost,
  bengkel: Bengkel,
  pajak: Pajak,
  glow: Glow,
  properti: Properti,
  kelas: Kelas,
  catering: Catering,
}

export default function WorkCreative({ work }: { work: Work }) {
  const C = MAP[work.creative]
  return (
    <div className="absolute inset-0 overflow-hidden font-body" style={{ width: 130, height: 300 }}>
      <C a={work.accent} />
    </div>
  )
}
