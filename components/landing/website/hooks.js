import { useEffect, useRef, useState } from 'react'

const reduced = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function useCountTo(target, dur = 450) {
  const [v, setV] = useState(target)
  const from = useRef(target)
  useEffect(() => {
    if (reduced()) return setV(target)
    const start = from.current
    let raf, t0
    const step = (ts) => {
      t0 ??= ts
      const p = Math.min(1, (ts - t0) / dur)
      const cur = start + (target - start) * (1 - Math.pow(1 - p, 3))
      from.current = cur
      setV(cur)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, dur])
  return v
}

export function useInView(ref, { once = true, amount = 0.3, margin = '0px' } = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setInView(true)
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting)
      if (e.isIntersecting && once) io.disconnect()
    }, { threshold: amount, rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, once, amount, margin])
  return inView
}

export function useCountUpOnView(ref, to, dur = 1300) {
  const inView = useInView(ref, { amount: 0.4 })
  const [v, setV] = useState(to)
  useEffect(() => {
    if (!inView || reduced()) return
    let raf, t0
    const step = (ts) => {
      t0 ??= ts
      const p = Math.min(1, (ts - t0) / dur)
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    setV(0)
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, dur])
  return v
}
