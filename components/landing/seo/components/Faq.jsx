import { useState } from 'react'
import Icon from './Icon.jsx'

export const FAQS = [
  { q: "What's the difference between SEO and AI SEO?", a: "Traditional SEO gets you ranking in Google's results. AI SEO (GEO and AEO) helps tools like ChatGPT, Gemini, Perplexity and Google's AI Overviews understand, trust and recommend your business. Your customers use both, so we optimise for both." },
  { q: 'How long until I see results?', a: 'Most clients start seeing movement within 3–4 months, with substantial traffic growth around 6–12 months depending on how competitive your industry is. We focus on sustainable growth, not magic beans.' },
  { q: 'How much does SEO cost?', a: "It depends on your goals and how competitive your market is. After your strategy call you'll get a clear plan and pricing, with no surprises." },
  { q: 'Do you offer local SEO services?', a: 'Yes. We optimise your Google Business Profile, location pages and business listings so nearby customers can find you on Google Maps and in local search results.' },
  { q: 'Do you work with small businesses?', a: 'Yes. Small business SEO is a core part of what we do. Most of our clients are local and growing businesses across Australia.' },
  { q: 'Do I need a new website before doing SEO?', a: "Not always. We'll tell you honestly whether your current site can rank or whether something is holding it back." },
  { q: 'Is the strategy call really free?', a: "Yep. No obligation, no hard sell. You'll walk away knowing where you stand on Google and AI search, whether you work with us or not." },
]

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="faq-sec">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Questions</span>
          <h2>Good questions, straight answers</h2>
        </div>
        <div className="faq" data-reveal>
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div className={`faq-item${isOpen ? ' open' : ''}`} key={f.q}>
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}>
                    {f.q}<span className="pm"><Icon name="plus" size={18} stroke={2.5} /></span>
                  </button>
                </h3>
                <div className="faq-a" id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
