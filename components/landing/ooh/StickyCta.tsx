"use client";

import { useEffect, useState } from "react";
import { FormLink } from "./LeadProvider";
import { PHONE_HREF, track } from "./site";

export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const lead = document.getElementById("lead");
    const final = document.getElementById("final-cta");
    if (!lead || !final) return;
    const state = { leadAbove: false, finalVisible: false };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === lead) state.leadAbove = !e.isIntersecting && e.boundingClientRect.top < 0;
        if (e.target === final) state.finalVisible = e.isIntersecting;
      }
      setShow(state.leadAbove && !state.finalVisible);
    });
    io.observe(lead);
    io.observe(final);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-full bg-night/90 p-1.5 shadow-[0_20px_40px_-12px_rgba(16,9,34,.6)] backdrop-blur-md transition-[transform,opacity] duration-500 ease-ios md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0"
      }`}
      aria-hidden={!show}
    >
      <a
        href={PHONE_HREF}
        tabIndex={show ? 0 : -1}
        onClick={() => track("call_click", { location: "sticky" })}
        className="inline-flex min-h-[48px] items-center rounded-full px-5 text-[15px] font-bold text-white"
      >
        Call
      </a>
      <FormLink source="sticky" className="btn-primary inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full text-[15px] font-bold">
        Check my postcode <span className="arrow" aria-hidden>→</span>
      </FormLink>
    </div>
  );
}
