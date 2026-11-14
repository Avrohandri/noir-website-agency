import './style.css'

export default function Navbar(){
    return(
        <>
        <nav className="h-auto bg-zinc-900/70 backdrop-blur-md w-full border-b border-zinc-600 fixed z-100">
            <section className="grid grid-cols-5 place-self-center-safe">
                <a href="" className="p-4 text-left opacity-70 hover:opacity-100 flex space-x-2">NOIR Agency</a>
                <a href="" className="p-4 text-center opacity-70 hover:opacity-100">Tentang</a>
                <a href="" className="p-4 text-center opacity-70 hover:opacity-100">Layanan</a>
                <a href="" className="p-4 text-center opacity-70 hover:opacity-100">Promo</a>
                <div className="p-4 place-self-end-safe">
                    <a href="" className="text-right text-fuchsia-600 p-2 bg-fuchsia-800/40 border-2 border-fuchsia-500 rounded-md hover:bg-fuchsia-600 hover:text-white transition duration-300">Hubungi Kami</a>
                </div>
            </section>
        </nav>
        </>
    )
}