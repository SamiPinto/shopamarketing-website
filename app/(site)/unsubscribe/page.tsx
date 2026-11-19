import type { Metadata } from "next";
import TemplateScripts from "@/components/TemplateScripts";
import UnsubscribeForm from "@/components/UnsubscribeForm";

// Email-signature use only: not linked anywhere on the site, and kept out of
// search results.
export const metadata: Metadata = {
  title: 'Unsubscribe | Shopa Marketing',
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  return (
    <>
      <TemplateScripts />

      {/* preloader */}
      <div id="preloader">
        <div className="loader_line"></div>
      </div>

      <section className="unsub-page" data-navbar-dark="true">
        <span className="unsub-ghost" aria-hidden="true">Goodbye?</span>
        <div className="container chy-container-1">
          <UnsubscribeForm />
        </div>
      </section>

      {/* overlay */}
      <div className="offcanvas-overlay"></div>
    </>
  );
}
