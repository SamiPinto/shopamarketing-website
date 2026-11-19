import { useEffect, useState } from 'react'
import LeadForm from './LeadForm.jsx'
import { Stars, Tick } from './Icon.jsx'
import { prefersReducedMotion } from '../hooks.js'
import { RATING } from '../site.js'

const ENGINES = ['Google', 'ChatGPT', 'Gemini', 'Perplexity', 'AI Overviews']

function CyclingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setI((n) => (n + 1) % ENGINES.length), 2200)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="cycle" aria-live="off">
      <span className="cycle-word" key={ENGINES[i]}>{ENGINES[i]}</span>
      <span className="caret" aria-hidden="true" />
    </span>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 className="hero-kicker">SEO &amp; AI SEO Agency in Australia</h1>
          <p className="hero-title">
            <span className="sr-only">Be the answer on Google, ChatGPT, Gemini and Perplexity.</span>
            <span aria-hidden="true">Be the answer on <CyclingWord /></span>
          </p>
          <p className="lead">
            Your customers still Google you. But now they're also asking ChatGPT, Gemini and Perplexity who to call.
            We help your business show up in those answers. <strong>More visibility, more enquiries, zero marketing headaches.</strong>
          </p>
          <ul className="checks">
            <li><Tick />Rank on Google for the searches that actually bring buyers</li>
            <li><Tick />Improve your chances of being recommended in ChatGPT, Gemini, Perplexity and AI Overviews</li>
            <li><Tick />Technical fixes, content and links handled by one team</li>
          </ul>
          <div className="proof">
            <div className="proof-item">
              <b>{RATING.score} <Stars label={`${RATING.score} out of 5 stars`} /></b>
              <span>{RATING.count} Google reviews</span>
            </div>
            <div className="proof-item"><b>1,500+</b><span>businesses supported</span></div>
            <div className="proof-item"><b>5,000+</b><span>campaigns managed</span></div>
          </div>
        </div>
        <LeadForm />
      </div>
    </section>
  )
}
