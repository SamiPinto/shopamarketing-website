import TemplateScripts from "@/components/TemplateScripts";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import ScrollScrubVideo from "@/components/ScrollScrubVideo";
import HoverRevealVideo from "@/components/HoverRevealVideo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About Shopa Marketing | Built for Australian SMEs',
  description:
    'Meet the team behind 1,500+ Australian and New Zealand SMEs. One dedicated account manager, transparent pricing and 45+ years of combined experience.',
};

export default function AboutUsPage() {
  const clientLogos: { src: string; alt: string; light?: boolean }[] = [
    { src: '/assets/img/client/mcdonalds.webp',   alt: "McDonald's" },
    { src: '/assets/img/client/kfc.webp',          alt: 'KFC' },
    { src: '/assets/img/client/raywhite.webp',     alt: 'Ray White' },
    { src: '/assets/img/client/pizzahut.webp',     alt: 'Pizza Hut' },
    { src: '/assets/img/client/redrooster.webp',   alt: 'Red Rooster' },
    { src: '/assets/img/client/adairs.webp',       alt: 'Adairs' },
    { src: '/assets/img/client/oroton.webp',       alt: 'Oroton' },
    { src: '/assets/img/client/ops.webp',          alt: 'OPS' },
  ];

  const partnerLogos: { src: string; alt: string; light?: boolean }[] = [
    { src: '/assets/img/client/asta-c.webp',            alt: 'ASTA Accommodation', light: true },
    { src: '/assets/img/client/burdel-c.webp',          alt: 'Bur Del Co-Operative', light: true },
    { src: '/assets/img/client/dreambig-c.webp',        alt: 'Dream Big Support Services', light: true },
    { src: '/assets/img/client/infinity22-c.webp',      alt: 'Infinity22', light: true },
    { src: '/assets/img/client/ics-c.webp',             alt: 'International Commercial Services', light: true },
    { src: '/assets/img/client/learningblocks-c.webp',  alt: 'Learning Blocks Dural', light: true },
    { src: '/assets/img/client/oasis-c.webp',           alt: 'Oasis Garden Village', light: true },
    { src: '/assets/img/client/parkmore-c.webp',        alt: 'Parkmore Family Dental', light: true },
    { src: '/assets/img/client/smileexcellence-c.webp', alt: 'Smile Excellence', light: true },
    { src: '/assets/img/client/springvale-c.webp',      alt: 'Springvale & Richmond Dental Group', light: true },
    { src: '/assets/img/client/sps-c.webp',             alt: 'SPS Energy', light: true },
    { src: '/assets/img/client/sydneypodiatry-c.webp',  alt: 'Sydney Podiatry', light: true },
    { src: '/assets/img/client/tkcommunity-c.webp',     alt: 'TK Community Care', light: true },
  ];

  const unleashPoints = [
    'One clear strategy',
    'More qualified leads',
    'A stronger brand',
  ];

  return (
    <>
      <TemplateScripts />

      {/* preloader */}
      <div id="preloader">
        <div className="loader_line"></div>
      </div>

      {/* ── ABOUT HERO — finalised, unchanged ── */}
      <section className="about-hero">
        <div className="container chy-container-1">
          <div className="about-hero__inner">

            <h1 className="chy-title-1 about-hero__headline wow fadeInLeft" data-wow-duration="1.2s">
              Meet the Pros Behind <br />the Marketing.
            </h1>

            <p className="about-hero__sub wow fadeInUp" data-wow-duration="2s">
              Behind every campaign is a team of strategists, designers, marketers and specialists who are passionate about helping businesses grow.
              <br /><br />
              We&apos;re not here to sell you another marketing service. We&apos;re here to understand your business, build a strategy that fits, and become the team you can rely on as your business grows.
            </p>

          </div>
        </div>
      </section>

      {/* ── WHO WE ARE — editorial split, pinned while the video scrubs ── */}
      <div id="about-intro-pin" className="wds-pin-wrap">
      <div className="wds-intro-area pt-120 pb-110 bg-default fix wds-pin-panel">
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="wds-intro-content">
                <div className="section-title-wrap mb-35">
                  <h5 className="chy-subtitle-1 wow fadeInDown">About Shopa Marketing</h5>
                  <h2 className="chy-title-1 has-55 chy-split-in-right chy-split-text">Built for Businesses That Want to Grow.</h2>
                  <p className="chy-section-para-1 wow fadeInUp">
                    Growing a business has never been harder. Customers are everywhere, marketing options are endless, and every platform promises to be the one that changes everything.
                    <br /><br />
                    We started Shopa Marketing with a simple belief: great marketing shouldn&apos;t feel overwhelming.
                    <br /><br />
                    That&apos;s why we&apos;ve built a team of specialists who work together under one strategy, helping businesses cut through the noise and focus on what actually drives growth. Whether it&apos;s SEO, Google Ads, social media, websites or out-of-home advertising, every recommendation we make has one purpose — helping your business get noticed by the right people.
                    <br /><br />
                    What we&apos;re most proud of isn&apos;t just the work we do. It&apos;s the team behind it. With a 90% team retention rate, our clients enjoy consistency, stronger relationships and a team that genuinely understands their business—not a revolving door of new faces.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="wds-intro-media wow fadeInRight" data-wow-duration="1.2s">
                <ScrollScrubVideo
                  src="/assets/img/services/about-scrub-v2.mp4"
                  poster="/assets/img/services/about-scrub-v2-poster.webp"
                  className="wds-intro-video wds-intro-video--full"
                  ariaLabel="The Shopa Marketing team of senior specialists working together for small businesses"
                  pinContainerId="about-intro-pin"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>{/* /wds-pin-wrap */}

      {/* ── VISION & MISSION — split manifesto panels ── */}
      <div className="pt-100 pb-100" style={{ backgroundColor: '#f8f8fb' }}>
        <div className="container chy-container-1">
          <div className="wds-vm-grid">

            <div className="wds-vm-panel wds-vm-panel--vision wow fadeInUp">
              <span className="wds-vm-panel__ghost" aria-hidden="true">Vision</span>
              <div className="wds-vm-panel__inner">
                <div className="wds-vm-panel__accent"></div>
                <span className="wds-vm-panel__num">Where we&apos;re going</span>
                <h3 className="wds-vm-panel__title">Our Vision</h3>
                <p className="wds-vm-panel__body">
                  To make great marketing accessible to every ambitious business, not just the biggest brands.
                </p>
              </div>
            </div>

            <div className="wds-vm-panel wds-vm-panel--mission wow fadeInUp" data-wow-delay=".15s">
              <span className="wds-vm-panel__ghost" aria-hidden="true">Mission</span>
              <div className="wds-vm-panel__inner">
                <div className="wds-vm-panel__accent"></div>
                <span className="wds-vm-panel__num">How we&apos;ll get there</span>
                <h3 className="wds-vm-panel__title">Our Mission</h3>
                <p className="wds-vm-panel__body">
                  To simplify marketing by bringing every channel together under one clear strategy, helping businesses grow with confidence, consistency and measurable results.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── MEET THE KENNEDY DUO ── */}
      <div className="pt-110 pb-110 bg-default" style={{ backgroundImage: "url('/assets/img/bg/body-bg-3-v2.webp')" }}>
        <div className="container chy-container-1">
          <div className="section-title-wrap text-center mb-50">
            <h5 className="chy-subtitle-1 wow fadeInDown">Meet the Founders</h5>
            <h2 className="chy-title-1 chy-split-in-right chy-split-text">A Business Built Around <br />One Simple Philosophy.</h2>
            <p className="chy-section-para-1 wow fadeInUp" style={{ maxWidth: '760px', margin: '16px auto 0' }}>
              Shopa Marketing was built on a simple belief: every marketing recommendation should be made as if it were our own business.
              <br /><br />
              Preeti has spent her entire career working alongside small and medium businesses, understanding the challenges they face and helping them grow through practical, strategic marketing. That philosophy has shaped the way Shopa Marketing operates today.
              <br /><br />
              It doesn&apos;t stop with the founders. Every Business Development Manager, Account Manager and strategist is trained to think the same way: understand the client&apos;s business first, recommend what&apos;s genuinely in their best interests, and build marketing strategies that create long-term growth rather than short-term wins.
              <br /><br />
              Combined with Ben&apos;s commercial and sales experience, Shopa Marketing brings together strategic marketing expertise and a strong commercial mindset, ensuring every recommendation is designed to help businesses grow—not simply sell another marketing service.
              <br /><br />
              That&apos;s the standard we expect from every member of our team, and it&apos;s the reason so many of our clients stay with us for years.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-xl-4 col-lg-5 col-md-6 wow fadeInUp">
              <div className="wds-founder-card">
                <HoverRevealVideo
                  src="/assets/img/team/preeti-hover-v3.mp4"
                  poster="/assets/img/team/preeti-hover-v3-poster.webp"
                  className="wds-founder-video"
                  ariaLabel="Preeti Kennedy, founder of Shopa Marketing"
                />
                <h4 className="chy-heading-1 wds-founder-card__name">Preeti Kennedy</h4>
                <span className="wds-founder-card__role">Founder</span>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 col-md-6 wow fadeInUp" data-wow-delay=".15s">
              <div className="wds-founder-card wds-founder-card--offset">
                <HoverRevealVideo
                  src="/assets/img/team/ben-hover-v2.mp4"
                  poster="/assets/img/team/ben-hover-v2-poster.webp"
                  className="wds-founder-video"
                  ariaLabel="Benjamin Kennedy, co-founder of Shopa Marketing"
                />
                <h4 className="chy-heading-1 wds-founder-card__name">Benjamin Kennedy</h4>
                <span className="wds-founder-card__role">Co-Founder</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <ServiceTestimonials />

      {/* ── CLIENTS TICKER ── */}
      <div className="pt-90 pb-90 bg-default fix">
        <div className="container chy-container-1">
          <div className="section-title-wrap text-center mb-50">
            <h2 className="chy-title-1 chy-split-in-right chy-split-text">Join the growing list of our satisfied customers</h2>
          </div>
        </div>
        <div className="clients-ticker-wrap">
          <div className="clients-ticker-track">
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div key={i} className={`clients-logo-card${logo.light ? ' clients-logo-card--light' : ''}`}>
                <img src={logo.src} alt={logo.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        <div className="clients-ticker-wrap clients-ticker-wrap--row2">
          <div className="clients-ticker-track clients-ticker-track--reverse">
            {[...partnerLogos, ...partnerLogos].map((logo, i) => (
              <div key={i} className={`clients-logo-card${logo.light ? ' clients-logo-card--light' : ''}`}>
                <img src={logo.src} alt={logo.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── UNLEASH YOUR POTENTIAL — dark gradient CTA band ── */}
      <div className="pt-100 pb-100" data-navbar-dark="true" style={{ background: 'var(--chy-gd-1)' }}>
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="mb-30">
                <div className="wds-stat__accent"></div>
                <h2 className="chy-title-1" style={{ color: '#fff' }}>Let&apos;s Build a Business That&apos;s Hard to Ignore.</h2>
                <p className="chy-section-para-1 wow fadeInUp" style={{ marginTop: '18px', color: 'rgba(255,255,255,0.85)' }}>
                  Whether you&apos;re looking to generate more leads, strengthen your brand or bring your marketing together under one clear strategy, we&apos;re here to help.
                  <br /><br />
                  Let&apos;s have a conversation about your business, your goals and how we can help you grow with marketing that actually works.
                </p>
                <div style={{ marginTop: '28px' }}>
                  <a href="/contact-us" className="chy-pr-btn-1 chy-pr-btn-1--white wow fadeInLeft">
                    <span className="text">Book a Strategy Call</span>
                    <span className="icon"><i className="fa-solid fa-right-long"></i></span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="wds-escape wow fadeInRight" data-wow-duration="1.2s">
                <div className="wds-escape__box"><span>Scattered Marketing</span></div>
                {unleashPoints.map((point, i) => (
                  <span key={point} className={`wds-escape__chip wds-escape__chip--${i + 1}`}>
                    <i className="flaticon-check"></i>
                    {point}
                  </span>
                ))}
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
