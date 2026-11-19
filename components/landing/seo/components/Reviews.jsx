import { Stars } from './Icon.jsx'
import { RATING } from '../site.js'

const REVIEWS = [
  { q: 'I’ve been working with the Shopa Marketing team for a long time, and they have been nothing but fantastic. They are incredibly responsive and professional. Shopa Marketing designed my website (sreg.com.au) and are managing my SEO for over a year now, helping my online presence grow steadily. I’ve also been advertising with them in IGAs and medical centres for the past few months and couldn’t be happier with the results. I highly recommend them to anyone looking for local or digital advertising. Special shoutout to Shaan Newman, who is knowledgeable and truly knows what he’s doing! This company is a one stop shop for all advertising needs.', who: 'TJ Kooner', sub: 'Website, SEO and advertising' },
  { q: 'I worked with Shopa Marketing late last year to improve my SEO in Google and update blogs for my website at Deb’s Design Lab. Over only a few months my sales increased and my Google ranking went up! Very pleased with the result. Thank you Neil, Gary and team.', who: 'Deb’s Design Lab', sub: 'SEO and blog content' },
  { q: 'Thank you for all your support and guidance. We’ve had such a positive and easy experience working with you to help promote our business, StoMac Plumbing. We really appreciate the effort, communication and professionalism from Shopa Marketing in helping us grow our online presence and showcase our services.', who: 'Brooke Macnaughtan', sub: 'StoMac Plumbing' },
  { q: 'Royal Park Dental uses Shopa Marketing and are pleased with their customer service and product. Thank you for your patience and being so accommodating to our needs. Highly recommend!', who: 'Royal Park Dental' },
  { q: 'We really appreciate Shopa Marketing and their service. Their employees are reliable and quick to action anything you need.', who: 'First Step Fertility' },
  { q: 'Very professional and very helpful with building a new business website and online marketing.', who: 'Independent Property Sales' },
]

export default function Reviews() {
  return (
    <section className="reviews">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Don't take our word for it</span>
          <h2>Trusted by 1,500+ businesses</h2>
        </div>
        <div className="tests">
          {REVIEWS.map((r, i) => (
            <figure className="test" key={r.who} data-reveal style={{ '--rd': `${(i % 3) * 90}ms` }}>
              <Stars />
              <blockquote>“{r.q}”</blockquote>
              <figcaption><span className="avatar" aria-hidden="true">{r.who.split(' ').slice(0, 2).map((w) => w[0]).join('')}</span>
                <span><b>{r.who}</b><small>{r.sub || 'Shopa Marketing client'}</small></span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="rating-bar" data-reveal>
          <span className="g-badge" aria-hidden="true">G</span>
          <Stars label={`${RATING.score} out of 5`} /> <span><b>{RATING.score} average</b> from {RATING.count} verified Google reviews</span>
        </div>
      </div>
    </section>
  )
}
