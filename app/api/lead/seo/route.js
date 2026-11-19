import { waitUntil } from '@vercel/functions'
import { LEAD_BCC as BCC, LEAD_TO as TO, SENDERS } from '@/lib/landing/leads'
import { ackEmail as ackHtml, ackText, teamEmail } from '@/lib/landing/seoEmails'

const FIELDS = ['service', 'website', 'budget', 'name', 'phone', 'email', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'landing_page']
const LABELS = { website: 'Website', budget: 'Monthly budget', name: 'Name', phone: 'Phone', email: 'Email', utm_source: 'UTM source', utm_medium: 'UTM medium', utm_campaign: 'UTM campaign', utm_term: 'UTM term', utm_content: 'UTM content', gclid: 'gclid', fbclid: 'fbclid', landing_page: 'Landing page' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_FILL_MS = 3000

export const runtime = 'nodejs'

const PHONE = '1800 247 034'
const FROM = SENDERS.seo

const json = (status, body) => Response.json(body, { status })
const addr = (name, email) => `"${name.replace(/["\\]/g, '')}" <${email}>`

function leadEmail(lead) {
  const rows = Object.keys(LABELS).filter((k) => lead[k]).map((k) => [LABELS[k], lead[k]])
  return {
    sender: addr('Shopa SEO Landing Page', FROM),
    to: TO,
    bcc: BCC,
    custom_headers: [{ header: 'Reply-To', value: addr(lead.name, lead.email) }],
    subject: `New SEO lead: ${lead.name}${lead.website ? ` (${lead.website})` : ''}`,
    text_body: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
    html_body: teamEmail(lead),
  }
}

// Goes to an address anyone can type in, so it never echoes user input beyond a first name.
const firstName = (lead) => lead.name.split(' ')[0].slice(0, 40)

function ackEmail(lead) {
  const first = firstName(lead)
  return {
    sender: addr('Shopa Marketing', FROM),
    to: [lead.email],
    custom_headers: [{ header: 'Reply-To', value: TO.join(', ') }],
    subject: "We've got your request. Here's what happens next.",
    text_body: ackText(first),
    html_body: ackHtml(first),
  }
}

// SMTP2GO bills per SMS, so only text AU/NZ mobiles; landlines and overseas numbers are skipped.
function toMobile(raw) {
  const d = raw.replace(/\D/g, '')
  if (/^04\d{8}$/.test(d)) return '+61' + d.slice(1)
  if (/^614\d{8}$/.test(d)) return '+' + d
  if (/^02\d{7,9}$/.test(d)) return '+64' + d.slice(1)
  if (/^642\d{7,9}$/.test(d)) return '+' + d
  return null
}

function ackSms(lead, to) {
  return {
    destination: [to],
    content: `Hi ${firstName(lead).slice(0, 20)}, thanks for contacting Shopa Marketing. A strategist will call you within 1 business day. Questions? Call ${PHONE}`,
  }
}

async function smtp2go(path, payload) {
  const res = await fetch(`https://api.smtp2go.com/v3/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Smtp2go-Api-Key': process.env.SMTP2GO_API_KEY },
    body: JSON.stringify(payload),
  })
  const data = (await res.json().catch(() => ({}))).data || {}
  // SMTP2GO returns 200 even when a recipient fails, so check the counts too.
  if (!res.ok || data.error || data.failed) throw new Error(`${res.status} ${data.error_code || ''} ${data.error || JSON.stringify(data.failures || '')}`.trim())
  return data
}

export async function POST(request) {
  let body
  try { body = await request.json() } catch { return json(400, { ok: false }) }
  if (!body || typeof body !== 'object') return json(400, { ok: false })

  const lead = {}
  for (const k of FIELDS) if (typeof body[k] === 'string') lead[k] = body[k].replace(/[\r\n]+/g, ' ').trim().slice(0, 500)

  const valid = lead.name?.length >= 2 && EMAIL_RE.test(lead.email || '') && (lead.phone || '').replace(/\D/g, '').length >= 8
  if (!valid) return json(400, { ok: false })

  // Bots get a normal-looking success so they don't learn to adapt.
  const isBot = (typeof body.hp === 'string' && body.hp !== '') || !(Number(body.elapsed_ms) >= MIN_FILL_MS)
  if (isBot) {
    console.warn('lead rejected as spam', { hp: !!body.hp, elapsed_ms: body.elapsed_ms })
    return json(200, { ok: true })
  }

  if (!process.env.SMTP2GO_API_KEY) {
    console.error('SMTP2GO_API_KEY is not set — lead not delivered', lead)
    return json(500, { ok: false })
  }

  // The form redirects without reading the response, so reply now and deliver in the background.
  waitUntil(deliver(lead))
  return json(200, { ok: true })
}

async function deliver(lead) {
  const mobile = process.env.SMS_ENABLED === 'true' ? toMobile(lead.phone) : null
  const [team, ack, sms] = await Promise.allSettled([
    smtp2go('email/send', leadEmail(lead)),
    smtp2go('email/send', ackEmail(lead)),
    mobile ? smtp2go('sms/send', ackSms(lead, mobile)) : null,
  ])
  if (sms.status === 'rejected') console.error('ack sms failed', sms.reason.message, { phone: lead.phone })
  if (ack.status === 'rejected') console.error('ack email failed', ack.reason.message, { email: lead.email })
  if (team.status === 'rejected') {
    console.error('lead email failed', team.reason.message, lead)
    return
  }

  if (process.env.FORM_WEBHOOK_URL) {
    const res = await fetch(process.env.FORM_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    }).catch((e) => ({ ok: false, status: String(e) }))
    if (!res.ok) console.error('lead webhook failed (email was sent)', res.status, { email: lead.email })
  }
}
