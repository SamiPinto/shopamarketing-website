import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import localFont from "next/font/local";
import { TrackingHead, TrackingNoscript } from "@/components/landing/Tracking";

const urbanist = Urbanist({ variable: "--font-urbanist", subsets: ["latin"] });
const geistMono = localFont({ src: "../fonts/GeistMonoVF.woff", variable: "--font-geist-mono", weight: "100 900" });

export const metadata: Metadata = {
  metadataBase: new URL("https://shopamarketing.com.au"),
  icons: { icon: "/lp/ooh/favicon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#100922" };

// Styles are Tailwind 4, compiled to a static file (npm run build:ooh-css) because the
// main site runs Tailwind 3. Re-run that script after changing any OOH class names.
export default function OohLandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${urbanist.variable} ${geistMono.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/lp/ooh/ooh.css" />
      </head>
      <body>
        <TrackingNoscript />
        <TrackingHead />
        {children}
      </body>
    </html>
  );
}
