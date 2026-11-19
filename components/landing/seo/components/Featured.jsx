const OUTLETS = [
  { name: 'CEO Weekly', src: '/lp/seo/press/ceo-weekly.webp', w: 981, h: 264 },
  { name: 'Business Insider', src: '/lp/seo/press/business-insider.png', w: 389, h: 129 },
  { name: 'The Guardian', src: '/lp/seo/press/the-guardian.webp', w: 600, h: 70 },
  { name: 'Associated Press', src: '/lp/seo/press/ap.png', w: 885, h: 1024 },
  { name: 'The American Reporter', src: '/lp/seo/press/the-american-reporter-v2.svg', w: 720, h: 66 },
  { name: 'US Insider', src: '/lp/seo/press/us-insider.svg', w: 210, h: 96 },
]

export default function Featured() {
  return (
    <div className="featured">
      <div className="wrap featured-row">
        <small>As featured in</small>
        <ul className="press">
          {OUTLETS.map((o) => (
            <li key={o.name}>
              <img src={o.src} alt={o.name} width={o.w} height={o.h} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
