import { useState } from 'react';
import { motion } from "motion/react"
import './style.css'

export default function Layanan(){
    type layananType ={
        id: number,
        logo: string,
        title: string,
        desc: string,
        fitur: string[]
    }
    const [layanans, setLayanan] = useState<layananType[]>([
        {id: 1, logo: '🌐', title: 'Company Profile', desc: 'Tingkatkan kredibilitas bisnis Anda dengan website profil perusahaan yang mewah, informatif, dan meyakinkan calon klien.', fitur: ['Desain custom eksklusif','Halaman profil, tim, & katalog','Optimasi SEO on-page']},
        {id: 2, logo: '🚀', title: 'High-Converting Landing Page', desc: 'Dirancang khusus untuk kampanye iklan Google & Meta Ads dengan copywriting persuasif dan kecepatan muat ultra cepat.', fitur: ['Loading speed < 1.5 detik', 'Integrasi WhatsApp & form leads', 'Tracking Facebook Pixel & GA4']},
        {id: 3, logo: '🛍️', title: 'Toko Online (E-Commerce)', desc: 'Platform jualan otomatis dengan manajemen produk, payment gateway instan (QRIS/VA), dan kalkulator ongkos kirim otomatis.', fitur: ['Integrasi Midtrans / Xendit / Tripay', 'Otomatisasi ongkir ekspedisi', 'Dashboard admin mudah dikelola']},
        {id: 4, logo: '⚡', title: 'Custom Web Application', desc: 'Sistem informasi, dashboard internal, sistem reservasi, atau aplikasi web berbasis kebutuhan operasional spesifik.', fitur: ['Teknologi modern (React / Node / API)', 'Database terstruktur & aman', 'Role & hak akses bertingkat']},
    ])
    return(
        <>
        <div id="layanan" className="place-self-center p-15 scroll-mt-5">
            <h1 className="text-center text-7xl"><span className="bg-linear-to-r from-lime-500 to-teal-400 bg-clip-text text-transparent">Check </span> Layanan Kami</h1>
            <p className="text-center justify-center text-sm text-zinc-500 p-4">Setiap website dibangun dengan standar modern, SEO-friendly, dan dioptimasi penuh untuk perangkat mobile.</p>
            <div className="grid grid-cols-2 gap-6 place-self-center justify-center p-5 max-w-5xl">
                <ShowLayanan layanan={layanans} />
            </div>
        </div>
        </>
    )
}

function ShowLayanan({layanan}: any){
    return(
        <>
        {layanan.map((item: any) =>(
            <div key={item.id} className="bg-zinc-800/50 border border-zinc-500/50 rounded-md p-2">
                <section className="flex space-x-3 p-6">
                    <h1 className="text-xl">{item.logo}</h1>
                    <h1 className="text-2xl">{item.title}</h1>
                </section>
                <h1 className="text-sm ml-15 mr-15 mb-2 text-justify text-zinc-400">{item.desc}</h1>
                <hr className="text-gray-800 ml-15 mr-15 mb-2 " />
                <ul className="list-disc p-3 text-gray-400 space-y-2 ml-15 mr-15 mb-2 ">
                    {item.fitur.map((e: any, index: number) =>(
                        <li key={`${e.id}-${index}`} className="text-sm/snug text-left">{e}</li>
                    ))}
                </ul>
            </div>
        ))}
        </>
    )
}