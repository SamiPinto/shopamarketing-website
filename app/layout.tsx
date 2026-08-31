import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DeferredStyles from "@/components/DeferredStyles";
import ScrollToTop from "@/components/ScrollToTop";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  // Resolves relative OG/Twitter image URLs (from app/opengraph-image.tsx and
  // app/twitter-image.tsx) to absolute — social scrapers require absolute URLs.
  metadataBase: new URL("https://shopamarketing.com.au"),
  // Self-referencing canonical for every page. Next resolves the relative "./"
  // against each page's own pathname, so /about-us gets .../about-us, etc.
  // Pages with their own metadata inherit this unless they set their own.
  alternates: {
    canonical: "./",
  },
  title: "Shopa Marketing — Your Go-To Marketing Company for SMEs",
  description:
    "Shopa Marketing is an award-winning digital marketing agency based in Melbourne, Australia, helping SMEs grow through SEO, Social Media, Google Ads, and more.",
  // app/icon.png and app/apple-icon.png are auto-detected by Next.js App Router.
  // The explicit entry below ensures the PNG favicon also loads for older browsers.
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  // Site-wide Open Graph / Twitter defaults. title & description are intentionally
  // omitted so each page's own title/description flow through (Next fills og:title /
  // og:description from the page metadata). The default share image comes from
  // app/opengraph-image.tsx & app/twitter-image.tsx; per-page pages (e.g. blog posts)
  // can still override any of these.
  openGraph: {
    type: "website",
    siteName: "Shopa Marketing",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect hints — establish connections early for deferred font load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload the two variable-font files (latin) so the swap from the
            fallback font happens right after first paint — a late swap
            re-renders the hero text and drags LCP. URLs are version-pinned;
            if Google bumps v31/v18 these become no-ops, not errors. */}
        <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="https://fonts.gstatic.com/s/montserrat/v31/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2" />
        <link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href="https://fonts.gstatic.com/s/urbanist/v18/L0x-DF02iFML4hGCyMqlbS1miXK2.woff2" />
        {/* Critical CSS — blocks render but needed for above-fold styles + WOW.js keyframes */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        {/* all.min.css (Font Awesome), flaticon_choicy, swiper, odometer,
            magnific-popup and Google Fonts load non-blocking via DeferredStyles */}
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        {/* Google Tag Manager (noscript) — must be the first thing in <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PNPQ4RJG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Google Tag Manager. afterInteractive keeps the loader off the critical
            path; GTM still records the pageview because dataLayer is queued. */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PNPQ4RJG');`}
        </Script>
        <DeferredStyles />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
