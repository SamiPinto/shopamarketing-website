import type { Metadata } from "next";
import TemplateScripts from "@/components/TemplateScripts";
import ServiceHero from "@/components/ServiceHero";
import { googleAdsPageTestimonials as testimonials } from "@/components/testimonialsData";
import ScrollScrubVideo from "@/components/ScrollScrubVideo";

export const metadata: Metadata = {
  title: 'Google Ads Management Australia | Clicks to Customers | Shopa',
  description: 'Google Ads for Australian SMEs. Search, Shopping and Performance Max campaigns tuned to real conversions — every dollar tracked to revenue, not vanity clicks.',
};

export default function GoogleAdsPage() {
  const provideCards = [
    {
      icon: 'flaticon-target',
      title: 'Campaign Strategy: Keywords Worth Paying For',
      body: "Not every search deserves your money. We dig through keyword research and competitor analysis to find the searches that actually end in sales, then build campaign structures that capture buyers at every stage, from early research to 'shut up and take my money'. Strategy first, spend second!",
    },
    {
      icon: 'flaticon-megaphone',
      title: 'Ad Copywriting: Words That Earn the Click',
      body: "Your ad shares the page with your fiercest competitors, and the best line wins. We write sharp, persuasive ad copy that lifts click-through rates and quality scores, which is Google's way of rewarding you with cheaper clicks and better positions. Better words, lower bills.",
    },
    {
      icon: 'flaticon-price-tag',
      title: 'Bid Management: Watched Like a Hawk',
      body: "Smart bidding is clever, but unsupervised it can spend like a teenager with your credit card. We combine Google's machine learning with senior human oversight, shifting budget to what's converting and pulling it from what isn't, as market conditions change by the day.",
    },
    {
      icon: 'flaticon-statistics',
      title: 'Conversion Tracking: Every Dollar Accounted For',
      body: "If you can't see what a click turned into, you're advertising with a blindfold on. We set up full conversion tracking: calls, form fills, purchases and the micro-steps in between, so every optimisation decision is grounded in real revenue data, not hunches.",
    },
  ];

  const faqs = [
    {
      q: 'How much should I spend on Google Ads?',
      a: "It depends on your industry, competition and goals, but as a rule of thumb we recommend a minimum of $2,000 per month in ad spend to compete properly in most markets. Before you commit a cent, we'll run keyword research for your industry and give you a budget recommendation based on real numbers, not wishful thinking.",
    },
    {
      q: 'Do I own my Google Ads account?',
      a: "Yes, always, and we're proud this even needs saying. We work inside your own Google Ads account, which you own and can access any time. No proprietary accounts, no held-hostage data, no drama if you ever leave. Your campaign history stays yours, full stop.",
    },
    {
      q: 'How quickly can Google Ads generate leads?',
      a: 'This is the sprinter of digital marketing! Traffic can start within hours of launch. The first 2 to 4 weeks is a learning phase while the bidding strategies gather data, and most clients see strong, steady lead flow by week 4 to 6. If you need results this quarter rather than this year, this is your channel.',
    },
    {
      q: 'What types of Google Ads campaigns do you run?',
      a: "The full menu: Search ads for high-intent buyers, Shopping ads for online stores, Display for brand awareness, YouTube video ads, and Performance Max across Google's entire network. We recommend the mix that fits your objectives and budget, not the one that pads the invoice.",
    },
    {
      q: 'Should I do Google Ads or SEO?',
      a: 'Trick question: the best answer is usually both, on different clocks. Google Ads delivers leads this month while SEO builds the organic engine that delivers them for years. Ads without SEO means renting visibility forever; SEO without ads means waiting. Together, they cover the whole search page, and your competitors hate that.',
      aJsx: (
        <>Trick question: the best answer is usually both, on different clocks. Google Ads delivers leads this month while <a href="/services/seo-services">SEO</a> builds the organic engine that delivers them for years. Ads without SEO means renting visibility forever; SEO without ads means waiting. Together, they cover the whole search page, and your competitors hate that.</>
      ),
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

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Google Ads Management',
    serviceType: 'Google Ads Management Services',
    provider: { '@type': 'Organization', name: 'Shopa Marketing' },
    areaServed: ['Australia', 'New Zealand'],
  };

  return (
    <>
      <TemplateScripts />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      {/* preloader */}
      <div id="preloader">
        <div className="loader_line"></div>
      </div>

      <ServiceHero
        headline="Google Ads That Turn Searches Into Customers."
        subtext={
          <>
            When people search for your products or services, they&apos;re already looking for a solution. Our job is to make sure they find your business first.
            <br /><br />
            We create and manage high-performing Google Ads campaigns that combine smart strategy, continuous optimisation and data-driven decisions to generate more enquiries, more sales and a stronger return on your advertising investment.
          </>
        }
        bgImage="/assets/img/breadcrumb/gads-hero-v4.webp"
        stats={[
          { value: '1,500+', label: 'Businesses Supported' },
          { value: '5,000+', label: 'Campaigns Managed' },
          { value: 'Google Ads', label: 'Managed by Experts' },
        ]}
      />

      {/* ── INTRO — editorial split, pinned while the video scrubs ── */}
      <div id="gads-intro-pin" className="wds-pin-wrap">
      <div className="wds-intro-area pt-120 pb-110 bg-default fix wds-pin-panel">
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="wds-intro-content">
                <div className="section-title-wrap mb-35">
                  <h2 className="chy-title-1 has-55 chy-split-in-right chy-split-text">
                    Reach Customers at the Exact Moment They&apos;re Ready to Buy.
                  </h2>
                  <p className="chy-section-para-1 wow fadeInUp">
                    Google Ads puts your business in front of people actively searching for your products and services, making it one of the most effective ways to generate qualified leads and sales.
                    <br /><br />
                    Our team manages Search, Shopping, Display, YouTube and Performance Max campaigns, combining smart targeting, compelling ad creative and continuous optimisation to maximise your return on investment.
                    <br /><br />
                    Every decision is backed by data, with a focus on the metrics that matter most—more enquiries, more customers and sustainable business growth.
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
                  src="/assets/img/services/gads-scrub-v4.mp4"
                  poster="/assets/img/services/gads-scrub-v4-poster.webp"
                  className="wds-intro-video wds-intro-video--full"
                  ariaLabel="Google Ads agency: search campaign dashboard showing lead growth for a small business"
                  pinContainerId="gads-intro-pin"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>{/* /wds-pin-wrap */}

      {/* ── WHAT WE PROVIDE — bento with marquee ── */}
      <section className="wds-under-section fix">
        {/* Scrolling background text — decorative */}
        <div className="shopa-floating-scrolltext" aria-hidden="true">
          <div className="shopa-floating-scrolltext__track">
            <span>Google Ads &nbsp;·&nbsp; Google Ads &nbsp;·&nbsp; Google Ads &nbsp;·&nbsp; Google Ads &nbsp;·&nbsp; Google Ads &nbsp;·&nbsp;</span>
            <span aria-hidden="true">Google Ads &nbsp;·&nbsp; Google Ads &nbsp;·&nbsp; Google Ads &nbsp;·&nbsp; Google Ads &nbsp;·&nbsp; Google Ads &nbsp;·&nbsp;</span>
          </div>
        </div>

        <div className="container chy-container-1">
          <div className="wds-deal-head">
            <h2 className="chy-title-1">Everything You Need for High-Performing Google Ads.</h2>
            <p className="chy-section-para-1 wow fadeInUp">
              From account setup and keyword strategy to ad creative, bidding, optimisation and reporting, we manage every aspect of your Google Ads campaigns.
              <br /><br />
              Our team continuously monitors, tests and refines performance to help you generate more qualified leads, increase conversions and maximise the return on every advertising dollar.
            </p>
          </div>

          <div className="wds-deal-grid">
            {provideCards.map((card, i) => (
              <div key={card.title} className={`wds-deal-card wds-deal-card--${i + 1} wow fadeInUp`} data-wow-delay={`${i * 0.1}s`}>
                {i === 0 && <span className="wds-deal-card__ghost" aria-hidden="true">$</span>}
                <span className="wds-deal-card__icon"><i className={card.icon}></i></span>
                <h3 className="chy-heading-1 wds-deal-card__title">{card.title}</h3>
                <p className="chy-para-1 wds-deal-card__body">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE CHALLENGE — gradient band with steer-the-machine panel ── */}
      <div className="wds-ledger-area pt-110 pb-110" data-navbar-dark="true">
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="mb-30">
                <h2 className="chy-title-1" style={{ color: '#fff' }}>
                  Google Ads Never Stops Evolving. Neither Do We.
                </h2>
                <p className="chy-section-para-1 wow fadeInUp" style={{ color: 'rgba(255,255,255,0.95)', marginTop: '18px' }}>
                  Google Ads is constantly evolving. New campaign types, AI-powered bidding, Performance Max, privacy updates and changing search behaviour all influence how your campaigns perform.
                  <br /><br />
                  That&apos;s why successful Google Ads management isn&apos;t something you set up once and leave running. It requires continuous monitoring, optimisation and strategic decision-making to keep delivering strong results.
                  <br /><br />
                  Our specialists actively manage your campaigns every day, refining targeting, improving ad performance and reducing wasted spend to help you generate more qualified leads and maximise your return on investment.
                </p>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="wds-machine wow fadeInRight" data-wow-duration="1.2s">
                <div className="wds-machine__head">
                  <i className="fa-solid fa-gear"></i>
                  <span className="wds-machine__title">Inside your Google Ads account</span>
                </div>
                <div className="wds-machine__chips">
                  <span className="wds-machine__chip">Smart bidding</span>
                  <span className="wds-machine__chip">Performance Max</span>
                  <span className="wds-machine__chip">Consent mode</span>
                  <span className="wds-machine__chip">Algorithm updates</span>
                  <span className="wds-machine__chip">Account structure</span>
                  <span className="wds-machine__chip">Targeting</span>
                  <span className="wds-machine__chip wds-machine__chip--waste">Wasted spend</span>
                </div>
                <div className="wds-machine__foot">
                  <span className="wds-machine__foot-unmanaged">Left unwatched, it drains your budget quietly.</span>
                  <span className="wds-machine__foot-steered">Steered daily &mdash; consistent leads at a cost per lead that keeps making sense.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS — masonry review wall ── */}
      <div className="wds-reviews-area pt-110 pb-110">
        <div className="container chy-container-1">
          <div className="section-title-wrap text-center mb-50">
            <h5 className="chy-subtitle-1 wow fadeInDown">testimonials</h5>
            <h2 className="chy-title-1 chy-split-in-right chy-split-text">Google Ads Results Business Owners Rave About</h2>
            <p className="chy-section-para-1 wow fadeInUp" style={{ maxWidth: '640px', margin: '10px auto 0' }}>
              We&apos;d happily brag all day, but our clients tell it better. Here&apos;s what business owners say about working with us.
            </p>
          </div>
          <div className="wds-reviews-wall">
            {testimonials.map((t, i) => (
              <div key={i} className="wds-review-holder wow wds-unfold-in" data-wow-delay={`${i * 0.12}s`} data-wow-duration="0.8s">
                <figure className="wds-review-card">
                  <span className="wds-review-card__mark" aria-hidden="true">&ldquo;</span>
                  <blockquote className="wds-review-card__quote">{t.quote}</blockquote>
                  <figcaption className="wds-review-card__person">
                    <span className="wds-review-card__avatar">
                      {t.logo
                        ? <img src={t.logo} alt={t.name} loading="lazy" />
                        : <span className="wds-review-card__initials">{t.name.split(' ').slice(0, 2).map(w => w[0]).join('')}</span>
                      }
                    </span>
                    <span className="wds-review-card__who">
                      <span className="wds-review-card__name">{t.name}</span>
                      <span className="wds-review-card__bio">{t.bio}</span>
                    </span>
                  </figcaption>
                </figure>
              </div>
            ))}
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
                      <p className="chy-para-1 wds-faq-answer">{faq.aJsx ?? faq.a}</p>
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
