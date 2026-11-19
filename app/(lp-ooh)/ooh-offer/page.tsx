import type { Metadata } from "next";
import { Creative } from "@/components/landing/ooh/Creative";
import { Environments } from "@/components/landing/ooh/Environments";
import { Faq } from "@/components/landing/ooh/Faq";
import { FinalCta } from "@/components/landing/ooh/FinalCta";
import { Footer } from "@/components/landing/ooh/Footer";
import { Header } from "@/components/landing/ooh/Header";
import { Hero } from "@/components/landing/ooh/Hero";
import { LeadProvider } from "@/components/landing/ooh/LeadProvider";
import { Manifesto } from "@/components/landing/ooh/Manifesto";
import { Price } from "@/components/landing/ooh/Price";
import { Process } from "@/components/landing/ooh/Process";
import { RevealRoot } from "@/components/landing/ooh/RevealRoot";
import { StickyCta } from "@/components/landing/ooh/StickyCta";
import { Trust } from "@/components/landing/ooh/Trust";

const title = "Hyper-Local Screen Advertising Under $60/Week | Shopa Marketing";
const description =
  "Show your business on screens inside local grocery stores and medical centres. Under $60 a week, limited advertisers per location. Check what’s available in your postcode.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: "/ooh-offer" },
  openGraph: { title, description, url: "/ooh-offer", siteName: "Shopa Marketing", locale: "en_AU", type: "website" },
};

export default function Page() {
  return (
    <LeadProvider>
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Environments />
        <Creative />
        <Price />
        <Process />
        <Trust />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
      <RevealRoot />
    </LeadProvider>
  );
}
