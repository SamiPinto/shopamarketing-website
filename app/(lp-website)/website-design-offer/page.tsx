import type { Metadata } from "next";
import Landing from "@/components/landing/website/Landing";

export const metadata: Metadata = {
  title: "Custom Websites for Australian Businesses | Shopa Marketing",
  description:
    "Custom websites built around how your customers decide. Fixed price in writing & a lifetime warranty on technical issues. Book a call.",
  alternates: { canonical: "/website-design-offer" },
  openGraph: {
    title: "Custom websites for Australian businesses | Shopa Marketing",
    description: "AI can build a website in ten minutes. Your customers judge it in five seconds. Get your free Website Leak Report.",
    url: "/website-design-offer",
    siteName: "Shopa Marketing",
    locale: "en_AU",
    type: "website",
    images: ["https://shopamarketing.com.au/logo-main.webp"],
  },
};

export default function Page() {
  return <Landing />;
}
