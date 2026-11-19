import { useEffect, useRef, useState } from 'react'
import { m } from 'framer-motion'
import { QUOTES, Quote } from './Reviews'
import { Arrow, Back, GoogleG, Stars } from './icons'

const SLIDES = [
  { q: 'Nico from Shopa Marketing has been very helpful, he has done exceptional work on my website project, and he has also helped with my online marketing by giving me timely insight into how our marketing trend is going.', hl: 'exceptional work on my website project', who: 'SIA Support Services', initials: 'SS', role: 'Website project' },
  ...QUOTES,
]
const DELAY = 6500

export default function ReviewCarousel() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [auto, setAuto] = useState(false)
  const root = useRef(null)
  const n = SLIDES.length
  const go = (d) => setI((c) => (c + d + n) % n)

  useEffect(() => {
    setAuto(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (!auto || paused) return
    const t = setTimeout(() => go(1), DELAY)
    return () => clearTimeout(t)
  }, [i, auto, paused])

  return (
    <section
      ref={root}
      className={`lp-rc ${auto && !paused ? 'playing' : ''}`}
      aria-roledescription="carousel"
      aria-label="Client reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => { if (!root.current?.contains(e.relatedTarget)) setPaused(false) }}
    >
      <m.div
        className="lp-rc-stage"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragStart={() => setPaused(true)}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50 || info.velocity.x < -400) go(1)
          else if (info.offset.x > 50 || info.velocity.x > 400) go(-1)
          setPaused(false)
        }}
      >
        {SLIDES.map((t, k) => (
          <figure
            key={t.who}
            className={`lp-rc-slide ${k === i ? 'on' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${k + 1} of ${n}`}
            aria-hidden={k !== i}
          >
            <div className="lp-rc-top">
              <Stars size={15} />
              {t.href && (
                <a className="lp-rc-src" href={t.href} target="_blank" rel="noopener noreferrer" tabIndex={k === i ? 0 : -1}>
                  <GoogleG width={14} height={14} />Read on Google<span className="sr-only"> ({t.who}’s review, opens in a new tab)</span>
                </a>
              )}
            </div>
            <blockquote><Quote q={t.q} hl={t.hl} /></blockquote>
            <figcaption><span className="avatar" aria-hidden="true">{t.initials}</span><span><b>{t.who}</b><small>{t.role}</small></span></figcaption>
          </figure>
        ))}
      </m.div>
      <div className="lp-rc-nav">
        <div className="lp-rc-dots">
          {SLIDES.map((t, k) => (
            <button key={t.who} type="button" className={k === i ? 'on' : ''} aria-label={`Show review ${k + 1}: ${t.who}`} aria-current={k === i} onClick={() => setI(k)}>
              <span style={{ animationDuration: `${DELAY}ms` }} />
            </button>
          ))}
        </div>
        <div className="lp-rc-arrows">
          <button type="button" onClick={() => go(-1)} aria-label="Previous review"><Back width={16} height={16} /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next review"><Arrow width={16} height={16} /></button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{paused || !auto ? `Review ${i + 1} of ${n}: ${SLIDES[i].who}` : ''}</p>
    </section>
  )
}
