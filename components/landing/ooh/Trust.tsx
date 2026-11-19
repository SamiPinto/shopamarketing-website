"use client";

import { useEffect, useRef, useState } from "react";
import { Stars } from "./Hero";
import { Snowflake } from "./Festive";

const STATS = [
  { to: 4.8, decimals: 1, suffix: "★", label: "Google rating" },
  { to: 400, decimals: 0, suffix: "+", label: "Google reviews" },
  { to: 1500, decimals: 0, suffix: "+", label: "businesses each year" },
  { to: 5000, decimals: 0, suffix: "+", label: "campaigns managed" },
];

const REVIEWS = [
  {
    q: "Advertising with Shopa Marketing was an easy process and communication with the team was prompt.",
    who: "David Wallis",
    role: "RAWR Support Services · Digital screen advertising",
    href: "https://share.google/2WPoOQBWTgvsDhieV",
  },
  {
    q: "I am very happy with Shopa Marketing. … Victor spent time asking questions relating to our business.",
    who: "Kathy Macqueen",
    role: "Yours in Paws Dog Day Care & Training · Advertising",
    href: "https://share.google/Eox4jshNf7ocUSc3E",
  },
];

function CountUp({ to, decimals, suffix }: { to: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1400);
          setVal(to * (1 - Math.pow(1 - p, 4)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setVal(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {val.toLocaleString("en-AU", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export function Trust() {
  return (
    <section className="relative overflow-hidden bg-lav py-24 lg:py-32">
      <Snowflake size={180} className="flake-deco top-16 -left-16 text-violet/[0.07]" />
      <Snowflake size={120} className="flake-deco -right-10 bottom-10 text-violet/[0.06] [animation-direction:reverse]" />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <p data-reveal className="text-[12px] font-bold tracking-[0.14em] text-violet uppercase">
          Proof from local businesses
        </p>
        <h2 data-reveal className="mt-4 max-w-[20ch] text-[clamp(2.1rem,3.4vw+0.9rem,3.6rem)]">
          Supporting more than <span className="grad-text">1,500 local businesses</span> each year.
        </h2>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-line lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white px-6 py-8 sm:px-8">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-[clamp(2.2rem,2.4vw+1rem,3.4rem)] leading-none font-extrabold tracking-[-0.04em]">
                <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
              </dd>
              <dd className="mt-2 text-[14px] text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <figure data-reveal className="relative overflow-hidden rounded-[28px] bg-night p-8 text-white sm:p-12 lg:row-span-2">
            <div className="night-atmos opacity-70" />
            <div className="snow" aria-hidden />
            <div className="relative">
              <Stars />
              <blockquote className="mt-6 text-[clamp(1.5rem,1.4vw+1rem,2.25rem)] leading-[1.18] font-extrabold tracking-[-0.025em]">
                “I’ve also been advertising with them in{" "}
                <span className="grad-text-light">IGAs and medical centres</span> and couldn’t be happier with the
                results.”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="bg-grad grid size-11 place-items-center rounded-full text-[15px] font-bold">TK</span>
                <span className="leading-tight">
                  <span className="block font-bold">TJ Kooner</span>
                  <span className="text-[14px] text-haze">Website, SEO and local advertising client</span>
                </span>
              </figcaption>
            </div>
          </figure>

          {REVIEWS.map((r, i) => (
            <figure key={r.who} data-reveal style={{ "--rd": i + 1 } as React.CSSProperties} className="rounded-[28px] bg-white p-7 shadow-[var(--shadow-sm)] sm:p-8">
              <Stars />
              <blockquote className="mt-4 text-[17px] leading-relaxed text-ink">“{r.q}”</blockquote>
              <figcaption className="mt-5 flex items-end justify-between gap-4">
                <span className="leading-tight">
                  <span className="block font-bold">{r.who}</span>
                  <span className="text-[13px] text-muted">{r.role}</span>
                </span>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] shrink-0 items-center text-[13px] font-bold text-violet hover:underline"
                >
                  On Google ↗
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
