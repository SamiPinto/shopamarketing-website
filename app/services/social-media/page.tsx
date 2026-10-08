import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { serviceSchema, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import TemplateScripts from "@/components/TemplateScripts";
import ServiceHero from "@/components/ServiceHero";
import { socialMediaPageTestimonials as testimonials } from "@/components/testimonialsData";
import ScrollScrubVideo from "@/components/ScrollScrubVideo";

export const metadata: Metadata = {
  title: 'Social Media Advertising Australia | Ads That Convert | Shopa',
  description: 'Social media ads for Australian SMEs. Facebook, Instagram, TikTok and LinkedIn campaigns built on real data, tied to real revenue. Not just boosted posts!',
};

export default function SocialMediaPage() {
  const provideItems: { title: string; body: string; icon: string; image?: string }[] = [
    {
      title: 'Audience Targeting: Find Your People in the Crowd',
      body: "Spraying ads at everyone is the fastest way to pay for strangers who'll never buy. We build laser-precise audiences from demographics, interests, behaviours, lookalikes and retargeting, so your ads land in front of people already halfway to yes. Right person, right moment, no wastage!",
      icon: 'flaticon-target',
      image: '/assets/img/social/svc-targeting.webp',
    },
    {
      title: 'Ad Creative: Made to Stop Thumbs',
      body: 'The average thumb scrolls metres of feed a day, and your ad has a fraction of a second to interrupt the journey. We craft scroll-stopping creative across static, video, carousel and stories: bold enough to earn the pause, sharp enough to earn the click.',
      icon: 'flaticon-web-design-1',
      image: '/assets/img/social/svc-creative.webp',
    },
    {
      title: 'Campaign Management: Never Set, Never Forget',
      body: "Launching a campaign and walking away is how budgets go to die. We monitor daily, A/B test constantly, tune bids and shift budget to whatever's winning. Your cost per result keeps dropping while your competitors wonder why theirs keeps climbing.",
      icon: 'flaticon-digital-campaign',
      image: '/assets/img/social/svc-management.webp',
    },
    {
      title: 'Performance Reporting: Numbers That Speak Human',
      body: "No jargon avalanches, no vanity metrics dressed up as victory. Each month you get a clear view of reach, engagement, leads, conversions and ROAS, plus what we're doing next and why. You'll always know what your money did and what it's doing tomorrow.",
      icon: 'flaticon-statistics',
      image: '/assets/img/social/svc-reporting.webp',
    },
  ];

  const faqs = [
    {
      q: 'Which social platforms do you advertise on?',
      a: "Facebook, Instagram, TikTok, LinkedIn, Pinterest and YouTube. But here's the important part: we don't put you everywhere just to send a bigger invoice. We recommend the mix based on where your customers actually spend their time, whether that's tradies on Facebook or Gen Z on TikTok.",
    },
    {
      q: "Why aren't my boosted posts working?",
      a: "Because boosting is the vending machine version of social advertising: convenient, but you get what you get. Proper campaigns use custom audiences, retargeting, conversion tracking, A/B testing and objective-based bidding that the boost button simply doesn't offer. Same platforms, completely different machine under the hood.",
    },
    {
      q: 'What ad budget do I need to get started?',
      a: "We recommend a minimum ad spend of $1,500 per month per platform. That's the level where the data gets meaningful and the optimisation gets sharp. Highly targeted local campaigns can work with less. Our management fee is separate and quoted upfront, because surprises belong at birthdays, not on invoices.",
    },
    {
      q: 'Do you create the ad creative as well?',
      a: "Yes, the whole kit! Copywriting, graphic design and video editing, all in-house, all built for the platform it's running on. Already have brand assets you love? We'll happily work with those too. Either way, creative gets tested and refined based on performance data, not opinions.",
    },
    {
      q: 'How soon will I see results?',
      a: 'Faster than SEO, slower than magic. Most campaigns show results within the first 2 to 4 weeks. Month one is the learning phase, where we test audiences and creative to see what bites. Months two and three are where things get exciting, as the data compounds and performance climbs.',
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
    path: '/services/social-media',
    name: 'Social Media Advertising',
    serviceType: 'Social Media Advertising Services',
    description:
      'Social media ads for Australian SMEs. Facebook, Instagram, TikTok and LinkedIn campaigns built on real data and tied to real revenue.',
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
            { name: 'Social Media', path: '/services/social-media' },
          ]),
          webPageSchema({
            path: '/services/social-media',
            name: 'Social Media Advertising Australia | Ads That Convert | Shopa',
            description:
              'Social media ads for Australian SMEs. Facebook, Instagram, TikTok and LinkedIn campaigns built on real data and tied to real revenue.',
          }),
        ]}
      />

      {/* preloader */}
      <div id="preloader">
        <div className="loader_line"></div>
      </div>

      <ServiceHero
        headline="Social Media Advertising That Drives Real Growth."
        subtext="Social media advertising is about more than likes and impressions. It's about reaching the right people, generating quality leads and turning attention into customers."
        bgImage="/assets/img/breadcrumb/social-hero-v3.webp"
        stats={[
          { value: '1,500+', label: 'Businesses Supported' },
          { value: '5,000+', label: 'Campaigns Managed' },
          { value: 'Meta, TikTok & LinkedIn', label: 'Advertising Experts' },
        ]}
      />

      {/* ── INTRO — editorial split ── */}
      <div id="social-intro-pin" className="wds-pin-wrap">
      <div className="wds-intro-area pt-120 pb-110 bg-default fix wds-pin-panel">
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="wds-intro-content">
                <div className="section-title-wrap mb-35">
                  <h2 className="chy-title-1 has-55 chy-split-in-right chy-split-text">
                    Reach the Right People. Grow Your Business.
                  </h2>
                  <p className="chy-section-para-1 wow fadeInUp">
                    Your customers spend hours every day on social media, making it one of the most powerful places to build awareness, generate leads and drive sales.
                    <br /><br />
                    We create and manage high-performing advertising campaigns across Facebook, Instagram, TikTok and LinkedIn, combining audience targeting, compelling creative and ongoing optimisation to maximise your return on investment.
                    <br /><br />
                    Every campaign is built around your business goals, whether that&apos;s generating enquiries, increasing online sales, building brand awareness or driving more customers through your doors.
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
                  src="/assets/img/services/social-scrub-v2.mp4"
                  poster="/assets/img/services/social-scrub-v2-poster.webp"
                  className="wds-intro-video wds-intro-video--full"
                  ariaLabel="Social media advertising: Facebook and Instagram ad campaign results for a small business"
                  pinContainerId="social-intro-pin"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>{/* /wds-pin-wrap */}

      {/* ── WHAT WE PROVIDE — service console with marquee ── */}
      <section className="wds-under-section fix">
        {/* Scrolling background text — decorative */}
        <div className="shopa-floating-scrolltext" aria-hidden="true">
          <div className="shopa-floating-scrolltext__track">
            <span>Social Media Ads &nbsp;·&nbsp; Social Media Ads &nbsp;·&nbsp; Social Media Ads &nbsp;·&nbsp; Social Media Ads &nbsp;·&nbsp;</span>
            <span aria-hidden="true">Social Media Ads &nbsp;·&nbsp; Social Media Ads &nbsp;·&nbsp; Social Media Ads &nbsp;·&nbsp; Social Media Ads &nbsp;·&nbsp;</span>
          </div>
        </div>

        <div className="container chy-container-1">
          <div className="wds-deal-head">
            <h2 className="chy-title-1">Everything You Need for High-Performing Social Media Advertising.</h2>
            <p className="chy-section-para-1 wow fadeInUp">
              From campaign strategy and audience targeting to creative development, campaign management and ongoing optimisation, we manage every aspect of your social media advertising.
              <br /><br />
              Our team continually tests, refines and improves your campaigns to maximise performance, helping you generate more leads, more sales and a stronger return on your advertising investment.
            </p>
          </div>

          <div className="wds-svc-console wow fadeInUp">
            {provideItems.map((item, i) => (
              <div key={item.title} className="wds-svc-item" tabIndex={0}>
                <div className="wds-svc-item__row">
                  <span className="wds-svc-item__num">{`0${i + 1}`}</span>
                  <h3 className="chy-heading-1 wds-svc-item__title">{item.title}</h3>
                  <span className="wds-svc-item__arrow"><i className="fa-solid fa-right-long"></i></span>
                </div>
                <div className="wds-svc-item__panel">
                  <span className="wds-svc-item__ghost" aria-hidden="true">{`0${i + 1}`}</span>
                  {item.image
                    ? <img className="wds-svc-item__img" src={item.image} alt={item.title} loading="lazy" />
                    : <span className="wds-svc-item__icon"><i className={item.icon}></i></span>
                  }
                  <span className="wds-svc-item__panel-title">{item.title}</span>
                  <p className="chy-para-1 wds-svc-item__body">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE CHALLENGE — gradient band with overnight update feed ── */}
      <div className="wds-ledger-area pt-110 pb-110" data-navbar-dark="true">
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="mb-30">
                <h2 className="chy-title-1" style={{ color: '#fff' }}>
                  Social Media Never Stands Still. Neither Do We.
                </h2>
                <p className="chy-section-para-1 wow fadeInUp" style={{ color: 'rgba(255,255,255,0.95)', marginTop: '18px' }}>
                  Social media advertising is constantly evolving. Platforms update their algorithms, introduce new ad formats and change how campaigns are delivered, making ongoing optimisation essential for long-term success.
                  <br /><br />
                  That&apos;s why we don&apos;t launch campaigns and hope for the best. We continuously monitor performance, test new creative, refine audience targeting and optimise every campaign to keep your advertising performing at its best.
                  <br /><br />
                  While others react to changes after they&apos;ve happened, we&apos;re already adapting your strategy to help you stay ahead.
                </p>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="wds-feed wow fadeInRight" data-wow-duration="1.2s">
                <div className="wds-feed__head">
                  <span className="wds-feed__dot"></span>
                  <span className="wds-feed__title">Overnight update feed</span>
                  <span className="wds-feed__badge">live</span>
                </div>

                <div className="wds-feed__msg wds-feed__msg--in wow fadeInUp">
                  <i className="fa-solid fa-bolt"></i>
                  <div>
                    <p className="wds-feed__text">Algorithm updated. No memo sent.</p>
                    <span className="wds-feed__time">2:47 AM</span>
                  </div>
                </div>
                <div className="wds-feed__msg wds-feed__msg--out wow fadeInUp" data-wow-delay=".15s">
                  <i className="flaticon-check"></i>
                  <div>
                    <p className="wds-feed__text">Spotted. Campaigns adjusted.</p>
                    <span className="wds-feed__time">2:58 AM</span>
                  </div>
                </div>

                <div className="wds-feed__msg wds-feed__msg--in wow fadeInUp" data-wow-delay=".3s">
                  <i className="fa-solid fa-bolt"></i>
                  <div>
                    <p className="wds-feed__text">Targeting rules rewritten overnight.</p>
                    <span className="wds-feed__time">3:31 AM</span>
                  </div>
                </div>
                <div className="wds-feed__msg wds-feed__msg--out wow fadeInUp" data-wow-delay=".45s">
                  <i className="flaticon-check"></i>
                  <div>
                    <p className="wds-feed__text">Audiences rebuilt before performance dips.</p>
                    <span className="wds-feed__time">3:38 AM</span>
                  </div>
                </div>

                <div className="wds-feed__msg wds-feed__msg--in wow fadeInUp" data-wow-delay=".6s">
                  <i className="fa-solid fa-bolt"></i>
                  <div>
                    <p className="wds-feed__text">Ad format vanished.</p>
                    <span className="wds-feed__time">4:06 AM</span>
                  </div>
                </div>
                <div className="wds-feed__msg wds-feed__msg--out wow fadeInUp" data-wow-delay=".75s">
                  <i className="flaticon-check"></i>
                  <div>
                    <p className="wds-feed__text">New format already live.</p>
                    <span className="wds-feed__time">4:12 AM</span>
                  </div>
                </div>

                <p className="wds-feed__foot wow fadeInUp" data-wow-delay=".9s">While everyone else is still reading the update notes.</p>
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
            <h2 className="chy-title-1 chy-split-in-right chy-split-text">Social Media Results Business Owners Rave About</h2>
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
