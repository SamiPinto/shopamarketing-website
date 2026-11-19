import { CreativeVideo } from "./CreativeVideo";

export function Creative() {
  return (
    <section className="overflow-x-clip bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-6">
        <div>
          <p data-reveal className="text-[12px] font-bold tracking-[0.14em] text-violet uppercase">
            Your message can change
          </p>
          <h2 data-reveal className="mt-4 text-[clamp(2.1rem,3.4vw+0.9rem,3.6rem)]">
            Keep showing up. <span className="grad-text">Keep the creative fresh.</span>
          </h2>
          <p data-reveal className="mt-6 max-w-[46ch] text-[18px] leading-relaxed text-body">
            A long-term campaign does not mean showing the same message for two years. Our campaigns include unlimited
            creative updates, so the screen can change with your seasons, services and priorities.
          </p>
        </div>

        <div data-reveal style={{ "--rd": 1 } as React.CSSProperties} className="-mx-4 sm:-mx-6 lg:-mr-24 lg:ml-0 xl:-mr-32">
          <CreativeVideo />
        </div>
      </div>
    </section>
  );
}
