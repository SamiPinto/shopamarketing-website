import { useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { CONTACT, FORM_ENDPOINT, THANK_YOU, ease, track } from './config'
import { Arrow, Back, Lock } from './icons'
import { useCountTo } from './hooks'

const TRACKING_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'ad', 'gclid', 'fbclid']
const WHEN = [['now', 'Now'], ['1-3', '1-3 months'], ['later', 'Later']]
const RULES = {
  site: (v, f) => !f.nosite && !/\w\.[a-z]{2,}/i.test(v) && 'Add your web address, or tick "I don\'t have a website yet"',
  when: (v) => !v && 'Pick when you need it',
  name: (v) => v.trim().length < 2 && 'Please add your full name',
  biz: (v) => v.trim().length < 2 && 'Please add your business name',
  email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) && 'Please add a valid email, like you@business.com.au',
  phone: (v) => v.replace(/\D/g, '').length < 8 && 'Please add a mobile we can reach you on',
}
const ORDER = ['site', 'when', 'name', 'biz', 'email', 'phone']

const money = (n) => '$' + Math.round(n).toLocaleString('en-AU')
const digits = (s) => Math.max(0, parseFloat(String(s).replace(/[^0-9.]/g, '')) || 0)
const cookie = (n) => (document.cookie.match('(?:^|; )' + n + '=([^;]*)') || [])[1] || ''
export const cleanDomain = (s) => s.trim().replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/.*$/, '')

export default function LeakForm({ step, setStep, onSite, formRef }) {
  const [lost, setLost] = useState(2)
  const [cv, setCv] = useState('2,000')
  const [usedCalc, setUsedCalc] = useState(false)
  const [withMaths, setWithMaths] = useState(false)
  const [f, setF] = useState({ site: '', nosite: false, when: '', name: '', biz: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [psi, setPsi] = useState(null)
  const psiStarted = useRef(false)
  const started = useRef(false)
  const mountedAt = useRef(Date.now())
  const hp = useRef(null)

  const value = digits(cv)
  const total = lost * value
  const shown = useCountTo(total)

  const calcInput = (fn) => (e) => {
    fn(e.target.value)
    if (!usedCalc) { setUsedCalc(true); track('calculator_used'); window.fbq?.('trackCustom', 'CalculatorUsed', { service: 'websites' }) }
  }

  const toStep2 = (maths) => {
    setWithMaths(maths)
    setStep(1)
    track('form_step', { step: 2, with_maths: maths })
  }

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    if (!started.current) { started.current = true; track('form_start') }
    setF((p) => {
      const next = { ...p, [k]: v }
      if (errors[k] || (k === 'nosite' && errors.site)) setErrors((er) => ({ ...er, [k]: RULES[k]?.(next[k], next), site: RULES.site(next.site, next) }))
      return next
    })
    if (k === 'nosite') onSite(v ? '' : cleanDomain(f.site))
  }

  const siteDone = () => {
    if (f.nosite || !/\w\.[a-z]{2,}/i.test(f.site)) return
    onSite(cleanDomain(f.site))
    window.fbq?.('trackCustom', 'StartEnquiry', { service: 'websites' })
    runSpeedCheck(f.site)
  }

  const runSpeedCheck = (raw) => {
    if (psiStarted.current) return
    psiStarted.current = true
    const url = /^https?:\/\//i.test(raw) ? raw : 'https://' + raw.trim()
    setPsi({ state: 'loading' })
    fetch('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?strategy=mobile&category=performance&url=' + encodeURIComponent(url))
      .then((r) => r.json())
      .then((j) => {
        const lr = j?.lighthouseResult
        if (!lr?.categories?.performance) throw new Error('no result')
        setPsi({ state: 'done', score: Math.round(lr.categories.performance.score * 100), lcp: lr.audits?.['largest-contentful-paint']?.displayValue || '' })
      })
      .catch(() => setPsi({ state: 'error' }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const er = Object.fromEntries(ORDER.map((k) => [k, RULES[k](f[k], f)]))
    setErrors(er)
    const bad = ORDER.find((k) => er[k])
    if (bad) return formRef.current?.querySelector(`[data-f="${bad}"]`)?.focus()
    if (sending) return
    setSending(true)
    const q = new URLSearchParams(location.search)
    const fbclid = q.get('fbclid')
    const payload = {
      service: 'websites',
      website: f.nosite ? '' : f.site.trim(),
      no_website: f.nosite,
      when: f.when,
      full_name: f.name.trim(),
      business_name: f.biz.trim(),
      email: f.email.trim(),
      phone: f.phone.trim(),
      calc: withMaths ? `${money(total)} a month at risk | ${lost} lost customers a month | value ${money(value)}` : '',
      tool: usedCalc ? 'calculator' : '',
      speed_score: psi?.state === 'done' ? psi.score : '',
      ...Object.fromEntries(TRACKING_KEYS.map((k) => [k, q.get(k) || ''])),
      fbc: fbclid ? `fb.1.${Date.now()}.${fbclid}` : cookie('_fbc'),
      fbp: cookie('_fbp'),
      event_id: 'lead.' + Date.now() + '.' + Math.random().toString(36).slice(2, 10),
      page: location.origin + location.pathname,
      hp: hp.current?.value || '',
      elapsed_ms: Date.now() - mountedAt.current,
    }
    try { sessionStorage.setItem('shopa_event_id', payload.event_id) } catch {}
    try {
      if (FORM_ENDPOINT) await fetch(FORM_ENDPOINT, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    } catch { /* still redirect — errors belong in the handler's logs */ }
    try { sessionStorage.setItem('shopa_fn', f.name.trim().split(' ')[0]) } catch {}
    location.href = THANK_YOU
  }

  const fill = ((lost - 1) / 19) * 100
  const err = (k) => errors[k] && <p className="lf-err" id={`lf-${k}-err`} role="alert">{errors[k]}</p>
  const a11y = (k) => ({ 'data-f': k, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `lf-${k}-err` : undefined })

  return (
    <form ref={formRef} id="lead" className="lf" onSubmit={submit} noValidate aria-label="See where your website leaks enquiries">
      <div className="lf-top">
        <p className="lf-step"><b>Step {step + 1} of 2</b> <span>/ {step === 0 ? 'the math' : 'book your call'}</span></p>
        <div className="lf-bar" aria-hidden="true"><m.i animate={{ scaleX: step === 0 ? 0.5 : 1 }} transition={{ duration: 0.45, ease: ease.out }} /></div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {step === 0 ? (
          <m.div key="s0" className="lf-pane" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25, ease: ease.out }}>
            <h2 className="lf-h">What are website leaks costing you?</h2>
            <div className="lf-field">
              <div className="lf-range-row"><label htmlFor="lf-lost">Customers your website loses each month</label><output htmlFor="lf-lost" className="lf-pill">{lost}</output></div>
              <input id="lf-lost" className="lf-range" type="range" min="1" max="20" value={lost} style={{ '--fill': `${fill}%` }} onChange={calcInput((v) => setLost(Math.round(+v)))} aria-describedby="lf-lost-hint" />
              <p className="lf-hint" id="lf-lost-hint">Your best estimate.</p>
            </div>
            <div className="lf-field">
              <label htmlFor="lf-cv">What is one regular customer worth to you?</label>
              <div className="lf-money"><span aria-hidden="true">$</span><input id="lf-cv" type="text" inputMode="numeric" value={cv} onChange={calcInput(setCv)} onBlur={() => setCv(Math.round(value).toLocaleString('en-AU'))} /></div>
            </div>
            <div className="lf-worth" aria-live="polite">
              <span className="lf-worth-k"><i aria-hidden="true" />At risk each month</span>
              <span className="lf-worth-num">{money(shown)}</span>
              <span className="lf-worth-sub">{lost} lost {lost === 1 ? 'customer' : 'customers'} x {money(value)} <em>· {money(total * 12)} a year</em></span>
            </div>
            <m.button className="btn btn-primary btn-block" type="button" onClick={() => toStep2(true)} whileTap={{ scale: 0.97 }}>See where my website leaks <Arrow className="arr" width={16} height={16} /></m.button>
            <p className="lf-fine">Example numbers. Change them to yours. This isn't a promise of results.</p>
            <button className="lf-link" type="button" onClick={() => toStep2(false)}>Skip the math</button>
          </m.div>
        ) : (
          <m.div key="s1" className="lf-pane" onAnimationComplete={(d) => d.x === 0 && formRef.current?.querySelector(f.nosite ? '[data-f="when"]' : '#lf-site')?.focus({ preventScroll: true })} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.25, ease: ease.out }}>
            {withMaths && <p className="lf-worth-line">That is {money(total)} a month at risk. Next, book a call to see where your website leaks.</p>}
            <h2 className="lf-h">Who should we call?</h2>
            <p className="lf-sub">We'll walk you through your free Website Leak Report on the call. A real person, not a call centre.</p>

            <div className={`lf-field ${errors.site ? 'bad' : ''}`}>
              <label htmlFor="lf-site">Your website</label>
              <input id="lf-site" type="url" name="website" placeholder="yourbusiness.com.au" autoComplete="url" inputMode="url" value={f.site} disabled={f.nosite} onChange={set('site')} onBlur={siteDone} {...a11y('site')} />
              <label className="lf-check"><input type="checkbox" checked={f.nosite} onChange={set('nosite')} /> <span>I don't have a website yet</span></label>
              {err('site')}
            </div>

            <fieldset className={`lf-field ${errors.when ? 'bad' : ''}`} aria-describedby={errors.when ? 'lf-when-err' : undefined}>
              <legend>When do you need it?</legend>
              <div className="lf-choices">
                {WHEN.map(([v, l], i) => (
                  <label key={v}><input type="radio" name="when" value={v} checked={f.when === v} onChange={set('when')} {...(i === 0 ? { 'data-f': 'when' } : {})} /><span>{l}</span></label>
                ))}
              </div>
              {err('when')}
            </fieldset>

            <div className={`lf-field ${errors.name ? 'bad' : ''}`}><label htmlFor="lf-name">Full name</label><input id="lf-name" type="text" autoComplete="name" value={f.name} onChange={set('name')} {...a11y('name')} />{err('name')}</div>
            <div className={`lf-field ${errors.biz ? 'bad' : ''}`}><label htmlFor="lf-biz">Business name</label><input id="lf-biz" type="text" autoComplete="organization" value={f.biz} onChange={set('biz')} {...a11y('biz')} />{err('biz')}</div>
            <div className="lf-two">
              <div className={`lf-field ${errors.email ? 'bad' : ''}`}><label htmlFor="lf-email">Email</label><input id="lf-email" type="email" autoComplete="email" value={f.email} onChange={set('email')} {...a11y('email')} />{err('email')}</div>
              <div className={`lf-field ${errors.phone ? 'bad' : ''}`}><label htmlFor="lf-phone">Mobile</label><input id="lf-phone" type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} {...a11y('phone')} />{err('phone')}</div>
            </div>

            {psi && <SpeedBox psi={psi} />}

            <input ref={hp} className="sr-only" type="text" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <p className="lf-fine lf-fine-l"><Lock width={13} height={13} /> <span>Free. No card, no contract. We only use your details to arrange your call. <a href={CONTACT.privacy} target="_blank" rel="noopener">Privacy policy</a>.</span></p>
            <m.button className="btn btn-primary btn-block" type="submit" disabled={sending} whileTap={{ scale: 0.97 }}>{sending ? 'Booking…' : 'Book my call'} {!sending && <Arrow className="arr" width={16} height={16} />}</m.button>
            <button className="lf-link" type="button" onClick={() => setStep(0)}><Back width={14} height={14} /> Back to the math</button>
          </m.div>
        )}
      </AnimatePresence>
    </form>
  )
}

function SpeedBox({ psi }) {
  if (psi.state === 'loading') return <div className="lf-psi" aria-live="polite"><span className="lf-spin" aria-hidden="true" />Checking how fast your site loads on a phone. This takes about 20 seconds, so keep going with the form.<small>Using Google PageSpeed Insights.</small></div>
  if (psi.state === 'error') return <div className="lf-psi" aria-live="polite">We could not run the live speed check just now. We will include a full mobile speed check in your report.</div>
  const cls = psi.score >= 90 ? 'good' : psi.score >= 50 ? 'mid' : 'poor'
  return (
    <div className="lf-psi" aria-live="polite">
      Your mobile speed score from Google
      <b className={cls}>{psi.score} / 100</b>
      {psi.lcp && `Main content shows after ${psi.lcp}. `}
      {psi.score >= 90
        ? 'Inside Google\'s "good" range. Your report will focus on clarity and the enquiry path.'
        : 'Below Google\'s "good" range of 90 or more. In a Google and Deloitte study, making a mobile site just 0.1 seconds faster lifted lead-form completion by 21.6%. Speed will be the first thing your report covers.'}
      <small>Measured just now by Google PageSpeed Insights, on a simulated mobile connection.</small>
    </div>
  )
}
