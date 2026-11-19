import type { Metadata } from "next";
import { ThankYouPage } from "@/components/landing/ooh/ThankYouPage";

export const metadata: Metadata = {
  title: "Thanks — we’re checking your postcode | Shopa Marketing",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ThankYouPage />;
}
