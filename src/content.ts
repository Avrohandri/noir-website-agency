// Semua copy dan data situs ada di sini.
// DUMMY: harga, portofolio, statistik, dan kontak masih data contoh. Ganti sebelum rilis.

export const brand = {
  name: 'NOIR',
  full: 'NOIR Agency',
  monogram: 'N',
}

export const nav = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'paket', label: 'Paket' },
  { id: 'karya', label: 'Karya' },
] as const

export const loading = {
  label: 'NOIR Agency',
  words: ['Rancang', 'Bangun', 'Luncurkan'],
}

export const hero = {
  eyebrow: "Studio Web '26",
  titleA: 'Noir',
  titleB: 'Agency',
  rolePrefix: 'Kami bangun',
  roles: ['landing page', 'company profile', 'toko online', 'web app'],
  roleSuffix: 'untuk bisnismu.',
  description:
    'Kami merancang dan membangun website untuk UMKM sampai korporasi. Kamu fokus jualan, kami urus tampilan, domain, dan perawatannya.',
  ctaPrimary: { label: 'Lihat Paket', href: '#paket' },
  ctaSecondary: { label: 'Konsultasi gratis', href: '#kontak' },
}

export type Service = {
  id: number
  slug: 'profile' | 'landing' | 'shop' | 'app'
  title: string
  tag: string
  desc: string
  fitur: string[]
}

export const services: Service[] = [
  {
    id: 1,
    slug: 'profile',
    title: 'Company Profile',
    tag: 'Kredibilitas',
    desc: 'Website profil yang bikin calon klien percaya sebelum mereka menghubungi kamu.',
    fitur: ['Desain custom', 'Halaman profil, tim, dan katalog', 'SEO on-page'],
  },
  {
    id: 2,
    slug: 'landing',
    title: 'Landing Page',
    tag: 'Konversi',
    desc: 'Satu halaman untuk kampanye Google dan Meta Ads, dengan copy yang mengarahkan pengunjung ke tombol beli.',
    fitur: ['Muat di bawah 1,5 detik', 'Form leads dan tombol WhatsApp', 'Meta Pixel dan GA4'],
  },
  {
    id: 3,
    slug: 'shop',
    title: 'Toko Online',
    tag: 'E-Commerce',
    desc: 'Toko yang menerima QRIS dan VA, menghitung ongkir, dan mencatat stok tanpa spreadsheet.',
    fitur: ['Midtrans, Xendit, atau Tripay', 'Ongkir ekspedisi otomatis', 'Dashboard admin'],
  },
  {
    id: 4,
    slug: 'app',
    title: 'Web App Custom',
    tag: 'Sistem',
    desc: 'Dashboard internal, sistem reservasi, atau aplikasi yang mengikuti alur kerja timmu.',
    fitur: ['React, Node, dan API', 'Database terstruktur', 'Hak akses bertingkat'],
  },
]

export type Paket = {
  id: number
  title: string
  desc: string
  price: string
  revisi: number
  waktu: string
  fitur: string[]
  highlight?: boolean
}

// DUMMY: harga dan fitur dari repo awal, revisi ditambahkan sebagai usulan.
export const packets: Paket[] = [
  {
    id: 1,
    title: 'Starter Landing Page',
    desc: 'Untuk UMKM, promosi satu produk, atau kampanye iklan.',
    price: '1.499.000',
    revisi: 2,
    waktu: '3 sampai 5 hari kerja',
    fitur: [
      'Satu halaman responsif',
      'Domain .com dan hosting 1 tahun',
      'Tombol telepon dan WhatsApp',
      'SEO dasar',
      'Garansi maintenance 1 bulan',
    ],
  },
  {
    id: 2,
    title: 'Business Profile',
    desc: 'Untuk institusi, korporat, atau agensi yang butuh citra profesional.',
    price: '3.499.000',
    revisi: 3,
    waktu: '7 sampai 10 hari kerja',
    highlight: true,
    fitur: [
      '5 sampai 7 halaman',
      'Domain .com dan cloud hosting 1 tahun',
      'Desain UI/UX custom',
      'Email bisnis nama@domainmu.com',
      'Google Analytics dan Meta Pixel',
      'Form kontak dengan notifikasi WhatsApp',
      'Garansi maintenance 3 bulan',
    ],
  },
  {
    id: 3,
    title: 'E-Commerce / Custom',
    desc: 'Untuk toko online lengkap dengan payment gateway otomatis.',
    price: '6.999.000',
    revisi: 4,
    waktu: 'Sesuai lingkup, mulai 14 hari kerja',
    fitur: [
      'Katalog produk tanpa batas',
      'Payment gateway QRIS, VA, dan kartu kredit',
      'Ongkir JNE, SiCepat, dan lainnya',
      'Dashboard order dan stok',
      'SSL dan proteksi DDoS',
      'Training pemakaian website',
      'Garansi maintenance 6 bulan',
    ],
  },
]

export const finder = {
  questions: [
    {
      key: 'jenis',
      q: 'Apa bidang usahamu?',
      options: [
        { label: 'UMKM', weight: 1 },
        { label: 'Company Profile / Korporasi', weight: 2 },
        { label: 'Toko Online', weight: 3 },
      ],
    },
    {
      key: 'kebutuhan',
      q: 'Kamu butuh website untuk apa?',
      options: [
        { label: 'Promosi produk atau kampanye', weight: 1 },
        { label: 'Profil perusahaan atau agensi', weight: 2 },
        { label: 'Jualan dengan payment gateway', weight: 3 },
      ],
    },
    {
      key: 'budget',
      q: 'Berapa budget-mu?',
      optional: true,
      options: [
        { label: 'Rp1 juta sampai Rp3 juta', weight: 1 },
        { label: 'Rp3 juta sampai Rp7 juta', weight: 2 },
        { label: 'Di atas Rp7 juta', weight: 3 },
      ],
    },
  ],
} as const

export const process = [
  {
    no: '01',
    title: 'Brief',
    desc: 'Kamu kirim logo, foto, teks, dan contoh website yang kamu suka. Kami mulai kerja setelah materi lengkap.',
  },
  {
    no: '02',
    title: 'Desain',
    desc: 'Kami kirim desain halaman utama. Kamu kasih catatan sesuai jatah revisi paketmu.',
  },
  {
    no: '03',
    title: 'Bangun',
    desc: 'Kami bangun website, pasang domain, lalu cek tampilannya di HP, tablet, dan desktop.',
  },
  {
    no: '04',
    title: 'Luncurkan',
    desc: 'Website tayang. Kami pantau dan rawat selama masa garansi.',
  },
]

export type Work = {
  id: number
  title: string
  kategori: string
  bidang: string
  tahun: string
  desc: string
  // Desain kartu poster di ring 3D (lihat WorkCreative.tsx)
  creative: 'kopi' | 'batik' | 'klinik' | 'kost' | 'bengkel' | 'pajak' | 'glow' | 'properti' | 'kelas' | 'catering'
  accent: string
}

// DUMMY: proyek contoh, belum ada klien nyata.
export const works: Work[] = [
  { id: 1, title: 'Kopi Senja', kategori: 'Landing Page', bidang: 'F&B', tahun: '2026', creative: 'kopi', accent: '#d9a066', desc: 'Landing page promo menu musiman dengan tombol pesan lewat WhatsApp.' },
  { id: 2, title: 'Batik Lestari', kategori: 'Toko Online', bidang: 'Fashion', tahun: '2026', creative: 'batik', accent: '#b4532a', desc: 'Toko online batik tulis dengan pembayaran QRIS dan ongkir otomatis.' },
  { id: 3, title: 'Klinik Sehat Medika', kategori: 'Company Profile', bidang: 'Kesehatan', tahun: '2025', creative: 'klinik', accent: '#2cc5b0', desc: 'Profil klinik dengan jadwal dokter dan peta lokasi cabang.' },
  { id: 4, title: 'Kost Harmoni', kategori: 'Web App', bidang: 'Properti', tahun: '2026', creative: 'kost', accent: '#6aa8ff', desc: 'Sistem reservasi kamar kost dengan dashboard pemilik.' },
  { id: 5, title: 'Bengkel Jaya Motor', kategori: 'Landing Page', bidang: 'Otomotif', tahun: '2025', creative: 'bengkel', accent: '#ef4444', desc: 'Halaman booking servis dengan form leads ke WhatsApp admin.' },
  { id: 6, title: 'Arunika Konsultan', kategori: 'Company Profile', bidang: 'Jasa Pajak', tahun: '2026', creative: 'pajak', accent: '#e3c16f', desc: 'Website konsultan pajak dengan artikel edukasi dan form konsultasi.' },
  { id: 7, title: 'Glow Skin Lab', kategori: 'Toko Online', bidang: 'Kecantikan', tahun: '2026', creative: 'glow', accent: '#f08bb5', desc: 'Toko skincare dengan bundling produk dan checkout QRIS.' },
  { id: 8, title: 'Sinar Residence', kategori: 'Landing Page', bidang: 'Properti', tahun: '2026', creative: 'properti', accent: '#3fcf8e', desc: 'Landing page perumahan dengan simulasi cicilan dan form survei lokasi.' },
  { id: 9, title: 'KelasKu', kategori: 'Web App', bidang: 'Edukasi', tahun: '2025', creative: 'kelas', accent: '#a48bfa', desc: 'Platform kursus online dengan progres belajar dan sertifikat.' },
  { id: 10, title: 'Rasa Nusantara', kategori: 'Company Profile', bidang: 'Katering', tahun: '2026', creative: 'catering', accent: '#fb8c3c', desc: 'Profil katering dengan menu paket, galeri acara, dan form pesanan.' },
]

// DUMMY: angka contoh.
export const stats = [
  { value: 120, suffix: '+', label: 'Website selesai' },
  { value: 7, suffix: ' hari', label: 'Rata-rata pengerjaan' },
  { value: 98, suffix: '%', label: 'Klien perpanjang maintenance' },
]

// Usulan: jawaban FAQ ini perlu dicek ulang oleh tim NOIR.
export const faq = [
  {
    q: 'Berapa lama website saya jadi?',
    a: 'Starter butuh 3 sampai 5 hari kerja, Business Profile 7 sampai 10 hari kerja. Hitungan dimulai setelah kami terima materi lengkap.',
  },
  {
    q: 'Bagaimana sistem pembayarannya?',
    a: 'Kamu bayar DP 50% untuk mulai, lalu pelunasan 50% sebelum website tayang.',
  },
  {
    q: 'Berapa kali saya bisa minta revisi?',
    a: 'Starter dapat 2 kali revisi desain, Business Profile 3 kali, dan E-Commerce 4 kali. Revisi di luar jatah kami hitung sebagai pekerjaan tambahan.',
  },
  {
    q: 'Domainnya atas nama siapa?',
    a: 'Kami daftarkan domain atas nama kamu atau bisnismu.',
  },
  {
    q: 'Setelah masa garansi habis, gimana?',
    a: 'Kamu bisa lanjut paket maintenance bulanan atau kelola website sendiri. Kami kasih panduan pemakaian sebelum serah terima.',
  },
]

// DUMMY: kontak contoh. Ganti dengan nomor dan email asli sebelum rilis.
export const contact = {
  marquee: 'MEMBANGUN BISNIS DIGITAL',
  titleA: 'Siap',
  titleB: 'meluncur?',
  sub: 'Ceritakan bisnismu. Kami balas dalam 1x24 jam kerja.',
  email: 'halo@noir-agency.example',
  phoneLabel: '+62 812 0000 0000',
  phoneHref: 'tel:+6281200000000',
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'TikTok', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'GitHub', href: '#' },
  ],
  status: 'Terima proyek baru',
}
