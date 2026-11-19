import type { Metadata } from "next";
import App from "@/components/landing/seo/App";

const title = "SEO & AI SEO Agency Australia | Shopa Marketing";
const description =
  "Get found on Google, Google Maps and AI search. Shopa Marketing is an Australian SEO agency for growing businesses. Book a free SEO strategy call.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: "/seo-offer" },
  openGraph: {
    title,
    description,
    url: "/seo-offer",
    siteName: "Shopa Marketing",
    locale: "en_AU",
    type: "website",
    images: [{ url: "https://shopamarketing.com.au/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return (
    <>
      <App />
      <noscript>
        <p style={{ padding: 24, fontFamily: "sans-serif" }}>
          Call Shopa Marketing on <a href="tel:1800247034">1800 247 034</a> to book your free SEO strategy call.
        </p>
      </noscript>
    </>
  );
}
