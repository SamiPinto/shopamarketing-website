/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  async redirects() {
    return [
      // Temporary: /case-studies is a stub with no content. Point visitors to
      // the homepage until the page is rebuilt. Keep as temporary (307) so the
      // URL stays indexed for the rebuild — do NOT change to 301.
      { source: '/case-studies', destination: '/', permanent: false },
      // Old WordPress sitemap URL still referenced by Google/Search Console.
      // Point it at the current Next.js sitemap so it stops returning a 404.
      { source: '/sitemap_index.xml', destination: '/sitemap.xml', statusCode: 301 },
      { source: '/social-media', destination: '/services/social-media', statusCode: 301 },
      { source: '/google-ads', destination: '/services/google-ads', statusCode: 301 },
      { source: '/seo-services', destination: '/services/seo-services', statusCode: 301 },
      { source: '/website', destination: '/services/website', statusCode: 301 },
      { source: '/graphic-design', destination: '/services/graphic-design', statusCode: 301 },
      { source: '/ooh-advertising', destination: '/services/ooh-advertising', statusCode: 301 },
      { source: '/done-for-you', destination: '/services/done-for-you', statusCode: 301 },
      { source: '/print-and-digital-screens', destination: '/services/ooh-advertising', statusCode: 301 },
      { source: '/grocery-store-ads', destination: '/services/ooh-advertising', statusCode: 301 },
      { source: '/shopping-centre-ads', destination: '/services/ooh-advertising', statusCode: 301 },
      { source: '/cmo-for-hire', destination: '/services/done-for-you', statusCode: 301 },
      { source: '/email-campaigns', destination: '/services/done-for-you', statusCode: 301 },
      { source: '/privacy-policy-2', destination: '/privacy-policy', statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        // Long-lived cache for versioned static assets (CSS, JS, images, fonts)
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Logos and other public images
        source: '/:file(.*\\.(?:webp|png|jpg|jpeg|gif|svg|ico|woff|woff2))',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
