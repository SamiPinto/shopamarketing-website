import { FAQS } from './Faq.jsx'
import { PHONE, SITE, SOCIALS } from '../site.js'

// Structured data (JSON-LD) so Google and AI tools can read who Shopa is, where it is
// and what this page offers. The FAQ answers come from Faq.jsx, so they always match the page.
const PAGE = 'https://shopamarketing.com.au/seo-offer'
const LOGO = 'https://shopamarketing.com.au/lp/seo/logo-white.webp'

const data = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${PAGE}#business`,
      name: 'Shopa Marketing',
      url: PAGE,
      logo: LOGO,
      image: LOGO,
      telephone: PHONE,
      taxID: '48 662 586 558',
      description: 'SEO and AI SEO agency helping Australian businesses rank on Google, show up on Google Maps and get found in AI search.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3 Albert Coates Lane',
        addressLocality: 'Melbourne',
        addressRegion: 'VIC',
        postalCode: '3000',
        addressCountry: 'AU',
      },
      areaServed: { '@type': 'Country', name: 'Australia' },
      knowsAbout: ['Search engine optimisation', 'Local SEO', 'Google Business Profile optimisation', 'AI search optimisation', 'Generative engine optimisation'],
      sameAs: [SITE, ...SOCIALS.map((s) => s.href)],
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE}#webpage`,
      url: PAGE,
      name: 'SEO & AI SEO Agency Australia | Shopa Marketing',
      inLanguage: 'en-AU',
      about: { '@id': `${PAGE}#business` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE}#faq`,
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

// Escape "<" so the JSON can never close the script tag early.
const json = JSON.stringify(data).replace(/</g, '\\u003c')

export default function Schema() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
