import { useEffect, useRef, useState } from 'react'
import { goToForm } from '../track.js'
import { prefersReducedMotion } from '../hooks.js'

const SHIFTS = [
  { n: '01', t: 'Customers ask AI, not just Google', d: "If AI doesn't know you, you're not on the shortlist." },
  { n: '02', t: 'Answers appear before the click', d: "Google's AI Overviews answer at the top of the page. Be the source they quote." },
  { n: '03', t: 'AI recommends who it trusts', d: 'Structure, authority and consistent signals decide who gets named.' },
]

function AiVideo() {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v || prefersReducedMotion()) return
    v.muted = true // keep autoplay working after the pre-rendered HTML is hydrated
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (v.preload !== 'auto') { v.preload = 'auto'; v.load() }
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    }, { rootMargin: '300px 0px' })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <figure className={`ai-visual ai-video${playing ? ' is-playing' : ''}`}>
      <video ref={ref} src="/lp/seo/ai-search.mp4" muted loop playsInline preload="none" width="1200" height="1200"
        aria-hidden="true" onPlaying={() => setPlaying(true)} />
      <img src="/lp/seo/ai-search-poster.webp" width="1200" height="1200" loading="lazy" decoding="async"
        alt="Google AI Mode answering 'Recommend a good dentist in Melbourne' by naming a local dental practice" />
    </figure>
  )
}

export default function AiSearch() {
  return (
    <section className="ai-sec" id="ai">
      <div className="wrap ai-grid">
        <div className="ai-copy" data-reveal>
          <span className="eyebrow">Search has changed</span>
          <h2>There's a new front door. <span className="grad-text">Are you behind it?</span></h2>
          <p className="ai-intro">Ranking on page one used to be the whole game. Now buyers ask AI for a shortlist, and many businesses haven't caught up yet.</p>
          <ol className="shift-list">
            {SHIFTS.map((s) => (
              <li key={s.n}><span className="shift-n">{s.n}</span><div><b>{s.t}</b><p>{s.d}</p></div></li>
            ))}
          </ol>
          <p className="ai-fine">Want to know what AI <em>actually</em> says about your business?{' '}
            <a href="#get-started" onClick={goToForm}>We'll check it on your free call →</a></p>
        </div>

        <div data-reveal style={{ '--rd': '120ms' }}>
          <AiVideo />
        </div>
      </div>
    </section>
  )
}
