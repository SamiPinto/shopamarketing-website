export const PHONE = '1800 247 034'
const PHONE_HREF = 'tel:1800247034'
const SITE = 'https://shopamarketing.com.au'
const ADDRESS = '3 Albert Coates Lane, Melbourne VIC 3000'
const ASSETS = 'https://shopamarketing.com.au/lp/seo'

const DISPLAY = "'Urbanist',Arial,Helvetica,sans-serif"
const TEXT = "'Montserrat',Arial,Helvetica,sans-serif"
const C = { night: '#0f0926', ink: '#141515', body: '#4a4361', muted: '#6f6a85', line: '#e4def8', lav: '#f0eefc', violet: '#663dff', bg: '#f3f0fb' }
const GRAD = 'linear-gradient(135deg,#663dff,#aa00ff)'

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const SECTIONS = [
  ['Contact', [['email', 'Email'], ['phone', 'Phone'], ['website', 'Website']]],
  ['Their answers', [['budget', 'Monthly budget']]],
  ['Where they came from', [['utm_source', 'utm_source'], ['utm_medium', 'utm_medium'], ['utm_campaign', 'utm_campaign'], ['utm_content', 'utm_content'], ['utm_term', 'utm_term'], ['gclid', 'gclid'], ['fbclid', 'fbclid'], ['landing_page', 'Page']]],
]

function shell({ title, preheader, body, assets = ASSETS }) {
  return `<!doctype html>
<html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only">
<title>${esc(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Urbanist:wght@800&display=swap" rel="stylesheet">
<style>@media (max-width:620px){.px{padding-left:22px!important;padding-right:22px!important}.h1{font-size:24px!important}.stack{display:block!important;width:100%!important}.stack-gap{padding:0 0 10px!important}}</style>
</head>
<body style="margin:0;padding:0;background:${C.bg};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.bg}" style="background:${C.bg}"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px">
<tr><td class="px" bgcolor="${C.night}" style="background:${C.night};padding:26px 36px;border-radius:18px 18px 0 0">
<a href="${SITE}" style="text-decoration:none"><img src="${assets}/email/logo-white.png" width="104" height="45" alt="Shopa Marketing" style="display:block;border:0;width:104px;height:45px;font:800 18px ${DISPLAY};color:#ffffff"></a>
</td></tr>
<tr><td height="4" bgcolor="${C.violet}" style="height:4px;line-height:4px;font-size:0;background:${C.violet};background-image:${GRAD}">&nbsp;</td></tr>
<tr><td class="px" bgcolor="#ffffff" style="background:#ffffff;padding:36px 36px 32px;border-radius:0 0 18px 18px;font:15px/1.65 ${TEXT};color:${C.body}">
${body}
</td></tr>
<tr><td style="padding:22px 24px 8px;text-align:center;font:12px/1.7 ${TEXT};color:${C.muted}">
Shopa Marketing · ${ADDRESS}<br><a href="${SITE}" style="color:${C.violet};text-decoration:none;font-weight:700">shopamarketing.com.au</a> · <a href="${PHONE_HREF}" style="color:${C.violet};text-decoration:none;font-weight:700">${PHONE}</a>
</td></tr>
</table>
</td></tr></table>
</body></html>`
}

function button(href, label, { outline = false } = {}) {
  const bg = outline ? 'background:#ffffff' : `background:${C.violet};background-image:${GRAD}`
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="${outline ? '#ffffff' : C.violet}" style="${bg};border-radius:40px${outline ? `;border:2px solid ${C.line}` : ''}">
<a href="${esc(href)}" style="display:inline-block;padding:14px 26px;font:700 15px/1 ${TEXT};color:${outline ? C.violet : '#ffffff'};text-decoration:none;border-radius:40px">${esc(label)}</a>
</td></tr></table>`
}

const pill = (label) => `<span style="display:inline-block;padding:7px 14px;border-radius:30px;background:${C.lav};color:${C.violet};font:700 11px/1 ${TEXT};letter-spacing:.1em;text-transform:uppercase">${esc(label)}</span>`
const h1 = (text, mb) => `<h1 class="h1" style="margin:16px 0 ${mb}px;font:800 30px/1.15 ${DISPLAY};letter-spacing:-.02em;color:${C.ink}">${text}</h1>`

export function teamEmail(b, { assets } = {}) {
  const name = String(b.name || '').trim()
  const first = name.split(' ')[0]
  const site = String(b.website || '').trim()
  const tel = String(b.phone || '').replace(/[^\d+]/g, '')

  const sections = SECTIONS.map(([heading, fields]) => {
    const rows = fields.map(([k, label]) => [label, String(b[k] ?? '').trim()]).filter(([, v]) => v)
    if (!rows.length) return ''
    const small = heading === 'Where they came from'
    return `<p style="margin:28px 0 8px;font:700 11px/1 ${TEXT};letter-spacing:.1em;text-transform:uppercase;color:${C.muted}">${heading}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
${rows.map(([l, v]) => `<tr><td width="38%" valign="top" style="padding:10px 12px 10px 0;border-bottom:1px solid ${C.line};font:${small ? 12 : 13}px/1.5 ${TEXT};color:${C.muted}">${esc(l)}</td><td valign="top" style="padding:10px 0;border-bottom:1px solid ${C.line};font:${small ? '400 12' : '700 14'}px/1.5 ${TEXT};color:${C.ink};word-break:break-word">${esc(v)}</td></tr>`).join('\n')}
</table>`
  }).join('\n')

  const body = `${pill('New SEO lead')}
${h1(esc(name), 4)}
${site ? `<p style="margin:0;font:600 16px/1.4 ${TEXT};color:${C.muted}">${esc(site)}</p>` : ''}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px"><tr>
${tel ? `<td class="stack stack-gap" style="padding-right:10px">${button(`tel:${tel}`, `Call ${b.phone}`)}</td>` : ''}
<td class="stack">${button(`mailto:${b.email}`, `Email ${first}`, { outline: true })}</td>
</tr></table>
<p style="margin:14px 0 0;font:13px/1.5 ${TEXT};color:${C.muted}">Hit reply to answer ${esc(first)} directly.</p>
${sections}`

  return shell({ title: `New SEO lead: ${name}`, preheader: `${name}${site ? ` (${site})` : ''} wants a free SEO & AI visibility plan.`, body, assets })
}

const STEPS = [
  ['We take a look under the bonnet', 'Before we chat, we’ll review how your site performs on Google and whether AI tools like ChatGPT and Perplexity are recommending you (or your competitors).'],
  ['We call to book your strategy session', 'Keep an eye on your phone. One of our specialists will call you within one business day to learn more about your business.'],
  ['You get a clear, honest plan', 'Where the quick wins are, what it’ll take to rank, and realistic timeframes. No jargon, no magic beans.'],
]
const PREP = [
  'The 3–5 services or products you most want more enquiries for',
  'A couple of competitors who seem to show up everywhere',
  'Access to Google Search Console or Analytics, if you have it',
]

export const ackText = (first) => [
  `Hi ${first},`,
  'Thanks for reaching out. Your request for a free SEO & AI visibility plan is in. Here’s what happens next.',
  ...STEPS.map(([h, p], i) => `${i + 1}. ${h}\n${p}`),
  `Want to get more out of the call? Have these handy:\n${PREP.map((p) => `- ${p}`).join('\n')}`,
  `Can’t wait? Call us on ${PHONE}.`,
  `Thanks,\nThe Shopa Marketing team\n${SITE}`,
].join('\n\n')

// Goes to an address anyone can type in, so it never echoes user input beyond a first name.
export function ackEmail(first, { assets } = {}) {
  const body = `${pill('Request received')}
${h1(`Thanks, ${esc(first)}. Let’s get you found.`, 12)}
<p style="margin:0 0 28px;color:${C.muted}">Your free SEO &amp; AI visibility plan is underway. Here’s what happens next.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${STEPS.map(([h, p], i) => `<tr>
<td width="44" valign="top" style="padding:0 0 22px"><div style="width:32px;height:32px;line-height:32px;border-radius:50%;background:${C.violet};background-image:${GRAD};color:#ffffff;text-align:center;font:800 15px/32px ${DISPLAY}">${i + 1}</div></td>
<td valign="top" style="padding:3px 0 22px"><p style="margin:0 0 4px;font:800 17px/1.35 ${DISPLAY};color:${C.ink}">${h}</p><p style="margin:0;font:14px/1.65 ${TEXT};color:${C.muted}">${p}</p></td>
</tr>`).join('\n')}
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 16px"><tr><td style="border:1px solid ${C.line};border-radius:14px;padding:20px 22px">
<p style="margin:0 0 10px;font:700 14px/1.5 ${TEXT};color:${C.ink}">Want to get more out of the call? Have these handy:</p>
${PREP.map((p) => `<p style="margin:0 0 6px;font:14px/1.6 ${TEXT};color:${C.body}"><span style="color:${C.violet};font-weight:700">✓</span>&nbsp; ${p}</p>`).join('\n')}
</td></tr></table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="${C.lav}" style="background:${C.lav};border-radius:14px;padding:22px 24px">
<p style="margin:0 0 14px;font:800 18px/1.35 ${DISPLAY};color:${C.ink}">Can’t wait? We’d love to chat now.</p>
${button(PHONE_HREF, `Call ${PHONE}`)}
</td></tr></table>
<p style="margin:30px 0 0;color:${C.ink}">Thanks,<br><b>The Shopa Marketing team</b></p>`

  return shell({ title: 'Your request is in', preheader: 'Your free SEO & AI visibility plan is underway. Here’s what happens next.', body, assets })
}
