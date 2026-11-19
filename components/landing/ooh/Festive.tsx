const BULBS = ["#ff4d6d", "#ffd27a", "#3ddc97", "#f2a6ff"];

function wireY(x: number) {
  const t = x <= 500 ? x / 500 : x / 500 - 1;
  return x <= 500 ? (1 - t) ** 2 * 8 + 2 * (1 - t) * t * 64 + t * t * 22 : (1 - t) ** 2 * 22 + 2 * (1 - t) * t * -20 + t * t * 10;
}

export function Garland({ count = 15 }: { count?: number }) {
  return (
    <div className="garland" aria-hidden>
      <svg viewBox="0 0 1000 90" preserveAspectRatio="none">
        <path d="M0 20 Q 250 76 500 34 T 1000 22" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      {Array.from({ length: count }).map((_, i) => {
        const x = ((i + 0.5) / count) * 1000;
        const c = BULBS[i % BULBS.length];
        return (
          <span
            key={i}
            className="bulb"
            style={{ left: `${x / 10}%`, top: wireY(x) + 12, background: c, color: c, animationDelay: `${(i * 0.37) % 2.4}s` }}
          />
        );
      })}
    </div>
  );
}

export function Bow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="74" height="58" viewBox="0 0 74 58" aria-hidden>
      <defs>
        <linearGradient id="bow-r" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff5c78" />
          <stop offset="1" stopColor="#c0183b" />
        </linearGradient>
      </defs>
      <path d="M33 30 L18 56 L24 54 L27 58 L36 33Z" fill="#a3132f" />
      <path d="M41 30 L56 56 L50 54 L47 58 L38 33Z" fill="#a3132f" />
      <path d="M37 28 C 22 6, 2 8, 6 22 C 9 33, 24 34, 37 28Z" fill="url(#bow-r)" />
      <path d="M37 28 C 52 6, 72 8, 68 22 C 65 33, 50 34, 37 28Z" fill="url(#bow-r)" />
      <path d="M14 20 C 20 16, 28 20, 33 26" stroke="rgba(255,255,255,.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="37" cy="28" rx="7" ry="6.5" fill="#d61f43" />
      <ellipse cx="35" cy="26" rx="2.4" ry="1.8" fill="rgba(255,255,255,.4)" />
    </svg>
  );
}

export function Snowflake({ className = "", size = 120 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="-50 -50 100 100" aria-hidden>
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <path d="M0 0 V-44" />
            <path d="M0 -18 L-10 -28 M0 -18 L10 -28" />
            <path d="M0 -32 L-7 -39 M0 -32 L7 -39" />
          </g>
        ))}
        <circle r="5" />
      </g>
    </svg>
  );
}
