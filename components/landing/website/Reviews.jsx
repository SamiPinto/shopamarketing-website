export const QUOTES = [
  { q: 'Shopa Marketing designed my website (sreg.com.au) and are managing my SEO for over a year now, helping my online presence grow steadily. … This company is a one stop shop for all advertising needs.', hl: 'one stop shop for all advertising needs', who: 'TJ Kooner', initials: 'TK', role: 'Website, SEO and advertising', href: 'https://share.google/iuKE6q0O7RP8qJc6L' },
  { q: 'Garry from Shopa Marketing has been absolutely phenomenal to work with for our website design. His service has been top-notch, and the website he created for us is exceptional.', hl: 'absolutely phenomenal to work with', who: 'Abdul Hinderry', initials: 'AH', role: 'The Valor Group · Website design', href: 'https://share.google/PsUQzKrroJdfnXm9g' },
  { q: 'Keymer Child Care needed a website to reach further families in our area. … I found them to be very professional and very helpful with building a new business website, and online marketing.', hl: 'very professional and very helpful', who: 'Keymer Child Care', initials: 'KC', role: 'Website and online marketing', href: 'https://share.google/UpnKlNLTgQA1ByzjF' },
  { q: 'Great service! Extremely helpful, patient, and easy to work with throughout the whole process. … Communication was excellent and nothing was too much trouble.', hl: 'Communication was excellent', who: 'Cameron Shepherd', initials: 'CS', role: 'Business advertising', href: 'https://share.google/ECbOmevlIsxOVpVC3' },
  { q: 'Advertising with Shopa Marketing was an easy process and communication with the team was prompt.', hl: 'communication with the team was prompt', who: 'David Wallis', initials: 'DW', role: 'RAWR Support Services · Digital screen advertising', href: 'https://share.google/2WPoOQBWTgvsDhieV' },
  { q: 'I am very happy with Shopa Marketing. … Victor spent time asking questions relating to our business.', hl: 'spent time asking questions relating to our business', who: 'Kathy Macqueen', initials: 'KM', role: 'Yours in Paws Dog Day Care & Training · Advertising', href: 'https://share.google/Eox4jshNf7ocUSc3E' },
]

export function Quote({ q, hl }) {
  const i = hl ? q.indexOf(hl) : -1
  if (i < 0) return <>“{q}”</>
  return <>“{q.slice(0, i)}<mark>{hl}</mark>{q.slice(i + hl.length)}”</>
}

