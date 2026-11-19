import { NextResponse } from 'next/server';
import { sendMail, smtpConfigured, list } from '@/lib/email';
import { unsubAckEmail, unsubAckText, unsubTeamEmail } from '@/lib/siteEmails';

interface UnsubPayload {
  email: string;
  duration: string;
  reason: string;
  company?: string;    // honeypot — real users never fill this
  renderedAt?: number; // time-trap — ms timestamp of when the form mounted
}

function isValid(p: UnsubPayload): boolean {
  return (
    typeof p.email === 'string' && /.+@.+\..+/.test(p.email) &&
    typeof p.reason === 'string' && p.reason.trim().length > 0
  );
}

export async function POST(request: Request) {
  let payload: UnsubPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot filled = bot. Report success so it moves on.
  if (payload.company) return NextResponse.json({ ok: true });

  // Time-trap: real users take a few seconds; bots submit instantly.
  if (typeof payload.renderedAt === 'number' && Date.now() - payload.renderedAt < 3000) {
    return NextResponse.json({ ok: true });
  }

  if (!isValid(payload)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const webhookUrl = process.env.UNSUBSCRIBE_WEBHOOK_URL;
  let emailOk = false;
  let sheetOk = false;

  // 1) Email the team (HTML) and acknowledge the requester, in parallel
  if (smtpConfigured()) {
    const email = payload.email.trim();
    const permanent = payload.duration === 'Permanently';
    const rows: [string, string][] = [['Email', email], ['Duration', payload.duration], ['Reason', payload.reason]];
    const [team, ack] = await Promise.allSettled([
      sendMail({
        to: list(process.env.UNSUB_TO, 'helpdesk@shopamarketing.com,customerservice@shopamarketing.com'),
        cc: list(process.env.UNSUB_CC, 'sami@shopamarketing.com'),
        replyTo: email,
        subject: `Unsubscribe request: ${email}`,
        text: rows.map(([l, v]) => `${l}: ${v}`).join('\n'),
        html: unsubTeamEmail(rows, email),
      }),
      sendMail({
        to: [email],
        subject: "You've been unsubscribed from Shopa Marketing",
        text: unsubAckText(permanent),
        html: unsubAckEmail(permanent),
      }),
    ]);
    emailOk = team.status === 'fulfilled';
    if (team.status === 'rejected') console.error('[unsubscribe] email failed:', team.reason);
    if (ack.status === 'rejected') console.error('[unsubscribe] ack email failed:', ack.reason);
  }

  // 2) Save to Google Sheet via the Apps Script webhook
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      sheetOk = res.ok;
    } catch (err) {
      console.error('[unsubscribe] sheet webhook failed:', err);
    }
  }

  if (emailOk || sheetOk) return NextResponse.json({ ok: true });

  console.error('[unsubscribe] not delivered — SMTP2GO and UNSUBSCRIBE_WEBHOOK_URL both unset/failed');
  return NextResponse.json({ ok: false, reason: 'not-configured' }, { status: 503 });
}
