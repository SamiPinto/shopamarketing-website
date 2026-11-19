"use client";

import { useEffect, useRef } from "react";

const TOUCHPOINTS = [
  { label: "Social media", on: false },
  { label: "Search", on: false },
  { label: "Grocery shopping", on: true },
  { label: "Medical appointments", on: true },
  { label: "Local community", on: false },
];

export function Manifesto() {
  const fadeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = fadeRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / (vh * 0.5)));
      el.style.opacity = String(1 - p * 0.82);
      el.style.filter = `blur(${p * 6}px)`;
      el.style.letterSpacing = `${-0.04 + p * 0.06}em`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <p data-reveal className="text-[12px] font-bold tracking-[0.14em] text-violet uppercase">
          Why repeated visibility matters
        </p>
        <h2
          data-reveal
          className="mt-5 text-[clamp(2.6rem,6vw+0.5rem,6rem)] leading-[0.95] tracking-[-0.045em]"
        >
          One post. One scroll.
          <br />
          <span ref={fadeRef} className="inline-block text-muted will-change-[opacity,filter]">
            Easy to forget.
          </span>
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div data-reveal>
            <p className="max-w-[48ch] text-[19px] leading-relaxed text-body">
              People move between social media, search, shopping, appointments and their local community every day.
              The businesses they remember are often the ones that keep appearing across several of those touchpoints.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Everyday local touchpoints">
              {TOUCHPOINTS.map((t) => (
                <li
                  key={t.label}
                  className={`rounded-full px-4 py-2 text-[14px] font-bold ${
                    t.on ? "bg-grad text-white shadow-[var(--shadow-sm)]" : "bg-lav text-muted"
                  }`}
                >
                  {t.label}
                  {t.on && <span className="sr-only"> (where these campaigns appear)</span>}
                </li>
              ))}
            </ul>
          </div>

          <blockquote data-reveal style={{ "--rd": 1 } as React.CSSProperties} className="relative border-l-[3px] border-violet-2 pl-7 lg:pl-10">
            <p className="text-[clamp(1.6rem,1.6vw+1rem,2.4rem)] leading-[1.15] font-extrabold tracking-[-0.03em]">
              You don’t need to be seen everywhere.{" "}
              <span className="grad-text">You need to keep showing up in the right local places.</span>
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
