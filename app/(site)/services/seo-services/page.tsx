import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { serviceSchema, breadcrumbSchema, webPageSchema } from "@/lib/schema";
import TemplateScripts from "@/components/TemplateScripts";
import ServiceHero from "@/components/ServiceHero";
import { seoPageTestimonials as testimonials } from "@/components/testimonialsData";
import ScrollScrubVideo from "@/components/ScrollScrubVideo";

export const metadata: Metadata = {
  title: 'SEO Services Australia | Get Found, Rank, Grow | Shopa',
  description: 'SEO for Australian SMEs that moves rankings and revenue. Technical fixes, local SEO, content and links — built to get you found by ready-to-buy customers.',
};

export default function SeoServicesPage() {
  const pillars: { num: string; short: string; title: string; body: string; image?: string }[] = [
    {
      num: '01',
      short: 'Technical SEO',
      image: '/assets/img/seo/pillar-technical.webp',
      title: 'Technical SEO: The Engine Room',
      body: 'A slow, clunky website is like a sports car with the handbrake on. We audit and tune your technical foundations: crawlability, indexability, Core Web Vitals, schema markup and site speed, so both search engines and AI crawlers can find your content, understand it, and rank it. Release the handbrake and watch what happens!',
    },
    {
      num: '02',
      short: 'Keyword Research',
      image: '/assets/img/seo/pillar-keywords.webp',
      title: "Keyword Research: Read Your Customers' Minds",
      body: "What do your customers type, and increasingly, what do they ask? We research both: the high-value keywords typed into Google and the natural, conversational questions asked of AI assistants and voice search. Every opportunity mapped from 'just browsing' to 'take my money'. No guesswork, just data doing the detective work.",
    },
    {
      num: '03',
      short: 'Content',
      image: '/assets/img/seo/pillar-content.webp',
      title: 'Content Optimisation: Words That Work Overtime',
      body: "Modern content has three audiences: humans who buy, search engines that rank, and AI models that quote. We create and optimise landing pages, service pages, blogs and FAQs that win over all three: clearly structured, genuinely helpful, and written with the expertise signals that Google's E-E-A-T standards and AI engines reward.",
    },
    {
      num: '04',
      short: 'Link Building',
      image: '/assets/img/seo/pillar-links.webp',
      title: 'Link Building: Street Cred for Your Website',
      body: "Every quality backlink is another respected voice vouching for your business, and here's the kicker: AI engines lean on those same authority signals when deciding which businesses to recommend. We earn high-quality, relevant links from reputable international publications, building credibility that pays off twice.",
    },
  ];

  const aiSeoCards = [
    {
      icon: 'flaticon-seo',
      title: 'Generative Engine Optimisation (GEO)',
      body: 'Getting your business cited, quoted and recommended by AI engines is a discipline of its own. We structure your content, strengthen your entity signals and build the topical authority that makes AI models treat your business as the trusted source worth mentioning.',
    },
    {
      icon: 'flaticon-customer-service',
      title: 'Answer Engine Optimisation (AEO)',
      body: 'AI Overviews and featured snippets answer questions before anyone clicks a link. We engineer your content to be that answer: direct, well-structured responses to the exact questions your customers ask, formatted the way answer engines love to lift them.',
    },
    {
      icon: 'flaticon-statistics',
      title: 'Structured Data and Entity SEO',
      body: "AI engines don't read your website like a human; they read it like a database. Schema markup, consistent business information and clean entity signals tell the machines precisely who you are, what you do and where you do it. We speak fluent robot, so you don't have to.",
    },
    {
      icon: 'flaticon-guarantee',
      title: 'E-E-A-T and Trust Signals',
      body: 'Experience, Expertise, Authoritativeness and Trust: the four ingredients Google and AI engines look for before recommending anyone. We build them into your digital presence, from author credentials and reviews to citations and case studies, so the machines vouch for you with confidence.',
    },
  ];

  const faqs = [
    {
      q: 'What is AI SEO and do I actually need it?',
      a: "AI SEO (also called GEO, generative engine optimisation) is the practice of making your business visible in AI-powered search: ChatGPT, Google's AI Overviews, Gemini, Perplexity and voice assistants. And yes, you need it. A growing share of your customers get answers from AI without ever seeing a traditional results page. If AI engines don't know your business exists, neither do those customers.",
    },
    {
      q: 'How do I get my business mentioned by ChatGPT and AI Overviews?',
      a: "There's no secret handshake, just strong signals: well-structured content that answers real questions, schema markup AI can parse, consistent business information across the web, genuine reviews, and authority built through quality links and citations. It's what we do all day. The businesses investing in this now will be the default answers of the next few years.",
    },
    {
      q: 'How long does SEO take to show results?',
      a: 'SEO is a marathon with a very rewarding finish line. Most clients see rankings start to move within 3 to 4 months, with the real traffic growth arriving around the 6 to 12 month mark. Competitive industries can take longer, while local SEO often delivers faster. Anyone promising page one in a fortnight is selling magic beans.',
    },
    {
      q: 'Do you offer local SEO for businesses?',
      a: "Absolutely, it's one of our favourite party tricks. We optimise your Google Business Profile, build local citations and create location-specific content so you dominate local results, in classic search and in AI answers, whether your patch is one suburb, a city, or an entire state.",
    },
    {
      q: 'Do you do SEO for online stores?',
      a: 'Yes! eCommerce SEO gets your products in front of shoppers actively searching for what you sell, on Google and in AI shopping recommendations. Targeted traffic, less reliance on discounting, and product pages that rank as well as they convert.',
    },
    {
      q: 'What SEO reporting do you provide?',
      a: "Monthly reports with zero smoke and mirrors: keyword rankings, organic traffic, click-through rates, conversions and backlink growth, pulled from Google Search Console, GA4 and SEMrush, plus how you're showing up in AI search. You'll always know exactly what your investment is doing.",
    },
    {
      q: 'Do you use white-hat SEO techniques only?',
      a: "Only and always. Black-hat tricks can spike your rankings for a month and sink your website for years, and we're not in the business of sinking websites. Everything we do complies with Google's guidelines and builds growth that lasts.",
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
    path: '/services/seo-services',
    name: 'SEO Services',
    serviceType: 'Search Engine Optimisation Services',
    description:
      'SEO for Australian SMEs that moves rankings and revenue. Technical fixes, local SEO, content and links, built to get you found by ready-to-buy customers.',
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
            { name: 'SEO Services', path: '/services/seo-services' },
          ]),
          webPageSchema({
            path: '/services/seo-services',
            name: 'SEO Services Australia | Get Found, Rank, Grow | Shopa',
            description:
              'SEO for Australian SMEs that moves rankings and revenue. Technical fixes, local SEO, content and links, built to get you found by ready-to-buy customers.',
          }),
        ]}
      />

      {/* preloader */}
      <div id="preloader">
        <div className="loader_line"></div>
      </div>

      <ServiceHero
        headline="Be Found Wherever Your Customers Search."
        subtext={
          <>
            Search has changed. Your customers aren&apos;t just using Google anymore. They&apos;re searching through ChatGPT, Gemini, Perplexity, AI Overviews and whatever comes next.
            <br /><br />
            Our SEO strategies are built for today&apos;s search landscape, helping your business become more visible wherever people are looking. From technical SEO and content optimisation to local search and AI search visibility, we focus on sustainable growth—not shortcuts that disappear with the next algorithm update.
          </>
        }
        bgImage="/assets/img/breadcrumb/seo-hero.webp"
        stats={[
          { value: '1,500+', label: 'Businesses Supported' },
          { value: '5,000+', label: 'Campaigns Managed' },
          { value: 'Google & AI', label: 'Search Optimisation' },
        ]}
      />

      {/* ── INTRO — editorial split ── */}
      <div id="seo-intro-pin" className="wds-pin-wrap">
      <div className="wds-intro-area pt-120 pb-110 bg-default fix wds-pin-panel">
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="wds-intro-content">
                <div className="section-title-wrap mb-35">
                  <h2 className="chy-title-1 has-55 chy-split-in-right chy-split-text">
                    Search Has Changed. Your SEO Should Too.
                  </h2>
                  <p className="chy-section-para-1 wow fadeInUp">
                    Search isn&apos;t what it used to be. Your customers aren&apos;t just searching on Google anymore. They&apos;re asking ChatGPT, reading AI Overviews, using voice search and discovering businesses through a growing number of AI-powered platforms.
                    <br /><br />
                    That&apos;s why our approach goes beyond traditional SEO. We combine technical optimisation, high-quality content, local SEO and authority building with strategies designed to improve your visibility across both Google and AI-powered search.
                    <br /><br />
                    Whether your customers are searching for a local service, comparing providers or asking AI for recommendations, we&apos;ll help make sure your business is the one they find.
                  </p>
                </div>
                <a href="/contact-us" className="chy-pr-btn-1 wow fadeInLeft">
                  <span className="text">Book an SEO Strategy Call</span>
                  <span className="icon"><i className="fa-solid fa-right-long"></i></span>
                </a>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="wds-intro-media wow fadeInRight" data-wow-duration="1.2s">
                <ScrollScrubVideo
                  src="/assets/img/services/seo-scrub-v3.mp4"
                  poster="/assets/img/services/seo-scrub-v3-poster.webp"
                  className="wds-intro-video wds-intro-video--full"
                  ariaLabel="SEO agency dashboard showing Google rankings and AI search visibility for a small business"
                  pinContainerId="seo-intro-pin"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>{/* /wds-pin-wrap */}

      {/* ── WHAT WE PROVIDE — expanding pillar columns ── */}
      <section className="wds-under-section fix">
        {/* Scrolling background text — decorative */}
        <div className="shopa-floating-scrolltext" aria-hidden="true">
          <div className="shopa-floating-scrolltext__track">
            <span>SEO Services &nbsp;·&nbsp; SEO Services &nbsp;·&nbsp; SEO Services &nbsp;·&nbsp; SEO Services &nbsp;·&nbsp;</span>
            <span aria-hidden="true">SEO Services &nbsp;·&nbsp; SEO Services &nbsp;·&nbsp; SEO Services &nbsp;·&nbsp; SEO Services &nbsp;·&nbsp;</span>
          </div>
        </div>

        <div className="container chy-container-1">
          <div className="wds-culprit-head">
            <h2 className="chy-title-1">Everything Your Business Needs to Be Found Online.</h2>
            <p className="chy-section-para-1">
              Modern SEO is about much more than keywords. It&apos;s about building a strong online presence that helps your business get found across Google, AI search and every stage of the customer journey.
              <br /><br />
              From technical SEO and on-page optimisation to content, local SEO, authority building and AI search visibility, our team manages every part of your search strategy so nothing holds your business back.
              <br /><br />
              Every recommendation is designed to improve your visibility today while preparing your business for where search is heading tomorrow.
            </p>
          </div>

          <div className="wds-culprits">
            {pillars.map((card) => (
              <div key={card.num} className="wds-culprit" tabIndex={0}>
                <div className="wds-culprit__closed" aria-hidden="true">
                  <span className="wds-culprit__closed-num">{card.num}</span>
                  <span className="wds-culprit__closed-label">{card.short}</span>
                  <span className="wds-culprit__closed-tip"><i className="far fa-plus"></i></span>
                </div>
                <div className="wds-culprit__open">
                  {card.image && <img className="wds-culprit__img" src={card.image} alt={card.title} loading="lazy" />}
                  <span className="wds-culprit__ghost" aria-hidden="true">{card.num}</span>
                  <span className="wds-culprit__tag">Pillar {card.num}</span>
                  <h3 className="chy-heading-1 wds-culprit__title">{card.title}</h3>
                  <p className="chy-para-1 wds-culprit__body">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI SEO — differentiator bento ── */}
      <div className="wds-deal-area pt-110 pb-110 bg-default fix">
        <div className="container chy-container-1">

          <div className="wds-deal-head">
            <div>
              <h5 className="chy-subtitle-1 wow fadeInDown">ai seo</h5>
              <h2 className="chy-title-1">AI Search Is Changing How Customers Find Businesses.</h2>
            </div>
            <p className="chy-section-para-1 wow fadeInUp">
              More people are asking ChatGPT, Gemini, Perplexity and Google&apos;s AI Overviews for recommendations instead of scrolling through pages of search results. That means your business needs to be visible wherever those answers are being generated.
              <br /><br />
              Our AI search optimisation strategies help improve your brand&apos;s visibility by strengthening the signals AI platforms rely on—high-quality content, website authority, structured information and trusted online mentions.
              <br /><br />
              As search continues to evolve, we&apos;ll help make sure your business is positioned to be part of the conversation, not left out of it.
            </p>
          </div>

          <div className="wds-deal-grid">
            {aiSeoCards.map((card, i) => (
              <div key={card.title} className={`wds-deal-card wds-deal-card--${i + 1} wow fadeInUp`} data-wow-delay={`${i * 0.1}s`}>
                {i === 0 && <span className="wds-deal-card__ghost" aria-hidden="true">AI</span>}
                <span className="wds-deal-card__icon"><i className={card.icon}></i></span>
                <h3 className="chy-heading-1 wds-deal-card__title">{card.title}</h3>
                <p className="chy-para-1 wds-deal-card__body">{card.body}</p>
              </div>
            ))}
          </div>

          <p className="chy-section-para-1 wow fadeInUp" style={{ textAlign: 'center', fontWeight: 700, maxWidth: '760px', margin: '46px auto 0' }}>
            The businesses that embraced Google early gained a lasting competitive advantage. AI search represents the next shift. The businesses that adapt now will be the ones customers find first tomorrow.
          </p>

        </div>
      </div>

      {/* ── THE CHALLENGE — gradient statement band ── */}
      <div className="wds-ledger-area pt-110 pb-110" data-navbar-dark="true">
        <div className="container chy-container-1">
          <div className="row align-items-center">

            <div className="col-xl-6 col-lg-6">
              <div className="mb-30">
                <h2 className="chy-title-1" style={{ color: '#fff' }}>
                  SEO Is Never Finished. Neither Are We.
                </h2>
                <p className="chy-section-para-1 wow fadeInUp" style={{ color: 'rgba(255,255,255,0.95)', marginTop: '18px' }}>
                  Search is constantly evolving. Google updates its algorithms, AI platforms continue to reshape how people discover businesses, and your competitors are always looking for ways to get ahead. That&apos;s why successful SEO isn&apos;t a one-off project—it&apos;s an ongoing strategy.
                  <br /><br />
                  Our team continually monitors performance, adapts to algorithm changes, tracks emerging AI search trends and refines your strategy to keep your business visible where it matters most.
                  <br /><br />
                  While others react to changes after they&apos;ve happened, we&apos;re already helping your business stay one step ahead.
                </p>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <div className="wds-soar-stack wow fadeInRight" data-wow-duration="1.2s">

                <div className="wds-soar-panel wds-soar-panel--forget">
                  <div className="wds-soar-panel__head">
                    <i className="fa-solid fa-arrow-trend-down"></i>
                    <span className="wds-soar-panel__label">Set-and-Forget</span>
                  </div>
                  <svg className="wds-soar-panel__spark" viewBox="0 0 220 54" preserveAspectRatio="none" aria-hidden="true">
                    <polyline points="4,10 48,18 82,14 124,30 164,40 216,48" />
                  </svg>
                  <p className="wds-soar-panel__caption">Rankings quietly slide back down the hill they just climbed.</p>
                </div>

                <div className="wds-soar-panel wds-soar-panel--soar">
                  <div className="wds-soar-panel__head">
                    <i className="fa-solid fa-arrow-trend-up"></i>
                    <span className="wds-soar-panel__label">Set-and-Soar</span>
                  </div>
                  <svg className="wds-soar-panel__spark" viewBox="0 0 220 54" preserveAspectRatio="none" aria-hidden="true">
                    <polyline points="4,46 48,40 82,42 124,24 164,16 216,6" />
                  </svg>
                  <p className="wds-soar-panel__caption">Strategy adjusted before problems become plummets — so you stay ahead of the curve.</p>
                  <div className="wds-soar-panel__chips">
                    <span className="wds-soar-chip"><span className="wds-soar-chip__dot"></span>Algorithm updates</span>
                    <span className="wds-soar-chip"><span className="wds-soar-chip__dot"></span>AI engine answers</span>
                    <span className="wds-soar-chip"><span className="wds-soar-chip__dot"></span>Competitor moves</span>
                  </div>
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
            <h2 className="chy-title-1 chy-split-in-right chy-split-text">SEO Results Business Owners Rave About</h2>
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
