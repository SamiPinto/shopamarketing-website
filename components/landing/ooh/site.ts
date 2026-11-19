export const PHONE = "1800 247 034";
export const PHONE_HREF = "tel:+611800247034";
export const LEAD_ENDPOINT = "/api/lead/ooh";
export const THANK_YOU = "/thank-you-ooh";

export type Place = "both" | "grocery" | "medical";

export const PLACES: { value: Place; label: string }[] = [
  { value: "both", label: "Both" },
  { value: "grocery", label: "Grocery stores" },
  { value: "medical", label: "Medical centres" },
];

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  fbq?: (...args: unknown[]) => void;
};

export function track(event: string, extra: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  (w.dataLayer = w.dataLayer || []).push({ event, lead_service: "ooh", ...extra });
}

export function fbq(...args: unknown[]) {
  if (typeof window === "undefined") return;
  (window as DataLayerWindow).fbq?.(...args);
}

