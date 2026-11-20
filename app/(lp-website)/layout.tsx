import type { Metadata, Viewport } from "next";
import "@fontsource-variable/urbanist";
import "@/components/landing/website/global.css";
import "@/components/landing/website/v3.css";
import { TrackingHead, TrackingNoscript } from "@/components/landing/Tracking";

export const metadata: Metadata = {
  metadataBase: new URL("https://shopamarketing.com.au"),
  icons: { icon: "/lp/website/favicon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#100922" };

export default function WebsiteLandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preload" as="image" href="/lp/website/logo-white.webp" type="image/webp" />
      </head>
      <body>
        <TrackingNoscript />
        <TrackingHead />
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
