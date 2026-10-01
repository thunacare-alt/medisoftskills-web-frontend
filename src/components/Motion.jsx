import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { contact } from '../data/site.js'

/* Infinite horizontal marquee. CSS-driven (compositor only, no JS per frame).
   Pauses on hover, renders as a static wrapped list when reduced motion is requested. */
export function Marquee({ items = [], duration = 30, className = '' }) {
  const reduce = useReducedMotion()
  if (!items.length) return null
  const row = [...items, ...items]
  return (
    <div className={'marquee ' + className} style={{ '--marquee-duration': duration + 's' }}>
      <div className={'marquee-track' + (reduce ? ' static' : '')}>
        {row.map((it, i) => (
          <span className="marquee-item" key={i} aria-hidden={i >= items.length}>{it}</span>
        ))}
      </div>
    </div>
  )
}

/* Count-up number. Animates once when it scrolls into view; instant for reduced motion. */
export function Stat({ value = 0, suffix = '', prefix = '', label, decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) return
    let raf
    const start = performance.now()
    const dur = 900
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur)
      setN(value * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, value])

  return (
    <div className="stat" ref={ref}>
      <div className="stat-n">
        {prefix}{n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}
      </div>
      {label && <div className="stat-l">{label}</div>}
    </div>
  )
}

export function StatBand({ stats = [] }) {
  if (!stats.length) return null
  return (
    <section className="statband">
      <div className="container statband-inner">
        {stats.map((s, i) => (
          <motion.div
            key={s.label || i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
          >
            <Stat {...s} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* Loop player slot for a pre-rendered Remotion composition.
   Drop the render at public/media/hero.webm (+ .mp4 fallback + poster) and it appears.
   Nothing is requested until the element actually mounts, and it is skipped entirely
   for visitors who ask for reduced motion. */
export function MotionStage({ src = 'media/hero', poster = 'media/hero-poster.jpg', ratio = '16 / 10', className = '' }) {
  const reduce = useReducedMotion()
  if (reduce) return null
  const base = import.meta.env.BASE_URL || '/'
  return (
    <div className={'motion-stage ' + className} style={{ aspectRatio: ratio }}>
      <video className="motion-stage-video" poster={base + poster} autoPlay loop muted playsInline preload="auto">
        <source src={base + src + '.webm'} type="video/webm" />
        <source src={base + src + '.mp4'} type="video/mp4" />
      </video>
    </div>
  )
}

/* Floating WhatsApp enquiry button. Hidden until a number is configured in site.js. */
export function FloatEnquiry() {
  if (!contact || !contact.whatsapp) return null
  const text = encodeURIComponent(contact.whatsappMessage || 'Hi, I would like details about the Medisoftskills certificate course.')
  return (
    <motion.a
      className="float-cta"
      href={'https://wa.me/' + contact.whatsapp + '?text=' + text}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Enquire on WhatsApp"
      initial={{ opacity: 0, scale: 0.9, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4, ease: 'easeOut' }}
    >
      <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.8 14.13c-.24.68-1.42 1.31-1.96 1.36-.54.05-1.03.24-3.5-.72-2.98-1.17-4.85-4.25-5-4.45-.15-.2-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.02-2.42.27-.29.58-.37.78-.37.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 1.99.9 2.13.07.15.12.32.02.51-.1.2-.2.32-.39.54-.2.22-.31.32-.44.54-.13.22-.28.46-.06.83.22.37.68 1.11 1.44 1.79.99.88 1.82 1.15 2.08 1.28.26.13.41.11.56-.07.15-.17.66-.77.84-1.03.18-.26.36-.22.6-.13.24.09 1.53.72 1.79.85.26.13.44.2.5.31.06.12.06.68-.18 1.36z" />
      </svg>
      <span>Enquire</span>
    </motion.a>
  )
}
