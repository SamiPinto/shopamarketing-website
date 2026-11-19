export function track(event, params = {}) {
  ;(window.dataLayer = window.dataLayer || []).push({ event, lead_service: 'seo', ...params })
}

export function goToForm(e) {
  e?.preventDefault()
  const form = document.getElementById('get-started')
  if (!form) return
  form.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' })
  setTimeout(() => form.querySelector('input:not([type=hidden])')?.focus({ preventScroll: true }), 500)
}
