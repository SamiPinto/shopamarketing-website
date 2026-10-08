// Centralised JSON-LD building blocks for the whole site.
//
// One canonical Organization (ProfessionalService) node and one WebSite node
// live here and are rendered once in the root layout. Every other page emits
// its own page nodes (WebPage, BreadcrumbList, Service, BlogPosting, etc.) and
// references the Organization / WebSite by @id instead of re-declaring them.
// This keeps the entity consistent across the site and avoids duplicate markup.

export const SITE_URL = "https://shopamarketing.com.au";
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_ID = `${SITE_URL}/#logo`;

/** Turn a site-relative path into an absolute URL; pass-through for absolute URLs. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

// ── Sitewide entity: Organization (ProfessionalService) ─────────────────────
export const organizationSchema = {
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: "Shopa Marketing",
  legalName: "Shopa Marketing Australia Pty Ltd",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": LOGO_ID,
    url: `${SITE_URL}/assets/img/logo/logo-color.png`,
    contentUrl: `${SITE_URL}/assets/img/logo/logo-color.png`,
    caption: "Shopa Marketing",
  },
  image: { "@id": LOGO_ID },
  description:
    "Award-winning digital marketing agency helping Australian and New Zealand SMEs grow through SEO, Google Ads, social media, websites, graphic design and OOH advertising.",
  telephone: "+61 1800 247 034",
  foundingDate: "2022-09-20",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "ABN",
    value: "48 662 586 558",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "3 Albert Coates Lane",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    postalCode: "3000",
    addressCountry: "AU",
  },
  areaServed: [
    { "@type": "Country", name: "Australia" },
    { "@type": "Country", name: "New Zealand" },
  ],
  sameAs: [
    "https://www.linkedin.com/company/shopa-marketing/",
    "https://www.facebook.com/profile.php?id=100083445816079",
    "https://www.instagram.com/shopa.marketing/",
  ],
};

// ── Sitewide entity: WebSite ────────────────────────────────────────────────
export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Shopa Marketing",
  publisher: { "@id": ORG_ID },
  inLanguage: "en-AU",
};

type Crumb = { name: string; path: string };

/** BreadcrumbList from an ordered list of { name, path } items. */
export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** A WebPage (or subtype) node that ties into the WebSite and Organization. */
export function webPageSchema(opts: {
  path: string;
  name: string;
  description?: string;
  type?: string;
}) {
  const url = absoluteUrl(opts.path);
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-AU",
  };
}

/** A Service node provided by the Organization. */
export function serviceSchema(opts: {
  path: string;
  name: string;
  serviceType: string;
  description?: string;
}) {
  const url = absoluteUrl(opts.path);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "New Zealand" },
    ],
    url,
    ...(opts.description ? { description: opts.description } : {}),
  };
}

/** A BlogPosting node for an individual article. */
export function blogPostingSchema(opts: {
  path: string;
  headline: string;
  description?: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  section?: string;
}) {
  const url = absoluteUrl(opts.path);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    headline: opts.headline,
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.image ? { image: absoluteUrl(opts.image) } : {}),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { "@type": "Person", name: opts.authorName },
    publisher: { "@id": ORG_ID },
    ...(opts.section ? { articleSection: opts.section } : {}),
    url,
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en-AU",
  };
}
