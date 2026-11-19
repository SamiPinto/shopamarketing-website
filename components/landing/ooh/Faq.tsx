import { Snowflake } from "./Festive";
const FAQS = [
  {
    q: "How much does the campaign cost?",
    a: "Campaigns cost under $60 per week and are paid in four fortnightly payments. Exact details are provided with the available location options.",
  },
  { q: "How long is the campaign?", a: "Campaigns have a minimum 24-month lock-in." },
  {
    q: "Can I change my advertisement?",
    a: "Yes. Our campaigns include unlimited creative updates, allowing the message to change with seasons, services and priorities.",
  },
  {
    q: "Are medical-centre positions category-exclusive?",
    a: "No. Medical-centre advertising at this rate is not category-exclusive.",
  },
  {
    q: "Can you guarantee customers or sales?",
    a: "No. This is a brand-awareness campaign designed to build local visibility, familiarity and recognition.",
  },
];

export function Faq() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <Snowflake size={260} className="flake-deco -bottom-20 -left-20 text-violet/[0.05]" />
      <div className="relative mx-auto grid max-w-[1200px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p data-reveal className="text-[12px] font-bold tracking-[0.14em] text-violet uppercase">
            Good questions, straight answers
          </p>
          <h2 data-reveal className="mt-4 max-w-[12ch] text-[clamp(2.1rem,3.4vw+0.9rem,3.6rem)]">
            Before you check your postcode.
          </h2>
        </div>
        <div data-reveal className="border-t border-line">
          {FAQS.map((f, i) => (
            <details key={f.q} className="faq group border-b border-line" open={i === 0}>
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-bold tracking-[-0.01em] sm:text-[20px]">
                {f.q}
                <span className="faq-icon grid size-9 shrink-0 place-items-center rounded-full bg-lav text-violet transition-colors group-hover:bg-lav-2" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-[60ch] pb-6 text-[17px] text-body">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
