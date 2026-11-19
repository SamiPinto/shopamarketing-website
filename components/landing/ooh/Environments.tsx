"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLead } from "./LeadProvider";
import { Snowflake } from "./Festive";
import { Check } from "./Hero";
import { track } from "./site";
import type { Place } from "./site";

const PHOTO = { w: 1774, h: 887 };
// Inner screen corners (TL, TR, BR, BL) measured from local-environments.png, 1px outside the glass edge.
const QUADS = {
  grocery: [[281, 144], [517, 171], [517, 326], [281, 324]],
  medical: [[1485, 214], [1721, 193], [1722, 362], [1485, 359]],
} as const;
const AD = { w: 236, h: 156 };

function solve(A: number[][], b: number[]) {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c] / M[c][c];
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((row, i) => row[n] / row[i]);
}

// Projective (homography) fit: maps the flat ad onto the TV's four corners so it foreshortens with the screen.
function fitScreen(pts: readonly (readonly number[])[], scale: number) {
  const { w, h } = AD;
  const box = [[0, 0], [w, 0], [w, h], [0, h]];
  const A: number[][] = [];
  const b: number[] = [];
  box.forEach(([x, y], i) => {
    const u = pts[i][0] * scale;
    const v = pts[i][1] * scale;
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    b.push(v);
  });
  const [a, c, e, bb, d, f, g, hh] = solve(A, b);
  return { transform: `matrix3d(${a},${bb},0,${g},${c},${d},0,${hh},0,0,1,0,${e},${f},0,1)` };
}

function usePhotoScale() {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / PHOTO.w));
    ro.observe(el);
    return () => ro.disconnect();
  }, [el]);
  return [setEl, scale] as const;
}

const SLIDE_COUNT = 3;

function ScreenAd({ name, postcode, slide }: { name: string; postcode: string; slide: number }) {
  const display = name.trim() || "Your Business";
  const size = Math.max(8.5, 17 - display.length * 0.42);
  const where = postcode ? `Proudly local · ${postcode}` : "Proudly local";
  return (
    <div className="screen absolute inset-0 overflow-hidden bg-[#140a2e] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_10%_0%,#7135ff_0%,transparent_60%),radial-gradient(90%_90%_at_100%_100%,#ad00f5_0%,transparent_65%)] opacity-90" />
      <div className={`screen-slide ${slide === 0 ? "is-on" : ""}`}>
        <div className="flex h-full flex-col justify-center px-[8cqw]">
          <p className="font-mono text-[5cqw] tracking-[0.14em] text-white/70 uppercase">{where}</p>
          <p className="mt-[2cqw] leading-[0.95] font-extrabold tracking-[-0.03em] break-words" style={{ fontSize: `${size}cqw` }}>
            {display}
          </p>
        </div>
      </div>
      <div className={`screen-slide ${slide === 1 ? "is-on" : ""}`}>
        <div className="flex h-full flex-col justify-center px-[8cqw]">
          <p className="font-mono text-[5cqw] tracking-[0.14em] text-[#f2a6ff] uppercase">Seasonal message</p>
          <p className="mt-[2cqw] text-[13cqw] leading-[0.95] font-extrabold tracking-[-0.03em]">Christmas hours now on</p>
          <p className="mt-[3cqw] truncate text-[5.5cqw] font-bold text-white/80">{display}</p>
        </div>
      </div>
      <div className={`screen-slide ${slide === 2 ? "is-on" : ""}`}>
        <div className="flex h-full flex-col justify-center px-[8cqw]">
          <p className="font-mono text-[5cqw] tracking-[0.14em] text-[#c6a2ff] uppercase">Campaign update</p>
          <p className="mt-[2cqw] text-[13cqw] leading-[0.95] font-extrabold tracking-[-0.03em]">New service now available</p>
          <p className="mt-[3cqw] truncate text-[5.5cqw] font-bold text-white/80">{display}</p>
        </div>
      </div>
      <span className="absolute top-[4cqw] right-[4cqw] rounded-[1.5cqw] bg-white/15 px-[2.5cqw] py-[0.8cqw] font-mono text-[3.6cqw] tracking-[0.1em]">
        AD
      </span>
    </div>
  );
}

const CARDS: {
  place: Exclude<Place, "both">;
  num: string;
  title: string;
  stat: string;
  statLabel: string;
  body: string;
  bullets: string[];
  cta: string;
}[] = [
  {
    place: "grocery",
    num: "01 · Grocery stores",
    title: "Part of the weekly routine.",
    stat: "Several",
    statLabel: "visits a week by local shoppers",
    body: "Local customers visit grocery stores several times a week. Your business appears within a familiar, frequently visited local environment.",
    bullets: ["Repeated local visibility", "Limited advertisers at each site", "Postcode-level targeting"],
    cta: "Show me grocery-store locations",
  },
  {
    place: "medical",
    num: "02 · Medical centres",
    title: "A local audience with time to notice.",
    stat: "25–30",
    statLabel: "minutes, the approximate average wait",
    body: "Average medical-centre waiting periods are approximately 25–30 minutes, creating a different local awareness opportunity.",
    bullets: ["Professional local environment", "Limited advertisers at each site", "Postcode-level targeting"],
    cta: "Show me medical-centre locations",
  },
];

export function Environments() {
  const { business, setBusiness, postcode, goToForm } = useLead();
  const [slide, setSlide] = useState(0);
  const [view, setView] = useState<"grocery" | "medical">("grocery");
  const [typed, setTyped] = useState(false);
  const [photoRef, scale] = usePhotoScale();

  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % SLIDE_COUNT), 3600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="locations" className="relative overflow-hidden bg-lav py-24 lg:py-32">
      <Snowflake size={220} className="flake-deco -top-10 -right-14 text-violet/[0.07]" />
      <Snowflake size={90} className="flake-deco top-[38%] -left-8 text-violet/[0.06] [animation-direction:reverse]" />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p data-reveal className="text-[12px] font-bold tracking-[0.14em] text-violet uppercase">
              Two local environments
            </p>
            <h2 data-reveal className="mt-4 max-w-[16ch] text-[clamp(2.1rem,3.4vw+0.9rem,3.6rem)]">
              Where are local customers already spending time?
            </h2>
          </div>

          <label data-reveal className="block w-full lg:w-[380px]">
            <span className="mb-2 flex items-center gap-2 text-[14px] font-bold">
              <span className="pulse-dot size-2 rounded-full bg-magenta" aria-hidden />
              See your business on screen
            </span>
            <input
              className="field bg-white text-[17px] font-bold"
              placeholder="Type your business name"
              maxLength={40}
              value={business}
              onChange={(e) => {
                setBusiness(e.target.value);
                if (!typed) {
                  setTyped(true);
                  track("preview_used");
                }
              }}
            />
          </label>
        </div>

        <figure data-reveal className="mt-10">
          <div className="relative overflow-hidden rounded-[28px] bg-night shadow-[var(--shadow)] max-sm:aspect-square">
            <div
              className="relative aspect-[2/1] transition-transform duration-700 ease-ios max-sm:h-full max-sm:w-[200%] max-sm:[transform:translateX(var(--tx))]"
              style={{ "--tx": view === "medical" ? "-50%" : "0%" } as React.CSSProperties}
            >
              <div ref={photoRef} className="absolute inset-0">
                <Image
                  src="/lp/ooh/local-environments.png"
                  alt="A landscape television near grocery-store checkouts and a large landscape television in a medical-centre waiting room"
                  fill
                  sizes="(max-width: 640px) 200vw, 1200px"
                  className="object-cover"
                />
                {scale > 0 &&
                  (["grocery", "medical"] as const).map((k, i) => (
                    <div
                      key={k}
                      className="screen-fit absolute top-0 left-0 origin-top-left"
                      style={{
                        width: AD.w,
                        height: AD.h,
                        ...fitScreen(QUADS[k], scale),
                      }}
                    >
                      <ScreenAd name={business} postcode={postcode} slide={(slide + i) % SLIDE_COUNT} />
                    </div>
                  ))}
              </div>
            </div>

            <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 rounded-full bg-night/75 px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-white uppercase backdrop-blur">
              <span className="pulse-dot size-1.5 rounded-full bg-[#ff4d6d]" aria-hidden />
              Now showing
            </div>

            <div className="absolute right-3 bottom-3 flex rounded-full bg-night/80 p-1 backdrop-blur sm:hidden">
              {(["grocery", "medical"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setView(k)}
                  aria-pressed={view === k}
                  className={`min-h-[44px] rounded-full px-4 text-[13px] font-bold transition-colors ${
                    view === k ? "bg-white text-ink" : "text-white/80"
                  }`}
                >
                  {k === "grocery" ? "Grocery" : "Medical"}
                </button>
              ))}
            </div>
          </div>
          <figcaption className="mt-4 max-w-[70ch] text-[14px] text-muted">
            Landscape screens near grocery checkouts and inside medical-centre waiting rooms place your business within
            everyday community environments. Preview is illustrative.
          </figcaption>
        </figure>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {CARDS.map((c, i) => (
            <article
              key={c.place}
              data-reveal
              style={{ "--rd": i } as React.CSSProperties}
              className="group flex flex-col rounded-[28px] bg-white p-7 shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-[var(--shadow)] sm:p-9"
            >
              <p className="font-mono text-[12px] tracking-[0.12em] text-violet uppercase">{c.num}</p>
              <h3 className="mt-4 text-[clamp(1.6rem,1.4vw+1rem,2.2rem)]">{c.title}</h3>
              <div className="mt-6 flex items-baseline gap-3 border-y border-line py-5">
                <span className="grad-text text-[44px] leading-none font-extrabold tracking-[-0.04em]">{c.stat}</span>
                <span className="text-[14px] leading-snug text-muted">{c.statLabel}</span>
              </div>
              <p className="mt-6 text-body">{c.body}</p>
              <ul className="mt-5 grid gap-2.5">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-[15px] font-semibold">
                    <Check />
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="#lead"
                onClick={(e) => {
                  e.preventDefault();
                  goToForm({ place: c.place, source: `card_${c.place}` });
                }}
                className="link-arrow mt-8 inline-flex min-h-[44px] items-center gap-2 self-start font-bold text-violet"
              >
                {c.cta} <span className="arrow" aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
