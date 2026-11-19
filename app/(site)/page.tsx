import TemplateScripts from '@/components/TemplateScripts';
import { getPosts, featuredImage, formatDate } from '@/lib/wordpress';
import ServicesTicker from '@/components/ServicesTicker';
import HeroVideoScrub from '@/components/HeroVideoScrub';
import StarAnimationTrigger from '@/components/StarAnimationTrigger';
import FloatingCardsGSAP from '@/components/FloatingCardsGSAP';
import ServiceTestimonials from '@/components/ServiceTestimonials';
import { homeServices } from '@/components/homeServicesData';
import { homeExtraTestimonials } from '@/components/testimonialsData';
import { getGoogleRating } from '@/lib/googleReviews';
import JsonLd from '@/components/JsonLd';
import { ORG_ID, webPageSchema } from '@/lib/schema';

export const revalidate = 3600;

export default async function HomePage() {
  const [latestPosts, googleRating] = await Promise.all([getPosts(3), getGoogleRating()]);

  const whyItems = [
    { icon: 'flaticon-digital-campaign', title: 'One Strategy', subtitle: 'Every Channel.', body: "Digital and physical, online and offline, all working from the same playbook. Because five channels running five different strategies isn't marketing, it's an expensive argument." },
    { icon: 'flaticon-team', title: 'Dedicated Account Manager', subtitle: 'One team that knows your business.', body: 'You work directly with a dedicated account manager who knows your goals, your market and your name. No call centres, no ticket queues, no retelling your story every time you ring.' },
    { icon: 'flaticon-price-tag', title: 'Transparent Pricing', subtitle: 'No hidden costs. No surprises.', body: "Everything defined upfront, in writing. What's in your proposal is exactly what you pay. No hidden fees, no sneaky extras, no nasty surprises. Ever." },
    { icon: 'flaticon-trophy', title: 'Built for SMEs', subtitle: 'Marketing that grows with your business.', body: '45+ years of combined experience, 5,000+ campaigns delivered, 1,500+ businesses. That track record shows up in every campaign we run for you.' },
  ];

  // Home page nodes: attach the live Google rating to the sitewide Organization
  // (by @id) and describe the page itself. The full Organization + WebSite nodes
  // come from the root layout.
  const homeSchema = [
    {
      '@type': 'ProfessionalService',
      '@id': ORG_ID,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(googleRating.rating),
        reviewCount: String(googleRating.count),
      },
    },
    webPageSchema({
      path: '/',
      name: 'Shopa Marketing | Your Go-To Marketing Company for SMEs',
      description:
        'Award-winning digital marketing agency helping Australian and New Zealand SMEs grow through SEO, social media, Google Ads and more.',
    }),
  ];

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


  return (
    <>
      {/* Preload the hero poster (mobile LCP) so it's decoded and ready the
          instant the preloader overlay lifts — no effect on quality. */}
      <link rel="preload" as="image" href="/assets/img/hero/hero-poster-v5.webp" />

      <TemplateScripts />

      <JsonLd graph={homeSchema} />

      {/* preloader */}
      <div id="preloader">
        <div className="loader_line"></div>
      </div>

      {/* ── HERO SCROLL CONTAINER — tall so sticky panel scrubs the video ── */}
      <div id="hero-section" style={{ height: '250vh' }}>
        <div
          className="chy-hero-1-area chy-class-add fix"
          style={{ position: 'sticky', top: 0, height: '100vh', background: 'transparent', overflow: 'hidden', zIndex: 10 }}
        >
          {/* Video — scrubbed by scroll, not autoplay. src is set in JS (HeroVideoScrub)
              after the file is fully fetched as a blob, so this element never triggers
              its own network request — avoids downloading the file twice. */}
          <video
            id="hero-bg-video"
            muted
            playsInline
            preload="none"
            poster="/assets/img/hero/hero-poster-v5.webp"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'right center',
              zIndex: 0,
            }}
          />

          {/* Left fade — text readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '55%',
            height: '100%',
            background: 'linear-gradient(to right, #ffffff 55%, transparent 100%)',
            zIndex: 1,
          }} />


          <div className="container chy-container-1" style={{ position: 'relative', zIndex: 2 }}>
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="chy-hero-1-content">
                  <h5 className="chy-subtitle-1 subtitle wow fadeInLeft" data-wow-duration="3s">Marketing Without the Marketing Headaches.</h5>
                  <h1 className="chy-heading-1 title chy-split-in-hero-1 chy-split-text-2">You Run the Business. <br /> We&apos;ll Bring the Spotlight.</h1>
                  <p className="chy-para-1 disc wow fadeInLeft" data-wow-duration="3s">
                    Being brilliant at what you do is your job. Making sure people know about it is ours. Your customers don&apos;t discover businesses in just one place anymore. They search, scroll, drive past billboards, visit shopping centres, browse social media and ask Google for recommendations. That&apos;s why we don&apos;t think in channels.
                    <br /><br />
                    <span style={{ fontWeight: 700 }}>One team. One plan. Marketing that actually works together.</span>
                  </p>
                  <div className="btn-wrap">
                    <a href="/contact-us" className="chy-pr-btn-1 wow fadeInLeft" data-wow-delay=".5s" data-wow-duration="3s">
                      <span className="text">Book a Strategy Call</span>
                      <span className="icon"><i className="fa-solid fa-right-long"></i></span>
                    </a>
                  </div>

                  {/* ── AS FEATURED IN ── */}
                  <div className="featured-in-strip wow fadeInLeft" data-wow-delay=".7s" data-wow-duration="3s">
                    <span className="featured-in-label">As Featured In</span>
                    <div className="featured-in-logos">
                      <a
                        className="logo-pill"
                        href="https://ceoweekly.com/making-marketing-human-again-how-one-founder-is-reshaping-sme-advertising-across-australia-and-new-zealand/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Read the Shopa Marketing feature in CEO Weekly"
                      >
                        <img src="/assets/img/press/ceo-weekly.webp" alt="CEO Weekly" />
                      </a>
                      <a
                        className="featured-in-logo-slot"
                        href="https://markets.businessinsider.com/news/stocks/shopa-marketing-introduces-a-new-multi-platform-advertising-model-designed-exclusively-for-smes-across-australia-and-new-zealand-1035614816"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Read the Shopa Marketing feature on Business Insider"
                      >
                        <img src="/assets/img/press/business-insider.png" alt="Business Insider" />
                      </a>
                      <a
                        className="featured-in-logo-slot"
                        href="https://theguardian.com.au/recommended/partner-content/2026/03/06/growing-with-purpose-shopa-marketings-strengthened-position-in-new-zealand/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Read the Shopa Marketing feature in The Guardian"
                      >
                        <img src="/assets/img/press/the-guardian.webp" alt="The Guardian" />
                      </a>
                      <a
                        className="featured-in-logo-slot"
                        href="https://apnews.com/press-release/marketersmedia/shopa-marketing-strengthens-position-as-go-to-advertising-partner-for-smes-across-australia-and-new-zealand-86c3162d8575a96ebff6b5981d7fb529"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Read the Shopa Marketing press release on AP News"
                      >
                        <img src="/assets/img/press/ap.png" alt="Associated Press" />
                      </a>
                      <a
                        className="featured-in-logo-slot"
                        href="https://www.theamericanreporter.com/2026/07/04/why-this-global-founder-thinks-modern-business-has-forgotten-its-people/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Read the Shopa Marketing feature in The American Reporter"
                      >
                        <img src="/assets/img/press/the-american-reporter-v2.svg" alt="The American Reporter" />
                      </a>
                      <a
                        className="featured-in-logo-slot"
                        href="https://usinsider.com/preeti-kennedy-is-redefining-what-modern-ambition-looks-like/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Read the Preeti Kennedy feature in US Insider"
                      >
                        <img src="/assets/img/press/us-insider.svg" alt="US Insider" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right col intentionally empty — character shows through video */}
              <div className="col-lg-4" />
            </div>
          </div>
        </div>
      </div>
      <HeroVideoScrub />
      <StarAnimationTrigger />

      {/* ── BODY BG 1 ── */}
      <div className="body-bg-1 bg-default">

        {/* ── TRUSTED ── */}
        <div className="chy-trusted-1-area" style={{ marginTop: '80px' }}>
          <div className="container chy-container-1">
            <div className="chy-trusted-1-wrap">

              <div className="chy-trusted-1-item">
                <h3 className="chy-trusted-1-title chy-heading-1">
                  The Numbers Behind the Marketing.
                </h3>
              </div>

              <div className="chy-trusted-1-item">
                <div className="chy-trusted-1-progress">
                  <h4 className="chy-heading-1 title">Businesses Supported</h4>
                  <span className="line"></span>
                  <h3 className="chy-heading-1 number">1,500+</h3>
                </div>
              </div>

              <div className="chy-trusted-1-item">
                <div className="chy-trusted-1-reating">
                  {/* Google branding row */}
                  <div className="google-review-brand">
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="google-review-label">Google Rating</span>
                  </div>
                  {/* Rating value blended with animated stars */}
                  <div id="animated-stars" className="icon animated-stars">
                    <span className="rating-value">{googleRating.rating}</span>
                    <i className="fa-solid fa-star star-1"></i>
                    <i className="fa-solid fa-star star-2"></i>
                    <i className="fa-solid fa-star star-3"></i>
                    <i className="fa-solid fa-star star-4"></i>
                    <i className="fa-solid fa-star star-5"></i>
                  </div>
                  <span className="line"></span>
                  <h4 className="chy-heading-1 text">{googleRating.count} Verified Reviews</h4>
                </div>
              </div>

              <div className="chy-trusted-1-item">
                <div className="chy-trusted-1-progress">
                  <h4 className="chy-heading-1 title">Campaigns Managed</h4>
                  <span className="line"></span>
                  <h3 className="chy-heading-1 number">5,000+</h3>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── SERVICES — Infinite Scroll Ticker ── */}
        <div className="svc-opt-section pt-120 pb-80 fix">
          <div className="container chy-container-1">
            <div className="section-title-wrap text-center mb-50">
              <h5 className="chy-subtitle-1">what we offer</h5>
              <h2 className="chy-title-1 chy-split-in-right chy-split-text">From Google to Grocery Stores. We&apos;ve Got You Covered.</h2>
              <p className="chy-section-para-1" style={{ maxWidth: '680px', margin: '16px auto 0' }}>
                Your customers don&apos;t live on one channel, so why would your marketing? Search engines, social feeds, shopping centre screens and everywhere in between: we cover every path your customers take, with no gaps, no guesswork and nothing left to chance.
              </p>
            </div>
          </div>
          <ServicesTicker services={homeServices} />
        </div>

        {/* ── SOLUTIONS ── */}
        <div className="chy-solutions-1-area pt-120 pb-120 fix" style={{ paddingTop: '80px', paddingBottom: '150px' }}>
          <div className="container chy-container-1">
            <div className="row align-items-center">

              <div className="col-xl-5 col-lg-6">
                <div className="chy-solutions-1-content">
                  <div className="section-title-wrap mb-35">
                    <h5 className="chy-subtitle-1 wow fadeInLeft">why choose us</h5>
                    <h2 className="chy-title-1 has-55 chy-split-in-right chy-split-text">
                      Marketing That Works as Hard as You Do.
                    </h2>
                    <p className="chy-section-para-1 wow fadeInLeft">
                      Marketing isn&apos;t about doing more. It&apos;s about doing the right things, in the right places, consistently.
                      <br /><br />
                      That&apos;s why we don&apos;t sell disconnected marketing services. We build strategies that bring every channel together, so your website, social media, Google Ads, SEO and offline marketing all work towards the same goal: growing your business.
                      <br /><br />
                      Less guesswork. More momentum.
                    </p>
                  </div>
                  <a href="/about-us" className="chy-pr-btn-1 wow fadeInLeft">
                    <span className="text">Meet the Team</span>
                    <span className="icon"><i className="fa-solid fa-right-long"></i></span>
                  </a>
                </div>
              </div>

              <div className="col-xl-7 col-lg-6">
                <div className="chy-solutions-1-img">
                  <div className="main-img rotatedscal">
                    <img src="/assets/img/solutions/SM_HOME2.webp" alt="" loading="lazy" />
                  </div>
                  <div className="chy-solutions-1-goals" style={{ left: '20px', bottom: '-60px' }}>
                    <h5 className="chy-heading-1 title">Results</h5>
                    <div className="chy-solutions-1-goals-item">
                      <div className="icon"><i className="flaticon-digital-campaign"></i></div>
                      <div className="content-wrap">
                        <h4 className="chy-heading-1 number">90%</h4>
                        <p className="chy-para-1 disc">Team Retention Rate</p>
                      </div>
                    </div>
                    <div className="chy-solutions-1-goals-item has-bg">
                      <div className="icon"><i className="flaticon-email"></i></div>
                      <div className="content-wrap">
                        <h4 className="chy-heading-1 number">5,000+</h4>
                        <p className="chy-para-1 disc">Campaigns Run</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


      </div>{/* /body-bg-1 */}

      {/* ── WHY SHOPA MARKETING — Floating 3D Cards ── */}
      <section className="shopa-floating-section">
        <FloatingCardsGSAP />

        {/* Scrolling background text */}
        <div className="shopa-floating-scrolltext" aria-hidden="true">
          <div className="shopa-floating-scrolltext__track">
            <span>Why Shopa Marketing &nbsp;·&nbsp; Why Shopa Marketing &nbsp;·&nbsp; Why Shopa Marketing &nbsp;·&nbsp; Why Shopa Marketing &nbsp;·&nbsp;</span>
            <span aria-hidden="true">Why Shopa Marketing &nbsp;·&nbsp; Why Shopa Marketing &nbsp;·&nbsp; Why Shopa Marketing &nbsp;·&nbsp; Why Shopa Marketing &nbsp;·&nbsp;</span>
          </div>
        </div>

        <div className="container chy-container-1">
          <div className="shopa-floating-layout">

            {/* Left: sticky section title */}
            <div className="shopa-floating-sticky-col">
              <h5 className="chy-subtitle-1">why shopa marketing</h5>
              <h2 className="chy-title-1" style={{ marginTop: '12px' }}>Marketing Works Better When It Works Together.</h2>
              <p className="chy-section-para-1" style={{ marginTop: '16px' }}>
                Most businesses don&apos;t need more marketing. They need marketing that works together.
                <br /><br />
                At Shopa Marketing, one dedicated team manages your marketing under a single strategy. Your website, SEO, Google Ads, social media and offline campaigns all work towards the same goal instead of pulling in different directions.
                <br /><br />
                No fragmented agencies. No conflicting advice. Just marketing with a clear direction.
              </p>
            </div>

            {/* Right: 4 floating 3D cards */}
            <div className="shopa-floating-cards-col">
              {whyItems.map((item, i) => (
                <div key={item.title} className={`shopa-floating-holder shopa-floating-holder--${i + 1}`}>
                  <div className="shopa-floating-card">
                    {/* Icon — fixed top-right */}
                    <div className="shopa-floating-card__icon">
                      <i className={item.icon}></i>
                    </div>
                    {/* Title — sits at card bottom, slides up on hover */}
                    <div className="shopa-floating-card__heading">
                      <h4 className="shopa-floating-card__title">{item.title}</h4>
                      <p className="shopa-floating-card__subtitle">{item.subtitle}</p>
                    </div>
                    {/* Body — slides in from below on hover */}
                    <div className="shopa-floating-card__body">
                      <p>{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ── BODY BG 2 ── */}
      <div className="body-bg-2 bg-default">

        {/* ── TESTIMONIALS — masonry review wall ── */}
        <ServiceTestimonials extra={homeExtraTestimonials} />

        {/* ── CLIENTS ── */}
        <div className="shopa-clients-area pt-60 pb-80 fix">
          <div className="container chy-container-1">
            <div className="section-title-wrap text-center mb-50">
              <h5 className="chy-subtitle-1 wow fadeInDown">our clients</h5>
              <h2 className="chy-title-1 chy-split-in-right chy-split-text">Trusted by Businesses Big and Small</h2>
              <p className="chy-section-para-1 wow fadeInUp" style={{ maxWidth: '560px', margin: '14px auto 0' }}>
                From local businesses to nationally recognised brands, we&apos;re proud to be part of their growth journey.
              </p>
            </div>
          </div>
          {/* infinite scroll ticker — doubled for seamless loop */}
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

      </div>{/* /body-bg-2 */}

      {/* ── VIDEO — HIDDEN ── */}
      {/* Suggestion: Brand video or client reel when available. */}

      {/* ── CTA — HIDDEN ── */}
      

      {/* ── BLOG ── */}
      <div className="chy-blog-1-area pt-110 pb-70 bg-default fix">
        <div className="container chy-container-1">
          <div className="section-title-wrap text-center mb-30">
            <h5 className="chy-subtitle-1 wow fadeInDown">our blog</h5>
            <h2 className="chy-title-1 chy-split-in-right chy-split-text">Fresh Thinking</h2>
            <p className="chy-section-para-1 wow fadeInUp" style={{ maxWidth: '620px', margin: '14px auto 0' }}>
              Marketing moves fast. Here&apos;s what our team is seeing, testing and recommending right now.
            </p>
          </div>
          <div className="row">
            {latestPosts.map((post) => (
              <div key={post.id} className="col-xl-4 col-lg-6 col-md-6">
                <div className="chy-blog-1-item">
                  <div className="main-img img-cover">
                    <img src={featuredImage(post)} alt={post.title.rendered} loading="lazy" />
                  </div>
                  <span className="chy-para-1 date">{formatDate(post.date)}</span>
                  <h4 className="chy-heading-1 title">
                    <a href={`/blog/${post.slug}`} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  </h4>
                  <p className="chy-para-1 disc"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 120) + '…' }}
                  />
                  <div className="author">
                    <span className="chy-heading-1 name">by {post._embedded?.author?.[0]?.name ?? 'Shopa Marketing'}</span>
                    <span className="line"></span>
                  </div>
                </div>
              </div>
            ))}
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
