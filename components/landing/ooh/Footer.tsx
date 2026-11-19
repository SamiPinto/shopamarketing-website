import Image from "next/image";
import { PHONE, PHONE_HREF } from "./site";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100083445816079",
    path: "M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/shopa.marketing/",
    path: "M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.9-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 3c-2.4 0-2.7 0-3.7.1-3.4.2-5 1.8-5.2 5.2C3 9.3 3 9.6 3 12s0 2.7.1 3.7c.2 3.4 1.8 5 5.2 5.2 1 .1 1.3.1 3.7.1s2.7 0 3.7-.1c3.4-.2 5-1.8 5.2-5.2.1-1 .1-1.3.1-3.7s0-2.7-.1-3.7c-.2-3.4-1.8-5-5.2-5.2C14.7 3 14.4 3 12 3z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/shopa-marketing/",
    path: "M6.9 8.5H3.6V20h3.3V8.5zM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.4 13.2c0-3.1-1.7-4.9-4.2-4.9-1.6 0-2.6.9-3 1.6V8.5H9.9V20h3.3v-6c0-1.5.6-2.6 2-2.6s1.9 1 1.9 2.6v6h3.3v-6.8z",
  },
];

export function Footer() {
  return (
    <footer className="bg-night text-haze">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-4 py-14 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Image src="/lp/ooh/logo-christmas.webp" alt="Shopa Marketing" width={600} height={241} className="h-12 w-auto" />
          <p className="mt-5 max-w-[34ch] text-[15px]">One team. One plan. Marketing that actually works together.</p>
          <p className="mt-4 text-[14px]">3 Albert Coates Lane, Melbourne VIC 3000</p>
        </div>
        <div className="flex flex-col gap-5 md:items-end">
          <a href={PHONE_HREF} className="inline-flex min-h-[44px] items-center text-[24px] font-extrabold tracking-tight text-white">
            {PHONE}
          </a>
          <ul className="flex gap-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full bg-white/8 text-white transition-colors hover:bg-violet-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-4 py-6 text-[13px] sm:flex-row sm:justify-between sm:px-6">
          <p>© Shopa Marketing. Location availability and campaign conditions apply.</p>
          <a href="https://shopamarketing.com.au/privacy-policy" className="-my-3 inline-flex min-h-[44px] items-center hover:text-white">
            Privacy policy
          </a>
        </div>
      </div>
    </footer>
  );
}
