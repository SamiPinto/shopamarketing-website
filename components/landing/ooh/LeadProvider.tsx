"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Place } from "./site";
import { track } from "./site";

type LeadState = {
  postcode: string;
  setPostcode: (v: string) => void;
  business: string;
  setBusiness: (v: string) => void;
  place: Place;
  setPlace: (v: Place) => void;
  goToForm: (opts?: { place?: Place; postcode?: string; source?: string }) => void;
};

const LeadContext = createContext<LeadState | null>(null);

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [postcode, setPostcode] = useState("");
  const [business, setBusiness] = useState("");
  const [place, setPlace] = useState<Place>("both");

  const goToForm = useCallback<LeadState["goToForm"]>((opts = {}) => {
    if (opts.place) setPlace(opts.place);
    if (opts.postcode) setPostcode(opts.postcode);
    track("cta_click", { source: opts.source ?? "unknown" });
    const card = document.getElementById("lead");
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      const target = card.querySelector<HTMLElement>("[data-autofocus]");
      target?.focus({ preventScroll: true });
    }, 500);
  }, []);

  const value = useMemo(
    () => ({ postcode, setPostcode, business, setBusiness, place, setPlace, goToForm }),
    [postcode, business, place, goToForm],
  );

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead must be used inside LeadProvider");
  return ctx;
}

export function FormLink({
  children,
  className,
  place,
  source,
}: {
  children: React.ReactNode;
  className?: string;
  place?: Place;
  source: string;
}) {
  const { goToForm } = useLead();
  return (
    <a
      href="#lead"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        goToForm({ place, source });
      }}
    >
      {children}
    </a>
  );
}
