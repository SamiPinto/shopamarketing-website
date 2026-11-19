// Shared by the landing-page lead routes (app/api/lead/*). Senders must be on the
// shopamarketing.com.au domain verified in SMTP2GO. Needs SMTP2GO_API_KEY in Vercel.
export const LEAD_TO = ['pkennedy@shopamarketing.com.au', 'slall@shopamarketing.com', 'neil@shopamarketing.com']
export const LEAD_BCC = ['pkelly@shopamarketing.com.au', 'sami@shopamarketing.com']

export const SENDERS = {
  website: 'Shopa Marketing <website@shopamarketing.com.au>',
  ooh: 'Shopa Marketing <ooh@shopamarketing.com.au>',
  seo: 'noreply@shopamarketing.com.au',
}
