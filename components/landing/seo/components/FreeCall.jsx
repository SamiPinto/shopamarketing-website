import Icon, { Tick } from './Icon.jsx'
import { goToForm } from '../track.js'

const ITEMS = [
  'Where you rank on Google today, and for which searches',
  'What ChatGPT, Gemini and Perplexity say when asked about your industry',
  "Who's beating you in your area, and why",
  'The quick wins you could action this month',
  'A realistic timeline and clear pricing, with no surprises',
]

export default function FreeCall() {
  return (
    <section className="freecall">
      <div className="wrap freecall-grid">
        <div data-reveal>
          <span className="eyebrow">Your free strategy call</span>
          <h2>Walk away with a plan, <span className="grad-text">whether you hire us or not.</span></h2>
          <p>No obligation, no hard sell. Just an honest look at where you stand on Google and AI search, from the people who do this every day.</p>
          <a href="#get-started" className="btn btn-primary" onClick={goToForm}>Get a free SEO plan <Icon name="arrow" size={18} className="arr" /></a>
        </div>
        <div className="call-card" data-reveal style={{ '--rd': '120ms' }}>
          <div className="call-card-head"><Icon name="gift" size={20} /> On the call you'll learn</div>
          <ul>{ITEMS.map((x) => <li key={x}><Tick />{x}</li>)}</ul>
          <div className="call-card-foot"><span>Value to you</span><b>Free · 100% yours to keep</b></div>
        </div>
      </div>
    </section>
  )
}
