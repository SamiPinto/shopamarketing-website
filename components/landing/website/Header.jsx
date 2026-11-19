import { useEffect, useState } from 'react'
import { m } from 'framer-motion'
import { Arrow } from './icons'

export default function Header({ onCta }) {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header className={`hdr ${solid ? 'solid' : ''}`}>
      <div className="wrap hdr-in">
        <a className="logo" href="#top" aria-label="Shopa Marketing, back to top">
          <img src="/lp/website/logo-white.webp" alt="Shopa Marketing" width="97" height="42" />
        </a>
        <div className="hdr-right">
          <m.button type="button" className="btn btn-primary btn-sm" onClick={onCta} whileTap={{ scale: 0.97 }}>
            Book a call <Arrow className="arr" width={16} height={16} />
          </m.button>
        </div>
      </div>
    </header>
  )
}
