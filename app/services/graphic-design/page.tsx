import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { serviceSchema, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import TemplateScripts from "@/components/TemplateScripts";
import ServiceHero from "@/components/ServiceHero";
import ScrollScrubVideo from "@/components/ScrollScrubVideo";

export const metadata: Metadata = {
  title: 'Graphic Design Australia | Branding & Creative | Shopa',
  description: 'Graphic design for Australian SMEs. Logos, branding, social creative and print — sharp work that does a job: more clicks, more leads, more sales.',
};

export default function GraphicDesignPage() {

  const provideItems: { title: string; body: string; icon: string; image?: string }[] = [
    {
      title: 'Brand Identity & Logo Design',
      body: 'Your visual identity is often the first impression customers have of your business. We create distinctive logos, colour palettes, typography and brand guidelines that build trust, strengthen recognition and keep your branding consistent across every touchpoint.',
      icon: 'flaticon-badge',
      image: '/assets/img/gfx/swatch-brand.webp',
    },
    {
      title: 'Marketing Collateral',
      body: 'From brochures and business cards to presentations, flyers and exhibition materials, we design professional marketing collateral that clearly communicates your message and leaves a lasting impression.',
      icon: 'flaticon-read',
      image: '/assets/img/gfx/swatch-collateral-v2.webp',
    },
    {
      title: 'Digital Marketing Assets',
      body: 'We create social media graphics, website visuals, email templates, display banners and digital assets designed to capture attention and deliver a consistent brand experience across every online platform.',
      icon: 'flaticon-inbox',
      image: '/assets/img/gfx/swatch-digital.webp',
    },
    {
      title: 'Advertising Creative',
      body: "Whether it's Google Display, social media, out-of-home advertising or print campaigns, we design creative that captures attention, communicates your message and supports stronger campaign performance.",
      icon: 'flaticon-bullhorn',
      image: '/assets/img/gfx/swatch-adcreative.webp',
    },
  ];

  const faqs = [
    {
      q: 'Do I need brand guidelines before starting?',
      a: "Not at all. If you don't have brand guidelines, we'll create them as part of a brand identity project, giving your business a rulebook every future designer will thank you for. Already have guidelines? We'll work within them faithfully, so everything new feels like it belongs.",
    },
    {
      q: 'What file formats will I receive?',
      a: "Everything you need, and everything is yours to keep: PNG, JPG, SVG, PDF and the editable source files (AI, EPS or Figma). Print projects come as print-ready PDFs with correct colour profiles, bleed and trim marks. No hostage files, no 'contact us for the original', no drama.",
    },
    {
      q: 'How many revision rounds are included?',
      a: "Two rounds on every project, which covers the vast majority of feedback. Need more? Additional rounds are available at an hourly rate. Our secret for keeping revisions low is a thorough brief upfront, because ten minutes of good questions saves three rounds of 'hmm, not quite'.",
    },
    {
      q: 'Can you match our existing brand style?',
      a: "Absolutely, it's one of our specialties. Share your existing brand assets and our designers will extend your visual identity so seamlessly that nobody will be able to tell where the old work ends and ours begins. Your brand stays your brand, just with more of it.",
    },
    {
      q: 'Do you handle one-off jobs, or only big projects?',
      a: 'Both, happily! Whether you need a single flyer for the weekend market or a complete brand identity with the lot, you get the same designers, the same quality and the same attention. Plenty of our biggest clients started with one small job that went well.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const serviceNode = serviceSchema({
    path: '/services/graphic-design',
    name: 'Graphic Design',
    serviceType: 'Graphic Design Services',
    description:
      'Graphic design for Australian SMEs. Logos, branding, social creative and print that does a job: more clicks, more leads, more sales.',
  });

  return (
    <>
      <TemplateScripts />

      <JsonLd
        graph={[
          serviceNode,
          faqSchema,
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: 'Graphic Design', path: '/services/graphic-design' },
          ]),
          webPageSchema({
            path: '/services/graphic-design',
            name: 'Graphic Design Australia | Branding & Creative | Shopa',
            description:
              'Graphic design for Australian SMEs. Logos, branding, social creative and print that does a job: more clicks, more leads, more sales.',
          }),
        ]}
      />

      {/* preloader */}
      <div id="preloader">
        <div className="loader_line"></div>
      </div>

      <ServiceHero
        headline="Design That Makes Your Business Impossible to Ignore."
        subtext={
          <>
            Great design does more than make your business look good. It builds trust, strengthens your brand and helps you stand out wherever your customers see you.
            <br /><br />
            From logos and brand identities to brochures, social media, signage, packaging and advertising creative, we design marketing that captures attention and supports business growth.
          </>
        }
        bgImage="/assets/img/breadcrumb/gfx-hero.webp"
        stats={[
          { value: '1,500+', label: 'Businesses Supported' },
          { value: '5,000+', label: 'Campaigns Managed' },
          { value: 'Print & Digital', label: 'Creative Design' },
        ]}
      />

      {/* ── INTRO — editorial split ── */}
      <div id="gfx-intro-pin" className="wds-pin-wrap">
      <div className="wds-intro-area pt-120 pb-110 bg-default fix wds-pin-panel">
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="wds-intro-content">
                <div className="section-title-wrap mb-35">
                  <h2 className="chy-title-1 has-55 chy-split-in-right chy-split-text">
                    Design That Builds Trust Before You Say a Word.
                  </h2>
                  <p className="chy-section-para-1 wow fadeInUp">
                    Before a customer reads your website, walks into your business or speaks to your team, they&apos;ve already formed an opinion about your brand.
                    <br /><br />
                    That&apos;s why great design isn&apos;t just about looking professional. It&apos;s about building trust, creating recognition and making your business memorable.
                    <br /><br />
                    From logos and complete brand identities to brochures, social media graphics, packaging, signage and advertising creative, our designers create work that&apos;s both visually compelling and strategically aligned with your business goals.
                    <br /><br />
                    Because we&apos;re a full-service marketing agency, every design is created with one purpose: helping your business stand out and perform across every marketing channel.
                  </p>
                </div>
                <a href="/contact-us" className="chy-pr-btn-1 wow fadeInLeft">
                  <span className="text">Get a Quote</span>
                  <span className="icon"><i className="fa-solid fa-right-long"></i></span>
                </a>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="wds-intro-media wow fadeInRight" data-wow-duration="1.2s">
                <ScrollScrubVideo
                  src="/assets/img/services/gfx-scrub-v2.mp4"
                  poster="/assets/img/services/gfx-scrub-v2-poster.webp"
                  className="wds-intro-video wds-intro-video--full"
                  ariaLabel="Graphic design services: brand identity, logo and marketing collateral for a small business"
                  pinContainerId="gfx-intro-pin"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>{/* /wds-pin-wrap */}

      {/* ── WHAT WE PROVIDE — swatch cards with marquee ── */}
      <section className="wds-under-section fix">
        {/* Scrolling background text — decorative */}
        <div className="shopa-floating-scrolltext" aria-hidden="true">
          <div className="shopa-floating-scrolltext__track">
            <span>Graphic Design &nbsp;·&nbsp; Graphic Design &nbsp;·&nbsp; Graphic Design &nbsp;·&nbsp; Graphic Design &nbsp;·&nbsp;</span>
            <span aria-hidden="true">Graphic Design &nbsp;·&nbsp; Graphic Design &nbsp;·&nbsp; Graphic Design &nbsp;·&nbsp; Graphic Design &nbsp;·&nbsp;</span>
          </div>
        </div>

        <div className="container chy-container-1">
          <div className="wds-deal-head">
            <h2 className="chy-title-1">Creative Design for Every Part of Your Business.</h2>
            <p className="chy-section-para-1 wow fadeInUp">
              From brand identity and print collateral to social media, digital advertising and signage, we create professional, consistent designs that strengthen your brand wherever your customers see it.
              <br /><br />
              Every piece of creative is developed with your wider marketing strategy in mind, helping your business look recognisable, credible and memorable across every channel.
            </p>
          </div>

          <div className="wds-swatch-grid">
            {provideItems.map((item, i) => (
              <div key={item.title} className="wds-swatch wow fadeInUp" data-wow-delay={`${(i % 2) * 0.12}s`}>
                <span className="wds-swatch__ghost" aria-hidden="true">{`0${i + 1}`}</span>
                {item.image
                  ? <img className="wds-swatch__img" src={item.image} alt={item.title} loading="lazy" />
                  : <span className="wds-swatch__icon"><i className={item.icon}></i></span>
                }
                <h3 className="chy-heading-1 wds-swatch__title">{item.title}</h3>
                <p className="chy-para-1 wds-swatch__body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE CHALLENGE — gradient band with brand consistency panel ── */}
      <div className="wds-ledger-area pt-110 pb-110" data-navbar-dark="true">
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="mb-30">
                <h2 className="chy-title-1" style={{ color: '#fff' }}>
                  Great Design Is an Investment in Your Brand.
                </h2>
                <p className="chy-section-para-1 wow fadeInUp" style={{ color: 'rgba(255,255,255,0.95)', marginTop: '18px' }}>
                  Every interaction with your business shapes how customers perceive you. Your logo, website, social media, brochures and advertising all contribute to the same first impression.
                  <br /><br />
                  When your branding is consistent, professional and recognisable, it builds trust, strengthens credibility and makes your business easier to remember. When it&apos;s inconsistent, every marketing channel has to work harder to earn that trust.
                  <br /><br />
                  That&apos;s why we don&apos;t design individual pieces in isolation. We create visual identities that work consistently across every platform, helping your business look professional wherever your customers find you.
                </p>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="wds-brandfix wow fadeInRight" data-wow-duration="1.2s">
                <div className="wds-brandfix__head">
                  <i className="fa-solid fa-palette"></i>
                  <span className="wds-brandfix__title">Your logo, out in the wild</span>
                </div>
                <div className="wds-brandfix__tiles">
                  <span className="wds-brandfix__tile">Your Logo</span>
                  <span className="wds-brandfix__tile">Your Logo</span>
                  <span className="wds-brandfix__tile">Your Logo</span>
                  <span className="wds-brandfix__tile">Your Logo</span>
                  <span className="wds-brandfix__tile">Your Logo</span>
                  <span className="wds-brandfix__tile">Your Logo</span>
                </div>
                <div className="wds-brandfix__foot">
                  <span className="wds-brandfix__foot-messy">Six platforms, six different logos. Customers notice.</span>
                  <span className="wds-brandfix__foot-fixed">One consistent look across every touchpoint.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


      {/* ── FAQ — sticky title + hover accordion rows ── */}
      <div className="wds-faq-area pt-110 pb-110 bg-default">
        <div className="container chy-container-1">
          <div className="row">

            <div className="col-xl-4 col-lg-4">
              <div className="wds-faq-sticky mb-40">
                <h2 className="chy-title-1">Frequently Asked Questions</h2>
              </div>
            </div>

            <div className="col-xl-8 col-lg-8">
              <div className="wds-faq-rows wow fadeInUp">
                {faqs.map((faq, i) => (
                  <div key={i} className="svc-accordion-row" tabIndex={0}>
                    <div className="svc-accordion-header">
                      <span className="svc-accordion-num">{`0${i + 1}`}</span>
                      <h3 className="chy-heading-1 svc-accordion-title">{faq.q}</h3>
                      <span className="svc-accordion-arrow"><i className="far fa-plus"></i></span>
                    </div>
                    <div className="svc-accordion-body">
                      <p className="chy-para-1 wds-faq-answer">{faq.a}</p>
                    </div>
                  </div>
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
