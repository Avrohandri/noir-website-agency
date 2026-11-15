import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import Contact from './components/Contact'
import Faq from './components/Faq'
import Finder from './components/Finder'
import Hero from './components/Hero'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Pricing from './components/Pricing'
import Process from './components/Process'
import Services from './components/Services'
import Stats from './components/Stats'
import Works from './components/Works'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const done = useCallback(() => setIsLoading(false), [])

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : ''
    if (!isLoading) ScrollTrigger.refresh()
  }, [isLoading])

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingScreen onComplete={done} />}</AnimatePresence>
      <Navbar />
      <main>
        <Hero ready={!isLoading} />
        <Services />
        <Finder />
        <Pricing />
        <Process />
        <Works />
        <Stats />
        <Faq />
      </main>
      <Contact />
    </>
  )
}
