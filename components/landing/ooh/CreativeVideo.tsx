"use client";

import { useEffect, useRef, useState } from "react";

export function CreativeVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!near || !el) return;
    el.load();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) el.play().catch(() => {});
  }, [near]);

  return (
    <video
      ref={ref}
      className="aspect-[1520/1008] w-full bg-white"
      poster="/lp/ooh/creative-fresh-poster.webp"
      muted
      loop
      playsInline
      preload="none"
      aria-label="Ad creative changing from always-on awareness to a Christmas sale and a New Year offer on the same screen"
    >
      {near && (
        <>
          <source src="/lp/ooh/creative-fresh-av1.mp4" type='video/mp4; codecs="av01.0.08M.08"' />
          <source src="/lp/ooh/creative-fresh.mp4" type="video/mp4" />
        </>
      )}
    </video>
  );
}
