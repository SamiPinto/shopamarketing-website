import TemplateScripts from "@/components/TemplateScripts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Privacy Policy | Shopa Marketing',
  description:
    'How Shopa Marketing collects, uses, stores and protects your personal information, and the choices you have about your data.',
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: 'collection',
      title: 'Collection of Personal Information',
      body: (
        <>
          <p>Shopa Marketing Pty Ltd collects personal information that is reasonably necessary to provide our services, including your name, contact details, location, occupation, business information and any correspondence you send us.</p>
          <p>We collect this information when you visit our website, subscribe to our newsletter, contact us directly, engage our services, or interact with us on social media. Where practicable, we will collect personal information directly from you.</p>
        </>
      ),
    },
    {
      id: 'use',
      title: 'Use of Personal Information',
      body: (
        <>
          <p>We use your personal information to provide and improve our services, communicate with you about enquiries and promotions, and meet our legal obligations.</p>
          <p>We will only use your personal information for the purpose for which it was collected, or for related purposes you would reasonably expect.</p>
        </>
      ),
    },
    {
      id: 'disclosure',
      title: 'Disclosure of Personal Information',
      body: (
        <>
          <p>We may disclose personal information to:</p>
          <ul>
            <li>Service providers who assist us in operating our business;</li>
            <li>Regulatory authorities where required by law;</li>
            <li>Professional advisers such as lawyers and accountants;</li>
            <li>Other third parties with your consent.</li>
          </ul>
          <p>We require third parties who handle personal information on our behalf to comply with the Australian Privacy Principles.</p>
        </>
      ),
    },
    {
      id: 'overseas',
      title: 'Overseas Disclosure',
      body: (
        <p>Some of the service providers we use — including Meta and Google — may store or process personal information overseas, including in the United States and other jurisdictions. By submitting your information to us, you consent to this overseas storage and processing.</p>
      ),
    },
    {
      id: 'security',
      title: 'Data Security',
      body: (
        <p>We take reasonable steps to protect personal information from misuse, interference, loss, unauthorised access, modification and disclosure, including secure storage systems, access controls, and staff training. However, no transmission of information over the internet is completely secure, and we cannot guarantee the security of information transmitted to us online.</p>
      ),
    },
    {
      id: 'retention',
      title: 'Retention and Destruction of Personal Information',
      body: (
        <p>We retain personal information only for as long as it is needed for the purposes for which it was collected, or as required by law. When personal information is no longer required, we take reasonable steps to destroy or de-identify it.</p>
      ),
    },
    {
      id: 'access',
      title: 'Access and Correction',
      body: (
        <p>You may request access to the personal information we hold about you, and ask us to correct any information that is inaccurate, out of date or incomplete. We will respond to access and correction requests within a reasonable timeframe.</p>
      ),
    },
    {
      id: 'marketing',
      title: 'Marketing Communications',
      body: (
        <p>Our marketing communications comply with the Spam Act 2003 (Cth). You can opt out of receiving marketing communications at any time by using the unsubscribe link in our emails or by contacting us at customerservice@shopamarketing.com.au.</p>
      ),
    },
    {
      id: 'cookies',
      title: 'Cookies and Website Analytics',
      body: (
        <p>Our website uses cookies and analytics tools, including Google Analytics, to help us understand how visitors use the site. This may involve the collection of information such as your IP address, browser type and device information. You can manage or disable cookies through your browser settings.</p>
      ),
    },
    {
      id: 'complaints',
      title: 'Complaints',
      body: (
        <p>If you believe we have breached your privacy, please contact us using the details below. We aim to resolve complaints within 30 days. If you are not satisfied with our response, you may escalate your complaint to the Office of the Australian Information Commissioner (OAIC) on 1300 363 992.</p>
      ),
    },
    {
      id: 'contact',
      title: 'Contact Us',
      body: (
        <p>If you have any questions about this Privacy Policy or how we handle your personal information, please contact our Privacy Officer using the details below.</p>
      ),
    },
    {
      id: 'updates',
      title: 'Updates to This Policy',
      body: (
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and your continued use of our website or services indicates your acceptance of the updated policy.</p>
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
        <span className="wds-legal-hero__ghost" aria-hidden="true">Privacy</span>
        <div className="container chy-container-1">
          <h1 className="chy-title-1 wds-legal-hero__title wow fadeInLeft">Privacy Policy</h1>
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
                  <a href={`#${s.id}`}><span>{i < 9 ? `0${i + 1}` : `${i + 1}`}</span>{s.title}</a>
                </li>
              ))}
            </ul>

            <div>
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="wds-legal-section">
                  <span className="wds-legal-section__num" aria-hidden="true">{i < 9 ? `0${i + 1}` : `${i + 1}`}</span>
                  <h2>{s.title}</h2>
                  {s.body}
                </section>
              ))}

              <div className="wds-legal-contact wow fadeInUp">
                <span className="wds-legal-contact__icon"><i className="fa-solid fa-envelope"></i></span>
                <span>
                  <span className="wds-legal-contact__label">Privacy Officer</span>
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
