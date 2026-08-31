import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TemplateScripts from "@/components/TemplateScripts";
import { getPostBySlug, getPosts, getCategories, getTags, featuredImage, stripHtml, formatDate, rewriteBlogLinks } from "@/lib/wordpress";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts(20);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const title = stripHtml(post.title.rendered);
  const description = stripHtml(post.excerpt.rendered).slice(0, 160);
  const image = featuredImage(post);
  return {
    title: `${title} | Shopa Marketing`,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, recentPosts, categories, tags] = await Promise.all([
    getPostBySlug(params.slug),
    getPosts(4),
    getCategories(),
    getTags(),
  ]);

  if (!post) notFound();

  const author = post._embedded?.author?.[0]?.name ?? 'Shopa Marketing';
  const heroImg = featuredImage(post);
  const postCategories = post._embedded?.['wp:term']?.[0] ?? [];

  return (
    <>
      <TemplateScripts />

      {/* preloader */}
      <div id="preloader">
        <div className="loader_line"></div>
      </div>

      {/* ── POST HERO ── */}
      <section className="post-hero">
        <div className="container chy-container-1">
          <div className="post-hero__inner">
            <a href="/blog" className="post-hero__trail wow fadeInDown">
              <i className="fa-solid fa-left-long"></i> All Articles
            </a>
            <h1 className="post-hero__title wow fadeInLeft" data-wow-duration="1.2s"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <div className="post-hero__meta wow fadeInUp">
              <span><i className="fa-regular fa-calendar"></i> {formatDate(post.date)}</span>
              <span>by {post._embedded?.author?.[0]?.name ?? 'Shopa Marketing'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* blog-details-start */}
      <div className="blog-details-area pt-120 pb-70 fix">
        <div className="container chy-container-1">
          <div className="row">

            {/* left content */}
            <div className="col-xxl-8 col-xl-8 col-lg-8">
              <div className="blog-details-content">

                {/* hero image */}
                <div className="main-img img-cover">
                  <img src={heroImg} alt={stripHtml(post.title.rendered)} />
                </div>

                {/* meta */}
                <div className="blog-details-content-meta">
                  <span className="author chy-para-1"><i className="flaticon-user"></i>{author}</span>
                  <span className="author chy-para-1"><i className="flaticon-chat"></i>comments(0)</span>
                  <span className="author chy-para-1"><i className="flaticon-calendar"></i>{formatDate(post.date)}</span>
                </div>

                <h2
                  className="chy-heading-1 title chy-split-in-right chy-split-text"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />

                {/* WordPress post content */}
                <div
                  className="chy-para-1 blog-details-body"
                  dangerouslySetInnerHTML={{ __html: rewriteBlogLinks(post.content.rendered) }}
                />

                {/* tags + share */}
                <div className="blog-details-tag-share-wrap mb-30 mt-30">
                  <div className="blog-details-tag">
                    <h6 className="title chy-heading-1">tags:</h6>
                    {postCategories.length > 0
                      ? postCategories.map((cat) => (
                          <a key={cat.id} aria-label="category" href="#">{cat.name}</a>
                        ))
                      : tags.slice(0, 3).map((t) => (
                          <a key={t.id} aria-label="tags" href={`/blog?cat=${t.id}`}>{t.name}</a>
                        ))}
                  </div>
                  <div className="blog-details-share">
                    <h6 className="title chy-heading-1">Share Article:</h6>
                    {/* Facebook */}
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=https://shopamarketing.com.au/blog/${post.slug}`} aria-label="share on facebook" target="_blank" rel="noopener noreferrer">
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18 0C21.3526 0.0382568 24.3813 0.862213 27.0861 2.47187C29.7587 4.04939 31.9819 6.28618 33.5431 8.96835C35.143 11.6895 35.962 14.7365 36.0001 18.1095C35.9051 22.7245 34.4495 26.6662 31.6333 29.9345C28.817 33.2029 25.2101 35.2249 21.4763 36V23.0609H25.0063L25.8046 17.9762H20.4593V14.6458C20.4296 13.9554 20.648 13.2771 21.0749 12.7337C21.5023 12.1888 22.2551 11.9023 23.3332 11.8744H26.561V7.42031C26.5147 7.40541 26.0753 7.34649 25.2426 7.24354C24.2983 7.13306 23.3488 7.07404 22.3981 7.06676C20.2463 7.07669 18.5446 7.68365 17.2929 8.88764C16.0411 10.0913 15.4017 11.8327 15.3746 14.1119V17.9762H11.3068V23.0609H15.3746V36C10.79 35.2249 7.18304 33.2029 4.36681 29.9345C1.55058 26.6662 0.0950269 22.7245 0 18.1095C0.0380195 14.7364 0.856995 11.6893 2.45693 8.96835C4.01815 6.28618 6.24136 4.04939 8.91397 2.47187C11.6187 0.862523 14.6474 0.0385667 18 0Z" fill="#3A5897"/>
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://shopamarketing.com.au/blog/${post.slug}`} aria-label="share on linkedin" target="_blank" rel="noopener noreferrer">
                      <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_68_1252)">
                          <path d="M18.7109 0C15.1509 0 11.6708 1.05568 8.71068 3.03355C5.7506 5.01141 3.44349 7.82263 2.08111 11.1117C0.718737 14.4008 0.362277 18.02 1.05681 21.5116C1.75134 25.0033 3.46568 28.2106 5.98302 30.7279C8.50037 33.2453 11.7077 34.9596 15.1993 35.6541C18.691 36.3487 22.3102 35.9922 25.5992 34.6298C28.8883 33.2675 31.6995 30.9603 33.6774 28.0003C35.6553 25.0402 36.7109 21.5601 36.7109 18C36.7109 13.2261 34.8145 8.64773 31.4389 5.27208C28.0632 1.89642 23.4848 0 18.7109 0ZM13.4767 27.4737H9.54989V14.8239H13.4767V27.4737ZM11.5109 13.0974C11.059 13.0992 10.6167 12.9671 10.2398 12.7176C9.86301 12.4681 9.5686 12.1125 9.39382 11.6958C9.21904 11.279 9.17174 10.8198 9.2579 10.3761C9.34406 9.93249 9.55981 9.52435 9.87788 9.2033C10.1959 8.88225 10.6021 8.66271 11.0449 8.57241C11.4877 8.48212 11.9473 8.52514 12.3657 8.69603C12.7841 8.86692 13.1424 9.158 13.3954 9.5325C13.6484 9.90699 13.7847 10.3481 13.787 10.8C13.7883 11.406 13.5496 11.9879 13.123 12.4184C12.6965 12.8489 12.1169 13.093 11.5109 13.0974ZM28.1846 27.4737H24.2602V21.3158C24.2602 19.8474 24.2317 17.9645 22.2186 17.9645C20.2054 17.9645 19.8502 19.5608 19.8502 21.2092V27.4737H15.9399V14.8239H19.708V16.5482H19.7625C20.2859 15.5534 21.5673 14.5042 23.4786 14.5042C27.4528 14.5042 28.1846 17.1237 28.1846 20.5247V27.4737Z" fill="#007BB5"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_68_1252">
                            <rect width="36" height="36" fill="white" transform="translate(0.710938)"/>
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* leave a comment form */}
                <div className="contact-form-wrap wow fadeInUp mb-50">
                  <h6 className="title chy-heading-1">leave A comment</h6>
                  <p className="text chy-para-1">Have something to say? We&apos;d love to hear from you.</p>
                  <form className="contact-form" action="#">
                    <input type="text" placeholder="your name" />
                    <input type="email" placeholder="email address" />
                    <textarea cols={30} rows={10} placeholder="Type your comment"></textarea>
                    <div className="btn-wrap">
                      <button type="submit" className="chy-pr-btn-1">
                        <span className="text">post comment</span>
                        <span className="icon"><i className="fa-solid fa-right-long"></i></span>
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </div>

            {/* sidebar */}
            <div className="col-xxl-4 col-xl-4 col-lg-4">
              <div className="blog-2-page-sidebar mb-50">



                {/* categories — live from WordPress */}
                <div className="sidebar-box mb-30 wow fadeInUp">
                  <h4 className="sidebar-box-title chy-heading-1">Categories</h4>
                  <div className="sidebar-box-wrap">
                    <ul className="sidebar-category has-number">
                      <li>
                        <a href="/blog">
                          <span className="text">All Posts</span>
                          <span className="number">
                            {categories.reduce((sum, c) => sum + c.count, 0)}
                          </span>
                        </a>
                      </li>
                      {categories.map((cat) => (
                        <li key={cat.id} className="wow fadeInUp">
                          <a href={`/blog?cat=${cat.id}`}>
                            <span className="text">{cat.name}</span>
                            <span className="number">{String(cat.count).padStart(2, '0')}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* recent posts */}
                <div className="sidebar-box mb-30 wow fadeInUp">
                  <h4 className="sidebar-box-title chy-heading-1">recent posts</h4>
                  <div className="sidebar-box-wrap">
                    <div className="latest-post-item-wrap">
                      {recentPosts.map((p) => (
                        <div key={p.id} className="latest-post-item">
                          <div className="img">
                            <a aria-label="recent post" href={`/blog/${p.slug}`}>
                              <img src={featuredImage(p)} alt=""
                                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
                            </a>
                          </div>
                          <div className="content">
                            <span className="date chy-para-1">
                              <i className="fal fa-calendar-alt"></i> {formatDate(p.date)}
                            </span>
                            <h6 className="title chy-heading-1">
                              <a aria-label="recent post" href={`/blog/${p.slug}`}
                                dangerouslySetInnerHTML={{ __html: p.title.rendered }} />
                            </h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* tags */}
                <div className="sidebar-box wow fadeInUp">
                  <h4 className="sidebar-box-title chy-heading-1">tags</h4>
                  <div className="sidebar-box-wrap">
                    <div className="sidebar-tag">
                      {tags.map((tag) => (
                        <a key={tag.id} aria-label="tags" href={`/blog?cat=${tag.id}`}>{tag.name}</a>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      {/* blog-details-end */}

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
