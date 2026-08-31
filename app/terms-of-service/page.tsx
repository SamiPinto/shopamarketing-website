import TemplateScripts from "@/components/TemplateScripts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Terms of Service | Shopa Marketing',
  description:
    'The terms that apply when you use the Shopa Marketing website and engage our marketing services.',
};

export default function TermsOfServicePage() {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of These Terms',
      body: (
        <>
          <p>This website is owned and operated by Shopa Marketing Pty Ltd. By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the website.</p>
          <p>You must be at least 18 years of age to use this website and to engage our services.</p>
        </>
      ),
    },
    {
      id: 'use-of-website',
      title: 'Use of the Website',
      body: (
        <>
          <p>You agree to use this website only for lawful purposes. When using the website, you must not:</p>
          <ul>
            <li>Engage in any fraudulent, misleading or unlawful activity;</li>
            <li>Infringe the intellectual property rights of Shopa Marketing Pty Ltd or any third party;</li>
            <li>Interfere with or disrupt the operation of the website, its servers or its networks.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'services',
      title: 'Our Services',
      body: (
        <>
          <p>Shopa Marketing Pty Ltd provides marketing services to businesses. The specific scope, deliverables and terms of any services we provide to you are set out in a separate agreement between you and Shopa Marketing Pty Ltd.</p>
          <p>The content on this website is provided for general information purposes only and does not constitute professional advice. You should not rely on it as a substitute for advice tailored to your circumstances.</p>
        </>
      ),
    },
    {
      id: 'no-guarantee',
      title: 'No Guarantee of Outcomes',
      body: (
        <>
          <p>While we work hard to deliver strong results for every client, Shopa Marketing Pty Ltd makes no guarantee of specific marketing outcomes, results, enquiry volumes, sales, or return on investment.</p>
          <p>Marketing performance is affected by factors outside our control, including market conditions, competition, seasonality, platform changes and the nature of your business and offer.</p>
        </>
      ),
    },
    {
      id: 'fees',
      title: 'Fees and Payment',
      body: (
        <>
          <p>Unless stated otherwise, all fees are quoted in Australian dollars (AUD) and are exclusive of GST. GST will be added where required by Australian tax law.</p>
          <p>Payment terms are as specified in your service agreement. We reserve the right to suspend services where invoices remain unpaid past their due date.</p>
        </>
      ),
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      body: (
        <>
          <p>All content on this website — including text, graphics, logos, images and design — is the property of Shopa Marketing Pty Ltd or its licensors and is protected by intellectual property laws.</p>
          <p>You may not reproduce, distribute or use any content from this website for commercial purposes without our prior written consent. You may share links to the website for non-commercial purposes.</p>
        </>
      ),
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      body: (
        <>
          <p>To the maximum extent permitted by law, Shopa Marketing Pty Ltd is not liable for any loss or damage arising from your use of, or reliance on, this website or our services.</p>
          <p>Nothing in these terms excludes, restricts or modifies any consumer guarantees, rights or remedies you may have under the Australian Consumer Law that cannot lawfully be excluded.</p>
        </>
      ),
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      body: (
        <p>These Terms of Service are governed by the laws of Victoria, Australia. Any disputes arising in connection with these terms are subject to the exclusive jurisdiction of the courts of Victoria.</p>
      ),
    },
    {
      id: 'contact',
      title: 'Contact Us',
      body: (
        <p>If you have any questions about these Terms of Service, please get in touch with us using the details below.</p>
      ),
    },
  ];

  return (
    <>
      <TemplateScripts />

      {/* preloader */}
      <div id="preloader">
        <div className="loader_line"></div>
      </div>

      {/* ── HERO ── */}
      <section className="wds-legal-hero" data-navbar-dark="true">
        <span className="wds-legal-hero__ghost" aria-hidden="true">Terms</span>
        <div className="container chy-container-1">
          <h1 className="chy-title-1 wds-legal-hero__title wow fadeInLeft">Terms of Service</h1>
          <span className="wds-legal-hero__meta wow fadeInUp">Shopa Marketing Pty Ltd</span>
        </div>
      </section>

      {/* ── BODY — sticky TOC + numbered sections ── */}
      <div className="pt-90 pb-110 bg-default">
        <div className="container chy-container-1">
          <div className="wds-legal-layout">

            <ul className="wds-legal-toc">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}><span>{`0${i + 1}`}</span>{s.title}</a>
                </li>
              ))}
            </ul>

            <div>
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="wds-legal-section">
                  <span className="wds-legal-section__num" aria-hidden="true">{`0${i + 1}`}</span>
                  <h2>{s.title}</h2>
                  {s.body}
                </section>
              ))}

              <div className="wds-legal-contact wow fadeInUp">
                <span className="wds-legal-contact__icon"><i className="fa-solid fa-envelope"></i></span>
                <span>
                  <span className="wds-legal-contact__label">Questions about these terms</span>
                  <a href="mailto:customerservice@shopamarketing.com.au">customerservice@shopamarketing.com.au</a>
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* back to top */}
      <div className="scroll-top has-home-1">
        <div className="scroll-top-wrap">
          <i className="icon-1 fal fa-long-arrow-up"></i>
        </div>
      </div>

      {/* overlay */}
      <div className="offcanvas-overlay"></div>
    </>
  );
}
