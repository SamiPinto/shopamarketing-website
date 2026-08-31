import TemplateScripts from "@/components/TemplateScripts";
import BlogSearch from "@/components/blog/BlogSearch";
import BlogHeroCounters from "@/components/BlogHeroCounters";
import { getPostsPaged, getCategories } from "@/lib/wordpress";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Marketing Blog for Australian SMEs | Shopa Marketing',
  description:
    'Practical marketing advice for Australian and New Zealand small businesses — SEO, paid ads, social media, websites and OOH, without the jargon.',
};

export const revalidate = 3600;

const PER_PAGE = 8;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; cat?: string };
}) {
  const currentPage = Math.max(1, parseInt(searchParams.page ?? '1', 10));
  const activeCatId = searchParams.cat ? parseInt(searchParams.cat, 10) : undefined;

  const [{ posts, totalPages }, categories] = await Promise.all([
    getPostsPaged(currentPage, PER_PAGE, '', activeCatId),
    getCategories(),
  ]);

  return (
    <>
      <TemplateScripts />
      <BlogHeroCounters businesses={1500} campaigns={5000} />

      {/* preloader */}
      <div id="preloader">
        <div className="loader_line"></div>
      </div>

      {/* ── BLOG HERO ── */}
      <section className="blog-hero">
        <div className="container chy-container-1">
          <div className="blog-hero__inner">

            <h1 className="chy-title-1 blog-hero__headline wow fadeInLeft" data-wow-duration="1.2s">
              Marketing That Makes <br />More Sense.
            </h1>

            <p className="blog-hero__sub wow fadeInUp" data-wow-duration="2s">
              Practical marketing insights, real campaign learnings and straightforward advice from the team behind more than 5,000 campaigns. No fluff. No buzzwords. Just ideas that help businesses grow.
            </p>

            {/* Stats strip */}
            <div className="blog-hero__stats blog-hero__stats--animate">
              <div className="blog-hero__stat">
                <span className="blog-hero__stat-num"><span id="blog-hero-counter-1">0</span>+</span>
                <span className="blog-hero__stat-label">Businesses Supported</span>
              </div>
              <div className="blog-hero__stat-divider" />
              <div className="blog-hero__stat">
                <span className="blog-hero__stat-num"><span id="blog-hero-counter-2">0</span>+</span>
                <span className="blog-hero__stat-label">Campaigns Managed</span>
              </div>
              <div className="blog-hero__stat-divider" />
              <div className="blog-hero__stat">
                <span className="blog-hero__stat-num">Real Marketing</span>
                <span className="blog-hero__stat-label">Real Business Advice</span>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* ── BLOG HERO END ── */}

      {/* blog-start */}
      <div className="blog-page-2-area pt-120 pb-70">
        <div className="container chy-container-1">
          <div className="row">

            {/* left — live search + post grid + pagination (client component) */}
            <BlogSearch
              initialPosts={posts}
              totalPages={totalPages}
              currentPage={currentPage}
              activeCategoryName={activeCatId ? categories.find(c => c.id === activeCatId)?.name : undefined}
            />

            {/* sidebar */}
            <div className="col-xxl-4 col-xl-4 col-lg-4">
              <div className="blog-2-page-sidebar mb-50">

                {/* categories — live from WordPress */}
                <div className="sidebar-box mb-30 wow fadeInUp">
                  <h4 className="sidebar-box-title chy-heading-1">Categories</h4>
                  <div className="sidebar-box-wrap">
                    <ul className="sidebar-category has-number">
                      <li>
                        <a href="/blog" style={!activeCatId ? { color: 'var(--primary)', fontWeight: 700 } : {}}>
                          <span className="text">All Posts</span>
                          <span className="number">
                            {categories.reduce((sum, c) => sum + c.count, 0)}
                          </span>
                        </a>
                      </li>
                      {categories.map((cat) => (
                        <li key={cat.id} className="wow fadeInUp">
                          <a
                            href={`/blog?cat=${cat.id}`}
                            style={activeCatId === cat.id ? { color: 'var(--primary)', fontWeight: 700 } : {}}
                          >
                            <span className="text">{cat.name}</span>
                            <span className="number">{String(cat.count).padStart(2, '0')}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      {/* blog-end */}

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
