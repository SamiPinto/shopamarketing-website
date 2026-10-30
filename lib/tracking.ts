// lib/tracking.ts
// Shopa Marketing: client-side conversion tracking.
// Meta Pixel (browser) + Meta CAPI (server, via /api/meta-capi) share one event_id so Meta dedupes.
// GA4 + Google Ads get the same events through the GTM dataLayer (GTM-PNPQ4RJG).

"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export type LeadUserData = {
  email?: string;
  phone?: string; // full E.164 preferred, e.g. +61412345678
  fullName?: string;
  countryCode?: string; // ISO-2, e.g. "AU"
};

type MetaEventName = "Lead" | "Contact" | "Schedule";

function newEventId(prefix: string) {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}_${rand}`;
}

function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

function firePixel(event: MetaEventName, params: Record<string, unknown>, eventId: string) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params, { eventID: eventId });
}

function sendCapi(body: Record<string, unknown>) {
  // keepalive lets the request finish even if the user navigates away
  return fetch("/api/meta-capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => undefined);
}

function splitName(full?: string) {
  const parts = (full || "").trim().split(/\s+/).filter(Boolean);
  return { fn: parts[0], ln: parts.length > 1 ? parts[parts.length - 1] : undefined };
}

/**
 * Call ONLY after the contact form API returns success.
 * Fires: Meta Lead (Pixel + CAPI) and dataLayer `generate_lead` (GA4 key event + Google Ads conversion).
 */
export function trackLead(
  user: LeadUserData,
  formData: { services?: string[]; goal?: string; timeline?: string; budget?: string } = {}
) {
  const eventId = newEventId("lead");
  const { fn, ln } = splitName(user.fullName);
  const customData = {
    content_name: "Strategy Call Form",
    content_category: (formData.services || []).join(", "),
    lead_goal: formData.goal,
    lead_timeline: formData.timeline,
    lead_budget: formData.budget,
    currency: "AUD",
    value: 0,
  };

  firePixel("Lead", customData, eventId);

  void sendCapi({
    event_name: "Lead",
    event_id: eventId,
    event_source_url: window.location.href,
    user: { email: user.email, phone: user.phone, fn, ln, country: user.countryCode },
    custom_data: customData,
  });

  pushDataLayer({
    event: "generate_lead",
    event_id: eventId,
    form_name: "strategy_call",
    lead_services: customData.content_category,
    lead_goal: formData.goal,
    lead_timeline: formData.timeline,
    lead_budget: formData.budget,
    // Google Ads enhanced conversions (read by GTM "User-Provided Data" variable)
    user_data: {
      email: user.email,
      phone_number: user.phone,
      address: { first_name: fn, last_name: ln, country: user.countryCode },
    },
  });

  return eventId;
}

/** Click-to-contact (tel:, mailto:, WhatsApp). Fires Meta Contact + dataLayer `contact_click`. */
export function trackContact(method: "phone" | "email" | "whatsapp", target: string) {
  const eventId = newEventId("contact");
  const customData = { content_name: `click_${method}`, contact_method: method };

  firePixel("Contact", customData, eventId);
  void sendCapi({
    event_name: "Contact",
    event_id: eventId,
    event_source_url: window.location.href,
    user: {},
    custom_data: customData,
  });
  pushDataLayer({ event: "contact_click", event_id: eventId, contact_method: method, contact_target: target });
  return eventId;
}

/** Funnel visibility for the 5-step form (GA4 only, not sent to Meta). */
export function trackFormStep(step: number, stepName: string, answer?: string | string[]) {
  pushDataLayer({
    event: step === 1 ? "form_start" : "form_step",
    form_name: "strategy_call",
    form_step: step,
    form_step_name: stepName,
    form_answer: Array.isArray(answer) ? answer.join(", ") : answer,
  });
}
