'use client';

import { useState, FormEvent } from 'react';
import { TOP_COUNTRIES, REST_COUNTRIES, ALL_COUNTRIES, flagEmoji, validateNationalNumber } from './countries';

const SERVICE_OPTIONS = [
  { label: 'Done For You', icon: 'flaticon-team' },
  { label: 'OOH Advertising', icon: 'flaticon-bullhorn' },
  { label: 'SEO Services', icon: 'flaticon-seo' },
  { label: 'Social Media Ads', icon: 'flaticon-instagram' },
  { label: 'Website Design', icon: 'flaticon-web-design-1' },
  { label: 'Google Ads', icon: 'flaticon-digital-campaign' },
  { label: 'Graphic Design', icon: 'flaticon-badge' },
  { label: 'Other', icon: 'flaticon-chat' },
];

const GOAL_OPTIONS = ['More leads & enquiries', 'More sales', 'Brand awareness', 'New website or rebrand', 'Not sure yet — help me'];
const TIMELINE_OPTIONS = ['ASAP', 'Within a month', '1–3 months', 'Just researching'];
const BUDGET_OPTIONS = ['Under $1k / month', '$1k–$2.5k / month', '$2.5k–$5k / month', '$5k+ / month', 'Not sure yet'];

const TOTAL_STEPS = 5;

function validatePhone(iso: string, value: string): string {
  const digits = value.replace(/[\s\-().+]/g, '');
  if (validateNationalNumber(iso, digits)) return '';
  const c = ALL_COUNTRIES.find((x) => x.iso === iso);
  return `Please enter a valid ${c?.name ?? ''} phone number`.replace('  ', ' ');
}

function isEmailValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

function validateWebsite(value: string): string {
  if (!value.trim()) return '';
  if (/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/.test(value.trim())) return '';
  return 'Please enter a valid website (e.g. shopamarketing.com.au)';
}

interface Errors { fullName?: string; phone?: string; email?: string; website?: string; }

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [stepError, setStepError] = useState('');

  const [services, setServices] = useState<string[]>([]);
  const [goal, setGoal] = useState('');
  const [timeline, setTimeline] = useState('');
  const [budget, setBudget] = useState('');

  const [fullName, setFullName]         = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone]               = useState('');
  const [phoneCountry, setPhoneCountry]  = useState('AU');
  const [email, setEmail]               = useState('');
  const [website, setWebsite]           = useState('');
  const [message, setMessage]           = useState('');
  const [consent1, setConsent1]         = useState(false);
  const [consent2, setConsent2]         = useState(false);
  const [errors, setErrors]             = useState<Errors>({});
  const [submitted, setSubmitted]       = useState(false);
  const [sending, setSending]           = useState(false);
  const [sendError, setSendError]       = useState(false);
  const [honeypot, setHoneypot]         = useState('');
  const [renderedAt] = useState(() => Date.now()); // time-trap: bots submit instantly

  function toggleService(label: string) {
    setStepError('');
    setServices(prev => prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]);
  }

  // Single-tap steps advance on their own after a beat, so the choice is seen landing
  function pickAndAdvance(setter: (v: string) => void, value: string) {
    setter(value);
    setTimeout(() => setStep(s => s + 1), 280);
  }

  function nextFromServices() {
    if (services.length === 0) {
      setStepError('Pick at least one service — or "Other" if none fit.');
      return;
    }
    setStepError('');
    setStep(1);
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!fullName.trim()) e.fullName = 'Full name is required';
    if (!phone.trim())    e.phone    = 'Phone number is required';
    else { const err = validatePhone(phoneCountry, phone); if (err) e.phone = err; }
    if (!email.trim())        e.email = 'Email is required';
    else if (!isEmailValid(email)) e.email = 'Please enter a valid email address';
    if (website.trim())   { const err = validateWebsite(website); if (err) e.website = err; }
    return e;
  }

  const phoneValid   = phone.trim() !== '' && validatePhone(phoneCountry, phone) === '';
  const emailValid   = isEmailValid(email);
  const websiteValid = validateWebsite(website) === '';
  const canSubmit =
    services.length > 0 && fullName.trim() !== '' && phoneValid && emailValid && websiteValid;

  const missing: string[] = [];
  if (!fullName.trim()) missing.push('your name');
  if (!phoneValid)      missing.push('a valid phone number');
  if (!emailValid)      missing.push('a valid email');
  if (!websiteValid)    missing.push('a valid website');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length !== 0) return;

    setSending(true);
    setSendError(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          services, goal, timeline, budget,
          fullName, businessName,
          phone: `${ALL_COUNTRIES.find((c) => c.iso === phoneCountry)?.dial ?? ''} ${phone}`.trim(),
          phoneCountry,
          email, website, message,
          consent1, consent2,
          company: honeypot,
          renderedAt,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setSubmitted(true);
        window.dataLayer?.push({ event: 'contact_form_submit', form_name: 'contact_wizard' });
      } else setSendError(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="contact-form-2-wrap" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <i className="fas fa-check-circle" style={{ fontSize: '48px', color: '#663dff', marginBottom: '20px', display: 'block' }}></i>
        <h3 className="chy-heading-1" style={{ fontSize: '28px', marginBottom: '12px' }}>Message Sent!</h3>
        <p className="chy-para-1">Thanks {fullName}, we&apos;ll be in touch shortly. Here&apos;s what we got:</p>
        <div className="contact-form-shopa contact-form-shopa--wizard">
          <div className="cfw-summary">
            {services.map(s => <span key={s}>{s}</span>)}
            {goal && <span>{goal}</span>}
            {timeline && <span>{timeline}</span>}
            {budget && <span>{budget}</span>}
          </div>
        </div>
      </div>
    );
  }

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="contact-form-2-wrap">
      <form className="contact-form-shopa contact-form-shopa--wizard" onSubmit={handleSubmit} noValidate>

        <div className="cfw-progress-meta">
          <span className="cfw-progress-step">Step {step + 1} of {TOTAL_STEPS}</span>
          <span className="cfw-progress-hint">
            {step < 4 ? 'No typing yet — just tap' : 'Last step — takes 20 seconds'}
          </span>
        </div>
        <div className="cfw-progress" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="cfw-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        {step === 0 && (
          <div className="cfw-step" key="s0">
            <h4 className="cfw-question">What can we help you with?</h4>
            <p className="cfw-sub">Pick as many as you like.</p>
            <div className="cfw-cards">
              {SERVICE_OPTIONS.map(opt => (
                <button
                  key={opt.label}
                  type="button"
                  className={`cfw-card${services.includes(opt.label) ? ' is-selected' : ''}`}
                  onClick={() => toggleService(opt.label)}
                  aria-pressed={services.includes(opt.label)}
                >
                  <i className={opt.icon}></i>
                  {opt.label}
                </button>
              ))}
            </div>
            {stepError && <span className="cfw-error">{stepError}</span>}
            <div className="cfw-nav" style={{ justifyContent: 'flex-end' }}>
              <button type="button" className="chy-pr-btn-1" onClick={nextFromServices} aria-label="next step">
                <span className="text">Next</span>
                <span className="icon"><i className="fa-solid fa-right-long"></i></span>
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="cfw-step" key="s1">
            <h4 className="cfw-question">What&apos;s the main goal?</h4>
            <p className="cfw-sub">One tap — this helps us prepare the right plan before we call.</p>
            <div className="cfw-chips">
              {GOAL_OPTIONS.map(opt => (
                <button key={opt} type="button"
                  className={`cfw-chip${goal === opt ? ' is-selected' : ''}`}
                  onClick={() => pickAndAdvance(setGoal, opt)}>
                  {opt}
                </button>
              ))}
            </div>
            <div className="cfw-nav">
              <button type="button" className="cfw-back" onClick={() => setStep(0)}>
                <i className="fa-solid fa-left-long"></i> Back
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="cfw-step" key="s2">
            <h4 className="cfw-question">When would you like to start?</h4>
            <p className="cfw-sub">No pressure — &quot;just researching&quot; is a perfectly good answer.</p>
            <div className="cfw-chips">
              {TIMELINE_OPTIONS.map(opt => (
                <button key={opt} type="button"
                  className={`cfw-chip${timeline === opt ? ' is-selected' : ''}`}
                  onClick={() => pickAndAdvance(setTimeline, opt)}>
                  {opt}
                </button>
              ))}
            </div>
            <div className="cfw-nav">
              <button type="button" className="cfw-back" onClick={() => setStep(1)}>
                <i className="fa-solid fa-left-long"></i> Back
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="cfw-step" key="s3">
            <h4 className="cfw-question">Rough monthly budget in mind?</h4>
            <p className="cfw-sub">A ballpark is plenty — it helps us recommend what actually fits.</p>
            <div className="cfw-chips">
              {BUDGET_OPTIONS.map(opt => (
                <button key={opt} type="button"
                  className={`cfw-chip${budget === opt ? ' is-selected' : ''}`}
                  onClick={() => pickAndAdvance(setBudget, opt)}>
                  {opt}
                </button>
              ))}
            </div>
            <div className="cfw-nav">
              <button type="button" className="cfw-back" onClick={() => setStep(2)}>
                <i className="fa-solid fa-left-long"></i> Back
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="cfw-step" key="s4">
            <h4 className="cfw-question">Where do we send the plan?</h4>
            <p className="cfw-sub">We&apos;ll review everything and come back to you within one business day.</p>

            <div className="cfw-grid">
              {/* Full Name */}
              <div className="f-name">
                <label htmlFor="fullName">Full Name<span>*</span></label>
                <input id="fullName" type="text" placeholder="Your full name"
                  value={fullName} onChange={e => setFullName(e.target.value)}
                  style={errors.fullName ? errInputStyle : {}} />
                {errors.fullName && <span style={errMsgStyle}>{errors.fullName}</span>}
              </div>

              {/* Phone — dial-code select + national number */}
              <div className="f-phone">
                <label htmlFor="phone">Phone Number<span>*</span></label>
                <div className="cfw-phone-row" style={errors.phone ? errInputStyle : {}}>
                  <select
                    className="cfw-dial"
                    aria-label="Country code"
                    value={phoneCountry}
                    onChange={e => { setPhoneCountry(e.target.value); setErrors(p => ({ ...p, phone: undefined })); }}
                  >
                    {TOP_COUNTRIES.map(c => (
                      <option key={c.iso} value={c.iso}>{flagEmoji(c.iso)} {c.dial}</option>
                    ))}
                    <option disabled>──────────</option>
                    {REST_COUNTRIES.map(c => (
                      <option key={c.iso} value={c.iso}>{flagEmoji(c.iso)} {c.name} {c.dial}</option>
                    ))}
                  </select>
                  <input id="phone" type="tel" placeholder="Phone number"
                    value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                {errors.phone && <span style={errMsgStyle}>{errors.phone}</span>}
              </div>

              {/* Email */}
              <div className="f-email">
                <label htmlFor="email">E-mail<span>*</span></label>
                <input id="email" type="email" placeholder="your@email.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  style={errors.email ? errInputStyle : {}} />
                {errors.email && <span style={errMsgStyle}>{errors.email}</span>}
              </div>

              {/* Business Name */}
              <div className="f-biz">
                <label htmlFor="businessName">Business Name</label>
                <input id="businessName" type="text" placeholder="Your business name"
                  value={businessName} onChange={e => setBusinessName(e.target.value)} />
              </div>

              {/* Website */}
              <div className="f-web">
                <label htmlFor="website">Website URL</label>
                <input id="website" type="text" placeholder="shopamarketing.com.au"
                  value={website} onChange={e => setWebsite(e.target.value)}
                  style={errors.website ? errInputStyle : {}} />
                {errors.website && <span style={errMsgStyle}>{errors.website}</span>}
              </div>

              {/* Message textarea */}
              <div className="f-msg">
                <label htmlFor="message">Anything else you&apos;d like us to know?</label>
                <textarea id="message" cols={30} rows={3}
                  placeholder="Share more details (if any)"
                  value={message} onChange={e => setMessage(e.target.value)} />
              </div>

              {/* Consent checkboxes */}
              <div className="f-check" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label>
                  <input type="checkbox" checked={consent1} onChange={e => setConsent1(e.target.checked)} />
                  <span>I consent to receive marketing text messages from Shopa Marketing Australia Pty Ltd at the phone number provided. Frequency may vary. Message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.</span>
                </label>
                <label>
                  <input type="checkbox" checked={consent2} onChange={e => setConsent2(e.target.checked)} />
                  <span>I consent to receive non-marketing text messages from Shopa Marketing Australia Pty Ltd about my order updates, appointment reminders etc. Message &amp; data rates may apply.</span>
                </label>
              </div>
            </div>

            {/* Honeypot — hidden from humans, bots fill it */}
            <input
              type="text"
              name="company"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
            />

            {sendError && (
              <span className="cfw-error">
                Something went wrong sending your message. Please try again, or email us directly at{' '}
                <a href="mailto:customerservice@shopamarketing.com.au" style={{ color: '#663dff', fontWeight: 700 }}>
                  customerservice@shopamarketing.com.au
                </a>
              </span>
            )}

            <div className="cfw-nav">
              <button type="button" className="cfw-back" onClick={() => setStep(3)} disabled={sending}>
                <i className="fa-solid fa-left-long"></i> Back
              </button>
              <button
                type="submit"
                aria-label="send message"
                className="chy-pr-btn-1"
                disabled={sending || !canSubmit}
              >
                <span className="text">{sending ? 'Sending…' : 'Send a Message'}</span>
                <span className="icon"><i className="fa-solid fa-right-long"></i></span>
              </button>
            </div>
            {!sending && missing.length > 0 && (
              <p className="cfw-hint">Add {missing.join(', ')} to send.</p>
            )}
          </div>
        )}

      </form>
    </div>
  );
}

const errInputStyle: React.CSSProperties = { border: '2px solid #e74c3c', outline: 'none' };
const errMsgStyle:   React.CSSProperties = { display: 'block', fontSize: '12px', color: '#e74c3c', marginTop: '4px', paddingLeft: '8px', fontWeight: 500 };
