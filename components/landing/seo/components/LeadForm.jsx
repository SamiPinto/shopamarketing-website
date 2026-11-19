import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { LEAD_ENDPOINT, PHONE, PHONE_HREF, THANK_YOU } from '../site.js'
import { track } from '../track.js'
import { trackLead } from '../lib/meta.js'

const BUDGETS = ['$1,000 – $2,500', '$2,500 – $5,000', '$5,000+', 'Not sure yet']
const ATTRIBUTION = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Mirrors api/lead.js: these submissions get a fake success and are never delivered.
const MIN_FILL_MS = 3000

const validators = {
  website: (v) => v.trim().length >= 4 || 'Add your website so we can review it',
  budget: (v) => !!v || 'Pick the closest range',
  name: (v) => v.trim().length >= 2 || 'Add your name',
  phone: (v) => v.replace(/\D/g, '').length >= 8 || 'Add a valid phone number',
  email: (v) => EMAIL_RE.test(v.trim()) || 'Add a valid email address',
}
const STEP_FIELDS = { 1: ['website', 'budget'], 2: ['name', 'phone', 'email'] }

export default function LeadForm() {
  const [step, setStep] = useState(1)
  const [values, setValues] = useState({ website: '', budget: '', name: '', phone: '', email: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const started = useRef(false)
  const mountedAt = useRef(Date.now())
  const honeypot = useRef(null)
  const attribution = useRef({})
  const stepRef = useRef(null)

  useEffect(() => {
    const q = new URLSearchParams(location.search)
    ATTRIBUTION.forEach((k) => { if (q.get(k)) attribution.current[k] = q.get(k) })
    attribution.current.landing_page = location.origin + location.pathname
  }, [])

  useEffect(() => {
    if (step === 2) stepRef.current?.querySelector('input')?.focus({ preventScroll: true })
  }, [step])

  const onStart = () => {
    if (started.current) return
    started.current = true
    track('form_start')
  }

  const set = (k, v) => {
    setValues((s) => ({ ...s, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const validate = (fields) => {
    const next = {}
    fields.forEach((f) => {
      const r = validators[f](values[f])
      if (r !== true) next[f] = r
    })
    setErrors(next)
    const first = fields.find((f) => next[f])
    if (first) document.getElementById(`f-${first}`)?.focus()
    return !first
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (step === 1) {
      if (!validate(STEP_FIELDS[1])) return
      track('form_step', { step: 2 })
      setStep(2)
      return
    }
    if (!validate(STEP_FIELDS[2])) return
    setSending(true)
    setSendError(false)
    const data = {
      service: 'seo', ...values, ...attribution.current,
      hp: honeypot.current?.value || '', elapsed_ms: Date.now() - mountedAt.current,
    }
    if (LEAD_ENDPOINT) {
      let ok = false
      try {
        const res = await fetch(LEAD_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        ok = res.ok
      } catch { /* network error */ }
      if (!ok) {
        setSending(false)
        setSendError(true)
        return
      }
    }
    const isSpam = data.hp !== '' || data.elapsed_ms < MIN_FILL_MS
    if (!isSpam) {
      track('form_submit', { budget: values.budget })
      trackLead({ email: values.email.trim(), phone: values.phone, fullName: values.name.trim() }, { budget: values.budget })
    }
    try {
      sessionStorage.setItem('shopa_fn', values.name.trim().split(' ')[0])
      if (!isSpam) sessionStorage.setItem('shopa_lead_pending', '1')
    } catch { /* private mode */ }
    location.href = THANK_YOU
  }

  const field = (k, label, props = {}) => (
    <div className={`field${errors[k] ? ' err' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      <input id={`f-${k}`} name={k} value={values[k]} onChange={(e) => set(k, e.target.value)}
        aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined} {...props} />
      {errors[k] && <p className="msg" id={`e-${k}`}>{errors[k]}</p>}
    </div>
  )

  return (
    <div className="form-card" id="get-started">
      <div className="form-head">
        <div className="form-progress" aria-hidden="true"><span style={{ width: step === 1 ? '50%' : '100%' }} /></div>
        <p className="form-step">Step {step} of 2 · <span>takes about 30 seconds</span></p>
        <h2>{step === 1 ? 'Get your free SEO and AI visibility plan' : 'Where should we send your plan?'}</h2>
        <p className="sub">
          {step === 1
            ? "We'll check where you rank on Google and whether AI recommends you, then walk you through a clear plan."
            : 'A strategist will call to book your session. No pressure, no obligation.'}
        </p>
      </div>

      <form onSubmit={onSubmit} onFocus={onStart} onChange={onStart} noValidate>
        <div className="hp" aria-hidden="true">
          <label htmlFor="f-hp">Leave this field empty</label>
          <input id="f-hp" name="hp_extra" type="text" tabIndex={-1} autoComplete="off" ref={honeypot} />
        </div>
        {step === 1 ? (
          <div className="form-step-body" key="s1">
            {field('website', 'Your website', { inputMode: 'url', placeholder: 'yourbusiness.com.au', autoComplete: 'url' })}
            <fieldset className={`field budget${errors.budget ? ' err' : ''}`} aria-describedby={errors.budget ? 'e-budget' : undefined}>
              <legend>Monthly marketing budget</legend>
              <div className="chips">
                {BUDGETS.map((b, i) => (
                  <label key={b} className={`chip${values.budget === b ? ' on' : ''}`}>
                    <input type="radio" name="budget" value={b} id={i === 0 ? 'f-budget' : undefined}
                      checked={values.budget === b} onChange={() => set('budget', b)} />
                    {b}
                  </label>
                ))}
              </div>
              {errors.budget && <p className="msg" id="e-budget">{errors.budget}</p>}
            </fieldset>
          </div>
        ) : (
          <div className="form-step-body" key="s2" ref={stepRef}>
            <div className="row2">
              {field('name', 'Your name', { autoComplete: 'name' })}
              {field('phone', 'Phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
            </div>
            {field('email', 'Work email', { type: 'email', autoComplete: 'email' })}
          </div>
        )}

        <button className="btn btn-primary btn-block" type="submit" disabled={sending}>
          {sending ? 'Sending…' : step === 1 ? 'Continue' : 'Get my free SEO plan'}
          {!sending && <Icon name="arrow" size={18} className="arr" />}
        </button>
        {sendError && (
          <p className="form-error" role="alert">
            Sorry, that didn't send. Please try again, or call us on <a href={PHONE_HREF}>{PHONE}</a>.
          </p>
        )}
        {step === 2 && (
          <button type="button" className="form-back" onClick={() => setStep(1)}>
            <Icon name="back" size={14} /> Back
          </button>
        )}
        <p className="form-note"><Icon name="lock" size={14} stroke={2} /> Your details stay with us. No spam, ever.</p>
      </form>
    </div>
  )
}
