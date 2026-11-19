'use client'

import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Icon from './components/Icon.jsx'
import { PHONE, PHONE_HREF, SITE } from './site.js'
import { track } from './track.js'
import { trackContact } from './lib/meta.js'

const STEPS = [
  { t: 'We take a look under the bonnet', d: "Before we chat, we'll review how your site performs on Google and whether AI tools like ChatGPT and Perplexity are recommending you (or your competitors)." },
  { t: 'We call to book your strategy session', d: 'Keep an eye on your phone. One of our specialists will call you to learn more about your business.' },
  { t: 'You get a clear, honest plan', d: "Where the quick wins are, what it'll take to rank, and realistic timeframes. No jargon, no magic beans." },
]

function useFirstName() {
  const [fn, setFn] = useState('')
  useEffect(() => {
    try { setFn((sessionStorage.getItem('shopa_fn') || '').replace(/[<>]/g, '').slice(0, 40)) } catch { /* private mode */ }
  }, [])
  return fn
}

function useLeadConversion() {
  useEffect(() => {
    let pending = false
    try { pending = sessionStorage.getItem('shopa_lead_pending') === '1' } catch { /* private mode */ }
    if (!pending) return
    try { sessionStorage.removeItem('shopa_lead_pending') } catch { /* private mode */ }
    ;(window.dataLayer = window.dataLayer || []).push({ event: 'generate_lead', lead_service: 'seo', value: 1, currency: 'AUD' })
    if (typeof window.oaiq === 'function') window.oaiq('measure', 'lead_created', { type: 'customer_action' })
  }, [])
}

export default function Thanks() {
  const fn = useFirstName()
  useLeadConversion()
  return (
    <>
      <Header cta={false} />
      <main className="ty">
        <section className="ty-hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="wrap ty-wrap">
            <div className="ty-badge"><Icon name="check" size={40} stroke={3} /></div>
            <h1>{fn ? `Thanks, ${fn}!` : "You're in!"}<br /><span className="grad-text-light">Let's get you found.</span></h1>
            <p>Thanks for getting in touch. One of our SEO strategists will contact you to book your free strategy call.</p>
          </div>
        </section>

        <div className="wrap ty-wrap ty-body">
          <div className="ty-card">
            <h2>What happens next?</h2>
            <ol className="ty-steps">
              {STEPS.map((s, i) => (
                <li key={s.t} style={{ '--i': i }}><span className="step-num">{i + 1}</span><div><b>{s.t}</b><p>{s.d}</p></div></li>
              ))}
            </ol>
            <div className="prep">
              <strong>Want to get more out of the call? Have these handy:</strong>
              <ul>
                <li>The 3–5 services or products you most want more enquiries for</li>
                <li>A couple of competitors who seem to show up everywhere</li>
                <li>Access to Google Search Console or Analytics, if you have it</li>
              </ul>
            </div>
          </div>

          <div className="ty-urgent">
            <p>Can't wait? We'd love to chat now.</p>
            <a className="btn btn-primary btn-lg" href={PHONE_HREF} onClick={() => { track('call_click', { location: 'thank_you' }); trackContact('thank_you') }}>
              <Icon name="phone" size={16} /> Call {PHONE}
            </a>
          </div>

          <div className="cross">
            <div>
              <h3>Traffic is great. Enquiries are better.</h3>
              <p>If your website's looking a bit tired, more visitors won't fix it. Ask us about a revamp on your call. SEO and a site built to convert work best together.</p>
            </div>
            <a className="btn btn-ghost-dark" href={`${SITE}/services/website`}>See website design <Icon name="arrow" size={16} className="arr" /></a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
