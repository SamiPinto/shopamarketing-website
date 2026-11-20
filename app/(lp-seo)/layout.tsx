import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat/wght.css";
import "@fontsource-variable/urbanist/wght.css";
import "@/components/landing/seo/styles.css";
import { TrackingHead, TrackingNoscript } from "@/components/landing/Tracking";

export const metadata: Metadata = {
  metadataBase: new URL("https://shopamarketing.com.au"),
  icons: { icon: "/lp/seo/favicon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0f0926" };

export default function SeoLandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="preload" as="image" href="/lp/seo/logo-white.webp" type="image/webp" />
      </head>
      <body>
        <TrackingNoscript />
        <TrackingHead />
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
