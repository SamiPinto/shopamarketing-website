"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bow } from "./Festive";
import { useLead } from "./LeadProvider";
import { LEAD_ENDPOINT, PLACES, THANK_YOU, fbq, track } from "./site";

type Errors = Partial<Record<"postcode" | "business" | "name" | "phone" | "email" | "consent", string>>;

const POSTCODE_RE = /^\d{4}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LeadForm() {
  const router = useRouter();
  const { postcode, setPostcode, business, setBusiness, place, setPlace } = useLead();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const started = useRef(false);
  const openedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  function markStart() {
    if (started.current) return;
    started.current = true;
    openedAt.current = Date.now();
    track("form_start");
    fbq("trackCustom", "StartEnquiry", { service: "local advertising" });
  }

  function focusFirstInvalid(errs: Errors) {
    const key = Object.keys(errs)[0];
    if (key) formRef.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
  }

  function next() {
    const errs: Errors = {};
    if (!POSTCODE_RE.test(postcode.trim())) errs.postcode = "Enter a 4-digit Australian postcode.";
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstInvalid(errs);
    track("form_step", { step: 2, postcode: postcode.trim(), place });
    setStep(2);
    window.setTimeout(() => formRef.current?.querySelector<HTMLElement>('[name="business"]')?.focus(), 60);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 1) return next();

    const errs: Errors = {};
    if (business.trim().length < 2) errs.business = "Tell us your business name.";
    if (name.trim().length < 2) errs.name = "Tell us your name.";
    if (phone.replace(/\D/g, "").length < 8) errs.phone = "Enter a phone number we can reach you on.";
    if (!EMAIL_RE.test(email.trim())) errs.email = "Enter a valid email address.";
    if (!consent) errs.consent = "Please confirm you understand the campaign terms.";
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstInvalid(errs);

    const fd = new FormData(e.currentTarget);
    if (fd.get("hp")) return;

    const params = new URLSearchParams(window.location.search);
    const eventId = `lead.${Date.now()}.${Math.random().toString(36).slice(2, 8)}`;
    const payload = {
      service: "ooh",
      postcode: postcode.trim(),
      locations: place,
      business_name: business.trim(),
      full_name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      consent_24_month: consent,
      elapsed_ms: Date.now() - openedAt.current,
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      utm_content: params.get("utm_content") ?? "",
      utm_term: params.get("utm_term") ?? "",
      gclid: params.get("gclid") ?? "",
      fbclid: params.get("fbclid") ?? "",
      event_id: eventId,
      page: window.location.href,
    };

    setSending(true);
    setSendError("");
    try {
      if (LEAD_ENDPOINT) {
        const res = await fetch(LEAD_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
      }
      track("form_submit", { postcode: payload.postcode, place });
      try {
        sessionStorage.setItem("shopa_fn", name.trim().split(" ")[0]);
        sessionStorage.setItem("shopa_postcode", payload.postcode);
        sessionStorage.setItem("shopa_event_id", eventId);
      } catch {}
      router.push(THANK_YOU);
    } catch {
      setSending(false);
      setSendError(`Something went wrong sending your details. Please try again, or call us on 1800 247 034.`);
    }
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-err`} className="mt-1.5 text-[13px] font-semibold text-err">
        {errors[k]}
      </p>
    ) : null;

  return (
    <div
      id="lead"
      className="relative scroll-mt-24 rounded-[28px] bg-white p-6 text-ink sm:p-8"
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,255,255,.1), 0 0 70px -6px rgba(170,0,255,.45), 0 40px 90px -30px rgba(0,0,0,.6)",
      }}
    >
      <Bow className="pointer-events-none absolute -top-7 -right-3 rotate-[14deg] drop-shadow-[0_6px_10px_rgba(120,0,30,.35)] sm:-right-5" />
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] font-medium tracking-[0.12em] text-violet uppercase">
          Step {step} of 2 · about 30 seconds
        </p>
        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="min-h-[44px] text-[13px] font-bold text-muted underline-offset-4 hover:text-ink hover:underline"
          >
            ← Back
          </button>
        )}
      </div>
      <div className="mb-6 h-1 overflow-hidden rounded-full bg-lav-2" aria-hidden>
        <div
          className="bg-grad h-full rounded-full transition-[width] duration-500 ease-out-expo"
          style={{ width: step === 1 ? "50%" : "100%" }}
        />
      </div>

      <form ref={formRef} noValidate onSubmit={submit} onFocus={markStart}>
        <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        {step === 1 ? (
          <div key="s1" className="fade-up">
            <h2 className="text-[30px] sm:text-[34px]">What’s available in your postcode?</h2>
            <p className="mt-2 text-[15px] text-body">
              Tell us where you want your business to be seen and we’ll check the screens near you.
            </p>

            <label className="mt-6 block">
              <span className="mb-1.5 block text-[14px] font-bold">Postcode</span>
              <input
                name="postcode"
                data-autofocus
                className="field text-[20px] font-bold tracking-[0.2em]"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={4}
                placeholder="e.g. 3000"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                aria-invalid={!!errors.postcode}
                aria-describedby={errors.postcode ? "postcode-err" : undefined}
              />
              {err("postcode")}
            </label>

            <fieldset className="mt-5">
              <legend className="mb-2 text-[14px] font-bold">Which locations interest you?</legend>
              <div className="grid grid-cols-3 gap-2">
                {PLACES.map((p) => (
                  <label
                    key={p.value}
                    className={`flex min-h-[48px] cursor-pointer items-center justify-center rounded-[12px] border-[1.5px] px-2 text-center text-[13.5px] leading-tight font-bold transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-violet-2/20 ${
                      place === p.value
                        ? "border-violet-2 bg-lav text-violet"
                        : "border-line-2 bg-[#fcfbff] text-body hover:border-violet-2/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="place"
                      value={p.value}
                      checked={place === p.value}
                      onChange={() => setPlace(p.value)}
                      className="sr-only"
                    />
                    {p.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="submit"
              className="btn-primary mt-6 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full text-[17px] font-bold"
            >
              Check availability <span className="arrow" aria-hidden>→</span>
            </button>
          </div>
        ) : (
          <div key="s2" className="fade-up">
            <h2 className="text-[28px] sm:text-[32px]">
              Great — we’ll check <span className="grad-text">{postcode}</span>.
            </h2>
            <p className="mt-2 text-[15px] text-body">Where should we send the locations with space?</p>

            <div className="mt-5 grid gap-4">
              <label className="block">
                <span className="mb-1.5 block text-[14px] font-bold">Business name</span>
                <input
                  name="business"
                  className="field"
                  autoComplete="organization"
                  placeholder="Your business name"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  aria-invalid={!!errors.business}
                  aria-describedby={errors.business ? "business-err" : undefined}
                />
                {err("business")}
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[14px] font-bold">Your name</span>
                  <input
                    name="name"
                    className="field"
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-err" : undefined}
                  />
                  {err("name")}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[14px] font-bold">Phone number</span>
                  <input
                    name="phone"
                    type="tel"
                    className="field"
                    autoComplete="tel"
                    placeholder="04xx xxx xxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-err" : undefined}
                  />
                  {err("phone")}
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-[14px] font-bold">Email</span>
                <input
                  name="email"
                  type="email"
                  className="field"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@business.com.au"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-err" : undefined}
                />
                {err("email")}
              </label>
              <label className="flex cursor-pointer gap-3 rounded-[14px] bg-lav p-3.5 text-[13.5px] leading-snug text-body">
                <input
                  name="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 size-5 shrink-0 accent-violet-2"
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? "consent-err" : undefined}
                />
                <span>
                  I understand campaigns have a minimum 24-month lock-in and are paid in four fortnightly payments.
                </span>
              </label>
              {err("consent")}
            </div>

            <button
              type="submit"
              disabled={sending}
              className="btn-primary mt-6 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full text-[17px] font-bold disabled:opacity-70"
            >
              {sending ? "Sending…" : "Show me available locations"} {!sending && <span className="arrow" aria-hidden>→</span>}
            </button>
            {sendError && (
              <p role="alert" className="mt-3 text-[13.5px] font-semibold text-err">
                {sendError}
              </p>
            )}
          </div>
        )}
      </form>

      <p className="mt-4 flex items-center justify-center gap-2 text-[13px] text-muted">
        <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        No obligation. We’ll only contact you about relevant locations.
      </p>
    </div>
  );
}
