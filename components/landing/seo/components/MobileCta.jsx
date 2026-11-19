import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import { PHONE_HREF } from '../site.js'
import { goToForm, track } from '../track.js'
import { trackContact } from '../lib/meta.js'

export default function MobileCta() {
  const [formVisible, setFormVisible] = useState(true)
  const [past, setPast] = useState(false)
  useEffect(() => {
    const form = document.getElementById('get-started')
    const io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.15 })
    if (form) io.observe(form)
    const on = () => setPast(window.scrollY > 480)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', on) }
  }, [])
  const show = past && !formVisible

  return (
    <div className={`mcta${show ? ' show' : ''}`} aria-hidden={!show}>
      <a className="btn btn-ghost" href={PHONE_HREF} tabIndex={show ? 0 : -1} onClick={() => { track('call_click', { location: 'sticky' }); trackContact('sticky') }}>
        <Icon name="phone" size={16} /> Call
      </a>
      <a className="btn btn-primary" href="#get-started" tabIndex={show ? 0 : -1} onClick={goToForm}>
        Get a free SEO plan
      </a>
    </div>
  )
}
