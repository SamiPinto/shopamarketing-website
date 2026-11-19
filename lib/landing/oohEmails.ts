const PHONE = "1800 247 034";
const PHONE_TEL = "tel:+611800247034";
const SITE = "https://shopamarketing.com.au";
const ASSETS = "https://shopamarketing.com.au/lp/ooh";

const C = {
  night: "#100922",
  ink: "#17171b",
  body: "#4a4757",
  muted: "#696775",
  violet: "#7031ec",
  lav: "#f6f1ff",
  line: "#e8e2f3",
  paper: "#f4f1fa",
};
const FONT = "'Urbanist','Helvetica Neue',Helvetica,Arial,sans-serif";
const MONO = "'Geist Mono',Menlo,Consolas,monospace";

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function shell(preheader: string, eyebrow: string, inner: string) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only"><title>Shopa Marketing</title></head>
<body style="margin:0;padding:0;background:${C.paper};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paper}">
<tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid ${C.line}">
<tr><td style="background:${C.night};padding:28px 32px 24px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td><a href="${SITE}"><img src="${ASSETS}/email-logo.png" width="108" alt="Shopa Marketing" style="display:block;border:0;width:108px;height:auto"></a></td>
<td align="right" style="font:600 11px/1 ${MONO};letter-spacing:.12em;text-transform:uppercase;color:#f2a6ff">${esc(eyebrow)}</td>
</tr></table></td></tr>
<tr><td style="height:4px;line-height:4px;font-size:0;background:#7135ff;background-image:linear-gradient(105deg,#7135ff,#ad00f5)">&nbsp;</td></tr>
${inner}
<tr><td style="padding:22px 32px;background:${C.lav};font:13px/1.6 ${FONT};color:${C.muted}">
Shopa Marketing · <a href="${PHONE_TEL}" style="color:${C.muted}">${PHONE}</a> · <a href="${SITE}" style="color:${C.violet};text-decoration:none">shopamarketing.com.au</a>
</td></tr>
</table></td></tr></table></body></html>`;
}

function button(href: string, label: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="display:inline-table;margin:0 8px 8px 0"><tr>
<td style="border-radius:999px;background:#7135ff;background-image:linear-gradient(105deg,#7135ff,#ad00f5)">
<a href="${href}" style="display:inline-block;padding:13px 24px;font:700 15px/1 ${FONT};color:#ffffff;text-decoration:none;border-radius:999px">${esc(label)}</a>
</td></tr></table>`;
}

const p = (html: string) => `<p style="margin:0 0 16px;font:16px/1.65 ${FONT};color:${C.body}">${html}</p>`;

export function ackEmail(first: string, postcode: string) {
  const lines = [
    `Hi ${first},`,
    `Thanks for reaching out. We've got your request to check screen availability around ${postcode}.`,
    "Here's what happens next. We're checking the grocery-store and medical-centre screens near you to see which locations have space.",
    "Then a local strategist will call you to go through the options. You decide what fits. No pressure, no obligation.",
    `Can't wait? Call us on ${PHONE}.`,
  ];
  const html = shell(
    lines[1],
    "Request received",
    `<tr><td style="padding:36px 32px 12px">
<p style="margin:0 0 18px;font:800 26px/1.2 ${FONT};letter-spacing:-.02em;color:${C.ink}">${esc(lines[0])}</p>
${p(esc(lines[1]))}${p(esc(lines[2]))}${p(esc(lines[3]))}
</td></tr>
<tr><td style="padding:0 32px 32px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.lav};border-radius:16px"><tr>
<td style="padding:22px 24px">
<p style="margin:0 0 14px;font:600 16px/1.5 ${FONT};color:${C.ink}">${esc(lines[4]).replace(PHONE, `<span style="white-space:nowrap">${PHONE}</span>`)}</p>
${button(PHONE_TEL, `Call ${PHONE}`)}
</td></tr></table>
<p style="margin:28px 0 0;font:16px/1.6 ${FONT};color:${C.body}">Thanks,<br><strong style="color:${C.ink}">The Shopa Marketing team</strong></p>
</td></tr>`,
  );
  const text = `${lines.join("\n\n")}\n\nThanks,\nThe Shopa Marketing team\n${SITE}`;
  return { subject: "We've got your request. Here's what happens next.", html, text };
}

export type Row = readonly [label: string, value: string];

export function teamEmail(main: Row[], tracking: Row[], lead: { name: string; business: string; postcode: string; phone: string; email: string }) {
  const table = (rows: Row[], size: number) =>
    rows
      .map(
        ([l, v], i) => `<tr>
<td style="padding:11px 0;${i ? `border-top:1px solid ${C.line};` : ""}width:38%;vertical-align:top;font:600 ${size - 1}px/1.5 ${FONT};color:${C.muted}">${esc(l)}</td>
<td style="padding:11px 0;${i ? `border-top:1px solid ${C.line};` : ""}vertical-align:top;font:600 ${size}px/1.5 ${FONT};color:${C.ink};word-break:break-word">${linkify(l, v)}</td></tr>`,
      )
      .join("");
  const linkify = (l: string, v: string) =>
    l === "Phone"
      ? `<a href="tel:${esc(v.replace(/[^\d+]/g, ""))}" style="color:${C.violet};text-decoration:none">${esc(v)}</a>`
      : l === "Email"
        ? `<a href="mailto:${esc(v)}" style="color:${C.violet};text-decoration:none">${esc(v)}</a>`
        : esc(v);

  const subject = `New OOH lead: ${lead.business} (${lead.postcode})`;
  const html = shell(
    `${lead.name} · ${lead.phone} · ${lead.postcode}`,
    "New lead",
    `<tr><td style="padding:34px 32px 8px">
<p style="margin:0 0 6px;font:600 12px/1 ${MONO};letter-spacing:.12em;text-transform:uppercase;color:${C.violet}">OOH landing page</p>
<p style="margin:0 0 10px;font:800 26px/1.2 ${FONT};letter-spacing:-.02em;color:${C.ink}">${esc(lead.business || lead.name)}</p>
${p(`Reply to this email to respond to ${esc(lead.name)} directly.`)}
${button(`tel:${esc(lead.phone.replace(/[^\d+]/g, ""))}`, `Call ${lead.name.split(" ")[0]}`)}${button(`mailto:${esc(lead.email)}`, "Email")}
</td></tr>
<tr><td style="padding:16px 32px 28px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${table(main, 15)}</table></td></tr>
${
  tracking.length
    ? `<tr><td style="padding:0 32px 32px">
<p style="margin:0 0 4px;font:600 11px/1 ${MONO};letter-spacing:.12em;text-transform:uppercase;color:${C.muted}">Tracking</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${table(tracking, 13)}</table></td></tr>`
    : ""
}`,
  );
  const text = [...main, ...tracking].map(([l, v]) => `${l}: ${v}`).join("\n");
  return { subject, html, text };
}
