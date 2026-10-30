// app/api/meta-capi/route.ts
// Server-side Meta Conversions API relay for dataset 1214724136895084.
// Env vars (Vercel > Project > Settings > Environment Variables):
//   META_PIXEL_ID=1214724136895084
//   META_CAPI_TOKEN=<generated in Events Manager > Settings > Conversions API>
//   META_TEST_EVENT_CODE=<optional, only while testing; remove after>

import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

export const runtime = "nodejs";

const API_VERSION = process.env.META_API_VERSION || "v23.0";
const ALLOWED_EVENTS = new Set(["Lead", "Contact", "Schedule"]);

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");
const norm = (v?: string) => (v || "").trim().toLowerCase();
const normPhone = (v?: string) => (v || "").replace(/[^\d]/g, "").replace(/^0+/, "");
const hashIf = (v: string) => (v ? [sha256(v)] : undefined);

type Body = {
  event_name: string;
  event_id: string;
  event_source_url?: string;
  user?: { email?: string; phone?: string; fn?: string; ln?: string; country?: string };
  custom_data?: Record<string, unknown>;
};

export async function POST(req: NextRequest) {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  if (!ALLOWED_EVENTS.has(body.event_name) || !body.event_id) {
    return NextResponse.json({ ok: false, error: "bad_event" }, { status: 400 });
  }

  // Only accept events from our own site
  const origin = req.headers.get("origin") || "";
  if (origin && !/^https:\/\/(www\.)?shopamarketing\.com\.au$/.test(origin) && process.env.NODE_ENV === "production") {
    return NextResponse.json({ ok: false, error: "bad_origin" }, { status: 403 });
  }

  const u = body.user || {};
  const fbp = req.cookies.get("_fbp")?.value;
  let fbc = req.cookies.get("_fbc")?.value;
  // Build fbc from fbclid if the cookie hasn't been set yet
  if (!fbc && body.event_source_url) {
    try {
      const fbclid = new URL(body.event_source_url).searchParams.get("fbclid");
      if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
    } catch {}
  }
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || undefined;

  const user_data: Record<string, unknown> = {
    em: hashIf(norm(u.email)),
    ph: hashIf(normPhone(u.phone)),
    fn: hashIf(norm(u.fn)),
    ln: hashIf(norm(u.ln)),
    country: hashIf(norm(u.country)),
    client_ip_address: ip,
    client_user_agent: req.headers.get("user-agent") || undefined,
    fbp,
    fbc,
  };
  Object.keys(user_data).forEach((k) => user_data[k] === undefined && delete user_data[k]);

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: body.event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.event_id, // matches Pixel eventID for deduplication
        action_source: "website",
        event_source_url: body.event_source_url,
        user_data,
        custom_data: body.custom_data || {},
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  const res = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
  );
  const json = await res.json().catch(() => ({}));
  if (!res.ok) console.error("Meta CAPI error", json);
  return NextResponse.json({ ok: res.ok, meta: json }, { status: res.ok ? 200 : 502 });
}
