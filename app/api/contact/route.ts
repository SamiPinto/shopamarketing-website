import { NextResponse } from 'next/server';
import { sendMail, smtpConfigured, verifySmtp } from '@/lib/email';

// Temporary diagnostic: GET /api/contact?diag=shopa-smtp
// Reports which delivery env vars are set + whether SMTP auth succeeds
// (no secret values are returned). Remove once delivery is confirmed working.
export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get('diag') !== 'shopa-smtp') {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  const smtp = await verifySmtp();
  return NextResponse.json({
    env: {
      SMTP_USER: Boolean(process.env.SMTP_USER),
      SMTP_PASS: Boolean(process.env.SMTP_PASS),
      SMTP_HOST: process.env.SMTP_HOST || '(default) smtp.office365.com',
      SMTP_PORT: process.env.SMTP_PORT || '(default) 587',
      CONTACT_WEBHOOK_URL: Boolean(process.env.CONTACT_WEBHOOK_URL),
      UNSUBSCRIBE_WEBHOOK_URL: Boolean(process.env.UNSUBSCRIBE_WEBHOOK_URL),
    },
    smtpVerify: smtp,
  });
}

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

  // Email and the Sheet webhook are independent — run them together rather
  // than back-to-back. The Office 365 SMTP handshake alone costs ~4s, so the
  // webhook used to be pure added latency on top of it.
  const sendEmail = async () => {
    if (!smtpConfigured()) return;
    try {
      await sendMail({
        // TEMPORARY: all enquiries go to Vicky only. Restore the env-driven
        // to/cc/bcc block below (and the `list` import) to revert.
        //   to:  list(process.env.CONTACT_TO,  'pkennedy@shopamarketing.com.au'),
        //   cc:  list(process.env.CONTACT_CC,  'neil@shopamarketing.com'),
        //   bcc: list(process.env.CONTACT_BCC, 'sami@shopamarketing.com'),
        to: ['vicky@shopamarketing.com'],
        replyTo: payload.email, // replies go straight to the customer
        subject: `New enquiry: ${payload.fullName}${payload.businessName ? ` (${payload.businessName})` : ''}`,
        text: [
          `Name: ${payload.fullName}`,
          `Business: ${payload.businessName || '\u2014'}`,
          `Phone: ${payload.phone}`,
          `Email: ${payload.email}`,
          `Website: ${payload.website || '\u2014'}`,
          `Services: ${payload.services.join(', ')}`,
          `Main Goal: ${payload.goal || '\u2014'}`,
          `Timeline: ${payload.timeline || '\u2014'}`,
          `Budget: ${payload.budget || '\u2014'}`,
          `Marketing SMS Consent: ${payload.consent1 ? 'Yes' : 'No'}`,
          `Non-marketing SMS Consent: ${payload.consent2 ? 'Yes' : 'No'}`,
          '',
          'Message:',
          payload.message || '\u2014',
        ].join('\n'),
      });
      emailOk = true;
    } catch (err) {
      emailErr = err instanceof Error ? err.message : String(err);
      console.error('[contact] email failed:', err);
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

  await Promise.all([sendEmail(), sendSheet()]);

  const status = diag ? {
    email: emailOk ? 'ok' : smtpConfigured() ? `failed: ${emailErr}` : 'not-set',
    sheet: sheetOk ? 'ok' : webhookUrl ? `failed: ${sheetErr}` : 'not-set',
  } : undefined;

  if (emailOk || sheetOk) return NextResponse.json({ ok: true, status });

  console.error('[contact] not delivered — SMTP and CONTACT_WEBHOOK_URL both unset/failed');
  return NextResponse.json({ ok: false, reason: 'not-configured', status }, { status: 503 });
}
