// SMTP2GO HTTP API sender, used by /api/contact and /api/unsubscribe. Needs SMTP2GO_API_KEY
// in Vercel. The sender must be on a domain verified in SMTP2GO (shopamarketing.com.au).
const FROM = process.env.EMAIL_FROM || 'Shopa Marketing <website@shopamarketing.com.au>';

export function smtpConfigured(): boolean {
  return Boolean(process.env.SMTP2GO_API_KEY);
}

// Comma/space separated env list -> array (drops blanks)
export function list(v: string | undefined, fallback = ''): string[] {
  return (v || fallback)
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// Case-insensitive de-dupe that preserves the first-seen casing of each address.
function uniq(addrs: string[]): string[] {
  const seen = new Map<string, string>();
  for (const a of addrs) {
    const key = a.trim().toLowerCase();
    if (key && !seen.has(key)) seen.set(key, a.trim());
  }
  return Array.from(seen.values());
}

export async function sendMail(opts: {
  to: string[];
  cc?: string[];
  bcc?: string[];
  replyTo?: string;
  subject: string;
  text: string;
}) {
  // No address gets more than one copy: dedupe `to`, then drop cc/bcc already receiving it.
  const lc = (arr: string[]) => new Set(arr.map((a) => a.toLowerCase()));
  const to = uniq(opts.to);
  const toKeys = lc(to);
  const cc = uniq(opts.cc ?? []).filter((a) => !toKeys.has(a.toLowerCase()));
  const usedKeys = lc([...to, ...cc]);
  const bcc = uniq(opts.bcc ?? []).filter((a) => !usedKeys.has(a.toLowerCase()));

  const r = await fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Smtp2go-Api-Key': process.env.SMTP2GO_API_KEY! },
    body: JSON.stringify({
      sender: FROM,
      to,
      ...(cc.length && { cc }),
      ...(bcc.length && { bcc }),
      subject: opts.subject.replace(/[\r\n]/g, ' '),
      text_body: opts.text,
      ...(opts.replyTo && { custom_headers: [{ header: 'Reply-To', value: opts.replyTo.replace(/[\r\n]/g, '') }] }),
    }),
  });
  const data = (await r.json().catch(() => ({}))).data || {};
  // SMTP2GO returns 200 even when a recipient fails, so check the counts too.
  if (!r.ok || data.error || data.failed || !data.succeeded) {
    throw new Error(`SMTP2GO ${r.status} ${data.error_code || ''} ${data.error || JSON.stringify(data.failures || '')}`.trim());
  }
}
