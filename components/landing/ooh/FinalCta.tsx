"use client";

import { useState } from "react";
import { Garland } from "./Festive";
import { useLead } from "./LeadProvider";

export function FinalCta() {
  const { postcode, goToForm } = useLead();
  const [value, setValue] = useState(postcode);
  const [error, setError] = useState("");

  return (
    <section id="final-cta" className="bg-white px-4 pb-24 sm:px-6 lg:pb-32">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] bg-night px-6 py-16 text-white sm:px-12 lg:px-20 lg:py-24">
        <div className="night-atmos" />
        <div className="night-grid" />
        <div className="grain" />
        <div className="snow" aria-hidden />
        <Garland />
        <div className="relative">
          <p className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.12em] text-[#f2a6ff] uppercase">
            <span className="pulse-dot size-2 rounded-full bg-[#ff4d6d]" aria-hidden />
            Limited positions by location
          </p>
          <h2 className="mt-5 max-w-[14ch] text-[clamp(2.6rem,6vw+0.5rem,5.6rem)] leading-[0.95] tracking-[-0.045em]">
            Where could your business <span className="grad-text-light">be showing up?</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-[18px] text-haze">
            Enter your postcode to see which grocery-store and medical-centre locations are currently available nearby.
          </p>

          <form
            noValidate
            className="mt-9 flex max-w-[520px] flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              const pc = value.trim();
              if (!/^\d{4}$/.test(pc)) {
                setError("Enter a 4-digit Australian postcode.");
                return;
              }
              setError("");
              goToForm({ postcode: pc, source: "final_cta" });
            }}
          >
            <label className="flex-1">
              <span className="sr-only">Postcode</span>
              <input
                className="field min-h-[58px] border-white/15 bg-white/8 text-[20px] font-bold tracking-[0.2em] text-white placeholder:tracking-normal placeholder:text-white/45 focus:bg-white/12"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={4}
                placeholder="Your postcode"
                value={value}
                onChange={(e) => setValue(e.target.value.replace(/\D/g, "").slice(0, 4))}
                aria-invalid={!!error}
                aria-describedby={error ? "final-pc-err" : undefined}
              />
            </label>
            <button
              type="submit"
              className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-full bg-white px-7 text-[17px] font-bold text-ink transition-transform duration-300 ease-out-expo hover:-translate-y-px active:scale-[0.98]"
            >
              Check my postcode <span aria-hidden>→</span>
            </button>
          </form>
          {error && (
            <p id="final-pc-err" className="mt-2 text-[14px] font-semibold text-[#ff8fa8]">
              {error}
            </p>
          )}
          <p className="mt-8 font-mono text-[12px] tracking-[0.06em] text-haze/80">
            Under $60 per week · Four fortnightly payments · Minimum 24-month lock-in
          </p>
        </div>
      </div>
    </section>
  );
}
