const STEPS = [
  { title: "Choose your area", body: "Tell us the exact postcode or postcodes you want to target." },
  { title: "We check availability", body: "We identify grocery-store and medical-centre locations with space." },
  { title: "Review your options", body: "We send you the relevant locations so you can decide what fits." },
  { title: "Keep it current", body: "Refresh your creative as your services, seasons and priorities change." },
];

export function Process() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <p data-reveal className="text-[12px] font-bold tracking-[0.14em] text-violet uppercase">
          How it works
        </p>
        <h2 data-reveal className="mt-4 max-w-[16ch] text-[clamp(2.1rem,3.4vw+0.9rem,3.6rem)]">
          Your postcode is all we need to start.
        </h2>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <span className="absolute top-[19px] right-[12%] left-[19px] hidden h-[2px] bg-[linear-gradient(90deg,#7135ff,#ad00f5,transparent)] md:block" aria-hidden />
          {STEPS.map((s, i) => (
            <li key={s.title} data-reveal style={{ "--rd": i } as React.CSSProperties} className="relative flex gap-5 md:block">
              <span className="bg-grad relative z-10 grid size-[40px] shrink-0 place-items-center rounded-[12px] font-mono text-[14px] font-medium text-white shadow-[var(--shadow-sm)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[22px] md:mt-7">{s.title}</h3>
                <p className="mt-2 text-[16px] text-body">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
