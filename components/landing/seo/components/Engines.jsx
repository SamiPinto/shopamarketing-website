import Icon, { Tick } from './Icon.jsx'
import { goToForm } from '../track.js'

const CARDS = [
  {
    icon: 'search', label: '01 · SEO', title: 'Get found on Google',
    body: 'Most people click one of the first few results on Google. We help your website rank for the searches your buyers actually use, so more of those enquiries come to you, not your competitors.',
    items: ['Fix your website so Google can read it properly', "Write pages that answer your customers' questions", 'Focus on the services and areas that bring you the most business'],
  },
  {
    icon: 'pin', label: '02 · Local SEO', title: 'Get found on Google Maps',
    body: 'When locals search "near me", Google usually shows three businesses on the map first, and they get most of the attention. We help your business compete for one of those spots with a stronger profile and accurate details.',
    items: ['Set up and improve your Google Business Profile', 'Rank for "near me" searches in the suburbs you serve', 'Turn map views into calls, directions and website visits'],
  },
  {
    icon: 'spark', label: '03 · AI SEO', title: 'Get recommended by AI',
    body: "Many buyers now ask ChatGPT and Google's AI for a shortlist before they contact anyone. We help these tools understand and trust your business, so you're more likely to make that shortlist.",
    items: ['Find out which competitors AI recommends, and why', 'Content built around the questions customers ask AI', 'Track your AI mentions month by month'],
  },
]

export default function Engines() {
  return (
    <section className="engines" id="services">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">A connected approach to search</span>
          <h2>Google. Maps. AI search.<br /><span className="grad-text">One connected plan.</span></h2>
          <p>Your customers have different ways to find a business. We bring the work together so your search presence supports the same commercial goals.</p>
        </div>
        <div className="svc-grid">
          {CARDS.map((c, i) => (
            <article key={c.title} className="svc" data-reveal style={{ '--rd': `${i * 120}ms` }}>
              <div className="svc-icon"><Icon name={c.icon} size={26} /></div>
              <div>
                <span className="svc-label">{c.label}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <p className="svc-do">What we do</p>
                <ul className="svc-list">{c.items.map((x) => <li key={x}><Tick />{x}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
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
