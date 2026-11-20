"use client";

import { useEffect, useSyncExternalStore } from "react";
import { PHONE, PHONE_HREF, fbq, track } from "./site";

const noop = () => () => {};
function read(key: string) {
  try {
    return sessionStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}

export function ThankYouBody() {
  const name = useSyncExternalStore(noop, () => read("shopa_fn"), () => "");
  const postcode = useSyncExternalStore(noop, () => read("shopa_postcode"), () => "");

  useEffect(() => {
    try {
      if (sessionStorage.getItem("shopa_lead_fired")) return;
      sessionStorage.setItem("shopa_lead_fired", "1");
    } catch {}
    const eventID = read("shopa_event_id") || `lead.${Date.now()}`;
    track("generate_lead", { value: 1, currency: "AUD" });
    fbq("track", "Lead", { content_category: "Local Screen Advertising" }, { eventID });
  }, []);

  const steps = [
    { t: "Now", d: `We’re checking grocery-store and medical-centre screens ${postcode ? `around ${postcode}` : "in your area"}.` },
    { t: "Next", d: "A local strategist will call you with the locations that have space." },
    { t: "Then", d: "You review the options and decide what fits. No obligation." },
  ];

  return (
    <div className="max-w-[760px]">
      <p className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.12em] text-[#f2a6ff] uppercase">
        <span className="pulse-dot size-2 rounded-full bg-ok" aria-hidden />
        Request received
      </p>
      <h1 className="mt-5 text-[clamp(2.6rem,5vw+0.5rem,4.8rem)] leading-[0.98] tracking-[-0.045em]">
        Thanks{name ? `, ${name}` : ""}. <span className="grad-text-light">We’re checking your postcode.</span>
      </h1>
      <ol className="mt-12 grid gap-px overflow-hidden rounded-[24px] bg-white/10 sm:grid-cols-3">
        {steps.map((s) => (
          <li key={s.t} className="bg-night-2 p-6">
            <p className="font-mono text-[12px] tracking-[0.12em] text-haze uppercase">{s.t}</p>
            <p className="mt-3 text-[16px] text-white">{s.d}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-haze">
        Want to talk sooner? Call{" "}
        <a href={PHONE_HREF} onClick={() => track("call_click", { location: "thank_you" })} className="-my-3 inline-flex min-h-[44px] items-center font-bold text-white underline-offset-4 hover:underline">
          {PHONE}
        </a>
        .
      </p>
    </div>
  );
}
