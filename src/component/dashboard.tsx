import {useState} from 'react';
import { motion } from "motion/react"
import './style.css'

export default function Dashboard(){
    return(
        <>
        <main className="relative w-full">
            <img src="src/assets/Black-WhiteNoir.jpg" alt="" className="block-w-full h-auto" />
            <div className="absolute flex flex-col items-center text-center justify-center bg-black/70 backdrop-blur-md w-full h-full inset-0">
            <motion.div 
            initial={{ opacity: 0, scale: 1, y: 20}}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
                duration: 0.3,
                scale: { type: "spring", visualDuration: 0.3, bounce: 0.1 },
            }}>
                <h1 className="text-9xl">Noir Agency</h1>
                <h1 className="text-gray-400 p-4">Your Favourite Digital Business Consultant</h1>
                <div className="p-4 place-self-center">
                    <a href="" className="text-center text-indigo-600 p-2 bg-indigo-800/40 border-2 border-indigo-500 rounded-md hover:bg-indigo-600 hover:text-white transition duration-300">Cari Tahu Yuk!</a>
                </div>
            </motion.div>
            </div>
        </main>
        </>
    )
}