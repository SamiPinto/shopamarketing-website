import type { Metadata } from "next";
import TemplateScripts from "@/components/TemplateScripts";
import ServiceHero from "@/components/ServiceHero";
import { websitePageTestimonials as testimonials } from "@/components/testimonialsData";
import ScrollScrubVideo from "@/components/ScrollScrubVideo";

export const metadata: Metadata = {
  title: 'Website Design Australia | Fast Sites That Sell | Shopa',
  description: 'Website design for Australian SMEs. Fast, mobile-first sites built to convert — engineered for speed, SEO and turning visitors into paying customers.',
};

export default function WebsiteDesignPage() {
  const underperformCards: { num: string; short: string; title: string; body: string; image?: string }[] = [
    {
      num: '01',
      short: 'No Game Plan',
      image: '/assets/img/website/culprit-gameplan.webp',
      title: 'Pretty Face, No Game Plan',
      body: 'A website without strategy is like a billboard in the desert: technically impressive, seen by nobody who matters. When the layout wanders, the message mumbles and the buttons whisper instead of shout, visitors drift off and buy elsewhere. Strategic website design gives every page one job: turning lookers into bookers!',
    },
    {
      num: '02',
      short: 'Seven Seconds',
      image: '/assets/img/website/culprit-seconds-v2.webp',
      title: 'Seven Seconds to Win or Lose',
      body: "That's roughly how long you have before a visitor decides whether you're the real deal. A tired layout or an obvious template can undo years of hard-earned reputation in a single glance. Your website should walk into the room the way your business does: sharp, confident and impossible to ignore.",
    },
    {
      num: '03',
      short: 'Mobile Walkouts',
      image: '/assets/img/website/culprit-mobile.webp',
      title: "Mobile Visitors Don't Wait, They Leave",
      body: "More than half your traffic arrives on a phone, usually between other things: the tram, the queue, the couch. If your site stutters or squishes on a small screen, they're gone before your logo loads, and Google files it all away. Responsive web design is the entry fee now, not a bonus feature.",
    },
    {
      num: '04',
      short: 'Invisible to AI',
      image: '/assets/img/website/culprit-ai.webp',
      title: 'Invisible to the Machines That Matter',
      body: "Here's the plot twist of modern marketing: your next customer might never see page one of Google, because an AI answered their question first. Search engines and AI tools now judge your site's speed, structure and substance before humans get a look in. Websites without SEO-friendly foundations aren't losing the race. They were never entered.",
    },
  ];

  const stats = [
    { value: '94', unit: '%', label: 'of first impressions are based on your website\'s design and overall presentation.' },
    { value: '3', unit: 'seconds', label: 'is all it takes for visitors to decide whether to stay or leave if your website is slow to load.' },
    { value: '75', unit: '%', label: 'of consumers judge a business\'s credibility based on its website.' },
    { value: '2x', unit: 'or more', label: 'Well-designed, conversion-focused websites can generate significantly more enquiries from the same amount of traffic.' },
  ];

  const buildCards: { icon: string; title: string; body: React.ReactNode; image?: string }[] = [
    {
      icon: 'flaticon-web-designing',
      image: '/assets/img/website/console-custom.webp',
      title: 'Custom Website Design',
      body: <>Templates are the fast fashion of the internet: everywhere, identical and instantly forgettable. We design from a blank canvas, shaping every page around your brand, your customers and your goals. If an element doesn&apos;t pull its weight, it doesn&apos;t make the cut!</>,
    },
    {
      icon: 'flaticon-shopping-cart',
      image: '/assets/img/website/console-ecommerce.webp',
      title: 'eCommerce Websites',
      body: <>Shopify and WooCommerce stores where browsing turns into buying. Product pages that sell the sizzle, a checkout smoother than a flat white, and payments locked up tight. Every abandoned cart is money strolling out the door, so we build stores that close the deal.</>,
    },
    {
      icon: 'flaticon-mobile-development',
      image: '/assets/img/website/console-responsive.webp',
      title: 'Mobile-Responsive Design',
      body: <>Phone, tablet, laptop, or the giant monitor in reception: your website shows up dressed for the occasion on all of them. We design mobile-first, because that&apos;s where your customers live, then polish the experience for every other screen size going.</>,
    },
    {
      icon: 'flaticon-seo',
      image: '/assets/img/website/console-seo.webp',
      title: 'SEO & AI-Ready Foundations',
      body: <>Plenty of agencies hand over a shiny new site, then charge extra to make Google notice it. We think that&apos;s backwards! Clean architecture, structured data and technical SEO go into the foundations of every build, so you launch ready to climb. Our <a href="/services/seo-services">SEO services</a> can then take you all the way to the summit.</>,
    },
    {
      icon: 'flaticon-statistics',
      image: '/assets/img/website/console-performance.webp',
      title: 'High-Performance Websites',
      body: <>In web terms, slow is invisible. Every site we build meets Google&apos;s Core Web Vitals standards, with lean code, optimised assets and clever hosting aimed at load times under two seconds. Your customers get answers before they remember they were waiting.</>,
    },
    {
      icon: 'flaticon-customer-service',
      image: '/assets/img/website/console-maintenance.webp',
      title: 'Ongoing Maintenance & Support',
      body: <>Some agencies treat launch day like a farewell party. We treat it like opening night! Every website design package includes a sweet bonus: 12 months of complimentary maintenance covering security, updates, backups and real support, plus a lifetime guarantee against technical glitches.</>,
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Strategy',
      body: 'We start by understanding your business, your customers, your goals and your competitors. From there, we develop the website strategy, site structure, messaging and user journey before any design work begins.',
    },
    {
      step: '02',
      title: 'Design & User Experience',
      body: 'Our designers create a custom website that reflects your brand while making it easy for visitors to find information, build trust and take action. You’ll have the opportunity to review and approve the design before development begins.',
    },
    {
      step: '03',
      title: 'Development & Optimisation',
      body: 'Once approved, our developers bring your website to life with clean code, fast performance, mobile responsiveness, SEO best practices and a secure technical foundation built to grow with your business.',
    },
    {
      step: '04',
      title: 'Testing, Launch & Ongoing Support',
      body: 'Before launch, every website is thoroughly tested across devices and browsers to ensure everything performs exactly as it should. Once your site goes live, you’ll receive 12 months of complimentary maintenance and our lifetime guarantee against technical glitches, giving you complete confidence long after launch.',
    },
  ];

  const diffCards = [
    {
      icon: 'flaticon-guarantee',
      title: '12 Months of Complimentary Maintenance',
      body: <>Every website includes 12 months of maintenance, security updates, backups and ongoing support, plus a lifetime guarantee against technical glitches. Your website stays secure, up to date and performing at its best.</>,
    },
    {
      icon: 'flaticon-digital-campaign',
      title: 'One Team. Every Marketing Channel.',
      body: <>Your website is just the beginning. We also manage your <a href="/services/seo-services">SEO</a>, <a href="/services/google-ads">Google Ads</a>, <a href="/services/social-media">social media</a>, creative and out-of-home advertising, giving you one integrated marketing strategy instead of multiple disconnected suppliers.</>,
    },
    {
      icon: 'flaticon-team',
      title: 'A Dedicated Account Manager',
      body: <>You&apos;ll work with one dedicated account manager who understands your business, your goals and your marketing strategy, giving you a single point of contact whenever you need support.</>,
    },
    {
      icon: 'flaticon-price-tag',
      title: 'Transparent, All-Inclusive Pricing',
      body: <>The price we quote is the price you pay. No hidden fees, unexpected extras or surprise invoices—just clear, upfront pricing from day one.</>,
    },
  ];

  const faqs = [
    {
      q: 'How much does website design cost?',
      a: "It depends on the size and scope of the build, but you'll know before we start, in writing, with everything included. No discovery-meeting marathon, no mood boards held hostage. Fixed all-inclusive pricing with 12 months of maintenance included. Get a quote and get a number!",
    },
    {
      q: 'How long does a website design project take?',
      a: 'Most business websites go from kickoff to launch in 4 to 8 weeks. Bigger eCommerce or custom builds usually run 10 to 16. The main variable is how quickly content and feedback flow back to us. We move fast, but we never cut corners on your reputation.',
    },
    {
      q: 'What platforms do you build websites on?',
      a: 'WordPress, Shopify and WooCommerce, chosen to fit your business rather than our convenience. When a template platform would only hold you back, we build custom coded websites from scratch, for example a Next.js and React site for a booking or member portal, a headless build where the design is fully bespoke, or a bespoke web app with dashboards, live data and integrations wired into your existing systems. Whichever route we take, it is proven, flexible and fully yours. No lock-in contracts, and no drama if you ever decide to move on.',
    },
    {
      q: 'Do you provide ongoing website maintenance?',
      a: "Yes, and it's part of the deal, not a sneaky add-on. Every build includes 12 months of complimentary maintenance covering security monitoring, updates, backups and technical support, plus a lifetime guarantee against technical glitches.",
    },
    {
      q: 'Will my website be mobile-friendly and SEO-ready?',
      a: 'Both, from the very first line of code! Every site is designed mobile-first, tested across all major devices and browsers, and built with clean structure, fast load times and technical SEO in place. Most of your customers are on their phones. We make sure your website is too.',
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
    name: 'Website Design',
    serviceType: 'Web Design Services',
    provider: { '@type': 'Organization', name: 'Shopa Marketing' },
    areaServed: ['Australia', 'New Zealand'],
    review: testimonials.map((t) => ({
      '@type': 'Review',
      reviewBody: t.quote,
      author: { '@type': 'Organization', name: t.name },
    })),
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
        headline="Websites Built to Grow Your Business."
        subtext={
          <>
            Your website should do more than look good. It should build trust, generate enquiries and turn visitors into customers.
            <br /><br />
            We design fast, mobile-friendly websites that combine great design, seamless user experience and clear conversion strategies, helping your business stand out and grow online.
          </>
        }
        bgImage="/assets/img/breadcrumb/website-hero-v2.webp"
        stats={[
          { value: '1,500+', label: 'Businesses Supported' },
          { value: '5,000+', label: 'Campaigns Managed' },
          { value: 'Fast. Modern.', label: 'Built to Convert.' },
        ]}
      />

      {/* ── INTRO — editorial split, home "Solutions" rhythm ── */}
      <div id="website-intro-pin" className="wds-pin-wrap">
      <div className="wds-intro-area pt-120 pb-110 bg-default fix wds-pin-panel">
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="wds-intro-content">
                <div className="section-title-wrap mb-35">
                  <h2 className="chy-title-1 has-55 chy-split-in-right chy-split-text">
                    Anyone Can Build a Website. Not Everyone Can Build One That Grows a Business.
                  </h2>
                  <p className="chy-section-para-1 wow fadeInUp">
                    AI can build a website in minutes. But a great business website takes much more than a few prompts.
                    <br /><br />
                    It needs the right strategy, messaging, user experience, SEO foundations, conversion pathways, mobile performance and clear calls to action—all working together to turn visitors into customers.
                    <br /><br />
                    That&apos;s exactly what we build.
                    <br /><br />
                    Every website is custom designed around your business, optimised for Google and AI search, built to load fast on every device and created with one goal in mind: helping your business grow.
                    <br /><br />
                    Every package also includes 12 months of complimentary maintenance and a lifetime guarantee against technical glitches, so your website continues performing long after it goes live.
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
                  src="/assets/img/services/website-scrub-v3.mp4"
                  poster="/assets/img/services/website-scrub-v3-poster.webp"
                  className="wds-intro-video wds-intro-video--full"
                  ariaLabel="Custom website design on desktop and mobile by Shopa Marketing, web design agency"
                  pinContainerId="website-intro-pin"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>{/* /wds-pin-wrap */}

      {/* ── WHY UNDERPERFORM — sticky title + staggered numbered cards ── */}
      <section className="wds-under-section fix">
        {/* Scrolling background text — decorative */}
        <div className="shopa-floating-scrolltext" aria-hidden="true">
          <div className="shopa-floating-scrolltext__track">
            <span>Why Websites Underperform &nbsp;·&nbsp; Why Websites Underperform &nbsp;·&nbsp; Why Websites Underperform &nbsp;·&nbsp;</span>
            <span aria-hidden="true">Why Websites Underperform &nbsp;·&nbsp; Why Websites Underperform &nbsp;·&nbsp; Why Websites Underperform &nbsp;·&nbsp;</span>
          </div>
        </div>

        <div className="container chy-container-1">
          <div className="wds-culprit-head">
            <h2 className="chy-title-1">Why Some Websites Generate Enquiries—and Others Don&apos;t.</h2>
            <p className="chy-section-para-1">
              A great-looking website doesn&apos;t always make a great business website.
              <br /><br />
              The difference usually comes down to the fundamentals: clear messaging, intuitive navigation, fast load times, mobile performance, trust signals, strong calls to action and a website that&apos;s built around how customers actually make buying decisions.
              <br /><br />
              That&apos;s where most websites fall short—and exactly where we focus.
            </p>
          </div>

          <div className="wds-culprits wow fadeInUp">
            {underperformCards.map((card) => (
              <div key={card.num} className="wds-culprit" tabIndex={0}>
                <div className="wds-culprit__closed" aria-hidden="true">
                  <span className="wds-culprit__closed-num">{card.num}</span>
                  <span className="wds-culprit__closed-label">{card.short}</span>
                  <span className="wds-culprit__closed-tip"><i className="far fa-plus"></i></span>
                </div>
                <div className="wds-culprit__open">
                  {card.image && <img className="wds-culprit__img" src={card.image} alt={card.title} loading="lazy" />}
                  <span className="wds-culprit__ghost" aria-hidden="true">{card.num}</span>
                  <span className="wds-culprit__tag">Culprit {card.num}</span>
                  <h3 className="chy-heading-1 wds-culprit__title">{card.title}</h3>
                  <p className="chy-para-1 wds-culprit__body">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS — dark editorial ledger ── */}
      <div className="wds-ledger-area pt-110 pb-110" data-navbar-dark="true">
        <div className="container chy-container-1">

          <div className="wds-ledger-head">
            <h2 className="chy-title-1" style={{ color: '#fff' }}>
              Why Your Website Is One of Your Most Valuable Business Assets.
            </h2>
            <p className="chy-section-para-1 wow fadeInUp" style={{ color: 'rgba(255,255,255,0.95)' }}>
              Your website is often the first impression customers have of your business. It shapes credibility, influences buying decisions and can be the difference between someone getting in touch or moving on to a competitor.
              <br /><br />
              The numbers speak for themselves.
            </p>
          </div>

          <div className="wds-ledger">
            {stats.map((stat, i) => (
              <div key={i} className="wds-ledger-row wow fadeInUp" data-wow-delay={`${i * 0.1}s`}>
                <span className="wds-ledger-row__index">{`0${i + 1}`}</span>
                <div className="wds-ledger-row__figure">
                  <span className="wds-ledger-row__value">{stat.value}</span>
                  <span className="wds-ledger-row__unit">{stat.unit}</span>
                </div>
                <p className="wds-ledger-row__label">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── WHAT WE BUILD — numbered accordion rows ── */}
      <div className="wds-build-area pt-110 pb-110">
        <div className="container chy-container-1">
          <div className="section-title-wrap text-center mb-50">
            <h5 className="chy-subtitle-1 wow fadeInDown">our website design services</h5>
            <h2 className="chy-title-1 chy-split-in-right chy-split-text">Everything You Need for a High-Performing Website.</h2>
            <p className="chy-section-para-1 wow fadeInUp" style={{ maxWidth: '720px', margin: '10px auto 0' }}>
              Whether you&apos;re launching a new website, redesigning an existing one or improving performance, our team builds websites that are fast, secure, easy to manage and designed to grow alongside your business.
              <br /><br />
              Every website is built with performance, user experience and long-term growth in mind.
            </p>
          </div>

          <div className="wds-svc-console wow fadeInUp">
            {buildCards.map((card, i) => (
              <div key={card.title} className="wds-svc-item" tabIndex={0}>
                <div className="wds-svc-item__row">
                  <span className="wds-svc-item__num">{`0${i + 1}`}</span>
                  <h3 className="chy-heading-1 wds-svc-item__title">{card.title}</h3>
                  <span className="wds-svc-item__arrow"><i className="fa-solid fa-right-long"></i></span>
                </div>
                <div className="wds-svc-item__panel">
                  <span className="wds-svc-item__ghost" aria-hidden="true">{`0${i + 1}`}</span>
                  {card.image
                    ? <img className="wds-svc-item__img" src={card.image} alt={card.title} loading="lazy" />
                    : <span className="wds-svc-item__icon"><i className={card.icon}></i></span>
                  }
                  <span className="wds-svc-item__panel-title">{card.title}</span>
                  <p className="chy-para-1 wds-svc-item__body">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW WE WORK — blueprint staircase ── */}
      <div className="wds-proc-area pt-110 pb-110 fix">
        <div className="container chy-container-1">
          <div className="section-title-wrap text-center mb-50">
            <h5 className="chy-subtitle-1 wow fadeInDown">our web design process</h5>
            <h2 className="chy-title-1 chy-split-in-right chy-split-text">Our Website Design Process</h2>
            <p className="chy-section-para-1 wow fadeInUp" style={{ maxWidth: '680px', margin: '10px auto 0' }}>
              A great website doesn&apos;t happen by chance. Every project follows a clear, collaborative process that keeps you informed from the first conversation through to launch.
            </p>
          </div>

          <div className="wds-proc-steps">
            <span className="wds-proc-path" aria-hidden="true"></span>
            {processSteps.map((step, i) => (
              <div key={step.step} className={`wds-proc-card wds-proc-card--${i + 1} wow wds-rise-in`} data-wow-delay={`${i * 0.18}s`} data-wow-duration="0.7s">
                <span className="wds-proc-card__ghost" aria-hidden="true">{step.step}</span>
                <span className="wds-proc-card__tag">Phase {step.step}</span>
                <h3 className="chy-heading-1 wds-proc-card__title">{step.title}</h3>
                <p className="chy-para-1 wds-proc-card__body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHY CHOOSE US — the deal bento ── */}
      <div className="wds-deal-area pt-110 pb-110 bg-default fix">
        <div className="container chy-container-1">

          <div className="wds-deal-head">
            <div>
              <h5 className="chy-subtitle-1 wow fadeInDown">why choose us</h5>
              <h2 className="chy-title-1">Why Businesses Choose Shopa Marketing</h2>
            </div>
            <p className="chy-section-para-1 wow fadeInUp">
              A great website is only part of the equation. You also need the strategy, support and marketing expertise to help it deliver results long after launch.
            </p>
          </div>

          <div className="wds-deal-grid">
            {diffCards.map((card, i) => (
              <div key={card.title} className={`wds-deal-card wds-deal-card--${i + 1} wow fadeInUp`} data-wow-delay={`${i * 0.1}s`}>
                {i === 0 && <span className="wds-deal-card__ghost" aria-hidden="true">12</span>}
                <span className="wds-deal-card__icon"><i className={card.icon}></i></span>
                <h3 className="chy-heading-1 wds-deal-card__title">{card.title}</h3>
                <p className="chy-para-1 wds-deal-card__body">{card.body}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── TESTIMONIALS — masonry review wall ── */}
      <div className="wds-reviews-area pt-110 pb-110">
        <div className="container chy-container-1">
          <div className="section-title-wrap text-center mb-50">
            <h5 className="chy-subtitle-1 wow fadeInDown">testimonials</h5>
            <h2 className="chy-title-1 chy-split-in-right chy-split-text">Website Design Reviews from Business Owners</h2>
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

      {/* ── FAQ — sticky title + accordion split ── */}
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
