import { LeadForm } from "./LeadForm";

const TICKS = [
  "Limited advertisers at each location",
  "Easy payment options",
  "Unlimited creative updates included",
  "Include 1 month boost for Christmas",
];

export function Check() {
  return (
    <span className="bg-grad grid size-5 shrink-0 place-items-center rounded-full" aria-hidden>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

export function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`flex gap-0.5 text-star ${className}`} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-night pt-[72px] text-white">
      <div className="night-atmos" />
      <div className="night-grid" />
      <div className="grain" />
      <div className="snow" aria-hidden />

      <div className="relative mx-auto grid max-w-[1200px] gap-12 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,470px)] lg:gap-16 lg:pt-20 lg:pb-28">
        <div className="lg:pt-6">
          <p
            className="fade-up inline-flex items-center gap-2 rounded-full bg-white/8 px-3.5 py-1.5 text-[11.5px] font-bold tracking-[0.13em] text-[#d9c8ff] uppercase ring-1 ring-white/10"
            style={{ "--d": "0ms" } as React.CSSProperties}
          >
            <span className="bg-grad size-1.5 rounded-full" />
            Hyper-local advertising for Australian businesses
          </p>

          <h1 className="mt-6 text-[clamp(2.7rem,4.6vw+1rem,5.2rem)] leading-[0.98] tracking-[-0.045em]">
            <span className="h1-line">
              <span style={{ "--i": 0 } as React.CSSProperties}>Be the business</span>
            </span>
            <span className="h1-line">
              <span style={{ "--i": 1 } as React.CSSProperties}>
                <span className="grad-text-light">local customers</span>
              </span>
            </span>
            <span className="h1-line">
              <span style={{ "--i": 2 } as React.CSSProperties}>
                <span className="grad-text-light">remember.</span>
              </span>
            </span>
          </h1>

          <p
            className="fade-up mt-7 max-w-[56ch] text-[18px] leading-relaxed text-haze sm:text-[19px]"
            style={{ "--d": "420ms" } as React.CSSProperties}
          >
            Customers rarely remember a business after seeing it once.
            <br />
            Build familiarity by showing up in the local places they already visit{"\u00a0"}— on screens inside grocery stores
            and medical centres.
          </p>

          <p
            className="fade-up mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-white"
            style={{ "--d": "500ms" } as React.CSSProperties}
          >
            <span className="text-[clamp(1.5rem,1vw+1.2rem,2rem)] font-bold tracking-[-0.02em]">
              For{" "}
              <span className="grad-text-light text-[clamp(3rem,3vw+2rem,4.4rem)] leading-none font-extrabold tracking-[-0.05em]">
                $60
              </span>{" "}
              per week
            </span>
            <span className="text-[17px] font-medium text-haze sm:text-[18px]">(on a 2-year lock-in)</span>
          </p>

          <ul className="fade-up mt-8 grid gap-3 sm:grid-cols-2" style={{ "--d": "580ms" } as React.CSSProperties}>
            {TICKS.map((t) => (
              <li key={t} className="flex items-center gap-3 text-[16px] font-semibold text-white">
                <Check />
                {t}
              </li>
            ))}
          </ul>

          <div
            className="fade-up mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-7"
            style={{ "--d": "620ms" } as React.CSSProperties}
          >
            <div className="flex items-center gap-3">
              <span className="text-[30px] font-extrabold tracking-tight">4.8</span>
              <span className="leading-tight">
                <Stars />
                <span className="text-[13px] text-haze">400+ Google reviews</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="pulse-dot size-2.5 rounded-full bg-ok" aria-hidden />
              <span className="text-[14px] text-haze">
                <strong className="text-[17px] text-white">1,500+</strong> local businesses supported each year
              </span>
            </div>
          </div>
        </div>

        <div className="fade-up lg:sticky lg:top-24 lg:self-start" style={{ "--d": "300ms" } as React.CSSProperties}>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
