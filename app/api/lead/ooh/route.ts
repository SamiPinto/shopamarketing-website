import { ackEmail, teamEmail, type Row } from "@/lib/landing/oohEmails";
import { LEAD_BCC, LEAD_TO, SENDERS } from "@/lib/landing/leads";

export const runtime = "nodejs";

const MAIN: [string, string][] = [
  ["business_name", "Business"],
  ["full_name", "Name"],
  ["phone", "Phone"],
  ["email", "Email"],
  ["postcode", "Postcode"],
  ["locations", "Locations"],
  ["consent_24_month", "Accepted 24-month terms"],
];
const TRACKING: [string, string][] = [
  ["utm_source", "utm_source"],
  ["utm_medium", "utm_medium"],
  ["utm_campaign", "utm_campaign"],
  ["utm_content", "utm_content"],
  ["utm_term", "utm_term"],
  ["gclid", "gclid"],
  ["fbclid", "fbclid"],
  ["page", "Page"],
  ["event_id", "Event ID"],
];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LOCATIONS: Record<string, string> = {
  both: "Grocery stores and medical centres",
  grocery: "Grocery stores",
  medical: "Medical centres",
};

async function send(apiKey: string, payload: Record<string, unknown>) {
  const res = await fetch("https://api.smtp2go.com/v3/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Smtp2go-Api-Key": apiKey },
    body: JSON.stringify(payload),
  });
  const result = await res.json().catch(() => null);
  // SMTP2GO can return 200 with a failed recipient, so check the counts too.
  if (!res.ok || !(result?.data?.succeeded >= 1) || result?.data?.failed) {
    throw new Error(`${res.status} ${JSON.stringify(result)}`);
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.SMTP2GO_API_KEY;
  const from = SENDERS.ooh;
  const to = LEAD_TO;
  const bcc = LEAD_BCC;
  if (!apiKey) {
    console.error("[lead/ooh] SMTP2GO_API_KEY not set");
    return Response.json({ ok: false }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const val = (k: string) => String(body[k] ?? "").replace(/[\r\n]+/g, " ").slice(0, 500).trim();
  const lead = {
    name: val("full_name"),
    business: val("business_name"),
    postcode: val("postcode"),
    phone: val("phone"),
    email: val("email"),
  };
  if (
    !/^\d{4}$/.test(lead.postcode) ||
    lead.name.length < 2 ||
    lead.phone.replace(/\D/g, "").length < 8 ||
    !EMAIL_RE.test(lead.email)
  ) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const pretty = (k: string) =>
    k === "locations"
      ? (LOCATIONS[val(k)] ?? val(k))
      : k === "consent_24_month"
        ? (body[k] === true ? "Yes" : "No")
        : val(k);
  const rows = (fields: [string, string][]) =>
    fields.map(([k, label]): Row => [label, pretty(k)]).filter(([, v]) => v);
  const team = teamEmail(rows(MAIN), rows(TRACKING), lead);
  // Goes to an address anyone can type in, so it only echoes the first name and the 4-digit postcode.
  const ack = ackEmail(lead.name.split(" ")[0].slice(0, 40), lead.postcode);

  const [teamResult, ackResult] = await Promise.allSettled([
    send(apiKey, {
      sender: from,
      to,
      ...(bcc.length && { bcc }),
      custom_headers: [{ header: "Reply-To", value: lead.email }],
      subject: team.subject,
      text_body: team.text,
      html_body: team.html,
    }),
    send(apiKey, {
      sender: from,
      to: [lead.email],
      custom_headers: [{ header: "Reply-To", value: to.join(", ") }],
      subject: ack.subject,
      text_body: ack.text,
      html_body: ack.html,
    }),
  ]);
  if (ackResult.status === "rejected") console.error("[lead] ack email failed", String(ackResult.reason));
  if (teamResult.status === "rejected") {
    console.error("[lead] team email failed", String(teamResult.reason));
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
