// components/ContactClickTracker.tsx
// Mount once in app/layout.tsx inside <body>. Catches every tel:, mailto: and WhatsApp link site-wide,
// including ones added later, so no per-button wiring is needed.

"use client";

import { useEffect } from "react";
import { trackContact } from "@/lib/tracking";

export default function ContactClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) trackContact("phone", href.slice(4));
      else if (href.startsWith("mailto:")) trackContact("email", href.slice(7).split("?")[0]);
      else if (/wa\.me|api\.whatsapp\.com|whatsapp:/i.test(href)) trackContact("whatsapp", href);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
