// HTML emails for the main site's contact and unsubscribe forms, in the same design as the landing pages.
import { C, FONT, PHONE, PHONE_HREF, button, esc, pill, shell } from '@/lib/landing/websiteEmails'

const h1 = (t, mb = 4) => `<h1 class="h1" style="margin:16px 0 ${mb}px;font:800 28px/1.2 ${FONT};letter-spacing:-.02em;color:${C.ink}">${esc(t)}</h1>`
const muted = (t, mb = 0) => `<p style="margin:0 0 ${mb}px;font:600 17px/1.4 ${FONT};color:${C.muted}">${esc(t)}</p>`
const signoff = `<p style="margin:30px 0 0;color:${C.ink}">Thanks,<br><b>The Shopa Marketing team</b></p>`

function rowsTable(rows) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-top:24px">
${rows.filter(([, v]) => v).map(([l, v]) => `<tr><td width="38%" valign="top" style="padding:10px 12px 10px 0;border-bottom:1px solid ${C.line};font:14px/1.5 ${FONT};color:${C.muted}">${esc(l)}</td><td valign="top" style="padding:10px 0;border-bottom:1px solid ${C.line};font:700 15px/1.5 ${FONT};color:${C.ink};word-break:break-word;white-space:pre-wrap">${esc(v)}</td></tr>`).join('\n')}
</table>`
}

const callBox = (heading) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:26px"><tr><td bgcolor="${C.lav}" style="background:${C.lav};border-radius:14px;padding:22px 24px">
<p style="margin:0 0 14px;font:800 17px/1.4 ${FONT};color:${C.ink}">${heading}</p>
${button(PHONE_HREF, `Call ${PHONE}`)}
</td></tr></table>`

export function contactTeamEmail(rows, { name, business, phone, email }) {
  const first = name.split(' ')[0]
  const tel = phone.replace(/[^\d+]/g, '')
  const body = `${pill('New enquiry')}
${h1(name)}
${business ? muted(business) : ''}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px"><tr>
${tel ? `<td class="stack stack-gap" style="padding-right:10px">${button(`tel:${tel}`, `Call ${phone}`)}</td>` : ''}
<td class="stack">${button(`mailto:${email}`, `Email ${first}`, { outline: true })}</td>
</tr></table>
<p style="margin:14px 0 0;font:13px/1.5 ${FONT};color:${C.muted}">Hit reply to answer ${esc(first)} directly.</p>
${rowsTable(rows)}`
  return shell({ title: `New enquiry: ${name}`, preheader: `${name}${business ? `, ${business}` : ''} sent an enquiry from the contact page.`, body })
}

// Goes to an address anyone can type in, so it never echoes user input beyond a first name.
export function contactAckEmail(first) {
  const body = `${pill('Enquiry received')}
${h1(`Thanks, ${first}. We've got your enquiry.`, 12)}
<p style="margin:0;color:${C.muted}">A member of our team will review what you've sent and get back to you within one business day.</p>
${callBox('Need us sooner? Give us a call.')}
${signoff}`
  return shell({ title: 'We have your enquiry', preheader: "Thanks for reaching out. We'll be in touch within one business day.", body })
}
export const contactAckText = (first) => `Hi ${first},\n\nThanks for reaching out. A member of our team will review your enquiry and get back to you within one business day.\n\nNeed us sooner? Call ${PHONE}.\n\nThanks,\nThe Shopa Marketing team\nhttps://shopamarketing.com.au`

export function unsubTeamEmail(rows, email) {
  const body = `${pill('Unsubscribe request')}
${h1(email)}
${muted('Remove this address from our marketing lists.')}
${rowsTable(rows)}`
  return shell({ title: `Unsubscribe request: ${email}`, preheader: `${email} asked to be unsubscribed.`, body })
}

export function unsubAckEmail(permanent) {
  const what = permanent ? 'permanently' : 'for the next 12 months'
  const body = `${pill('Request received')}
${h1("You've been unsubscribed.", 12)}
<p style="margin:0;color:${C.muted}">We've received your request and will stop sending you marketing emails ${what}. It can take up to 5 business days to fully take effect.</p>
<p style="margin:16px 0 0;color:${C.muted}">Didn't request this? Just reply to this email and let us know.</p>
${signoff}`
  return shell({ title: 'Unsubscribe confirmed', preheader: "We've received your unsubscribe request.", body })
}
export const unsubAckText = (permanent) => `Hi,\n\nWe've received your request and will stop sending you marketing emails ${permanent ? 'permanently' : 'for the next 12 months'}. It can take up to 5 business days to fully take effect.\n\nDidn't request this? Just reply to this email and let us know.\n\nThanks,\nThe Shopa Marketing team`
