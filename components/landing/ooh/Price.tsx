import { Bow } from "./Festive";

const FACTS = [
  { big: "Four", small: "fortnightly payments" },
  { big: "Unlimited", small: "creative updates across our campaigns" },
  { big: "24 months", small: "minimum lock-in" },
];

export function Price() {
  return (
    <section className="relative overflow-hidden bg-night py-24 text-white lg:py-32">
      <div className="night-atmos" />
      <div className="grain" />
      <div className="snow" aria-hidden />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <p data-reveal className="text-[12px] font-bold tracking-[0.14em] text-[#d9c8ff] uppercase">
          Accessible local advertising
        </p>
        <h2 data-reveal className="mt-4 max-w-[18ch] text-[clamp(2.1rem,3.4vw+0.9rem,3.6rem)]">
          Local visibility for <span className="grad-text-light">under $60 a week.</span>
        </h2>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-white/10 lg:grid-cols-[1.3fr_1fr]">
          <div data-reveal className="relative flex flex-col justify-between gap-10 overflow-hidden bg-night-2 p-8 sm:p-12">
            <div className="gift-ribbon hidden sm:block" aria-hidden>
              <Bow className="absolute -top-3 left-1/2 -translate-x-1/2" />
            </div>
            <p className="relative font-mono text-[12px] tracking-[0.12em] text-haze uppercase">Per week, per campaign</p>
            <p className="relative leading-[0.85] font-extrabold tracking-[-0.06em]">
              <span className="align-top text-[clamp(1.4rem,2vw+0.5rem,2.4rem)] text-haze">under</span>
              <span className="grad-text-light ml-2 text-[clamp(6rem,14vw,11rem)]">$60</span>
            </p>
            <p className="relative max-w-[40ch] text-[15px] text-haze">That’s less than $9 a day to keep your name in front of local customers.</p>
          </div>
          <div className="grid gap-px">
            {FACTS.map((f, i) => (
              <div key={f.big} data-reveal style={{ "--rd": i + 1 } as React.CSSProperties} className="flex items-baseline gap-4 bg-night-2 px-8 py-7 sm:px-10">
                <span className="text-[clamp(1.8rem,1.6vw+1rem,2.6rem)] font-extrabold tracking-[-0.04em]">{f.big}</span>
                <span className="text-[15px] text-haze">{f.small}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 max-w-[80ch] text-[13px] text-haze/80">
          Location availability and campaign conditions apply. This is brand-awareness advertising and does not
          guarantee enquiries, customers or sales.
        </p>
      </div>
    </section>
  );
}
