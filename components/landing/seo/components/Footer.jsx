import { OFFICES, PHONE, PHONE_HREF, SITE, SOCIALS } from '../site.js'
import { track } from '../track.js'
import { trackContact } from '../lib/meta.js'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <img src="/lp/seo/logo-white.webp" alt="Shopa Marketing" width="120" height="52" loading="lazy" />
            <p>One team. One plan. Marketing that actually works together.</p>
            <a className="foot-phone" href={PHONE_HREF} onClick={() => { track('call_click', { location: 'footer' }); trackContact('footer') }}>{PHONE}</a>
          </div>
          <div className="foot-offices">
            {OFFICES.map((o) => (
              <address key={o.region}>
                <b>{o.region}</b>
                {o.lines.map((l) => <span key={l}>{l}</span>)}
              </address>
            ))}
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Shopa Marketing · ABN 48 662 586 558</span>
          <nav aria-label="Social and legal">
            {SOCIALS.map((s) => <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">{s.name}</a>)}
            <a href={`${SITE}/privacy-policy`}>Privacy Policy</a>
            <a href={`${SITE}/terms-of-service`}>Terms of Service</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
