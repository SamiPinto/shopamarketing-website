import { useCountUp, useInView } from '../hooks.js'
import { RATING } from '../site.js'

function Stat({ to, decimals = 0, suffix = '', label, run }) {
  const v = useCountUp(to, run)
  return (
    <div className="stat">
      <b className="grad-text">{v.toLocaleString('en-AU', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}<small>{suffix}</small></b>
      <p>{label}</p>
    </div>
  )
}

export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.4 })
  return (
    <section className="stats-sec">
      <div className="wrap">
        <div className="stat-grid" ref={ref}>
          <Stat to={Number(RATING.score)} decimals={1} suffix="★" label="Average Google rating" run={inView} />
          <Stat to={RATING.count} label="Verified Google reviews" run={inView} />
          <Stat to={1500} suffix="+" label="Businesses supported" run={inView} />
          <Stat to={5000} suffix="+" label="Campaigns managed" run={inView} />
        </div>
        <p className="why-note" data-reveal>Good SEO gets you on Google. Great SEO gets you named by AI too. <strong>We do both.</strong></p>
      </div>
    </section>
  )
}
