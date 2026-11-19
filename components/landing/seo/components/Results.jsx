import Icon from './Icon.jsx'
import { goToForm } from '../track.js'

// Real SEO client results, taken from Shopa Marketing case studies (client names left out on purpose).
const RESULTS = [
  {
    tag: 'Melbourne · 2 clinics', title: 'Dental practice',
    big: '103x', cap: 'More monthly visits from Google',
    from: 'Feb 2024', to: 'Feb 2026', start: 3,
    points: [['133 → 13,779', ' monthly visits'], ['2 → 188', ' keywords in the top 3'], ['330', ' enquiries in 12 months']],
  },
  {
    tag: 'Australia-wide', title: 'Accounting firm',
    big: '27x', cap: 'More clicks from Google in 11 months',
    from: 'Oct 2025', to: 'Aug 2026', start: 4,
    points: [['~800', ' mentions in Google AI and Gemini'], ['109', ' enquiries from Google'], ['45', ' booking requests']],
  },
  {
    tag: 'Australia · online courses', title: 'Online college',
    big: '100x+', cap: 'More monthly visits from Google',
    from: 'Jul 2024', to: 'Now', start: 2,
    points: [['#1 on Google', ' for target keywords within 8 months'], ['164,000+', ' Google impressions for one guide in 12 months'], ['', 'Cited in AI answers across ', '5 countries']],
  },
]

export default function Results() {
  return (
    <section className="results-sec" id="results">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">SEO results</span>
          <h2>Real results for real businesses</h2>
          <p>A few of the businesses we've helped get found on Google and in AI search.</p>
        </div>
        <div className="res-grid">
          {RESULTS.map((r, i) => (
            <article key={r.title} className="res-card" data-reveal style={{ '--rd': `${i * 120}ms` }}>
              <span className="res-tag">{r.tag}</span>
              <h3>{r.title}</h3>
              <p className="res-big grad-text">{r.big}</p>
              <p className="res-cap">{r.cap}</p>
              <div className="res-bars" aria-hidden="true">
                <div className="res-bar"><span>{r.from}</span><i style={{ width: `${r.start}%` }} /></div>
                <div className="res-bar after"><span>{r.to}</span><i /></div>
              </div>
              <ul className="res-list">
                {r.points.map(([b, t, b2]) => <li key={b + t}>{b && <b>{b}</b>}{t}{b2 && <b>{b2}</b>}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <p className="res-note">Results from real Shopa Marketing SEO clients. Results vary by business, industry and competition.</p>
        <div className="svc-cta" data-reveal>
          <a href="#get-started" className="btn btn-primary btn-lg" onClick={goToForm}>
            Get a free SEO plan <Icon name="arrow" size={18} className="arr" />
          </a>
          <span>Free strategy call · No obligation</span>
        </div>
      </div>
    </section>
  )
}
