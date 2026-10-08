import type { Metadata } from "next";
import TemplateScripts from "@/components/TemplateScripts";
import ServiceHero from "@/components/ServiceHero";
import { oohPageTestimonials } from "@/components/testimonialsData";
import ScrollScrubVideo from "@/components/ScrollScrubVideo";

export const metadata: Metadata = {
  title: 'OOH Advertising Australia | Screens, Billboards & More | Shopa',
  description: 'Out-of-home ads for Australian SMEs. Billboards, shopping-centre and grocery-store screens, and digital displays — big-brand visibility, small-business budget.',
};

export default function OohAdvertisingPage() {
  const stages: { num: string; short: string; title: string; body: string; image?: string }[] = [
    {
      num: '01',
      short: 'Planning',
      image: '/assets/img/ooh/stage-planning.webp',
      title: 'Strategic Planning: The Right Corner at the Right Time',
      body: "A brilliant ad in the wrong spot is just expensive wallpaper. We match formats, locations and timing to your exact audience: where they shop, which routes they drive, when they're paying attention. Precision first, so every dollar lands where it counts.",
    },
    {
      num: '02',
      short: 'Creative',
      image: '/assets/img/ooh/stage-creative.webp',
      title: 'Creative Design: Ads That Stop Traffic (Politely)',
      body: 'Outdoor creative plays by different rules. Your audience is walking, driving or wrangling a trolley, so you get about three seconds to land the message. We design bold, punchy creative built specifically for OOH formats: readable at a distance, memorable at a glance, impossible to unsee.',
    },
    {
      num: '03',
      short: 'Media Buying',
      image: '/assets/img/ooh/stage-media-buying.webp',
      title: 'Media Buying: Prime Spots Without the Prime Mark-Up',
      body: 'The best locations usually go to whoever has the biggest budget or the best connections. We bring the connections! Our media relationships secure premium placements at genuinely competitive rates, from major billboards to local screen networks.',
    },
    {
      num: '04',
      short: 'Reporting',
      image: '/assets/img/ooh/stage-reporting.webp',
      title: 'Campaign Reporting: Proof, Not Promises',
      body: "Outdoor doesn't have to be a leap of faith. We report on reach, frequency, dwell time and impressions, run post-campaign analysis, and track the uplift in searches and website visits while your ads are up. You'll know exactly what worked, and where to double down next time.",
    },
  ];

  const spots: { title: string; body: string; image?: string }[] = [
    {
      title: 'Grocery Store Screens',
      body: 'High-definition digital screens in the heart of busy supermarkets, seen by thousands of shoppers every week, right at the point of purchase. Weekly grocery runs mean weekly exposure, and familiarity turns into sales.',
      image: '/assets/img/ooh/grocery-screens.webp',
    },
    {
      title: 'Community Boards',
      body: "Static boards at the entrances and exits of busy grocery stores, greeting the same local shoppers week after week. Repetition builds recognition, and recognition builds the kind of trust money can't rush.",
      image: '/assets/img/ooh/community-boards.webp',
    },
    {
      title: 'Medical Centre Screens',
      body: 'Waiting rooms mean captive audiences and serious dwell time, all in an environment people inherently trust. Perfect for NDIS providers, home care, dental and allied health businesses building long-term local recognition.',
      image: '/assets/img/ooh/medical-screens.webp',
    },
    {
      title: 'Shopping Centres',
      body: 'Turn foot traffic into brand traction! Shopping centre displays put your business front and centre in bustling retail hubs, ideal for fashion, beauty, retail and service brands chasing maximum visibility.',
      image: '/assets/img/ooh/shopping-centres.webp',
    },
    {
      title: 'Digital Billboards',
      body: 'Big, bold and impossible to miss. Digital billboards in high-traffic zones give you flexibility and scale: swap creative in days, run time-sensitive promotions, and make the kind of impression that gets talked about at dinner.',
      image: '/assets/img/ooh/digital-billboards.webp',
    },
  ];

  const oohTestimonials = oohPageTestimonials;

  const faqs = [
    {
      q: 'What types of OOH advertising do you offer?',
      a: 'The formats that work hardest for local businesses! Digital billboards in high-traffic zones, shopping centre displays, plus our specialty networks: grocery store screens, community boards and medical centre screens.',
    },
    {
      q: "Isn't outdoor advertising only for big brands?",
      a: 'It used to be, and plenty of agencies would love you to keep believing it. Our network partnerships unlock premium OOH placements at rates designed for SMEs, and hyper-local formats like grocery and medical screens mean you only pay to reach your actual service area, not the whole city.',
    },
    {
      q: 'What budget do I need for an OOH campaign?',
      a: "Local campaigns start from around $5,000, while city-wide or national campaigns typically start at $20,000 and up. Tell us your number and we'll build the biggest possible impact around it. No judgement, no upselling, just honest maths.",
    },
    {
      q: 'How do you measure OOH campaign effectiveness?',
      a: 'With data, not gut feel. We use audience reach data, foot traffic analysis and brand lift studies, and we tie it back to your digital numbers: uplift in searches, website visits and enquiries while your campaign is live. Outdoor and online working together tell you the full story.',
    },
    {
      q: 'How long does it take to launch an OOH campaign?',
      a: 'A typical campaign goes from briefing to launch in 3 to 6 weeks, covering creative, production and placement. In a hurry? Digital OOH formats can go live within days of creative approval. Perfect for flash sales, launches and seasonal pushes!',
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
    name: 'OOH Advertising',
    serviceType: 'Out-of-Home Advertising Services',
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
        headline="Put Your Brand Where Your Customers Already Are."
        subtext={
          <>
            Digital marketing matters. But some of the most powerful brand moments happen in the real world.
            <br /><br />
            We help businesses reach customers through shopping centres, medical centres, supermarkets, billboards, transit and retail locations across Australia, giving your brand visibility where people live, shop, work and travel.
          </>
        }
        bgImage="/assets/img/breadcrumb/ooh-hero.webp"
        stats={[
          { value: '1,500+', label: 'Businesses Supported' },
          { value: '5,000+', label: 'Campaigns Managed' },
          { value: 'Australia-Wide', label: 'OOH Network' },
        ]}
      />

      {/* ── INTRO — editorial split ── */}
      <div id="ooh-intro-pin" className="wds-pin-wrap">
      <div className="wds-intro-area pt-120 pb-110 bg-default fix wds-pin-panel">
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="wds-intro-content">
                <div className="section-title-wrap mb-35">
                  <h2 className="chy-title-1 has-55 chy-split-in-right chy-split-text">
                    Big Brand Visibility. Built for Small Business.
                  </h2>
                  <p className="chy-section-para-1 wow fadeInUp">
                    Out-of-home advertising puts your business where your customers already are—shopping centres, medical centres, supermarkets, billboards, transit locations and other high-traffic environments where your brand is seen every day.
                    <br /><br />
                    What was once reserved for large national brands is now accessible to small and medium businesses. Through our network of trusted media partners, we secure premium advertising opportunities at rates designed to fit SME budgets.
                    <br /><br />
                    From campaign strategy and creative to artwork, bookings, production and reporting, our team manages the entire process, making outdoor advertising simple, effective and surprisingly affordable.
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
                  src="/assets/img/services/ooh-scrub-v2.mp4"
                  poster="/assets/img/services/ooh-scrub-v2-poster.webp"
                  className="wds-intro-video wds-intro-video--full"
                  ariaLabel="OOH advertising: digital billboard and grocery store screen campaign for a small business"
                  pinContainerId="ooh-intro-pin"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>{/* /wds-pin-wrap */}

      {/* ── WHAT WE PROVIDE — expanding stage columns with marquee ── */}
      <section className="wds-under-section fix">
        {/* Scrolling background text — decorative */}
        <div className="shopa-floating-scrolltext" aria-hidden="true">
          <div className="shopa-floating-scrolltext__track">
            <span>OOH Advertising &nbsp;·&nbsp; OOH Advertising &nbsp;·&nbsp; OOH Advertising &nbsp;·&nbsp; OOH Advertising &nbsp;·&nbsp;</span>
            <span aria-hidden="true">OOH Advertising &nbsp;·&nbsp; OOH Advertising &nbsp;·&nbsp; OOH Advertising &nbsp;·&nbsp; OOH Advertising &nbsp;·&nbsp;</span>
          </div>
        </div>

        <div className="container chy-container-1">
          <div className="wds-culprit-head">
            <h2 className="chy-title-1">Everything You Need for a Successful OOH Campaign.</h2>
            <p className="chy-section-para-1">
              From strategy and creative through to media buying, production, installation and reporting, we manage every stage of your outdoor advertising campaign.
              <br /><br />
              You&apos;ll have one team, one point of contact and one clear strategy—making it easy to launch campaigns that build brand awareness and deliver measurable results.
            </p>
          </div>

          <div className="wds-culprits">
            {stages.map((card) => (
              <div key={card.num} className="wds-culprit" tabIndex={0}>
                <div className="wds-culprit__closed" aria-hidden="true">
                  <span className="wds-culprit__closed-num">{card.num}</span>
                  <span className="wds-culprit__closed-label">{card.short}</span>
                  <span className="wds-culprit__closed-tip"><i className="far fa-plus"></i></span>
                </div>
                <div className="wds-culprit__open">
                  {card.image && <img className="wds-culprit__img" src={card.image} alt={card.title} loading="lazy" />}
                  <span className="wds-culprit__ghost" aria-hidden="true">{card.num}</span>
                  <span className="wds-culprit__tag">Stage {card.num}</span>
                  <h3 className="chy-heading-1 wds-culprit__title">{card.title}</h3>
                  <p className="chy-para-1 wds-culprit__body">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHERE WE ADVERTISE — 8-format hover grid ── */}
      <div className="wds-spots-area pt-110 pb-110 bg-default fix">
        <div className="container chy-container-1">
          <div className="section-title-wrap text-center mb-50">
            <h5 className="chy-subtitle-1 wow fadeInDown">where we advertise</h5>
            <h2 className="chy-title-1 chy-split-in-right chy-split-text">Eight Ways to Be Everywhere Your Customers Go</h2>
          </div>

          <div className="wds-spot-grid">
            {spots.map((spot, i) => (
              <div key={spot.title} className="wds-spot wow fadeInUp" data-wow-delay={`${(i % 3) * 0.08}s`}>
                {spot.image && <img className="wds-spot__img" src={spot.image} alt={spot.title} loading="lazy" />}
                <span className="wds-spot__ghost" aria-hidden="true">{`0${i + 1}`}</span>
                <h3 className="chy-heading-1 wds-spot__title">{spot.title}</h3>
                <p className="chy-para-1 wds-spot__body">{spot.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── THE CHALLENGE — gradient band with mini billboard ── */}
      <div className="wds-ledger-area pt-110 pb-110" data-navbar-dark="true">
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="mb-30">
                <h2 className="chy-title-1" style={{ color: '#fff' }}>
                  The Right Location Changes Everything.
                </h2>
                <p className="chy-section-para-1 wow fadeInUp" style={{ color: 'rgba(255,255,255,0.95)', marginTop: '18px' }}>
                  Outdoor advertising isn&apos;t just about being seen—it&apos;s about being seen by the right people, in the right place, at the right time.
                  <br /><br />
                  Choosing the right locations, formats, audience and campaign timing can make the difference between a campaign that builds your brand and one that goes unnoticed.
                  <br /><br />
                  With thousands of campaigns managed and strong relationships across Australia&apos;s leading out-of-home media networks, we know how to identify the placements that deliver the greatest impact for your budget.
                  <br /><br />
                  Every recommendation is backed by strategy, experience and a focus on helping your business get the strongest possible return from every campaign.
                </p>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="wds-bill-wrap wow fadeInRight" data-wow-duration="1.2s">
                <div className="wds-billboard">
                  <div className="wds-billboard__screen">
                    <span className="wds-billboard__line">Seen.</span>
                    <span className="wds-billboard__line wds-billboard__line--dim">Not skipped.</span>
                  </div>
                  <div className="wds-billboard__legs"><span></span><span></span></div>
                </div>
                <div className="wds-bill-chips">
                  <span className="wds-bill-chips__label">Doesn&apos;t exist out here</span>
                  <div className="wds-bill-chips__row">
                    <span className="wds-bill-chip"><span className="wds-bill-chip__x">&times;</span>Ad blockers</span>
                    <span className="wds-bill-chip"><span className="wds-bill-chip__x">&times;</span>Skip buttons</span>
                    <span className="wds-bill-chip"><span className="wds-bill-chip__x">&times;</span>Doom-scrolling</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS — masonry review wall (OOH stories first) ── */}
      <div className="wds-reviews-area pt-110 pb-110">
        <div className="container chy-container-1">
          <div className="section-title-wrap text-center mb-50">
            <h5 className="chy-subtitle-1 wow fadeInDown">testimonials</h5>
            <h2 className="chy-title-1 chy-split-in-right chy-split-text">OOH Results Business Owners Rave About</h2>
            <p className="chy-section-para-1 wow fadeInUp" style={{ maxWidth: '640px', margin: '10px auto 0' }}>
              We&apos;d happily brag all day, but our clients tell it better. Here&apos;s what business owners say about working with us.
            </p>
          </div>
          <div className="wds-reviews-wall">
            {oohTestimonials.map((t, i) => (
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
