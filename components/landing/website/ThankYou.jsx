'use client'

import { useEffect, useState } from 'react'
import { CONTACT, track } from './config'
import { Arrow, Check, Phone } from './icons'
import Footer from './Footer'

const STEPS = [
  ['Request received', 'Your details are with our website team.'],
  ['We check your website', 'Phone layout, speed, trust at first glance and how easy it is to enquire. No website yet? We look at what your customers will need instead.'],
  ['We call you to book a time', `Expect a call from ${CONTACT.phone} or a Melbourne number. We’ll find a time that suits you. A real person, not a call centre.`],
  ['We walk you through your Website Leak Report', 'Every leak, scored, with the fix for each one in plain English. The report is yours to keep either way.'],
]

export default function ThankYou() {
  const [name, setName] = useState('')

  useEffect(() => {
    try {
      const fn = sessionStorage.getItem('shopa_fn')
      if (fn) setName(fn.replace(/[<>]/g, ''))
    } catch {}
    // Fire once per session so a refresh doesn't double-count the lead
    let fired = false
    try { fired = sessionStorage.getItem('shopa_lead_web') === '1' } catch {}
    if (fired) return
    track('generate_lead', { value: 1, currency: 'AUD' })
    let eventID = ''
    try { eventID = sessionStorage.getItem('shopa_event_id') || '' } catch {}
    if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { content_category: 'Website Design' }, eventID ? { eventID } : undefined)
    try { sessionStorage.setItem('shopa_lead_web', '1') } catch {}
  }, [])

  return (
    <>
      <header className="hdr solid">
        <div className="wrap hdr-in">
          <a className="logo" href={CONTACT.site} aria-label="Shopa Marketing home"><img src="/lp/website/logo-white.webp" alt="Shopa Marketing" width="97" height="42" /></a>
          <a className="hdr-phone" href={CONTACT.phoneHref} aria-label={`Call ${CONTACT.phone}`} onClick={() => track('call_click', { source: 'thank_you_header' })}>
            <span className="ring"><Phone width={16} height={16} /></span><span className="hdr-phone-txt"><small>Talk to a strategist</small>{CONTACT.phone}</span>
          </a>
        </div>
      </header>
      <main>
        <section className="ty-hero">
          <div className="hero-bg" aria-hidden="true"><span className="glow g1" /><span className="glow g2" /><span className="grid" /><span className="grain" /></div>
          <div className="wrap">
            <div className="ty-badge" aria-hidden="true"><Check width={36} height={36} /></div>
            <h1>{name ? `Thanks, ${name}!` : 'You’re in!'}<br /><span className="grad-text-light">Your Website Leak Report is underway.</span></h1>
            <p>One of our website strategists will call you to book a time for your report walkthrough.</p>
            <p className="ty-chip"><Phone width={15} height={15} /> Expect a call from <b>{CONTACT.phone}</b></p>
          </div>
        </section>
        <div className="wrap ty-wrap">
          <div className="ty-card">
            <h2>What happens next</h2>
            <ol className="ty-steps">
              {STEPS.map(([h, p], i) => (
                <li key={h} className={i === 0 ? 'done' : undefined} style={{ '--d': `${300 + i * 120}ms` }}>
                  <span className="num">{i === 0 ? <Check width={15} height={15} /> : i + 1}</span>
                  <div><b>{h}{i === 0 && <em>Done</em>}</b><span>{p}</span></div>
                </li>
              ))}
            </ol>
            <div className="ty-prep">
              <strong>Get more out of the call. Have these handy:</strong>
              <ul>
                <li><span className="tick"><Check width={11} height={11} /></span>How most of your customers find you today</li>
                <li><span className="tick"><Check width={11} height={11} /></span>What one regular customer is worth to you</li>
                <li><span className="tick"><Check width={11} height={11} /></span>2–3 websites you like, from any industry</li>
              </ul>
            </div>
          </div>
          <div className="ty-urgent">
            <p>Can’t wait for our call? Ring us now.</p>
            <a className="btn btn-primary" href={CONTACT.phoneHref} onClick={() => track('call_click', { source: 'thank_you' })}><Phone width={16} height={16} /> Call {CONTACT.phone}</a>
          </div>
          <div className="ty-cross">
            <h3>A great website deserves to be found.</h3>
            <p>Ask us about SEO and AI search on your call, so the right customers find you on Google and AI tools.</p>
            <a className="btn btn-outline" href={CONTACT.seo}>See SEO services <Arrow className="arr" width={18} height={18} /></a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

