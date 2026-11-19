import { CONTACT } from './config'
import { Facebook, Instagram, Linkedin, Mail, Pin } from './icons'

export default function Footer() {
  const s = CONTACT.social
  return (
    <footer className="ftr">
      <div className="wrap ftr-in">
        <div className="ftr-brand">
          <img src="/lp/website/logo-white.webp" alt="Shopa Marketing" width="97" height="42" loading="lazy" />
          <p>One team. One plan.<br />Marketing that actually works together.</p>
        </div>
        <div className="ftr-contact">
          <p><Pin width={15} height={15} /> <span>{CONTACT.auAddress[0]}<br />{CONTACT.auAddress[1]}</span></p>
          {CONTACT.email && <a href={`mailto:${CONTACT.email}`}><Mail width={15} height={15} /> {CONTACT.email}</a>}
        </div>
        <div className="social">
          <a href={s.facebook} target="_blank" rel="noopener noreferrer" aria-label="Shopa Marketing on Facebook"><Facebook width={18} height={18} /></a>
          <a href={s.instagram} target="_blank" rel="noopener noreferrer" aria-label="Shopa Marketing on Instagram"><Instagram width={18} height={18} /></a>
          <a href={s.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Shopa Marketing on LinkedIn"><Linkedin width={18} height={18} /></a>
        </div>
      </div>
      <div className="wrap ftr-base">
        <span>© {new Date().getFullYear()} Shopa Marketing</span>
        <a href={CONTACT.privacy}>Privacy policy</a>
      </div>
    </footer>
  )
}
