import type { Metadata } from "next";
import Thanks from "@/components/landing/seo/ThankYouPage";

export const metadata: Metadata = {
  title: "Thanks — Your SEO Strategy Call | Shopa Marketing",
  description: "Thanks for booking your free SEO strategy call with Shopa Marketing. Here's what happens next.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Thanks />;
}
