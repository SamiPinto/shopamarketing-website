import Icon from './Icon.jsx'
import { useInView } from '../hooks.js'

const STEPS = [
  { t: 'Free strategy call', d: "We review your site, your rankings and your AI visibility, and see who's beating you and why." },
  { t: 'Your SEO roadmap', d: 'Keywords, quick wins and priorities, laid out in plain English.' },
  { t: 'Fix, optimise, build', d: 'Technical fixes, content and authority building, all handled for you.' },
  { t: 'Report and grow', d: 'Clear reporting on rankings, traffic and enquiries. Then we keep pushing.' },
]

export default function Process() {
  const [ref, inView] = useInView({ threshold: 0.3 })
  return (
    <section className="process">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">How it works</span>
          <h2>Simple process. Serious results.</h2>
        </div>
        <ol className={`steps${inView ? ' in' : ''}`} ref={ref}>
          {STEPS.map((s, i) => (
            <li className="step" key={s.t} style={{ '--i': i }}>
              <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="timeline-note" data-reveal>
          <Icon name="clock" size={18} />
          <span><strong>Realistic timeline:</strong> most clients see movement within 3–4 months, with substantial traffic growth around 6–12 months depending on competition.</span>
        </p>
      </div>
    </section>
  )
}
