import TemplateScripts from "@/components/TemplateScripts";
import ServiceHero from "@/components/ServiceHero";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import ServicesDeck from "@/components/ServicesDeck";
import { homeServices } from "@/components/homeServicesData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Marketing Services Australia | Every Channel, One Team',
  description:
    'SEO, Google Ads, social media, websites, graphic design and OOH advertising for Australian SMEs — planned and run by one team from a single strategy.',
};

export default function ServicesPage() {

  const channels = [
    { label: 'SEO', top: '14%', left: '28%' },
    { label: 'Google Ads', top: '8%', left: '62%' },
    { label: 'Social Media', top: '34%', left: '86%' },
    { label: 'Website', top: '72%', left: '82%' },
    { label: 'OOH', top: '90%', left: '55%' },
    { label: 'Design', top: '80%', left: '20%' },
    { label: 'Content', top: '40%', left: '13%' },
  ];

  const mixerChannels = [
    { label: 'SEO', lvl: '55%', lvl2: '78%' },
    { label: 'Ads', lvl: '70%', lvl2: '62%' },
    { label: 'Social', lvl: '40%', lvl2: '66%' },
    { label: 'Web', lvl: '62%', lvl2: '48%' },
    { label: 'OOH', lvl: '30%', lvl2: '58%' },
    { label: 'Design', lvl: '48%', lvl2: '72%' },
  ];

  const clientLogos = [
    { src: '/assets/img/client/mcdonalds.webp',   alt: "McDonald's" },
    { src: '/assets/img/client/nike.webp',         alt: 'Nike' },
    { src: '/assets/img/client/kfc.webp',          alt: 'KFC' },
    { src: '/assets/img/client/bookingcom.webp',   alt: 'Booking.com' },
    { src: '/assets/img/client/raywhite.webp',     alt: 'Ray White' },
    { src: '/assets/img/client/pizzahut.webp',     alt: 'Pizza Hut' },
    { src: '/assets/img/client/redrooster.webp',   alt: 'Red Rooster' },
    { src: '/assets/img/client/adairs.webp',       alt: 'Adairs' },
    { src: '/assets/img/client/bridgestone.webp',  alt: 'Bridgestone' },
    { src: '/assets/img/client/oroton.webp',       alt: 'Oroton' },
    { src: '/assets/img/client/jbl.webp',          alt: 'JBL' },
    { src: '/assets/img/client/ops.webp',          alt: 'OPS' },
  ];

  return (
    <>
      <TemplateScripts />

      {/* preloader */}
      <div id="preloader">
        <div className="loader_line"></div>
      </div>

      <ServiceHero
        headline="Every Service You Need To Grow, In One Team."
        subtext="From SEO to paid ads, web design to outdoor advertising — Shopa Marketing delivers full-funnel marketing built specifically for SMEs."
        bgImage="/assets/img/breadcrumb/services-hero-v2.webp"
      />

      {/* ── SERVICES DIRECTORY — expanding deck ── */}
      <div className="pt-110 pb-110 bg-default">
        <div className="container chy-container-1">
          <div className="section-title-wrap text-center mb-50">
            <h5 className="chy-subtitle-1 wow fadeInDown">our services</h5>
            <h2 className="chy-title-1 chy-split-in-right chy-split-text">Seven Ways We Grow Your Business</h2>
            <p className="chy-section-para-1 wow fadeInUp" style={{ maxWidth: '660px', margin: '10px auto 0' }}>
              Pick one, mix a few, or hand us the lot. Every service below is run by senior specialists and built to work harder when combined.
            </p>
          </div>

          <div className="wow fadeInUp">
            <ServicesDeck services={homeServices} />
          </div>
        </div>
      </div>

      {/* ── ONE STRATEGY — gradient band with channel hub ── */}
      <div className="wds-ledger-area pt-110 pb-110" data-navbar-dark="true">
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="mb-30">
                <h2 className="chy-title-1" style={{ color: '#fff' }}>
                  One Strategy Across Every Channel.
                </h2>
                <p className="chy-section-para-1 wow fadeInUp" style={{ color: 'rgba(255,255,255,0.95)', marginTop: '18px' }}>
                  Digital and physical. Online and offline. The best results never come from a single channel — they come from channels working together, keeping your brand visible, trusted and top of mind wherever your customers look.
                </p>
                <p className="chy-section-para-1 wow fadeInUp" style={{ color: 'rgba(255,255,255,0.95)', marginTop: '16px' }}>
                  That&apos;s why every Shopa service is built to combine: one coordinated strategy, one team, and one report that actually makes sense. Disconnected marketing produces disconnected results — so we never sell you pieces without the plan.
                </p>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="wds-hub wow fadeInRight" data-wow-duration="1.2s">
                <span className="wds-hub__core">One Strategy</span>
                {channels.map((c) => (
                  <span key={c.label} className="wds-hub__chip" style={{ top: c.top, left: c.left }}>{c.label}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS — masonry review wall ── */}
      <ServiceTestimonials />

      {/* ── CLIENTS TICKER ── */}
      <div className="pt-90 pb-90 bg-default fix">
        <div className="container chy-container-1">
          <div className="section-title-wrap text-center mb-50">
            <h5 className="chy-subtitle-1 wow fadeInDown">our clients</h5>
            <h2 className="chy-title-1 chy-split-in-right chy-split-text">Trusted By The Best Brands</h2>
          </div>
        </div>
        <div className="clients-ticker-wrap">
          <div className="clients-ticker-track">
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div key={i} className="clients-logo-card">
                <img src={logo.src} alt={logo.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA — dark gradient closer ── */}
      <div className="pt-100 pb-100" data-navbar-dark="true" style={{ background: 'var(--chy-gd-1)' }}>
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="mb-30">
                <div className="wds-stat__accent"></div>
                <h2 className="chy-title-1" style={{ color: '#fff' }}>Not Sure Where to Start? That&apos;s Our Job.</h2>
                <p className="chy-section-para-1 wow fadeInUp" style={{ marginTop: '18px', color: 'rgba(255,255,255,0.85)' }}>
                  Tell us what you&apos;re trying to achieve and we&apos;ll recommend the mix of services that gets you there — no jargon, no pressure, and no paying for channels you don&apos;t need.
                </p>
                <div style={{ marginTop: '28px' }}>
                  <a href="/contact-us" className="chy-pr-btn-1 chy-pr-btn-1--white wow fadeInLeft">
                    <span className="text">Get A Quote</span>
                    <span className="icon"><i className="fa-solid fa-right-long"></i></span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="wds-mixer wow fadeInRight" data-wow-duration="1.2s">
                <div className="wds-mixer__head">
                  <i className="fa-solid fa-sliders"></i>
                  <span className="wds-mixer__title">Your marketing mix</span>
                </div>
                <div className="wds-mixer__tracks">
                  {mixerChannels.map((ch) => (
                    <div key={ch.label} className="wds-mixer__track" style={{ '--lvl': ch.lvl, '--lvl2': ch.lvl2 } as React.CSSProperties}>
                      <div className="wds-mixer__rail">
                        <span className="wds-mixer__fill"></span>
                        <span className="wds-mixer__knob"></span>
                      </div>
                      <span className="wds-mixer__label">{ch.label}</span>
                    </div>
                  ))}
                </div>
                <div className="wds-mixer__foot">
                  <span className="wds-mixer__foot-flat">Everyone else sells the same package.</span>
                  <span className="wds-mixer__foot-tuned">Your mix, tuned to your goal &mdash; nothing you don&apos;t need.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* back to top */}
      <div className="scroll-top has-home-1">
        <div className="scroll-top-wrap">
          <i className="icon-1 fal fa-long-arrow-up"></i>
        </div>
      </div>

      {/* overlay */}
      <div className="offcanvas-overlay"></div>
    </>
  );
}
