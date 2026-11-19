import Icon from './Icon.jsx'
import { PHONE, PHONE_HREF } from '../site.js'
import { goToForm, track } from '../track.js'
import { trackContact } from '../lib/meta.js'

export default function FinalCta() {
  return (
    <section className="final">
      <div className="wrap">
        <div className="final-box" data-reveal>
          <h2>Stop being the best-kept secret in your industry.</h2>
          <p>Book a free SEO strategy call and find out how to get found on Google and recommended by AI.</p>
          <div className="final-actions">
            <a href="#get-started" className="btn btn-primary btn-lg" onClick={goToForm}>Get a free SEO plan <Icon name="arrow" size={18} className="arr" /></a>
            <a href={PHONE_HREF} className="btn btn-ghost-dark btn-lg" onClick={() => { track('call_click', { location: 'final' }); trackContact('final') }}>
              <Icon name="phone" size={16} /> Call {PHONE}
            </a>
          </div>
          <p className="final-fine">Free strategy call · No obligation</p>
        </div>
      </div>
    </section>
  )
}
