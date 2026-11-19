import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import { PHONE, PHONE_HREF, SITE } from '../site.js'
import { goToForm, track } from '../track.js'
import { trackContact } from '../lib/meta.js'

export default function Header({ cta = true }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap nav">
        <a className="logo" href={cta ? '#top' : SITE} aria-label="Shopa Marketing home">
          <img src="/lp/seo/logo-white.webp" alt="Shopa Marketing" width="120" height="52" />
        </a>
        <div className="nav-right">
          <a className="nav-phone" href={PHONE_HREF} aria-label={`Call ${PHONE}`} onClick={() => { track('call_click', { location: 'header' }); trackContact('header') }}>
            <span className="nav-phone-ic"><Icon name="phone" size={16} /></span>
            <span className="nav-phone-txt"><small>Talk to a strategist</small>{PHONE}</span>
          </a>
          {cta && (
            <a className="btn btn-primary btn-sm" href="#get-started" onClick={goToForm}>
              Get a free SEO plan
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
