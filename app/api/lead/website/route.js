import { ackEmail, ackLines, teamEmail } from '@/lib/landing/websiteEmails'
import { LEAD_BCC, LEAD_TO, SENDERS } from '@/lib/landing/leads'

export const runtime = 'nodejs'

const LABELS = {
  full_name: 'Name',
  business_name: 'Business',
  email: 'Email',
  phone: 'Mobile',
  website: 'Website',
  no_website: 'No website yet',
  when: 'Needs it',
  calc: 'Calculator',
  speed_score: 'Mobile speed score',
  utm_source: 'utm_source',
  utm_medium: 'utm_medium',
  utm_campaign: 'utm_campaign',
  utm_content: 'utm_content',
  utm_term: 'utm_term',
  ad: 'Ad variant',
  gclid: 'gclid',
  fbclid: 'fbclid',
  fbc: 'fbc',
  fbp: 'fbp',
  event_id: 'event_id',
  page: 'Page',
}

const clip = (v) => String(v ?? '').slice(0, 500)
const SITE = 'https://shopamarketing.com.au'
const MIN_FILL_MS = 3000
const json = (status, body) => Response.json(body, { status })

export async function POST(request) {
  const { SMTP2GO_API_KEY } = process.env
  if (!SMTP2GO_API_KEY) {
    console.error('lead/website: missing SMTP2GO_API_KEY')
    return json(500, { ok: false })
  }

  let b
  try { b = (await request.json()) || {} } catch { return json(400, { ok: false }) }
  const email = clip(b.email).replace(/[\r\n]+/g, ' ').trim()
  const name = clip(b.full_name).replace(/[\r\n]+/g, ' ').trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || name.length < 2) {
    return json(400, { ok: false })
  }

  // Bots get a normal-looking success so they don't learn to adapt.
  if ((typeof b.hp === 'string' && b.hp !== '') || !(Number(b.elapsed_ms) >= MIN_FILL_MS)) {
    console.warn('lead rejected as spam', { hp: !!b.hp, elapsed_ms: b.elapsed_ms })
    return json(200, { ok: true })
  }

  const lead = Object.fromEntries(Object.keys(LABELS).filter((k) => b[k] !== undefined).map((k) => [k, k === 'no_website' ? b[k] === true : clip(b[k])]))
  const rows = Object.entries(LABELS)
    .filter(([k]) => lead[k] !== undefined && lead[k] !== '' && lead[k] !== false)
    .map(([k, label]) => [label, String(lead[k])])
  const biz = clip(b.business_name).trim()
  const first = name.split(' ')[0].slice(0, 40)

  const [sent, ack] = await Promise.allSettled([
    smtp2go(SMTP2GO_API_KEY, {
      sender: SENDERS.website,
      to: LEAD_TO,
      bcc: LEAD_BCC,
      subject: `New website lead: ${name}${biz ? ` (${biz})` : ''}`.replace(/[\r\n]/g, ' '),
      html_body: teamEmail(lead),
      text_body: rows.map(([l, v]) => `${l}: ${v}`).join('\n'),
      custom_headers: [{ header: 'Reply-To', value: email }],
    }),
    smtp2go(SMTP2GO_API_KEY, {
      sender: SENDERS.website,
      to: [email],
      custom_headers: [{ header: 'Reply-To', value: LEAD_TO.join(', ') }],
      subject: "We've got your request. Here's what happens next.",
      html_body: ackEmail(first),
      text_body: `${ackLines(first).join('\n\n')}\n\nThanks,\nThe Shopa Marketing team\n${SITE}`,
    }),
  ])
  if (ack.status === 'rejected') console.error('ack email failed', ack.reason.message, { email })
  if (sent.status === 'rejected') {
    console.error('lead email failed', sent.reason.message, JSON.stringify(b))
    return json(502, { ok: false })
  }
  return json(200, { ok: true })
}

async function smtp2go(key, payload) {
  const r = await fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Smtp2go-Api-Key': key },
    body: JSON.stringify(payload),
  })
  const data = (await r.json().catch(() => ({}))).data || {}
  // SMTP2GO returns 200 even when a recipient fails, so check the counts too.
  if (!r.ok || data.error || data.failed || !data.succeeded) throw new Error(`${r.status} ${data.error_code || ''} ${data.error || JSON.stringify(data.failures || '')}`.trim())
  return data
}
