export const PHONE = '1800 247 034'
export const PHONE_HREF = 'tel:+611800247034'
const SITE = 'https://shopamarketing.com.au'
const ADDRESS = '3 Albert Coates Lane, Melbourne VIC 3000'
const ASSETS = 'https://shopamarketing.com.au/lp/website'

export const FONT = "'Urbanist',Arial,Helvetica,sans-serif"
export const C = { night: '#100922', ink: '#17171B', muted: '#696775', line: '#E8E2F3', lav: '#F6F1FF', violet: '#7031EC', bg: '#F3F0F9' }
const GRAD = 'linear-gradient(105deg,#7135FF,#AD00F5)'

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const WHEN = { now: 'Now', '1-3': '1–3 months', later: 'Later' }

const SECTIONS = [
  ['Contact', [['email', 'Email'], ['phone', 'Mobile'], ['website', 'Website'], ['no_website', 'Website']]],
  ['Their answers', [['when', 'Needs it'], ['calc', 'Calculator'], ['speed_score', 'Mobile speed score']]],
  ['Where they came from', [['utm_source', 'utm_source'], ['utm_medium', 'utm_medium'], ['utm_campaign', 'utm_campaign'], ['utm_content', 'utm_content'], ['utm_term', 'utm_term'], ['ad', 'Ad variant'], ['gclid', 'gclid'], ['fbclid', 'fbclid'], ['page', 'Page'], ['event_id', 'event_id']]],
]

function display(k, v) {
  if (k === 'no_website') return v === true || v === 'true' ? 'Doesn’t have one yet' : ''
  if (k === 'when') return WHEN[v] || v
  if (k === 'speed_score') return v === '' ? '' : `${v} / 100`
  return v
}

export function shell({ title, preheader, body, assets = ASSETS }) {
  return `<!doctype html>
<html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only">
<title>${esc(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;800&display=swap" rel="stylesheet">
<style>@media (max-width:620px){.px{padding-left:22px!important;padding-right:22px!important}.h1{font-size:24px!important}.stack{display:block!important;width:100%!important}.stack-gap{padding:0 0 10px!important}}</style>
</head>
<body style="margin:0;padding:0;background:${C.bg};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.bg}" style="background:${C.bg}"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px">
<tr><td class="px" bgcolor="${C.night}" style="background:${C.night};padding:26px 36px;border-radius:18px 18px 0 0">
<a href="${SITE}" style="text-decoration:none"><img src="${assets}/email/logo-white.png" width="104" height="45" alt="Shopa Marketing" style="display:block;border:0;width:104px;height:45px;font:800 18px ${FONT};color:#ffffff"></a>
</td></tr>
<tr><td height="4" bgcolor="#7135FF" style="height:4px;line-height:4px;font-size:0;background:#7135FF;background-image:${GRAD}">&nbsp;</td></tr>
<tr><td class="px" bgcolor="#ffffff" style="background:#ffffff;padding:36px 36px 32px;border-radius:0 0 18px 18px;font:16px/1.6 ${FONT};color:${C.ink}">
${body}
</td></tr>
<tr><td style="padding:22px 24px 8px;text-align:center;font:13px/1.6 ${FONT};color:${C.muted}">
Shopa Marketing · ${ADDRESS}<br><a href="${SITE}" style="color:${C.violet};text-decoration:none;font-weight:600">shopamarketing.com.au</a> · <a href="${PHONE_HREF}" style="color:${C.violet};text-decoration:none;font-weight:600">${PHONE}</a>
</td></tr>
</table>
</td></tr></table>
</body></html>`
}

export function button(href, label, { outline = false } = {}) {
  const bg = outline ? "background:#ffffff" : `background:#7135FF;background-image:${GRAD}`
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="${outline ? '#ffffff' : '#7135FF'}" style="${bg};border-radius:999px${outline ? `;border:2px solid ${C.line}` : ''}">
<a href="${esc(href)}" style="display:inline-block;padding:13px 26px;font:800 15px/1 ${FONT};color:${outline ? C.ink : '#ffffff'};text-decoration:none;border-radius:999px">${esc(label)}</a>
</td></tr></table>`
}

export const pill = (label) => `<span style="display:inline-block;padding:5px 12px;border-radius:999px;background:${C.lav};color:${C.violet};font:800 11px/1 ${FONT};letter-spacing:.08em;text-transform:uppercase">${esc(label)}</span>`

export function teamEmail(b, { assets } = {}) {
  const name = String(b.full_name || '').trim()
  const first = name.split(' ')[0]
  const biz = String(b.business_name || '').trim()
  const tel = String(b.phone || '').replace(/[^\d+]/g, '')

  const sections = SECTIONS.map(([heading, fields]) => {
    const rows = fields.map(([k, label]) => [label, b[k] === undefined || b[k] === false ? '' : display(k, b[k])]).filter(([, v]) => v !== '')
    if (!rows.length) return ''
    const small = heading === 'Where they came from'
    return `<p style="margin:28px 0 8px;font:800 12px/1 ${FONT};letter-spacing:.08em;text-transform:uppercase;color:${C.muted}">${heading}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
${rows.map(([l, v]) => `<tr><td width="38%" valign="top" style="padding:10px 12px 10px 0;border-bottom:1px solid ${C.line};font:${small ? 13 : 14}px/1.5 ${FONT};color:${C.muted}">${esc(l)}</td><td valign="top" style="padding:10px 0;border-bottom:1px solid ${C.line};font:${small ? '400 13' : '700 15'}px/1.5 ${FONT};color:${C.ink};word-break:break-word">${esc(v)}</td></tr>`).join('\n')}
</table>`
  }).join('\n')

  const body = `${pill('New website lead')}
<h1 class="h1" style="margin:16px 0 4px;font:800 28px/1.2 ${FONT};letter-spacing:-.02em;color:${C.ink}">${esc(name)}</h1>
${biz ? `<p style="margin:0;font:600 17px/1.4 ${FONT};color:${C.muted}">${esc(biz)}</p>` : ''}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px"><tr>
${tel ? `<td class="stack stack-gap" style="padding-right:10px">${button(`tel:${tel}`, `Call ${b.phone}`)}</td>` : ''}
<td class="stack">${button(`mailto:${b.email}`, `Email ${first}`, { outline: true })}</td>
</tr></table>
<p style="margin:14px 0 0;font:13px/1.5 ${FONT};color:${C.muted}">Hit reply to answer ${esc(first)} directly.</p>
${sections}`

  return shell({ title: `New website lead: ${name}`, preheader: `${name}${biz ? `, ${biz}` : ''} wants a Website Leak Report.`, body, assets })
}

export const ackLines = (first) => [
  `Hi ${first},`,
  'Thanks for reaching out. Your request for a free Website Leak Report is in.',
  "Here's what happens next. A website strategist will review your site: how it looks on a phone, how fast it loads, whether it builds trust at first glance, and how easy it is to enquire. No website yet? We'll look at what your customers will need instead.",
  "Then we'll call you within one business day to book a time to walk you through your report. No pressure, no obligation.",
  `Can't wait? Call us on ${PHONE}.`,
]

// Goes to an address anyone can type in, so it never echoes user input beyond a first name.
export function ackEmail(first, { assets } = {}) {
  const steps = [
    ['We review your site', 'How it looks on a phone, how fast it loads, whether it builds trust at first glance, and how easy it is to enquire. No website yet? We’ll look at what your customers will need instead.'],
    ['We call you within one business day', `To book a time that suits you. Expect a call from ${PHONE} or a Melbourne number.`],
    ['We walk you through your report', 'Every leak, scored, with the fix for each one in plain English. No pressure, no obligation.'],
  ]
  const body = `${pill('Request received')}
<h1 class="h1" style="margin:16px 0 12px;font:800 28px/1.2 ${FONT};letter-spacing:-.02em;color:${C.ink}">Thanks, ${esc(first)}. Your request is in.</h1>
<p style="margin:0 0 28px;color:${C.muted}">Your free Website Leak Report is underway. Here’s what happens next.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${steps.map(([h, p], i) => `<tr>
<td width="44" valign="top" style="padding:0 0 22px"><div style="width:32px;height:32px;line-height:32px;border-radius:50%;background:#7135FF;background-image:${GRAD};color:#ffffff;text-align:center;font:800 15px/32px ${FONT}">${i + 1}</div></td>
<td valign="top" style="padding:3px 0 22px"><p style="margin:0 0 4px;font:800 16px/1.4 ${FONT};color:${C.ink}">${h}</p><p style="margin:0;font:15px/1.6 ${FONT};color:${C.muted}">${p}</p></td>
</tr>`).join('\n')}
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:6px"><tr><td bgcolor="${C.lav}" style="background:${C.lav};border-radius:14px;padding:22px 24px">
<p style="margin:0 0 14px;font:800 17px/1.4 ${FONT};color:${C.ink}">Can’t wait? Let’s talk now.</p>
${button(PHONE_HREF, `Call ${PHONE}`)}
</td></tr></table>
<p style="margin:30px 0 0;color:${C.ink}">Thanks,<br><b>The Shopa Marketing team</b></p>`

  return shell({ title: 'Your request is in', preheader: 'Your free Website Leak Report is underway. Here’s what happens next.', body, assets })
}
