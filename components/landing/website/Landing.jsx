'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, LazyMotion, MotionConfig, domMax, m } from 'framer-motion'
import { ease, track } from './config'
import Header from './Header'
import Footer from './Footer'
import { Reveal } from './Reveal'
import { Arrow, Check, GoogleG, Lock, Refresh, Shield, Stars, Tag, X } from './icons'
import LeakForm from './LeakForm'
import ReviewCarousel from './ReviewCarousel'
import { useCountUpOnView, useInView } from './hooks'

const HEADLINES = {
  c01: ['AI can build a website in ten minutes.', 'Your customers judge it in five seconds.'],
  c02: ['You paid for the click.', 'Then your mobile site made them wait.'],
  c03: ['A beautiful website can still make customers work too hard.', 'We build the easy version.'],
}

const WORK = [
  { id: 'annes', name: "Anne's Angels", what: 'NDIS provider, Highfields QLD', url: 'https://www.annesangels.com.au/', host: 'annesangels.com.au' },
  { id: 'erskine', name: 'Erskine Pets', what: 'Pet shop, Falcon WA', url: 'https://www.erskinepets.com.au/', host: 'erskinepets.com.au' },
  { id: 'aayds', name: 'All About You Disability Support', what: 'NDIS provider, Moreton Bay QLD', url: 'https://www.allaboutyoudisabilitysupport.com.au/', host: 'allaboutyoudisabilitysupport.com.au' },
  { id: 'parkmore', name: 'Parkmore Family Dental', what: 'Dentist, Keysborough VIC', url: 'https://parkmorefamilydental.com.au/', host: 'parkmorefamilydental.com.au' },
]

export default function Landing() {
  const [step, setStep] = useState(0)
  const [site, setSite] = useState('')
  const [h1, setH1] = useState(HEADLINES.c01)
  const formRef = useRef(null)

  useEffect(() => {
    const q = new URLSearchParams(location.search)
    const key = (q.get('ad') || q.get('utm_content') || '').toLowerCase().slice(0, 3)
    if (HEADLINES[key]) setH1(HEADLINES[key])
  }, [])

  const book = useCallback((source) => {
    track('cta_click', { source })
    setStep(1)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <a className="skip" href="#lead">Skip to the form</a>
        <Header onCta={() => book('header')} />
        <main>
          <Hero h1={h1} step={step} setStep={setStep} setSite={setSite} formRef={formRef} />
          <WhatYouGet site={site} />
          <Result />
          <Fit onCta={() => book('fit')} />
          <NoSurprises />
          <Close onCta={() => book('close')} />
        </main>
        <Footer />
        <StickyCta formRef={formRef} onCta={() => book('sticky')} />
      </MotionConfig>
    </LazyMotion>
  )
}

function Hero({ h1, step, setStep, setSite, formRef }) {
  return (
    <section className="lp-hero" id="top">
      <div className="hero-bg" aria-hidden="true"><div className="glow g1" /><div className="glow g2" /><div className="grid" /><div className="grain" /></div>
      <div className="wrap lp-hero-grid">
        <div className="lp-hero-head">
          <h1 className="lp-h1">
            <span className="ln"><span style={{ '--i': 0 }}>{h1[0]}</span></span>{' '}
            <span className="ln"><span className="grad-text-light" style={{ '--i': 1 }}>{h1[1]}</span></span>
          </h1>
        </div>
        <div className="lp-hero-info load" style={{ '--i': 3 }}>
          <p className="lp-lede">Custom websites built around how your customers decide. Fixed price in writing &amp; a lifetime warranty on technical issues*.</p>
          <ul className="lp-trust">
            <li><GoogleG width={18} height={18} /><Stars size={14} /> <span><b>4.8</b> from 400+ Google reviews</span></li>
            <li><span className="lp-trust-dot" aria-hidden="true" /><span><b>1,500+</b> businesses a year</span></li>
          </ul>
          <ReviewCarousel />
        </div>
        <div className="lp-hero-card load" style={{ '--i': 2 }}>
          <LeakForm step={step} setStep={setStep} onSite={setSite} formRef={formRef} />
        </div>
      </div>
    </section>
  )
}

function Kicker({ n, children, dark }) {
  return <p className={`lp-kicker ${dark ? 'dark' : ''}`}><span className="lp-kn">{String(n).padStart(2, '0')}</span><span>{children}</span></p>
}

const ROWS = [
  ['no', 'Mobile responsiveness', 'layout breaks'],
  ['mid', 'Trust at first glance', 'no reviews shown'],
  ['ok', 'What you do, in 5 seconds', 'clear'],
  ['no', 'How easy it is to enquire', 'form hard to find'],
]

function WhatYouGet({ site }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.45 })
  return (
    <section className="lp-sec lp-tint" aria-labelledby="t-get">
      <div className="wrap">
        <Reveal className="lp-head">
          <Kicker n={1}>What you get</Kicker>
          <h2 id="t-get">A 1-page report on your site, <span className="grad-text">in plain English.</span></h2>
        </Reveal>
        <div className="lp-get">
          <div ref={ref} className={`lp-report ${inView ? 'scan' : ''} ${site ? 'yours' : ''}`} aria-label="Example of what you receive">
            <div className="lp-report-top">
              <span className="lp-report-mark" aria-hidden="true"><img src="/lp/website/favicon.png" alt="" width="20" height="20" /></span>
              <div><b>Website Leak Report</b><AnimatePresence mode="wait" initial={false}><m.span key={site || 'default'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>{site || 'yourbusiness.com.au'}</m.span></AnimatePresence></div>
              <span className="lp-report-score" aria-hidden="true"><b>2</b> leaks</span>
            </div>
            <ul className="lp-report-rows">
              {ROWS.map(([s, k, v], i) => (
                <li key={k} className={`r-${s}`} style={{ '--i': i }}><i aria-hidden="true" /><span>{k}</span><em>{v}</em></li>
              ))}
            </ul>
            <span className="lp-report-beam" aria-hidden="true" />
            <p className="lp-report-foot">Illustrative example. Yours is written for your site, with the fix for each leak.</p>
          </div>
          <ol className="lp-gets">
            {[
              ['Every leak, scored', 'Phone layout, speed, trust and the enquiry path.'],
              ['The fix for each leak', 'What to change first, whether you work with us or not.'],
              ['A free call to walk you through it', 'In plain English. The report is yours to keep either way.'],
            ].map(([b, s], i) => (
              <Reveal as="li" key={b} delay={i * 0.08}><span className="lp-gets-n" aria-hidden="true">{i + 1}</span><div><b>{b}</b><span>{s}</span></div></Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Result() {
  const bigRef = useRef(null)
  const n = useCountUpOnView(bigRef, 1500)
  return (
    <section className="lp-sec lp-dark" aria-labelledby="t-res">
      <div className="hero-bg" aria-hidden="true"><div className="glow g1" /><div className="grain" /></div>
      <div className="wrap lp-rel">
        <Reveal className="lp-head">
          <Kicker n={2} dark>Real result</Kicker>
          <h2 id="t-res">Business owners who <span className="grad-text-light">stopped putting it off.</span></h2>
        </Reveal>
        <div className="lp-story">
          <Reveal className="lp-big"><b ref={bigRef}>{n.toLocaleString('en-AU')}+</b><p>businesses a year work with Shopa. Dentists, NDIS providers, pet shops, pubs and mortgage brokers among them.</p></Reveal>
          <Reveal className="lp-tell" delay={0.1}>
            <blockquote>“I couldn't have done it on my own and was always putting it off, until I met Tom at Shopa Marketing. Result is excellent.”</blockquote>
            <p className="lp-tell-who"><span className="avatar" aria-hidden="true">LT</span><span><b>Lynne Tompkins</b>Mortgage broker, LMT Finance, Geelong</span></p>
            <p className="lp-tell-note"><Refresh width={16} height={16} /> Most business websites go from kickoff to launch in 4 to 8 weeks, with a fixed price in writing first.</p>
          </Reveal>
        </div>
        <p className="lp-work-label">Recent websites we built</p>
        <div className="lp-work">
          {WORK.map((w, i) => <WorkCard key={w.id} w={w} i={i} />)}
        </div>
        <p className="lp-rating"><GoogleG width={18} height={18} /><Stars size={15} /> 4.8 average from 400+ Google reviews</p>
      </div>
    </section>
  )
}

function WorkCard({ w, i }) {
  const vid = useRef(null)
  useEffect(() => {
    const v = vid.current
    if (!v || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!v.getAttribute('src')) v.src = v.dataset.src; v.play().catch(() => {}) }
      else if (!v.paused) v.pause()
    }, { rootMargin: '200px 0px', threshold: 0.2 })
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <Reveal as="article" className="lp-wcard" delay={(i % 2) * 0.08}>
      <div className="lp-browser">
        <div className="lp-bar3"><i /><i /><i /><span>{w.host}</span></div>
        <video ref={vid} muted loop playsInline preload="none" poster={`/lp/website/work/work-${w.id}.webp`} data-src={`/lp/website/work/work-${w.id}.mp4`} width="1200" height="750" aria-label={`${w.name} website, built by Shopa Marketing, scrolling through the live site`} />
      </div>
      <div className="lp-wmeta">
        <div><b>{w.name}</b><span>{w.what}</span></div>
        <a href={w.url} target="_blank" rel="noopener">View the live site <Arrow width={14} height={14} /></a>
      </div>
    </Reveal>
  )
}

function Fit({ onCta }) {
  return (
    <section className="lp-sec lp-tint" aria-labelledby="t-fit">
      <div className="wrap">
        <Reveal className="lp-head">
          <Kicker n={3}>Is this for you?</Kicker>
          <h2 id="t-fit">We're the right fit for some owners, <span className="grad-text">not all.</span></h2>
        </Reveal>
        <div className="lp-fit">
          <Reveal className="lp-fit-yes">
            <h3>This is for you if</h3>
            <ul>
              {['Your website is more than three years old, or you don\'t have one', 'Enquiries come from word of mouth and you want a second source', 'You want one team to build it and look after it', 'You want the full price in writing before you say yes'].map((t) => <li key={t}><span className="tick"><Check width={11} height={11} /></span>{t}</li>)}
            </ul>
          </Reveal>
          <Reveal className="lp-fit-no" delay={0.08}>
            <h3>Probably not for you if</h3>
            <ul>
              {['You need a site live this week', 'You want the cheapest template possible', 'You plan to run the site yourself and never touch it again', 'You\'re after a one-off logo or a single page'].map((t) => <li key={t}><span className="lp-x"><X width={11} height={11} /></span>{t}</li>)}
            </ul>
          </Reveal>
        </div>
        <div className="lp-cta-row">
          <m.button type="button" className="btn btn-primary" onClick={onCta} whileTap={{ scale: 0.97 }}>Book a call <Arrow className="arr" width={16} height={16} /></m.button>
          <span className="lp-cta-note">Takes about 30 seconds. No card, no contract.</span>
        </div>
      </div>
    </section>
  )
}

const TILES = [
  [Tag, 'A fixed price, in writing', 'The price we quote is the price you pay.'],
  [Refresh, '12 months of maintenance', 'Security, updates, backups and support from launch day.'],
  [Shield, 'A lifetime glitch guarantee', 'If something technical breaks in the site we built, we fix it.'],
  [Lock, "It's yours", 'You own your website. No lock-in contracts.'],
]

function NoSurprises() {
  return (
    <section className="lp-sec" aria-labelledby="t-sh">
      <div className="wrap">
        <Reveal className="lp-head">
          <Kicker n={4}>No surprises</Kicker>
          <h2 id="t-sh">You know what you're getting <span className="grad-text">before you start.</span></h2>
        </Reveal>
        <div className="lp-shield">
          {TILES.map(([Ic, b, p], i) => (
            <Reveal key={b} className="lp-tile" delay={i * 0.06}>
              <span className="lp-tile-ic"><Ic width={22} height={22} /></span>
              <b>{b}</b>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="lp-timeline">
          <div className="lp-tl-row"><span>Most business websites</span><div className="lp-tl-track"><i style={{ '--from': 4, '--to': 8 }} /></div><b>4–8 weeks</b></div>
          <div className="lp-tl-row"><span>Larger custom builds</span><div className="lp-tl-track"><i style={{ '--from': 10, '--to': 16 }} /></div><b>10–16 weeks</b></div>
          <p className="sr-only">Most business websites go from kickoff to launch in 4 to 8 weeks. Larger custom builds usually take 10 to 16 weeks.</p>
        </Reveal>
      </div>
    </section>
  )
}

function Close({ onCta }) {
  return (
    <section className="lp-close" id="final-cta" aria-labelledby="t-cl">
      <div className="wrap">
        <div className="lp-close-card">
          <div className="final-bg" aria-hidden="true"><div className="glow g1" /><div className="glow g2" /><div className="grain" /></div>
          <h2 id="t-cl">Stop putting it <span className="grad-text-light">off.</span></h2>
          <p>Your free Website Leak Report and a call with a real person. The report is yours to keep either way.</p>
          <div className="lp-close-btns">
            <m.button type="button" className="btn btn-light" onClick={onCta} whileTap={{ scale: 0.97 }}>Book a call <Arrow className="arr" width={16} height={16} /></m.button>
          </div>
        </div>
      </div>
    </section>
  )
}

function StickyCta({ formRef, onCta }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const card = formRef.current
    const end = document.getElementById('final-cta')
    if (!card || !('IntersectionObserver' in window)) return
    const state = { card: true, end: false, below: false }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.target === card) { state.card = e.isIntersecting; state.below = e.boundingClientRect.top < 0 }
        else state.end = e.isIntersecting
      })
      setShow(!state.card && state.below && !state.end)
    }, { threshold: 0.15 })
    io.observe(card)
    if (end) io.observe(end)
    return () => io.disconnect()
  }, [formRef])
  return (
    <AnimatePresence>
      {show && (
        <m.div className="mcta lp-sticky" initial={{ y: '130%' }} animate={{ y: 0, transition: { duration: 0.35, ease: ease.ios } }} exit={{ y: '130%', transition: { duration: 0.2 } }}>
          <m.button type="button" className="btn btn-primary" onClick={onCta} whileTap={{ scale: 0.97 }}>Book a call <Arrow className="arr" width={16} height={16} /></m.button>
        </m.div>
      )}
    </AnimatePresence>
  )
}
