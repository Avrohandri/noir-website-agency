import { motion } from "motion/react"
import './style.css'

export default function Tentang(){
    return( 
        <>
        <main id="tentang" className="scroll-mt-24 pt-15 pl-35 pr-35 pb-15">
            <h1 className="text-6xl text-center">Mengapa <span className="bg-linear-to-r from-pink-500 to-indigo-400 bg-clip-text text-transparent"><u>NOIR</u></span>?</h1>
            <p className="text-justify text-gray-400 pt-8 pb-8 text-md max-w-4xl place-self-center">
                NOIR adalah partner bisnis digital kamu. Bersama NOIR kamu akan memperoleh banyak benefit, mulai dari website company profile, laporan, atau aplikasi berbasis website yang siap membantu kamu kapan saja dan dimana saja, kamu yang menentukan. NOIR juga berkomitmen untuk membantu kamu merancang website profesional, responsif, dan siap melipatgandakan konversi bisnis kamu.
                <br/><br/>
                NOIR hadir dengan berbagai macam paket yang sudah kami personaliasikan buat kamu loh! Atau kamu masih bingung mau pilih yang mana? Yuk aku bantu!
            </p>
        </main>
        </>
    )
}