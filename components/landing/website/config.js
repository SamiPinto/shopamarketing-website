// app/api/lead/website/route.ts emails each lead via SMTP2GO.
export const FORM_ENDPOINT = '/api/lead/website'
export const THANK_YOU = '/thank-you-website'

export const CONTACT = {
  phone: '1800 247 034',
  phoneHref: 'tel:+611800247034',
  // The parent site publishes no email address. Add one here to show it in the footer.
  email: '',
  auAddress: ['3 Albert Coates Lane', 'Melbourne VIC 3000'],
  site: 'https://shopamarketing.com.au/',
  privacy: 'https://shopamarketing.com.au/privacy-policy',
  seo: 'https://shopamarketing.com.au/services/seo-services',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=100083445816079',
    instagram: 'https://www.instagram.com/shopa.marketing/',
    linkedin: 'https://www.linkedin.com/company/shopa-marketing/',
  },
}

export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  ios: [0.32, 0.72, 0, 1],
}

export function track(event, extra = {}) {
  ;(window.dataLayer = window.dataLayer || []).push({ event, lead_service: 'web', ...extra })
}
