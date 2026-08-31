const WP_BASE = 'https://blog.shopamarketing.com.au/wp-json/wp/v2';

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      media_details: { sizes: Record<string, { source_url: string }> };
    }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
    author?: Array<{ name: string; avatar_urls?: Record<string, string> }>;
  };
}

function featuredImage(post: WPPost): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  return (
    media?.media_details?.sizes?.large?.source_url ??
    media?.source_url ??
    '/assets/img/blog/b1-img-1.png'
  );
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').trim();
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export interface PostsPage {
  posts: WPPost[];
  total: number;
  totalPages: number;
}

export async function getPosts(perPage = 9): Promise<WPPost[]> {
  const res = await fetch(
    `${WP_BASE}/posts?per_page=${perPage}&_embed=wp:featuredmedia,wp:term,author&_fields=id,slug,date,title,excerpt,featured_media,categories,tags,_links,_embedded`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export async function getPostsPaged(page = 1, perPage = 8, search = '', categoryId?: number): Promise<PostsPage> {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    _embed: 'wp:featuredmedia,wp:term,author',
    _fields: 'id,slug,date,title,excerpt,featured_media,categories,tags,_links,_embedded',
  });
  if (search) params.set('search', search);
  if (categoryId) params.set('categories', String(categoryId));

  const res = await fetch(`${WP_BASE}/posts?${params}`, {
    next: { revalidate: search || categoryId ? 0 : 3600 },
  });
  if (!res.ok) return { posts: [], total: 0, totalPages: 0 };
  const posts: WPPost[] = await res.json();
  const total = parseInt(res.headers.get('X-WP-Total') ?? '0', 10);
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10);
  return { posts, total, totalPages };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPTag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export async function getTags(): Promise<WPTag[]> {
  const res = await fetch(
    `${WP_BASE}/tags?per_page=30&hide_empty=true&_fields=id,name,slug,count`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const tags: WPTag[] = await res.json();
  return tags.sort((a, b) => b.count - a.count);
}

export async function getCategories(): Promise<WPCategory[]> {
  const res = await fetch(
    `${WP_BASE}/categories?per_page=20&hide_empty=true&_fields=id,name,slug,count`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const cats: WPCategory[] = await res.json();
  return cats.filter((c) => c.slug !== 'uncategorized').sort((a, b) => b.count - a.count);
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const res = await fetch(
    `${WP_BASE}/posts?slug=${slug}&_embed=wp:featuredmedia,wp:term,author`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  const posts: WPPost[] = await res.json();
  return posts[0] ?? null;
}

// The WordPress blog links to main-site pages using its own subdomain
// (blog.shopamarketing.com.au/seo-services/), where those pages do not exist and
// return 404. Post bodies are rendered verbatim on shopamarketing.com.au/blog/*,
// so the 404s surface here too. Rewrite them to the live main-site URLs.
const BLOG_ORIGIN = 'https://blog.shopamarketing.com.au';

const BLOG_PATH_MAP: Record<string, string> = {
  '/': '/',
  '/services/': '/services',
  '/seo-services/': '/services/seo-services',
  '/social-media/': '/services/social-media',
  '/google-ads/': '/services/google-ads',
  '/website/': '/services/website',
  '/graphic-design/': '/services/graphic-design',
  '/ooh-advertising/': '/services/ooh-advertising',
  '/done-for-you/': '/services/done-for-you',
  '/contact-us/': '/contact-us',
  '/about-us/': '/about-us',
  '/privacy-policy/': '/privacy-policy',
  '/terms-of-service/': '/terms-of-service',
  // Retired OOH landing pages, folded into the OOH service page.
  '/shopping-centre-ads/': '/services/ooh-advertising',
  '/grocery-store-ads/': '/services/ooh-advertising',
  '/print-and-digital-screens/': '/services/ooh-advertising',
  '/cmo-for-hire/': '/services/done-for-you',
  '/email-campaigns/': '/services/done-for-you',
};

export function rewriteBlogLinks(html: string): string {
  return html.replace(
    new RegExp(`href="${BLOG_ORIGIN}([^"]*)"`, 'g'),
    (match, rest: string) => {
      // Media stays on the WordPress origin.
      if (rest.startsWith('/wp-content/')) return match;

      // The origin may be followed by nothing, or by ?query / #hash with no path.
      const [pathAndQuery = '', hash = ''] = rest.split('#');
      const [rawPath = '', query = ''] = pathAndQuery.split('?');
      const suffix = `${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;

      const withSlash = rawPath.endsWith('/') ? rawPath : `${rawPath}/`;
      const mapped = BLOG_PATH_MAP[withSlash];
      if (mapped) return `href="${mapped}${suffix}"`;

      // Anything else is a post permalink; it lives under /blog on this site.
      const slug = withSlash.replace(/^\/|\/$/g, '');
      return slug ? `href="/blog/${slug}${suffix}"` : `href="/blog${suffix}"`;
    }
  );
}

export function authorAvatar(post: WPPost): string {
  const author = post._embedded?.author?.[0];
  return (
    author?.avatar_urls?.['96'] ??
    author?.avatar_urls?.['48'] ??
    '/assets/img/blog/b1-author-1.png'
  );
}

export { featuredImage, stripHtml };
