// Meta Pixel + Conversions API events. The Pixel base code lives in the HTML <head>.
// Each event goes to the browser (fbq) and the server (/api/meta-capi) with the same
// event_id, so Meta deduplicates them into one.

function newEventId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

// 0412 345 678 -> +61412345678
function toE164AU(raw = '') {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('61')) return `+${digits}`
  return `+61${digits.replace(/^0+/, '')}`
}

function sendServer(eventName, eventId, user = {}, custom = {}) {
  // Shape expected by the main site's app/api/meta-capi route.
  const [fn, ...rest] = (user.fullName || '').trim().split(/\s+/).filter(Boolean)
  const body = JSON.stringify({
    event_name: eventName,
    event_id: eventId,
    event_source_url: location.href,
    user: { email: user.email, phone: toE164AU(user.phone), fn, ln: rest[rest.length - 1], country: 'au' },
    custom_data: custom,
  })
  // keepalive so the request survives the redirect to the thank-you page
  fetch('/api/meta-capi', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body }).catch(() => {})
}

// Call ONLY after /api/lead returns res.ok. Never on click, validation error or honeypot fill.
export function trackLead(user, custom = {}) {
  const eventId = newEventId()
  const data = { content_name: 'SEO strategy call', ...custom }
  window.fbq?.('track', 'Lead', data, { eventID: eventId })
  sendServer('Lead', eventId, user, data)
  return eventId
}

export function trackContact(where) {
  const eventId = newEventId()
  const data = { contact_method: 'phone', location: where }
  window.fbq?.('track', 'Contact', data, { eventID: eventId })
  sendServer('Contact', eventId, {}, data)
  return eventId
}
