import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/wordpress";

const BASE = "https://shopamarketing.com.au";

// Refresh hourly so newly published blog posts appear without a redeploy.
export const revalidate = 3600;

// Indexable static routes only. Intentionally excluded:
//   /case-studies  — 307-redirects to home until rebuilt (see next.config.mjs)
//   /unsubscribe   — transactional utility page, no search value
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about-us", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/social-media", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/google-ads", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/seo-services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/website", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/graphic-design", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/ooh-advertising", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/done-for-you", priority: 0.8, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "daily" },
  { path: "/contact-us", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // getPosts returns [] if the WordPress API is unreachable, so a blog outage
  // degrades to a still-valid sitemap of the static pages rather than a 500.
  const posts = await getPosts(100);
  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
