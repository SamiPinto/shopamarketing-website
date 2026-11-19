import { NextResponse } from 'next/server';
import { sendMail, smtpConfigured, list } from '@/lib/email';
import { contactAckEmail, contactAckText, contactTeamEmail } from '@/lib/siteEmails';

interface ContactPayload {
  services: string[];
  goal: string;
  timeline: string;
  budget: string;
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
  website: string;
  message: string;
  consent1: boolean;
  consent2: boolean;
  company?: string;    // honeypot — real users never fill this
  renderedAt?: number; // time-trap — ms timestamp of when the form mounted
}

function isValid(p: ContactPayload): boolean {
  return (
    Array.isArray(p.services) && p.services.length > 0 &&
    typeof p.fullName === 'string' && p.fullName.trim().length > 0 &&
    typeof p.phone === 'string' && p.phone.trim().length > 0 &&
    typeof p.email === 'string' && /.+@.+\..+/.test(p.email)
  );
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot filled = bot. Report success so it moves on.
  if (payload.company) return NextResponse.json({ ok: true });

  // Time-trap: a real person can't complete this multi-step form in under 3s.
  // Report success (drop silently) so bots don't retry.
  if (typeof payload.renderedAt === 'number' && Date.now() - payload.renderedAt < 3000) {
    return NextResponse.json({ ok: true });
  }

  if (!isValid(payload)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  const diag = new URL(request.url).searchParams.get('diag') === 'shopa-smtp';
  let emailOk = false;
  let sheetOk = false;
  let emailErr = '';
  let sheetErr = '';

  // Email and the Sheet webhook are independent, so run them together.
  const rows: [string, string][] = [
    ['Phone', payload.phone],
    ['Email', payload.email],
    ['Website', payload.website],
    ['Services', payload.services.join(', ')],
    ['Main goal', payload.goal],
    ['Timeline', payload.timeline],
    ['Budget', payload.budget],
    ['Message', payload.message],
    ['Marketing SMS consent', payload.consent1 ? 'Yes' : 'No'],
    ['Non-marketing SMS consent', payload.consent2 ? 'Yes' : 'No'],
  ];
  const name = payload.fullName.trim();
  const business = (payload.businessName || '').trim();
  const first = name.split(/\s+/)[0].slice(0, 40);
  const teamTo = list(process.env.CONTACT_TO, 'pkennedy@shopamarketing.com.au');

  const sendEmail = async () => {
    if (!smtpConfigured()) return;
    try {
      await sendMail({
        to: teamTo,
        cc: list(process.env.CONTACT_CC, 'neil@shopamarketing.com'),
        bcc: list(process.env.CONTACT_BCC, 'sami@shopamarketing.com'),
        replyTo: payload.email, // replies go straight to the customer
        subject: `New enquiry: ${name}${business ? ` (${business})` : ''}`,
        text: [`Name: ${name}`, `Business: ${business || '\u2014'}`, ...rows.map(([l, v]) => `${l}: ${v || '\u2014'}`)].join('\n'),
        html: contactTeamEmail(rows, { name, business, phone: payload.phone, email: payload.email }),
      });
      emailOk = true;
    } catch (err) {
      emailErr = err instanceof Error ? err.message : String(err);
      console.error('[contact] email failed:', err);
    }
  };

  const sendAck = async () => {
    if (!smtpConfigured()) return;
    try {
      await sendMail({
        to: [payload.email.trim()],
        replyTo: teamTo.join(', '),
        subject: "Thanks for getting in touch with Shopa Marketing",
        text: contactAckText(first),
        html: contactAckEmail(first),
      });
    } catch (err) {
      console.error('[contact] ack email failed:', err);
    }
  };

  const sendSheet = async () => {
    if (!webhookUrl) return;
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      sheetOk = res.ok;
      if (!res.ok) sheetErr = `HTTP ${res.status}`;
    } catch (err) {
      sheetErr = err instanceof Error ? err.message : String(err);
      console.error('[contact] sheet webhook failed:', err);
    }
  };

  await Promise.all([sendEmail(), sendAck(), sendSheet()]);

  const status = diag ? {
    email: emailOk ? 'ok' : smtpConfigured() ? `failed: ${emailErr}` : 'not-set',
    sheet: sheetOk ? 'ok' : webhookUrl ? `failed: ${sheetErr}` : 'not-set',
  } : undefined;

  if (emailOk || sheetOk) return NextResponse.json({ ok: true, status });

  console.error('[contact] not delivered — SMTP2GO and CONTACT_WEBHOOK_URL both unset/failed');
  return NextResponse.json({ ok: false, reason: 'not-configured', status }, { status: 503 });
}
