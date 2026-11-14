import { motion } from "motion/react"
import './style.css'

export default function Dashboard(){
    return(
        <>
        <main id="dashboard" className="relative w-full">
            <motion.div 
            initial={{ opacity: 0, scale: 1}}
            animate={{ opacity: 1, scale: 1}}
            transition={{
                duration: 0.25,
                scale: { type: "spring", visualDuration: 0.3, bounce: 0.1 },
            }}>
            <img src="src/assets/Black-WhiteNoir.jpg" alt="" className="max-w-full h-auto" />
            </motion.div>
            <div className="absolute flex flex-col -top-1/12 left-0 transform items-center text-center justify-center bg-zinc-950/80 backdrop-blur-md w-full h-auto inset-0">
            <motion.div 
            initial={{ opacity: 0, scale: 1, y: 10}}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                duration: 0.45,
                scale: { type: "spring", visualDuration: 0.3, bounce: 0.1 },
            }}>
                <h1 className="text-9xl">NOIR <span className="bg-linear-to-r from-pink-500 to-indigo-400 bg-clip-text text-transparent">Agency</span></h1>
                <h1 className="text-gray-200 p-4">Your Favourite Digital Business Consultant</h1>
                <div className="grid grid-cols-2 gap-6 place-self-center">
                    <div className="pt-4">
                        <a href="#tentang" className="text-center text-indigo-600 p-2 bg-indigo-800/40 border-2 border-indigo-500 rounded-md hover:bg-indigo-600 hover:text-white transition duration-300">Cari Tahu Soal Kami</a>
                    </div>
                    <div className="pt-4">
                        <a href="#promo" className="text-center text-pink-600 p-2 bg-pink-800/40 border-2 border-pink-500 rounded-md hover:bg-pink-600 hover:text-white transition duration-300">Cek Promo Menarik!</a>
                    </div>
                </div>
            </motion.div>
            </div>
        </main>
        </>
    )
}