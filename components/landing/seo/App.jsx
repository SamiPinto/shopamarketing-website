'use client'

import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Featured from './components/Featured.jsx'
import AiSearch from './components/AiSearch.jsx'
import Engines from './components/Engines.jsx'
import Results from './components/Results.jsx'
import Stats from './components/Stats.jsx'
import Process from './components/Process.jsx'
import Reviews from './components/Reviews.jsx'
import FreeCall from './components/FreeCall.jsx'
import Faq from './components/Faq.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'
import MobileCta from './components/MobileCta.jsx'
import Schema from './components/Schema.jsx'
import { useReveal } from './hooks.js'

export default function App() {
  useReveal()
  return (
    <>
      <Schema />
      <a className="skip" href="#get-started">Skip to the form</a>
      <Header />
      <main>
        <Hero />
        <Featured />
        <AiSearch />
        <Engines />
        <Results />
        <Stats />
        <Process />
        <Reviews />
        <FreeCall />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileCta />
    </>
  )
}
