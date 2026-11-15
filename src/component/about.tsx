import { useState } from 'react';
import { motion } from "motion/react"
import './style.css'
import { div, p } from 'motion/react-client';

export default function Tentang(){
    type paketUmum = {
        id: number,
        title: string,
        desc: string,
        price: string,
        fitur: string[]
    }
    const [packets, setPackets] = useState<paketUmum[]>([
        {id: 1, title: "Starter Landing Page", desc: 'Cocok untuk UMKM, promosi produk tunggal, atau kampanye promosi.',price: '1.499.000',fitur: ['Halaman Responsif Tunggal (Landing Page)', 'Gratis Domain .com & Hosting 1 Tahun', 'Tombol Direct Call / WhatsApp','Optimasi SEO Dasar', 'Pengerjaan 3 - 5 Hari Kerja', 'Garansi Maintenance 1 Bulan']},
        {id: 2, title: "Business Profile", desc: 'Solusi ideal untuk kredibilitas institusi, korporat, atau agensi profesional.',price: '3.499.000',fitur: [' Hingga 5-7 Halaman Menu', 'Gratis Domain .com & Cloud Hosting 1 Tahun', 'Desain UI/UX Eksklusif & Modern', 'Email Bisnis (nama@domainanda.com)', 'Integrasi Google Analytics & Meta Pixel', 'Form Kontak & Notifikasi WhatsApp', 'Pengerjaan 7 - 10 Hari Kerja', 'Garansi Maintenance 3 Bulan']},
        {id: 3, title: "E-Commerce / Custom", desc: 'Untuk toko online lengkap dengan sistem payment gateway otomatis.',price: '6.999.000',fitur: ['Katalog Produk Tanpa Batas', 'Payment Gateway (QRIS, VA, CC)', 'Integrasi Otomatis Ongkir JNE/SiCepat/dll', 'Dashboard Manajemen Order & Stok', 'Keamanan SSL & Proteksi DDOS', 'Training Penggunaan Website', ' Garansi Maintenance 6 Bulan']}
    ])
    const [jenisWebsite, setJenisWebsite] = useState('')
    const [descWebsite, setDescWebsite] = useState('')
    const [priceWebsite, setPriceWebsite] = useState('')
    const [paketRekomendasi, setPaketRekomendasi] = useState<paketUmum | null>(null)
    function cariPaket(){
        const jawaban = [jenisWebsite, descWebsite, priceWebsite]
        console.log(jawaban)
        const idPaket = 
        jenisWebsite === 'Toko Online' ? 3 :
        jenisWebsite === 'Company Profile / Korporasi' ? 2 :
        jenisWebsite === 'UMKM' ? 1 : null

        setPaketRekomendasi(packets.find((packet) => packet.id === idPaket) ?? null)
    }
    return( 
        <>
        <div id="tentang" className="scroll-mt-5 pt-15 pl-35 pr-35 pb-10">
        <motion.div 
            initial={{ opacity: 0, scale: 1, y: 10}}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                duration: 0.45,
                scale: { type: "spring", visualDuration: 0.3, bounce: 0.1 },
            }}>
                <h1 className="text-6xl text-center">Mengapa <span className="bg-linear-to-r from-pink-500 to-indigo-400 bg-clip-text text-transparent"><u>NOIR</u></span>?</h1>
                <p className="text-justify text-gray-400 pt-8 pb-8 text-md max-w-4xl place-self-center">
                    NOIR adalah partner bisnis digital kamu. Bersama NOIR kamu akan memperoleh banyak benefit, mulai dari website company profile, laporan, atau aplikasi berbasis website yang siap membantu kamu kapan saja dan dimana saja, kamu yang menentukan. NOIR juga berkomitmen untuk membantu kamu merancang website profesional, responsif, dan siap melipatgandakan konversi bisnis kamu.
                    <br/><br/>
                    NOIR hadir dengan berbagai macam paket yang sudah kami personaliasikan buat kamu loh! Atau kamu masih bingung mau pilih yang mana? Yuk aku bantu!
                </p>
            <h1 className="text-2xl text-center col-span-3">Cari Paket yang Cocok Buat Kebutuhanmu Yuk!</h1>
            <div className="grid grid-cols-3 gap-10 pt-15 pl-25 pr-25 pb-15">
                <div className="rounded-md bg-zinc-800/50 p-2">
                    <h1 className="text-center p-4">Apa Bidang Usaha Kamu?</h1><hr className="text-gray-500/50"/>
                    <div className="space-y-3 p-4">
                        {['UMKM', 'Company Profile / Korporasi', 'Toko Online'].map((opsi: any) => {
                            const selected = jenisWebsite === opsi
                            return(
                                <button
                                key={opsi}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => setJenisWebsite(opsi)}
                                className={`w-full text-sm rounded-md border px-4 py-3 text-left transition cursor-pointer ${
                                selected
                                    ? 'border-teal-400 bg-teal-500/20 text-teal-300'
                                    : 'border-zinc-700 bg-zinc-900/40 text-gray-300 hover:border-teal-400'
                                }`}>{opsi}</button>
                            )
                        })}
                    </div>
                </div>
                <div className="rounded-md bg-zinc-800/50 p-2">
                    <h1 className="text-center p-4">Seperti Apakah Kebutuhan Kamu?</h1><hr className="text-gray-500/50"/>
                    <div className="space-y-3 p-4">
                        {['Promosi Produk atau Kampanye Promosi','Profil Perusahaan, Agensi, atau Bisnis','Butuh Sistem Payment Gateway Otomatis'].map((opsi: any) => {
                            const selected = descWebsite === opsi
                            return(
                                <button 
                                key = {opsi}
                                type = "button"
                                aria-pressed = {selected}
                                onClick={() => setDescWebsite(opsi)}
                                className={`w-full text-sm rounded-md border px-4 py-3 text-left transition cursor-pointer ${
                                selected
                                    ? 'border-teal-400 bg-teal-500/20 text-teal-300'
                                    : 'border-zinc-700 bg-zinc-900/40 text-gray-300 hover:border-teal-400'
                                }`}>{opsi}</button>
                            )
                        })}
                    </div>
                </div>
                <div className="rounded-md bg-zinc-800/50 p-2">
                    <h1 className="text-center p-4">Berapa Budget Kebutuhan Kamu?</h1><hr className="text-gray-500/50"/>
                    <div className="space-y-3 p-4">
                    {['Rp. 999.000,00 - 2.999.000,00','Rp.3.000.000,00 - 6.999.000,00', 'Rp. 7.000.000,00 - dst'].map((opsi: any) => {
                            const selected = priceWebsite === opsi
                            return(
                                <button 
                                key = {opsi}
                                type = "button"
                                aria-pressed = {selected}
                                onClick={() => setPriceWebsite(opsi)}
                                className={`w-full text-sm rounded-md border px-4 py-3 text-left transition cursor-pointer ${
                                selected
                                    ? 'border-teal-400 bg-teal-500/20 text-teal-300'
                                    : 'border-zinc-700 bg-zinc-900/40 text-gray-300 hover:border-teal-400'
                                }`}>{opsi}</button>
                            )
                        })}
                    </div>
                </div>
                <div className="pb-4 text-center opacity-50 hover:opacity-100 transition duration-250 col-start-2">
                    <button onClick={cariPaket} className="border border-zinc-500 bg-zinc-600/50 hover:bg-blue-900 hover:border-blue-500 rounded-md p-2 pl-14 pr-14 transition duration-300 cursor-pointer">Carikan Paket</button>
                </div>
                <div className="col-span-3">
                    {!paketRekomendasi ? (
                        <p className="text-center bg-zinc-800/50 p-5 rounded-xl">Kamu Belom Memilih Paket..</p>
                    ) : (
                        <>
                        <div className="grid grid-cols-2 gap-5 h-full flex-col rounded-xl p-6 hover:scale-102 bg-zinc-900/50 border border-zinc-700 hover:border-zinc-400 transition duration-300">
                            <div className="col-span-2">
                                <h1 className="text-center text-3xl p-4">Ini Paket yang Paling Cocok Sama Kamu!</h1><hr className="text-gray-800"/>
                            </div>
                            <div className="pt-4">
                                <h1 className="text-center p-2 text-xl"><span className="bg-linear-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent">{paketRekomendasi.title}</span></h1>
                                <h1 className="text-center p-2 text-sm text-gray-500">Mulai dari<br /><span className="text-emerald-300/50 text-3xl">Rp. {paketRekomendasi.price}</span></h1>
                                <p className="text-center text-sm p-3 text-gray-300">{paketRekomendasi.desc}</p>
                            </div>
                            <ul className="list-decimal p-3 text-gray-400 space-y-2">
                                {paketRekomendasi.fitur.map((fitur: any, index: number) => (
                                    <li key={`${paketRekomendasi.id}-${index}`} className="text-sm/snug text-left">{fitur}</li>
                                ))}
                            </ul>
                            <div className="mt-auto pt-4 text-center opacity-50 hover:opacity-100 transition duration-250 col-span-2">
                                <button className="border border-zinc-500 bg-zinc-600/50 hover:bg-blue-900 hover:border-blue-500 rounded-md p-2 pl-14 pr-14 transition duration-300 cursor-pointer">Pilih Paket Ini</button>
                            </div>
                        </div>
                        </>
                    )}
                </div>
            </div>
            <h1 id="paket" className="scroll-mt-20 text-6xl text-center"><span className="bg-linear-to-r from-lime-500 to-teal-400 bg-clip-text text-transparent">Check </span>Paket ini Ya!</h1>
            <div className="grid grid-cols-3 gap-10 pt-15 pl-25 pr-25 pb-15">
                <TampilkanPaket packets={packets} />
            </div>
        </motion.div>
        </div>
        </>
    )
}

function TampilkanPaket({packets}: any){
    return(
        <>
        {packets.map((packet: any) => (           
            <div className="flex h-full flex-col rounded-xl p-6 hover:scale-102 bg-zinc-900/50 border border-zinc-700 hover:border-zinc-400 transition duration-300">
                <h1 className="text-center p-2 text-xl"><span className="bg-linear-to-r from-teal-400 to-sky-400 bg-clip-text text-transparent">{packet.title}</span></h1>
                <h1 className="text-center p-2 text-sm text-gray-500">Mulai dari<br /><span className="text-emerald-300/50 text-3xl">Rp. {packet.price}</span></h1>
                <p className="text-justify text-sm p-3 text-gray-300">{packet.desc}</p>
                <hr className="text-gray-800"/>
                <ul className="list-decimal p-3 text-gray-400 space-y-2">
                    {packet.fitur.map((fitur: any, index: number) => (
                        <li key={`${packet.id}-${index}`} className="text-sm/snug text-left">{fitur}</li>
                    ))}
                </ul>
                <div className="mt-auto pt-4 text-center opacity-50 hover:opacity-100 transition duration-250">
                    <button className="border border-zinc-500 bg-zinc-600/50 hover:bg-blue-900 hover:border-blue-500 rounded-md p-2 pl-14 pr-14 transition duration-300 cursor-pointer">Pilih Paket Ini</button>
                </div>
            </div>
        ))}
        </>
    )
}