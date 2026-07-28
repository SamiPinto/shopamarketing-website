import type { Metadata } from "next";
import TemplateScripts from "@/components/TemplateScripts";
import PricingSection from "@/components/PricingSection";
import ServiceHero from "@/components/ServiceHero";
import ScrollScrubVideo from "@/components/ScrollScrubVideo";

export const metadata: Metadata = {
  title: 'Done-For-You Marketing Australia | Your Whole Team | Shopa',
  description: 'Full-service marketing for Australian SMEs. Strategy, ads, SEO, content and design handled by one senior team — so you run your business, not your marketing.',
};

export default function DoneForYouPage() {
  const focusItems = [
    'Building the foundation',
    'Gathering campaign data',
    'Testing creatives and audiences',
    'Optimising performance',
    'Improving conversion rates',
    'Strengthening online visibility',
  ];

  const teamRoles = [
    'Marketing Strategist',
    'Designer',
    'SEO Specialist',
    'Ads Expert',
    'Content Creator',
    'Dedicated Account Manager',
  ];

  const faqs = [
    {
      q: 'What exactly is included in a Done For You package?',
      a: "Everything on the plan card. A dedicated account manager and monthly strategy, campaign management across Google and Meta, SEO and AI search visibility across ChatGPT and Gemini, blog articles, unlimited creative design and your website managed month to month. You also get a custom dashboard where you can watch it all work. One management fee, no surprise extras, no 'that'll be additional' emails. Ad spend is the only separate line, and it goes straight to the platforms.",
    },
    {
      q: 'How is this different from hiring an in-house marketer?',
      a: "One good in-house marketer costs $80,000+ a year, and even the best can't be a strategist, designer, SEO specialist, ads expert and videographer at once. Nobody can! For a fraction of that, you get a whole team of specialists who do this all day, every day, with no leave, no notice periods and no birthday cake obligations.",
    },
    {
      q: 'Are there lock-in contracts?',
      a: "No. We keep clients with results, not paperwork. We do recommend giving your campaigns 3 to 4 months to build proper momentum, because that's honestly how long good marketing takes to compound. But you're free to leave any time, and if you do, we'll hand everything over cleanly.",
    },
    {
      q: 'When will I start seeing results?',
      a: "Paid ads start moving quickly, often within weeks. The full engine, SEO climbing, audiences dialled in, creative tested and conversion rates optimised, typically hits its stride at the 3 to 4 month mark. From there, it compounds. We'll never promise overnight miracles, because we'd rather keep you for years than impress you for a fortnight.",
    },
    {
      q: 'Which plan is right for my business?',
      a: "That's exactly what the strategy call is for! Tell us your goals, your market and your appetite for growth, and we'll recommend the plan that fits, even if it's the cheaper one. You can move between plans as your business grows, and plenty of our clients do.",
    },
    {
      q: 'How does ad spend work?',
      a: "Your ad spend is billed separately and goes straight to Google, Meta and the other platforms. We don't mark it up. We don't take a cut. Before you start, we'll recommend a budget based on your industry, your competition and what it genuinely costs to compete in your market. You set the number, you can change it any time, and your dashboard shows exactly where every dollar went.",
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
    name: 'Done For You Marketing Packages',
    serviceType: 'Full-Service Marketing Management',
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
        headline="Your Entire Marketing Department. One Monthly Fee."
        subtext={'Why manage five agencies, three freelancers and your cousin who “knows social media” when one experienced team can do it all? Strategy, creative, digital, websites, social media, out-of-home, reporting—we become your marketing department, without the overhead of building one.'}
        bgImage="/assets/img/breadcrumb/dfy-hero-v2.webp"
        stats={[
          { value: '1,500+', label: 'Businesses Supported' },
          { value: '5,000+', label: 'Campaigns Managed' },
          { value: 'One Team.', label: 'Every Marketing Channel.' },
        ]}
      />

      {/* ── INTRO — editorial split ── */}
      <div id="dfy-intro-pin" className="wds-pin-wrap">
      <div className="wds-intro-area pt-120 pb-110 bg-default fix wds-pin-panel">
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="wds-intro-content">
                <div className="section-title-wrap mb-35">
                  <h2 className="chy-title-1 has-55 chy-split-in-right chy-split-text">
                    Built for Businesses That Want Growth, Not More Marketing Homework
                  </h2>
                  <p className="chy-section-para-1 wow fadeInUp">
                    Most marketing providers sell individual services. SEO. Google Ads. Social media. Websites. The problem is, your customers don&apos;t experience your business one channel at a time.
                    <br /><br />
                    We start somewhere different. We take the time to understand your business, your goals and what&apos;s actually going to move the needle. Then we build a marketing strategy that brings the right channels together, all managed by one dedicated team.
                    <br /><br />
                    From your website and SEO to Google Ads, social media, creative, content and out-of-home advertising, everything works together as one coordinated strategy. One team. One point of contact. One report that actually makes sense.
                    <br /><br />
                    Because after managing more than 5,000 campaigns, we&apos;ve learned that the best marketing doesn&apos;t happen in silos. It happens when every part of your marketing is pulling in the same direction.
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
                  src="/assets/img/services/dfy-scrub.mp4"
                  poster="/assets/img/services/dfy-scrub-poster.webp"
                  className="wds-intro-video wds-intro-video--full"
                  ariaLabel="Done for you marketing: one team managing website, SEO, ads and social media for a small business"
                  pinContainerId="dfy-intro-pin"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>{/* /wds-pin-wrap */}

      {/* ── PRICING — Simple, All-Inclusive Rates ── */}
      <PricingSection />

      {/* ── NO LOCK IN CONTRACTS — split with focus checklist ── */}
      <div className="wds-nolock-area pt-110 pb-110 bg-default fix">
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="wds-nolock-content">
                <div className="section-title-wrap mb-35">
                  <h2 className="chy-title-1 chy-split-in-right chy-split-text">No Lock-In Contracts. Just Results Worth Staying For.</h2>
                  <p className="chy-section-para-1 wow fadeInUp">
                    We don&apos;t believe in locking clients into long contracts. No exit fees. No confusing fine print. Our clients stay because the strategy works, the service is great and the results keep coming.
                    <br /><br />
                    That said, great marketing isn&apos;t instant. Building awareness, collecting meaningful data, optimising campaigns and improving search rankings takes time. Most businesses start seeing consistent momentum after three to four months, not three to four weeks.
                    <br /><br />
                    You&apos;re free to leave whenever you like, but we&apos;d rather build a partnership that&apos;s worth staying for.
                  </p>
                </div>
                <a href="/contact-us" className="chy-pr-btn-1 wow fadeInLeft">
                  <span className="text">Let&apos;s Talk</span>
                  <span className="icon"><i className="fa-solid fa-right-long"></i></span>
                </a>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="wds-momentum wow fadeInRight" data-wow-duration="1.2s">
                <h4 className="chy-heading-1 wds-momentum__title">The first few months are focused on:</h4>
                <div className="wds-momentum__track">
                  {focusItems.map((item, i) => (
                    <div key={item} className="wds-momentum__step wow fadeInUp" data-wow-delay={`${i * 0.08}s`}>
                      <span className="wds-momentum__node"><i className="flaticon-check"></i></span>
                      <span className="wds-momentum__num">{`0${i + 1}`}</span>
                      <span className="wds-momentum__label">{item}</span>
                    </div>
                  ))}
                  <div className="wds-momentum__finish wow fadeInUp" data-wow-delay=".5s">
                    <span className="wds-momentum__finish-badge">Months 3&ndash;4</span>
                    <span className="wds-momentum__finish-text">Consistent traction kicks in</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── YOUR ENTIRE MARKETING TEAM — gradient band ── */}
      <div className="wds-team-band pt-100 pb-100" data-navbar-dark="true" style={{ background: 'var(--chy-gd-1)' }}>
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="mb-30">
                <h2 className="chy-title-1" style={{ color: '#fff' }}>A Full Marketing Team, Minus the Payroll</h2>
                <p className="chy-section-para-1 wow fadeInUp" style={{ marginTop: '18px', color: 'rgba(255,255,255,0.95)' }}>
                  Hiring a marketing strategist, designer, SEO specialist, Google Ads expert, content creator and account manager means multiple salaries, recruitment, training and overheads. Or you could have an experienced team ready to go for one monthly fee.
                  <br /><br />
                  From strategy and creative to websites, SEO, Google Ads, social media, content and out-of-home advertising, we manage your entire marketing operation from end to end—while you focus on running your business.
                </p>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="wds-payroll wow fadeInRight" data-wow-duration="1.2s">
                <div className="wds-payroll__head">
                  <span className="wds-payroll__head-label">If you hired in-house</span>
                  <span className="wds-payroll__head-icon"><i className="flaticon-team"></i></span>
                </div>
                {teamRoles.map((role, i) => (
                  <div key={role} className="wds-payroll__row">
                    <span className="wds-payroll__role">
                      <span className="wds-payroll__role-num">{`0${i + 1}`}</span>
                      {role}
                    </span>
                    <span className="wds-payroll__salary">a full salary</span>
                  </div>
                ))}
                <div className="wds-payroll__total">
                  <span className="wds-payroll__total-label">Your entire team, all-inclusive</span>
                  <span className="wds-payroll__total-value">One monthly fee</span>
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
