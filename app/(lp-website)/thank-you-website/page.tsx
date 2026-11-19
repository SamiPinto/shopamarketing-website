import type { Metadata } from "next";
import ThankYou from "@/components/landing/website/ThankYou";

export const metadata: Metadata = {
  title: "Thanks — Your Website Leak Report | Shopa Marketing",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ThankYou />;
}
