const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const Check = (p) => <svg {...base} strokeWidth="3.2" {...p}><path d="M5 12l5 5L20 7" /></svg>
export const Arrow = (p) => <svg {...base} strokeWidth="2.4" {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
export const Back = (p) => <svg {...base} strokeWidth="2.4" {...p}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
export const Phone = (p) => <svg {...base} strokeWidth="2.2" {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>
export const Lock = (p) => <svg {...base} strokeWidth="2" {...p}><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
export const Monitor = (p) => <svg {...base} strokeWidth="2" {...p}><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M3 8h18M8 21h8M12 17v4" /></svg>
export const Calendar = (p) => <svg {...base} strokeWidth="2" {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
export const Refresh = (p) => <svg {...base} strokeWidth="2" {...p}><path d="M21 12a9 9 0 1 1-3-6.7L21 8" /><path d="M21 3v5h-5" /></svg>
export const Clock = (p) => <svg {...base} strokeWidth="2" {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
export const Tag = (p) => <svg {...base} strokeWidth="2" {...p}><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1.5" /></svg>
export const Eye = (p) => <svg {...base} strokeWidth="2" {...p}><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
export const Shield = (p) => <svg {...base} strokeWidth="2" {...p}><path d="M12 3l8 3v6c0 5-3.4 8.3-8 9-4.6-.7-8-4-8-9V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg>
export const Chat = (p) => <svg {...base} strokeWidth="2" {...p}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
export const Star = (p) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" /></svg>
export const X = (p) => <svg {...base} strokeWidth="2.4" {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
export const Bolt = (p) => <svg {...base} strokeWidth="2" {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
export const Search = (p) => <svg {...base} strokeWidth="2.2" {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
export const Palette = (p) => <svg {...base} strokeWidth="2" {...p}><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8z" /><circle cx="7.5" cy="11" r="1" fill="currentColor" /><circle cx="10" cy="7" r="1" fill="currentColor" /><circle cx="15" cy="7.5" r="1" fill="currentColor" /></svg>
export const Sparkle = (p) => <svg {...base} strokeWidth="2" {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" /></svg>
export const Mobile = (p) => <svg {...base} strokeWidth="2" {...p}><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M11 18.5h2" /></svg>
export const Database = (p) => <svg {...base} strokeWidth="2" {...p}><ellipse cx="12" cy="5.5" rx="8" ry="3" /><path d="M4 5.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /><path d="M4 11.5v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></svg>
export const Layers = (p) => <svg {...base} strokeWidth="2" {...p}><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /><path d="m3 17.5 9 4.5 9-4.5" opacity=".55" /></svg>
export const Plus = (p) => <svg {...base} strokeWidth="2.4" {...p}><path d="M12 5v14M5 12h14" /></svg>
export const Mail = (p) => <svg {...base} strokeWidth="2" {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
export const Pin = (p) => <svg {...base} strokeWidth="2" {...p}><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
export const Facebook = (p) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5z" /></svg>
export const Instagram = (p) => <svg {...base} strokeWidth="2" {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" fill="currentColor" /></svg>
export const Linkedin = (p) => <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.3 2.6 4.3 6V21h-4v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>

export function Stars({ size = 16 }) {
  return (
    <span className="stars" role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => <Star key={i} width={size} height={size} />)}
    </span>
  )
}

export function GoogleG(p) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
      <path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.5-.2-2.3H12v4.3h5.9a5 5 0 0 1-2.2 3.3v2.8h3.6c2.1-1.9 3.3-4.8 3.3-8.1z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 10z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4z" />
    </svg>
  )
}
