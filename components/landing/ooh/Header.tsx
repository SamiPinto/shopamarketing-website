"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FormLink } from "./LeadProvider";
import { PHONE, PHONE_HREF, track } from "./site";

export function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-300 ${
        solid ? "bg-night/92 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-[14px]" : "bg-transparent"
      }`}
    >
      <div className="header-lights" aria-hidden />
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" aria-label="Shopa Marketing home" className="inline-flex min-h-[44px] shrink-0 items-center">
          <Image src="/lp/ooh/logo-christmas.webp" alt="Shopa Marketing" width={600} height={241} priority className="logo-lift h-11 w-auto sm:h-12" />
        </a>
        <div className="flex items-center gap-5">
          <a
            href={PHONE_HREF}
            onClick={() => track("call_click", { location: "header" })}
            className="hidden min-h-[44px] flex-col justify-center text-right leading-tight text-white sm:flex"
          >
            <span className="text-[11px] font-semibold tracking-[0.08em] text-haze/80 uppercase">Talk to a local strategist</span>
            <span className="text-[17px] font-extrabold tracking-tight">{PHONE}</span>
          </a>
          <FormLink
            source="header"
            className="btn-primary inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-[15px] font-bold"
          >
            Check my postcode <span className="arrow" aria-hidden>→</span>
          </FormLink>
        </div>
      </div>
    </header>
  );
}
